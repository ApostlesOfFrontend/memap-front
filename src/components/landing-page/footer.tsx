import { Link } from "@tanstack/react-router";
import { MapIcon } from "lucide-react";

export const Footer = () => {
	return (
		<footer className="border-t border-border/70 bg-background">
			<div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
				<Link to="/" className="inline-flex items-center gap-2 text-foreground">
					<span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
						<MapIcon className="h-3.5 w-3.5" />
					</span>
					<span className="font-medium">Memap</span>
				</Link>
				<p>Map your trips, keep the memories.</p>
			</div>
		</footer>
	);
};
