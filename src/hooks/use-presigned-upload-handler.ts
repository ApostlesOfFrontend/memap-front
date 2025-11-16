import { useGetPresignedUploadUrl } from "@/api/upload/hooks/get-presigned-url";

export const usePresignedUploadHandler = () => {
	const { mutateAsync } = useGetPresignedUploadUrl();
	return async (file: File) => {
		const resp = await mutateAsync();

		console.log(resp);
		const uploadResponse = await fetch(resp.signedUrl, {
			method: "PUT",
			body: file,
		});
		console.log(uploadResponse);
	};
};
