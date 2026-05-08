import type { RouterContext } from "@/routes/__root";
import { redirect } from "@tanstack/react-router";

export const isAlreadyAuthenticatedGuard = async ({
	context,
}: { context: RouterContext }) => {
	const isAuthenticated = await context.auth.isAuthenticatedWithReauth();
	if (isAuthenticated) {
		throw redirect({
			to: "/app/map",
		});
	}
};
