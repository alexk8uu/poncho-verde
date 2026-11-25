# Brief — Landing Poncho Verde

24 nov 2026 · @Fredy

> Brief de la landing de **Poncho Verde — Fundación de Cannabis Medicinal** (Salta). Guardar como `brief/BRIEF.md`, junto a `brief/recursos/logo.jpg` y `brief/recursos/ref-montreval.png`.

## 0. Reglas para el agente

- **Stack:** Next.js (App Router) + Tailwind CSS. Componentes en React.
- **Contenido:** usar solo los datos de este brief. No inventar números, nombres de personas, logros ni alianzas. Lo marcado como *(validar)* es copy base aceptable para construir, pero debe quedar fácil de editar.
- **Dirección visual:** NO sortear direcciones. Tomar el sistema visual de `ref-montreval.png` (sección 6) y la paleta e identidad del logo (sección 5). Copiar el sistema, nunca los textos, el emblema ni el universo golf.
- **Antes de construir:** mostrar la dirección y la estructura de secciones para aprobar.
- **Imágenes:** bancos libres con licencia comercial hasta tener fotos propias.

## 1. La fundación

- **Nombre:** Poncho Verde — Fundación de Cannabis Medicinal
- **Tipo:** fundación / ONG
- **Ubicación:** sede física en 25 de Mayo 880, Salta Capital
- **Desde:** 2026
- **Comunidad:** +100 socios y pacientes acompañados
- **Misión (validar):** Acompañar a pacientes y personas adultas en el uso responsable del cannabis medicinal, con información seria, comunidad y raíces en el norte argentino.
- **Idea central:** cannabis *más allá del estigma*: salud, comunidad e información.

## 2. Público y tono

**Para quién:**

- Pacientes medicinales que buscan acompañamiento y orientación sobre REPROCANN
- Personas adultas que quieren asociarse
- Curiosos y primerizos que necesitan información básica y confianza
- Jóvenes adultos (+18), a quienes se les habla con una estética moderna

**Qué tiene que sentir quien entra:** confianza, calidez y orgullo local. Una institución seria que no se siente clínica.

**Tono:** moderno / editorial con alma analógica (papel, sellos, script). Voz cercana, clara y sin jerga. Nada de estética "fumona".

**Acción principal:** completar el formulario de asociación.

## 3. Estructura de la landing

1. **Hero:** foto full-bleed cálida + pill "FUNDACIÓN DE CANNABIS MEDICINAL" + título centrado + bajada en script + botón al formulario
2. **Manifiesto:** emblema + párrafo grande centrado con la misión
3. **Marquee:** cinta verde con lemas y emblema en loop lento
4. **Pilares:** 3 cards-postal rotadas y superpuestas: **Salud · Comunidad · Educación**, cada una con foto y una línea
5. **Servicios:** lo que ofrece la fundación (sección 4)
6. **Quiénes somos:** frase de filosofía + foto enmarcada con sellos + banda de datos `PONCHO VERDE ◆ ESTD ◆ 2026 ◆ FUNDACIÓN ◆ SALTA`
7. **FAQ:** acordeón con las preguntas de la sección 4
8. **Asociate:** CTA dividida (texto sobre bordó + foto, badge del emblema) con el formulario
9. **Footer:** fondo verde, frase, dirección, redes y consentimiento de datos; cierre con el logo completo grande

**Lemas del marquee (validar):** Cultivar salud · Más allá del estigma · Desde Salta · Información que cuida

## 4. Contenido

### Servicios (validar antes de publicar)


| Servicio                | Descripción                                                       | Para quién         |
| ----------------------- | ----------------------------------------------------------------- | ------------------ |
| Asesoramiento REPROCANN | Orientación para entender e iniciar la inscripción en el registro | Pacientes          |
| Acompañamiento          | Seguimiento y contacto con profesionales para un uso responsable  | Pacientes y socios |
| Talleres y educación    | Encuentros sobre cultivo, uso medicinal y marco legal             | Socios y curiosos  |
| Comunidad               | Espacio de encuentro e intercambio en la sede                     | Socios             |


### FAQ (validar respuestas)

1. **¿Qué es Poncho Verde?** Una fundación de cannabis medicinal con sede en Salta Capital que acompaña a pacientes y socios con información y comunidad.
2. **¿Quién puede asociarse?** Personas mayores de 18 años interesadas en el uso medicinal del cannabis.
3. **¿Qué es el REPROCANN?** El registro del Ministerio de Salud de la Nación que, en el marco de la Ley 27.350, habilita a pacientes con indicación médica a acceder al cannabis. Te orientamos en el proceso.
4. **¿Necesito REPROCANN para asociarme?** Respuesta a definir por la fundación — dejar editable.
5. **¿Tiene costo asociarse?** Respuesta a definir por la fundación — dejar editable.
6. **¿Dónde están?** En 25 de Mayo 880, Salta Capital.

### Formulario de asociación

- **Campos:** nombre y apellido, email, teléfono / WhatsApp. Todos obligatorios, con validación.
- **Consentimiento:** checkbox con una línea sobre el uso de los datos (Ley 25.326).
- **Envío:** server action de Next.js con un adaptador intercambiable. Por defecto, envío por email; preparado para conectar Supabase o un webhook de n8n.
- **Después de enviar:** mensaje en pantalla: "Recibimos tu solicitud. Te vamos a contactar por WhatsApp o email en los próximos días."

### Contacto y redes

- Dirección: 25 de Mayo 880, Salta Capital
- Instagram, WhatsApp y email: placeholders en un archivo de configuración, fáciles de completar

## 5. Marca

- **Logo:** ilustración circular detallada (gaucho con poncho verde, cerros salteños al atardecer, flor violeta, cardón, sol de mayo). Archivo: `brief/recursos/logo.jpg`.
- **Uso del logo:** la ilustración completa solo grande (hero o cierre del footer). Para sellos, badges, marquee y favicon se usa un **emblema simplificado a 1 color: la silueta del sombrero en verde bosque**, diseñado como SVG.
- **Colores (aproximados del logo):**
  - Verde bosque `#1F3D2B`: color principal, texto y bloques
  - Crema `#F6F1E4`: fondo con textura de papel
  - Bordó `#8E2A35`: segundo color de bloques
  - Naranja atardecer `#E2622A`: acento en CTAs y detalles
  - Violeta `#8A5FA8`: acento puntual (hover, detalles)
  - Dorado sol `#F0B23C` y celeste `#4A9FE0`: solo en detalles mínimos
- **Identidad regional:** Salta y el norte argentino (poncho, cerros, cardón, sol) en fotos y texturas, sin caer en folclore de postal.
- **Fotos:** plantas y cultivo con luz cálida, manos, comunidad, paisajes de cerros, interiores con madera. Cálidas, con grano, tono película. Nunca hojas recortadas sobre fondo verde.

## 6. Referencia visual: Montreval Country Club

Archivo: `brief/recursos/ref-montreval.png`. **Se toma el sistema visual, no el contenido.**

- **Concepto:** institucional con alma editorial y analógica, como una revista impresa o un álbum de postales. Calma, pertenencia, lujo tranquilo.
- **Paleta:** pocos colores fuertes, muy controlados. Fondo crema con grano de papel, bloques verde bosque y bordó.
- **Tipografía:** titulares en sans grotesca ancha y liviana, en caja normal; script caligráfico como acento en bajadas y CTAs; etiquetas chicas en mayúsculas espaciadas, a veces en pill con borde; cuerpo chico con mucho aire.
- **Recursos gráficos:** emblema como sello o badge circular, cards rotadas y superpuestas como postales, fotos enmarcadas con borde de color, marquee con lemas, banda de datos con separadores ◆.

## 7. Movimiento

- Marquee con lemas y emblema en loop lento
- Cards-postal que se acomodan con una rotación suave al entrar en pantalla
- Entradas de sección sutiles; nada exagerado. Respetar `prefers-reduced-motion`

## 8. Lo que NO queremos

- Estética genérica de cannabis: hojas verdes por todos lados, neón, tipografías psicodélicas
- Look tecnológico / SaaS: gradientes, glassmorphism, íconos 3D
- Copiar textos, emblema o universo golf de Montreval
- Datos inventados presentados como reales

