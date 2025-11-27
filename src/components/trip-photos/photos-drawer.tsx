import { useTripDetails } from "@/api/trip/hooks/get";
import type { ReactNode } from "react";
import { ImageThumbnail } from "../image/thumbnail";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import { UploadDialog } from "./upload";

export const PhotosDrawer = ({ children }: { children: ReactNode }) => {
	const { data } = useTripDetails(10);

	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Photos</DrawerTitle>
					<DrawerDescription>You can keep your photos here</DrawerDescription>
					<ScrollArea className="h-96">
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 max-w-7xl mx-auto">
							{data.images.map((image) => (
								<ImageThumbnail id={image.id} key={image.id} />
							))}
							<UploadDialog />
						</div>
					</ScrollArea>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	);
};
