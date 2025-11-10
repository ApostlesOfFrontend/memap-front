import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/sidebar/sidebar";
import { isAuthenticatedGuard } from "@/guards/is-authenticated";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
	component: RouteComponent,
	beforeLoad: isAuthenticatedGuard,
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<Outlet />
		</SidebarProvider>
	);
}
