import { useCreateTripMutation } from "@/api/trip/hooks/create";
import type { CreateTripDTO } from "@/api/trip/types/create";
import { useConfirmBatchUpload } from "@/api/upload/hooks/confirm-upload";
import { useGetBatchPresignedUploadUrl } from "@/api/upload/hooks/get-presigned-url";
import type { ConfirmBatchUploadDTO } from "@/api/upload/types/confirm-upload";
import type { BatchPresignedURLDTO } from "@/api/upload/types/get-presigned-url";
import { tripDraftStore } from "@/state/trip-draft";
import { useState } from "react";

type FlowError = {
	type: "create-trip" | "get-presigned-urls" | "confirm-uploads";
};
type FileUploadFlowError = {
	type: "file-upload";
	images: Array<{ clientId: string; presignedUrl: string }>;
};

export type CreateTripFlowError = FlowError | FileUploadFlowError;

export const useCreateTripFlow = (onSuccessCallback: () => void) => {
	const { mutateAsync: createTrip, reset: resetCreateTrip } =
		useCreateTripMutation();

	const {
		mutateAsync: getBatchPresignedUploadUrl,
		reset: resetGetBatchPresignedUploadUrl,
	} = useGetBatchPresignedUploadUrl();

	const { mutateAsync: confirmBatchUpload, reset: resetConfirmBatchUpload } =
		useConfirmBatchUpload();

	const [isPending, setIsPending] = useState(false);
	const [errors, setErrors] = useState<CreateTripFlowError>();
	const [progress, setProgress] = useState(0);
	const [status, setStatus] = useState<
		| "creating-trip"
		| "getting-presigned-urls"
		| "uploading-files"
		| "confirming-uploads"
		| "completed"
	>();

	const { draftRoute } = tripDraftStore();

	const photosQty = draftRoute.reduce(
		(acc, point) => acc + point.photos.length,
		0,
	);
	console.log("Total photos to upload:", photosQty);
	const totalActions = photosQty + 3; // 3 actions for createTrip, getBatchPresignedUploadUrl and confirmBatchUpload
	console.log("total actions", totalActions);
	const incrementProgress = () => {
		console.log("Incrementing progress");
		setProgress((prev) => {
			console.log(
				`Previous progress: ${prev}%. Increment: ${1 / totalActions}%`,
			);
			return prev + 1 / totalActions;
		});
	};

	const getDraftFilesByClientId = (): Map<string, File> =>
		new Map(
			draftRoute
				.flatMap(({ photos }) => photos)
				.map((photo) => [photo.clientId, photo.file]),
		);

	const flow = async (data: CreateTripDTO) => {
		setIsPending(true);
		setStatus("creating-trip");
		let tripData: Awaited<ReturnType<typeof createTrip>>;

		try {
			tripData = await createTrip(data);
			incrementProgress();
		} catch {
			setErrors({ type: "create-trip" });
			return;
		}

		const persistedPointIds = new Map(
			tripData.points.map((point) => [point.clientId, point.id]),
		);

		const routeDTO: BatchPresignedURLDTO = {
			tripId: tripData.id,
			points: draftRoute
				.map(({ clientId, photos }) => {
					const pointId = persistedPointIds.get(clientId);

					if (pointId === undefined) {
						console.warn(
							`[createTripFlow] No persisted pointId found for clientId "${clientId}". This point will be skipped for upload.`,
						);
						return null;
					}

					return {
						pointId,
						files: photos.map((photo) => ({
							clientId: photo.clientId,
							name: photo.file.name,
							size: photo.file.size,
							type: photo.file.type,
						})),
					};
				})
				.filter(
					(
						point,
					): point is {
						pointId: number;
						files: BatchPresignedURLDTO["points"][number]["files"];
					} => point !== null && point.files.length > 0,
				),
		};

		if (routeDTO.points.length === 0) {
			return tripData;
		}

		let presignedUrls: Awaited<ReturnType<typeof getBatchPresignedUploadUrl>>;

		try {
			setStatus("getting-presigned-urls");
			presignedUrls = await getBatchPresignedUploadUrl(routeDTO);
			incrementProgress();
		} catch {
			setErrors({ type: "get-presigned-urls" });
			return;
		}

		const filesByClientId = getDraftFilesByClientId();

		setStatus("uploading-files");
		const results = await Promise.allSettled(
			presignedUrls.map(async (url) => {
				const file = filesByClientId.get(url.clientId);
				if (!file) {
					throw new Error(`Missing draft file for upload ${url.clientId}`);
				}

				const uploadResponse = await fetch(url.signedUrl, {
					method: "PUT",
					body: file,
					headers: { "Content-Type": url.type },
				});

				if (!uploadResponse.ok) {
					throw url;
				}
				incrementProgress();
			}),
		);

		const failedUploads = results
			.filter((r): r is PromiseRejectedResult => r.status === "rejected")
			.map((r) => r.reason)
			.filter(
				(reason): reason is { clientId: string; presignedUrl: string } =>
					typeof reason?.clientId === "string" &&
					typeof reason?.presignedUrl === "string",
			);

		if (failedUploads.length > 0) {
			setErrors({ type: "file-upload", images: failedUploads });
		}

		const failedClientIds = new Set(failedUploads.map((u) => u.clientId));

		const imagesByPointId = new Map<number, string[]>();
		for (const { pointId, uuid, clientId } of presignedUrls) {
			if (failedClientIds.has(clientId)) continue;
			const images = imagesByPointId.get(pointId) ?? [];
			images.push(uuid);
			imagesByPointId.set(pointId, images);
		}

		if (imagesByPointId.size === 0) {
			return tripData;
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

		try {
			setStatus("confirming-uploads");
			await confirmBatchUpload(confirmPayload);
		} catch {
			setErrors({ type: "confirm-uploads" });
		}

		incrementProgress();
		setStatus("completed");
		setIsPending(false);
		onSuccessCallback();
		return tripData;
	};

	const reflow = async (data: CreateTripDTO) => {
		setProgress(0);
		setErrors(undefined);
		resetCreateTrip();
		resetGetBatchPresignedUploadUrl();
		resetConfirmBatchUpload();
		return await flow(data);
	};

	return {
		flow,
		isPending,
		reflow,
		errors,
		status,
		progress: 66, //Math.round(progress * 100),
	};
};
