import { auth } from "@/lib/auth-client";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "@tanstack/react-router";
import { ChevronsUpDown, LogOut } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../dropdown-menu";
import { SidebarFooter } from "../sidebar";

export const AppSidebarFooter = () => {
	const { user, logout } = useAuth();
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarFooter className="p-0 px-3 mb-2 bottom-0">
					<div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors hover:bg-white/10 cursor-pointer">
						<div className="flex items-center gap-2.5 min-w-0">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-xs font-semibold text-white shadow-inner">
								{user?.name?.[0]?.toUpperCase() ?? "?"}
							</div>
							<div className="flex flex-col min-w-0">
								<span className="truncate text-sm font-medium leading-tight text-foreground">
									{user?.name}
								</span>
								<span className="truncate text-xs text-muted-foreground leading-tight">
									{user?.email}
								</span>
							</div>
						</div>
						<ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
					</div>
				</SidebarFooter>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					className="flex flex-row gap-2"
					onClick={async () => {
						logout(() => router.navigate({ to: "/" }));
						await auth.signOut();
						await router.invalidate();
					}}
				>
					<LogOut />
					LogOut
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
