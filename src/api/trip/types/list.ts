import type { TripBaseI } from "./get";

export interface POI {
	id: number;
	tripId: number;
	name?: string | null;
	lat: number;
	lng: number;
}

export interface Trip extends TripBaseI {
	points: Array<POI>;
}

export type TripListResponse = Array<Trip>;
