import { API } from "@/api/util/fetch";

export const ImageThumbnail = ({ id }: { id: string }) => {
	return (
		<img
			src={`${API}/api/images/${id}?type=thumbnail`}
			alt=""
			className="object-cover h-48 w-full rounded-lg cursor-pointer"
		/>
	);
};
