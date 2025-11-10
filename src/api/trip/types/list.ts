export interface POI {
	id: number;
	tripId: number;
	name?: string | null;
	lat: number;
	lng: number;
}

export interface Trip {
	id: number;
	name: string;
	description: string;
	dateFrom: string;
	dateTo: string;
	createdAt: string;
	updatedAt: string;
	points: Array<POI>;
}

export type TripListResponse = Array<Trip>;
