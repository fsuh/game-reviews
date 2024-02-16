"use client";

import { useState } from "react";
import { createCommentAction } from "@/app/reviews/actions";
import { useFormState } from "@/lib/hooks";


interface CommentFormProps {
	slug: string;
	title: string;
}
const CommentForm = ({ slug, title }: CommentFormProps) => {
	const [state, handleSubmit] = useFormState(createCommentAction);
	return (
		<form
			onSubmit={handleSubmit}
			className="border bg-white flex flex-col gap-2 mt-3 px-3 py-2 rounded"
		>
			<p className="pb-1">
				Already played <strong>{title}</strong>? Have your say!
			</p>
			<input
				type="hidden"
				name="slug"
				value={slug}
			/>
			<div className="flex">
				<label
					htmlFor="userField"
					className="shrink-0 w-32"
				>
					Your name
				</label>
				<input
					type="text"
					id="userField"
					name="user"
					required
					maxLength={50}
					className="border px-2 py-1 rounded w-48"
				/>
			</div>
			<div className="flex">
				<label
					htmlFor="messageField"
					className="shrink-0 w-32"
				>
					Your comment
				</label>
				<textarea
					id="messageField"
					name="message"
					required
					maxLength={500}
					className="border px-2 py-1 rounded w-full"
				/>
			</div>
			{Boolean(state.error) && (
				<p className="text-red-700">{state.error?.message}</p>
			)}
			<button
				type="submit"
				disabled={state.loading}
				className="bg-orange-800 rounded px-2 py-1 self-center text-slate-50 hover:bg-orange-700 disabled:bg-slate-500 disabled:cursor-not-allowed"
			>
				Submit
			</button>
		</form>
	);
};
export default CommentForm;
