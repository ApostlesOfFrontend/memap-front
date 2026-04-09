import { useCreateTripMutation } from "@/api/trip/hooks/create";
import type { CreateTripDTO } from "@/api/trip/types/create";
import { useConfirmBatchUpload } from "@/api/upload/hooks/confirm-upload";
import { useGetBatchPresignedUploadUrl } from "@/api/upload/hooks/get-presigned-url";
import type { ConfirmBatchUploadDTO } from "@/api/upload/types/confirm-upload";
import type { BatchPresignedURLDTO } from "@/api/upload/types/get-presigned-url";
import { tripDraftStore } from "@/state/trip-draft";

export const useCreateTripFlow = (onSuccessCallback: () => void) => {
	const {
		mutateAsync: createTrip,
		isPending,
		isError,
	} = useCreateTripMutation(onSuccessCallback);
	const { mutateAsync: getBatchPresignedUploadUrl } =
		useGetBatchPresignedUploadUrl();
	const { mutateAsync: confirmBatchUpload } = useConfirmBatchUpload();
	const { draftRoute } = tripDraftStore();

	const getDraftFileByClientId = () =>
		new Map(
			draftRoute
				.flatMap(({ photos }) => photos)
				.map((photo) => [photo.clientId, photo.file]),
		);

	const flow = async (data: CreateTripDTO) => {
		const tripData = await createTrip(data);

		const persistedPointIds = new Map(
			tripData.points.map((point) => [point.clientId, point.id]),
		);

		const routeDTO: BatchPresignedURLDTO = {
			tripId: tripData.id,
			points: draftRoute
				.map(({ clientId, photos }) => ({
					pointId: persistedPointIds.get(clientId),
					files: photos.map((photo) => ({
						clientId: photo.clientId,
						name: photo.file.name,
						size: photo.file.size,
						type: photo.file.type,
					})),
				}))
				.filter(
					(
						point,
					): point is {
						pointId: number;
						files: BatchPresignedURLDTO["points"][number]["files"];
					} => typeof point.pointId === "number" && point.files.length > 0,
				),
		};

		if (routeDTO.points.length === 0) {
			return tripData;
		}

		const presignedUrls = await getBatchPresignedUploadUrl(routeDTO);
		const filesByClientId = getDraftFileByClientId();

		await Promise.all(
			presignedUrls.map(async (url) => {
				const file = filesByClientId.get(url.clientId);
				if (!file) {
					throw new Error(`Missing draft file for upload ${url.clientId}`);
				}

				const uploadResponse = await fetch(url.signedUrl, {
					method: "PUT",
					body: file,
					headers: {
						"Content-Type": url.type,
					},
				});
				if (!uploadResponse.ok) {
					throw new Error(`Failed to upload image ${url.clientId}`);
				}
			}),
		);

		const imagesByPointId = new Map<number, string[]>();
		for (const { pointId, uuid } of presignedUrls) {
			const images = imagesByPointId.get(pointId) ?? [];
			images.push(uuid);
			imagesByPointId.set(pointId, images);
		}

		const confirmPayload: ConfirmBatchUploadDTO = {
			tripId: tripData.id,
			points: Array.from(imagesByPointId.entries()).map(
				([pointId, images]) => ({
					pointId,
					images,
				}),
			),
		};

		await confirmBatchUpload(confirmPayload);

		return tripData;
	};

	return { flow, isPending, isError };
};
