import { Images, LockKeyhole, MapIcon } from "lucide-react";
import type { ReactNode } from "react";
import { FadeIn } from "../ui/fade-in";

const features: Array<{
	icon: ReactNode;
	title: string;
	description: string;
}> = [
	{
		icon: <MapIcon className="h-4 w-4" />,
		title: "Built on a real map",
		description:
			"Draw precise routes with map-powered interactions instead of typing notes you'll never read again.",
	},
	{
		icon: <Images className="h-4 w-4" />,
		title: "Photo-first memories",
		description:
			"Each point along the route is a small gallery, so your trip stays connected to the way you saw it.",
	},
	{
		icon: <LockKeyhole className="h-4 w-4" />,
		title: "Focused, private space",
		description:
			"No public profiles, likes, or feeds—just your trips, exactly how you experienced them.",
	},
];

export const Features = () => {
	return (
		<section
			className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24"
			aria-labelledby="features-title"
		>
			<FadeIn className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
				<div className="max-w-md">
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
						Why Memap
					</p>
					<h2
						id="features-title"
						className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
					>
						A quieter way to remember where you&apos;ve been.
					</h2>
					<p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
						Memap keeps the useful parts of a travel journal close at hand: the
						shape of the route, the places that mattered, and the photos that
						bring it back.
					</p>
				</div>

				<div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
					{features.map((feature, index) => (
						<article
							key={feature.title}
							className={`flex gap-4 p-5 sm:p-6 ${
								index < features.length - 1 ? "border-b border-border/80" : ""
							}`}
						>
							<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
								{feature.icon}
							</div>
							<div>
								<h3 className="text-sm font-semibold tracking-tight sm:text-base">
									{feature.title}
								</h3>
								<p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
									{feature.description}
								</p>
							</div>
						</article>
					))}
				</div>
			</FadeIn>
		</section>
	);
};
