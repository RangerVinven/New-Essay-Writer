// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/PrismaClient";

type Data = {
  	EssayNames: Object
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	// Gets essays
	const essayNamesObject = await prisma.essays.findMany({
		select: {
			id: true,
			Name: true
		},
		orderBy: {
			Last_Modified: "desc"
		}
	});	

	res.status(200).json({
		EssayNames: essayNamesObject
	});
}
