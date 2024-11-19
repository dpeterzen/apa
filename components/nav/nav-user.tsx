"use client"

import { BadgeCheck, LogOut, Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar,
} from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function NavUser() {
  const { theme, setTheme } = useTheme()
  // const { isMobile } = useSidebar()
  const session = useSession()

  const name = session?.data?.user?.name;
  const email = session?.data?.user?.email;
  const firstName = name?.split(' ')[0];
  const lastName = name?.split(' ')[1];
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`;
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500">
                  <span className="text-xs font-semibold text-white">{initials}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">{firstName}</span>
                  <span className="text-xs text-muted-foreground">Free</span>
                </div>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[273px] md:min-w-[243px] rounded-lg"  >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-xs leading-none text-muted-foreground mb-2">
                  {email}
                </p>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500">
                  <span className="text-xs font-semibold text-white">{initials}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">{firstName}</span>
                  <span className="text-xs text-muted-foreground">Free</span>
                </div>
              </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button className="w-full" variant="secondary">
                Upgrade Plan
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
              <LogOut />
              Log Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuLabel>
              <span className="text-xs font-normal text-muted-foreground">Preferences</span>
            </DropdownMenuLabel>
            <DropdownMenuGroup className="space-y-1 px-2 py-2">

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Theme</span>
                  <div className="flex gap-0.5">
                    <Button
                      variant={theme === "system" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setTheme("system")}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={theme === "light" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={theme === "dark" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Language</span>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DropdownMenuGroup>




          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
