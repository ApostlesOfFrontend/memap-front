import { RegisterForm } from "@/components/auth/register/register";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register")({
	component: Register,
});

function Register() {
	return (
		<div className="h-screen w-full flex items-center justify-center">
			<RegisterForm />
		</div>
	)
}
