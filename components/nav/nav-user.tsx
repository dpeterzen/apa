"use client"

import { BadgeCheck, ChevronDown, LogOut, Monitor, Moon, Sun } from "lucide-react"
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
} from "@/components/ui/sidebar";
import { signOutAction } from "@/actions/auth-action";
import { useRouter } from "next/navigation";

export function NavUser() {
  const router = useRouter();
  const { theme, setTheme } = useTheme()
  // const { isMobile } = useSidebar()
  const session = useSession()

  const name = session?.data?.user?.name;
  const email = session?.data?.user?.email;
  const firstName = name?.split(' ')[0];

  const handleSignOut = async () => {
    try {
      await signOutAction();
      router.refresh(); // Clear router cache
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
      router.replace('/');
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="h-[38px] data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-400">
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">{firstName}</span>
                </div>
              </div>
              <ChevronDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[288px] md:min-w-[256px] rounded-2xl drop-shadow-lg">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-xs leading-none text-muted-foreground mb-2">
                  {email}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-400">
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">{firstName}</span>
                    <span className="text-xs text-muted-foreground">Free plan</span>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator />
            <Button size="sm" className="w-full" variant="outline">
              Upgrade Plan
            </Button> */}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="w-full cursor-pointer py-[10px] rounded-md">
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="w-full cursor-pointer py-[10px] rounded-md"
>
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
              </div>
            </DropdownMenuGroup>

          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
