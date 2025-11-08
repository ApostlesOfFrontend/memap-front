"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";
import { useFieldContext } from "../context";
import { Description } from "./general/description";
import { FormError } from "./general/error";

export interface DatePickerProps {
	label: string;
	description?: string;
}

// Separate from date-range to avoid type hell
export function DateRangePicker({ label, description }: DatePickerProps) {
	const [open, setOpen] = React.useState(false);
	const field = useFieldContext<DateRange | undefined>();

	const date = field.state.value;

	return (
		<div className="flex flex-col">
			<Label htmlFor="date" className="mb-2">
				{label}
			</Label>

			<Popover open={open} onOpenChange={setOpen} modal={true}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="justify-between font-normal"
					>
						{date
							? `${date.from?.toLocaleDateString()} - ${date.to?.toLocaleDateString()}`
							: "Select date"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="range"
						selected={date}
						captionLayout="dropdown"
						onSelect={(date) => {
							field.handleChange(date);
						}}
					/>
				</PopoverContent>
			</Popover>
			<Description description={description} />
			<FormError />
		</div>
	);
}
