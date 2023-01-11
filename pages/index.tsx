import EssayTile from "../components/HomePage/EssayTile";
import { useEffect, useState } from "react";

import Link from 'next/link'
import { useDisclosure } from "@chakra-ui/react";
import AddEssayModal from "../components/HomePage/AddEssayModal";

type Essay = {
	id: number,
	Name: string
}

export default function Home() {

	const [essays, setEssays] = useState<Essay[]>([]);

    const { isOpen, onOpen, onClose } = useDisclosure() // For the add essay modal

	// Gets the user's essays
	useEffect(() => {
		fetch("http://localhost:3000/api/GetEssays").then(data => data.json()).then(essayNames => {
			setEssays(essayNames.EssayNames);
		});
	}, []);

	return (
		<div className="w-full h-fit my-16 flex justify-center items-center">
			<AddEssayModal essays={essays} setEssays={setEssays} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

			<div className="flex flex-wrap justify-evenly w-2/3">
				{
					essays.map((essay) => {
						return <Link href={"/" + encodeURIComponent(essay.Name)}><EssayTile key={essay.id} name={essay.Name} /></Link>
					})
				}

				<div onClick={onOpen} className="flex text-center justify-center items-center hover:cursor-pointer w-64 h-64 border-gray-400 border-dashed border-2">
					<h3 className="text-gray-400 text-6xl font-thin">+</h3>
				</div>

			</div>
		</div>
	)
}
