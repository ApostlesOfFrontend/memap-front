import { FadeIn } from "../ui/fade-in";
import { Feature } from "./components/feature";

export const Features = () => {
	return (
		<section
			className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8"
			aria-labelledby="features-title"
		>
			<FadeIn className="space-y-8 sm:space-y-10">
				<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
							Why Memap
						</p>
						<h2
							id="features-title"
							className="mt-1 text-lg font-semibold tracking-tight sm:text-xl"
						>
							Designed for people who travel and want to remember.
						</h2>
					</div>
					<p className="max-w-md text-xs text-muted-foreground sm:text-sm">
						Under the hood, Memap is focused on fast interactions, offline–ish
						friendly flows, and a clean dark interface that gets out of your
						way.
					</p>
				</div>
				<div className="grid gap-4 md:grid-cols-3">
					<Feature
						title="Built on a real map"
						description="Draw precise routes with map-powered interactions instead of typing notes you'll never read again."
					/>
					<Feature
						title="Photo-first memories"
						description="Each point along the route is a tiny gallery, so you always see your trip through the lens you captured it with."
					/>
					<Feature
						title="Focused, private space"
						description="No public profiles, no likes, no feeds—just your trips, exactly how you experienced them."
					/>
				</div>
			</FadeIn>
		</section>
	);
};
