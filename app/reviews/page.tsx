import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

export const metadata: Metadata = {
	title: "Reviews",
};

const ReviewsPage = async () => {
	const reviews = await getReviews(6);
	return (
		<>
			<Heading>Reviews</Heading>
			<ul className="flex flex-row flex-wrap gap-3">
				{reviews.map((review, index) => {
					const { slug, title, image } = review;
					return (
						<li
							key={slug}
							className="bg-white border rounded shadow w-80 hover:shadow-xl"
						>
							<Link href={`/reviews/${slug}`}>
								<Image
									src={image}
									alt=""
									priority={index === 0}
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
