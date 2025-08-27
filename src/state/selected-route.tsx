import { create } from "zustand";

interface SelectedRouteState {
	uuid: string | null;
	setUuid: (uuid: string) => void;
	deleteUuid: () => void;
}
export const selectedRouteStore = () =>
	create<SelectedRouteState>((set) => ({
		uuid: null,
		setUuid: (uuid) => set(() => ({ uuid: uuid })),
		deleteUuid: () => set(() => ({ uuid: null })),
	}));
