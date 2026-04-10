/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MapPin, Building2, Tag, Pencil, Calendar, Trash2 } from 'lucide-react'
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Ponto {
    tipoApoio: number
    id: string
    nome: string
    data: string[],
    hora: string
    local: string
    endereco: string
    cidade: number
    descricao: string
    status: boolean
    criadorId: string
    coordenada: [number, number]
    contato: string
    instagram: string
}


interface TipoApoio {
  id: number
  nome: string
}

interface ScrollableCardsListProps {
  pontosFiltrados: Ponto[]
  cidades: any
}

export default function ScrollableCardsList({
  pontosFiltrados = [],
  cidades
}: ScrollableCardsListProps) {

  const router = useRouter()

  const tipoApoioExemplo: TipoApoio[] = [
    { id: 1, nome: "Alimentos" },
    { id: 2, nome: "Roupas" },
    { id: 3, nome: "Higiene" }
  ]
    const handleDelete = async (id: string) => {
      const result = await fetch('/api/novoponto',{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
      })
      if(result.ok){
        toast.success('Ponto removido!')
        router.refresh()
      } else {
        toast.error("Erro ao remover o ponto!")
      }
    };
  const pontos = pontosFiltrados
  const tiposList = tipoApoioExemplo

  return ( 
  
  <div className="flex-1 justify-center items-center">
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">

          {/* TRIÂNGULOS VIVOS E SOLTOS (Onde a arte acontece) */}
          <svg className="absolute top-0 right-0 w-1/2 h-full opacity-20" viewBox="0 0 400 800" fill="none">
            {/* Triângulo Turquesa */}
            <path d="M450 100L250 350L550 400Z" fill="#2dd4bf" />
            {/* Triângulo Amarelo */}
            <path d="M300 500L100 700L400 750Z" fill="#facc15" />
            {/* Triângulo Azul */}
            <path d="M500 600L350 780L600 850Z" fill="#3b82f6" />
          </svg>
        </div>
      <div className="text-gray-800 max-md:gap-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 justify-center flex items-center flex-col px-4 py-8 rounded-lg h-[580px] w-[400px] max-md:w-[350px] z-[10] max-md:p-2 border border-[#ebebeb] bg-[#fcfcfc]">
        <span className='text-lg font-bold text-left py-3 text-gray-900'>Meus pontos</span>
        
        <ScrollArea className="h-[470px] w-[340px] p-3">
            <div className="space-y-2">
            {pontos.map((apoio) => {
                const tipo = tiposList.find((t) => t.id === apoio.tipoApoio)

                return (
                <Card 
                    className="rounded-2xl p-3 bg-card hover:shadow-lg overflow-x-hidden" 
                    key={apoio.id}
                >
                    <div className="flex justify-between items-bottom mb-3">
                            <h2 className="text-lg font-bold text-primary">{apoio.nome}</h2>
                            <div className="flex justify-between items-center gap-0.5 text-sm text-musted-foreground whitespace-nowrap">
                                <Button onClick={()=>router.push(`/meuspontos/${apoio.id}`)} variant='ghost' className='cursor-pointer'><Pencil className="text-gray-800 hover:text-zinc-400" size={16} /></Button>
                                <ModalDelete id={apoio.id} nome={apoio.nome} onConfirm={handleDelete}/>
                            </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground mb-3">
                    <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                        <span>{apoio.data[0]} • {apoio.hora}</span>
                        </div>
                    </div>
                        
                    <div className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                        <span className="font-semibold">Local:</span> {apoio.local}
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                        <span className="font-semibold">Endereço:</span> {apoio.endereco}
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                        <span className="font-semibold">Cidade:</span> {cidades.find((cidade: { id: number; }) => apoio.cidade == cidade.id).nome}
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Tag className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                        <span className="font-semibold">Tipo de apoio:</span> {tipo?.nome || 'N/A'}
                        </div>
                    </div>
                    </div>
                </Card>
                )
            })}

            {pontos.length === 0 && (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                <p>Nenhum ponto de apoio encontrado</p>
                </div>
            )}
            </div>
        </ScrollArea>
        </div>
    </div>
  )
}

interface ModalDeleteProps {
  id: string;
  nome: string;
  onConfirm: (id: string) => void;
}

export function ModalDelete({ id, nome, onConfirm }: ModalDeleteProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onConfirm(id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 cursor-pointer">
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir <strong>{nome}</strong>? Essa ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className='cursor-pointer' onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" className='cursor-pointer' onClick={handleDelete}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

