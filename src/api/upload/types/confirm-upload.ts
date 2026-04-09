export type ConfirmUploadDTO = {
	tripId: number;
	imageUuid: string;
};

export type ConfirmUploadResponse = {
	success: string;
	id: string;
};

export type ConfirmBatchUploadResponse = {
	status: string;
	images: Array<string>;
};

export type ConfirmBatchUploadDTO = {
	tripId: number;
	points: Array<{
		pointId: number;
		images: Array<string>;
	}>;
};
