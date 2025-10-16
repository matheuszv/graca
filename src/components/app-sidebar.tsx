'use client'
import { Home, MapPinHouse, MapPinCheck, Shield, Star, LogOut, Pencil, HeartHandshake, MapPinPlus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/pontos",
    icon: Home,
  },
  {
    title: "Cadastrar ponto novo",
    url: "/novoponto",
    icon: MapPinPlus,
  },
  {
    title: "Meus pontos cadastrados",
    url: "/meuspontos",
    icon: MapPinHouse,
  },
  {
    title: "Meus pontos favoritos",
    url: "/favoritos",
    icon: MapPinCheck,
  },
  {
    title: "Política de Privacidade",
    url: "/politicas",
    icon: Shield,
  },
  {
    title: "Créditos",
    url: "/creditos",
    icon: Star,
  },
]

export function AppSidebar({userName}:{userName:string}) {
    const router = useRouter()

    async function desconect(){
        const res = await fetch('/api/login', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        
        if (res.ok) {
        alert('Login realizado com sucesso!')
        router.push('/')
        } else {
        const data = await res.json()
        alert(data.error || 'Erro ao desconectar')
        }
    }

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 px-4 py-3">
        <HeartHandshake className="w-5 h-5" />
        <span className="text-lg font-semibold">GRAÇA</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between my-2">
            <span className="text-base">{userName}</span> 
            <button
                onClick={() => router.push(`/perfil`)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-400 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
                aria-label="Editar perfil"
            >
                <Pencil className="w-4 h-4 text-gray-800" />
            </button>
      </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            
          </SidebarGroupContent>
        </SidebarGroup>
                    
      </SidebarContent>
      <SidebarFooter>
            <SidebarMenuButton className="bg-red-500 flex justify-center items-center gap-1.5 cursor-pointer hover:bg-red-400 mb-2" onClick={desconect}>
                <span>Desconectar</span> <LogOut />
            </SidebarMenuButton>
            <div className="flex justify-center w-full mb-4">
                <span className="text-xs">“Compartilhar é viver com GRAÇA.”</span>
            </div>
      </SidebarFooter>
    </Sidebar>
  )
}