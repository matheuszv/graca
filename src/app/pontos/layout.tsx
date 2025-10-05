
import type { Metadata } from "next";
import Pontos from "./page";

export const metadata: Metadata = {
  title: "GRAÇA",
  description: "GRAÇA - Gestão de Recursos de Alimentos Cuidados e Apoio",
};

export default async function RootLayout() {

  const cidades = [{id:1300, nome: 'João Pessoa - PB da borborema'}, {id:1, nome: 'Campinas'}]

  return (
    <div className="dark bg-[url('/MaskGroup.png')] bg-no-repeat bg-center">
      <Pontos cidades={cidades}/>
    </div>
  );
}
