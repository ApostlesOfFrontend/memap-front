import type { FeatureCollection, MultiLineString } from "geojson";
import { type RefObject, useEffect } from "react";

export const useRenderRoute = (map: RefObject<mapboxgl.Map | null>) => {
	const transformedRoute: FeatureCollection<MultiLineString> = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				geometry: {
					type: "MultiLineString",
					coordinates: [
						[
							[-74.006, 40.7128],
							[-0.1276, 51.5074],
							[2.3522, 48.8566],
						],
					],
				},
				properties: {},
			},
		],
	};

	useEffect(() => {
		if (map.current) {
			map.current.on("load", () => {
				map.current?.addSource("route", {
					type: "geojson",
					data: transformedRoute,
				});

				map.current?.addLayer({
					id: "route",
					source: "route",
					type: "line",
					paint: {
						"line-width": 2,
						"line-color": "#007cbf",
						"line-emissive-strength": 1,
					},
				});
			});
		}
	}, [map]);
};
