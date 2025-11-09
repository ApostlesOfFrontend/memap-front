import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { selectedRouteStore } from "@/state/selected-route";
import { tripDraftStore } from "@/state/trip-draft";
import { toast } from "sonner";

const items = [
	{
		name: "Eurotrip",
		id: "1",
		route: [
			[-0.1276, 51.5074], // London
			[2.3522, 48.8566], // Paris
			[4.9041, 52.3676], // Amsterdam
			[11.582, 48.1351], // Munich
			[12.4964, 41.9028], // Rome
			[14.5058, 46.0569], // Ljubljana
			[19.0402, 47.4979], // Budapest
		],
	},
	{
		name: "Across America",
		id: "2",
		route: [
			[-122.4194, 37.7749], // San Francisco
			[-118.2437, 34.0522], // Los Angeles
			[-112.074, 33.4484], // Phoenix
			[-104.9903, 39.7392], // Denver
			[-87.6298, 41.8781], // Chicago
			[-80.1918, 25.7617], // Miami
			[-74.006, 40.7128], // New York City
		],
	},
	{
		name: "Asian Adventure",
		id: "3",
		route: [
			[139.6917, 35.6895], // Tokyo
			[126.978, 37.5665], // Seoul
			[116.4074, 39.9042], // Beijing
			[121.4737, 31.2304], // Shanghai
			[100.5018, 13.7563], // Bangkok
			[106.8456, -6.2088], // Jakarta
			[103.8198, 1.3521], // Singapore
		],
	},
	{
		name: "South American Odyssey",
		id: "4",
		route: [
			[-58.3816, -34.6037], // Buenos Aires
			[-70.6693, -33.4489], // Santiago
			[-77.0428, -12.0464], // Lima
			[-79.0193, -8.1091], // Trujillo
			[-43.1729, -22.9068], // Rio de Janeiro
			[-46.6333, -23.5505], // São Paulo
			[-74.0721, 4.711], // Bogotá
			[-66.9036, 10.4806], // Caracas
		],
	},
	{
		name: "World Trip",
		id: "5",
		route: [
			[-74.006, 40.7128], // New York
			[2.3522, 48.8566], // Paris
			[55.2708, 25.2048], // Dubai
			[77.209, 28.6139], // New Delhi
			[139.6917, 35.6895], // Tokyo
			[151.2093, -33.8688], // Sydney
			[174.7633, -36.8485], // Auckland
			[-58.3816, -34.6037], // Buenos Aires
			[-122.4194, 37.7749], // San Francisco
		],
	},
	{
		name: "African Safari Circuit",
		id: "6",
		route: [
			[31.1342, -25.343], // Kruger National Park, South Africa
			[28.0473, -26.2041], // Johannesburg
			[36.8219, -1.2921], // Nairobi
			[35.308, -2.3333], // Serengeti
			[33.2697, -0.0917], // Lake Victoria
			[32.58, -15.3875], // Lusaka
			[31.1357, -22.5597], // Chobe National Park, Botswana
			[29.9089, -3.3614], // Bujumbura
			[30.0588, -1.9403], // Kigali
		],
	},
	{
		name: "Nordic Explorer",
		id: "7",
		route: [
			[10.7522, 59.9139], // Oslo
			[18.0686, 59.3293], // Stockholm
			[24.9384, 60.1699], // Helsinki
			[25.7482, 59.437], // Tallinn
			[12.5683, 55.6761], // Copenhagen
			[15.2551, 69.6492], // Tromsø
			[27.3148, 71.1719], // Nordkapp
		],
	},
];

export function AppSidebar() {
	const { setRoute } = selectedRouteStore();
	const { isDrawingMode } = tripDraftStore();

	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.id}>
									<SidebarMenuButton
										asChild
										onClick={() => {
											if (!isDrawingMode) {
												//TODO - fix types
												setRoute(item.route);
											} else {
												toast.warning("Exit adding new trip first!");
											}
										}}
									>
										<span>{item.name}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
