
import type { Metadata } from "next";
import { redirect } from 'next/navigation'
import { getAuthUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "GRAÇA",
  description: "GRAÇA - Gestão de Recursos de Alimentos Cuidados e Apoio",
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
    <html className="dark">
      {children} 
    </html>
  );
}
