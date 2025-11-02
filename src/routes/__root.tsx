import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import type { AuthContextI } from "@/lib/auth-context.tsx";
import type { QueryClient } from "@tanstack/react-query";

export interface RouterContext {
	queryClient: QueryClient;
	auth: AuthContextI;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
			<TanStackQueryLayout />
		</>
	),
});
