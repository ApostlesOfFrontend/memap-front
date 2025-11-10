import { fetcher } from "@/api/util/fetch";
import { useMutation } from "@tanstack/react-query";
import type { CreateTripDTO } from "../types/create";

export const useCreateTripMutation = () => {
	//TODO: rework unknown and Error - uniformly handle are success mutations and errors
	return useMutation<unknown, Error, CreateTripDTO, void>({
		mutationFn: (trip) =>
			fetcher("/api/trips", trip, {
				method: "POST",
			}),
	});
};
