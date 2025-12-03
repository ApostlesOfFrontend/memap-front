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
import type { RefObject } from "react";
import { Geocoder } from "../map/geocoder";
import { Button } from "../ui/button";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { MapOverlayCard } from "../ui/map-overlay-card";
import { DraftRoutePoint } from "./draft-point-row";
import { SaveTripDialog } from "./save";

export const NewTrip = ({ map }: { map: RefObject<mapboxgl.Map | null> }) => {
	const {
		isDrawingMode,
		draftRoute,
		setDraftRoute,
		clearDraft,
		toggleDrawingMode,
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
		<MapOverlayCard>
			<CardHeader>
				<CardTitle>Route Points</CardTitle>
				<CardDescription>Select places where you have been</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-4">
					<Geocoder map={map} />
					<div className="flex flex-col gap-2 max-h-[400px] overflow-auto">
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
											onRemove={() => removePoint(index)}
										/>
									);
								})}
							</SortableContext>
						</DndContext>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex gap-2 justify-end">
				<Button size="icon" onClick={() => toggleDrawingMode()}>
					<X />
				</Button>
				<Button size="icon" onClick={() => clearDraft()}>
					<RotateCcw />
				</Button>
				<SaveTripDialog>
					<Button size="icon">
						<Save />
					</Button>
				</SaveTripDialog>
			</CardFooter>
		</MapOverlayCard>
	);
};
