/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { memo, useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Select, ConfigProvider, theme } from "antd"

import { ScrollArea } from "@/components/ui/scroll-area"
import dynamic from "next/dynamic";

const Mapa = dynamic(() => import("./mapa"), {
  ssr: false, // 👈 ESSENCIAL
});

export function Pontos({ cidades, apoioLista, comentarios, favoritos }:{cidades:any[]; apoioLista: any; comentarios: any[]; favoritos: any []}){

  const [apoioList, setApoioList] = useState(apoioLista)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [cidadeEscolhida, setCidadeEscolhida] = useState(0)
  
  const fimDoDia = new Date()
  fimDoDia.setHours(0, 0, 0, 0)


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState({
      id: '0',
      name: '',
      data: '',
      local: '',
      endereco: '',
      cidade: '',
      contato: '',
      tipoApoio: '',
      descricao: '',
      coordenada: [0.232, -0.12312] as [number, number],
      favorito: false
    });

  function handleCloseModal(){
    setIsModalOpen(false)
    setSelectedPoint({
      id: '0',
      name: '',
      data: '',
      local: '',
      endereco: '',
      cidade: '',
      contato: '',
      tipoApoio: '',
      descricao: '',
      coordenada: [0,0],
      favorito: false
    })
  }

  const handleOpenModal = (point: any) => {
    setSelectedPoint({
      id: point.id,
      name: point.name,
      data: point.data,
      local: point.local,
      endereco: point.endereco,
      cidade: point.cidade,
      contato: point.contato,
      tipoApoio: point.tipoApoio,
      descricao: point.descricao,
      coordenada: point.coordenada,
      favorito: point.favorito
    });
    setIsModalOpen(true);
  };



  const tipoApoio = [
    {nome: 'Alimentos', id: 1},
    {nome: 'Roupas', id: 2},
    {nome: 'Higiene', id: 3},
  ]

  const pontosFiltrados = apoioList.filter((p: any) =>
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    p.local.toLowerCase().includes(search.toLowerCase()) ||
    p.endereco.toLowerCase().includes(search.toLowerCase())
  )

  const handleCidadeFiltro = useCallback((cidadeId: number) => {

    setApoioList(apoioLista.filter((p: { cidade: number }) => p.cidade == cidadeId))
    setCidadeEscolhida(cidadeId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex-1 justify-center items-center h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 bg-[#202024] justify-center flex flex-col p-6 rounded-lg w-[500px] max-md:w-[340px] h-[590px] z-[10]">
        <div className="flex flex-col gap-3 border-b-[#E6B3B3] border-b py-2">
            <h2 className="text-xl font-bold">Encontre pontos de apoio</h2>
            <p className="text-sm text-muted-foreground">
              Escolha a cidade e busque pelo nome do local ou endereço.
            </p>
          <div className="flex justify-between">
            <ConfigProvider
              theme={{
                algorithm:  theme.darkAlgorithm, // OU: theme.darkAlgorithm
                token: {
                  colorPrimary: '#b7e3fa',
                },
              }}
            >
            <Select
              showSearch
              onChange={(e) => handleCidadeFiltro(e)}
              placeholder="Selecione a cidade"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              className="w-[120px]"
              value={cidades[cidadeEscolhida]}
              disabled={isMapOpen}
              options={cidades}
            />
            </ConfigProvider>

             <div className="relative w-[250px] bg-[#0a0a0a] rounded-lg">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-8 " onChange={(e) => setSearch(e.target.value)}/>
            </div>
          </div>
        </div>

      <ScrollArea className="h-[450px] py-3">
        <div className="flex items-center space-x-2">
            <Switch id='map-mode' checked={isMapOpen} disabled={cidadeEscolhida==0}
              onCheckedChange={(checked) => setIsMapOpen(checked)} />
            <Label htmlFor="map-mode">Ver pontos pelo mapa <span className={`text-[10px] text-gray-400 font-extralight ${cidadeEscolhida==0 ? '' : 'hidden'} `}>(habilitado apenas com cidade filtrada)</span></Label>
          </div>
          {isMapOpen ? 
          <Mapa
            lista={pontosFiltrados}
            cidadeCoord={cidades.find((cidade: any) => cidade.id == cidadeEscolhida).coord}
          /> : pontosFiltrados.map((apoio: any) => {
            return ( 
              <Card  onClick={() => handleOpenModal({
                  id: apoio.id,
                  name: apoio.nome,
                  data: `${apoio.data.join(", ")} • ${apoio.hora}`,
                  local: apoio.local,
                  endereco: apoio.endereco,
                  cidade: cidades.find((cidade: any) => cidade.id == apoio.cidade).nome,
                  tipoApoio: tipoApoio.find((tipo: any)=> tipo.id == apoio.tipoApoio)?.nome,
                  contato: apoio.contato,
                  descricao: apoio.descricao,
                  coordenada: apoio.coordenada,
                  favorito: favoritos.some((point:any)=>point.idPonto == apoio.id)
                })} className="rounded-2xl p-4 bg-card mt-2 cursor-pointer hover:shadow-lg hover:border hover:border-zinc-400 transition duration-400" key={apoio.id}>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold text-primary">{apoio.nome}</h2>
                  <span className="text-sm text-muted-foreground flex gap-2">
                    <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {apoio.data.filter((d: string) => {
                      const [dia, mes, ano] = d.split("/").map(Number)
                      const dataFormatada = new Date(ano, mes - 1, dia) 
                      return dataFormatada.getTime() >= fimDoDia.getTime()
                    })[0] ?? 'Em breve' } • {apoio.hora}</span>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground mb-3">
                  <p className="flex gap-2"><span className="font-semibold flex gap-2"><Building2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> Local:</span> {apoio.local}</p>
                  <p className="flex gap-2"><span className="font-semibold flex gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> Endereço:</span> {apoio.endereco}</p>
                  <p className="flex gap-2"><span className="font-semibold flex gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />Cidade:</span> {cidades.find((cidade: any) => cidade.id == apoio.cidade).nome}</p>
                  <p className="flex gap-2"><span className="font-semibold flex gap-2"><Tag className="w-4 h-4 mt-0.5 flex-shrink-0" />Tipo de apoio:</span> {tipoApoio.find((tipo: any)=> tipo.id == apoio.tipoApoio)?.nome}</p>
                </div>

                <p className="text-sm leading-relaxed text-foreground">
                  {apoio.descricao}
                </p>
              </Card>
            )
          })}
    </ScrollArea>
            
        </div>
        {selectedPoint.id!='0' && (
          <SupportPointModal
            isOpen={isModalOpen}
            onClose={()=>handleCloseModal()}
            pointData={selectedPoint}
            comentarios={comentarios.filter((comentario: any) => comentario.pontoId == selectedPoint.id)}
          />
        )}
      </div>
  )
}

import { Building2, Calendar, Check, ChevronsUpDown, MapPin, Search, Tag } from "lucide-react"
import { Card } from "@/components/ui/card"
import SupportPointModal from "./modalPontos"

type ComboboxDemoProps = {
  cidades: any[]; 
  disabled: boolean;
  handleCidadeFiltro: (cidade: number) => void; // Ajuste o tipo conforme o que você espera para a função
};

export const ComboboxDemo = memo(function ComboboxDemo({
  cidades,
  disabled,
  handleCidadeFiltro,
}: ComboboxDemoProps) {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<number>()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between max-md:text-[10px] max-md:w-[120px] max-w-[185px] truncate"
        >
          {id
            ? cidades.find((cidade) => cidade.id === id)?.nome
            : "Escolha a cidade"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandInput placeholder="Buscar cidade" className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
            <CommandGroup>
              {cidades.map((cidade) => (
                <CommandItem
                  key={cidade.id}
                  value={cidade.nome}
                  onSelect={() => {
                    setId(cidade.id)
                    setOpen(false)
                    handleCidadeFiltro(cidade.id)
                  }}
                >
                  {cidade.nome}
                  <Check
                    className={cn(
                      "ml-auto",
                      id === cidade.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
})