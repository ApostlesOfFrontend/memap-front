import { Images, MapIcon, RouteIcon } from "lucide-react";
import { FadeIn } from "../ui/fade-in";
import { Feature } from "./components/feature";

export const HowItWorks = () => {
	return (
		<section
			className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8"
			aria-labelledby="how-it-works-title"
		>
			<FadeIn className="space-y-8 sm:space-y-10">
				<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
							How it works
						</p>
						<h2
							id="how-it-works-title"
							className="mt-1 text-lg font-semibold tracking-tight sm:text-xl"
						>
							From a blank map to a trip you can replay.
						</h2>
					</div>
					<p className="max-w-md text-xs text-muted-foreground sm:text-sm">
						Memap is built for flow: add a route, drop the important stops, and
						attach the photos that matter at each point along the way.
					</p>
				</div>
				<div className="grid gap-4 md:grid-cols-3">
					<Feature
						icon={<MapIcon />}
						title="Plot your route"
						description="Open the map, sketch your journey, and drop points for every place worth remembering."
					/>
					<Feature
						icon={<Images />}
						title="Attach your photos"
						description="Add multiple images to each stop so your map looks exactly like the trip felt."
					/>
					<Feature
						icon={<RouteIcon />}
						title="Replay the story"
						description="Scroll through your route, tap into each stop, and revisit the moments tied to the exact place they happened."
					/>
				</div>
			</FadeIn>
		</section>
	);
};
