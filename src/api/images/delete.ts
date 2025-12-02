import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { tripQueryKeys } from "../trip/query-keys";
import { fetcher } from "../util/fetch";

export const useDeleteImage = (onSuccessCallback?: () => void) => {
	const queryClient = useQueryClient();

	return useMutation<unknown, Error, string, void>({
		mutationFn: (tripId) =>
			fetcher(`/api/images/${tripId}`, null, { method: "DELETE" }),
		onSuccess: () => {
			toast.success("Deleted image successfully");
			queryClient.invalidateQueries({ queryKey: tripQueryKeys.all });
			if (onSuccessCallback) onSuccessCallback();
		},
		onError: () => {
			toast.error("There was an error when deleting an image");
		},
	});
};
