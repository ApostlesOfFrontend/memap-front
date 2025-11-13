import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { MapOverlayCard } from "../ui/map-overlay-card";
import { Skeleton } from "../ui/skeleton";

export const TripDetailsSkeleton = () => {
	return (
		<MapOverlayCard>
			<CardHeader>
				<CardTitle>
					<Skeleton className="h-6 w-48" />
				</CardTitle>
				<CardDescription>
					<Skeleton className="h-5 w-full" />
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<div className="flex items-center gap-2 text-sm">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-4 w-32" />
					</div>
					<div className="flex items-center gap-2 text-sm">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-4 w-32" />
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex gap-2 justify-end">
				<Skeleton className="h-9 w-9 rounded-md" />
				<Skeleton className="h-9 w-20 rounded-md" />
			</CardFooter>
		</MapOverlayCard>
	);
};
