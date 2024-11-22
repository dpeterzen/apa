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
  Square,
  SquareDot,
  SquarePen,
  Image as ImageIcon,
  SquareChartGantt,
  ChevronsUpDown,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
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
import { Button } from "../ui/button";
import { NavTitle } from "./nav-title";

export function NavSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <NavTitle />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="">
                <SidebarMenuButton>
                  <span className="text-blue-500 font-semibold flex items-center">
                    <CirclePlusIcon className="size-7 ml-[-2px] mr-1" />
                    Add tile
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span className="flex items-center">
                    <Search className="size-6 mr-[5px] text-zinc-700" />
                    Search
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="border rounded-lg">
          <SidebarGroupLabel>
            Tile Explorer
          </SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible
              key="TEST WALL NAME"
              asChild
              defaultOpen={true}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="px-2" tooltip="TEST WALL NAME">
                    <Square className="group-data-[state=open]/collapsible:hidden" />
                    <SquareDot className="group-data-[state=closed]/collapsible:hidden" />
                    TEST WALL NAME
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem key="1">
                      <SidebarMenuSubButton asChild>
                        <span>
                          <SquareChartGantt />
                          Notes go here

                        </span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem key="2">
                      <SidebarMenuSubButton asChild>
                        <a href="#">
                          <ImageIcon />
                          <span>random_image.png</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Recent Walls
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="px-2">
                  <Square className="group-data-[state=closed]/collapsible:hidden" />
                  TEST WALL NAME
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="px-2">
                  <Square className="group-data-[state=closed]/collapsible:hidden" />
                  Foo Bar Baz
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="px-2">
                  <Square className="group-data-[state=closed]/collapsible:hidden" />
                  Lorum Ipsum
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Button className="w-full justify-start pl-[10px] dark:text-zinc-400 dark:hover:text-zinc-100" variant={"link"}>
                  View All
                  <ChevronRight />
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="w-full rounded-lg mb-1 px-4 py-2 font-bold text-[15px] dark:bg-zinc-900 dark:hover:bg-zinc-800" variant={"outline"}>
              New Wall
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavUser />

      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
