import { useStore } from "@tanstack/react-form";
import { Input as ShadInput } from "../ui/input";
import { useFieldContext } from "./context";

export interface InputProps {
	label: string;
	description?: string;
	placeholder?: string;
}

export const Input = ({ label, description, placeholder }: InputProps) => {
	const field = useFieldContext<string>();

	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div>
			<label htmlFor={`input-${label}`}>{label}</label>
			<ShadInput
				id={`input-${label}`}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				placeholder={placeholder || ""}
			/>
			{description && <div>{placeholder}</div>}
			{errors.length > 0 && (
				<div className="text-red-500">{errors.join(", ")}</div>
			)}
		</div>
	);
};
