import { Input as ShadInput } from "../../ui/input";
import { Label } from "../../ui/label";
import { useFieldContext } from "../context";
import { Description } from "./general/description";
import { FormError } from "./general/error";
import type { TextInputBaseProps } from "./types/text-input";

export const Input = ({
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
			<ShadInput
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
