// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/PrismaClient";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    if(!req.body.headerName || !req.body.essayId || !req.body.orderInEssay) res.status(400).json({error: "Invalid request"});

    const header = await prisma.headers.create({
        data: {
            Essay: req.body.essayId,
            Name: req.body.headerName,
            Order_In_Essay: req.body.orderInEssay
        }
    });

    res.status(200).json({
        header: header
    })

}
