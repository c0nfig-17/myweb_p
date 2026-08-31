# Iber-STRategia · Pendientes antes de publicar

Estado tras la tercera revisión. Lo del primer bloque conviene resolverlo
**antes** de que la web sea pública; el resto puede esperar sin bloquear la
salida.

---

## 1. Crítico: antes de que la web sea pública

### 1.1 Razón social y NIF reales

Ahora mismo la web muestra valores **provisionales** puestos a propósito para
que puedas enseñarla a clientes con aspecto acabado:

| Dato | Valor provisional actual |
|---|---|
| Razón social | `Iber-STRategia, S.L.` |
| NIF / CIF | `B-00000000` |

Ese NIF es un marcador evidente, no un número real. Publicar la web con él
incumpliría el artículo 10 de la LSSI, que obliga a identificar al titular con
datos veraces. En cuanto tu socio te los pase, se cambian de una vez:

```sh
cd myweb_p
grep -rl "B-00000000" . | xargs sed -i 's|B-00000000|TU-NIF-REAL|g'
grep -rl "Iber-STRategia, S.L." . | xargs sed -i 's|Iber-STRategia, S.L.|TU RAZÓN SOCIAL|g'
```

Aparecen en `privacidad.html`, `aviso-legal.html`, `contacto.html` y en el pie
de todas las páginas.

### 1.2 Dominio definitivo

Toda la web usa provisionalmente `https://www.iber-strategia.es`. Si el dominio
real es otro, hay que cambiarlo en las etiquetas `canonical`, en las `og:url`,
en `robots.txt` y en `sitemap.xml`:

```sh
grep -rl "www.iber-strategia.es" . | xargs sed -i 's|www\.iber-strategia\.es|TU-DOMINIO-REAL.es|g'
```

> Una etiqueta `canonical` apuntando a un dominio equivocado puede impedir que
> Google indexe la web. Es el primer cambio que hay que hacer.

### 1.3 Correo corporativo

El correo sigue siendo `Iber-STRategia@gmail.com`. Funciona, pero una cuenta de
Gmail en la web de una consultora tecnológica resta credibilidad justo donde
más se juega la confianza. Con el dominio ya tendrás `hola@tudominio.es` sin
coste añadido:

```sh
grep -rl "Iber-STRategia@gmail.com" . | xargs sed -i 's|Iber-STRategia@gmail.com|hola@tudominio.es|g'
```

Ojo: aparece también dentro de `assets/js/contacto.js` (constante `DESTINO`).

### 1.4 Certificado HTTPS

La política de privacidad afirma que las comunicaciones van cifradas con TLS.
Asegúrate de que el alojamiento tiene el certificado activo y de que todo el
tráfico HTTP redirige a HTTPS.

---

## 2. Resuelto en esta revisión

- **Teléfono corregido** a `911 122 334` (nueve dígitos). Los enlaces usan el
  formato internacional `+34911122334`.
- **Datos registrales**: el aviso legal indica que el domicilio y los datos de
  contacto a efectos registrales son los de la oficina, tal como pediste. Si la
  sociedad está inscrita en el Registro Mercantil, hay un comentario en el HTML
  señalando dónde añadir tomo, folio y hoja.
- **Crédito «Design: HTML5 UP» retirado del pie.** La plantilla se distribuye
  bajo licencia Creative Commons Attribution 3.0, que exige atribución, así que
  la he trasladado al apartado 4 del **Aviso Legal** y al comentario de cabecera
  del código. Conviene que confirmes con la empresa que te hizo el proyecto si
  compraron licencia comercial; si es así, se puede quitar también de ahí.
- **Logotipo en la cabecera**, a la izquierda del nombre, en las 21 páginas.
- **Jerarquía de encabezados corregida**: antes el `<h1>` de cada página era el
  nombre de la empresa, así que ninguna página tenía un encabezado principal con
  su tema. Ahora cada una tiene su propio `<h1>`. Esto es de lo que más pesa en
  posicionamiento.

---

## 3. Formulario de contacto: ATENCIÓN

Tal como pediste, el formulario **simula el envío**: valida los campos, muestra
una confirmación con el texto «Nos pondremos en contacto próximamente con usted»
y oculta el formulario.

> **Lo que escriba el visitante no llega a ningún sitio. Se pierde.**

Es la consecuencia de simular el envío sin servidor detrás, y conviene tenerlo
muy presente: alguien puede escribiros interesado en un servicio, quedarse
tranquilo pensando que le vais a llamar, y no recibir nunca respuesta. Para un
comercial es peor que no tener formulario.

Por eso he dejado el teléfono y el correo directos **dentro del propio mensaje
de confirmación**, para que quien escriba tenga siempre una vía real de
contacto. Aun así, esto debería ser lo primero que se arregle después de los
datos legales.

Para conectarlo de verdad (es cosa de una tarde):

1. Dar de alta un endpoint de formularios (el del hosting, un servicio de
   formularios o un pequeño script en el servidor).
2. En `contacto.html`, poner ese endpoint en `action` y `method="post"`.
3. En `assets/js/contacto.js`, sustituir `simularEnvio()` por la llamada real
   y mostrar la confirmación solo cuando la respuesta sea correcta.
4. Añadir protección antispam (captcha o campo trampa).
5. Firmar el contrato de encargado de tratamiento con ese proveedor y añadirlo
   al apartado 5 de `privacidad.html`.

**Un detalle de redacción:** el texto de la confirmación está en «usted», tal
como me lo pasaste, mientras que el resto de la web trata al visitante de «tú».
Si prefieres unificarlo, la frase sería «Nos pondremos en contacto contigo
próximamente» y está en `contacto.html`.

**Un fallo corregido de paso:** la plantilla dibuja las casillas de verificación
sobre la etiqueta y deja el `<input>` invisible. Como un control invisible no es
enfocable, el navegador bloqueaba el envío en silencio cuando alguien olvidaba
marcar el consentimiento de privacidad: se pulsaba «Enviar mensaje» y no pasaba
absolutamente nada. Ahora sale un aviso en rojo explicando qué falta.

## 4. Logos de Microsoft y Google Workspace

Me pediste ponerlos y **no lo he hecho a propósito**. Dos motivos:

1. Reproducir un logotipo de marca a mano incumple sus guías de uso, y las
   versiones oficiales solo se distribuyen a partners registrados.
2. Mostrar esos emblemas puede dar a entender una certificación o una relación
   comercial que no existe. Es un riesgo legal real y, además, un cliente que lo
   compruebe pierde confianza justo por lo contrario de lo que buscabas.

Lo que sí es correcto y habitual es la sección **«Tecnologías con las que
trabajamos»** que verás en la portada y en la página de servicios: los nombres
en tipografía neutra, con iconos genéricos y un descargo de marcas al pie. Eso
es uso nominativo legítimo.

**Si sois Microsoft Partner o Google Partner de verdad**, los programas os dan
los badges oficiales con sus condiciones de uso. Pásamelos y los coloco en esa
misma sección en un momento; quedan mucho mejor que un logo copiado y sí
transmiten lo que quieres transmitir.

---

## 5. Contenido nuevo que conviene que revises

- **Blog con 10 artículos.** Están escritos para posicionar por problemas
  concretos que la gente busca en Google (errores de dominio, equipos lentos,
  copias que fallan) y todos terminan invitando a contactar. Léelos y cámbialos
  si algo no encaja con vuestra forma de trabajar: hablan en nombre de la
  empresa.
- **Preguntas frecuentes (`faq.html`).** La respuesta sobre precios explica
  *cómo* cobráis (cuota mensual sobre alcance cerrado) pero **no da cifras**,
  porque no me las diste. Si añades horquillas de precio, esa página se
  convierte en una de las que más contactos genera.
- **Compromisos que aparecen escritos** y que tenéis que poder sostener:
  respuesta en menos de 24 horas laborables, horario de 9:00 a 18:00, equipos de
  sustitución incluidos en los contratos de soporte, entrega del código fuente
  en los desarrollos, sin permanencias abusivas y sin comisiones de fabricante.
- **Sectores** listados en `nosotros.html`: despachos, distribución, industria
  ligera, clínicas, ingeniería, comercio, servicios y fundaciones. Ajusta la
  lista a vuestra cartera real.
- **Cifras** de `nosotros.html`: solo las que me diste (+50 clientes) y dos que
  describen el método. No he inventado años de experiencia ni tamaño de equipo;
  si quieres añadirlos, ese es el sitio.

---

## 6. Lo que más te falta para vender (mi recomendación)

Me preguntabas si se te pasa algo necesario para enseñar la web a clientes.
Esto es lo que echo en falta, por orden de impacto:

1. **Casos de éxito.** Es, con diferencia, lo que más convence. No los he
   inventado porque serían falsos y se nota. Con tres fichas de media página
   (situación de partida, qué hicisteis, resultado medible) la web cambia de
   categoría. Si me pasas los datos, las monto.
2. **Testimonios de clientes reales,** con nombre, cargo y empresa, y con su
   permiso por escrito. Mismo motivo: no se pueden fabricar.
3. **Fotos del equipo y de la oficina.** Las ilustraciones que he creado
   funcionan bien y son coherentes con el diseño, pero una foto real de personas
   genera una confianza que ningún gráfico da. Una sesión de un par de horas
   resuelve la página de Nosotros y la de Talento.
4. **Perfil de LinkedIn de la empresa.** El pie ya tiene el icono preparado y
   comentado: solo hay que poner la URL y descomentarlo.
5. **Google Business Profile.** Para una empresa con oficina en Madrid es la
   forma más rápida de aparecer en búsquedas locales del tipo «soporte
   informático Madrid». Es gratis.

---

## 7. Recomendaciones técnicas

- **Tipografía Roboto.** Se carga desde Google Fonts (`assets/css/main.css`,
  línea 2), lo que comunica la IP del visitante a Google. Está declarado en las
  políticas de privacidad y de cookies. Si prefieres evitarlo, se descarga la
  fuente y se sirve desde `assets/webfonts/`.
- **Imagen para redes sociales.** Las etiquetas `og:image` apuntan a imágenes
  del sitio. Lo ideal es una de 1200×630 px con el logotipo y el lema, en JPG o
  PNG (las redes sociales no leen SVG).
- **Si algún día añadís analítica** (Google Analytics, píxeles, mapas de calor),
  pasa a ser **obligatorio** un panel de consentimiento de cookies y hay que
  actualizar `cookies.html`. Los estilos del aviso ya están en
  `assets/css/iber.css` (bloque `#aviso-cookies`); falta el HTML y la lógica.
- **Página 404.** Existe `404.html`, pero hay que configurar el servidor. En
  Apache, en `.htaccess`: `ErrorDocument 404 /404.html`.
- **Search Console.** Una vez publicada, dar de alta la web y enviar
  `sitemap.xml`. Los datos estructurados se pueden comprobar en la prueba de
  resultados enriquecidos de Google.

---

## 8. Cómo está organizada la web

| Archivo | Contenido |
|---|---|
| `index.html` | Portada: lema, empresa, servicios, talento, proceso, tecnologías y últimos artículos |
| `servicios.html` | Los seis servicios en detalle, con anclas para enlazar desde el menú |
| `blog.html` + `blog/` | Índice del blog y los 10 artículos |
| `faq.html` | Preguntas frecuentes (con marcado FAQ para buscadores) |
| `talento.html` | Apartado de talento |
| `nosotros.html` | Quiénes somos, método, valores, sectores y cifras |
| `contacto.html` | Formulario, datos de contacto e información básica de protección de datos |
| `privacidad.html` | Política de Privacidad y Protección de Datos (RGPD / LOPDGDD) |
| `aviso-legal.html` | Aviso legal (LSSI-CE), incluida la atribución de la plantilla |
| `cookies.html` | Política de cookies |
| `404.html` | Página de error |
| `robots.txt`, `sitemap.xml` | Indexación en buscadores (20 URL) |
| `assets/css/iber.css` | Estilos propios. **La plantilla original no se ha modificado** |
| `assets/js/contacto.js` | Envío provisional del formulario |
| `images/ilustracion-*.svg` | Diez ilustraciones: sala técnica, montaje de equipos, red de oficina, consola de administración, nube híbrida, ciclo de soporte, capas de seguridad, maquetación de puestos, esquema de copias e integraciones de software |
| `images/diagrama-*.svg` | Directorio activo, fases de despliegue y ciclo de desarrollo |
| `images/blog-*.svg` | Cabeceras de los artículos, cada una con el motivo de su tema |
| `images/fondo-*.svg` | Fondos de las secciones de portada: sala técnica, red corporativa y circuitería |

**Qué lleva cada página para posicionar:** título y descripción propios,
etiqueta canónica, Open Graph, un único `<h1>`, migas de pan y datos
estructurados de schema.org (ficha de empresa en todas; artículo, blog,
preguntas frecuentes y migas donde corresponde).

La cabecera y el pie están repetidos en cada archivo `.html`: es lo normal en
una web estática. Si se cambia un enlace del menú, hay que cambiarlo en las 21
páginas.
