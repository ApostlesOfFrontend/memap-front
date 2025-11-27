import type { ImagesList } from "@/api/images/list";

export interface TripBaseI {
	createdAt: string;
	dateFrom: string;
	dateTo: string;
	description: string;
	id: number;
	name: string;
	updatedAt: string;
	images: ImagesList;
}
