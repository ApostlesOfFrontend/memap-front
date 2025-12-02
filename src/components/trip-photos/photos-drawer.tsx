import { useTripDetails } from "@/api/trip/hooks/get";
import { usePresignedUploadHandler } from "@/hooks/use-presigned-upload-handler";
import { Upload } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "sonner";
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

const MAX_PHOTOS_PER_TRIP = 20;
const MAX_FILE_SIZE_MB = 10;

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

export const PhotosDrawer = ({
	children,
	tripId,
}: { children: ReactNode; tripId: number }) => {
	const { data } = useTripDetails(tripId);
	const [files, setFiles] = useState<PendingFiles[]>([]);
	const fileUpload = usePresignedUploadHandler();

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
					const id = await fileUpload(file.file, tripId);
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
					<DrawerDescription>
						You can keep your photos here. You can upload up to{" "}
						{MAX_PHOTOS_PER_TRIP} photos per trip (PNG or JPEG, up to{" "}
						{MAX_FILE_SIZE_MB}MB each).
					</DrawerDescription>
					<ScrollArea className="h-96">
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 max-w-7xl mx-auto">
							{data?.images.map((image) => (
								<ImageThumbnail id={image.id} key={image.id} />
							))}
							{files.map(({ status, file }) => (
								<PendingImage
									src={URL.createObjectURL(file)}
									key={file.name}
									status={status}
								/>
							))}
							<div className="h-48 w-full rounded-lg cursor-pointer border-2 border-dashed bg-accent hover:bg-input">
								<Dropzone
									onDrop={(acceptedFiles) => {
										const existingCount = data?.images?.length ?? 0;
										const pendingCount = files.length;
										const remainingSlots =
											MAX_PHOTOS_PER_TRIP - existingCount - pendingCount;

										if (remainingSlots <= 0) {
											toast.error("Photo limit reached", {
												description: `You already have ${existingCount + pendingCount} photos. You can upload up to ${MAX_PHOTOS_PER_TRIP} photos per trip.`,
											});
											return;
										}

										const allowedFiles = acceptedFiles.slice(
											0,
											Math.max(0, remainingSlots),
										);
										const overflowCount =
											acceptedFiles.length - allowedFiles.length;

										if (overflowCount > 0) {
											const plural = remainingSlots === 1 ? "photo" : "photos";
											toast.error("Too many photos", {
												description: `You can add ${remainingSlots} more ${plural} (limit is ${MAX_PHOTOS_PER_TRIP} photos per trip).`,
											});
										}

										if (!allowedFiles.length) return;

										const f: PendingFiles[] = allowedFiles.map((file) => ({
											file,
											status: "awaiting",
										}));
										setFiles((state) => [...state, ...f]);
										void handleUpload(f);
									}}
									accept={{ "image/*": [".png", ".jpeg"] }}
									maxSize={MAX_FILE_SIZE_MB * 1024 * 1024}
									onDropRejected={(rejections) => {
										if (!rejections.length) return;

										const lines = rejections.map((rej) => {
											const reasons = rej.errors.map((error) => {
												switch (error.code) {
													case "file-invalid-type":
														return "unsupported format (PNG and JPEG only)";
													case "file-too-large":
														return `file is too large (max ${MAX_FILE_SIZE_MB}MB)`;
													default:
														return error.message;
												}
											});

											return `${rej.file.name}: ${reasons.join(", ")}`;
										});

										toast.error("Some files were rejected", {
											description: lines.join("\n"),
											duration: 7000,
										});
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
