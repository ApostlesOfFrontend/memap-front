import { fetcher } from "@/api/util/fetch";
import { useQuery } from "@tanstack/react-query";
import { tripQueryKeys } from "../query-keys";
import type { TripListResponse } from "../types/list";

export const useTripsList = () =>
	useQuery<TripListResponse>({
		queryKey: tripQueryKeys.all,
		queryFn: () => fetcher<TripListResponse>("/api/trips"),
	});
