/* eslint-disable @next/next/no-img-element */
'use client'
import { Home, MapPinHouse, MapPinCheck, Shield, Star, LogOut, Pencil, HeartHandshake, MapPinPlus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import Link from "next/link"

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

export function AppSidebar({userName, fotoPerfil}:{userName:string; fotoPerfil: string;}) {
    const router = useRouter()
    console.log(fotoPerfil)

    async function desconect(){
        const res = await fetch('/api/login', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        
        if (res.ok) {
        alert('Desconectado realizado com sucesso!')
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
        <div className="flex flex-col items-center my-4 relative">
          <div className="relative">
            <img
              src={fotoPerfil}
              alt="Foto de perfil"
              className="h-16 w-16 rounded-full object-cover border-2 border-white cursor-pointer"
            />
            <button
              onClick={() => router.push('/perfil')}
              className="absolute bottom-0 right-0 bg-gray-200 hover:bg-gray-300 rounded-full p-1 shadow cursor-pointer"
              aria-label="Editar perfil"
            >
              <Pencil className="w-4 h-4 text-gray-800" />
            </button>
          </div>
          <span className="mt-2 text-base font-medium">{userName}</span>
        </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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