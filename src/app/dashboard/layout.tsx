"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/Navigation/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import BreadcrumbComponent from "@/components/BreadCrumb";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const labels = {
    dashboard: "Dashboard",
    [pathSegments[1]]: "User Profile",
    profile: "My Profile",
    analytics: "Analytics",
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbComponent pathSegments={pathSegments} labels={labels} />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-2 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {children}
          </div>
        </div>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
