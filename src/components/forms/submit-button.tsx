import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export const SubmitButton = ({
	label,
	className,
}: { label: string; className?: string }) => {
	return (
		<Button type="submit" className={cn("", className)}>
			{label}
		</Button>
	);
};
