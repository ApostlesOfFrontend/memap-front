import z from "zod";

export const loginSchema = z.object({
	email: z
		.email("You must provide valid email")
		.min(2, "You must provide email"),
	password: z.string().min(8, "Password has to contain at least 8 characters"),
});
