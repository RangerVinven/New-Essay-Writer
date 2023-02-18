// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/PrismaClient";

type Data = {
  	success?: boolean
    error?: string
    sentences?: {}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {

    // Rejects the request if it doesn't have the new sentence or paragraph
    if(!req.body.sentenceId) res.status(400).json({error: "Invalid request"})

    prisma.alternative_Sentences.findMany({
        where: {
            Alternative_To_Sentence: req.body.sentenceId
        }
    }).then((sentences) => {        
        res.status(200).json({
            sentences: sentences
        });
    }).catch(error => {
        res.status(500).json({
            success: false
        });
    })
}
