"use client";
import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { useIsClient } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { SearchableReview, searchReviews } from "@/lib/reviews";
import { useDebounce } from "use-debounce";

const SearchBox = () => {
	const router = useRouter();
	const isClient = useIsClient();
	const [query, setQuery] = useState("");
	const [debouncedQuery] = useDebounce(query, 300);
	const [reviews, setReviews] = useState<SearchableReview[]>([]);
	useEffect(() => {
		// fetch reviews
		if (debouncedQuery.length > 1) {
			const controller = new AbortController();
			(async () => {
				const url = `/api/search?query=` + encodeURIComponent(debouncedQuery);
				const response = await fetch(url, {
					signal: controller.signal,
				});
				const reviews = await response.json();
				setReviews(reviews);
			})();
			return () => controller.abort();
		} else {
			setReviews([]);
		}
	}, [debouncedQuery]);
	// const filtered = reviews
	// 	.filter((review) =>
	// 		review.title.toLowerCase().includes(query.toLowerCase())
	// 	)
	// 	.slice(0, 5);

	const handleChange = (review: SearchableReview) => {
		router.push(`/reviews/${review.slug}`);
	};

	//console.log("[SearchBox] isClient:", isClient);
	if (!isClient) {
		return null;
	}
	return (
		<div className="relative w-48">
			<Combobox onChange={handleChange}>
				<Combobox.Input
					placeholder="Search..."
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					className="border px-2 py-1 rounded w-full"
				/>
				<Combobox.Options className="absolute bg-white py-1 w-full ">
					{reviews.map((review) => (
						<Combobox.Option
							key={review.slug}
							value={review}
						>
							{({ active }) => (
								<span
									className={`block px-2 truncate w-full
                                ${active ? "bg-orange-100" : ""}`}
								>
									{review.title}
								</span>
							)}
						</Combobox.Option>
					))}
				</Combobox.Options>
			</Combobox>
		</div>
	);
};
export default SearchBox;
