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
  Image,
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
        <h2 className="m-3">TidyRecall</h2>
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
                          <SquarePen />
                          Notes go here

                        </span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem key="2">
                      <SidebarMenuSubButton asChild>
                        <a href="#">
                          <Image />
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Starred Walls
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="px-2">
                  <Square className="group-data-[state=closed]/collapsible:hidden" />
                  TEST WALL NAME
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            All Walls
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="px-2">
                  <Square className="group-data-[state=closed]/collapsible:hidden" />
                  TEST WALL NAME
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
