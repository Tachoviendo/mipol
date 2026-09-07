"use client";

import dynamic from "next/dynamic";
import type { Linea } from "@/data/transporte";

const MapaLinea = dynamic(
  () => import("@/components/MapaLinea").then((mod) => mod.MapaLinea),
  { ssr: false }
);

export function MapaLineaWrapper({ linea }: { linea: Linea }) {
  return <MapaLinea linea={linea} />;
}
