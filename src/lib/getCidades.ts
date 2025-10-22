/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma"

export async function getCidades() {
  const result = await prisma.cidades.findMany()

  const cidadesFormatadas = result.map((cidade: any) => {
    return {
      id: cidade.codigo_ibge,
      nome: cidade.nome_completo,
      coord: [cidade.coord[1], cidade.coord[0]] as [number, number],
    }
  })

  const pontos = await prisma.pontos.findMany()

  const apoioLista = pontos.map((apoio: any) => {
    return {
      ...apoio,
      coordenada: apoio.coordenada.split(",") as [number, number],
      data: apoio.data
        .split(",")
        .filter((d: string) => {
          const [dia, mes, ano] = d.split("/").map(Number)
          const dataFormatada = new Date(ano, mes - 1, dia) // mês começa em 0 no JS
          return dataFormatada.getTime() >= Date.now()
        }),
    }
  })

  return { cidades: cidadesFormatadas, apoioLista }
}