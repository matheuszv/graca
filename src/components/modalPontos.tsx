/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { MapPin, Instagram, Tag, Home, Calendar, Send, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from './ui/textarea';
import MapaClient from './mapa';
import { toast } from 'sonner';


type PointData = {
  id: string,
  name: string;
  data: string;
  local: string;
  endereco: string;
  cidade: string;
  tipoApoio: string;
  descricao: string;
  contato: string;
  instagram: string;
  coordenada: [number, number],
  favorito: boolean
};

interface SupportPointModalProps {
  isOpen: boolean;
  onClose: () => void; // Espera uma função sem retorno que vai fechar o modal
  pointData: PointData;
  comentarios: any;
}

export default function SupportPointModal({
  isOpen,
  onClose,
  pointData = {
    id: '',
    name: '',
    data: '',
    local: '',
    endereco: '',
    cidade: '',
    tipoApoio: '',
    contato: '',
    descricao: '',
    instagram: '',
    coordenada: [0.232,0.2323],
    favorito: false
  },
  comentarios
}: SupportPointModalProps) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(comentarios);
  const [isFavorito, setIsFavorito] = useState(pointData.favorito)

  const handleComment = (text: string) => {
    if(text.length<140) setNewComment(text)
  }

  const handleFavorito = async () =>{
    const result = await fetch('/api/favorito',{
      method: isFavorito ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({idPonto: pointData.id, })
    })

    if(result.ok){
      if(!isFavorito) toast.success("Ponto favoritado com sucesso!")
        else toast.warning("Ponto removido do favorito!")
      
      setIsFavorito(!isFavorito)
    } else {
      toast.error('Erro')
    }
  }

  const handleSubmitComment = async () => {
    if (newComment.trim()) {
      const comment = {
        comentario: newComment,
        pontoId: pointData.id
      };

    const result = await fetch('/api/comentar',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    })

    const comentario = await result.json()

    if(result.ok){
      toast.success("Comentário enviado!")
      setComments([...comments,comentario])
      
      setNewComment('');
    } else {
      toast.error(comentario.message || 'Erro ao enviar comentário')
    }

    }
  };

  const handleKeyPress = (e: { key: string; shiftKey: any; preventDefault: () => void; }) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl">{pointData.name}</DialogTitle>
            <div className="flex items-center justify-between text-muted-foreground text-sm mt-2">
              <div className='flex gap-2 items-center'>
                <Calendar className="w-4 h-4 mr-2" />
                <span>{pointData.data}</span>
              </div>
              <div className='flex gap-2 items-center'>
                <span>Favorito:</span>
                <Button variant='ghost' className={`cursor-pointer w-6 h-6 items-center justify-center `} onClick={()=>handleFavorito()}>
                  <Star className={`w-4 h-4 cursor-pointer ${isFavorito ? 'text-yellow-400 fill-yellow-400': ''}`} />
                </Button>
                </div>
            </div>
          </DialogHeader>

          <Separator />

          {/* Informações do Ponto */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Local</p>
                  <p className="text-sm font-medium">{pointData.local}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Endereço</p>
                  <p className="text-sm font-medium">{pointData.endereco}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Cidade</p>
                  <p className="text-sm font-medium">{pointData.cidade}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Tipo de apoio</p>
                  <p className="text-sm font-medium">{pointData.tipoApoio}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Instagram</p>
                  <p className="text-sm font-medium">{pointData.instagram}</p>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Descrição</p>
              <p className="text-sm">{pointData.descricao}</p>
            </div>
            
            <Separator className="my-4" />

            <MapaClient lista={[pointData]} cidadeCoord={pointData.coordenada} />
          </div>

          <Separator />

          {/* Lista de Comentários */}
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold mb-4">
              Comentários ({comments.length})
            </h3>
            
            <div className="space-y-4">
              {comments.map((comment: any) => (
                <Card className='p-4' key={comment.id}>
                  <CardContent className="p-2">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {comment.user?.fotoPerfil=='' ? getInitials(comment?.user.nome) : <img src={comment.user?.fotoPerfil} alt='' />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1 w-[300px]">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm">{comment?.user.nome}</span>
                          <span className="text-xs text-muted-foreground">{comment?.data}</span>
                        </div>
                          <p className="text-sm text-muted-foreground w-[300px] break-words">{comment.comentario}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Campo de Comentário */}
          <div className="p-6 pt-4">
            <div className="flex gap-2">
              <Textarea
                value={newComment}
                onChange={(e) => handleComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Adicione um comentário..."
                className="flex-1"
              />
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}