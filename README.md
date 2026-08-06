# Curio

Cambia unos minutos de distraccion por una idea que valga la pena explorar.

Curio es una ruleta de descubrimiento intelectual. Toca un boton, recibe un tema al azar
con su categoria, una introduccion breve y una pregunta disparadora, y un prompt de
investigacion listo para pegar en Claude, ChatGPT, Gemini, Perplexity o tu editor.

No es una herramienta de salud ni reemplaza acompanamiento profesional. El enfoque es
curiosidad, aprendizaje y direccion mental.

## Estado

MVP funcional. Sin backend, sin autenticacion, sin claves de API.
El build produce **un unico archivo HTML autocontenido** que funciona sin conexion.

## Como correrlo

```bash
npm install
npm run build     # genera dist/index.html
npm start         # build + servidor en http://localhost:4173
npm run watch     # recompila al guardar
```

Tambien podes abrir `dist/index.html` con doble clic: no necesita servidor.

## Estructura

```
src/app.jsx        Toda la aplicacion: datos, logica y componentes React
src/custom.css     Animaciones, tipografia y estilos que Tailwind no cubre
src/index.css      Directivas de Tailwind
src/index.html     Plantilla donde se inyectan CSS y JS
scripts/build.mjs  Compila y produce dist/index.html autocontenido
dist/index.html    Salida lista para usar o publicar
```

## Stack

- React 18 (bundle propio, sin CDN)
- Tailwind CSS 3 (solo las clases usadas, generadas en build)
- Iconos: trazados de Lucide como componentes SVG locales
- LocalStorage para historial y favoritos
- esbuild para el bundle

## Funcionalidad

- **70 temas** en 7 categorias: Ciencia, Tecnologia, Filosofia, Psicologia, Cultura,
  Finanzas, Neurociencia. Cada tema tiene descripcion, pregunta disparadora, nivel
  (inicial / intermedio / avanzado), tiempo sugerido (5 / 15 / 30 min), conceptos
  relacionados y un tema siguiente encadenado.
- **Aleatoriedad sin repeticion**: no repite un tema hasta agotar el pool y nunca
  devuelve el mismo dos veces seguidas.
- **"Que necesitas en este momento?"**: pondera categorias segun la intencion del
  usuario sin eliminar el factor sorpresa.
- **Generador de prompts** en tres modos (exploracion rapida, investigacion profunda,
  debate critico), con dos plantillas por modo para que "Otro prompt" devuelva una
  variante real.
- **Historial y favoritos** persistidos en LocalStorage.
- Contador de progreso y reinicio del recorrido.
- Responsive: nav superior en escritorio, barra inferior en movil.

## Donde tocar el codigo

Todo vive en `src/app.jsx`, en secciones marcadas con comentarios:

| Seccion | Que contiene |
|---|---|
| `ICONOS` | Componentes SVG basados en Lucide |
| `DATOS` | `CATEGORIES` y `RAW`: la base de 70 temas |
| `ESTADOS DE ANIMO` | `MOODS` y el peso de cada categoria |
| `GENERADOR DE PROMPTS` | `MODES` y `buildPrompt()` con las plantillas |
| `PERSISTENCIA` | Helpers de LocalStorage |
| `APP` | Estado, seleccion aleatoria y vistas |

Para agregar un tema, sumalo al array de su categoria en `RAW` con la forma:

```js
["Titulo", "Descripcion", "Pregunta disparadora", "nivel", ["Concepto A", "Concepto B"], "Tema siguiente"]
```

El campo "Tema siguiente" debe coincidir exactamente con el titulo de otro tema.

## Roadmap (v2)

- Investigacion generada dentro de la app
- Retos de aprendizaje diarios y rachas
- Mapas de conocimiento
- Seguimiento de temas dominados
- Prompts personalizados segun intereses

El diferencial no es "temas al azar", sino convertir el aburrimiento en un ritual de
exploracion con una accion inmediata.
