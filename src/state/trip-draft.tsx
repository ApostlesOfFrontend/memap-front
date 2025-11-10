import { create } from "zustand";

//TODO: Refactor types
type RoutePoint = [number, number];

export interface DraftRoutePoint {
	name?: string | null;
	location: RoutePoint;
}

interface TripDraftState {
	isDrawingMode: boolean;
	draftRoute: DraftRoutePoint[];
	toggleDrawingMode: () => void;
	addPoint: (point: RoutePoint) => void;
	addFullPoint: (point: DraftRoutePoint) => void;
	removePoint: (index: number) => void;
	clearDraft: () => void;
}

export const tripDraftStore = create<TripDraftState>((set) => ({
	isDrawingMode: false,
	draftRoute: [],
	toggleDrawingMode: () =>
		set((state) => ({ isDrawingMode: !state.isDrawingMode, draftRoute: [] })),
	addPoint: (point) =>
		set((state) => ({
			draftRoute: [...state.draftRoute, { name: null, location: point }],
		})),
	removePoint: (index) =>
		set((state) => ({
			draftRoute: state.draftRoute.filter((_, i) => i !== index),
		})),
	clearDraft: () =>
		set(() => ({
			draftRoute: [],
		})),
	addFullPoint: (point) =>
		set((state) => ({ draftRoute: [...state.draftRoute, point] })),
}));
