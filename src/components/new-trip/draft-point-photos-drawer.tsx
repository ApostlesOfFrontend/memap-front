import type { DraftPointPhoto } from "@/state/trip-draft";
import { X } from "lucide-react";
import { PendingImage } from "../image/pending-upload";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

export const DraftPointPhotosDrawer = ({
	photos,
	onRemovePhoto,
}: {
	photos: DraftPointPhoto[];
	onRemovePhoto: (photoId: string) => void;
}) => {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div className="flex h-24 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-background px-2 text-center text-xs transition-colors hover:bg-input">
					{photos.length - 2} more
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Point photos</DrawerTitle>
					<DrawerDescription>
						Review all photos currently attached to this route point.
					</DrawerDescription>
				</DrawerHeader>
				<ScrollArea className="h-96">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-7xl mx-auto">
						{photos.map((photo) => (
							<PendingImage
								key={photo.clientId}
								src={photo.objectUrl}
								status={photo.status}
								hideStatus
								action={
									<Button
										size="icon"
										variant="secondary"
										className="absolute left-2 top-2 z-50 h-7 w-7 rounded-full"
										onClick={() => onRemovePhoto(photo.clientId)}
									>
										<X className="h-4 w-4" />
									</Button>
								}
							/>
						))}
					</div>
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	);
};
