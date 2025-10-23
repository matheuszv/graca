
import type { Metadata } from "next";
import { redirect } from 'next/navigation'
import { getAuthUser } from "@/lib/auth";
import { SidebarProvider,  } from "@/components/ui/sidebar"
import { Toaster } from "sonner";

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
      <main>
        <Toaster
          position="top-right"
          richColors={true}
          toastOptions={{
            style: { borderRadius: "8px" },
          }}
        />
        {children}
      </main>
    </SidebarProvider>
    
  );
}
