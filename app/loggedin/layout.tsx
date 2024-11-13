import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Providers from "../providers";
import { auth } from "@/auth";
import { AppSidebar } from "@/components/nav/sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <Providers session={session}>
      
      <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
    </Providers>
  );
}
