import { CheckCircle, Clock, Upload, XCircle } from "lucide-react";
import type { UploadStatuses } from "../trip-photos/photos-drawer";

interface PendingImagePropsI {
	src: string;
	status: UploadStatuses;
}

const getStatusIcon = (status: UploadStatuses) => {
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

export const PendingImage = ({ src, status }: PendingImagePropsI) => {
	return (
		<div className="relative flex h-48 w-full rounded-lg cursor-pointer">
			<div className="absolute top-2 right-2 z-50 bg-background/70 rounded-full p-2">
				{getStatusIcon(status)}
			</div>
			<img
				src={src}
				alt=""
				className="absolute object-cover h-48 w-full rounded-lg cursor-pointer"
			/>
		</div>
	);
};
