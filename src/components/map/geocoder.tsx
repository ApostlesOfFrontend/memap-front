import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { tripDraftStore } from "@/state/trip-draft";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

export const Geocoder = () => {
	const geocoderRef = useRef<MapboxGeocoder>(null);
	const { addFullPoint } = tripDraftStore();

	useEffect(() => {
		if (geocoderRef.current) return;
		if (!mapboxgl.accessToken) throw new Error("Mabpox token not ser");

		geocoderRef.current = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			useBrowserFocus: true,
			flyTo: true,
			marker: false,
		});

		geocoderRef.current.on("result", (e) => {
			addFullPoint({
				name: e.result.text,
				location: e.result.geometry.coordinates,
			});
			geocoderRef.current?.clear();
		});

		geocoderRef.current.addTo("#geocoder");
	}, [addFullPoint]);

	return <div className="w-full max-w-none" id="geocoder" />;
};
