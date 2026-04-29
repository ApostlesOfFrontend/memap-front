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
import { Field, FieldLabel } from "../ui/field";
import { Progress } from "../ui/progress";
import { newTripSchema } from "./form-schema";
import { useCreateTripFlow } from "./hooks/use-create-trip-flow";
import TripLoader from "./trip_photo_loader.svg";

export const SaveTripDialog = ({ children }: { children: ReactNode }) => {
	const { draftRoute, toggleDrawingMode } = tripDraftStore();
	const [opened, setOpened] = useState(false);
	const route = draftRoute.map(({ name, location, clientId, photos }) => ({
		name: name ?? null,
		location: [location[0], location[1]] as [number, number],
		clientId,
		totalPhotos: photos.length,
	}));

	const onSuccess = () => {
		//TODO: would be nice if you were taken to the trip
		setOpened(false);
		toggleDrawingMode();
	};

	const { flow, isPending, progress } = useCreateTripFlow(onSuccess);

	const form = useAppForm({
		defaultValues: {
			title: "",
			description: "",
			route,
			dates: { to: new Date(), from: new Date() },
		},
		validators: {
			onSubmit: newTripSchema,
		},
		onSubmit: ({ value }) => {
			flow({
				...value,
				route,
			});
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
						{isPending ? (
							<div className="flex flex-col items-center justify-center w-full my-4">
								<img
									src={TripLoader}
									alt="Trip loader"
									className="mx-auto mb-4 max-h-60"
								/>
								<Field>
									<FieldLabel htmlFor="progress-upload">
										<span>Upload progress</span>
										<span className="ml-auto">{progress}%</span>
									</FieldLabel>
									<Progress value={progress} id="progress-upload" />
								</Field>
							</div>
						) : (
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
						)}

						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline" disabled={isPending}>
									Cancel
								</Button>
							</DialogClose>
							<Button disabled={isPending}>Save</Button>
						</DialogFooter>
					</form.AppForm>
				</form>
			</DialogContent>
		</Dialog>
	);
};
