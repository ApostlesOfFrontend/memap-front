import { API } from "@/api/util/fetch";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { Eye, X } from "lucide-react";
import { useState } from "react";

export const ImagePreview = ({ id }: { id: string }) => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button>
					<Eye />
				</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" />
				<Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90vw] max-h-[90vh] z-50">
					<Dialog.Title className="hidden">Image Preview</Dialog.Title>
					<Dialog.Description className="hidden">
						Dialog for image preview
					</Dialog.Description>
					<Dialog.Close className="absolute top-4 right-4 bg-black/50 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-white z-50">
						<X size={20} />
					</Dialog.Close>
					<img
						src={`${API}/api/images/${id}?type=full`}
						alt=""
						className="max-w-[90vw] max-h-[90vh] object-contain"
					/>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
