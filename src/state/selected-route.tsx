import type { Position } from "geojson";
import { create } from "zustand";

interface SelectedRouteState {
	route: Position[] | null;
	setRoute: (route: Position[]) => void;
	deleteRoute: () => void;
}
export const selectedRouteStore = create<SelectedRouteState>((set) => ({
	route: null,
	setRoute: (route) => set(() => ({ route: route })),
	deleteRoute: () => set(() => ({ route: null })),
}));
