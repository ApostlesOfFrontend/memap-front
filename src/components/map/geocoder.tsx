import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { tripDraftStore } from "@/state/trip-draft";
import mapboxgl from "mapbox-gl";
import { type RefObject, useEffect, useRef } from "react";

export const Geocoder = ({ map }: { map: RefObject<mapboxgl.Map | null> }) => {
	const geocoderRef = useRef<MapboxGeocoder>(null);
	const { addFullPoint } = tripDraftStore();

	useEffect(() => {
		if (geocoderRef.current) return;
		if (!mapboxgl.accessToken) throw new Error("Mabpox token not ser");

		geocoderRef.current = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			useBrowserFocus: true,
			marker: false,
		});

		geocoderRef.current.on("result", (e) => {
			addFullPoint({
				name: e.result.text,
				location: e.result.geometry.coordinates,
			});
			geocoderRef.current?.clear();

			/**
			 * flyTo interferes with use-drawing-mode.tsx. When point from geocoder is selected it is not immediately rendered od map.
			 * Only adding point by clicking on map would reveal previously added points via geocoder.
			 * timeout here seems to remediate issue.
			 */
			setTimeout(() => {
				map.current?.flyTo({
					center: e.result.geometry.coordinates as [number, number],
					duration: 1000,
					essential: true,
				});
			}, 0);
		});

		geocoderRef.current.addTo("#geocoder");
	}, [addFullPoint, map]);

	return <div className="w-full max-w-none" id="geocoder" />;
};
