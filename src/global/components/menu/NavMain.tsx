"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname.includes(item.url);
            console.log(pathname, item.url, isActive);
            return (
              <SidebarMenuItem
                key={item.title}
                className={cn(
                  "rounded-[10px]",
                  isActive ? "bg-secondary text-secondary-foreground" : ""
                )}
              >
                <SidebarMenuButton
                  tooltip={item.title}
                  className="cursor-pointer"
                  onClick={() => handleRedirect(item.url)}
                >
                  {item.icon && (
                    <item.icon className={isActive ? "text-white" : ""} />
                  )}
                  <span className={isActive ? "text-white" : ""}>
                    {item.title}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
