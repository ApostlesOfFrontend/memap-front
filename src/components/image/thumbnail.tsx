import { API } from "@/api/util/fetch";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { DeleteImageDialog } from "./components/delete-dialog";

export const ImageThumbnail = ({ id }: { id: string }) => {
	return (
		<div className="relative flex h-48 w-full rounded-lg cursor-pointer">
			<div className="absolute flex w-full h-full items-center justify-center gap-4 opacity-0 hover:opacity-100 bg-slate-700/40 z-100">
				<Button>
					<Eye />
				</Button>
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
