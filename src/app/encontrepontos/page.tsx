
export const dynamic = 'force-dynamic'
import { getCidades } from "@/lib/getCidades"
import { PontosPublic } from "@/components/pontosSemLogin"

export default async function Page() {
  const { cidades, apoioLista } = await getCidades()

  return (
    <div>
      <PontosPublic cidades={cidades} apoioLista={apoioLista} />
    </div>
  )
}