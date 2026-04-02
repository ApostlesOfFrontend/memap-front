import { NewTrip } from "@/components/new-trip/new-trip";
import { TripDetails } from "@/components/trip-details/details";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
} from "@/components/ui/sidebar";
import { QueryKeys } from "@/lib/nuqs-query-keys";
import { useAuth } from "@/lib/auth-context";
import { tripDraftStore } from "@/state/trip-draft";
import { ChevronsUpDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { parseAsInteger, useQueryState } from "nuqs";
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
	const { isDrawingMode } = tripDraftStore();
	const [selectedId] = useQueryState(QueryKeys.SelectedTrip, parseAsInteger);

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
					<SidebarMenu>
						<SidebarTripsList />
					</SidebarMenu>
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
