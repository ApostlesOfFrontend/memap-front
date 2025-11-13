import { useTripsList } from "@/api/trip/hooks/list";
import { transformPointsToRoute } from "@/api/trip/util/transform-points";
import { QueryKeys } from "@/lib/nuqs-query-keys";
import { cn } from "@/lib/utils";
import { selectedRouteStore } from "@/state/selected-route";
import { tripDraftStore } from "@/state/trip-draft";
import { PlusCircle } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { toast } from "sonner";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { ErrorState } from "../network/error";
import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
} from "../sidebar";

export const SidebarTripsList = () => {
	const { setRoute } = selectedRouteStore();
	const { isDrawingMode, toggleDrawingMode } = tripDraftStore();
	const { data, error, isPending, refetch } = useTripsList();
	const [selectedId, setSelectedId] = useQueryState(
		QueryKeys.SelectedTrip,
		parseAsInteger,
	);

	if (isPending) return <SidebarTripsListSkeleton />;

	if (error) return <ErrorState onRetry={refetch} />;

	if (data.length === 0)
		return (
			<Card className="m-4 text-center border-dashed border-2 border-muted-foreground/20">
				<CardHeader>
					<CardTitle className="text-lg font-semibold text-muted-foreground">
						No trips yet
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-center space-y-3">
					<p className="text-sm text-muted-foreground">
						Start by creating your first trip route.
					</p>
					<Button
						variant="default"
						onClick={() => {
							toggleDrawingMode();
							setRoute([]);
						}}
						className="flex items-center gap-2"
					>
						<PlusCircle className="w-4 h-4" />
						Add New Trip
					</Button>
				</CardContent>
			</Card>
		);

	return data?.map((item) => (
		<SidebarMenuItem
			key={item.id}
			className={cn({ "bg-sidebar-accent rounded-md": item.id === selectedId })}
		>
			<SidebarMenuButton
				asChild
				onClick={() => {
					if (!isDrawingMode) {
						setRoute(transformPointsToRoute(item.points));
						setSelectedId(item.id);
					} else {
						toast.warning("Exit adding new trip first!");
					}
				}}
			>
				<span>{item.name}</span>
			</SidebarMenuButton>
		</SidebarMenuItem>
	));
};

export const SidebarTripsListSkeleton = () => {
	return Array.from({ length: 5 }).map((_, index) => (
		// biome-ignore lint/suspicious/noArrayIndexKey: only for short term display
		<SidebarMenuItem key={index}>
			<SidebarMenuSkeleton />
		</SidebarMenuItem>
	));
};
