import { useAuth } from "@/lib/auth-context";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { FadeIn } from "../ui/fade-in";

export const CallToAction = () => {
	const { isAuthenticated } = useAuth();
	return (
		<section
			className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24"
			aria-labelledby="cta-title"
		>
			<FadeIn>
				<div className="relative overflow-hidden rounded-2xl border border-border/80 bg-sidebar px-5 py-7 shadow-sm sm:px-8 sm:py-9">
					<div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
					<div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
						<div className="space-y-2">
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
								Keep the map close
							</p>
							<h2
								id="cta-title"
								className="text-xl font-semibold tracking-tight sm:text-2xl"
							>
								Give your next trip a place to live.
							</h2>
							<p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
								Open the map, add your first stop, and see how quickly a simple
								route turns into a trip you&apos;ll actually remember.
							</p>
						</div>
						<div className="flex shrink-0 flex-col gap-2 sm:flex-row">
							{isAuthenticated ? (
								<Button asChild>
									<Link to="/app/map">
										Open your map
										<ArrowRight className="h-4 w-4" />
									</Link>
								</Button>
							) : (
								<>
									<Button asChild>
										<Link to="/register">
											Create your map
											<ArrowRight className="h-4 w-4" />
										</Link>
									</Button>
									<Button asChild variant="outline">
										<Link to="/login">Sign in</Link>
									</Button>
								</>
							)}
						</div>
					</div>
				</div>
			</FadeIn>
		</section>
	);
};
