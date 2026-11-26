# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + Tailwind CSS, componentes en React (fijado en `brief/BRIEF.md` §0). Deploy en **Vercel**. El formulario de asociación se envía con una server action de Next.js detrás de un adaptador intercambiable: por defecto, email; preparado para conectar Supabase o un webhook de n8n. Todavía no se eligió el proveedor de email.

## Users

Personas adultas (+18) del norte argentino, sobre todo de Salta Capital, que llegan mayormente desde el celular a través de Instagram y WhatsApp (`docs/GUIA.MD`). El trabajo de todas es el mismo: entender qué es Poncho Verde, confiar en la fundación y completar el formulario de asociación.

- **Pacientes medicinales** que buscan acompañamiento y orientación sobre REPROCANN.
- **Personas adultas que quieren asociarse.**
- **Curiosos y primerizos** que necesitan información básica y confianza antes de dar un paso.
- **Jóvenes adultos (+18)**, a quienes se les habla con una estética actual.

## Product Purpose

Poncho Verde — Fundación de Cannabis Medicinal es una fundación/ONG con sede física en Salta Capital, activa desde 2026. Acompaña a pacientes y personas adultas en el uso responsable del cannabis medicinal con información seria, comunidad y raíces en el norte argentino (misión: *validar* con la fundación). Su idea central es tratar el cannabis *más allá del estigma*, desde la salud, la comunidad y la información.

La landing existe para convertir visitas en solicitudes de asociación. El éxito es que quien llega se sienta ante una institución seria que no resulta clínica y complete el formulario.

## Positioning

Es una fundación salteña con sede propia que combina orientación sobre REPROCANN, cultivo solidario habilitado para pacientes vinculados y una comunidad presencial (talleres y encuentros en la sede), con identidad del norte argentino. Una agrupación genérica, una tienda o un sitio informativo no pueden afirmar esa combinación de sede física en Salta, habilitación y acompañamiento cara a cara.

## Operating Context

- **Recorrido principal:** la persona entra a la landing desde un link de Instagram o WhatsApp, se informa, completa el formulario de asociación y recibe en pantalla el mensaje "Recibimos tu solicitud. Te vamos a contactar por WhatsApp o email en los próximos días." Después, la fundación la contacta por WhatsApp o email.
- **Marco legal:** Ley 27.350 (cannabis medicinal) y REPROCANN, el registro del Ministerio de Salud de la Nación que habilita a pacientes con indicación médica a acceder al cannabis. Los datos personales del formulario se rigen por la Ley 25.326.
- **Sede:** 25 de Mayo 880, Salta Capital. Allí se hacen los encuentros de comunidad y los talleres.

## Capabilities and Constraints

**Servicios** (*validar antes de publicar*; detalle en `brief/BRIEF.md` §4):
- Asesoramiento REPROCANN (pacientes)
- Acompañamiento con seguimiento y contacto con profesionales (pacientes y socios)
- Talleres y educación sobre cultivo, uso medicinal y marco legal (socios y curiosos)
- Comunidad: espacio de encuentro en la sede (socios)

**Cultivo solidario:** la fundación está habilitada para cultivar para pacientes vinculados (confirmado en init). La web puede mencionarlo como dato institucional y con cuidado, nunca como oferta, venta ni acceso directo a producto. El brief no incluye número de inscripción ni el alcance exacto de la habilitación, así que no deben inventarse. La redacción final la valida la fundación.

**Edad:** la landing es pública y no tiene verificación de edad al entrar. Asociarse es solo para mayores de 18, y el formulario incluye una declaración de mayoría de edad.

**Formulario de asociación:**
- Pide nombre y apellido, email y teléfono/WhatsApp. Todos los campos son obligatorios y se validan.
- Incluye un checkbox de consentimiento con una línea sobre el uso de los datos (Ley 25.326) y la declaración de +18.
- El envío usa una server action con un adaptador intercambiable (ver Stack).

**Contenido editable:** misión, servicios, respuestas del FAQ y lemas del marquee son copy base marcado *(validar)*. Deben quedar fáciles de editar. Instagram, WhatsApp y email van como placeholders en un archivo de configuración.

**Decisiones abiertas:**
- Respuesta del FAQ "¿Necesito REPROCANN para asociarme?": la define la fundación.
- Respuesta del FAQ "¿Tiene costo asociarse?": la define la fundación.
- Proveedor de email para el adaptador por defecto.
- Usuarios reales de redes y contacto.
- Redacción pública sobre el cultivo solidario.
- Fotos propias: hasta tenerlas, se usan bancos libres con licencia comercial.

## Brand Commitments

- **Nombre:** Poncho Verde — Fundación de Cannabis Medicinal.
- **Voz:** cercana, clara y sin jerga, en español rioplatense con voseo ("Asociate", "Te orientamos"). Tiene que transmitir confianza, calidez y orgullo local. Seria, pero no clínica.
- **Logo** (`brief/refs/logo.jpeg`): ilustración circular con un gaucho de poncho verde, cerros salteños al atardecer, una flor violeta, un cardón y el sol de mayo. La ilustración completa se usa solo en tamaño grande (hero o cierre del footer). Para sellos, badges, marquee y favicon se usa un emblema simplificado a 1 color: la silueta del sombrero en verde bosque, en SVG. Ese emblema todavía no existe y hay que diseñarlo.
- **Identidad del logo en la web** (pedido del cliente del 2026-11-26 sobre `brief/refs/ref-logo.jpeg`): el cliente prefiere la versión nueva del logo y quiere que la web se parezca más a él.
  - **Tipografía:** el nombre y los títulos de sección van en la romana del logo nuevo, versalitas tipo Cinzel. Reemplaza a la grotesca del brief §6 en esos lugares; el texto, las etiquetas y los botones siguen en la grotesca.
  - **Franja del logo:** línea · barra bordó · sol de mayo · barra celeste · línea. Es un motivo de marca que el cliente pidió usar más.
  - **Logo nuevo:** falta el archivo limpio. `ref-logo.jpeg` tiene anotaciones encima, así que todavía no sirve como asset.
- **Paleta tomada del logo** (fijada en `brief/BRIEF.md` §5): verde bosque `#1F3D2B`, crema `#F6F1E4`, bordó `#8E2A35`, naranja atardecer `#E2622A`, violeta `#8A5FA8`. Dorado sol `#F0B23C` y celeste `#4A9FE0` solo en detalles mínimos.
- **Referencia visual vinculante:** Montreval Country Club (`brief/refs/web-referencia.webp`). Se toma su sistema visual, nunca sus textos, su emblema ni el universo golf. La dirección no se sortea. El detalle está en `brief/BRIEF.md` §6–§7 y el sistema resultante se documentará en DESIGN.md.
- **Identidad regional:** Salta y el norte argentino (poncho, cerros, cardón, sol), sin caer en folclore de postal.
- **Exclusiones:** nada de estética "fumona" ni genérica de cannabis (hojas por todos lados, neón, psicodelia), nada de look SaaS o tecnológico y nada de datos inventados presentados como reales (`brief/BRIEF.md` §8).

## Evidence on Hand

- **Datos confirmados:** +100 socios y pacientes acompañados; activa desde 2026; sede en 25 de Mayo 880, Salta Capital.
- **Assets:** logo en `brief/refs/logo.jpeg` y referencia visual en `brief/refs/web-referencia.webp`. Ojo: el brief los cita como `brief/recursos/logo.jpg` y `brief/recursos/ref-montreval.png`, pero los archivos reales están en `brief/refs/`.
- **Fuente de contenido:** `brief/BRIEF.md`, que trae estructura de secciones, servicios, FAQ, lemas y formulario.
- **Lo que no existe y no se debe fabricar:** testimonios, nombres de personas o del equipo, logros, alianzas, número de inscripción, cifras distintas de las anteriores, fotos propias y precios o cuotas.

## Product Principles

1. **Verdad antes que promesa.** Solo se publican datos confirmados. No hay promesas terapéuticas ni cifras inventadas, y lo que falta validar se marca y queda editable.
2. **Salud y comunidad, no consumo.** El cannabis se presenta desde la salud, la información y el acompañamiento. El cultivo solidario aparece como respaldo institucional, nunca como producto.
3. **Seria sin ser clínica.** La fundación transmite rigor con una voz cálida y cercana, y la información se explica sin jerga.
4. **Un solo camino.** Todo en la página conduce a completar el formulario de asociación.
5. **Raíz local real.** Salta es identidad y pertenencia, no decorado.

## Accessibility & Inclusion

- Respetar `prefers-reduced-motion` (`brief/BRIEF.md` §7).
- El tráfico llega mayormente desde el celular (`docs/GUIA.MD`), así que la experiencia móvil es la principal.
- No se fijó un estándar formal de accesibilidad.
