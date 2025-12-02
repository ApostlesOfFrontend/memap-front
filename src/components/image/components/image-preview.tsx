import type { ImagesList } from "@/api/images/list";
import { API } from "@/api/util/fetch";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import { useState } from "react";

type ImagePreviewProps = {
	images: ImagesList;
	initialIndex: number;
};

export const ImagePreview = ({ images, initialIndex }: ImagePreviewProps) => {
	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	if (!images.length) {
		return null;
	}

	const handleOpenChange = (nextOpen: boolean) => {
		setOpen(nextOpen);
		if (nextOpen) {
			setCurrentIndex(initialIndex);
		}
	};

	const navigate = (direction: "prev" | "next") => {
		setCurrentIndex((prev) => {
			if (direction === "prev") {
				return prev === 0 ? images.length - 1 : prev - 1;
			}
			return prev === images.length - 1 ? 0 : prev + 1;
		});
	};

	const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			navigate("prev");
		}
		if (event.key === "ArrowRight") {
			event.preventDefault();
			navigate("next");
		}
	};

	const currentImage = images[currentIndex];

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<Dialog.Trigger asChild>
				<Button>
					<Eye />
				</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" />
				<Dialog.Content
					className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] z-50 focus:outline-none"
					onKeyDown={handleKeyDown}
					tabIndex={-1}
				>
					<Dialog.Title className="hidden">Image Preview</Dialog.Title>
					<Dialog.Description className="hidden">
						Dialog for image preview
					</Dialog.Description>
					<Dialog.Close className="absolute top-4 right-4 bg-white/50 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-black z-50">
						<X size={20} />
					</Dialog.Close>

					<Button
						type="button"
						onClick={() => navigate("prev")}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-black z-50"
					>
						<ChevronLeft size={20} />
					</Button>

					<Button
						type="button"
						onClick={() => navigate("next")}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-black z-50"
					>
						<ChevronRight size={20} />
					</Button>

					<div className="flex items-center justify-center">
						<img
							src={`${API}/api/images/${currentImage.id}?type=full`}
							alt=""
							className="max-w-[90vw] max-h-[90vh] object-contain"
						/>
					</div>

					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
						{currentIndex + 1} / {images.length}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
