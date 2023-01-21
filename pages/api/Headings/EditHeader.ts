// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/PrismaClient";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    // Rejects the request if there's no old and new essay name
    if(!req.body.id || !req.body.NewHeader) res.status(400).json({ message: "Invalid request" });

	prisma.headers.update({
        where: {
            id: req.body.id
        },
        data: {
            Name: req.body.NewHeader
        }
    }).then((header) => {
        res.status(200).json({
            id: header.id,
            name: header.Name,
            Order_In_Essay: header.Order_In_Essay
        });
    }).catch(() => {
        res.status(500).json({});
    });
}
