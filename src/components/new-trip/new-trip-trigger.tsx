import { selectedRouteStore } from "@/state/selected-route";
import { tripDraftStore } from "@/state/trip-draft";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const NewTripTrigger = () => {
	const { deleteRoute } = selectedRouteStore();
	const { toggleDrawingMode } = tripDraftStore();
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant="ghost"
					className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center"
					onClick={() => {
						toggleDrawingMode();
						deleteRoute();
					}}
				>
					<Plus size={32} />
				</Button>
			</TooltipTrigger>
			<TooltipContent side="left">Create new trip</TooltipContent>
		</Tooltip>
	);
};
