// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/PrismaClient";

type Data = {
  	success?: boolean
    error?: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {

    // Rejects the request if it doesn't have the new sentence or paragraph
    if(!req.body.newSentence || !req.body.paragraph || !req.body.sentenceId) res.status(400).json({error: "Invalid request"})

    await prisma.alternative_Sentences.create({
        data: {
            Alternative_To_Sentence: req.body.sentenceId,
            Paragraph: req.body.paragraph,
            Sentence: req.body.newSentence
        }
    }).then(() => {        
        res.status(200).json({
            success: true
        });
    }).catch(error => {
        res.status(200).json({
            success: false
        });
    })
}
