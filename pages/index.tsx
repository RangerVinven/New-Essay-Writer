import EssayTile from "../components/HomePage/EssayTile";
import { useEffect, useState } from "react";

import Link from 'next/link'
import { useDisclosure } from "@chakra-ui/react";
import AddEssayModal from "../components/HomePage/AddEssayModal";
import { Essay } from "../lib/Types";
import LoadingSpinner from "../components/General/LoadingSpinner";

export default function Home() {

	const [essays, setEssays] = useState<Essay[]>([]);
	const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure() // For the add essay modal

	// Gets the user's essays
	useEffect(() => {
		setLoading(true); // Starts the loading animation

		fetch("http://localhost:3000/api/Essays/GetEssays").then(data => data.json()).then(essayNames => {
			
			setLoading(false); // Starts the loading animation
			setEssays(essayNames.EssayNames);
		});
	}, []);

	return (
		<div className="flex justify-center items-center h-screen">

			{
				loading ? <LoadingSpinner /> : <div className="relative w-full h-fit my-16 flex justify-center items-center">
					
					<AddEssayModal essays={essays} setEssays={setEssays} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

					<div className="flex flex-wrap justify-evenly w-2/3">
						{
							essays.map((essay) => {
								return <EssayTile essays={essays} setEssays={setEssays} key={essay.id} id={essay.id} name={essay.Name} />
							})
						}

						<div onClick={onOpen} className="flex text-center justify-center items-center hover:cursor-pointer w-64 h-64 border-gray-400 border-dashed border-2">
							<h3 className="text-gray-400 text-6xl font-thin">+</h3>
						</div>

					</div>

				</div>
			}
		</div>
	)
}
