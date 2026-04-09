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
import { RotateCcw, Save, X } from "lucide-react";
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
		editPoint,
		removePoint,
	} = tripDraftStore();

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
	);

	if (!isDrawingMode) return;
	const items = draftRoute.map((_, index) => `${index}`);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const oldIndex = items.indexOf(String(active.id));
		const newIndex = items.indexOf(String(over.id));
		if (oldIndex === -1 || newIndex === -1) return;
		setDraftRoute(arrayMove(draftRoute, oldIndex, newIndex));
	};

	return (
		<div className="mx-2 my-3 flex flex-col gap-4 shadow-sm">
			<div className="space-y-1">
				<h2 className="text-sm font-semibold tracking-tight text-sidebar-foreground">
					Build a new trip
				</h2>
				<p className="text-xs leading-relaxed text-muted-foreground">
					Search for places or click the map, then drag points into order.
				</p>
			</div>

			<div className="flex flex-col gap-4">
				<Geocoder />
				<div className="flex flex-col gap-2 max-h-[400px] overflow-auto pr-1">
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
							{draftRoute.map((route, index) => {
								const { location, name } = route;
								const id = `${index}`;
								return (
									<DraftRoutePoint
										key={`${location[0]}-${location[1]}-${index}`}
										id={id}
										name={name}
										location={route.location}
										onNameChange={(name) => editPoint(index, { name })}
										onRemove={() => removePoint(index)}
									/>
								);
							})}
						</SortableContext>
					</DndContext>
				</div>

				<div className="grid grid-cols-3 gap-2 pt-1">
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

			{draftRoute.length === 0 ? (
				<p className="rounded-lg border border-dashed border-sidebar-border/80 px-3 py-4 text-center text-xs text-muted-foreground">
					No route points yet. Add one from the search box or directly on the
					map.
				</p>
			) : null}
		</div>
	);
};
