import type { ReactNode } from "react";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";

export const PhotosDrawer = ({ children }: { children: ReactNode }) => {
	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Photos</DrawerTitle>
					<DrawerDescription>You can keep your photos here</DrawerDescription>
					<div className="h-96">PLACEHOLDER TO IMAGES PREVIEW AND UPLOAD</div>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	);
};
