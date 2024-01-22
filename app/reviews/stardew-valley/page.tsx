import Heading from "@/components/Heading";

Heading;
const StardewPage = () => {
	return (
		<>
			<Heading>Stardew Valley</Heading>
			<img
				src="/images/stardew-valley.jpg"
				alt=""
				width="640"
				height="360"
				className="mb-2 rounded"
			/>
			<p>
				Stardew Valley is a video game developed by Eric "MonsterBuds"
				"MonsterBob" and published by Nintendo. It is the fifth game in the
				Stardew Valley series, and the first game to be released in the United
				States.
			</p>
		</>
	);
};
export default StardewPage;
