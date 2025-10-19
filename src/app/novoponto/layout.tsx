
import type { Metadata } from "next";
import { redirect } from 'next/navigation'
import { getAuthUser } from "@/lib/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export const metadata: Metadata = {
  title: "GRAÇA",
  description: "GRAÇA - Gestor de Rede de Apoio Comunitário e Assistência",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthUser()

  if (!user) {
    redirect('/login')
  }
  
  return (
    <SidebarProvider>
      <AppSidebar userName={user?.name} fotoPerfil={user?.fotoPerfil}/>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    
  );
}
