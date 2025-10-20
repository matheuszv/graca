'use server'
import NovoPontoForm from "@/components/formnovoponto"
import prisma from "@/lib/prisma"

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
    label: string;
    value: number;
}

export default async function getCidades() {
    const result = await prisma.cidades.findMany()

    const cidades: cidades[] = result.map(cidade => ({
        ...cidade,
        coord: [cidade.coord[1], cidade.coord[0]] as [number, number],
        value: cidade.codigo_ibge,
        label: cidade.nome_completo,

    }));

    return (
        <NovoPontoForm cidades={cidades}  fields={null}/>
    )
}