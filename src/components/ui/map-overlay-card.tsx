import type { ReactNode } from "react";
import { Card } from "./card";

export const MapOverlayCard = ({ children }: { children: ReactNode }) => {
	return (
		<div className="absolute top-2 left-2 z-50 min-w-xs">
			<Card>{children}</Card>
		</div>
	);
};
