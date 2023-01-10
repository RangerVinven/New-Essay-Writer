import EssayTile from "../components/HomePage/EssayTile";

export default function Home() {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="flex flex-wrap justify-evenly w-2/3">
				<EssayTile name="Why Edward Snowden Should Be Extradited" />
				<EssayTile name="The Consequences of Cyber War" />
				<EssayTile name="TypeScript vs JavaScript" />
				<EssayTile name="The Difference Between Penetration Testing and Bug Bounty" />
				<EssayTile name="Is There A Best Programming Language?" />
				<EssayTile name="How To Learn To Programming" />
			</div>
		</div>
	)
}
