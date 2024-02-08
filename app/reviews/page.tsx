import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import PaginationBar from "@/components/PaginationBar";

// export const dynamic = "force-dynamic";
// export const revalidate = 30; // revalidate every 60 seconds
interface ReviewsPageProps {
	searchParams: { page?: string };
}

export const metadata: Metadata = {
	title: "Reviews",
};

const parsePageParam = (paramValue: string | undefined): number => {
	if (paramValue) {
		const page = parseInt(paramValue);
		if (isFinite(page) && page > 0) {
			return page;
		}
	}
	return 1;
};
const PAGE_SIZE = 6;

const ReviewsPage = async ({ searchParams }: ReviewsPageProps) => {
	const page = parsePageParam(searchParams.page);
	const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
	console.log("[ReviewsPage] rendering", page);
	return (
		<>
			<Heading>Reviews</Heading>
			<PaginationBar
				href="/reviews"
				page={page}
				pageCount={pageCount}
			/>
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
