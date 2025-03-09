"use client";

import { ChevronsLeft, ChevronsRight, Home, Settings2, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { SidebarUserProfile } from "./user-profile";
import { useAuth } from "@/context/auth-context";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    accessRole: [
      "ADMIN",
      "CASHIER",
      "SECURITY",
      "STUDENT",
      "STAFF",
      "GUEST",
      "UNVERIFIED",
      "SUPERADMIN"
    ]
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
    accessRole: ["ADMIN", "SUPERADMIN"]
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
    accessRole: [
      "ADMIN",
      "CASHIER",
      "SECURITY",
      "STUDENT",
      "STAFF",
      "GUEST",
      "UNVERIFIED",
      "SUPERADMIN"
    ]
  }
];

export const AppSidebar = () => {
  const { state, toggleSidebar } = useSidebar();

  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between pl-1">
            <div className={`${state === "collapsed" ? "hidden" : "flex gap-x-4"}`}>
              <img src="/neu-logo.png" alt="NEU Logo" className="w-[30px] h-[30px]" />
              <h3 className="truncate font-semibold text-2xl">{user?.role}</h3>
            </div>
            <div className="pr-2 hover:cursor-pointer">
              {state === "expanded" ? (
                <ChevronsLeft onClick={toggleSidebar} size={25} />
              ) : (
                <ChevronsRight onClick={toggleSidebar} size={25} />
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (!user?.role || !item.accessRole.includes(user?.role)) {
                  return;
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        <item.icon />
                        <span className="text-base font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserProfile />
      </SidebarFooter>
    </Sidebar>
  );
};
