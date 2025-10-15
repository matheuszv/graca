'use client'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MapPin, Building2, Tag, Pencil, Calendar, Trash2 } from 'lucide-react'
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

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
}

export default function ScrollableCardsList({
  pontosFiltrados = []
}: ScrollableCardsListProps) {

  const router = useRouter()
  // Dados de exemplo para demonstração
  const pontosExemplo: Ponto[] = [
    {
      id: '1235122',
      criadorId: '68e846583d5cfe9c2a8fc61c',
      nome: "Ponto de Distribuição de Alimentos",
      data: ["16/10/2025", "111"],
      coordenada: [123,123],
      hora: "09:00",
      local: "Galpão Central",
      endereco: "Av. Principal, 456",
      cidade: 1,
      instagram: '@insta',
      contato: '',
      status: true,
      tipoApoio: 2,
      descricao: "Distribuição de cestas básicas e alimentos não perecíveis para famílias cadastradas. Trazer documento de identificação.",
    },
    {
      id: '1233122',
      criadorId: '68e846583d5cfe9c2a8fc61c',
      nome: "Ponto de Distribuição de Alimentos",
      data: ["16/10/2025", "111"],
      coordenada: [123,123],
      hora: "09:00",
      local: "Galpão Central",
      endereco: "Av. Principal, 456",
      cidade: 1,
      instagram: '@insta',
      contato: '',
      status: true,
      tipoApoio: 2,
      descricao: "Distribuição de cestas básicas e alimentos não perecíveis para famílias cadastradas. Trazer documento de identificação.",
    },
    {
      id: '1231222',
      criadorId: '68e846583d5cfe9c2a8fc61c',
      nome: "Ponto de Distribuição de Alimentos",
      data: ["16/10/2025", "111"],
      coordenada: [123,123],
      hora: "09:00",
      local: "Galpão Central",
      endereco: "Av. Principal, 456",
      cidade: 1,
      instagram: '@insta',
      contato: '',
      status: true,
      tipoApoio: 2,
      descricao: "Distribuição de cestas básicas e alimentos não perecíveis para famílias cadastradas. Trazer documento de identificação.",
    },
  ]

  const tipoApoioExemplo: TipoApoio[] = [
    { id: 1, nome: "Apoio Psicológico" },
    { id: 2, nome: "Doação de Alimentos" },
    { id: 3, nome: "Atendimento Médico" }
  ]
    const handleDelete = (id: string) => {
        console.log("Deletando item com ID:", id);
        // aqui você faz o fetch/axios para deletar no backend
    };
  const pontos = pontosFiltrados.length > 0 ? pontosFiltrados : pontosExemplo
  const tiposList = tipoApoioExemplo

  return ( 
  
  <div className="flex-1 justify-center items-center">
      <div className="border-border bg-[#202024] max-md:gap-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 justify-center flex items-center flex-col px-4 py-8 rounded-lg h-[580px] w-[400px] max-md:w-[350px] z-[10] max-md:p-2">
        <span className='text-lg font-bold text-left py-3'>Meus pontos</span>
        
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
                                <Button onClick={()=>router.push(`/meuspontos/${apoio.id}`)} variant='ghost' className='cursor-pointer'><Pencil className="text-white hover:text-zinc-400" size={16} /></Button>
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
                        <span className="font-semibold">Cidade:</span> {apoio.cidade}
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

