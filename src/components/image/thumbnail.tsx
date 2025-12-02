import type { ImagesList } from "@/api/images/list";
import { API } from "@/api/util/fetch";
import { DeleteImageDialog } from "./components/delete-dialog";
import { ImagePreview } from "./components/image-preview";

type ImageThumbnailProps = {
	id: string;
	images: ImagesList;
	index: number;
};

export const ImageThumbnail = ({ id, images, index }: ImageThumbnailProps) => {
	return (
		<div className="relative flex h-48 w-full rounded-lg cursor-pointer">
			<div className="absolute flex w-full h-full items-center justify-center gap-4 opacity-0 hover:opacity-100 bg-slate-700/40 z-100">
				<ImagePreview images={images} initialIndex={index} />
				<DeleteImageDialog id={id} />
			</div>
			<img
				src={`${API}/api/images/${id}?type=thumbnail`}
				alt=""
				className="absolute object-cover h-48 w-full rounded-lg cursor-pointer"
			/>
		</div>
	);
};
