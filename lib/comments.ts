import { db } from "./db";
import type { Comment } from "@prisma/client";

export type CreateCommentData = Omit<Comment, "id" | "postedAt">;

export const getComments = async (slug: string) => {
	return await db.comment.findMany({
		where: { slug },
		orderBy: { postedAt: "desc" },
	});
};

export const createComment = async ({
	slug,
	user,
	message,
}: {
	slug: string;
	user: string;
	message: string;
}) => {
	return await db.comment.create({
		data: {
			slug,
			user,
			message,
		},
	});
};
