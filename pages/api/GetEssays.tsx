// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/PrismaClient";

type Data = {
  	EssayNames: string[]
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	// Gets essays
	const essayNamesObject = await prisma.essays.findMany({
		select: {
			Name: true
		},
		orderBy: {
			Last_Modified: "desc"
		}
	});

	// Extracts the essay names from the essayNames object
	let names: string[] = [];
	essayNamesObject.forEach(name => {
		names.push(name.Name);
	});
	

	res.status(200).json({
		EssayNames: names
	});
}
