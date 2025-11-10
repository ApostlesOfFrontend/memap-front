import { useTripsList } from "@/api/trip/hooks/list";
import { transformPointsToRoute } from "@/api/trip/util/transform-points";
import { selectedRouteStore } from "@/state/selected-route";
import { tripDraftStore } from "@/state/trip-draft";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { ErrorState } from "../network/error";
import Loader from "../network/loading";
import { SidebarMenuButton, SidebarMenuItem } from "../sidebar";

export const SidebarTripsList = () => {
	const { setRoute } = selectedRouteStore();
	const { isDrawingMode, toggleDrawingMode } = tripDraftStore();
	const { data, error, isPending, refetch } = useTripsList();

	if (isPending) return <Loader />;

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
		<SidebarMenuItem key={item.id}>
			<SidebarMenuButton
				asChild
				onClick={() => {
					if (!isDrawingMode) {
						setRoute(transformPointsToRoute(item.points));
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
