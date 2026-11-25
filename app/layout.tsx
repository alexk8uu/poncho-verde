import type { Metadata, Viewport } from "next";
import { Archivo, Pinyon_Script } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { meta } from "@/content/sitio";

/*
 * Tipografías del brief (sección 6), tomadas de la referencia: una grotesca ancha y liviana para titulares y
 * texto (Archivo con su eje de ancho) y una caligráfica como acento (Pinyon Script).
 */
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-pinyon", display: "swap" });

export const metadata: Metadata = {
  title: meta.titulo,
  description: meta.descripcion,
  openGraph: {
    type: "website",
    title: meta.titulo,
    description: "Asesoramiento REPROCANN, acompañamiento, talleres y comunidad en Salta Capital.",
    images: ["/share.jpg"],
    locale: "es_AR",
  },
  twitter: { card: "summary_large_image" },
  // canonical: falta el dominio de la fundación (se agrega con alternates.canonical cuando exista)
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1f3d2b",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${archivo.variable} ${pinyon.variable}`}>
      <body>
        <a
          href="#contenido"
          className="etiqueta sr-only rounded-full bg-crema px-4 py-3 text-bosque focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60]"
        >
          Ir al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
