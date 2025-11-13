import { useTripDetails } from "@/api/trip/hooks/get";
import { QueryKeys } from "@/lib/nuqs-query-keys";
import { selectedRouteStore } from "@/state/selected-route";
import { formatDate } from "@/util/format-date";
import { Calendar, CalendarCheck2, X } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { PhotosDrawer } from "../trip-photos/photos-drawer";
import { Button } from "../ui/button";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { MapOverlayCard } from "../ui/map-overlay-card";
import { ErrorState } from "../ui/network/error";
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
			<MapOverlayCard>
				<ErrorState onRetry={refetch} />
			</MapOverlayCard>
		);

	return (
		<MapOverlayCard>
			<CardHeader>
				<CardTitle>{data.name}</CardTitle>
				<CardDescription>{data.description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<div className="flex items-center gap-2 text-sm">
						<Calendar className="w-4 h-4 text-muted-foreground" />
						<span className="text-muted-foreground">Start:</span>
						<span className="font-medium">{formatDate(data.dateFrom)}</span>
					</div>
					<div className="flex items-center gap-2 text-sm">
						<CalendarCheck2 className="w-4 h-4 text-muted-foreground" />
						<span className="text-muted-foreground">End:</span>
						<span className="font-medium">{formatDate(data.dateTo)}</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex gap-2 justify-end">
				<Button
					size="icon"
					onClick={() => {
						setSelectedId(null);
						setRoute([]);
					}}
				>
					<X />
				</Button>
				<PhotosDrawer>
					<Button>Photos</Button>
				</PhotosDrawer>
			</CardFooter>
		</MapOverlayCard>
	);
};
