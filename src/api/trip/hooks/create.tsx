import { fetcher } from "@/api/util/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { tripQueryKeys } from "../query-keys";
import type { CreateTripDTO } from "../types/create";

export const useCreateTripMutation = (onSuccessCallback?: () => void) => {
	//TODO: rework unknown and Error - uniformly handle are success mutations and errors
	const queryClient = useQueryClient();
	return useMutation<unknown, Error, CreateTripDTO, void>({
		mutationFn: (trip) =>
			fetcher("/api/trips", trip, {
				method: "POST",
			}),
		onSuccess: () => {
			toast.success("Added trip successfully");
			queryClient.invalidateQueries({ queryKey: tripQueryKeys.all });
			if (onSuccessCallback) onSuccessCallback();
		},
		onError: () => {
			toast.error("There was an error when creating trip");
		},
	});
};
