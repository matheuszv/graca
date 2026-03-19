/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Instagram, Tag, Home, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import MapaClient from './mapa';


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

interface SupportPointModalPublicProps {
  isOpen: boolean;
  onClose: () => void;
  pointData: PointData;
  comentarios: any[];
}

export default function SupportPointModalPublic({
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
}: SupportPointModalPublicProps) {


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
              </div>
            </div>
          </DialogHeader>

          <Separator />

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

          <div className="px-6 py-4">
          
          </div>

        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
