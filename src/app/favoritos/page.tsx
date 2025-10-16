'use server'
import MeusFavoritos from "@/components/myfavorites";
import { getAuthUser } from "@/lib/auth";
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation";

export default async function getCidades() {

    const user = await getAuthUser()
    
    if (!user) {
      redirect('/')
    }
    
    const favoritosComPontos = await prisma.favoritos.findMany({
            where: {
                user: user.userId.toString()
            },
            include: {
                ponto: true,
            }
        })

    const pontosFormatados = favoritosComPontos.map((ponto)=> {return ponto.ponto})
    
    const cidades = await prisma.cidades.findMany()
    const cidadesFormatadas = cidades.map((cidade) => {
        return {
          id: cidade.codigo_ibge,
          nome: cidade.nome_completo
        }
    })
    return(
        <div className="dark">
            <MeusFavoritos pontosFiltrados={pontosFormatados} cidades={cidadesFormatadas} />
        </div>
    )
}