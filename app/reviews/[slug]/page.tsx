import Image from "next/image";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";

interface ReviewPageParams {
	slug: string;
}

interface ReviewPageProps {
	params: ReviewPageParams;
}

export const generateMetadata = async ({
	params: { slug },
}: ReviewPageProps) => {
	const review = await getReview(slug);
	return {
		title: review.title,
	};
};

export const generateStaticParams = async (): Promise<ReviewPageParams[]> => {
	const slugs = await getSlugs();
	return slugs.map((slug) => ({ slug }));
};

const ReviewPages = async ({ params: { slug } }: ReviewPageProps) => {
	const review = await getReview(slug);
	return (
		<>
			<Heading>{review.title}</Heading>
			<div className="flex gap-3 items-baseline">
				<p className="italic pb-2">{review.date}</p>
				<ShareLinkButton />
			</div>
			<Image
				src={review.image}
				alt=""
				width="640"
				height="360"
				className="mb-2 rounded"
			/>
			<article
				dangerouslySetInnerHTML={{ __html: review.body || "" }}
				className="max-w-screen-sm prose prose-slate"
			></article>
		</>
	);
};
export default ReviewPages;
