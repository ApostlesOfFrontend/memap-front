export const Footer = () => {
	return (
		<footer className="border-t border-border/40 bg-background/80">
			<div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-[11px] text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
				<p>
					<span className="font-medium text-foreground">Memap</span> · Map your
					trips, keep your memories.
				</p>
				<p>Built with a dark, calm interface for late-night trip planning.</p>
			</div>
		</footer>
	);
};
