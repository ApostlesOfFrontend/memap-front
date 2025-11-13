import { QueryKeys } from "@/lib/nuqs-query-keys";
import { selectedRouteStore } from "@/state/selected-route";
import { tripDraftStore } from "@/state/trip-draft";
import { Plus } from "lucide-react";
import { useQueryState } from "nuqs";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const NewTripTrigger = () => {
	const { deleteRoute } = selectedRouteStore();
	const { toggleDrawingMode } = tripDraftStore();
	const [_, setSelectedId] = useQueryState(QueryKeys.SelectedTrip);

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant="ghost"
					className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center"
					onClick={() => {
						toggleDrawingMode();
						deleteRoute();
						setSelectedId(null);
					}}
				>
					<Plus size={32} />
				</Button>
			</TooltipTrigger>
			<TooltipContent side="left">Create new trip</TooltipContent>
		</Tooltip>
	);
};
