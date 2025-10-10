
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import icon from '../app/bag-simple.svg'

const geistSans = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRAÇA",
  description: "GRAÇA - Gestão de Recursos de Alimentos Cuidados e Apoio",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
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
