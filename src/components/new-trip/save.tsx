import { useCreateTripMutation } from "@/api/trip/hooks/create";
import { tripDraftStore } from "@/state/trip-draft";
import { type ReactNode, useState } from "react";
import { toast } from "sonner";
import { useAppForm } from "../forms/context";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { type NewTripFormSchema, newTripSchema } from "./form-schema";

export const SaveTripDialog = ({ children }: { children: ReactNode }) => {
	const { draftRoute } = tripDraftStore();
	const [opened, setOpened] = useState(false);
	const { mutate } = useCreateTripMutation();

	const form = useAppForm({
		defaultValues: {
			title: "",
			description: "",
			route: draftRoute,
			dates: undefined,
			/**
			 * TODO: find better solution than following `as Partial`
			 * Implemented due to type mismatch between schema and default values where dates are undefined
			 * I want to keep dates as undefined to initially show placeholder simultaneously
			 * keeping dates in zod required for validation purposes.
			 * When dates are deleted from default values then <form.AppField> name property
			 * does not recognize dates field.
			 */
		} as Partial<NewTripFormSchema>,
		validators: {
			onSubmit: newTripSchema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
			mutate(value);
		},
	});

	const onOpenChange = (open: boolean): void => {
		if (draftRoute.length > 1) {
			setOpened(() => open);
		} else {
			toast.error("Please select at least to points to create a route");
		}
	};

	return (
		<Dialog open={opened} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<form.AppForm>
						<DialogHeader>
							<DialogTitle>Save trip</DialogTitle>
							<DialogDescription>Add details about your trip</DialogDescription>
						</DialogHeader>
						<div className="w-full my-4 flex flex-col gap-4">
							<form.AppField
								name="title"
								children={(field) => (
									<field.Input
										label="Trip Title"
										placeholder="The Grand Tour"
									/>
								)}
							/>
							<form.AppField
								name="dates"
								children={(field) => (
									<field.DateRangePicker
										label="Date"
										description="Choose a date range when you had your trip"
									/>
								)}
							/>
							<form.AppField
								name="description"
								children={(field) => (
									<field.Textarea
										label="Descripton"
										placeholder="First trip around the world"
										description="Describe your trip in a few words"
									/>
								)}
							/>
						</div>

						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button>Save</Button>
						</DialogFooter>
					</form.AppForm>
				</form>
			</DialogContent>
		</Dialog>
	);
};
