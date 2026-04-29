import type { DraftRoutePoint } from "@/state/trip-draft";
import type { Position } from "geojson";
import type { POI } from "../types/list";

export const transformPointsToDraft = (
	points: Array<POI>,
): Array<DraftRoutePoint> => {
	return points.map((point) => ({
		clientId: crypto.randomUUID(),
		name: point.name,
		location: [point.lng, point.lat],
		photos: [],
	}));
};

export const transformPointsToRoute = (points: Array<POI>): Array<Position> => {
	return points.map((point) => [point.lng, point.lat]);
};
