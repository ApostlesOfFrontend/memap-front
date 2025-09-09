import { LoginForm } from "@/components/auth/login/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
	component: Login,
});

function Login() {
	return (
		<div className="h-screen w-full flex items-center justify-center">
			<LoginForm />
		</div>
	);
}
