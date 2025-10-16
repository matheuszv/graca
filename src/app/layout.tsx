
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import icon from '../app/heart-handshake.svg'
import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";

const geistSans = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href={icon.src} />
      </head>
      <body
        className={`${geistSans.variable} antialiased`}
      >
         {children}
      </body>
    </html>
  );
}
