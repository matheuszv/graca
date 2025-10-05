/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
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

import { ScrollArea } from "@/components/ui/scroll-area"

export default function Pontos({ cidades }:{cidades:any[]}){

  const apoioLista = [
  {
    id: 0,
    nome: "APOIO A UPA DE MANGABEIRA",
    local: "UPA DE MANGABEIRA",
    endereco: "Rua João Carlos, 1587" ,
    tipoApoio: 3,
    data: '24/09/2025',
    hora: '19:00',
    cidade: 1330,
    descricao: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam, ab veniam maiores facilis, porro non magni vitae reprehenderit id odit velit sint nisi harum doloribus illum quasi fugiat enim voluptatem?",
    coordenada: [-7.119, -34.869]
  },
  {
    id: 1,
    nome: "DOAÇÃO DE SOPA",
    local: "Em frente a pagmenos",
    endereco: "Av. Josefá Taveira, 1200" ,
    tipoApoio: 2,
    data: '20/09/2025,24/09/2026',
    hora: '19:00,20:00',
    cidade: 1300,
    descricao: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam, ab veniam maiores facilis, porro non magni vitae reprehenderit id odit velit sint nisi harum doloribus illum quasi fugiat enim voluptatem?",
    coordenada: [-7.115, -34.865]
  },
  ]

  const [apoioList, setApoioList] = useState(apoioLista)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [search, setSearch] = useState('')

  const pontosFiltrados = apoioList.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    p.local.toLowerCase().includes(search.toLowerCase()) ||
    p.endereco.toLowerCase().includes(search.toLowerCase())
  )

  function handleCidadeFiltro(id: number){
    setApoioList(apoioLista.filter((p) => p.cidade == id))
    console.log(id)
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="bg-[#202024] justify-center flex flex-col p-6 rounded-lg w-[500px] max-md:w-[340px] h-[590px]">
        <div className="flex flex-col gap-3 border-b-[#E6B3B3] border-b py-2">
            <h2 className="text-xl font-bold">Encontre pontos de apoio</h2>
            <p className="text-sm text-muted-foreground">
              Escolha a cidade e busque pelo nome do local ou endereço.
            </p>
          <div className="flex justify-between">
            <ComboboxDemo cidades={cidades} handleCidadeFiltro={handleCidadeFiltro} disabled={isMapOpen} />
             <div className="relative w-[250px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-8" onChange={(e) => setSearch(e.target.value)}/>
            </div>
          </div>
        </div>

      <ScrollArea className="h-[450px] py-3">
        <div className="flex items-center space-x-2">
            <Switch id='map-mode' checked={isMapOpen} 
              onCheckedChange={(checked) => setIsMapOpen(checked)} />
            <Label htmlFor="map-mode">Ver pontos pelo mapa</Label>
          </div>
          {isMapOpen ? 
          <Mapa lista={pontosFiltrados}/> : pontosFiltrados.map((apoio) => {
            return ( 
              <Card className="rounded-2xl p-4 bg-card mt-2 cursor-pointer hover:shadow-lg hover:border hover:border-zinc-400 transition duration-400" key={apoio.id}>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold text-primary">{apoio.nome}</h2>
                  <span className="text-sm text-muted-foreground">{apoio.data[0]} • {apoio.hora[0]}</span>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground mb-3">
                  <p><span className="font-semibold">Local:</span> {apoio.local}</p>
                  <p><span className="font-semibold">Endereço:</span> {apoio.endereco}</p>
                  <p><span className="font-semibold">Cidade:</span> {apoio.cidade}</p>
                  <p><span className="font-semibold">Tipo de apoio:</span> {apoio.tipoApoio}</p>
                </div>

                <p className="text-sm leading-relaxed text-foreground">
                  {apoio.descricao}
                </p>
              </Card>
            )
          })}
    </ScrollArea>
            
        </div>
      </div>
  )
}

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { Card } from "@/components/ui/card"

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


export function Mapa({lista}:{lista:any[]}){
  return (
    <div className="flex">
      <MapContainer
        center={[-7.115, -34.864]} // João Pessoa
        zoom={13}
        style={{ height: "300px", width: "350px", margin:"10px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {lista.map(apoio => {
          return(
            <Marker key={apoio.coordenada[0]} position={apoio.coordenada} icon={customIcon}>
              <Popup>{apoio.nome}</Popup>
            </Marker>
          )
        })}
        
      </MapContainer>
    </div>
  )
}

type ComboboxDemoProps = {
  cidades: any[]; 
  disabled: boolean;
  handleCidadeFiltro: (cidade: number) => void; // Ajuste o tipo conforme o que você espera para a função
};



export function ComboboxDemo({
  cidades,
  disabled,
  handleCidadeFiltro,
}: ComboboxDemoProps){
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
      <PopoverContent className="w-[18 0px] p-0">
        <Command>
          <CommandInput placeholder="Buscar cidade" className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
            <CommandGroup>
              {cidades.map((cidade) => (
                <CommandItem
                  key={cidade.id}
                  value={cidade.id}
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
}