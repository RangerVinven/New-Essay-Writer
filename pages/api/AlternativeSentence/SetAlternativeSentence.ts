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

    // Rejects the request if it doesn't have the required parameters
    if(!req.body.alternativeSentenceId || !req.body.sentenceId || !req.body.alternativeSentence || !req.body.sentence) res.status(400).json({error: "Invalid request"})

    // Update the sentence to the alternative sentence
    await prisma.sentences.update({
        where: {
            id: req.body.sentenceId
        },
        data: {
            Sentence: req.body.alternativeSentence
        }
    }).catch(() => {
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    });

    // Update the alternative sentence to the sentence (swaps the alternative and the regular sentence)
    await prisma.alternative_Sentences.update({
        where: {
            id: req.body.alternativeSentenceId
        },
        data: {
            Sentence: req.body.sentence
        }
    }).catch(() => {
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    });

    res.status(200).json({
        success: true
    })
}
