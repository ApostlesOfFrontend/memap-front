import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
	component: Login,
});

function Login() {
	return (
		<div>
			<main>Hello login</main>
		</div>
	);
}
