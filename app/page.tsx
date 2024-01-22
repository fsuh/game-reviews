import Link from "next/link";
import Heading from "@/components/Heading";

const HomePage = () => {
	return (
		<>
			<Heading>Indie Gamer</Heading>
			<p className="pb-3">Only the best indie games, reviewed for you!</p>
			<div className="bg-white border rounded shadow w-80 sm:w-full hover:shadow-xl">
				<Link
					href="/reviews/hollow-knight"
					className="flex flex-col sm:flex-row"
				>
					<img
						src="/images/hollow-knight.jpg"
						alt=""
						width="320"
						height="180"
						className="rounded-t sm:rounded-l sm:rounded-r-none"
					/>
					<h2 className="font-semibold font-orbitron py-1 text-center sm:px-2">
						Hollow Knight
					</h2>
				</Link>
			</div>
		</>
	);
};
export default HomePage;
