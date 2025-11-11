import { tripDraftStore } from "@/state/trip-draft";
import { RotateCcw, Save, X } from "lucide-react";
import { Geocoder } from "../map/geocoder";
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
	const {
		isDrawingMode,
		draftRoute,
		clearDraft,
		toggleDrawingMode,
		removePoint,
	} = tripDraftStore();

	if (!isDrawingMode) return;

	return (
		<div className="absolute top-2 left-2 z-50 min-w-xs">
			<Card>
				<CardHeader>
					<CardTitle>Route Points</CardTitle>
					<CardDescription>Select places where you have been</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4">
						<Geocoder />
						<div className="flex flex-col gap-2 max-h-[400px] ">
							{draftRoute.map((route, index) => {
								const { location, name } = route;
								return (
									<div
										key={`${location[0]}-${location[1]}-${index}`}
										className="flex p-2 bg-muted rounded-md items-center justify-between"
									>
										<div className="truncate max-w-52">
											<span className="text-sm font-mono">
												{name
													? name
													: `${location[1].toFixed(3)}, ${location[0].toFixed(3)}`}
											</span>
										</div>
										<Button
											size="icon"
											variant="ghost"
											className="hover:bg-white/5"
											onClick={() => removePoint(index)}
										>
											<X />
										</Button>
									</div>
								);
							})}
						</div>
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
