/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MapPin, Building2, Tag, Calendar, Star } from 'lucide-react'
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface TipoApoio {
  id: number
  nome: string
}

interface ScrollableCardsListProps {
  pontosFiltrados: any
  cidades: any
}

export default function MeusFavoritos({
  pontosFiltrados = [],
  cidades
}: ScrollableCardsListProps) {

  const router = useRouter()

  const tipoApoioExemplo: TipoApoio[] = [
    { id: 1, nome: "Apoio Psicológico" },
    { id: 2, nome: "Doação de Alimentos" },
    { id: 3, nome: "Atendimento Médico" }
  ]

  const handleRemoveFavorite = async (id: string) => {
    const result = await fetch('/api/favoritos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    if (result.ok) {
      alert('REMOVIDO DOS FAVORITOS')
      router.refresh()
    }
  };

  const pontos = pontosFiltrados
  const tiposList = tipoApoioExemplo

  return ( 
    <div className="flex-1 justify-center items-center">
      <div className="border-border bg-[#202024] max-md:gap-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 justify-center flex items-center flex-col px-4 py-8 rounded-lg h-[580px] w-[400px] max-md:w-[350px] z-[10] max-md:p-2">
        <span className='text-lg font-bold text-left py-3'>Meus favoritos</span>
        
        <ScrollArea className="h-[470px] w-[340px] p-3">
          <div className="space-y-2">
            {pontos.map((apoio: any) => {
              const tipo = tiposList.find((t) => t.id === apoio.tipoApoio)

              return (
                <Card 
                  className="rounded-2xl p-3 bg-card hover:shadow-lg overflow-x-hidden" 
                  key={apoio.id}
                >
                  <div className="flex justify-between items-bottom mb-3">
                    <h2 className="text-lg font-bold text-primary">{apoio.nome}</h2>
                    <div className="flex justify-between items-center gap-0.5 text-sm text-musted-foreground whitespace-nowrap">
                      <ModalRemoveFavorite 
                        id={apoio.id} 
                        nome={apoio.nome} 
                        onConfirm={handleRemoveFavorite}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground mb-3">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <span>{apoio.data?.split(",")[0]} • {apoio.hora}</span>
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
                        <span className="font-semibold">Cidade:</span> {cidades.find((cidade: { id: number; }) => apoio.cidade == cidade.id)?.nome}
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
                <p>Nenhum favorito encontrado</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

interface ModalRemoveFavoriteProps {
  id: string;
  nome: string;
  onConfirm: (id: string) => void;
}

export function ModalRemoveFavorite({ id, nome, onConfirm }: ModalRemoveFavoriteProps) {
  const [open, setOpen] = useState(false);

  const handleRemove = () => {
    onConfirm(id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 cursor-pointer">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Remover dos favoritos</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja remover <strong>{nome}</strong> dos seus favoritos?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className='cursor-pointer' onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="default" className='cursor-pointer' onClick={handleRemove}>
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}