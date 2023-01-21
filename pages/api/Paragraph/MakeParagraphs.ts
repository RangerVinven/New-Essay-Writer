// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/PrismaClient";

type Response = {
    paragraph: string,
    sentences: string[]
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    // Rejects the request if it doesn't have the paragraphs in the body
    if(!req.body.Paragraphs) res.status(400).json({error: "Invalid request"});

    const paragraphs = req.body.Paragraphs.toString().split("\n\n");
    
    // For splitting up the paragraphs into sentences
    const segmenter = new Intl.Segmenter("en-US", {
        granularity: "sentence"
    })

    paragraphs.forEach((paragraph: string) => {
        const sentences = paragraph.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");

        res.status(200).json({
            paragraph: paragraph,
            sentences: sentences
        })
    });
}
