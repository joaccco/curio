# Contexto para Claude

Proyecto: **Curio**, app web de descubrimiento de temas + generador de prompts.

## Reglas del proyecto

- El resultado del build debe ser **un unico HTML autocontenido**. Nada de CDN,
  fuentes remotas, imagenes externas ni claves de API. Si agregas una dependencia,
  tiene que quedar dentro del bundle.
- Todo el codigo de la app vive en `src/app.jsx`. No lo dividas en modulos sin
  necesidad real: la simplicidad de un archivo unico es intencional en esta etapa.
- Los textos de la interfaz estan en espanol rioplatense (voseo). Manten ese registro.
- No presentes Curio como tratamiento medico ni prometas reducir la ansiedad.
  El encuadre es curiosidad y aprendizaje.
- Modo oscuro unicamente. Fondo `#05070f`, tarjetas redondeadas, animaciones sutiles.

## Al modificar

1. Corre `npm run build` y verifica que no haya errores.
2. Si tocas la base de temas, revisa que cada campo "tema siguiente" apunte a un
   titulo existente y que los IDs (categoria + titulo) sigan siendo unicos.
3. Las clases de Tailwind deben aparecer como strings literales en el codigo:
   el scanner no resuelve nombres construidos dinamicamente.
