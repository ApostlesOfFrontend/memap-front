import type { TripBaseI } from "@/api/trip/types/get";

export const isImageProcessed = (status: string) => {
	if (status === "processing_finised") return true;
	return false;
};
export const allImagesProcessed = (data?: TripBaseI) =>
	data?.images.every((img) => isImageProcessed(img.status)) ?? false;
