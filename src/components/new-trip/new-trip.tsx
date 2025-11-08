import { tripDraftStore } from "@/state/trip-draft";
import { RotateCcw, Save, X } from "lucide-react";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { SaveTripDialog } from "./save";

export const NewTrip = () => {
	const { isDrawingMode, draftRoute, clearDraft, toggleDrawingMode } =
		tripDraftStore();

	if (!isDrawingMode) return;

	return (
		<div className="absolute top-2 left-2 z-50 min-w-2xs max-w-md">
			<Card>
				<CardHeader>
					<CardTitle>Route Points</CardTitle>
					<CardDescription>Select places where you have been</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
						{draftRoute.map((route, index) => (
							<div
								key={`${route[0]}-${route[1]}-${index}`}
								className="p-2 bg-muted rounded"
							>
								<span className="text-sm font-mono">
									{route[0].toFixed(3)}, {route[1].toFixed(3)}
								</span>
							</div>
						))}
					</div>
				</CardContent>
				<CardFooter className="flex gap-2 justify-end">
					<Button size="icon" onClick={() => toggleDrawingMode()}>
						<X />
					</Button>
					<Button size="icon" onClick={() => clearDraft()}>
						<RotateCcw />
					</Button>
					<SaveTripDialog>
						<Button size="icon">
							<Save />
						</Button>
					</SaveTripDialog>
				</CardFooter>
			</Card>
		</div>
	);
};
