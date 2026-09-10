"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
<<<<<<< HEAD
=======
import { AuthProvider } from "@/lib/auth";
>>>>>>> fff8ad4bd12f4c3f546c45f6bf5aa950c2b21c16
import { MensajeriaProvider } from "@/lib/mensajeria-context";
import { Topbar } from "@/components/Topbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "MiPol",
  description: "Sistema de transporte y mensajería",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
=======
 3-f-02-configuración-de-tailwind
  title: "Liceo 1° de Salto",
  description: "Plataforma del Liceo 1° de Salto.",

  title: "MiPol - Transporte",
  description: "Sistema de información de transporte urbano",
 main
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
  title: "MiPol",
  description: "Sistema de transporte y mensajería",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
>>>>>>> fff8ad4bd12f4c3f546c45f6bf5aa950c2b21c16
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MensajeriaProvider>
          <Topbar />
          <main className="flex-1">{children}</main>
        </MensajeriaProvider>
      </body>
    </html>
  );
}
