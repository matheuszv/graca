/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Calendar, Building2, MapPin, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ComboboxDemo } from "./data";
import dynamic from 'next/dynamic'

// Importação dinâmica — garante que só roda no navegador
const MapaClient = dynamic(() => import('./mapa'), {
  ssr: false,
})


export function PontosPublic({ cidades, apoioLista }: { cidades: any[]; apoioLista: any[] }) {
  const [apoioList, setApoioList] = useState(apoioLista);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cidadeEscolhida, setCidadeEscolhida] = useState<number>(0);

  const tipoApoio = [
    { nome: "Alimentos", id: 1 },
    { nome: "Roupas", id: 2 },
    { nome: "Higiene", id: 3 },
  ];

  const pontosFiltrados = apoioList.filter((p: any) =>
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    p.local.toLowerCase().includes(search.toLowerCase()) ||
    p.endereco.toLowerCase().includes(search.toLowerCase())
  );

  const handleCidadeFiltro = useCallback((cidadeId: number) => {
    setApoioList(apoioLista.filter((p: { cidade: number }) => p.cidade === cidadeId));
    setCidadeEscolhida(cidadeId);
  }, [apoioLista]);

  return (
    <div className="flex-1 justify-center items-center h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 bg-[#202024] justify-center flex flex-col p-6 rounded-lg w-[500px] max-md:w-[340px] h-[590px] z-[10]">
        <div className="flex flex-col gap-3 border-b-[#E6B3B3] border-b py-2">
          <h2 className="text-xl font-bold">Encontre pontos de apoio</h2>
          <p className="text-sm text-muted-foreground">
            Escolha a cidade e busque pelo nome do local ou endereço.
          </p>
          <div className="flex justify-between">
            <ComboboxDemo cidades={cidades} handleCidadeFiltro={handleCidadeFiltro} disabled={isMapOpen} />
            <div className="relative w-[250px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-8" onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>

        <ScrollArea className="h-[450px] py-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="map-mode"
              checked={isMapOpen}
              disabled={cidadeEscolhida === 0}
              onCheckedChange={(checked) => setIsMapOpen(checked)}
            />
            <Label htmlFor="map-mode">
              Ver pontos pelo mapa{" "}
              <span className={`text-[10px] text-gray-400 font-extralight ${cidadeEscolhida === 0 ? "" : "hidden"}`}>
                (habilitado apenas com cidade filtrada)
              </span>
            </Label>
          </div>

          {isMapOpen ? (
            <MapaClient
              lista={pontosFiltrados}
              cidadeCoord={cidades.find((cidade: any) => cidade.id === cidadeEscolhida)?.coord}
            />
          ) : (
            pontosFiltrados.map((apoio: any) => (
              <Card
                className="rounded-2xl p-4 bg-card mt-2"
                key={apoio.id}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold text-primary">{apoio.nome}</h2>
                  <span className="text-sm text-muted-foreground flex gap-2">
                    <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {apoio.data[0]} • {apoio.hora}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground mb-3">
                  <p className="flex gap-2">
                    <span className="font-semibold flex gap-2">
                      <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> Local:
                    </span>{" "}
                    {apoio.local}
                  </p>
                  <p className="flex gap-2">
                    <span className="font-semibold flex gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> Endereço:
                    </span>{" "}
                    {apoio.endereco}
                  </p>
                  <p className="flex gap-2">
                    <span className="font-semibold flex gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> Cidade:
                    </span>{" "}
                    {cidades.find((cidade: any) => cidade.id === apoio.cidade)?.nome}
                  </p>
                  <p className="flex gap-2">
                    <span className="font-semibold flex gap-2">
                      <Tag className="w-4 h-4 mt-0.5 flex-shrink-0" /> Tipo de apoio:
                    </span>{" "}
                    {tipoApoio.find((tipo: any) => tipo.id === apoio.tipoApoio)?.nome}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-foreground">
                  {apoio.descricao}
                </p>
              </Card>
            ))
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

