import { fetcher } from "@/api/util/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { tripQueryKeys } from "../query-keys";

export const useDeleteTripMutation = (onSuccessCallback?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation<unknown, Error, { tripId: number }, void>({
		mutationFn: ({ tripId }) =>
			fetcher(`/api/trips/${tripId}`, null, {
				method: "DELETE",
			}),
		onSuccess: () => {
			toast.success("Trip deleted successfully");
			queryClient.invalidateQueries({ queryKey: tripQueryKeys.all });
			if (onSuccessCallback) onSuccessCallback();
		},
		onError: () => {
			toast.error("There was an error when deleting a trip");
		},
	});
};
