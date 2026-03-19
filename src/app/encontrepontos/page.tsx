/* eslint-disable @typescript-eslint/no-explicit-any */

export const dynamic = 'force-dynamic'
import { PontosPublic } from "@/components/pontosSemLogin"
import prisma from "@/lib/prisma"

export default async function Page() {
  
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

  return (
    <div>
      <PontosPublic cidades={cidadesFormatadas} apoioLista={apoioLista} />
    </div>
  )
}