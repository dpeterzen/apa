import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NavSidebar } from "@/components/nav/nav-sidebar";
import Providers from "../providers";
import { auth } from "@/auth";
import { NavActions } from "@/components/nav/nav-actions";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <Providers session={session}>

      <SidebarProvider>
        <NavSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <ChevronRight size={18} />
            <div className="ml-auto">
              <NavActions />
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              {children}
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </main>
        </SidebarInset>

      </SidebarProvider>
    </Providers>
  );
}
