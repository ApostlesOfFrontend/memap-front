import { cn } from "@/lib/utils";
import type { DraftPointPhoto } from "@/state/trip-draft";
import { Upload, X } from "lucide-react";
import Dropzone from "react-dropzone";
import { toast } from "sonner";
import { PendingImage } from "../image/pending-upload";
import { Button } from "../ui/button";
import { DraftPointPhotosDrawer } from "./draft-point-photos-drawer";

const MAX_FILE_SIZE_MB = 10;

export const DraftPointPhotos = ({
	photos,
	onAddPhotos,
	onRemovePhoto,
}: {
	photos: DraftPointPhoto[];
	onAddPhotos: (files: File[]) => void;
	onRemovePhoto: (photoId: string) => void;
}) => {
	return (
		<div className="space-y-2">
			<Dropzone
				onDrop={(acceptedFiles) => {
					if (!acceptedFiles.length) return;
					onAddPhotos(acceptedFiles);
				}}
				accept={{ "image/png": [".png"], "image/jpeg": [".jpeg", ".jpg"] }}
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
						{...getRootProps()}
						className="flex h-12 cursor-pointer flex-row gap-4 items-center justify-center rounded-lg border-2 border-dashed bg-background px-2 text-center text-xs transition-colors hover:bg-input"
					>
						<input {...getInputProps()} />
						<Upload className="mb-1 h-4 w-4" />
						Add photos
					</div>
				)}
			</Dropzone>
			<div
				className={cn("grid gap-2", {
					"grid-cols-1": photos.length === 1,
					"grid-cols-2": photos.length === 2,
					"grid-cols-3": photos.length > 2,
				})}
			>
				{photos.slice(0, 2).map((photo) => (
					<PendingImage
						key={photo.clientId}
						src={photo.objectUrl}
						status={photo.status}
						className="h-24"
						imageClassName="h-24"
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
				{photos.length > 2 && (
					<DraftPointPhotosDrawer
						photos={photos}
						onRemovePhoto={onRemovePhoto}
					/>
				)}
			</div>
		</div>
	);
};
