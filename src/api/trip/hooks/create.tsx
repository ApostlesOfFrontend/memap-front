import { fetcher } from "@/api/util/fetch";
import { useMutation } from "@tanstack/react-query";

export const useCreateTripMutation = () => {
	return useMutation({
		mutationFn: (trip) =>
			fetcher("/api/trips", {
				body: JSON.stringify(trip),
				method: "POST",
			}),
	});
};
