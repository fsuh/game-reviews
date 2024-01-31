import Link from "next/link";
import type { Metadata } from "next";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

export const metadata: Metadata = {
	title: "Reviews",
};

const ReviewsPage = async () => {
	const reviews = await getReviews();
	return (
		<>
			<Heading>Reviews</Heading>
			<ul className="flex flex-row flex-wrap gap-3">
				{reviews.map((review) => {
					const { slug, title, image } = review;
					return (
						<li
							key={slug}
							className="bg-white border rounded shadow w-80 hover:shadow-xl"
						>
							<Link href={`/reviews/${slug}`}>
								<img
									src={image}
									alt=""
									width="320"
									height="180"
									className=" rounded-t"
								/>
								<h2 className="font-semibold font-orbitron py-1 text-center">
									{title}
								</h2>
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
};
export default ReviewsPage;
