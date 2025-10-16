'use server'
import EditProfileForm from "@/components/perfil";
import { getAuthUser } from "@/lib/auth";
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation";

export default async function getUsers() {
    const user = await getAuthUser()
    
      if (!user) {
        redirect('/login')
      }

    const perfil = await prisma.users.findUnique({where: {id: (user.userId).toString()}})

    return (
        <EditProfileForm userData={perfil}/>
    )
}