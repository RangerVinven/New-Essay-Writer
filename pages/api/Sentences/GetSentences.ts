// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/PrismaClient";

type Data = {
  	Sentences: Object
}

type Sentences = {
    Sentences: Object[]
}

type ParagraphIdResponse = {
    id: number
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {

    // Gets the paragraphs of the header
    const paragraphs = await prisma.paragraphs.findMany({
        where: {
            Header: req.body.HeaderId
        },
        orderBy: {
            Order_In_Header: "asc"
        }
    });


    // Gets the paragraph ids from the paragraphs
    let paragraphIds: number[] = [];
    
    paragraphs.forEach((paragraphId: ParagraphIdResponse) => {            
        paragraphIds.push(Number(paragraphId.id));
    });

	// Gets sentences 
	const sentences = await prisma.sentences.findMany({
        where: {
            Paragraph: {
                in: paragraphIds
            }
        },
		orderBy: [
            {
			    Paragraph: "asc",  
		    },
            {
                Order_In_Paragraph: "asc"
            }
        ]
	});    

	res.status(200).json({
		Sentences: sentences
	});
}
