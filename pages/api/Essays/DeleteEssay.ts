// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/PrismaClient";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    if(!req.body.id) res.status(400).json({message: "Invalid request"});

	prisma.essays.delete({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.status(200).json({});
    }).catch(() => {
        res.status(500).json({});
    })
}
