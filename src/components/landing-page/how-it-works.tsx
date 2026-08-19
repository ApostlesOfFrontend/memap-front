import { Images, MapIcon, RouteIcon } from "lucide-react";
import { FadeIn } from "../ui/fade-in";

const steps = [
	{
		icon: <MapIcon className="h-4 w-4" />,
		title: "Plot your route",
		description:
			"Open the map, sketch your journey, and drop points for every place worth remembering.",
	},
	{
		icon: <Images className="h-4 w-4" />,
		title: "Attach your photos",
		description:
			"Add multiple images to each stop so the map holds more than just a line.",
	},
	{
		icon: <RouteIcon className="h-4 w-4" />,
		title: "Replay the story",
		description:
			"Return to the route and revisit the moments tied to the exact place they happened.",
	},
];

export const HowItWorks = () => {
	return (
		<section
			className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24"
			aria-labelledby="how-it-works-title"
		>
			<FadeIn>
				<div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
							How it works
						</p>
						<h2
							id="how-it-works-title"
							className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
						>
							From a blank map to a trip you can replay.
						</h2>
					</div>
					<p className="max-w-md text-sm leading-relaxed text-muted-foreground">
						Add a route, drop the important stops, and attach the photos that
						matter at each point along the way.
					</p>
				</div>

				<div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
					<div className="grid divide-y divide-border/80 md:grid-cols-3 md:divide-x md:divide-y-0">
						{steps.map((step, index) => (
							<article key={step.title} className="p-5 sm:p-7">
								<div className="flex items-center justify-between gap-4">
									<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
										{step.icon}
									</div>
									<span className="text-xs font-medium tabular-nums text-muted-foreground">
										0{index + 1}
									</span>
								</div>
								<h3 className="mt-8 text-base font-semibold tracking-tight">
									{step.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{step.description}
								</p>
							</article>
						))}
					</div>
				</div>
			</FadeIn>
		</section>
	);
};
