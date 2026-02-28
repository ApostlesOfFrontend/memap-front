import { useDeleteTripMutation } from "@/api/trip/hooks/delete";
import { QueryKeys } from "@/lib/nuqs-query-keys";
import { selectedRouteStore } from "@/state/selected-route";
import { Trash } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const DeleteTripDialog = () => {
	const [selectedTripId, setSelectedId] = useQueryState(
		QueryKeys.SelectedTrip,
		parseAsInteger,
	);
	const { deleteRoute } = selectedRouteStore();

	const handleSuccess = () => {
		setSelectedId(null);
		deleteRoute();
	};

	const { mutate: deleteTrip } = useDeleteTripMutation(handleSuccess);

	const handleDeletion = () => {
		if (!selectedTripId) {
			toast.error("No trip selected for deletion");
			return;
		}
		deleteTrip({ tripId: selectedTripId });
	};

	return (
		<AlertDialog>
			<Tooltip>
				<TooltipTrigger asChild>
					<AlertDialogTrigger asChild>
						<Button variant="destructive" size="icon">
							<Trash />
						</Button>
					</AlertDialogTrigger>
				</TooltipTrigger>
				<TooltipContent>Delete trip</TooltipContent>
			</Tooltip>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete this trip?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. All associated data will be
						permanently deleted.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="justify-between">
					<AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
					<AlertDialogAction variant="destructive" onClick={handleDeletion}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
