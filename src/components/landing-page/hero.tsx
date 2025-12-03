import { Link } from "@tanstack/react-router";
import { ArrowRight, RouteIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FadeIn } from "../ui/fade-in";

export const Hero = () => {
	return (
		<section
			className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:pb-24 lg:pt-16 lg:px-8"
			aria-labelledby="hero-title"
		>
			<FadeIn className="flex flex-col gap-12 lg:flex-row lg:items-center">
				<div className="flex-1 space-y-6">
					<p className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
						<span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
							<RouteIcon className="h-3 w-3" />
						</span>
						<span>Turn every trip into a story you can revisit.</span>
					</p>

					<div className="space-y-4">
						<h1
							id="hero-title"
							className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
						>
							Save the routes you take.
							<br />
							Relive the moments you capture.
						</h1>
						<p className="max-w-xl text-balance text-sm text-muted-foreground sm:text-base">
							Memap is your private map of memories. Plot the places you visit,
							attach the photos you love, and come back to every trip as if you
							never left.
						</p>
						<p className="max-w-xl text-balance text-sm text-muted-foreground sm:text-base">
							No social feeds. No distractions. Just you and your journeys.
						</p>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						<div className="flex flex-wrap gap-2">
							<Button asChild size="lg">
								<Link to="/app/map">
									Start your next trip
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button asChild variant="outline" size="lg">
								<Link to="/login">Sign in to your map</Link>
							</Button>
						</div>
					</div>

					<dl className="grid grid-cols-2 gap-4 text-xs text-muted-foreground sm:max-w-md sm:text-sm md:grid-cols-3">
						<div>
							<dt className="font-medium text-foreground">Trips</dt>
							<dd>Save routes across cities, hikes, and roadtrips.</dd>
						</div>
						<div>
							<dt className="font-medium text-foreground">Photos</dt>
							<dd>Attach multiple images to every stop on your route.</dd>
						</div>
						<div>
							<dt className="font-medium text-foreground">Memories</dt>
							<dd>Return to the details that would otherwise fade.</dd>
						</div>
					</dl>
				</div>
			</FadeIn>
		</section>
	);
};
