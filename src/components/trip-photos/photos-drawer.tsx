import { useTripDetails } from "@/api/trip/hooks/get";
import { usePresignedUploadHandler } from "@/hooks/use-presigned-upload-handler";
import { Upload } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { PendingImage } from "../image/pending-upload";
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

export type UploadStatuses =
	| "awaiting"
	| "uploading"
	| "upload_error"
	| "completed";

export type PendingFiles = {
	status: UploadStatuses;
	file: File;
	id?: string;
};

export const PhotosDrawer = ({ children }: { children: ReactNode }) => {
	const { data } = useTripDetails(10);
	const [files, setFiles] = useState<PendingFiles[]>([]);
	const fileUpload = usePresignedUploadHandler();

	//TODO: add function to remove uploaded pending files after data refetch

	// Clean-up after displaying preview of files pending upload
	useEffect(() => {
		return () => {
			// biome-ignore lint/complexity/noForEach: simple logic
			files.forEach(({ file }) =>
				URL.revokeObjectURL(URL.createObjectURL(file)),
			);
		};
	}, [files]);

	const updateFileStatus = (
		index: number,
		status: UploadStatuses,
		id?: string,
	) => {
		setFiles((prevFiles) =>
			prevFiles.map((file, idx) =>
				idx === index ? { ...file, status, id } : file,
			),
		);
	};

	const handleUpload = async (f: PendingFiles[]) => {
		for (let idx = 0; idx < f.length; idx++) {
			const file = f[idx];
			if (file.status === "awaiting") {
				try {
					updateFileStatus(idx + files.length, "uploading");
					const id = await fileUpload(file.file, 10);
					updateFileStatus(idx + files.length, "completed", id);
				} catch (e) {
					updateFileStatus(idx + files.length, "upload_error");
				}
			}
		}
	};

	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Photos</DrawerTitle>
					<DrawerDescription>You can keep your photos here</DrawerDescription>
					<ScrollArea className="h-96">
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 max-w-7xl mx-auto">
							{data?.images.map((image) => (
								<ImageThumbnail id={image.id} key={image.id} />
							))}
							{files.map(({ status, file }, idx) => (
								<PendingImage
									src={URL.createObjectURL(file)}
									key={file.name}
									status={status}
								/>
							))}
							<div className="h-48 w-full rounded-lg cursor-pointer border-2 border-dashed bg-accent hover:bg-input">
								<Dropzone
									onDrop={(acceptedFiles) => {
										const f: PendingFiles[] = acceptedFiles.map((file) => ({
											file,
											status: "awaiting",
										}));
										setFiles((state) => [...state, ...f]);
										handleUpload(f);
									}}
									accept={{ "image/*": [".png", ".jpeg"] }}
									onDropRejected={(rejections) => {
										console.log(rejections);
									}}
								>
									{({ getRootProps, getInputProps }) => (
										<div
											className="flex flex-row gap-2 justify-center w-full h-full items-center"
											{...getRootProps()}
										>
											<input {...getInputProps()} />
											<Upload /> Upload photos
										</div>
									)}
								</Dropzone>
							</div>
						</div>
					</ScrollArea>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	);
};
