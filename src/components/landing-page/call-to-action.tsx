import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { FadeIn } from "../ui/fade-in";

export const CallToAction = () => {
	return (
		<section
			className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8"
			aria-labelledby="cta-title"
		>
			<FadeIn className="overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-r from-primary/15 via-background/80 to-emerald-500/10 p-[1px]">
				<div className="flex flex-col items-start gap-4 bg-background/90 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
					<div className="space-y-1.5">
						<h2
							id="cta-title"
							className="text-base font-semibold tracking-tight sm:text-lg"
						>
							Start drawing your next memory today.
						</h2>
						<p className="max-w-xl text-xs text-muted-foreground sm:text-sm">
							Open the map, add your first stop, and see how quickly a simple
							route turns into a trip you&apos;ll actually remember.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<Button asChild size="sm">
							<Link to="/app/map">
								Open the app
								<ArrowRight className="ml-1.5 h-4 w-4" />
							</Link>
						</Button>
						<Button asChild variant="outline" size="sm">
							<Link to="/login">Sign in</Link>
						</Button>
					</div>
				</div>
			</FadeIn>
		</section>
	);
};
