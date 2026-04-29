import { useTripDetails } from "@/api/trip/hooks/get";
import { QueryKeys } from "@/lib/nuqs-query-keys";
import { selectedRouteStore } from "@/state/selected-route";
import { formatDate } from "@/util/format-date";
import { Calendar, CalendarCheck2, X } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { PhotosDrawer } from "../trip-photos/photos-drawer";
import { Button } from "../ui/button";
import { ErrorState } from "../ui/network/error";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DeleteTripDialog } from "./delete-dialog";
import { TripDetailsSkeleton } from "./skeleton";

export const TripDetails = ({ tripId }: { tripId: number }) => {
	// elevated conditional rendering to avoid non-null assertions
	const [_, setSelectedId] = useQueryState(
		QueryKeys.SelectedTrip,
		parseAsInteger,
	);
	const { data, isLoading, isError, refetch } = useTripDetails(tripId);
	const { setRoute } = selectedRouteStore();

	if (isLoading) return <TripDetailsSkeleton />;

	if (!data || isError)
		return (
			<div className="mx-2 my-3">
				<ErrorState onRetry={refetch} />
			</div>
		);

	return (
		<div className="mx-2 my-3 flex flex-col gap-4">
			<div className="space-y-1">
				<h2 className="text-sm font-semibold tracking-tight text-sidebar-foreground">
					{data.name}
				</h2>
				<p className="text-xs leading-relaxed text-muted-foreground">
					{data.description || "Trip details and media"}
				</p>
			</div>

			<div className="space-y-3 rounded-lg border border-sidebar-border/80 bg-background/60 p-3">
				<div className="flex items-center gap-2 text-sm">
					<Calendar className="h-4 w-4 text-muted-foreground" />
					<span className="text-muted-foreground">Start:</span>
					<span className="font-medium">{formatDate(data.dateFrom)}</span>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<CalendarCheck2 className="h-4 w-4 text-muted-foreground" />
					<span className="text-muted-foreground">End:</span>
					<span className="font-medium">{formatDate(data.dateTo)}</span>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-2">
				<DeleteTripDialog />
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="outline"
							onClick={() => {
								setSelectedId(null);
								setRoute([]);
							}}
						>
							<X />
							Close
						</Button>
					</TooltipTrigger>
					<TooltipContent>Closes this trip</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<PhotosDrawer tripId={tripId}>
							<Button>Photos</Button>
						</PhotosDrawer>
					</TooltipTrigger>
					<TooltipContent>View photos from this trip</TooltipContent>
				</Tooltip>
			</div>
		</div>
	);
};
