import { getCidades } from "@/lib/getCidades"
import { PontosPublic } from "@/components/pontosSemLogin"

export const dynamic = 'force-dynamic'
export default async function Page() {
  const { cidades, apoioLista } = await getCidades()

  return (
    <div>
      <PontosPublic cidades={cidades} apoioLista={apoioLista} />
    </div>
  )
}