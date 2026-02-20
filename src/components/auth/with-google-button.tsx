import { auth } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const WithGoogleButton = () => {
	const handleGoogle = async () => {
		const { error } = await auth.signIn.social({
			provider: "google",
			callbackURL: `${import.meta.env.VITE_APP_BASE_URL}/app/map`,
		});

		if (error) {
			toast.error("There was an error when you tried to log in with google", {
				description: "If error persists please contact administration",
			});
		}
	};
	return (
		<Button className="w-full" variant="outline" onClick={handleGoogle}>
			Google
		</Button>
	);
};
