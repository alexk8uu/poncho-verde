import type { Metadata } from "next";
import { ArmadoVista } from "@/components/ArmadoVista";

// Vista de prueba de la animación del armado, para revisarla antes de decidir dónde va. No se enlaza ni se indexa.
export const metadata: Metadata = {
  title: "Armado · vista de prueba",
  robots: { index: false, follow: false },
};

export default function Pagina() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="romana titulo-2 mb-6">El armado, en grabado</h1>
      <ArmadoVista />
    </main>
  );
}
