import { fetcher } from "@/api/util/fetch";
import { useMutation } from "@tanstack/react-query";
import type { ConfirmUploadDTO } from "../types/confirm-upload";

export const useConfirmUpload = () =>
	useMutation<string, Error, ConfirmUploadDTO, void>({
		mutationFn: (confirmationData) =>
			fetcher<string>("/api/upload/single/confirm", confirmationData, {
				method: "POST",
			}),
	});
