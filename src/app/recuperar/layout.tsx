import { getAuthUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Toaster } from "sonner"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const user = await getAuthUser()
  
    if (user) {
      redirect('/pontos')
    }

  return (
    <div className="dark">
      <Toaster
          position="top-right"
          richColors={true}
          toastOptions={{
            style: { borderRadius: "8px" },
          }}
        />
          {children}
    </div>
  )
}
