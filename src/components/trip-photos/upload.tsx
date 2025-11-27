import { usePresignedUploadHandler } from "@/hooks/use-presigned-upload-handler";
import { QueryKeys } from "@/lib/nuqs-query-keys";
import { Upload } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export const UploadDialog = () => {
	const [file, setFile] = useState<File | null>(null);
	const useUpload = usePresignedUploadHandler();
	const [tripId] = useQueryState(QueryKeys.SelectedTrip, parseAsInteger);

	return (
		<Dialog>
			<DialogTrigger className="h-48 w-64 rounded-lg cursor-pointer border-2 border-dashed bg-accent hover:bg-input">
				<div className="flex flex-row gap-2 justify-center">
					<Upload /> Upload photos
				</div>
			</DialogTrigger>
			<DialogContent>
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
			</DialogContent>
		</Dialog>
	);
};
