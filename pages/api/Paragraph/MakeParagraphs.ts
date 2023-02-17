// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/PrismaClient";

type Response = {
    paragraph: string,
    sentences: string[]
}

type ParagraphIdResponse = {
    id: number
}

async function deleteParagraphsAndSentences(headerId: number) {

        // Gets the paragraphs for the specific header
        const paragraphIdsObject: ParagraphIdResponse[] = await prisma.paragraphs.findMany({
            where: {
                Header: headerId
            },
            select: {
                id: true
            }
        })        
        
        // Deletes the paragraphs
        await prisma.paragraphs.deleteMany({
            where: {
                Header: headerId
            }
        });
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    // Rejects the request if it doesn't have the paragraphs in the body
    if(!req.body.Paragraphs || !req.body.HeaderId) res.status(400).json({error: "Invalid request"});

    deleteParagraphsAndSentences(req.body.HeaderId);

    // Array of the paragraphs
    const paragraphs = req.body.Paragraphs;

    // Creates the object that'll be used in Primsa's createMany function
    for (let i = 0; i < paragraphs.length; i++) {

        const allSentences = [];
        
        // Creates the paragraph for the sentences
        const paragraph = await prisma.paragraphs.create({
            data: {
                Header: req.body.HeaderId,
                Order_In_Header: i+1
            }
        });

        const sentences = paragraphs[i].replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");

        // Loops through the sentences and adds them to the allSentences array
        for (let x = 0; x < sentences.length; x++) {
            allSentences.push({
                Paragraph: paragraph.id,
                Sentence: sentences[x],
                Order_In_Paragraph: x+1
            });
        }

        await prisma.sentences.createMany({
            data: allSentences
        })    
    }

    res.status(200).json({});
}