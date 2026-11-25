# Guía de skills — Landing Poncho Verde

Orden de trabajo con **Impeccable**, **Taste Skill** y **Emil Kowalski skills**, aplicado a esta landing.


| Skill      | Para qué se usa                               |
| ---------- | --------------------------------------------- |
| Taste      | Construir la página desde cero                |
| Impeccable | Contexto del producto, diagnóstico y refinado |
| Emil       | Motion, interacción y pulido final            |


---

## Paso 0 — Preparar el proyecto

### Estructura de carpetas

```
poncho-verde/
└── brief/
    ├── BRIEF.md              ← exportado del doc como Markdown
    └── recursos/
        ├── logo.jpg
        └── ref-montreval.png

```

### Requisitos

- Node 22 o superior
- Chrome, Edge o Chromium instalado (Taste lo usa para `inspect.mjs`)

### Instalar las skills

```bash
npx impeccable install
npx skills add Leonxlnx/taste-skill
npx skills@latest add emilkowalski/skills

```

En Claude Code, Taste también se puede instalar como plugin:

```
/plugin marketplace add Leonxlnx/taste-skill
/plugin install taste-skill@taste-skill

```

---

## Paso 1 — Contexto con Impeccable

```
/impeccable init

```

Cuando pregunte, respondé:

> Todo el contexto está en brief/[BRIEF.md](http://BRIEF.md) y brief/recursos/. Usalo para generar [PRODUCT.md](http://PRODUCT.md) y [DESIGN.md](http://DESIGN.md).

⚠️ **Todavía NO actives** `/impeccable hooks on`. Si los activás ahora, chocan con las reglas de Taste durante la construcción.

---

## Paso 2 — Construcción con Taste

Prompt de arranque:

> Usá design-taste-frontend para construir la landing de Poncho Verde en Next.js + Tailwind. El contenido sale de brief/[BRIEF.md](http://BRIEF.md): usá solo esos datos y respetá las reglas de la sección 0. La dirección visual NO se sortea: tomala de brief/recursos/ref-montreval.png según la sección 6 del brief (sistema visual, no contenido). La paleta y la identidad salen de brief/recursos/logo.jpg (sección 5). Antes de construir, mostrame la dirección y la estructura de secciones para aprobar.

Taste sigue su propio ciclo:

1. Inventario de datos (sale del brief)
2. Dirección visual (tomada de Montreval, no sorteada)
3. Idea central de la página
4. Construcción
5. Control con `lint.mjs` + `inspect.mjs` (debe dar cero FAIL a 1440, 768 y 390 px)
6. Autorrevisión y corrección (hasta 3 vueltas)

✅ **Checkpoint:** revisá la dirección y la estructura **antes** de que escriba código. Es el momento más barato para corregir el rumbo.

En esta etapa no mezcles comandos de las otras skills.

---

## Paso 3 — Diagnóstico con Impeccable

Con la página completa y funcionando:

```
/impeccable critique
/impeccable audit

```

- `critique` encuentra lo que "se siente raro" en el diseño.
- `audit` es una revisión de calidad para producción.

Anotá los hallazgos principales antes de pasar al paso 4.

---

## Paso 4 — Refinado con Impeccable

Ahora sí, activá los hooks:

```
/impeccable hooks on

```

(Aprobá los hooks en tu herramienta cuando te lo pida.)

Usá solo los comandos que pida el diagnóstico:


| Si el problema es…                    | Comando                |
| ------------------------------------- | ---------------------- |
| Textos ilegibles o con mala jerarquía | `/impeccable typeset`  |
| Composición o espaciado               | `/impeccable layout`   |
| Página recargada                      | `/impeccable distill`  |
| Colores apagados o desordenados       | `/impeccable colorize` |
| Falta impacto                         | `/impeccable bolder`   |
| Demasiado ruido visual                | `/impeccable quieter`  |


⚠️ Pedí siempre **refinar** la dirección de Montreval, no rediseñar. Usá `bolder` y `overdrive` con cuidado.

⚠️ **No uses** `/impeccable animate`: el motion se hace con Emil en el paso 5.

---

## Paso 5 — Motion con Emil

Orden sugerido:

```
find-animation-opportunities   → dónde suma movimiento y dónde no
animate                        → animaciones puntuales (hero, entradas)
choreograph                    → secuencias: cards-postal, marquee
review-animations              → revisión estricta contra sus reglas
animation-performance          → arreglar caídas de frames

```

Si hay drag, swipe o carousels, sumá `gestures`.

Para esta landing en particular:

- Marquee con lemas y emblema en loop lento
- Cards-postal que se acomodan con una rotación suave al entrar
- Entradas de sección sutiles, respetando `prefers-reduced-motion`

💡 Si no sabés cómo describir una animación que viste, usá `animation-vocabulary`. 💡 Si no sabés qué skill de Emil corresponde, usá `ask-emil`.

---

## Paso 6 — Endurecimiento

```
break-ui        → probar con datos extremos (textos largos, campos vacíos, errores del formulario)
mobile-native   → hover en touch, tap highlight, bug de 100vh, zoom en inputs, safe areas

```

`mobile-native` es clave: la mayoría de las visitas van a llegar desde el celular (Instagram, WhatsApp).

---

## Paso 7 — Pasada final

```
/impeccable polish
/impeccable audit

```

---

## Paso 8 — Guardar lo aprendido

```
learn-taste
/impeccable document

```

Los dos escriben en [`DESIGN.md`](http://DESIGN.md). Revisalo al final para que no queden reglas contradictorias.

---

## Resumen rápido

```
0. Instalar skills + armar brief/
1. /impeccable init
2. Taste → construir (aprobar dirección antes del código)
3. /impeccable critique + audit
4. /impeccable hooks on → typeset / layout / distill / colorize…
5. Emil → find-animation-opportunities → animate → choreograph → review → performance
6. break-ui + mobile-native
7. /impeccable polish + audit
8. learn-taste + /impeccable document

```

## Cosas a tener en cuenta

- `animate` **existe dos veces:** en Impeccable y en Emil. Usá siempre la de Emil.
- **Hooks de Impeccable:** activarlos recién en el paso 4, no durante la construcción con Taste.
- **Una sola dirección visual:** la de Montreval + el logo. Todo lo que viene después la refina, no la reemplaza.
- **Contenido marcado *(validar)*:** servicios, FAQ y lemas son una base escrita a partir del brief. Revisalos antes de publicar.
- **Actualizar las skills:** `npx impeccable update`, y un `git pull` si instalaste Taste desde un clon.

