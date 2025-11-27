import { fetcher } from "@/api/util/fetch";
import { useMutation } from "@tanstack/react-query";
import type {
	PresignedURLDTO,
	PresignedURLResponse,
} from "../types/get-presigned-url";

export const useGetPresignedUploadUrl = () =>
	useMutation<PresignedURLResponse, Error, PresignedURLDTO, void>({
		mutationFn: (imageData) =>
			fetcher<PresignedURLResponse>("/api/upload/single/init", imageData, {
				method: "POST",
			}),
	});
