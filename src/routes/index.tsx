import { createFileRoute } from "@tanstack/react-router";

import { CallToAction } from "@/components/landing-page/call-to-action";
import { Features } from "@/components/landing-page/features";
import { Footer } from "@/components/landing-page/footer";
import { Header } from "@/components/landing-page/header";
import { Hero } from "@/components/landing-page/hero";
import { HowItWorks } from "@/components/landing-page/how-it-works";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<main className="min-h-screen overflow-x-hidden bg-background text-foreground">
			<Header />
			<Hero />
			<HowItWorks />
			<Features />
			<CallToAction />
			<Footer />
		</main>
	);
}
