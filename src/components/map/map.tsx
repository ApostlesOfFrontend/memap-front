import { useRef } from "react";
import { useMapInit } from "./hooks/use-initialize";
import { useRenderRoute } from "./hooks/use-render-route";

export const InteractiveMap = () => {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);

	useMapInit(mapContainer, map);

	useRenderRoute(map);

	return (
		<div className="w-full h-screen relative p-2 pl-0">
			<div
				ref={mapContainer}
				id="map-container"
				className="w-full h-full rounded-lg"
			/>
		</div>
	);
};
