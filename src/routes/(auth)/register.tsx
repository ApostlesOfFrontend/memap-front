import { RegisterForm } from "@/components/auth/register/register";
import { isAlreadyAuthenticatedGuard } from "@/guards/is-already-authenticated";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register")({
	component: Register,
	beforeLoad: isAlreadyAuthenticatedGuard,
});

function Register() {
	return (
		<div className="h-screen w-full flex items-center justify-center">
			<RegisterForm />
		</div>
	);
}
