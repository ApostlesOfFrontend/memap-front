import type { Session, User } from "better-auth";
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { toast } from "sonner";
import { auth } from "./auth-client";

export interface AuthContextI {
	isAuthenticatedWithReauth: () => Promise<boolean>;
	user?: User;
	session?: Session;
	isAuthenticated: boolean;
	logout: (navCallback: () => void) => Promise<void>;
}

const AuthContext = createContext<AuthContextI | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | undefined>();
	const [session, setSession] = useState<Session | undefined>();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const getSession = useCallback(async () => {
		const { data, error } = await auth.getSession();

		if (error || !data) {
			setUser(() => undefined);
			setSession(() => undefined);
			setIsAuthenticated(() => false);
			return null;
		}

		setUser(() => data.user);
		setSession(() => data.session);
		setIsAuthenticated(() => true);
		return data;
	}, []);

	useEffect(() => {
		getSession();
	}, [getSession]);

	const isAuthenticatedWithReauth = useCallback(async () => {
		if (user === undefined) {
			const data = await getSession();
			return !!data?.user;
		}

		return !!user;
	}, [getSession, user]);

	const logout = useCallback(async (navCallback: () => void) => {
		const { error } = await auth.signOut();
		if (error) {
			toast.error("There was an error while logging out");
			return;
		}
		setUser(undefined);
		setSession(undefined);
		setIsAuthenticated(false);
		navCallback();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticatedWithReauth,
				user,
				session,
				logout,
				isAuthenticated,
			}}
		>
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
