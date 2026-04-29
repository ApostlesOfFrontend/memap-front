import { fetcher } from "@/api/util/fetch";
import { useMutation } from "@tanstack/react-query";
import type {
	ConfirmBatchUploadDTO,
	ConfirmBatchUploadResponse,
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

export const useConfirmBatchUpload = () =>
	useMutation<ConfirmBatchUploadResponse, Error, ConfirmBatchUploadDTO, void>({
		mutationFn: (confirmationData) =>
			fetcher<ConfirmBatchUploadResponse>(
				"/api/upload/batch/confirm",
				confirmationData,
				{
					method: "POST",
				},
			),
	});
