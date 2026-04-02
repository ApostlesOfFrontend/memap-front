import { NewTrip } from "@/components/new-trip/new-trip";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth-context";
import { tripDraftStore } from "@/state/trip-draft";
import { ChevronsUpDown } from "lucide-react";
import { SidebarTripsList } from "./trips-list";

export function AppSidebar() {
	const { user } = useAuth();
	const { isDrawingMode } = tripDraftStore();

	const DrawingSidebarGroup = () => (
		<SidebarGroup>
			<SidebarGroupContent>
				<NewTrip />
			</SidebarGroupContent>
		</SidebarGroup>
	);

	const RegularSidebarGroup = () => (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarTripsList />
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);

	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarContent className="h-screen flex justify-between">
				{isDrawingMode ? <DrawingSidebarGroup /> : <RegularSidebarGroup />}
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
