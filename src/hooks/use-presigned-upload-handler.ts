import { useConfirmUpload } from "@/api/upload/hooks/confirm-upload";
import { useGetPresignedUploadUrl } from "@/api/upload/hooks/get-presigned-url";

export const usePresignedUploadHandler = () => {
	const { mutateAsync: getPresignedUrl } = useGetPresignedUploadUrl();
	const { mutateAsync: confirmUpload } = useConfirmUpload();

	return async (file: File, tripId: number) => {
		const resp = await getPresignedUrl({
			name: file.name,
			size: file.size,
			type: file.type,
			tripId,
		});

		const uploadResponse = await fetch(resp.signedUrl, {
			method: "PUT",
			body: file,
			headers: {
				"Content-Type": file.type,
			},
		});

		if (!uploadResponse.ok)
			throw new Error("Failed attepmt to add file to storage");

		const confirmationResponse = await confirmUpload({
			tripId,
			imageUuid: resp.uuid,
		});
		return confirmationResponse.id;
	};
};
