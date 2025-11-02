import { InteractiveMap } from "@/components/map/map";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/map")({
	component: RouteComponent,
});

function RouteComponent() {
	return <InteractiveMap />;
}
