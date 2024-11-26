import * as React from "react";
import {
  Search,
  Square,
  SquareDot,
  Image as ImageIcon,
  SquareChartGantt,
  ArrowRight,
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
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { CirclePlusIcon } from "../icons/circle-plus";
import { NavUser } from "./nav-user";
import { Button } from "../ui/button";
import { NavTitle } from "./nav-title";
import { SquarePlusIcon } from "../icons/square-plus";

export function NavSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar {...props}>
      <SidebarHeader className="pb-1">
        <NavTitle />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="pt-0">
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span className="flex items-center">
                    <Search className="mr-[5px] text-zinc-400" />
                    Search
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            My Walls
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

            <SidebarMenuItem>
                <SidebarMenuButton className="px-2 group">
                  <Square className="group-data-[state=closed]/collapsible:hidden" />
                  TEST WALL NAME 2
                </SidebarMenuButton>
                <SidebarMenuAction className="opacity-0 group-hover/menu-item:opacity-100 [&>svg]:size-5">
                  <ArrowRight  />
                  <span className="sr-only">Toggle</span>
                </SidebarMenuAction>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="px-2 group">
                  <Square className="group-data-[state=closed]/collapsible:hidden" />
                  Foo Bar Baz
                </SidebarMenuButton>
                <SidebarMenuAction className="opacity-0 group-hover/menu-item:opacity-100 [&>svg]:size-5">
                  <ArrowRight  />
                  <span className="sr-only">Toggle</span>
                </SidebarMenuAction>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="px-2 group">
                  <Square className="group-data-[state=closed]/collapsible:hidden" />
                  Lorum Ipsum
                </SidebarMenuButton>
                <SidebarMenuAction className="opacity-0 group-hover/menu-item:opacity-100 [&>svg]:size-5">
                  <ArrowRight  />
                  <span className="sr-only">Toggle</span>
                </SidebarMenuAction>
              </SidebarMenuItem>

          </SidebarMenu>
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
