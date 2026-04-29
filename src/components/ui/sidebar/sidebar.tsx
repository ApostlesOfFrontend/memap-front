import { NewTrip } from "@/components/new-trip/new-trip";
import { TripDetails } from "@/components/trip-details/details";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
} from "@/components/ui/sidebar";
import { QueryKeys } from "@/lib/nuqs-query-keys";
import { useAuth } from "@/lib/auth-context";
import { selectedRouteStore } from "@/state/selected-route";
import { tripDraftStore } from "@/state/trip-draft";
import { ChevronsUpDown, Compass, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { Button } from "../button";
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
		className="h-full"
	>
		{children}
	</motion.div>
);

export function AppSidebar() {
	const { user } = useAuth();
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
					<TripDetails tripId={selectedId} />
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
			<SidebarContent className="h-screen flex justify-between">
				<div className="relative min-h-0 flex-1 overflow-hidden">
					<AnimatePresence mode="wait" initial={false}>
						{activePanel}
					</AnimatePresence>
				</div>
				<SidebarFooter className="flex mx-2 my-2 rounded-md flex-row items-center hover:bg-muted justify-between">
					<div className="flex flex-col gap-0.5 ">
						<div className="">{user?.name}</div>
						<div className="text-sm">{user?.email}</div>
					</div>
					<ChevronsUpDown />
				</SidebarFooter>
			</SidebarContent>
		</Sidebar>
	);
}
