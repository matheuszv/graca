import { getAuthUser } from "@/lib/auth"
import { redirect } from "next/navigation"

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
          {children}
    </div>
  )
}
