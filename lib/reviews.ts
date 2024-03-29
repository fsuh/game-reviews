import "server-only";
//import { readdir, readFile } from "node:fs/promises";
//import matter from "gray-matter";
import { marked } from "marked";
import qs from "qs";

export interface Review {
	slug: string;
	title: string;
	subtitle?: string;
	date: string;
	image: string;
	body?: string;
}
export interface PaginatedReviews {
	pageCount: number;
	reviews: Review[];
}
export interface Attributes {
	slug: string;
	title: string;
	body: string;
	subtitle: string;
	publishedAt: string;
	image: {
		data: {
			attributes: {
				url: string;
			};
		};
	};
}

export type SearchableReview = Pick<Attributes, "slug" | "title">;

interface CmsItem {
	id: number;
	attributes: Attributes;
}

const CMS_URL = process.env.CMS_URL;

export const CACHE_TAG_REVIEWS = "reviews";

// export const getReview = async (slug: string): Promise<FullReview> => {
// 	const text = await readFile(`./content/reviews/${slug}.md`, "utf8");
// 	const {
// 		content,
// 		data: { title, date, image },
// 	} = matter(text);
// 	const body = await marked(content);

// 	return { slug, title, date, image, body };
// };

const fetchReviews = async (parameters: unknown) => {
	const url =
		`${CMS_URL}/api/reviews?` +
		qs.stringify(parameters, { encodeValuesOnly: true });
	//console.log("[fetchReviews]:", url);
	const response = await fetch(url, { next: { tags: [CACHE_TAG_REVIEWS] } });
	if (!response.ok) {
		throw new Error(`CMS returned ${response.status} for ${url}`);
	}

	return await response.json();
};

const toReview = (item: CmsItem): Review => {
	const { attributes } = item;
	return {
		slug: attributes.slug,
		title: attributes.title,
		subtitle: attributes.subtitle,
		date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
		//image: CMS_URL + attributes.image.data.attributes.url,
		image: new URL(attributes.image.data.attributes.url, CMS_URL).href,
	};
};
export const getReview = async (slug: string): Promise<Review | null> => {
	const { data } = await fetchReviews({
		filters: { slug: { $eq: slug } },
		fields: ["slug", "title", "body", "subtitle", "publishedAt"],
		populate: { image: { fields: ["url"] } },
		pagination: { pageSize: 1, withCount: false },
		sort: ["publishedAt:desc"],
	});
	if (data.length === 0) {
		return null;
	}
	const item = data[0];
	return { ...toReview(item), body: await marked(item.attributes.body) };
};

// export const getSlugs = async (): Promise<string[]> => {
// 	const files = await readdir("./content/reviews");
// 	return files
// 		.filter((file) => file.endsWith(".md"))
// 		.map((file) => file.slice(0, -".md".length));
// };

export const getSlugs = async (): Promise<string[]> => {
	const { data } = await fetchReviews({
		fields: ["slug"],
		sort: ["publishedAt:desc"],
		pagination: { pageSize: 100 },
	});
	return data.map((item: CmsItem) => item.attributes.slug);
};

// export const getReviews = async () => {
// 	const files = await readdir("./content/reviews");
// 	const slugs = await getSlugs();
// 	const reviews = [];
// 	for (const slug of slugs) {
// 		const review = await getReview(slug);
// 		reviews.push(review);
// 	}
// 	reviews.sort((a, b) => b.date.localeCompare(a.date));
// 	return reviews;
// };

export const getReviews = async (
	pageSize: number,
	page?: number
): Promise<PaginatedReviews> => {
	const { data, meta } = await fetchReviews({
		fields: ["slug", "title", "subtitle", "publishedAt"],
		populate: { image: { fields: ["url"] } },
		pagination: { pageSize, page },
		sort: ["publishedAt:desc"],
	});
	return { pageCount: meta.pagination.pageCount, reviews: data.map(toReview) };
};

// export const getFeaturedReview = async (): Promise<Review> => {
// 	const reviews = await getReviews();
// 	return reviews[0];
// };

export const searchReviews = async (
	query: string
): Promise<SearchableReview[]> => {
	const { data } = await fetchReviews({
		filters: { title: { $containsi: query } },
		fields: ["slug", "title"],
		sort: ["title"],
		pagination: { pageSize: 5 },
	});
	return data.map(({ attributes }: { attributes: SearchableReview }) => ({
		slug: attributes.slug,
		title: attributes.title,
	}));
};
