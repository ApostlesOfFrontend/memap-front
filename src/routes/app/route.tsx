import { MapControllerProvider } from "@/components/map/map-context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/sidebar/sidebar";
import { isAuthenticatedGuard } from "@/guards/is-authenticated";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
	component: RouteComponent,
	beforeLoad: isAuthenticatedGuard,
});

function RouteComponent() {
	return (
		<MapControllerProvider>
			<SidebarProvider>
				<AppSidebar />
				<div className="pointer-events-none fixed top-4 left-4 z-40 md:hidden">
					<SidebarTrigger className="pointer-events-auto h-10 w-10 rounded-full border bg-background/90 shadow-lg backdrop-blur-sm" />
				</div>
				<Outlet />
			</SidebarProvider>
		</MapControllerProvider>
	);
}
