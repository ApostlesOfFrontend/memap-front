import { useStore } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Input as ShadInput } from "../ui/input";
import { useFieldContext } from "./context";

export interface InputProps {
	label: string;
	description?: string;
	placeholder?: string;
	show?: boolean;
	setShow?: Dispatch<SetStateAction<boolean>>;
}

export const HiddenInput = ({
	label,
	description,
	placeholder,
	show,
	setShow,
}: InputProps) => {
	const field = useFieldContext<string>();
	const [internalShow, setInternalShow] = useState<boolean>(false);
	const errors = useStore(field.store, (state) => state.meta.errors);

	const isVisible = show || internalShow;

	const handleChange = () => {
		if (setShow) {
			setShow((s) => !s);
		} else {
			setInternalShow((s) => !s);
		}
	};

	return (
		<div>
			<label htmlFor={`input-${label}`}>{label}</label>
			<div className="relative">
				<ShadInput
					id={`input-${label}`}
					value={field.state.value}
					onChange={(e) => field.handleChange(e.target.value)}
					onBlur={field.handleBlur}
					placeholder={placeholder || ""}
					type={isVisible ? "text" : "password"}
				/>
				<Button
					type="button"
					variant="outline"
					onClick={handleChange}
					className="absolute border-0 top-0 right-0 "
				>
					{isVisible ? <EyeOff /> : <Eye />}
				</Button>
			</div>
			{description && <div>{placeholder}</div>}
			{errors.length > 0 && (
				<div className="text-red-500">{errors.join(", ")}</div>
			)}
		</div>
	);
};
