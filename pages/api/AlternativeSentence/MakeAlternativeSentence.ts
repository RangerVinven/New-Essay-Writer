// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/PrismaClient";
import { AlternativeSentence } from "../../../lib/Types";

type Data = {
    sentence?: AlternativeSentence

    success?: boolean
    error?: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {

    new Promise<AlternativeSentence>(async (resolve, reject) => {
        // Rejects the request if it doesn't have the new sentence or paragraph
        if(!req.body.newSentence || !req.body.paragraph || !req.body.sentenceId) {
            reject();
            res.status(400).json({error: "Invalid request"})
        }

        await prisma.alternative_Sentences.create({
            data: {
                Alternative_To_Sentence: req.body.sentenceId,
                Paragraph: req.body.paragraph,
                Sentence: req.body.newSentence
            }
        }).then((alternativeSentence) => {
            resolve(alternativeSentence)
            res.status(200).json({
                sentence: alternativeSentence
            });
        }).catch(error => {
            reject();
            res.status(200).json({
                success: false
            });
        })
    })
}
