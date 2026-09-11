import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth";
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
  title: "MiPol",
  description:
    "Plataforma del Liceo 1° de Salto: transporte, mensajería, calendario y foros.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <MensajeriaProvider>
            <Topbar />
            <main className="flex-1">{children}</main>
          </MensajeriaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}