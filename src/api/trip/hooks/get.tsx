import { fetcher } from "@/api/util/fetch";
import { allImagesProcessed } from "@/util/image-processing";
import { useQuery } from "@tanstack/react-query";
import { tripQueryKeys } from "../query-keys";
import type { TripBaseI } from "../types/get";

export const useTripDetails = (tripId: number) =>
	useQuery<TripBaseI>({
		queryKey: tripQueryKeys.details(tripId),
		queryFn: () => fetcher<TripBaseI>(`/api/trips/${tripId}`),
		refetchInterval: (query) =>
			allImagesProcessed(query.state.data) ? false : 3000,
	});
