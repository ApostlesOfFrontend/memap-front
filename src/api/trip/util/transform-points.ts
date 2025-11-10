import type { Route } from "@/state/selected-route";
import type { DraftRoutePoint } from "@/state/trip-draft";
import type { POI } from "../types/list";

export const transformPointsToDraft = (
	points: Array<POI>,
): Array<DraftRoutePoint> => {
	return points.map((point) => ({
		name: point.name,
		location: [point.lng, point.lat],
	}));
};

export const transformPointsToRoute = (points: Array<POI>): Array<Route> => {
	return points.map((point) => [point.lng, point.lat]);
};
