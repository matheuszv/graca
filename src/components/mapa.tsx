/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then(mod => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then(mod => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then(mod => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then(mod => mod.Popup),
  { ssr: false }
);

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapaClient({
  lista,
  cidadeCoord,
}: {
  lista: any[];
  cidadeCoord: [number, number];
}) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
      iconUrl: "/leaflet/images/marker-icon.png",
      shadowUrl: "/leaflet/images/marker-shadow.png",
    });
  }, []);

  return (
    <div className="flex">
      <MapContainer
        center={cidadeCoord}
        zoom={13}
        style={{ height: "300px", width: "350px", margin: "10px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {lista.map((apoio) => (
          <Marker
            key={apoio.coordenada[0]}
            position={apoio.coordenada}
            icon={customIcon}
          >
          <Popup>
            <div className="rounded-lg p-1 space-y-1">
              <h3 className="text-lg font-semibold text-blue-600">
                {apoio.nome}
              </h3>
              <p className="text-sm text-gray-700">
                📍 {apoio.local}<br />
                🏠 {apoio.endereco}
              </p>
            </div>
          </Popup>

          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
