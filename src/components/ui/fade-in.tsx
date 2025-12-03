import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type FadeInProps = React.HTMLAttributes<HTMLDivElement>;

export const FadeIn = ({ className, children, ...props }: FadeInProps) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.2 },
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			data-visible={visible}
			className={cn(
				"opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};
