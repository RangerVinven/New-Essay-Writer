// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/PrismaClient";

type Data = {
  	headings?: Object
    error?: String
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {

    if (!req.body.essayId) res.status(400).json({ error: "Invalid request" })

	// Gets headings
	const headings = await prisma.headers.findMany({
        where: {
            Essay: req.body.essayId
        },
        orderBy: {
            Order_In_Essay: "asc"
        }
    });

	res.status(200).json({
		headings: headings
	});
}
