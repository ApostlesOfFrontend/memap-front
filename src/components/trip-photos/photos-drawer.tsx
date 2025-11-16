import { usePresignedUploadHandler } from "@/hooks/use-presigned-upload-handler";
import { type ReactNode, useState } from "react";
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
								useUpload(file);
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
