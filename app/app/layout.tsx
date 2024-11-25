import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { NavSidebar } from "@/components/nav/nav-sidebar";
import Providers from "../providers";
import { auth } from "@/auth";
import { NavHeader } from "@/components/nav/nav-header";
import WallTitle from "@/components/walls/wall-title";

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
          <NavHeader />
          <WallTitle />
          {children}
        </SidebarInset>

      </SidebarProvider>
    </Providers>
  );
}
