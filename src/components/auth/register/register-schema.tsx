import z from "zod";

export const registerSchema = z
	.object({
		emailAddress: z
			.email("You must provide valid email")
			.min(2, "You must provide email"),
		name: z
			.string()
			.min(2, "You must provide your name")
			.max(30, "Is your name really that long?"),
		password: z
			.string()
			.min(8, "Password has to contain at least 8 characters"),
		confirmPassword: z.string(),
	})
	.superRefine((_, ctx) => {
		if (ctx.value.password !== ctx.value.confirmPassword) {
			ctx.addIssue({
				code: "custom",
				message: "Passwords must be the same",
				path: ["confirmPassword"],
			});
		}
	});
