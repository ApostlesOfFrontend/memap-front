import z from "zod";

export const newTripSchema = z.object({
	title: z.string().min(2, "Provide title for your trip"),
	dates: z.object(
		{
			from: z.date("Please provide begin date"),
			to: z.date("Please provide end date"),
		},
		"Please select your trip dates",
	),
	description: z.string().min(2, "Provide description for your trip"),
	route: z
		.array(z.tuple([z.number(), z.number()]))
		.nonempty("You need to select trip points"),
});

export type NewTripFormSchema = z.infer<typeof newTripSchema>;
