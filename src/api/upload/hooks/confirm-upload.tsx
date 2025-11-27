import { fetcher } from "@/api/util/fetch";
import { useMutation } from "@tanstack/react-query";
import type {
	ConfirmUploadDTO,
	ConfirmUploadResponse,
} from "../types/confirm-upload";

export const useConfirmUpload = () =>
	useMutation<ConfirmUploadResponse, Error, ConfirmUploadDTO, void>({
		mutationFn: (confirmationData) =>
			fetcher<ConfirmUploadResponse>(
				"/api/upload/single/confirm",
				confirmationData,
				{
					method: "POST",
				},
			),
	});
