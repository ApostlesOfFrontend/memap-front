import { tripDraftStore } from "@/state/trip-draft";
import {
	DndContext,
	type DragEndEvent,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { MapPinned, RotateCcw, RouteIcon, Save, X } from "lucide-react";
import { Geocoder } from "../map/geocoder";
import { Button } from "../ui/button";
import { DraftRoutePoint } from "./draft-point-row";
import { SaveTripDialog } from "./save";

export const NewTrip = () => {
	const {
		isDrawingMode,
		draftRoute,
		setDraftRoute,
		clearDraft,
		toggleDrawingMode,
		addPointPhotos,
		editPoint,
		removePointPhoto,
		removePoint,
	} = tripDraftStore();

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
	);

	if (!isDrawingMode) return null;
	const items = draftRoute.map((route) => route.clientId);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const oldIndex = items.indexOf(String(active.id));
		const newIndex = items.indexOf(String(over.id));
		if (oldIndex === -1 || newIndex === -1) return;
		setDraftRoute(arrayMove(draftRoute, oldIndex, newIndex));
	};

	return (
		<div className="mx-2 my-3 flex flex-col gap-4">
			<div className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/30 p-4 shadow-sm">
				<div className="flex items-start justify-between gap-3">
					<div className="space-y-1">
						<div className="flex items-center gap-2 text-sidebar-foreground">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
								<MapPinned className="h-4 w-4" />
							</div>
							<h2 className="text-sm font-semibold tracking-tight text-sidebar-foreground">
								Build a new trip
							</h2>
						</div>
						<p className="text-xs leading-relaxed text-muted-foreground">
							Search for places or click the map, then drag your stops into the
							right order.
						</p>
					</div>
				</div>
				<div className="mt-4 grid grid-cols-3 gap-2">
					<Button variant="outline" onClick={() => toggleDrawingMode()}>
						<X />
						Close
					</Button>
					<Button variant="outline" onClick={() => clearDraft()}>
						<RotateCcw />
						Reset
					</Button>
					<SaveTripDialog>
						<Button>
							<Save />
							Save
						</Button>
					</SaveTripDialog>
				</div>
			</div>

			<div className="rounded-xl border border-sidebar-border/70 bg-background/50 p-3 shadow-sm">
				<div className="flex items-center justify-between gap-3 px-1 pb-3">
					<div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
						<RouteIcon className="h-3.5 w-3.5 text-primary" />
						Route planner
					</div>
					<div className="text-xs text-muted-foreground">
						{draftRoute.length} stop{draftRoute.length === 1 ? "" : "s"}
					</div>
				</div>

				<Geocoder />

				<div className="mt-3 flex flex-col gap-2 overflow-auto pr-1">
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
						modifiers={[restrictToFirstScrollableAncestor]}
					>
						<SortableContext
							items={items}
							strategy={verticalListSortingStrategy}
						>
							{draftRoute.length ? (
								draftRoute.map((route) => {
									const { clientId, location, name, photos } = route;
									return (
										<DraftRoutePoint
											key={clientId}
											id={clientId}
											name={name}
											location={location}
											photos={photos}
											onNameChange={(name) => editPoint(clientId, { name })}
											onAddPhotos={(files) => addPointPhotos(clientId, files)}
											onRemovePhoto={(photoId) =>
												removePointPhoto(clientId, photoId)
											}
											onRemove={() => removePoint(clientId)}
										/>
									);
								})
							) : (
								<p className="rounded-lg border border-dashed border-sidebar-border/80 px-3 py-5 text-center text-xs text-muted-foreground">
									No route points yet. Add one from the search box or directly
									on the map.
								</p>
							)}
						</SortableContext>
					</DndContext>
				</div>
			</div>
		</div>
	);
};
