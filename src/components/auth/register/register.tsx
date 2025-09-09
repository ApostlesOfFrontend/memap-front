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
import { useState } from "react";

const registerFormOpts = formOptions({
	defaultValues: {
		name: "",
		emailAddress: "",
		password: "",
		confirmPassword: "",
	},
});

export const RegisterForm = () => {
	const form = useAppForm({ ...registerFormOpts });
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Card className="max-w-sm w-full">
			<CardHeader>
				<CardTitle className="text-2xl">Create an account</CardTitle>
				<CardDescription className="text-lg">
					Begin your journey
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="flex gap-2 flex-col">
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
				</form>
				<div className="flex flex-col gap-4 mt-4">
					<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
						<span className="bg-card text-muted-foreground relative z-10 px-2">
							Or continue with
						</span>
					</div>
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
