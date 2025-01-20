"use client";

import * as React from "react";
import {
  ChartNoAxesCombined,
  Command,
  LifeBuoy,
  Table,
  UserRoundPen,
} from "lucide-react";

import { NavMain } from "@/components/Navigation/nav-main";
import { NavSecondary } from "@/components/Navigation/nav-secondary";
import { NavUser } from "@/components/Navigation/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Employee Pool",
      url: "/dashboard",
      icon: Table,
      isActive: true,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: ChartNoAxesCombined,
    },
    {
      title: "My Profile",
      url: "/dashboard/profile",
      icon: UserRoundPen,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/dashboard/support",
      icon: LifeBuoy,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Secret Source</span>
                  <span className="truncate text-xs">SL</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
