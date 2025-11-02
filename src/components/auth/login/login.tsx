import { useAppForm } from "@/components/forms/context";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth-client";
import { formOptions } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { loginSchema } from "./login-schema";

const useLoginFormOptions = () => {
	const navigate = useNavigate();

	const loginFormOptions = formOptions({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: loginSchema,
		},
		onSubmit: async ({ value }) => {
			const { error } = await auth.signIn.email({
				email: value.email,
				password: value.password,
			});

			//TODO: refactor error handling
			if (error) {
				if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
					toast.error("Invalid email or password");
					return;
				}
				toast.error("There was an error when you tried to log in", {
					description: "If error persists please contact administration",
				});
			} else {
				navigate({ to: "/protected-route" });
			}
		},
	});
	return loginFormOptions;
};

export const LoginForm = () => {
	const loginFormOptions = useLoginFormOptions();
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
					{/**TODO: implement google social sign on */}
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
