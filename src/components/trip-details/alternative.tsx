import { Camera, MapIcon, RouteIcon } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

export const TripCardAlteriative = () => {
	return (
		<div className="flex-1">
			<Card className="relative overflow-hidden border-border/60 bg-gradient-to-b from-card/80 via-card/60 to-background/40 shadow-xl shadow-black/40 backdrop-blur">
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.16)_0,_transparent_60%)]" />
				<CardHeader className="relative">
					<CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
						<span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-primary">
							<MapIcon className="h-3.5 w-3.5" />
						</span>
						<span>Weekend in Lisbon</span>
					</CardTitle>
					<CardDescription className="text-xs">
						Route with 7 stops · 18 photos
					</CardDescription>
				</CardHeader>
				<CardContent className="relative space-y-5">
					<div className="rounded-xl border border-border/60 bg-gradient-to-br from-background/80 via-background/40 to-background/10 p-4">
						<div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
							<span className="inline-flex items-center gap-1.5">
								<RouteIcon className="h-3.5 w-3.5 text-primary" />
								<span>Trip timeline</span>
							</span>
							<span>2 days · 14.3km</span>
						</div>
						<ul className="space-y-2 text-xs">
							<li className="flex items-center justify-between rounded-lg bg-background/60 px-2.5 py-1.5">
								<div className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
									<span className="font-medium text-foreground">
										Alfama lookout
									</span>
								</div>
								<span className="text-[11px] text-muted-foreground">
									4 photos
								</span>
							</li>
							<li className="flex items-center justify-between rounded-lg bg-background/40 px-2.5 py-1.5">
								<div className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
									<span className="font-medium text-foreground">
										Riverside walk
									</span>
								</div>
								<span className="text-[11px] text-muted-foreground">
									6 photos
								</span>
							</li>
							<li className="flex items-center justify-between rounded-lg bg-background/30 px-2.5 py-1.5">
								<div className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
									<span className="font-medium text-foreground">
										Sunset at the pier
									</span>
								</div>
								<span className="text-[11px] text-muted-foreground">
									8 photos
								</span>
							</li>
						</ul>
					</div>

					<div className="space-y-2">
						<p className="text-xs font-medium text-foreground">Trip gallery</p>
						<div className="grid grid-cols-4 gap-1.5">
							<div className="aspect-[4/5] rounded-md bg-gradient-to-br from-sky-500/60 to-indigo-500/40" />
							<div className="aspect-[4/5] rounded-md bg-gradient-to-br from-emerald-400/60 to-cyan-400/40" />
							<div className="aspect-[4/5] rounded-md bg-gradient-to-br from-rose-500/60 to-orange-400/40" />
							<div className="relative aspect-[4/5] rounded-md bg-muted/20">
								<div className="absolute inset-0 flex items-center justify-center rounded-md border border-dashed border-border/80 bg-background/60 text-[11px] text-muted-foreground backdrop-blur">
									<Camera className="mr-1.5 h-3.5 w-3.5" />
									Add photo
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
