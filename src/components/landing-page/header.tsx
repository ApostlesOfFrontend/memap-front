import { useAuth } from "@/lib/auth-context";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapIcon } from "lucide-react";
import { Button } from "../ui/button";

export const Header = () => {
	const { isAuthenticated } = useAuth();
	return (
		<header className="border-b border-border/70 bg-background/85 backdrop-blur">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link to="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
						<MapIcon className="h-4 w-4" />
					</div>
					<div className="flex flex-col leading-tight">
						<span className="text-sm font-semibold tracking-tight">Memap</span>
						<span className="text-[11px] text-muted-foreground">
							Your memory map
						</span>
					</div>
				</Link>

				<nav aria-label="Primary" className="flex items-center gap-3 text-sm">
					{isAuthenticated && (
						<Button asChild size="sm">
							<Link to="/app/map">
								Open app
								<ArrowRight className="h-3.5 w-3.5" />
							</Link>
						</Button>
					)}
					{!isAuthenticated && (
						<>
							<Link
								to="/login"
								className="text-muted-foreground transition-colors hover:text-foreground"
							>
								Sign in
							</Link>
							<Button asChild size="sm">
								<Link to="/register">Create account</Link>
							</Button>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};
