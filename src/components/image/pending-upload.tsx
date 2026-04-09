import { cn } from "@/lib/utils";
import { CheckCircle, Clock, Upload, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import type { UploadStatus } from "./upload-status";

interface PendingImagePropsI {
	src: string;
	status: UploadStatus;
	className?: string;
	imageClassName?: string;
	action?: ReactNode;
	hideStatus?: boolean;
}

const getStatusIcon = (status: UploadStatus) => {
	switch (status) {
		case "awaiting":
			return <Clock className="text-yellow-500 z-100" size={24} />;
		case "uploading":
			return <Upload className="text-blue-500 animate-pulse z-100" size={24} />;
		case "completed":
			return <CheckCircle className="text-green-500 z-100" size={24} />;
		case "upload_error":
			return <XCircle className="text-red-500 z-100" size={24} />;
	}
};

export const PendingImage = ({
	src,
	status,
	className,
	imageClassName,
	action,
	hideStatus,
}: PendingImagePropsI) => {
	return (
		<div
			className={cn(
				"relative flex h-48 w-full rounded-lg cursor-pointer",
				className,
			)}
		>
			{action ? action : null}
			{!hideStatus && (
				<div className="absolute top-2 right-2 z-50 bg-background/70 rounded-full p-2">
					{getStatusIcon(status)}
				</div>
			)}
			<img
				src={src}
				alt=""
				className={cn(
					"absolute object-cover h-48 w-full rounded-lg cursor-pointer",
					imageClassName,
				)}
			/>
		</div>
	);
};
