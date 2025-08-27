import { createFileRoute } from "@tanstack/react-router";
import "mapbox-gl/dist/mapbox-gl.css";
import { InteractiveMap } from "@/components/map/map";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/map-demo")({
	component: DemoMap,
});

function DemoMap() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<InteractiveMap />
		</SidebarProvider>
	);
}
