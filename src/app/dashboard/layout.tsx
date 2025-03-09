import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";
import ProtectedLayout from "@/components/auth/protected-layout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedLayout>
      <div className="flex h-screen overflow-hidden">
        <div className="w-64 flex-shrink-0">
          <SidebarProvider>
            <AppSidebar />
          </SidebarProvider>
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </ProtectedLayout>
  );
}
