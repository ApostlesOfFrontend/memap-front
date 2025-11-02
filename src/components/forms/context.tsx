import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { HiddenInput } from "./hidden-input";
import { Input } from "./input";
import { SubmitButton } from "./submit-button";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldComponents: {
		Input,
		HiddenInput,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
