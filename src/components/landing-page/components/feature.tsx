import type { ReactNode } from "react";

export type FeatureProps = {
	title: string;
	description: string;
	icon?: ReactNode;
};

export const Feature = ({ icon, title, description }: FeatureProps) => {
	return (
		<article className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background/60 p-4 backdrop-blur">
			{icon ? (
				<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
					{icon}
				</div>
			) : null}
			<h3 className="text-sm font-semibold">{title}</h3>
			<p className="text-xs text-muted-foreground">{description}</p>
		</article>
	);
};
