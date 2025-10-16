
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GRAÇA",
  description: "GRAÇA - Gestor de Rede de Apoio Comunitário e Assistência",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="dark">
        {children}
      </main>
  );
}
