"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import L from "leaflet";

export default function SeletorDeCoordenadas({ onSelect, cidadeCoord, coordenadaAtual }: { onSelect: (coords: [number, number]) => void; cidadeCoord: [number, number] | undefined; coordenadaAtual: [number, number] | null}) {
  const [open, setOpen] = useState(false);
  const [coordenadas, setCoordenadas] = useState<[number, number] | null>(coordenadaAtual ? coordenadaAtual : null);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setCoordenadas([e.latlng.lat, e.latlng.lng]);
      },
    });
    return coordenadas ? <Marker position={coordenadas} icon={customIcon} /> : null;
  }
  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  

  function handleConfirm() {
    if (coordenadas) {
      onSelect(coordenadas);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="w-full">
          Selecionar localização no mapa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>Selecione o ponto no mapa:</DialogTitle>
        </DialogHeader>

        <div className="w-full h-[400px] rounded-md overflow-hidden">
          <MapContainer
            center={cidadeCoord ? cidadeCoord : [-7.115, -34.864]}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!coordenadas}
          >
            Confirmar localização
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
