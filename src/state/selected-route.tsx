import { create } from "zustand";

export type Route = [number, number];

interface SelectedRouteState {
	route: Route[] | null;
	setRoute: (route: Route[]) => void;
	deleteRoute: () => void;
}
export const selectedRouteStore = create<SelectedRouteState>((set) => ({
	route: null,
	setRoute: (route) => set(() => ({ route: route })),
	deleteRoute: () => set(() => ({ route: null })),
}));
