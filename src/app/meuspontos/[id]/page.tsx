'use server'
import NovoPontoForm from "@/components/formnovoponto";
import { getAuthUser } from "@/lib/auth";
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation";

interface cidades {
    nome: string;
    id: string;
    codigo_ibge: number;
    nome_completo: string;
    uf: string;
    estado: string;
    regiao: string;
    coord: [number, number];
    capital: boolean;
    ddd: number | null;
}

function stringParaDate(dataStr: string): Date {
  const [dia, mes, ano] = dataStr.split('/')
  return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia))
}


export default async function getCidades({ params }: { params: { id: string } }) {

    const user = await getAuthUser()
    
    if (!user) {
      redirect('/')
    }
    
    const mypoints = await prisma.pontos.findFirst({
        where: {
            AND: [
                {id: params.id},
                {criadorId: (user.userId).toString()}
            ]
        }
    })

    const result = await prisma.cidades.findMany()

    const cidades: cidades[] = result.map(cidade => ({
        ...cidade,
        coord: [cidade.coord[1], cidade.coord[0]] as [number, number]
    }));

    const cidadesFormatadas = cidades.map((cidade:cidades) => {
        return {
          id: cidade.codigo_ibge,
          nome: cidade.nome_completo
        }
    })

    const pontos = {
        ...mypoints,
        coordenada: mypoints?.coordenada.split(",").map((coord)=> parseFloat(coord)) as [number, number],
        data: mypoints?.data.split(",").map((data : string) => stringParaDate(data))  
    }

    return(
        <div>
            <NovoPontoForm fields={pontos} cidades={cidades} cidadesFormatadas={cidadesFormatadas} />
        </div>
    )
}