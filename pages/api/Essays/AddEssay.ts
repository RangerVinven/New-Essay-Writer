// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/PrismaClient";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    if(req.body.EssayName === null || req.body.EssayName === undefined) {
        res.status(400).json({
            message: "Invalid request"
        });
    };

	prisma.essays.create({
        data: {
            Name: req.body.EssayName
        }
    }).then((essay) => {
        res.status(200).json({
            id: essay.id
        });
    }).catch(() => {
        res.status(500).json({});
    })
}
