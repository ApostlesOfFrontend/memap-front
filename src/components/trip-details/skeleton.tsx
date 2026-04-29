import { Skeleton } from "../ui/skeleton";

export const TripDetailsSkeleton = () => {
	return (
		<div className="mx-2 my-3 flex flex-col gap-4 rounded-xl border border-sidebar-border/70 bg-sidebar-accent/30 p-4 shadow-sm">
			<div className="space-y-2">
				<Skeleton className="h-5 w-40" />
				<Skeleton className="h-4 w-full" />
			</div>
			<div className="space-y-3 rounded-lg border border-sidebar-border/80 bg-background/60 p-3">
				<div className="flex items-center gap-2 text-sm">
					<Skeleton className="h-4 w-16" />
					<Skeleton className="h-4 w-28" />
				</div>
				<div className="flex items-center gap-2 text-sm">
					<Skeleton className="h-4 w-16" />
					<Skeleton className="h-4 w-28" />
				</div>
			</div>
			<div className="grid grid-cols-3 gap-2">
				<Skeleton className="h-9 rounded-md" />
				<Skeleton className="h-9 rounded-md" />
				<Skeleton className="h-9 rounded-md" />
			</div>
		</div>
	);
};
