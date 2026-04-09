import type { DraftPointPhoto } from "@/state/trip-draft";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Position } from "geojson";
import { GripVertical, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DraftPointPhotos } from "./draft-point-photos";

export const DraftRoutePoint = ({
	id,
	name,
	location,
	photos,
	onNameChange,
	onAddPhotos,
	onRemovePhoto,
	onRemove,
}: {
	id: string;
	name?: string | null;
	location: Position;
	photos: DraftPointPhoto[];
	onNameChange: (name: string) => void;
	onAddPhotos: (files: File[]) => void;
	onRemovePhoto: (photoId: string) => void;
	onRemove: () => void;
}) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.8 : undefined,
	};

	return (
		<div ref={setNodeRef} style={style} className="rounded-md bg-muted p-2">
			<div className="flex items-start justify-between gap-2">
				<div className="flex min-w-0 flex-1 items-center gap-2">
					<button
						ref={setActivatorNodeRef}
						{...attributes}
						{...listeners}
						className="cursor-grab rounded p-1 hover:bg-white/5 active:cursor-grabbing"
						aria-label="Drag handle"
					>
						<GripVertical className="h-4 w-4 opacity-70" />
					</button>
					<div className="min-w-0 flex-1">
						<Input
							value={name ?? ""}
							onChange={(event) => onNameChange(event.target.value)}
							placeholder={`${location[1].toFixed(3)}, ${location[0].toFixed(3)}`}
							aria-label="Location name"
							className="h-8 text-sm"
						/>
					</div>
				</div>
				<Button
					size="icon"
					variant="ghost"
					className="hover:bg-white/5"
					onClick={onRemove}
				>
					<X />
				</Button>
			</div>
			<div className="mt-3 pl-8">
				<DraftPointPhotos
					photos={photos}
					onAddPhotos={onAddPhotos}
					onRemovePhoto={onRemovePhoto}
				/>
			</div>
		</div>
	);
};
