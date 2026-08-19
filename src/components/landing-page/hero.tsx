import { useAuth } from "@/lib/auth-context";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, RouteIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FadeIn } from "../ui/fade-in";
import { DashboardPreview } from "./dashboard-preview";

export const Hero = () => {
	const { isAuthenticated } = useAuth();
	return (
		<section
			className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24"
			aria-labelledby="hero-title"
		>
			<FadeIn className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
				<div className="max-w-xl space-y-7">
					<p className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
						<span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
							<RouteIcon className="h-3 w-3" />
						</span>
						<span>Your private map of memories</span>
					</p>

					<div className="space-y-5">
						<h1
							id="hero-title"
							className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]"
						>
							Save the routes you take.
							<br />
							Relive the moments you capture.
						</h1>
						<p className="max-w-lg text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
							Memap is your private map of memories. Plot the places you visit,
							attach the photos you love, and come back to every trip as if you
							never left.
						</p>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						{isAuthenticated ? (
							<Button asChild size="lg">
								<Link to="/app/map">
									Open your map
									<ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
						) : (
							<>
								<Button asChild size="lg">
									<Link to="/register">
										Create your map
										<ArrowRight className="h-4 w-4" />
									</Link>
								</Button>
								<Button asChild variant="outline" size="lg">
									<Link to="/login">Sign in</Link>
								</Button>
							</>
						)}
					</div>

					<div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
						<span className="inline-flex items-center gap-1.5">
							<Check className="h-3.5 w-3.5 text-primary" />
							Private by default
						</span>
						<span className="inline-flex items-center gap-1.5">
							<Check className="h-3.5 w-3.5 text-primary" />
							Map-first
						</span>
						<span className="inline-flex items-center gap-1.5">
							<Check className="h-3.5 w-3.5 text-primary" />
							Photo-ready
						</span>
					</div>
				</div>

				<DashboardPreview />
			</FadeIn>
		</section>
	);
};
