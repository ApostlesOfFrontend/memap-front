import { LogoutButton } from "@/components/ui/logout-button";
import { isAuthenticatedGuard } from "@/guards/is-authenticated";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/protected-route2")({
	component: RouteComponent,
	beforeLoad: isAuthenticatedGuard,
});

function RouteComponent() {
	return (
		<div>
			Hello "/protected-route"!{" "}
			<Link to="/protected-route">Do protected-route</Link>
			<LogoutButton />
		</div>
	);
}
