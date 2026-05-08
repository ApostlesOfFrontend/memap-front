import { LoginForm } from "@/components/auth/login/login";
import { isAlreadyAuthenticatedGuard } from "@/guards/is-already-authenticated";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login")({
	component: Login,
	beforeLoad: isAlreadyAuthenticatedGuard,
});

function Login() {
	return (
		<div className="h-screen w-full flex items-center justify-center">
			<LoginForm />
		</div>
	);
}
