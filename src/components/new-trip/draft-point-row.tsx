import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Position } from "geojson";
import { GripVertical, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const DraftRoutePoint = ({
	id,
	name,
	location,
	onNameChange,
	onRemove,
}: {
	id: string;
	name?: string | null;
	location: Position;
	onNameChange: (name: string) => void;
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
		<div
			ref={setNodeRef}
			style={style}
			className="flex p-2 bg-muted rounded-md items-center justify-between"
		>
			<div className="flex items-center gap-2 min-w-0">
				<button
					ref={setActivatorNodeRef}
					{...attributes}
					{...listeners}
					className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/5"
					aria-label="Drag handle"
				>
					<GripVertical className="h-4 w-4 opacity-70" />
				</button>
				<Input
					value={name ?? ""}
					onChange={(event) => onNameChange(event.target.value)}
					placeholder={`${location[1].toFixed(3)}, ${location[0].toFixed(3)}`}
					aria-label="Location name"
					className="h-8 max-w-44 text-sm"
				/>
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
	);
};
