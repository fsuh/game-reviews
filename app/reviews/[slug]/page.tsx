import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { getReview, getSlugs } from "@/lib/reviews";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
import CommentListSkeleton from "@/components/CommentListSkeleton";

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
	if (!review) {
		notFound();
	}
	return {
		title: review.title,
	};
};

export const generateStaticParams = async (): Promise<ReviewPageParams[]> => {
	const slugs = await getSlugs();
	return slugs.map((slug) => ({ slug }));
};

const ReviewPages = async ({ params: { slug } }: ReviewPageProps) => {
	//console.log("[ReviewPage] rendering:", slug);
	// await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate loading time
	const review = await getReview(slug);
	if (!review) {
		notFound();
	}
	return (
		<>
			<Heading>{review.title}</Heading>
			<p className="font-semibold pb-3">{review.subtitle}</p>
			<div className="flex gap-3 items-baseline">
				<p className="italic pb-2">{review.date}</p>
				<ShareLinkButton />
			</div>
			<Image
				src={review.image}
				alt=""
				priority
				width="640"
				height="360"
				className="mb-2 rounded"
			/>
			<article
				dangerouslySetInnerHTML={{ __html: review.body || "" }}
				className="max-w-screen-sm prose prose-slate"
			></article>
			<section className="border-dashed border-t max-w-screen-sm mt-3 py-3">
				<h2 className="font-bold flex gap-2 items-center text-xl">
					<ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
					Comments
				</h2>
				<CommentForm
					slug={review.slug}
					title={review.title}
				/>
				<Suspense fallback={<CommentListSkeleton />}>
					<CommentList slug={review.slug} />
				</Suspense>
			</section>
		</>
	);
};
export default ReviewPages;
