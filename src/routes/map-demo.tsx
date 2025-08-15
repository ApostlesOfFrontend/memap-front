import { createFileRoute } from "@tanstack/react-router";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "";

export const Route = createFileRoute("/map-demo")({
	component: DemoMap,
});

function DemoMap() {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);

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
				center: [-74.5, 40] as [number, number], // NYC area
				zoom: 9,
				attributionControl: true,
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
	}, []);

	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="w-full h-screen relative p-2 pl-0">
				<div
					ref={mapContainer}
					id="map-container"
					className="w-full h-full rounded-lg"
				/>
			</div>
		</SidebarProvider>
	);
}
