
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

/* ============================================================
   ICONOS (trazados de Lucide, como componentes locales)
   ============================================================ */
const Ico = ({ children, size = 20, className = "", stroke = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
       strokeLinejoin="round" className={className} aria-hidden="true">{children}</svg>
);
const Sparkles = p => <Ico {...p}><path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></Ico>;
const Compass = p => <Ico {...p}><path d="m16.24 7.76-1.8 5.41a2 2 0 0 1-1.27 1.27l-5.41 1.8 1.8-5.41a2 2 0 0 1 1.27-1.27z"/><circle cx="12" cy="12" r="10"/></Ico>;
const Dice = p => <Ico {...p}><rect width="18" height="18" x="3" y="3" rx="3"/><path d="M8 8h.01M16 8h.01M8 16h.01M16 16h.01M12 12h.01"/></Ico>;
const Copy = p => <Ico {...p}><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></Ico>;
const Check = p => <Ico {...p}><path d="M20 6 9 17l-5-5"/></Ico>;
const Star = p => <Ico {...p}><path d="M11.52 2.3a.53.53 0 0 1 .95 0l2.31 4.68a2.1 2.1 0 0 0 1.6 1.16l5.16.75a.53.53 0 0 1 .3.91l-3.74 3.64a2.1 2.1 0 0 0-.61 1.88l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.1 2.1 0 0 0-1.97 0L6.4 21.01a.53.53 0 0 1-.77-.56l.88-5.14a2.1 2.1 0 0 0-.61-1.88L2.16 9.8a.53.53 0 0 1 .29-.91l5.17-.75a2.1 2.1 0 0 0 1.6-1.16z"/></Ico>;
const Share = p => <Ico {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></Ico>;
const Clock = p => <Ico {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Ico>;
const HistoryI = p => <Ico {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></Ico>;
const Trash = p => <Ico {...p}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></Ico>;
const X = p => <Ico {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></Ico>;
const Rotate = p => <Ico {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></Ico>;
const Refresh = p => <Ico {...p}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></Ico>;
const Arrow = p => <Ico {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></Ico>;
const Bulb = p => <Ico {...p}><path d="M15 14c.2-1 .7-1.7 1.5-2.5A5.6 5.6 0 0 0 18 8a6 6 0 0 0-12 0c0 1 .2 2.2 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></Ico>;
const Signal = p => <Ico {...p}><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></Ico>;
const Link = p => <Ico {...p}><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></Ico>;
const Home = p => <Ico {...p}><path d="M15 21v-8H9v8"/><path d="M3 10a2 2 0 0 1 .7-1.5l7-6a2 2 0 0 1 2.6 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></Ico>;

/* ============================================================
   DATOS: 7 categorías x 10 temas
   ============================================================ */
const CATEGORIES = [
  { key: "Ciencia",      hue: "from-sky-400/25 to-cyan-300/10",     dot: "bg-sky-400",     text: "text-sky-300" },
  { key: "Tecnología",   hue: "from-violet-400/25 to-fuchsia-300/10",dot: "bg-violet-400",  text: "text-violet-300" },
  { key: "Filosofía",    hue: "from-amber-400/25 to-orange-300/10",  dot: "bg-amber-400",   text: "text-amber-300" },
  { key: "Psicología",   hue: "from-rose-400/25 to-pink-300/10",     dot: "bg-rose-400",    text: "text-rose-300" },
  { key: "Cultura",      hue: "from-emerald-400/25 to-teal-300/10",  dot: "bg-emerald-400", text: "text-emerald-300" },
  { key: "Finanzas",     hue: "from-lime-400/25 to-green-300/10",    dot: "bg-lime-400",    text: "text-lime-300" },
  { key: "Neurociencia", hue: "from-indigo-400/25 to-blue-300/10",   dot: "bg-indigo-400",  text: "text-indigo-300" },
];
const catMeta = k => CATEGORIES.find(c => c.key === k) || CATEGORIES[0];

const RAW = {
  Ciencia: [
    ["Teoría del caos","Sistemas que obedecen reglas simples y deterministas pueden volverse imposibles de predecir. Una diferencia mínima al inicio termina produciendo un resultado completamente distinto.","Si el mundo fuera determinista pero impredecible, ¿qué significaría realmente 'predecir'?","intermedio",["Efecto mariposa","Atractores extraños","Fractales"],"Entropía"],
    ["Paradoja de Fermi","El universo es enorme y muy antiguo, con miles de millones de estrellas parecidas al Sol. Si la vida inteligente fuera algo común, deberíamos haber detectado algún rastro. No detectamos ninguno.","¿Es más inquietante estar solos, o descubrir que algo impide que las civilizaciones duren?","inicial",["Ecuación de Drake","Gran Filtro","Zona habitable"],"Hipótesis del multiverso"],
    ["Entropía","Es una medida del desorden y de la energía que ya no puede usarse para hacer trabajo. En el fondo explica por qué el tiempo parece avanzar en una sola dirección.","¿Por qué recordamos el pasado y no el futuro?","intermedio",["Segunda ley de la termodinámica","Flecha del tiempo","Información de Shannon"],"Teoría del caos"],
    ["Experimento de la doble rendija","Partículas individuales se comportan como ondas y generan un patrón de interferencia, pero ese patrón desaparece cuando se intenta observar por dónde pasaron.","¿La observación crea la realidad o solo revela lo que ya estaba ahí?","intermedio",["Dualidad onda-partícula","Superposición","Decoherencia"],"El gato de Schrödinger"],
    ["Teoría de cuerdas","Propone que las partículas fundamentales no son puntos sino filamentos que vibran, y que el universo tendría más dimensiones de las que percibimos.","¿Una teoría que hoy no puede ponerse a prueba sigue siendo ciencia?","avanzado",["Dimensiones extra","Teoría M","Supersimetría"],"Hipótesis del multiverso"],
    ["Materia oscura","Las galaxias giran más rápido de lo que su materia visible permitiría. Algo con masa, que no emite luz, parece componer la mayor parte del universo.","¿Falta materia, o falla nuestra teoría de la gravedad?","intermedio",["Energía oscura","Curvas de rotación galáctica","Gravedad modificada (MOND)"],"Hipótesis del multiverso"],
    ["Hipótesis del multiverso","Nuestro universo podría ser uno entre incontables, cada uno con constantes físicas distintas. Explicaría por qué las nuestras parecen tan finamente ajustadas.","Si todo lo posible ocurre en algún universo, ¿qué vuelve especial a este?","avanzado",["Inflación eterna","Principio antrópico","Interpretación de muchos mundos"],"Paradoja de Fermi"],
    ["El gato de Schrödinger","Un experimento mental donde un gato quedaría vivo y muerto a la vez hasta ser observado. Nació como una crítica al modelo cuántico y terminó siendo su símbolo más famoso.","¿Dónde termina el mundo cuántico y empieza el mundo cotidiano?","inicial",["Superposición","Problema de la medición","Decoherencia"],"Experimento de la doble rendija"],
    ["Tectónica de placas","La superficie terrestre está partida en placas rígidas que se desplazan pocos centímetros por año. Ese movimiento lento levanta montañas, abre océanos y provoca terremotos.","¿Cuánto de la historia humana fue moldeado por el movimiento del suelo?","inicial",["Deriva continental","Subducción","Pangea"],"Adaptación evolutiva"],
    ["Adaptación evolutiva","Los rasgos que mejoran la supervivencia y la reproducción se vuelven más frecuentes con el tiempo. No hay un plan: hay variación, filtro y acumulación.","¿La evolución produce diseños óptimos o apenas suficientes?","inicial",["Selección natural","Deriva genética","Exaptación"],"Neuroplasticidad"],
  ],
  Tecnología: [
    ["Singularidad tecnológica","Un punto hipotético en el que la inteligencia artificial mejora a sí misma más rápido de lo que podemos seguir, y el futuro se vuelve imposible de proyectar.","¿Podemos diseñar algo que después no podamos entender?","intermedio",["Explosión de inteligencia","Rendimientos acelerados","Problema de alineación"],"Inteligencia artificial general"],
    ["Sesgo algorítmico","Un modelo aprende de datos históricos, y esos datos cargan las desigualdades del pasado. El resultado parece objetivo, pero repite decisiones humanas antiguas.","Si un sistema aprende del pasado, ¿puede producir un futuro distinto?","inicial",["Datos de entrenamiento","Equidad algorítmica","Cajas negras"],"Capitalismo de vigilancia"],
    ["Capitalismo de vigilancia","Modelo económico donde la materia prima es tu comportamiento: se registra, se predice y se vende la capacidad de influirlo.","¿Qué precio tiene algo gratis?","intermedio",["Datos de comportamiento","Publicidad dirigida","Privacidad diferencial"],"Economía de la atención"],
    ["Ley de Moore","La observación de que la cantidad de transistores en un chip se duplicaba cada dos años. Fue menos una ley física que una promesa que la industria decidió cumplir.","¿Qué le pasa a una industria construida sobre una promesa de crecimiento cuando esa promesa se agota?","inicial",["Miniaturización","Límites físicos","Computación paralela"],"Computación cuántica"],
    ["Efectos de red","Un producto que vale más cuanto más gente lo usa. Eso crea una ventaja que se refuerza sola y vuelve casi imposible competir desde afuera.","¿Cuándo un producto deja de competir por calidad y empieza a competir por tamaño?","inicial",["Masa crítica","Costos de cambio","Monopolios naturales"],"Economías de escala"],
    ["Inteligencia artificial general","Un sistema capaz de aprender y razonar en cualquier dominio, no solo en la tarea para la que fue entrenado. Hoy no existe y no hay acuerdo sobre qué tan cerca está.","¿Qué prueba aceptaríamos como evidencia de comprensión real?","intermedio",["Transferencia de aprendizaje","Alineación","Test de Turing"],"Singularidad tecnológica"],
    ["Descentralización mediante blockchain","Un registro compartido que nadie controla individualmente y que permite acordar un estado común sin una autoridad central que lo garantice.","¿Confiar en un sistema sin autoridad central es realmente confiar menos?","intermedio",["Consenso distribuido","Contratos inteligentes","Trilema de escalabilidad"],"Ciclos de mercado"],
    ["Computación cuántica","Usa estados cuánticos para explorar muchas combinaciones a la vez. Para ciertos problemas específicos podría hacer en minutos lo que hoy tardaría siglos.","¿Qué problemas dejarían de ser imposibles si el tiempo de cálculo dejara de ser un límite?","avanzado",["Qubits","Superposición","Corrección de errores"],"Experimento de la doble rendija"],
    ["Economía de la atención","Cuando la información es infinita, lo escaso es la atención. Las plataformas compiten por minutos, y ese incentivo termina diseñando lo que ves.","¿Elegiste mirar esto, o alguien diseñó que lo miraras?","inicial",["Refuerzo variable","Métricas de engagement","Costo de oportunidad"],"Vías de recompensa de la dopamina"],
    ["Desplazamiento laboral por automatización","La automatización elimina tareas más que oficios completos, pero reparte los costos y los beneficios de manera muy desigual entre trabajadores.","¿La automatización destruye trabajo o lo redistribuye hacia quienes ya tenían ventaja?","intermedio",["Falacia ludita","Polarización del empleo","Renta básica universal"],"Estratificación social"],
  ],
  Filosofía: [
    ["Existencialismo","Sostiene que no venimos con una esencia ni un propósito dado: primero existimos y después nos definimos con lo que elegimos hacer.","Si nadie te dice quién ser, ¿eso es libertad o abandono?","inicial",["Angustia","Autenticidad","Mala fe"],"Absurdismo"],
    ["Estoicismo","Separa con precisión lo que depende de vos de lo que no, y propone poner tu energía únicamente en lo primero. No es indiferencia: es economía emocional.","¿Qué parte de lo que te preocupa hoy depende realmente de vos?","inicial",["Dicotomía del control","Virtud","Amor fati"],"Locus de control"],
    ["Nihilismo","La idea de que la vida no tiene un sentido, un valor o un propósito dados de antemano. Puede leerse como derrota o como punto de partida.","Si nada tiene un sentido dado, ¿el sentido inventado vale menos?","intermedio",["Muerte de Dios","Voluntad de poder","Pesimismo filosófico"],"Absurdismo"],
    ["Utilitarismo","Una acción es correcta si produce el mayor bienestar para la mayor cantidad de personas. Simple de enunciar, incómodo de aplicar.","¿Puede una decisión correcta dejar víctimas?","inicial",["Cálculo de utilidad","Consecuencialismo","Deontología"],"El problema del tranvía"],
    ["Contrato social","La autoridad política no vendría de la naturaleza ni de lo divino, sino de un acuerdo entre personas que ceden algo de libertad a cambio de orden.","¿Alguna vez firmaste el acuerdo que te obliga a obedecer?","intermedio",["Estado de naturaleza","Legitimidad","Voluntad general"],"Estratificación social"],
    ["Determinismo vs. libre albedrío","¿Nuestras decisiones son realmente libres, o están determinadas por la genética, el entorno y todo lo que ocurrió antes? La discusión atraviesa física, biología y derecho.","Si cada decisión tiene una causa previa, ¿en qué momento aparece la libertad?","intermedio",["Compatibilismo","Causalidad","Responsabilidad moral"],"Dualismo vs. materialismo"],
    ["Relativismo moral","Sostiene que los juicios morales solo son válidos dentro de un marco cultural o personal, y que no habría un criterio neutral para arbitrar entre ellos.","¿Existe alguna práctica que estarías dispuesto a condenar en cualquier cultura?","intermedio",["Universalismo moral","Etnocentrismo","Objetivismo ético"],"Relativismo cultural"],
    ["Absurdismo","Nace del choque entre nuestra necesidad de sentido y un universo que no lo ofrece. Camus propone no resolver esa tensión sino vivirla con lucidez.","¿Se puede vivir plenamente sin respuestas?","intermedio",["Mito de Sísifo","Suicidio filosófico","Rebeldía"],"Nihilismo"],
    ["Dualismo vs. materialismo","¿La mente es algo distinto del cuerpo, o es enteramente producto de procesos físicos? De la respuesta dependen ideas sobre identidad, muerte y conciencia.","¿La experiencia de leer esto es solo química, o algo más?","avanzado",["Problema mente-cuerpo","Qualia","Problema difícil de la conciencia"],"Red neuronal por defecto"],
    ["El problema del tranvía","Un experimento mental sobre sacrificar a una persona para salvar a cinco. Sirve menos para dar respuestas que para exponer cómo razonamos moralmente.","¿Por qué se siente distinto accionar una palanca que empujar a alguien?","inicial",["Doctrina del doble efecto","Intuición moral","Utilitarismo"],"Utilitarismo"],
  ],
  Psicología: [
    ["Proyección","Atribuir a otros los impulsos, defectos o deseos que no toleramos en nosotros mismos. Suele delatarse por la intensidad desproporcionada de la reacción.","¿Qué te molesta en otras personas con una intensidad que no termina de justificarse?","inicial",["Mecanismos de defensa","Sombra junguiana","Transferencia"],"Sesgo de confirmación"],
    ["Mentalidad de escasez","Cuando algo falta —dinero, tiempo, afecto— la atención se estrecha alrededor de esa falta y empeora la calidad de todas las demás decisiones.","¿Cuántas decisiones tomaste hoy por miedo a perder algo?","inicial",["Ancho de banda cognitivo","Aversión a la pérdida","Descuento temporal"],"Costo de oportunidad"],
    ["Síndrome del impostor","La sensación persistente de no merecer los propios logros y de estar por ser descubierto, incluso frente a evidencia objetiva de competencia.","¿Por qué el éxito propio se explica por suerte y el ajeno por talento?","inicial",["Efecto Dunning-Kruger","Estilo atributivo","Autoeficacia"],"Sesgo de autoservicio"],
    ["Indefensión aprendida","Tras repetidas experiencias sin control sobre el resultado, se deja de intentar incluso cuando la salida ya está disponible.","¿Cuántas puertas dejaste de probar porque alguna vez estuvieron cerradas?","intermedio",["Locus de control","Estilo atributivo","Motivación"],"Locus de control"],
    ["Disonancia cognitiva","La incomodidad de sostener dos ideas incompatibles, o de actuar en contra de lo que se cree. Se resuelve casi siempre cambiando la creencia, no la conducta.","¿Cambiaste alguna vez tu opinión para no tener que cambiar tu conducta?","inicial",["Justificación del esfuerzo","Racionalización","Teoría de la autopercepción"],"Sesgo de confirmación"],
    ["Sesgo de confirmación","Buscamos, recordamos e interpretamos información de manera que confirme lo que ya creemos. No es mentir: es filtrar sin darse cuenta.","¿Cuándo fue la última vez que buscaste evidencia en contra de algo que creés?","inicial",["Razonamiento motivado","Cámara de eco","Falsación"],"Sesgo algorítmico"],
    ["Teoría del apego","Los vínculos tempranos dejan un modelo interno sobre qué esperar de los demás, y ese modelo sigue operando en las relaciones adultas.","¿Cuánto de tu forma de vincularte se decidió antes de que pudieras recordarlo?","intermedio",["Apego seguro","Modelo interno de trabajo","Regulación emocional"],"Poda sináptica"],
    ["Locus de control","Grado en que alguien percibe que los resultados de su vida dependen de sus acciones o de fuerzas externas. Predice persistencia, salud y bienestar.","¿Tus resultados dependen más de vos o de las circunstancias?","inicial",["Autoeficacia","Indefensión aprendida","Atribución causal"],"Estoicismo"],
    ["Sesgo de autoservicio","Atribuimos los éxitos a nuestras cualidades y los fracasos a factores externos. Protege la autoestima al costo de la precisión.","¿A quién le atribuiste tu último fracaso?","inicial",["Error fundamental de atribución","Autoestima","Sesgo retrospectivo"],"Efecto halo"],
    ["Efecto halo","Una impresión positiva en un rasgo contamina la evaluación de todos los demás. Alguien que se ve seguro nos parece además competente y honesto.","¿Cuántas veces confundiste seguridad con competencia?","inicial",["Primera impresión","Sesgo de atractivo","Heurística de disponibilidad"],"Señalización de estatus"],
  ],
  Cultura: [
    ["Capital cultural","Conocimientos, gustos y modales que se heredan del entorno y funcionan como una moneda invisible: abren puertas sin que nadie mencione el precio.","¿Qué sabés hacer que nunca aprendiste conscientemente?","intermedio",["Habitus","Distinción","Reproducción social"],"Estratificación social"],
    ["Poder blando","La capacidad de un país de conseguir lo que quiere por atracción y no por coerción: cine, música, universidades, comida, idioma.","¿Qué te hizo desear algo de un país que nunca visitaste?","inicial",["Diplomacia cultural","Industrias creativas","Hegemonía"],"Globalización"],
    ["Orientalismo","La crítica de Edward Said al modo en que Occidente construyó a 'Oriente' como un objeto exótico y atrasado, y a cómo esa representación justificó el dominio.","¿Quién escribe la historia de los que no la escriben?","avanzado",["Poscolonialismo","Otredad","Representación"],"Relativismo cultural"],
    ["Sociedades colectivistas vs. individualistas","Algunas culturas ubican la identidad en el grupo y otras en el individuo. Eso cambia cómo se decide, se negocia y se entiende el éxito.","¿Tus decisiones importantes son tuyas o de tu grupo?","inicial",["Dimensiones de Hofstede","Cultura del honor","Identidad social"],"Relativismo cultural"],
    ["Estratificación social","La distribución sistemática y persistente de recursos, prestigio y poder entre grupos. Rara vez es solo cuestión de esfuerzo individual.","¿Cuánto de tu posición actual estaba decidido al nacer?","intermedio",["Movilidad social","Clase","Meritocracia"],"Capital cultural"],
    ["Evolución de los estándares de belleza","Lo que se considera hermoso cambia con la economía, la tecnología y el poder. Cada época naturaliza su propio ideal como si fuera universal.","¿Qué te parece hermoso hoy que hace cien años habría resultado indiferente?","inicial",["Construcción social","Señalización de estatus","Industria cosmética"],"Señalización de estatus"],
    ["Subculturas","Grupos que construyen códigos propios frente a la cultura dominante. Casi siempre terminan siendo absorbidos y vendidos por aquello que rechazaban.","¿Qué grupo te definió más: el que elegiste o el que te tocó?","inicial",["Identidad social","Contracultura","Cooptación comercial"],"Capital cultural"],
    ["Relativismo cultural","Propone entender cada práctica dentro de su propio contexto antes de juzgarla. La discusión empieza cuando entender parece implicar aprobar.","¿Se puede entender una práctica sin justificarla?","intermedio",["Etnocentrismo","Universalismo","Método etnográfico"],"Relativismo moral"],
    ["Globalización","La integración creciente de economías, culturas y poblaciones. Acerca bienes e ideas, pero reparte de forma muy despareja las ganancias.","¿El mundo se volvió más parecido o más desigual?","intermedio",["Cadenas globales de valor","Homogeneización cultural","Glocalización"],"Poder blando"],
    ["Señalización de estatus","Buena parte del consumo no busca utilidad sino comunicar posición. Cuando una señal se vuelve accesible, el grupo de arriba cambia de señal.","¿Qué comprás para que otros vean algo de vos?","inicial",["Consumo conspicuo","Teoría de señales","Bienes posicionales"],"Capital cultural"],
  ],
  Finanzas: [
    ["Objetivos de inflación","Muchos bancos centrales apuntan a una inflación baja y estable, en torno al 2%. La idea es anclar expectativas más que controlar precios uno por uno.","¿Por qué un banco central querría que los precios suban un poco?","intermedio",["Política monetaria","Expectativas","Tasa de interés"],"Flexibilización cuantitativa"],
    ["Flexibilización cuantitativa","Cuando bajar la tasa ya no alcanza, el banco central compra activos para inyectar liquidez. El efecto sobre precios de activos suele ser mayor que sobre la economía real.","Si se puede crear dinero, ¿por qué sigue existiendo la escasez?","avanzado",["Base monetaria","Precio de activos","Trampa de liquidez"],"Burbujas de activos"],
    ["Burbujas de activos","El precio se despega del valor y sube porque sube, sostenido por la expectativa de vender más caro. Solo se confirma cuando ya explotó.","¿Cómo se distingue una burbuja de un cambio real de valor, antes de que estalle?","intermedio",["Exuberancia irracional","Manía especulativa","Reversión a la media"],"Finanzas conductuales"],
    ["Costo de oportunidad","El verdadero costo de algo es lo mejor que dejás de hacer para hacerlo. Es el concepto económico más simple y el más ignorado.","¿Qué estás dejando de hacer ahora mismo?","inicial",["Escasez","Análisis marginal","Costo hundido"],"Mentalidad de escasez"],
    ["Efectos de red","En finanzas, explica valuaciones que parecen absurdas: el negocio que concentra usuarios captura un valor desproporcionado frente al segundo.","¿Por qué el segundo mejor producto puede valer diez veces menos?","intermedio",["Ventaja del primero","Valuación","Poder de mercado"],"Economías de escala"],
    ["Economías de escala","Producir más puede reducir el costo por unidad, hasta que la coordinación se vuelve más cara que el ahorro y aparece el efecto inverso.","¿Por qué crecer puede volver a una empresa más barata y más frágil a la vez?","inicial",["Costo marginal","Deseconomías de escala","Integración vertical"],"Ciclos de mercado"],
    ["Ciclos de mercado","Expansión, euforia, contracción y pánico se repiten con notable regularidad, impulsados por crédito y psicología colectiva más que por fundamentos.","¿Por qué todos saben que el ciclo existe y casi nadie lo anticipa?","intermedio",["Ciclo del crédito","Indicadores adelantados","Efecto manada"],"Finanzas conductuales"],
    ["Finanzas conductuales","Estudia cómo los sesgos cognitivos y las emociones producen decisiones financieras sistemáticamente irracionales, y predecibles.","¿Sos un inversor racional o un animal con una hoja de cálculo?","intermedio",["Aversión a la pérdida","Contabilidad mental","Efecto manada"],"Disonancia cognitiva"],
    ["Prima de riesgo","El retorno extra que se exige por asumir incertidumbre. Cuánto hay que pagarte para que aceptes la posibilidad de perder.","¿Cuánto te tienen que pagar para que aceptes no dormir tranquilo?","intermedio",["Tasa libre de riesgo","Volatilidad","Diversificación"],"Interés compuesto"],
    ["Interés compuesto","Los rendimientos generan rendimientos. El resultado depende menos del monto inicial que de la tasa y, sobre todo, del tiempo.","¿Por qué el tiempo vale más que el monto?","inicial",["Crecimiento exponencial","Horizonte temporal","Descuento temporal"],"Prima de riesgo"],
  ],
  Neurociencia: [
    ["Neuroplasticidad","El cerebro reorganiza sus conexiones según lo que se usa y lo que no. Cambia con la experiencia durante toda la vida, no solo en la infancia.","Si el cerebro cambia con lo que repetís, ¿qué estás entrenando sin darte cuenta?","inicial",["Aprendizaje hebbiano","Poda sináptica","Neurogénesis"],"Poda sináptica"],
    ["Vías de recompensa de la dopamina","La dopamina se asocia menos al placer que al deseo y a la anticipación. Señala 'esto podría valer la pena' y sostiene la búsqueda.","¿La dopamina te da placer, o te mantiene buscando?","inicial",["Refuerzo variable","Núcleo accumbens","Error de predicción de recompensa"],"Economía de la atención"],
    ["Neuronas espejo","Neuronas que se activan tanto al ejecutar una acción como al ver a otro ejecutarla. Su rol exacto en la empatía sigue siendo discutido.","¿Dónde termina tu experiencia y empieza la del otro?","intermedio",["Empatía","Imitación","Cognición social"],"Teoría del apego"],
    ["Secuestro de la amígdala","Ante una amenaza percibida, la respuesta emocional se adelanta al razonamiento y la corteza prefrontal queda momentáneamente fuera de juego.","¿Cuántas decisiones importantes tomaste en modo alarma?","inicial",["Respuesta de lucha o huida","Corteza prefrontal","Regulación emocional"],"Respuesta de lucha o huida"],
    ["Red neuronal por defecto","Un conjunto de regiones que se activa cuando no estás enfocado en nada: recuerdos, planes, autorreferencia. Es el cerebro hablando solo.","¿Quién sos cuando no estás haciendo nada?","intermedio",["Divagación mental","Autorreferencia","Meditación"],"Dualismo vs. materialismo"],
    ["Poda sináptica","El cerebro elimina conexiones poco usadas para fortalecer las que importan. Aprender es, en buena medida, descartar.","¿Y si aprender fuera sobre todo eliminar?","intermedio",["Neuroplasticidad","Desarrollo adolescente","Mielinización"],"Neuroplasticidad"],
    ["Lateralización cerebral","Los hemisferios tienen especializaciones reales, pero la idea de personas 'de hemisferio izquierdo o derecho' es una simplificación sin respaldo.","¿Por qué sobreviven los mitos aun cuando la evidencia los contradice?","inicial",["Cuerpo calloso","Cerebro dividido","Especialización hemisférica"],"Sesgo de confirmación"],
    ["Neurogénesis","La formación de neuronas nuevas en el cerebro adulto, principalmente en el hipocampo. Su alcance real en humanos sigue en debate activo.","¿Cuánto de tu cerebro es el mismo que hace un año?","intermedio",["Hipocampo","Ejercicio y cognición","Neuroplasticidad"],"Neuroplasticidad"],
    ["Respuesta de lucha o huida","Una cascada fisiológica pensada para emergencias físicas breves, que hoy se dispara ante correos, deudas y conversaciones pendientes.","¿Tu cuerpo distingue entre un depredador y un mensaje sin responder?","inicial",["Sistema nervioso simpático","Adrenalina","Regulación del cortisol"],"Regulación del cortisol"],
    ["Regulación del cortisol","El cortisol sigue un ritmo diario y sube ante el estrés. El problema no es la subida sino que el sistema de emergencia no vuelva a apagarse.","¿Qué le pasa a un sistema de emergencia que nunca se apaga?","intermedio",["Eje HHA","Estrés crónico","Ritmo circadiano"],"Neurogénesis"],
  ],
};

const slug = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const TIME_BY_LEVEL = { inicial: 5, intermedio: 15, avanzado: 30 };

const TOPICS = Object.entries(RAW).flatMap(([cat, list]) =>
  list.map(([title, desc, question, level, related, next]) => ({
    id: `${slug(cat)}--${slug(title)}`,
    category: cat, title, desc, question, level, related, next,
    minutes: TIME_BY_LEVEL[level],
  }))
);

/* ============================================================
   ESTADOS DE ÁNIMO / INTENCIÓN
   ============================================================ */
const MOODS = [
  { key: "sorpresa",  label: "Algo que me sorprenda",        cats: [] },
  { key: "mente",     label: "Entender cómo funciona mi mente", cats: ["Psicología","Neurociencia"] },
  { key: "vida",      label: "Pensar sobre la vida",         cats: ["Filosofía"] },
  { key: "futuro",    label: "Comprender el futuro",         cats: ["Tecnología","Ciencia"] },
  { key: "dinero",    label: "Aprender sobre dinero",        cats: ["Finanzas"] },
  { key: "sociedad",  label: "Conocer mejor la sociedad",    cats: ["Cultura","Filosofía"] },
  { key: "universo",  label: "Explorar el universo",         cats: ["Ciencia"] },
];

/* ============================================================
   GENERADOR DE PROMPTS
   ============================================================ */
const MODES = [
  { key: "rapida",   label: "Exploración rápida",  hint: "Fundamentos en ~5 minutos" },
  { key: "profunda", label: "Investigación profunda", hint: "Conceptos, autores, evidencia y críticas" },
  { key: "debate",   label: "Debate crítico",      hint: "Posturas opuestas y conclusión propia" },
];

function buildPrompt(topic, mode, variant) {
  if (!topic) return "";
  const T = topic.title, C = topic.category, Q = topic.question;
  const rel = topic.related.join(", ");
  const tail = `\nConceptos que quiero que aparezcan sí o sí: ${rel}.\nPregunta que quiero poder responder al terminar: “${Q}”.`;

  const templates = {
    rapida: [
`Quiero entender los fundamentos del tema “${T}”, del área de “${C}”, en unos 5 minutos de lectura.

1. Explicámelo en un párrafo, como si no supiera absolutamente nada del tema.
2. Dame las 3 ideas centrales que necesito para no perderme.
3. Usá una analogía concreta de la vida cotidiana.
4. Contame un ejemplo real donde esto se vea funcionando.
5. Decime cuál es el error más común que comete la gente al entenderlo.
6. Cerrá con una sola frase que resuma por qué esto importa.

Sé claro y directo. Evitá tecnicismos sin explicar. Si hay algo en discusión, avisámelo en una línea.${tail}`,
`Necesito una introducción rápida y honesta a “${T}” (área: ${C}). Tengo cinco minutos.

1. Definilo en dos oraciones, sin jerga.
2. Explicá qué problema vino a resolver o qué observación lo originó.
3. Mostrá cómo se ve esto en un caso concreto y cotidiano.
4. Aclarame dos malentendidos frecuentes.
5. Decime qué parte está bien establecida y qué parte todavía se discute.
6. Terminá con una idea que me deje pensando.

Priorizá precisión sobre entusiasmo. No infles la explicación.${tail}`,
    ],
    profunda: [
`Quiero investigar el tema “${T}”, perteneciente al área de “${C}”.
Explicámelo de forma clara, rigurosa y progresiva.

1. Definí el concepto con palabras simples.
2. Explicá su origen y contexto histórico.
3. Presentá sus principales teorías, autores o descubrimientos.
4. Incluí ejemplos concretos y aplicaciones en la vida real.
5. Mostrá las principales críticas, limitaciones o controversias.
6. Diferenciá hechos comprobados, teorías e hipótesis.
7. Relacioná el tema con otras áreas del conocimiento.
8. Haceme tres preguntas para comprobar qué entendí.
9. Recomendame qué debería investigar después.

Evitá explicaciones superficiales. Cuando existan desacuerdos científicos o académicos, presentá las distintas posiciones.${tail}`,
`Actuá como un especialista en ${C} y armame un recorrido completo sobre “${T}”.

1. Empezá por la definición precisa y por cómo se distingue de conceptos vecinos.
2. Reconstruí su desarrollo histórico y los momentos que lo cambiaron.
3. Nombrá autores, trabajos o experimentos clave, con el aporte de cada uno.
4. Explicá los mecanismos: no solo qué es, sino cómo funciona.
5. Mostrá qué evidencia lo sostiene y qué tan sólida es.
6. Detallá críticas serias, límites y casos donde el marco falla.
7. Separá explícitamente lo comprobado, lo teórico y lo especulativo.
8. Conectalo con al menos dos disciplinas distintas.
9. Cerrá con tres preguntas de comprensión y una ruta de estudio con próximos pasos.

No simplifiques al punto de distorsionar. Si algo está en disputa, mostrá quién sostiene qué y por qué.${tail}`,
    ],
    debate: [
`Quiero analizar críticamente el tema “${T}” (área: ${C}) para formarme una opinión propia.

1. Formulá con precisión la pregunta central en disputa.
2. Presentá la postura A con sus mejores argumentos y su evidencia más fuerte.
3. Presentá la postura B con exactamente la misma seriedad.
4. Identificá los supuestos ocultos de cada posición.
5. Mostrá qué evidencia empírica apoya o debilita a cada una.
6. Señalá dónde el desacuerdo es conceptual y dónde es fáctico.
7. Agregá una tercera posición o síntesis menos conocida.
8. Hacé de abogado del diablo contra la postura que parezca más razonable.
9. Terminá con tres preguntas que me obliguen a tomar posición.

No tomes partido durante la exposición. Presentá cada postura como la defendería su mejor exponente.${tail}`,
`Armá un debate riguroso sobre “${T}” dentro del campo de ${C}.

1. Explicá brevemente el tema y por qué genera desacuerdo.
2. Enumerá las 2 o 3 posiciones principales y quién las sostiene.
3. Para cada una: mejor argumento, mejor evidencia y punto más débil.
4. Mostrá qué datos harían cambiar de opinión a cada lado.
5. Diferenciá desacuerdos por valores de desacuerdos por hechos.
6. Señalá los errores de razonamiento más comunes en esta discusión.
7. Explicá qué diría alguien de otra disciplina sobre el mismo problema.
8. Ofrecé una conclusión provisoria y aclará qué la volvería inválida.
9. Dejame tres preguntas para seguir pensando por mi cuenta.

Sé equilibrado y explícito sobre el nivel de certeza de cada afirmación.${tail}`,
    ],
  };
  const arr = templates[mode] || templates.profunda;
  return arr[variant % arr.length];
}

/* ============================================================
   PERSISTENCIA
   ============================================================ */
const LS = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} },
};
const K = { fav: "curio.favorites.v1", hist: "curio.history.v1", cycle: "curio.cycle.v1", explored: "curio.explored.v1" };

function usePersisted(key, initial) {
  const [state, setState] = useState(() => LS.get(key, initial));
  useEffect(() => { LS.set(key, state); }, [key, state]);
  return [state, setState];
}

/* ============================================================
   UTILIDADES
   ============================================================ */
function copyText(text) {
  return new Promise(resolve => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => resolve(true)).catch(() => resolve(fallbackCopy(text)));
    } else resolve(fallbackCopy(text));
  });
}
function fallbackCopy(text) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", "");
    ta.style.position = "fixed"; ta.style.top = "-1000px"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch (e) { return false; }
}
const fmtDate = ts => {
  const d = new Date(ts), now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const yest = new Date(now.getTime() - 864e5).toDateString() === d.toDateString();
  const hm = d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  if (sameDay) return `Hoy ${hm}`;
  if (yest) return `Ayer ${hm}`;
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short" }) + " " + hm;
};

/* ============================================================
   COMPONENTES DE UI
   ============================================================ */
function Toast({ msg, icon }) {
  if (!msg) return null;
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-24 sm:bottom-10 z-50 anim-pop">
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl px-4 py-2.5 text-sm text-white shadow-2xl shadow-black/50">
        {icon || <Check size={16} className="text-emerald-300" />}
        <span>{msg}</span>
      </div>
    </div>
  );
}

function Chip({ active, children, onClick, className = "" }) {
  return (
    <button onClick={onClick}
      className={`tap shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all duration-300 ${
        active ? "border-white/25 bg-white/15 text-white shadow-lg shadow-black/30"
               : "border-white/10 bg-white/[.03] text-white/55 hover:text-white/85 hover:border-white/20 hover:bg-white/[.07]"} ${className}`}>
      {children}
    </button>
  );
}

function LevelBadge({ level }) {
  const map = { inicial: "text-emerald-300 border-emerald-400/25 bg-emerald-400/10",
                intermedio: "text-amber-300 border-amber-400/25 bg-amber-400/10",
                avanzado: "text-rose-300 border-rose-400/25 bg-rose-400/10" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${map[level]}`}>
      <Signal size={12} /> {level}
    </span>
  );
}

function Ghost({ icon, title, text, action }) {
  return (
    <div className="anim-fade flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[.02] px-6 py-16 text-center">
      <div className="mb-4 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-white/40">{icon}</div>
      <p className="text-white/85 font-medium">{title}</p>
      <p className="mt-1.5 max-w-xs text-sm text-white/45 leading-relaxed">{text}</p>
      {action}
    </div>
  );
}

/* ============================================================
   TARJETA DEL TEMA
   ============================================================ */
function TopicCard({ topic, isFav, onFav, onNext, onOpenRelatedNext, promptProps, toast }) {
  const meta = catMeta(topic.category);
  const { mode, setMode, variant, nextVariant, prompt } = promptProps;
  const [copied, setCopied] = useState(false);
  const promptRef = useRef(null);

  const doCopy = async () => {
    const ok = await copyText(prompt);
    setCopied(ok);
    toast(ok ? "Prompt copiado." : "No se pudo copiar. Seleccioná el texto manualmente.");
    if (ok) setTimeout(() => setCopied(false), 2200);
  };

  const doShare = async () => {
    const text = `Curio · ${topic.category}\n${topic.title}\n\n${topic.desc}\n\n${topic.question}`;
    if (navigator.share) {
      try { await navigator.share({ title: `Curio — ${topic.title}`, text }); return; } catch (e) { if (e && e.name === "AbortError") return; }
    }
    const ok = await copyText(text);
    toast(ok ? "Tema copiado para compartir." : "No se pudo compartir.");
  };

  return (
    <div key={topic.id} className="anim-rise">
      {/* Tarjeta principal */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0d1a]/80 backdrop-blur-xl shadow-2xl shadow-black/60">
        <div className={`pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-gradient-to-br ${meta.hue} blur-3xl glow`} />
        <div className="absolute inset-0 card-sheen pointer-events-none" />
        <div className="relative p-6 sm:p-9">
          <div className="anim-fade d1 flex flex-wrap items-center gap-2.5">
            <span className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[.14em] ${meta.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} /> {topic.category}
            </span>
            <LevelBadge level={topic.level} />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[.04] px-2.5 py-1 text-[11px] text-white/60">
              <Clock size={12} /> {topic.minutes} min
            </span>
          </div>

          <h2 className="serif anim-rise d2 mt-5 text-[30px] leading-[1.12] sm:text-[42px] font-semibold tracking-tight text-white">
            {topic.title}
          </h2>

          <p className="anim-rise d3 mt-4 text-[15px] sm:text-[17px] leading-relaxed text-white/65">{topic.desc}</p>

          <div className="anim-rise d4 mt-6 rounded-2xl border-l-2 border-white/25 bg-white/[.03] px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-white/35">Pregunta disparadora</p>
            <p className="serif mt-1.5 text-[17px] sm:text-[19px] leading-snug text-white/90">{topic.question}</p>
          </div>

          <div className="anim-fade d5 mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-[.14em] text-white/30 mr-1">Conectado con</span>
            {topic.related.map(r => (
              <span key={r} className="rounded-lg border border-white/10 bg-white/[.03] px-2.5 py-1 text-xs text-white/55">{r}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Generador de prompts */}
      <div className="anim-rise d3 mt-4 overflow-hidden rounded-[28px] border border-white/10 bg-[#080b16]/80 backdrop-blur-xl">
        <div className="border-b border-white/[.07] px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2 text-white/85">
            <Bulb size={17} className="text-amber-300" />
            <h3 className="text-sm font-semibold">Prompt de investigación</h3>
          </div>
          <p className="mt-1 text-xs text-white/40">Copialo y pegalo en Claude, ChatGPT, Gemini, Perplexity o tu editor.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
            {MODES.map(m => (
              <button key={m.key} onClick={() => setMode(m.key)}
                className={`tap rounded-2xl border px-3.5 py-3 text-left transition-all duration-300 ${
                  mode === m.key ? "border-white/25 bg-white/[.1] shadow-lg shadow-black/30"
                                 : "border-white/10 bg-white/[.02] hover:border-white/20 hover:bg-white/[.05]"}`}>
                <p className={`text-[13px] font-semibold ${mode === m.key ? "text-white" : "text-white/65"}`}>{m.label}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-white/35">{m.hint}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 py-5 sm:px-8">
          <pre ref={promptRef} key={mode + variant}
            className="anim-fade max-h-[340px] overflow-auto no-scrollbar whitespace-pre-wrap rounded-2xl border border-white/[.07] bg-black/40 p-4 sm:p-5 font-mono text-[12.5px] leading-relaxed text-white/70 selection:bg-indigo-500/40">
{prompt}
          </pre>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button onClick={doCopy}
              className="tap col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition-transform duration-200 active:scale-[.97] hover:bg-white/90">
              {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copiado" : "Copiar prompt"}
            </button>
            <button onClick={nextVariant}
              className="tap inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[.05] px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/[.1] active:scale-[.97]">
              <Refresh size={15} /> Otro prompt
            </button>
            <button onClick={onFav}
              className={`tap inline-flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-medium transition active:scale-[.97] ${
                isFav ? "border-amber-300/30 bg-amber-300/15 text-amber-200" : "border-white/12 bg-white/[.05] text-white/80 hover:bg-white/[.1]"}`}>
              <Star size={15} className={isFav ? "fill-amber-300" : ""} /> {isFav ? "Guardado" : "Guardar"}
            </button>
            <button onClick={doShare}
              className="tap inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[.05] px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/[.1] active:scale-[.97]">
              <Share size={15} /> Compartir
            </button>
          </div>
        </div>
      </div>

      {/* Siguiente paso */}
      <div className="anim-fade d4 mt-4 flex flex-col sm:flex-row gap-3">
        <button onClick={onNext}
          className="tap group flex-1 inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/12 bg-gradient-to-b from-white/[.09] to-white/[.03] px-5 py-4 text-[15px] font-semibold text-white transition hover:border-white/25 active:scale-[.99]">
          <Dice size={18} className="text-white/70 transition-transform duration-500 group-hover:rotate-180" />
          Descubrir otro tema
        </button>
        <button onClick={onOpenRelatedNext}
          className="tap group flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[.02] px-5 py-4 text-sm text-white/60 transition hover:text-white/90 hover:bg-white/[.06]">
          <Link size={15} /> Seguir con “{topic.next}”
          <Arrow size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
function App() {
  const [tab, setTab] = useState("descubrir");
  const [category, setCategory] = useState("Todas");
  const [mood, setMood] = useState(null);
  const [topic, setTopic] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle | shuffling | revealed
  const [spinLabel, setSpinLabel] = useState("");
  const [mode, setMode] = useState("profunda");
  const [variant, setVariant] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  const [favorites, setFavorites] = usePersisted(K.fav, []);
  const [history, setHistory] = usePersisted(K.hist, []);
  const [cycle, setCycle] = usePersisted(K.cycle, []);       // ids vistos en la vuelta actual
  const [explored, setExplored] = usePersisted(K.explored, []); // ids únicos explorados alguna vez

  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { const f = document.getElementById("fallback"); if (f && f.parentNode) f.parentNode.removeChild(f); }, []);

  const toast = useCallback(msg => {
    setToastMsg(msg);
    const t = setTimeout(() => setToastMsg(""), 2400);
    timers.current.push(t);
  }, []);

  const prompt = useMemo(() => buildPrompt(topic, mode, variant), [topic, mode, variant]);
  const isFav = topic ? favorites.some(f => f.id === topic.id) : false;

  const pool = useMemo(
    () => category === "Todas" ? TOPICS : TOPICS.filter(t => t.category === category),
    [category]
  );

  /* --- selección aleatoria sin repetir hasta agotar --- */
  const pickTopic = useCallback((currentId) => {
    let available = pool.filter(t => !cycle.includes(t.id) && t.id !== currentId);
    let resetCycle = false;
    if (available.length === 0) {
      available = pool.filter(t => t.id !== currentId);
      resetCycle = true;
      if (available.length === 0) available = pool.slice();
    }
    const moodCats = mood ? (MOODS.find(m => m.key === mood) || {}).cats || [] : [];
    const weighted = [];
    available.forEach(t => {
      const w = moodCats.length && moodCats.includes(t.category) ? 5 : 1;
      for (let i = 0; i < w; i++) weighted.push(t);
    });
    const chosen = weighted[Math.floor(Math.random() * weighted.length)];
    return { chosen, resetCycle };
  }, [pool, cycle, mood]);

  const registerTopic = useCallback((t, resetCycle) => {
    setCycle(prev => (resetCycle ? [t.id] : [...prev, t.id]));
    setExplored(prev => prev.includes(t.id) ? prev : [...prev, t.id]);
    setHistory(prev => [{ id: t.id, title: t.title, category: t.category, ts: Date.now() },
                        ...prev.filter(h => h.id !== t.id)].slice(0, 60));
  }, [setCycle, setExplored, setHistory]);

  const discover = useCallback(() => {
    if (phase === "shuffling") return;
    setTab("descubrir");
    setPhase("shuffling");
    const { chosen, resetCycle } = pickTopic(topic ? topic.id : null);
    if (!chosen) { setPhase("idle"); return; }

    let i = 0;
    const tick = setInterval(() => {
      setSpinLabel(pool[Math.floor(Math.random() * pool.length)].title);
      i++;
    }, 90);
    const t = setTimeout(() => {
      clearInterval(tick);
      setTopic(chosen);
      setVariant(0);
      registerTopic(chosen, resetCycle);
      setPhase("revealed");
      timers.current.push(setTimeout(() => {
        const el = document.getElementById("topic-anchor");
        if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60));
    }, 720);
    timers.current.push(t);
  }, [phase, pickTopic, topic, pool, registerTopic]);

  const openTopic = useCallback((id) => {
    const t = TOPICS.find(x => x.id === id) || TOPICS.find(x => x.title === id);
    if (!t) { toast("Ese tema ya no está disponible."); return; }
    setTopic(t); setVariant(0); setPhase("revealed"); setTab("descubrir");
    setExplored(prev => prev.includes(t.id) ? prev : [...prev, t.id]);
    setHistory(prev => [{ id: t.id, title: t.title, category: t.category, ts: Date.now() },
                        ...prev.filter(h => h.id !== t.id)].slice(0, 60));
    timers.current.push(setTimeout(() => { try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {} }, 50));
  }, [setExplored, setHistory, toast]);

  const toggleFav = useCallback(() => {
    if (!topic) return;
    setFavorites(prev => {
      if (prev.some(f => f.id === topic.id)) { toast("Eliminado de favoritos."); return prev.filter(f => f.id !== topic.id); }
      toast("Tema guardado en favoritos.");
      return [{ id: topic.id, title: topic.title, category: topic.category, ts: Date.now() }, ...prev];
    });
  }, [topic, setFavorites, toast]);

  const resetJourney = () => {
    setCycle([]); setExplored([]); setHistory([]); setTopic(null); setPhase("idle");
    setConfirmReset(false); toast("Recorrido reiniciado.");
  };

  const copyFromList = async (id) => {
    const t = TOPICS.find(x => x.id === id);
    if (!t) return;
    const ok = await copyText(buildPrompt(t, mode, 0));
    toast(ok ? "Prompt copiado." : "No se pudo copiar.");
  };

  const exploredCount = explored.length;
  const pct = Math.round((exploredCount / TOPICS.length) * 100);

  /* ---------- render ---------- */
  return (
    <div className="min-h-screen bg-[#05070f] text-white">
      {/* fondo */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px] glow" />
        <div className="absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-fuchsia-600/10 blur-[120px] glow" style={{animationDelay:'1.5s'}} />
        <div className="absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px] glow" style={{animationDelay:'3s'}} />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-32 pt-8 sm:px-6 sm:pt-12 sm:pb-16">
        {/* header */}
        <header className="anim-fade text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-[11px] uppercase tracking-[.18em] text-white/45">
            <Compass size={13} /> Ruleta de descubrimiento
          </div>
          <h1 className="serif grad-text mt-4 text-[46px] sm:text-[64px] font-bold leading-none tracking-tight">Curio</h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/50">
            Cambiá unos minutos de distracción por una idea que valga la pena explorar.
          </p>
        </header>

        {/* nav */}
        <nav className="anim-fade d1 mt-7 flex justify-center">
          <div className="inline-flex gap-1 rounded-2xl border border-white/10 bg-white/[.03] p-1">
            {[["descubrir","Descubrir",<Home size={15} key="a"/>],
              ["historial","Historial",<HistoryI size={15} key="b"/>],
              ["favoritos","Favoritos",<Star size={15} key="c"/>]].map(([k,label,icon]) => (
              <button key={k} onClick={() => setTab(k)}
                className={`tap inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all duration-300 ${
                  tab === k ? "bg-white/[.12] text-white shadow-lg shadow-black/30" : "text-white/45 hover:text-white/80"}`}>
                {icon}<span>{label}</span>
                {k === "favoritos" && favorites.length > 0 &&
                  <span className="ml-0.5 rounded-full bg-amber-300/20 px-1.5 text-[10px] text-amber-200">{favorites.length}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* progreso */}
        <div className="anim-fade d2 mt-6 flex items-center justify-center gap-3 text-[12px] text-white/40">
          <div className="h-1 w-28 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400 transition-all duration-700"
                 style={{ width: `${Math.max(pct, exploredCount ? 4 : 0)}%` }} />
          </div>
          <span>{exploredCount} de {TOPICS.length} temas explorados</span>
          {exploredCount > 0 && (
            <button onClick={() => setConfirmReset(true)} className="tap inline-flex items-center gap-1 text-white/35 transition hover:text-white/70">
              <Rotate size={12} /> Reiniciar
            </button>
          )}
        </div>

        {confirmReset && (
          <div className="anim-pop mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-rose-400/20 bg-rose-500/[.07] px-4 py-3">
            <p className="text-sm text-white/75">Se borrarán tu historial, tus favoritos y el progreso. ¿Seguro?</p>
            <div className="flex gap-2">
              <button onClick={resetJourney} className="tap rounded-xl bg-rose-500/85 px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-rose-500">Sí, reiniciar</button>
              <button onClick={() => setConfirmReset(false)} className="tap rounded-xl border border-white/12 px-3.5 py-2 text-[13px] text-white/70 hover:bg-white/[.06]">Cancelar</button>
            </div>
          </div>
        )}

        {/* ---------------- DESCUBRIR ---------------- */}
        {tab === "descubrir" && (
          <main className="mt-8">
            {/* categorías */}
            <div className="anim-fade d3">
              <p className="mb-2.5 px-1 text-[11px] font-semibold uppercase tracking-[.16em] text-white/30">Categoría</p>
              <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
                <Chip active={category === "Todas"} onClick={() => setCategory("Todas")}>Todas</Chip>
                {CATEGORIES.map(c => (
                  <Chip key={c.key} active={category === c.key} onClick={() => setCategory(c.key)}>
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />{c.key}
                    </span>
                  </Chip>
                ))}
              </div>
            </div>

            {/* estado de ánimo */}
            <div className="anim-fade d4 mt-6 rounded-3xl border border-white/[.08] bg-white/[.02] p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-medium text-white/70">¿Qué necesitás en este momento?</p>
                {mood && (
                  <button onClick={() => setMood(null)} className="tap inline-flex items-center gap-1 text-[11px] text-white/35 hover:text-white/70">
                    <X size={12} /> Limpiar
                  </button>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {MOODS.map(m => (
                  <Chip key={m.key} active={mood === m.key} onClick={() => setMood(mood === m.key ? null : m.key)}>
                    {m.label}
                  </Chip>
                ))}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-white/30">
                Es una preferencia, no un filtro: siempre queda espacio para que aparezca algo inesperado.
              </p>
            </div>

            {/* CTA */}
            <div className="anim-fade d5 mt-6">
              <button onClick={discover} disabled={phase === "shuffling"}
                className="tap group relative w-full overflow-hidden rounded-3xl px-6 py-6 sm:py-7 text-center transition-transform duration-200 active:scale-[.985] disabled:cursor-wait">
                <span className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-20%,rgba(255,255,255,.4),transparent_55%)]" />
                <span className="relative inline-flex items-center justify-center gap-3 text-[17px] sm:text-[19px] font-semibold tracking-tight text-white">
                  {phase === "shuffling"
                    ? <><Refresh size={20} className="spin-slow" /> Buscando algo bueno…</>
                    : <><Sparkles size={20} /> Descubrir un tema</>}
                </span>
              </button>
              {phase === "shuffling" && spinLabel && (
                <p className="anim-flick mt-3 text-center text-sm text-white/40">{spinLabel}</p>
              )}
            </div>

            <div id="topic-anchor" className="scroll-mt-6" />

            {/* contenido */}
            <div className="mt-6">
              {phase === "revealed" && topic && (
                <TopicCard
                  topic={topic}
                  isFav={isFav}
                  onFav={toggleFav}
                  onNext={discover}
                  onOpenRelatedNext={() => openTopic(topic.next)}
                  toast={toast}
                  promptProps={{ mode, setMode, variant, nextVariant: () => { setVariant(v => v + 1); toast("Prompt regenerado."); }, prompt }}
                />
              )}

              {phase !== "revealed" && (
                <Ghost
                  icon={<Compass size={26} />}
                  title="Todavía no elegiste nada"
                  text="Tocá “Descubrir un tema” y Curio te va a proponer una idea al azar, con un prompt listo para investigar."
                />
              )}
            </div>
          </main>
        )}

        {/* ---------------- HISTORIAL ---------------- */}
        {tab === "historial" && (
          <main className="anim-fade mt-8">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/30">Descubiertos recientemente</p>
              {history.length > 0 && (
                <button onClick={() => { setHistory([]); toast("Historial vaciado."); }}
                  className="tap inline-flex items-center gap-1 text-[11px] text-white/35 hover:text-white/70"><Trash size={12} /> Vaciar</button>
              )}
            </div>
            {history.length === 0 ? (
              <Ghost icon={<HistoryI size={26} />} title="Tu historial está vacío"
                     text="Los temas que descubras van a aparecer acá, con fecha y acceso directo."
                     action={<button onClick={() => setTab("descubrir")} className="tap mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[.05] px-4 py-2.5 text-sm text-white/80 hover:bg-white/[.1]"><Sparkles size={15} /> Descubrir el primero</button>} />
            ) : (
              <ul className="space-y-2">
                {history.map(h => {
                  const meta = catMeta(h.category);
                  return (
                    <li key={h.id + h.ts} className="anim-fade group flex items-center gap-3 rounded-2xl border border-white/[.08] bg-white/[.02] p-3.5 transition hover:border-white/20 hover:bg-white/[.05]">
                      <span className={`h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br ${meta.hue} border border-white/10`} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-medium text-white/90">{h.title}</p>
                        <p className="mt-0.5 text-[12px] text-white/40">
                          <span className={meta.text}>{h.category}</span> · {fmtDate(h.ts)}
                        </p>
                      </div>
                      <button onClick={() => openTopic(h.id)}
                        className="tap shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-[12px] text-white/70 transition hover:bg-white/[.12] hover:text-white">
                        Abrir <Arrow size={13} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </main>
        )}

        {/* ---------------- FAVORITOS ---------------- */}
        {tab === "favoritos" && (
          <main className="anim-fade mt-8">
            <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[.16em] text-white/30">Temas guardados</p>
            {favorites.length === 0 ? (
              <Ghost icon={<Star size={26} />} title="Sin favoritos todavía"
                     text="Cuando un tema te enganche, guardalo y vas a poder volver a él y copiar su prompt cuando quieras."
                     action={<button onClick={() => setTab("descubrir")} className="tap mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[.05] px-4 py-2.5 text-sm text-white/80 hover:bg-white/[.1]"><Compass size={15} /> Ir a descubrir</button>} />
            ) : (
              <ul className="space-y-2">
                {favorites.map(f => {
                  const meta = catMeta(f.category);
                  const full = TOPICS.find(t => t.id === f.id);
                  return (
                    <li key={f.id} className="anim-fade rounded-2xl border border-white/[.08] bg-white/[.02] p-4 transition hover:border-white/20 hover:bg-white/[.05]">
                      <div className="flex items-start gap-3">
                        <span className={`mt-0.5 h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br ${meta.hue} border border-white/10`} />
                        <div className="min-w-0 flex-1">
                          <p className="text-[15px] font-medium text-white/90">{f.title}</p>
                          <p className="mt-0.5 text-[12px] text-white/40"><span className={meta.text}>{f.category}</span> · guardado el {fmtDate(f.ts)}</p>
                          {full && <p className="mt-2 text-[13px] leading-relaxed text-white/45 line-clamp-2">{full.desc}</p>}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button onClick={() => openTopic(f.id)} className="tap inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[.05] px-3 py-2 text-[12px] text-white/75 hover:bg-white/[.12]"><Arrow size={13} /> Abrir</button>
                        <button onClick={() => copyFromList(f.id)} className="tap inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[.05] px-3 py-2 text-[12px] text-white/75 hover:bg-white/[.12]"><Copy size={13} /> Copiar prompt</button>
                        <button onClick={() => { setFavorites(prev => prev.filter(x => x.id !== f.id)); toast("Eliminado de favoritos."); }}
                          className="tap inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[.03] px-3 py-2 text-[12px] text-white/45 hover:border-rose-400/25 hover:bg-rose-500/10 hover:text-rose-200"><Trash size={13} /> Quitar</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </main>
        )}

        <footer className="mt-14 text-center">
          <p className="mx-auto max-w-sm text-[11px] leading-relaxed text-white/25">
            Curio es una herramienta de curiosidad y aprendizaje. No es un servicio de salud ni reemplaza el acompañamiento profesional.
          </p>
        </footer>
      </div>

      {/* barra inferior móvil */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[.08] bg-[#05070f]/85 backdrop-blur-xl sm:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2.5" style={{paddingBottom:'max(10px, env(safe-area-inset-bottom))'}}>
          {[["descubrir","Descubrir",<Compass size={19} key="1"/>],
            ["historial","Historial",<HistoryI size={19} key="2"/>],
            ["favoritos","Favoritos",<Star size={19} key="3"/>]].map(([k,label,icon]) => (
            <button key={k} onClick={() => { setTab(k); window.scrollTo({top:0,behavior:'smooth'}); }}
              className={`tap flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-medium transition ${tab===k?"text-white":"text-white/35"}`}>
              {icon}{label}
            </button>
          ))}
        </div>
      </div>

      <Toast msg={toastMsg} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
