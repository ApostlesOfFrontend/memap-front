import { useAppForm } from "@/components/forms/context";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formOptions } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { loginSchema } from "./login-schema";

const loginFormOptions = formOptions({
	defaultValues: {
		email: "",
		password: "",
	},
	validators: {
		onSubmit: loginSchema,
	},
	onSubmit: () => console.log("submit"),
});

export const LoginForm = () => {
	const form = useAppForm({ ...loginFormOptions });

	return (
		<Card className="max-w-sm w-full">
			<CardHeader>
				<CardTitle className="text-2xl text-center">Welcome back</CardTitle>
				<CardDescription className="text-center">
					Fill in form below to login
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					className="flex gap-3 flex-col"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<form.AppForm>
						<form.AppField
							name="email"
							children={(field) => (
								<field.Input label="Email" placeholder="mail@example.com" />
							)}
						/>
						<form.AppField
							name="password"
							children={(field) => (
								<field.HiddenInput label="Password" placeholder="********" />
							)}
						/>
						<form.SubmitButton label="Sign in" className="mt-2" />
					</form.AppForm>
				</form>
				<div className="flex flex-col gap-4 mt-4">
					<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
						<span className="bg-card text-muted-foreground relative z-10 px-2">
							Or continue with
						</span>
					</div>
					<Button className="w-full" variant="outline">
						Login with Google
					</Button>
					<div className="text-sm text-center">
						Don't have an account?{" "}
						<Link to="/register" className="underline underline-offset-3">
							Create an account
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
