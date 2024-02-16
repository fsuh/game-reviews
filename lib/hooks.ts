import { useEffect, useState } from "react";

import type { ActionError, ActionFunction } from "@/app/reviews/actions";
import type { FormEvent } from "react";

interface CommentFormState {
	loading: boolean;
	error: ActionError | null;
}
export type UseFormStateResult = [
	CommentFormState,
	(event: FormEvent<HTMLFormElement>) => Promise<void>
];

export const useFormState = (action: ActionFunction): UseFormStateResult => {
	const [state, setState] = useState<CommentFormState>({
		loading: false,
		error: null,
	});
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setState({ loading: true, error: null });
		const form = event.currentTarget;
		const formData = new FormData(form);
		const result = await action(formData);
		if (result?.isError) {
			setState({ loading: false, error: result });
		} else {
			form.reset();
			setState({ loading: false, error: null });
		}
	};
	return [state, handleSubmit];
};

export const useIsClient = () => {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => setIsClient(true), []);
	return isClient;
};
