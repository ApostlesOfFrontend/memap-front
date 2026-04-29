import type { Map as MapboxMap } from "mapbox-gl";
import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
	useRef,
} from "react";

type FlyToOptions = Parameters<MapboxMap["flyTo"]>[0];

interface MapControllerContextValue {
	registerMap: (map: MapboxMap | null) => void;
	flyTo: (options: FlyToOptions) => void;
}

const MapControllerContext = createContext<MapControllerContextValue | null>(
	null,
);

export const MapControllerProvider = ({ children }: PropsWithChildren) => {
	const mapRef = useRef<MapboxMap | null>(null);

	const registerMap = useCallback((map: MapboxMap | null) => {
		mapRef.current = map;
	}, []);

	const flyTo = useCallback((options: FlyToOptions) => {
		mapRef.current?.flyTo(options);
	}, []);

	const value = useMemo(
		() => ({
			registerMap,
			flyTo,
		}),
		[registerMap, flyTo],
	);

	return (
		<MapControllerContext.Provider value={value}>
			{children}
		</MapControllerContext.Provider>
	);
};

export const useMapController = () => {
	const context = useContext(MapControllerContext);

	if (!context) {
		throw new Error(
			"useMapController must be used within a MapControllerProvider.",
		);
	}

	return context;
};
