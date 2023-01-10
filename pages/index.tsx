import EssayTile from "../components/HomePage/EssayTile";
import { useEffect, useState } from "react";

export default function Home() {

	const [essays, setEssays] = useState(["Why Edward Snowden Should Not Be Extradited", "The Consequences of Cyber War", "TypeScript vs JavaScript", "The Difference Between Penetration Testing and Bug Bounty", "Is There A Best Programming Language?", "How To Learn To Programming"]);
	
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
						return <EssayTile name={essay} />
					})
				}
			</div>
		</div>
	)
}
