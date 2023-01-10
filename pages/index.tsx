import EssayTile from "../components/HomePage/EssayTile";
import { useEffect, useState } from "react";

import Link from 'next/link'

export default function Home() {

	const [essays, setEssays] = useState([]);

	// Gets the user's essays
	useEffect(() => {
		fetch("http://localhost:3000/api/GetEssays").then(data => data.json()).then(essayNames => {
			setEssays(essayNames.EssayNames);
		});
	}, []);

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="flex flex-wrap justify-evenly w-2/3">
				{
					essays.map(essay => {
						return <Link href={"/" + encodeURIComponent(essay)}><EssayTile name={essay} /></Link>
					})
				}

				<div className="flex text-center justify-center items-center hover:cursor-pointer w-64 h-64 border-gray-400 border-dashed border-2">
					<h3 className="text-gray-400 text-6xl font-thin">+</h3>
				</div>
			</div>
		</div>
	)
}
