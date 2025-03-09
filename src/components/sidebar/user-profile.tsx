import { ChevronsUpDown } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { useAuth } from "@/context/auth-context";
import UserAvatar from "@/components/user-table/user-avatar";

export const SidebarUserProfile = () => {
  const { user, logout } = useAuth();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size={"lg"}>
              <UserAvatar
                src={user?.role}
                name={`${user?.firstName} ${user?.lastName}`}
                className="h-8 w-8"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <h1 className="truncate font-semibold">{`${user?.firstName} ${user?.lastName}`}</h1>
                <h1 className="truncate text-xs">{user?.email}</h1>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-lg" side={"top"} sideOffset={4} align="end">
            <DropdownMenuItem onClick={() => logout()}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
