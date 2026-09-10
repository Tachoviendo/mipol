import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth";
import { MensajeriaProvider } from "@/lib/mensajeria-context";
import { AuthProvider } from "@/lib/auth";
import { Topbar } from "@/components/Topbar";
import "./globals.css";
import { Topbar } from "@/components/Topbar";
import { MensajesProvider } from "@/contexts/MensajesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mipol",
  description: "Plataforma educativa del Liceo 1° de Salto",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MensajesProvider>
          <Topbar />
          {children}
        </MensajesProvider>
      </body>
    </html>
  );
}