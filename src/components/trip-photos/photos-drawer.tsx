import { usePresignedUploadHandler } from "@/hooks/use-presigned-upload-handler";
import { QueryKeys } from "@/lib/nuqs-query-keys";
import { parseAsInteger, useQueryState } from "nuqs";
import { type ReactNode, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";

export const PhotosDrawer = ({ children }: { children: ReactNode }) => {
	const [file, setFile] = useState<File | null>(null);
	const useUpload = usePresignedUploadHandler();
	const [tripId] = useQueryState(QueryKeys.SelectedTrip, parseAsInteger);

	console.log(file);

	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Photos</DrawerTitle>
					<DrawerDescription>You can keep your photos here</DrawerDescription>
					<div className="h-96">
						<input type="file" onChange={(e) => setFile(e.target.files[0])} />
						<Button
							onClick={() => {
								if (!file || !tripId) {
									toast.error("Something went wrong when adding a file");
									return;
								}
								useUpload(file, tripId);
							}}
						>
							Upload
						</Button>
					</div>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	);
};
