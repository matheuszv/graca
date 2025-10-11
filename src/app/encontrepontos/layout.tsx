
import type { Metadata } from "next";

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
      <main className="dark">
        {children}
      </main>
  );
}
