import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "./button";

export const LogoutButton = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	return (
		<Button onClick={() => auth.logout(() => navigate({ to: "/login" }))}>
			Logout
		</Button>
	);
};
