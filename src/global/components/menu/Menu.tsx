"use client";
import { AlarmClockCheck, Calendar1, CalendarDays } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Calendars } from "../../../calendar/components/calendar/calendars";
import { DatePicker } from "../datepicker/Datepicker";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Calendrier",
      url: "/calendrier",
      icon: CalendarDays,
    },
    {
      title: "Événements",
      url: "/evenements",
      icon: Calendar1,
    },
    {
      title: "Rendez-vous",
      url: "/rendez-vous",
      icon: AlarmClockCheck,
    },
  ],
  calendars: [
    {
      name: "Mes catégories",
      items: ["Privé", "Public", "Indisponible"],
    },
    {
      name: "Calendriers partagés",
      items: ["Uxer", "Benoit", "Pauline"],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        {pathName === "/calendrier" || pathName === "/evenements" ? (
          <Calendars calendars={data.calendars} />
        ) : null}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
