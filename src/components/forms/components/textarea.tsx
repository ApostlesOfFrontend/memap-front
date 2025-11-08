import { Label } from "@/components/ui/label";
import { Description } from "./general/description";
import { FormError } from "./general/error";
import type { TextInputBaseProps } from "./types/text-input";

import { Textarea as BaseTextarea } from "@/components/ui/textarea";
import { useFieldContext } from "../context";

export const Textarea = ({
	label,
	description,
	placeholder,
}: TextInputBaseProps) => {
	const field = useFieldContext<string>();

	return (
		<div>
			<Label className="mb-2" htmlFor={`input-${label}`}>
				{label}
			</Label>
			<BaseTextarea
				id={`input-${label}`}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				placeholder={placeholder || ""}
			/>
			<Description description={description} />
			<FormError />
		</div>
	);
};
