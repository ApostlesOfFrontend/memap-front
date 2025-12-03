import { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { NewTrip } from "@/components/new-trip/new-trip";
import { QueryKeys } from "@/lib/nuqs-query-keys";
import { parseAsInteger, useQueryState } from "nuqs";
import { TripDetails } from "../trip-details/details";
import { useDrawingMode } from "./hooks/use-drawing-mode";
import { useMapInit } from "./hooks/use-initialize";
import { useRenderRoute } from "./hooks/use-render-route";

export const InteractiveMap = () => {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [selectedId] = useQueryState(QueryKeys.SelectedTrip, parseAsInteger);

	useMapInit(mapContainer, map);

	useRenderRoute(map);

	useDrawingMode(map);

	return (
		<div className="w-full h-[calc(100vh-16px)] relative m-2">
			<div
				ref={mapContainer}
				id="map-container"
				className="w-full h-full rounded-lg"
			/>
			<NewTrip map={map} />
			{selectedId && <TripDetails tripId={selectedId} />}
		</div>
	);
};
