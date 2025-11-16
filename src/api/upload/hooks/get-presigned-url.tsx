import { fetcher } from "@/api/util/fetch";
import { useMutation } from "@tanstack/react-query";
import type { PresignedURLResponse } from "../types/get-presigned-url";

export const useGetPresignedUploadUrl = () =>
	useMutation<PresignedURLResponse>({
		mutationFn: () =>
			fetcher<PresignedURLResponse>(
				"/api/upload/single/init",
				{},
				{ method: "POST" },
			),
	});
