'use server'
import { Pontos } from "../../components/data"

export default async function getCidades() {
    const cidades = [{id:1300, nome: 'João Pessoa - PB da borborema'}, {id:1, nome: 'Campinas'}]

    return (
        <Pontos cidades={cidades} />
    )
}