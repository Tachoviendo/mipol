"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import type { Linea } from "@/data/transporte";

function createIcon(color: string, orden: number) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:28px;height:28px;border-radius:50%;
      background:${color};color:#fff;
      display:flex;align-items:center;justify-content:center;
      font-size:12px;font-weight:600;
      border:2px solid #fff;
      box-shadow:0 1px 4px rgba(0,0,0,.3);
    ">${orden}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function FitBounds({ paradas }: { paradas: { latitud: number; longitud: number }[] }) {
  const map = useMap();
  useEffect(() => {
    if (paradas.length === 0) return;
    if (paradas.length === 1) {
      map.setView([paradas[0].latitud, paradas[0].longitud], 15);
      return;
    }
    const bounds = L.latLngBounds(
      paradas.map((p) => [p.latitud, p.longitud] as [number, number])
    );
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, paradas]);
  return null;
}

export function MapaLinea({ linea }: { linea: Linea }) {
  const paradasOrdenadas = [...linea.paradas].sort((a, b) => a.orden - b.orden);
  const coords = paradasOrdenadas.map((p) => [p.latitud, p.longitud] as [number, number]);

  const center: [number, number] = coords.length > 0
    ? coords[0]
    : [-31.3833, -57.9667];

  return (
    <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/20" style={{ height: 360 }}>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds paradas={paradasOrdenadas} />
        {paradasOrdenadas.map((parada) => (
          <Marker
            key={parada.id}
            position={[parada.latitud, parada.longitud]}
            icon={createIcon(linea.color, parada.orden)}
          >
            <Popup>
              <div style={{ fontSize: 13 }}>
                <strong>{parada.nombre}</strong>
                <br />
                {parada.direccion}
              </div>
            </Popup>
          </Marker>
        ))}
        {coords.length > 1 && (
          <Polyline
            positions={coords}
            pathOptions={{ color: linea.color, weight: 4, opacity: 0.8 }}
          />
        )}
      </MapContainer>
    </div>
  );
}
