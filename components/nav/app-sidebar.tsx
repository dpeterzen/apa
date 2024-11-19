import * as React from "react";
import {
  GalleryVerticalEnd,
  Minus,
  Plus,
  SquareStack,
  EyeOff,
  Earth,
  Hash,
  SquarePlus,
  Search,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
  SidebarRail,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { CirclePlusIcon } from "../icons/circle-plus";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="">
                <SidebarMenuButton>
                  <a href="#" className="text-blue-500 font-semibold flex items-center">
                    <CirclePlusIcon className="size-7 ml-[-2px] mr-1" />
                    Add tile
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <a href="#" className="flex items-center">
                    <Search className="size-6 mr-[5px] text-zinc-700" />
                    Search
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <GalleryVerticalEnd className="mr-1" />
            My Walls
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <a href="#" className="flex items-center">
                    <Hash className="size-5 mr-2" />
                    TEST WALL NAME
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>

          <NavUser />

      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
