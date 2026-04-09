import type { UploadStatus } from "@/components/image/upload-status";
import type { Position } from "geojson";
import { create } from "zustand";

export interface DraftPointPhoto {
	clientId: string;
	file: File;
	objectUrl: string;
	status: UploadStatus;
	uploadedImageId?: string;
	uploadUuid?: string;
}

export interface DraftRoutePoint {
	clientId: string;
	name?: string | null;
	location: Position;
	photos: DraftPointPhoto[];
}

export interface DraftRoutePointInput {
	clientId?: string;
	name?: string | null;
	location: Position;
	photos?: DraftPointPhoto[];
}

interface TripDraftState {
	isDrawingMode: boolean;
	draftRoute: DraftRoutePoint[];
	toggleDrawingMode: () => void;
	addPoint: (point: Position) => void;
	addFullPoint: (point: DraftRoutePointInput) => void;
	editPoint: (
		pointId: string,
		next: Partial<Pick<DraftRoutePoint, "name" | "location">>,
	) => void;
	addPointPhotos: (pointId: string, files: File[]) => void;
	updatePointPhotoStatus: (
		pointId: string,
		photoId: string,
		status: UploadStatus,
		next?: Partial<Omit<DraftPointPhoto, "clientId" | "file" | "objectUrl">>,
	) => void;
	removePointPhoto: (pointId: string, photoId: string) => void;
	removePoint: (pointId: string) => void;
	setDraftRoute: (next: DraftRoutePoint[]) => void;
	clearDraft: () => void;
}

const createDraftPoint = ({
	clientId,
	name,
	location,
	photos,
}: DraftRoutePointInput): DraftRoutePoint => ({
	clientId: clientId ?? crypto.randomUUID(),
	name: name ?? null,
	location,
	photos: photos ?? [],
});

const createDraftPointPhoto = (file: File): DraftPointPhoto => ({
	clientId: crypto.randomUUID(),
	file,
	objectUrl: URL.createObjectURL(file),
	status: "awaiting",
});

const revokePhoto = (photo: DraftPointPhoto) => {
	URL.revokeObjectURL(photo.objectUrl);
};

const revokePointPhotos = (point: DraftRoutePoint) => {
	point.photos.forEach(revokePhoto);
};

export const tripDraftStore = create<TripDraftState>((set) => ({
	isDrawingMode: false,
	draftRoute: [],
	toggleDrawingMode: () =>
		set((state) => {
			revokePointPhotosFromRoute(state.draftRoute);
			return { isDrawingMode: !state.isDrawingMode, draftRoute: [] };
		}),
	addPoint: (point) =>
		set((state) => ({
			draftRoute: [...state.draftRoute, createDraftPoint({ location: point })],
		})),
	addFullPoint: (point) =>
		set((state) => ({
			draftRoute: [...state.draftRoute, createDraftPoint(point)],
		})),
	editPoint: (pointId, next) =>
		set((state) => ({
			draftRoute: state.draftRoute.map((point) =>
				point.clientId === pointId ? { ...point, ...next } : point,
			),
		})),
	addPointPhotos: (pointId, files) =>
		set((state) => ({
			draftRoute: state.draftRoute.map((point) =>
				point.clientId === pointId
					? {
							...point,
							photos: [...point.photos, ...files.map(createDraftPointPhoto)],
						}
					: point,
			),
		})),
	updatePointPhotoStatus: (pointId, photoId, status, next) =>
		set((state) => ({
			draftRoute: state.draftRoute.map((point) =>
				point.clientId === pointId
					? {
							...point,
							photos: point.photos.map((photo) =>
								photo.clientId === photoId
									? { ...photo, ...next, status }
									: photo,
							),
						}
					: point,
			),
		})),
	removePointPhoto: (pointId, photoId) =>
		set((state) => ({
			draftRoute: state.draftRoute.map((point) => {
				if (point.clientId !== pointId) return point;
				const photoToRemove = point.photos.find(
					(photo) => photo.clientId === photoId,
				);
				if (photoToRemove) revokePhoto(photoToRemove);
				return {
					...point,
					photos: point.photos.filter((photo) => photo.clientId !== photoId),
				};
			}),
		})),
	removePoint: (pointId) =>
		set((state) => {
			const pointToRemove = state.draftRoute.find(
				(point) => point.clientId === pointId,
			);
			if (pointToRemove) revokePointPhotos(pointToRemove);
			return {
				draftRoute: state.draftRoute.filter(
					(point) => point.clientId !== pointId,
				),
			};
		}),
	setDraftRoute: (next) =>
		set(() => ({
			draftRoute: next,
		})),
	clearDraft: () =>
		set((state) => {
			revokePointPhotosFromRoute(state.draftRoute);
			return {
				draftRoute: [],
			};
		}),
}));

const revokePointPhotosFromRoute = (route: DraftRoutePoint[]) => {
	route.forEach(revokePointPhotos);
};
