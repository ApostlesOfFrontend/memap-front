import type { DateRange } from "react-day-picker";

export interface CreateTripPointDTO {
	name?: string | null;
	location: [number, number];
}

export interface CreateTripDTO {
	title: string;
	description: string;
	dates: DateRange;
	route?: CreateTripPointDTO[];
}

export interface CreateTripPointResponseDTO {
	id: number;
	clientId: string;
	name: string;
	location: [number, number];
}

export interface CreateTripResponseDTO {
	id: number;
	name: string;
	description: string;
	dateFrom: Date;
	dateTo: Date;
	points: CreateTripPointResponseDTO[];
}
