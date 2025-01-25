"use client";

import * as React from "react";
import { Search, ArrowRight } from "lucide-react";
import Square from "@/components/icons/square";
import SquareDot from "@/components/icons/square-dot";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Button } from "../ui/button";
import { NavTitle } from "./nav-title";
import { AddWallDialog } from "../dialogs/add-wall-dialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter, usePathname } from "next/navigation";

export function NavSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const walls = useQuery(api.walls.getUserWalls);
  const router = useRouter();

  const pathname = usePathname();

  const handleRedirect = (wallId: string) => {
    router.push(`/wall/${wallId}`);
  };

  const currentWallId = pathname.split("/").pop();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="pb-1 pt-[6px]">
        <NavTitle />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="pt-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span className="flex items-center">
                    <Search className="mr-[5px] opacity-50" />
                    Search
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Walls</SidebarGroupLabel>
          <SidebarMenu className=" gap-0">
            {walls?.map((wall) => {
              const isCurrentWall = wall._id === currentWallId;
              return (
                <Collapsible
                  key={wall._id}
                  asChild
                  defaultOpen={false}
                  className="group/collapsible"
                >
                  <SidebarMenuItem
                    className={`group/menuitem ${
                      isCurrentWall ? "" : "hover:bg-accent"
                    } rounded-md`}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className={`px-2 ${
                          isCurrentWall
                            ? "bg-blue-300/30 hover:bg-blue-300/30 dark:!bg-zinc-950/80 dark:hover:bg-zinc-950/80"
                            : "group-hover/menuitem:bg-transparent"
                        }`}
                        tooltip={wall.title}
                      >
                        <Square className="group-data-[state=open]/collapsible:hidden opacity-50" />
                        <SquareDot className="group-data-[state=closed]/collapsible:hidden opacity-50" />
                        <span
                          className={`${isCurrentWall ? "text-blue-500 dark:text-blue-400" : ""}`}
                        >
                          {wall.title}
                        </span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {!isCurrentWall && (
                      <SidebarMenuAction
                        className="opacity-0 group-hover/menuitem:opacity-100 [&>svg]:size-[18px] !top-[7px]"
                        onClick={() => handleRedirect(wall._id)}
                      >
                        <ArrowRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>

          {/* <SidebarMenu>

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

          </SidebarMenu> */}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              className="w-full rounded-lg mb-1 px-4 py-2 font-bold text-[15px]"
              variant={"tertiary"}
              onClick={() => setDialogOpen(true)}
            >
              New Wall
            </Button>
          </SidebarMenuItem>
          <AddWallDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </SidebarMenu>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
