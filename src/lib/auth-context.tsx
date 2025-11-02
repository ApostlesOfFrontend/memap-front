import type { Session, User } from "better-auth";
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { toast } from "sonner";
import { auth } from "./auth-client";

export interface AuthContextI {
	isAuthenticated: () => Promise<boolean>;
	user?: User;
	session?: Session;
	logout: (navCallback: () => void) => Promise<void>;
}

const AuthContext = createContext<AuthContextI | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | undefined>();
	const [session, setSession] = useState<Session | undefined>();

	/**
	 * NOTE:
	 * Following Ref and Effects are needed.
	 * isAuthenticated is asynchronous callback which might not get freshest user from useState
	 * causing unnecessary session refetches. With this, isAuthenticated always operates on
	 * freshest user possible.
	 */
	const userRef = useRef<User | undefined>(null);
	useEffect(() => {
		userRef.current = user;
	}, [user]);

	const getSession = useCallback(async () => {
		const { data, error } = await auth.getSession();

		if (error || !data) {
			toast.error("There was an error while getting user information");
			return null;
		}

		setUser(() => data.user);
		setSession(() => data.session);
		return data;
	}, []);

	const isAuthenticated = useCallback(async () => {
		const currentUser = userRef.current;

		if (currentUser === undefined) {
			const data = await getSession();
			return !!data?.user;
		}

		return !!currentUser;
	}, [getSession]);

	const logout = useCallback(async (navCallback: () => void) => {
		const { error } = await auth.signOut();
		if (error) {
			toast.error("There was an error while logging out");
			return;
		}
		setUser(undefined);
		setSession(undefined);
		navCallback();
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, session, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used inside AuthProvider");
	}
	return context;
};
