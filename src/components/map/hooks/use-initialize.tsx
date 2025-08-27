import mapboxgl from "mapbox-gl";
import { type RefObject, useEffect } from "react";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "";

export const useMapInit = (
	mapContainer: RefObject<HTMLDivElement | null>,
	map: RefObject<mapboxgl.Map | null>,
) => {
	useEffect(() => {
		if (map.current) return;

		if (!mapContainer.current) {
			console.error("Map container not found");
			return;
		}

		if (!mapboxgl.accessToken) {
			console.error("Mapbox access token is not set.");
			return;
		}

		console.log("Initializing Mapbox map...");

		try {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/chpiotr06/cmcnaoeh9009q01r11j6iby4z", // Most reliable style
				center: [-96, 37.8],
				zoom: 3,
				// pitch: 40,
				logoPosition: "bottom-left",
			});

			map.current.on("load", () => {
				console.log("Map loaded successfully");
			});

			map.current.on("error", (e) => {
				console.error("Map error:", e);
			});

			map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
		} catch (error) {
			console.error("Error initializing map:", error);
		}

		// Cleanup function
		return () => {
			if (map.current) {
				console.log("Cleaning up map...");
				map.current.remove();
				map.current = null;
			}
		};
	}, [mapContainer, map]);
};
