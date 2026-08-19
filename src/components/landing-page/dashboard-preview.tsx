import {
	CalendarDays,
	Images,
	MapIcon,
	MapPin,
	Plus,
	RouteIcon,
} from "lucide-react";

const savedTrips = [
	{ name: "Northern coast", detail: "3 stops · 8 photos", active: true },
	{ name: "Kyoto walks", detail: "6 stops · 14 photos", active: false },
	{ name: "Dolomites", detail: "4 stops · 11 photos", active: false },
];

const photoSwatches = [
	"bg-[linear-gradient(135deg,#f59e0b_0%,#fb7185_48%,#7c3aed_100%)]",
	"bg-[linear-gradient(135deg,#0f766e_0%,#38bdf8_52%,#dbeafe_100%)]",
	"bg-[linear-gradient(135deg,#365314_0%,#84cc16_46%,#facc15_100%)]",
];

export const DashboardPreview = () => {
	return (
		<div className="relative mx-auto w-full max-w-2xl" aria-hidden="true">
			<div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/5 blur-2xl" />
			<div className="overflow-hidden rounded-2xl border border-border/80 bg-card p-2 shadow-2xl shadow-primary/10 sm:p-3">
				<div className="flex min-h-[24rem] overflow-hidden rounded-xl border border-border/80 bg-background sm:min-h-[31rem]">
					<aside className="hidden w-[38%] min-w-0 flex-col border-r border-sidebar-border bg-sidebar p-3 sm:flex sm:p-4">
						<div className="flex items-center gap-2 border-b border-sidebar-border/70 pb-4">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
								<MapIcon className="h-4 w-4" />
							</div>
							<div className="min-w-0 leading-tight">
								<div className="truncate text-xs font-semibold text-sidebar-foreground">
									Memap
								</div>
								<div className="truncate text-[10px] text-muted-foreground">
									Your memory map
								</div>
							</div>
						</div>

						<div className="mt-4 rounded-xl border border-sidebar-border/70 bg-sidebar-accent/30 p-3">
							<div className="flex items-start justify-between gap-2">
								<div>
									<div className="flex items-center gap-1.5 text-xs font-semibold text-sidebar-foreground">
										<MapPin className="h-3.5 w-3.5 text-primary" />
										Your trips
									</div>
									<p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
										Routes, stops, and the moments between them.
									</p>
								</div>
							</div>
							<div className="mt-3 flex h-7 items-center justify-center gap-1.5 rounded-md bg-primary px-2 text-[10px] font-medium text-primary-foreground shadow-xs">
								<Plus className="h-3 w-3" />
								New trip
							</div>
						</div>

						<div className="mt-4 min-w-0">
							<div className="mb-2 flex items-center justify-between px-1">
								<span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
									Saved routes
								</span>
								<RouteIcon className="h-3 w-3 text-muted-foreground" />
							</div>
							<div className="space-y-1">
								{savedTrips.map((trip) => (
									<div
										key={trip.name}
										className={`rounded-lg px-2.5 py-2 ${
											trip.active
												? "bg-sidebar-accent text-sidebar-foreground"
												: "text-muted-foreground"
										}`}
									>
										<div className="truncate text-[11px] font-medium">
											{trip.name}
										</div>
										<div className="mt-0.5 truncate text-[10px] text-muted-foreground">
											{trip.detail}
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="mt-auto flex items-center gap-2 border-t border-sidebar-border/70 pt-3">
							<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">
								M
							</div>
							<div className="min-w-0">
								<div className="truncate text-[10px] font-medium text-sidebar-foreground">
									My memory map
								</div>
								<div className="truncate text-[9px] text-muted-foreground">
									Private by default
								</div>
							</div>
						</div>
					</aside>

					<div className="relative min-w-0 flex-1 overflow-hidden bg-[#eef2f0]">
						<div className="absolute inset-x-3 top-3 z-10 flex items-center justify-between gap-2 sm:inset-x-4 sm:top-4">
							<div className="flex items-center gap-2 rounded-lg border border-border/80 bg-background/95 px-2.5 py-2 shadow-sm backdrop-blur sm:px-3">
								<MapIcon className="h-3.5 w-3.5 text-primary" />
								<span className="text-[10px] font-medium text-foreground sm:text-xs">
									Trip map
								</span>
							</div>
							<div className="rounded-lg border border-border/80 bg-background/95 px-2.5 py-2 text-[10px] text-muted-foreground shadow-sm backdrop-blur sm:px-3 sm:text-xs">
								3 stops · 8 photos
							</div>
						</div>

						<svg
							className="absolute inset-0 h-full w-full"
							viewBox="0 0 640 520"
							preserveAspectRatio="none"
							fill="none"
						>
							<title>Illustrated trip route preview</title>
							<path
								d="M-40 115C95 80 120 160 220 142S390 82 680 130"
								stroke="#d7e1dc"
								strokeWidth="18"
								opacity="0.85"
							/>
							<path
								d="M-60 360C70 330 130 415 242 372S470 270 700 332"
								stroke="#d7e1dc"
								strokeWidth="22"
								opacity="0.8"
							/>
							<path
								d="M160 -30C175 95 250 150 224 245S240 410 326 560"
								stroke="#dce5e1"
								strokeWidth="12"
								opacity="0.9"
							/>
							<path
								d="M-20 245C120 220 190 260 290 238S475 158 675 216"
								stroke="#ffffff"
								strokeWidth="3"
								opacity="0.9"
							/>
							<path
								d="M70 510C135 410 185 356 285 332S470 360 620 220"
								stroke="#ffffff"
								strokeWidth="3"
								opacity="0.9"
							/>
							<path
								d="M90 425C160 390 190 323 272 310S392 350 475 283S560 196 590 130"
								stroke="#2563eb"
								strokeWidth="7"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M90 425C160 390 190 323 272 310S392 350 475 283S560 196 590 130"
								stroke="#bfdbfe"
								strokeWidth="13"
								strokeLinecap="round"
								strokeLinejoin="round"
								opacity="0.42"
							/>
							<circle
								cx="90"
								cy="425"
								r="10"
								fill="#ffffff"
								stroke="#2563eb"
								strokeWidth="4"
							/>
							<circle
								cx="272"
								cy="310"
								r="10"
								fill="#ffffff"
								stroke="#2563eb"
								strokeWidth="4"
							/>
							<circle
								cx="590"
								cy="130"
								r="10"
								fill="#2563eb"
								stroke="#ffffff"
								strokeWidth="4"
							/>
						</svg>

						<div className="absolute left-[14%] top-[76%] rounded-md bg-background/90 px-2 py-1 text-[9px] font-medium text-foreground shadow-sm backdrop-blur">
							Harbour walk
						</div>
						<div className="absolute left-[41%] top-[55%] rounded-md bg-background/90 px-2 py-1 text-[9px] font-medium text-foreground shadow-sm backdrop-blur">
							Cliffside
						</div>
						<div className="absolute right-[8%] top-[24%] rounded-md bg-background/90 px-2 py-1 text-[9px] font-medium text-foreground shadow-sm backdrop-blur">
							Sunset point
						</div>

						<div className="absolute bottom-3 right-3 w-44 rounded-xl border border-border/80 bg-background/95 p-2.5 shadow-lg backdrop-blur sm:bottom-4 sm:right-4 sm:w-52 sm:p-3">
							<div className="flex items-start justify-between gap-2">
								<div className="min-w-0">
									<div className="truncate text-[11px] font-semibold text-foreground sm:text-xs">
										Northern coast
									</div>
									<div className="mt-0.5 flex items-center gap-1 text-[9px] text-muted-foreground sm:text-[10px]">
										<CalendarDays className="h-3 w-3" />A weekend to remember
									</div>
								</div>
								<Images className="h-3.5 w-3.5 shrink-0 text-primary" />
							</div>
							<div className="mt-2 grid grid-cols-3 gap-1.5">
								{photoSwatches.map((swatch) => (
									<div
										key={swatch}
										className={`h-10 rounded-md border border-white/50 ${swatch}`}
									/>
								))}
							</div>
						</div>

						<div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-background/95 text-muted-foreground shadow-sm backdrop-blur sm:bottom-4 sm:left-4">
							<RouteIcon className="h-3.5 w-3.5" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
