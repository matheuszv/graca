/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import prisma from "@/lib/prisma";
import { Pontos } from "../../components/data"
import { getAuthUser } from "@/lib/auth";

export default async function getCidades() {
    
    const user = await getAuthUser()
    const result = await prisma.cidades.findMany()

    const cidadesFormatadas = result.map((cidade: any) => {
        return {
          id: cidade.codigo_ibge,
          value: cidade.codigo_ibge,
          label: cidade.nome_completo,
          coord: [cidade.coord[1], cidade.coord[0]] as [number, number]
        }
    })

    const pontos = await prisma.pontos.findMany()

    const apoioLista = pontos.map((apoio: any)=>{
        return {...apoio, coordenada: apoio.coordenada.split(",") as [number, number], data: apoio.data.split(',')}
    })

    const comentarios = await prisma.comentarios.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    nome: true,
                    fotoPerfil: true
                }
            }
        },
    })

    const favoritos = await prisma.favoritos.findMany({
        where: {user: user?.userId.toString()}
    })

    return (
        <Pontos cidades={cidadesFormatadas} apoioLista={apoioLista} comentarios={comentarios} favoritos={favoritos}/>
    )
}