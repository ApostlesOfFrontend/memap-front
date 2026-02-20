import type { RouterContext } from "@/routes/__root";
import { redirect } from "@tanstack/react-router";
import { toast } from "sonner";

export const isAuthenticatedGuard = async ({
	context,
}: { context: RouterContext }) => {
	const isAuthenticated = await context.auth.isAuthenticated();
	if (!isAuthenticated) {
		toast.error("There was an error while getting user information");
		throw redirect({
			to: "/login",
		});
	}
};
