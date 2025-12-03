import { Link } from "@tanstack/react-router";
import { MapIcon } from "lucide-react";
import { Button } from "../ui/button";

export const Header = () => {
	return (
		<header className="border-b border-border/40 bg-gradient-to-b from-background/80 via-background/60 to-background/20 backdrop-blur">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
				<Link to="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
						<MapIcon className="h-4 w-4" />
					</div>
					<div className="flex flex-col leading-tight">
						<span className="text-sm font-semibold tracking-tight">Memap</span>
						<span className="text-[11px] text-muted-foreground">
							Remember every route
						</span>
					</div>
				</Link>

				<nav aria-label="Primary" className="flex items-center gap-3 text-sm">
					<Link
						to="/app/map"
						className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
					>
						Open app
					</Link>
					<Button asChild variant="outline" size="sm">
						<Link to="/login">Sign in</Link>
					</Button>
				</nav>
			</div>
		</header>
	);
};
