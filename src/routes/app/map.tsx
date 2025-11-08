import { InteractiveMap } from "@/components/map/map";
import { NewTripTrigger } from "@/components/new-trip/new-trip-trigger";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/map")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<InteractiveMap />
			<NewTripTrigger />
		</>
	);
}
