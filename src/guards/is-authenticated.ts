import type { RouterContext } from "@/routes/__root";
import { redirect } from "@tanstack/react-router";

export const isAuthenticatedGuard = async ({
	context,
}: { context: RouterContext }) => {
	const isAuthenticated = await context.auth.isAuthenticated();
	if (!isAuthenticated) {
		throw redirect({
			to: "/login",
		});
	}
};
