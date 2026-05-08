import type { ImagesList } from "@/api/images/list";
import { useTripDetails } from "@/api/trip/hooks/get";
import { transformPointsToRoute } from "@/api/trip/util/transform-points";
import { API } from "@/api/util/fetch";
import { QueryKeys } from "@/lib/nuqs-query-keys";
import { selectedRouteStore } from "@/state/selected-route";
import { differenceInDays } from "date-fns";
import { ArrowLeft, MapIcon, RouteIcon } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";
import { ImagePreview } from "../image/components/image-preview";
import { Button } from "../ui/button";
import { ErrorState } from "../ui/network/error";
import { TripDetailsSkeleton } from "./skeleton";

export const TripCardAlteriative = ({ tripId }: { tripId: number }) => {
	const [_, setSelectedId] = useQueryState(
		QueryKeys.SelectedTrip,
		parseAsInteger,
	);
	const { data, isLoading, isError, refetch } = useTripDetails(tripId);
	const { setRoute } = selectedRouteStore();

	useEffect(() => {
		if (data) setRoute(transformPointsToRoute(data.points));
	}, [data, setRoute]);

	const groupedImages = useMemo(() => {
		const groups = new Map<number, ImagesList>();
		if (!data) return null;

		for (const point of data.points) {
			groups.set(point.id, []);
		}
		for (const image of data.images) {
			const state = groups.get(image.pointId);
			if (!state) return null;
			state.push(image);
		}

		return groups;
	}, [data]);

	if (isLoading) return <TripDetailsSkeleton />;
	if (!data || isError)
		return (
			<div className="mx-2 my-3">
				<ErrorState onRetry={refetch} />
			</div>
		);

	return (
		<div>
			<div className="mx-2 my-3 flex flex-col gap-4 rounded-xl border border-sidebar-border/70 bg-sidebar-accent/30 p-4 shadow-sm">
				<div className="flex items-start justify-between gap-3">
					<div className="space-y-1">
						<div className="flex items-center gap-2 text-sidebar-foreground">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
								<MapIcon className="h-4 w-4" />
							</div>
							<h2 className="text-sm font-semibold tracking-tight text-sidebar-foreground">
								{data.name}
							</h2>
						</div>
						<p className="text-xs leading-relaxed text-muted-foreground">
							Trip with {data.points.length} stops and {data.images.length}{" "}
							photos
						</p>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 shrink-0"
						onClick={() => {
							setSelectedId(null);
							setRoute([]);
						}}
						aria-label="Go back"
					>
						<ArrowLeft className="h-4 w-4" />
					</Button>
				</div>
				{data.images.length ? (
					<ImagePreview images={data.images} initialIndex={0}>
						<Button>All images</Button>
					</ImagePreview>
				) : (
					<Button disabled>All images</Button>
				)}
			</div>
			<div className="rounded-lg border border-sidebar-border/80 bg-background/60 mx-2 p-3 flex flex-col gap-2">
				<div className="flex items-center justify-between text-muted-foreground">
					<span className="inline-flex items-center gap-1.5">
						<RouteIcon className="h-3.5 w-3.5 text-primary" />
						<span>Trip timeline</span>
					</span>
					<span>
						{differenceInDays(new Date(data.dateFrom), new Date(data.dateTo))}{" "}
						days
					</span>
				</div>
				<div className="mt-2 flex flex-col h-full">
					{data.points.map((point, index) => {
						const pointImages = groupedImages?.get(point.id) ?? [];
						const pointName = point.name?.trim() || `Stop ${index + 1}`;
						const isLast = index === data.points.length - 1;

						return (
							<div
								key={point.id}
								className="grid grid-cols-[20px_minmax(0,1fr)] gap-x-3"
							>
								<div className="flex flex-col items-center">
									<div className="mt-1 h-3 w-3 rounded-full border-2 border-primary/70 bg-background" />
									{!isLast ? (
										<div className="mt-2 min-h-10 flex-1 w-px bg-sidebar-border" />
									) : null}
								</div>
								<div className="pb-6">
									<div className="text-sm font-medium text-sidebar-foreground">
										{pointName}
									</div>
									<div className="mt-1 text-xs text-muted-foreground">
										{pointImages.length} photo
										{pointImages.length === 1 ? "" : "s"}
									</div>
									{pointImages.length ? (
										<div className="mt-3 grid grid-cols-2 gap-2">
											{pointImages.map((image, imageIndex) => (
												<ImagePreview
													key={image.id}
													images={pointImages}
													initialIndex={imageIndex}
													label={pointName}
												>
													<button
														type="button"
														className="overflow-hidden rounded-md border border-sidebar-border/80 bg-sidebar transition-opacity hover:opacity-60 cursor-pointer"
														aria-label={`Preview ${image.name || pointName}`}
													>
														<img
															src={`${API}/api/images/${image.id}?type=thumbnail`}
															alt={image.name || pointName}
															className="h-24 w-full object-cover"
														/>
													</button>
												</ImagePreview>
											))}
										</div>
									) : (
										<div className="mt-3 rounded-md border border-dashed border-sidebar-border/80 px-3 py-4 text-xs text-muted-foreground">
											No photos for this stop yet.
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
