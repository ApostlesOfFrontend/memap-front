import { NewTrip } from "@/components/new-trip/new-trip";
import { TripCardAlteriative } from "@/components/trip-details/alternative";
import { TripDetails } from "@/components/trip-details/details";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
} from "@/components/ui/sidebar";
import { QueryKeys } from "@/lib/nuqs-query-keys";
import { selectedRouteStore } from "@/state/selected-route";
import { tripDraftStore } from "@/state/trip-draft";
import { Compass, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { Button } from "../button";
import { AppSidebarFooter } from "./sidebar-footer";
import { SidebarTripsList } from "./trips-list";

const sidebarPanelTransition = {
	duration: 0.12,
	ease: [0.22, 1, 0.36, 1] as const,
};

const SidebarPanel = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<motion.div
		initial={{ opacity: 0, x: 14 }}
		animate={{ opacity: 1, x: 0 }}
		exit={{ opacity: 0, x: -10 }}
		transition={sidebarPanelTransition}
		className="flex h-full min-h-0 flex-col"
	>
		{children}
	</motion.div>
);

export function AppSidebar() {
	const { isDrawingMode, toggleDrawingMode } = tripDraftStore();
	const { deleteRoute } = selectedRouteStore();
	const [selectedId, setSelectedId] = useQueryState(
		QueryKeys.SelectedTrip,
		parseAsInteger,
	);

	const startNewTrip = () => {
		deleteRoute();
		setSelectedId(null);
		toggleDrawingMode();
	};

	const activePanel = selectedId ? (
		<SidebarPanel key="trip-details">
			<SidebarGroup>
				<SidebarGroupContent>
					<TripCardAlteriative tripId={selectedId} />
					{/* <TripDetails tripId={selectedId} /> */}
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarPanel>
	) : isDrawingMode ? (
		<SidebarPanel key="new-trip">
			<SidebarGroup>
				<SidebarGroupContent>
					<NewTrip />
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarPanel>
	) : (
		<SidebarPanel key="trips-list">
			<SidebarGroup>
				<SidebarGroupContent>
					<div className="mx-2 my-3 flex flex-col gap-4">
						<div className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/30 p-4 shadow-sm">
							<div className="flex items-start justify-between gap-3">
								<div className="space-y-1">
									<div className="flex items-center gap-2 text-sidebar-foreground">
										<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
											<Compass className="h-4 w-4" />
										</div>
										<SidebarGroupLabel className="p-0 text-sm font-semibold text-sidebar-foreground">
											Your trips
										</SidebarGroupLabel>
									</div>
									<p className="text-xs leading-relaxed text-muted-foreground">
										Pick a saved route to inspect details, photos, and the map
										path.
									</p>
								</div>
							</div>
							<Button className="mt-4 w-full" onClick={startNewTrip}>
								<Plus className="h-4 w-4" />
								New trip
							</Button>
						</div>

						<div className="rounded-xl border border-sidebar-border/70 bg-background/50 p-2 shadow-sm">
							<div className="px-2 pb-2 pt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
								Saved routes
							</div>
							<SidebarMenu className="gap-1">
								<SidebarTripsList />
							</SidebarMenu>
						</div>
					</div>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarPanel>
	);

	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarContent className="h-screen gap-0 overflow-hidden">
				<div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
					<AnimatePresence mode="wait" initial={false}>
						{activePanel}
					</AnimatePresence>
				</div>
				<AppSidebarFooter />
			</SidebarContent>
		</Sidebar>
	);
}
