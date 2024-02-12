import { NextRequest, NextResponse } from "next/server";
import { searchReviews } from "@/lib/reviews";

export const GET = async (request: NextRequest) => {
	const query = request.nextUrl.searchParams.get("query");
	if (!query) return Response.json(null, { status: 400 });
	const reviews = await searchReviews(query);
	return Response.json(reviews);
};
