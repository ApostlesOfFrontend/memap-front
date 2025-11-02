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
import { useState } from "react";
import { toast } from "sonner";
import { registerSchema } from "./register-schema";

const useRegisterFormOptions = () => {
	const navigate = useNavigate();
	const registerFormOpts = formOptions({
		defaultValues: {
			name: "",
			emailAddress: "",
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: registerSchema,
		},
		onSubmit: async ({ value }) => {
			const { error } = await auth.signUp.email({
				name: value.name,
				email: value.emailAddress,
				password: value.password,
			});

			//TODO: refactor better-auth error handling
			if (error) {
				toast.error("There was an error while creating account");
				return;
			}
			//TODO: redirect to onboarding or paywall
			navigate({ to: "/protected-route" });
		},
	});
	return registerFormOpts;
};

export const RegisterForm = () => {
	const registerFormOpts = useRegisterFormOptions();
	const form = useAppForm({ ...registerFormOpts });
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Card className="max-w-sm w-full">
			<CardHeader>
				<CardTitle className="text-2xl text-center">
					Create an account
				</CardTitle>
				<CardDescription className="text-center">
					Begin your journey
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
							name="emailAddress"
							children={(field) => (
								<field.Input label="Email" placeholder="mail@example.com" />
							)}
						/>
						<form.AppField
							name="name"
							children={(field) => (
								<field.Input label="Name" placeholder="Joe Doe" />
							)}
						/>
						<form.AppField
							name="password"
							children={(field) => (
								<field.HiddenInput
									label="Password"
									placeholder="********"
									show={showPassword}
									setShow={setShowPassword}
								/>
							)}
						/>
						<form.AppField
							name="confirmPassword"
							children={(field) => (
								<field.HiddenInput
									label="Confirm Password"
									placeholder="********"
									show={showPassword}
									setShow={setShowPassword}
								/>
							)}
						/>
						<form.SubmitButton label="Sign up" className="mt-2" />
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
						Sign up with Google
					</Button>
					<div className="text-sm text-center">
						Already have an account?{" "}
						<Link to="/login" className="underline underline-offset-3">
							Login
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
