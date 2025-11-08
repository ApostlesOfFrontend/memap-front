import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { DatePicker } from "./components/date-picker";
import { DateRangePicker } from "./components/date-range-picker";
import { HiddenInput } from "./components/hidden-input";
import { Input } from "./components/input";
import { SubmitButton } from "./components/submit-button";
import { Textarea } from "./components/textarea";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldComponents: {
		Input,
		HiddenInput,
		DatePicker,
		DateRangePicker,
		Textarea,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
