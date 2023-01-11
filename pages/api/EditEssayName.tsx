// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/PrismaClient";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    // Rejects the request if there's no old and new essay name
    if(!req.body.id || !req.body.NewEssayName) res.status(400).json({ message: "Invalid request" });

	prisma.essays.update({
        where: {
            id: req.body.id
        },
        data: {
            Name: req.body.NewEssayName
        }
    }).then((essay) => {
        res.status(200).json({
            id: essay.id,
            name: essay.Name
        });
    }).catch(() => {
        res.status(500).json({});
    });
}
