import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormContext } from "../context";

export const SubmitButton = ({
	label,
	className,
}: { label: string; className?: string }) => {
	const form = useFormContext();
	return (
		<form.Subscribe
			selector={(state) => [state.canSubmit, state.isSubmitting]}
			children={([canSubmit, isSubmitting]) => (
				<Button
					type="submit"
					className={cn("", className)}
					disabled={!canSubmit || isSubmitting}
				>
					{isSubmitting ? <Loader2 className="animate-spin" /> : label}
				</Button>
			)}
		/>
	);
};
