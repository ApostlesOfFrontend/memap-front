import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "../../context";

export const FormError = () => {
	const field = useFieldContext();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<>
			{errors.length > 0 && (
				<div className="text-red-500 text-sm">{errors[0].message}</div>
			)}
		</>
	);
};
