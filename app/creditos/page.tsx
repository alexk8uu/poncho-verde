import type { Metadata } from "next";
import PaginaSimple from "@/components/PaginaSimple";
import { creditos } from "@/content/fotos";

/* La lista de créditos de las fotografías temporales (Wikimedia Commons), en su propia página:
   el pie de la landing lleva una sola línea que trae hasta acá. */

export const metadata: Metadata = {
  title: "Créditos de las fotografías: Poncho Verde",
  description: "Autores, licencias y fuentes de las fotografías que usa el sitio de Poncho Verde.",
  robots: { index: false },
};

export default function Creditos() {
  return (
    <PaginaSimple
      titulo="Créditos de las fotografías"
      bajada="Las fotografías del sitio vienen de Wikimedia Commons, con licencias libres. Estos son sus autores y licencias."
    >
      <ul className="border-t border-bosque/20">
        {creditos.map((c) => (
          <li key={c.pagina} className="grid gap-1 border-b border-bosque/20 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
            <span>
              <a href={c.pagina}>{c.titulo}</a>
              <span className="block text-[14px] text-tinta-suave">{c.autor}</span>
            </span>
            <a href={c.licenciaUrl} className="etiqueta self-center">
              {c.licencia}
            </a>
          </li>
        ))}
      </ul>
    </PaginaSimple>
  );
}
