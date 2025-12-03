import { selectedRouteStore } from "@/state/selected-route";
import type { FeatureCollection, MultiLineString } from "geojson";
import type { Position } from "geojson";
import { type RefObject, useEffect, useMemo } from "react";

const calculateBounds = (
	coordinates: Position[],
): [[number, number], [number, number]] => {
	if (coordinates.length === 0) {
		// Default bounds if no coordinates
		return [
			[0, 0],
			[0, 0],
		];
	}

	let minLng = coordinates[0][0];
	let maxLng = coordinates[0][0];
	let minLat = coordinates[0][1];
	let maxLat = coordinates[0][1];

	for (const [lng, lat] of coordinates) {
		minLng = Math.min(minLng, lng);
		maxLng = Math.max(maxLng, lng);
		minLat = Math.min(minLat, lat);
		maxLat = Math.max(maxLat, lat);
	}

	return [
		[minLng, minLat],
		[maxLng, maxLat],
	];
};

export const useRenderRoute = (map: RefObject<mapboxgl.Map | null>) => {
	const { route } = selectedRouteStore();

	const transformedRoute: FeatureCollection<MultiLineString> = useMemo(() => {
		if (!route || route.length === 0) {
			return {
				type: "FeatureCollection",
				features: [],
			};
		}

		return {
			type: "FeatureCollection",
			features: [
				{
					type: "Feature",
					geometry: {
						type: "MultiLineString",
						coordinates: [route],
					},
					properties: {},
				},
			],
		};
	}, [route]);

	// Initialize the source and layer on map load (only once)
	useEffect(() => {
		if (!map.current) return;

		const initializeRoute = () => {
			const mapInstance = map.current;
			if (!mapInstance) return;

			// Add source if it doesn't exist (with empty data initially)
			if (!mapInstance.getSource("route")) {
				const emptyRoute: FeatureCollection<MultiLineString> = {
					type: "FeatureCollection",
					features: [],
				};

				mapInstance.addSource("route", {
					type: "geojson",
					data: emptyRoute,
				});

				// Add layer if it doesn't exist
				if (!mapInstance.getLayer("route")) {
					mapInstance.addLayer({
						id: "route",
						source: "route",
						type: "line",
						paint: {
							"line-width": 2,
							"line-color": "#007cbf",
							"line-emissive-strength": 1,
						},
					});
				}
			}
		};

		// If map is already loaded, initialize immediately
		if (map.current.loaded()) {
			initializeRoute();
		} else {
			// Otherwise wait for load event
			map.current.once("load", initializeRoute);
		}

		// Cleanup
		return () => {
			if (map.current) {
				map.current.off("load", initializeRoute);
			}
		};
	}, [map]);

	// Update the route data when it changes (only after source is initialized)
	useEffect(() => {
		if (!map.current) return;

		const updateRoute = () => {
			const mapInstance = map.current;
			if (!mapInstance) return;

			const source = mapInstance.getSource("route") as
				| mapboxgl.GeoJSONSource
				| undefined;
			if (source) {
				source.setData(transformedRoute);

				// Animate map to fit the route bounds
				if (route && route.length > 0) {
					const bounds = calculateBounds(route);
					mapInstance.fitBounds(bounds, {
						padding: 50,
						duration: 2000,
					});
				}
			}
		};

		// Only update if map is loaded and source exists
		if (map.current.loaded()) {
			updateRoute();
		} else {
			// Wait for load event, then update
			map.current.once("load", () => {
				// Small delay to ensure source is initialized
				setTimeout(updateRoute, 0);
			});
		}
	}, [map, transformedRoute, route]);
};
