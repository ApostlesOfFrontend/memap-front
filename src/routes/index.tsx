import { createFileRoute } from "@tanstack/react-router";

import { CallToAction } from "@/components/landing-page/call-to-action";
import { Features } from "@/components/landing-page/features";
import { Footer } from "@/components/landing-page/footer";
import { Gradient } from "@/components/landing-page/gradient";
import { Header } from "@/components/landing-page/header";
import { Hero } from "@/components/landing-page/hero";
import { HowItWorks } from "@/components/landing-page/how-it-works";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<div className="relative isolate overflow-hidden">
				<Gradient />
				<Header />

				<Hero />

				<HowItWorks />

				<Features />

				<CallToAction />
			</div>

			<Footer />
		</main>
	);
}
