import { tripDraftStore } from "@/state/trip-draft";
import type { FeatureCollection, LineString } from "geojson";
import { type RefObject, useEffect, useMemo } from "react";

export const useDrawingMode = (map: RefObject<mapboxgl.Map | null>) => {
	const { isDrawingMode, draftRoute, addPoint, removePoint } = tripDraftStore();

	const route = draftRoute.map((point) => point.location);

	// Transform draft route to GeoJSON format for rendering
	const draftRouteGeoJSON: FeatureCollection<LineString> = useMemo(() => {
		if (draftRoute.length === 0) {
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
						type: "LineString",
						coordinates: route,
					},
					properties: {},
				},
			],
		};
	}, [draftRoute, route]);

	// Initialize drawing layers on map load
	useEffect(() => {
		if (!map.current) return;

		const init = () => {
			const m = map.current;
			if (!m) return;

			const emptyGeoJSON = { type: "FeatureCollection" as const, features: [] };

			// Line layer
			if (!m.getSource("draft-route-line")) {
				m.addSource("draft-route-line", {
					type: "geojson",
					data: emptyGeoJSON,
				});
			}
			if (!m.getLayer("draft-route-line")) {
				m.addLayer({
					id: "draft-route-line",
					source: "draft-route-line",
					type: "line",
					paint: {
						"line-width": 2,
						"line-color": "#10b981",
						"line-emissive-strength": 1,
					},
				});
			}

			// Markers layer
			if (!m.getSource("draft-route-markers")) {
				m.addSource("draft-route-markers", {
					type: "geojson",
					data: emptyGeoJSON,
				});
			}
			if (!m.getLayer("draft-route-markers")) {
				m.addLayer({
					id: "draft-route-markers",
					source: "draft-route-markers",
					type: "circle",
					paint: {
						"circle-radius": 6,
						"circle-color": "#10b981",
						"circle-emissive-strength": 1,
					},
				});
			}
		};

		if (map.current.loaded()) {
			init();
		} else {
			map.current.once("load", init);
		}

		return () => {
			map.current?.off("load", init);
		};
	}, [map]);

	// Handle map clicks when in drawing mode
	useEffect(() => {
		if (!map.current || !isDrawingMode) return;

		const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
			if (!e.lngLat) return;

			const mapInstance = map.current;
			if (!mapInstance) return;

			// Check if click is on a marker (to remove it)
			const features = mapInstance.queryRenderedFeatures(e.point, {
				layers: ["draft-route-markers"],
			});

			if (features.length > 0) {
				// Clicked on a marker - remove the point
				const feature = features[0];
				const index = feature.properties?.index;
				if (typeof index === "number") {
					removePoint(index);
				}
			} else {
				/**
				 * Clicked on empty space - add a new point
				 * [longitude, latitude]
				 * */
				const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
				addPoint(coordinates);
			}
		};

		map.current.on("click", handleMapClick);

		// Change cursor to indicate drawing mode
		map.current.getCanvas().style.cursor = "crosshair";

		return () => {
			if (map.current) {
				map.current.off("click", handleMapClick);
				map.current.getCanvas().style.cursor = "";
			}
		};
	}, [map, isDrawingMode, addPoint, removePoint]);

	// Update draft route on map
	useEffect(() => {
		if (!map.current) return;

		const update = () => {
			const m = map.current;
			if (!m) return;

			const lineSource = m.getSource("draft-route-line") as
				| mapboxgl.GeoJSONSource
				| undefined;
			const markersSource = m.getSource("draft-route-markers") as
				| mapboxgl.GeoJSONSource
				| undefined;

			lineSource?.setData(draftRouteGeoJSON);

			if (markersSource) {
				markersSource.setData({
					type: "FeatureCollection",
					features: route.map((coord, index) => ({
						type: "Feature" as const,
						geometry: { type: "Point" as const, coordinates: coord },
						properties: { index },
					})),
				});
			}
		};

		if (map.current.loaded()) {
			update();
		} else {
			map.current.once("load", update);
		}
	}, [map, draftRouteGeoJSON, route]);
};
