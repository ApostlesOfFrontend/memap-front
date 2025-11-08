import { Eye, EyeOff } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "../../ui/button";
import { Input as ShadInput } from "../../ui/input";
import { Label } from "../../ui/label";
import { useFieldContext } from "../context";
import { Description } from "./general/description";
import { FormError } from "./general/error";
import type { TextInputBaseProps } from "./types/text-input";

export interface HiddenInputProps extends TextInputBaseProps {
	show?: boolean;
	setShow?: Dispatch<SetStateAction<boolean>>;
}

export const HiddenInput = ({
	label,
	description,
	placeholder,
	show,
	setShow,
}: HiddenInputProps) => {
	const field = useFieldContext<string>();
	const [internalShow, setInternalShow] = useState<boolean>(false);

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
			<Label className="mb-2" htmlFor={`input-${label}`}>
				{label}
			</Label>
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
					className="absolute border-0 top-0 right-0"
					tabIndex={-1}
				>
					{isVisible ? <EyeOff /> : <Eye />}
				</Button>
			</div>
			<Description description={description} />
			<FormError />
		</div>
	);
};
