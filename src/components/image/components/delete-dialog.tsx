import { useDeleteImage } from "@/api/images/delete";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

export const DeleteImageDialog = ({ id }: { id: string }) => {
	const [open, setOpen] = useState(false);
	const { mutate, isPending } = useDeleteImage(() => setOpen(() => false));

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button">
					<Trash className="text-red-400" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure you want to delete this image?</DialogTitle>
					<DialogDescription>
						This will permamently delete image
					</DialogDescription>
					<DialogFooter>
						<DialogClose>
							<Button>Cancel</Button>
						</DialogClose>
						<Button
							onClick={() => {
								mutate(id);
							}}
						>
							{isPending ? <Loader2 className="animate-spin" /> : "Delete"}
						</Button>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
