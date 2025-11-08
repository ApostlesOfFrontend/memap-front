import { create } from "zustand";

//TODO: Refactor types
type RoutePoint = [number, number];

interface TripDraftState {
	isDrawingMode: boolean;
	draftRoute: RoutePoint[];
	toggleDrawingMode: () => void;
	addPoint: (point: RoutePoint) => void;
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
			draftRoute: [...state.draftRoute, point],
		})),
	removePoint: (index) =>
		set((state) => ({
			draftRoute: state.draftRoute.filter((_, i) => i !== index),
		})),
	clearDraft: () =>
		set(() => ({
			draftRoute: [],
		})),
}));
