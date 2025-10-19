/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import prisma from "@/lib/prisma"
import { PontosPublic } from "@/components/pontosSemLogin"

export default async function getCidades() {
    const result = await prisma.cidades.findMany()

    const cidadesFormatadas = result.map((cidade: any) => {
        return {
          id: cidade.codigo_ibge,
          nome: cidade.nome_completo,
          coord: [cidade.coord[1], cidade.coord[0]] as [number, number]
        }
    })

    const pontos = await prisma.pontos.findMany()

    const apoioLista = pontos.map((apoio: any)=>{
        return {...apoio, coordenada: apoio.coordenada.split(",") as [number, number], data: apoio.data.split(",")}
    })

    return (
        <PontosPublic apoioLista={apoioLista} cidades={cidadesFormatadas}/>
    )
}