'use server'
import ScrollableCardsList from "@/components/mypoints";
import { getAuthUser } from "@/lib/auth";
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation";

export default async function getCidades() {

    const user = await getAuthUser()
    
    if (!user) {
      redirect('/')
    }
    
    const result = await prisma.pontos.findMany({
        where: {criadorId: user.userId.toString()}
    })

    const pontos = result.map((mypoints)=> {
        return {
            ...mypoints,
            coordenada: mypoints.coordenada.split(",").map((coord)=> parseFloat(coord)) as [number, number],
            data: mypoints.data.split(",")     
        }
    })

    return(
        <div className="dark">
            <ScrollableCardsList
                pontosFiltrados={pontos}
            />
        </div>
    )
}