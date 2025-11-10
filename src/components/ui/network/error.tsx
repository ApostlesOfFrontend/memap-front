"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
	title?: string;
	message?: string;
	onRetry?: () => void;
	className?: string;
}

export function ErrorState({ title, message, onRetry }: ErrorStateProps) {
	return (
		<div>
			<div className="flex flex-col items-center justify-center p-8 text-center bg-red-500/5 rounded-xl m-4">
				<div className="bg-error-100 rounded-full p-3">
					<AlertCircle className="text-error-300 h-8 w-8 text-red-500" />
				</div>
				<h3 className="mt-4 text-lg font-semibold">
					{title || "Something went wrong"}
				</h3>
				{message && (
					<p className="text-main-500 mt-2 max-w-96 text-sm">{message}</p>
				)}
				{onRetry && (
					<Button
						variant="outline"
						className="mt-4 flex items-center gap-2"
						onClick={onRetry}
					>
						<RefreshCw className="h-4 w-4" />
						Try again
					</Button>
				)}
			</div>
		</div>
	);
}
