export type ConfirmUploadDTO = {
	tripId: number;
	imageUuid: string;
};

export type ConfirmUploadResponse = {
	success: string;
	id: string;
};
