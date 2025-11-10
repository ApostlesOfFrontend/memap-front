import type { DraftRoutePoint } from "@/state/trip-draft";
import type { DateRange } from "react-day-picker";

export interface CreateTripDTO {
	title: string;
	description: string;
	dates: DateRange;
	route?: DraftRoutePoint[];
}
