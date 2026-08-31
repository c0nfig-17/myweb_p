# Iber-STRategia · Pendientes antes de publicar

Este documento recoge todo lo que queda por confirmar en la web. Está ordenado
por urgencia: lo del primer bloque conviene resolverlo **antes** de que la web
sea pública; el resto puede hacerse después sin bloquear la salida.

Los datos que faltan aparecen marcados en las propias páginas, en rojo y entre
corchetes, con la clase `pendiente`. Son fáciles de localizar:

```sh
grep -rn "pendiente" *.html
```

Cuando no quede ninguno, se puede borrar el bloque `.pendiente` de
`assets/css/iber.css`.

---

## 1. Crítico: antes de que la web sea pública

### 1.1 Dominio definitivo

Toda la web usa provisionalmente `https://www.iber-strategia.es`. Si el dominio
real es otro, hay que sustituirlo en tres sitios:

- La etiqueta `<link rel="canonical">` y las `og:url` / `og:image` de cada `.html`.
- La línea `Sitemap:` de `robots.txt`.
- Las etiquetas `<loc>` de `sitemap.xml`.

Se hace de una vez con:

```sh
cd myweb_p
grep -rl "www.iber-strategia.es" . | xargs sed -i 's|www\.iber-strategia\.es|TU-DOMINIO-REAL.es|g'
```

> **Importante:** una etiqueta `canonical` apuntando a un dominio equivocado
> puede impedir que Google indexe la web. Es el primer cambio que hay que hacer.

### 1.2 Datos legales de la empresa

Los textos legales están redactados conforme al RGPD, la LOPDGDD y la LSSI-CE,
pero necesitan datos que no tenemos. No los hemos inventado a propósito: un NIF
o unos datos registrales falsos en un aviso legal son un problema real.

| Dato | Dónde aparece | Estado |
|---|---|---|
| Razón social completa (p. ej. «Iber-STRategia, S.L.») | `privacidad.html`, `aviso-legal.html`, `contacto.html` | Pendiente |
| NIF / CIF | `privacidad.html`, `aviso-legal.html`, `contacto.html` | Pendiente |
| Datos registrales (Registro Mercantil, tomo, folio, hoja) | `aviso-legal.html` | Pendiente. Si es empresario individual, se borra esa fila |
| Delegado de Protección de Datos | `privacidad.html` | Solo si se ha designado. Si no, borrar la fila |
| Lista de encargados del tratamiento (alojamiento, correo, gestoría, CRM) | `privacidad.html`, apartado 5 | Pendiente |
| Proveedor de alojamiento y país | `cookies.html`, apartado 3 | Pendiente |

También conviene que un asesor legal revise los tres textos antes de publicarlos.
Están redactados con el contenido que la normativa española exige, pero cada
empresa tiene particularidades.

### 1.3 Correo y teléfono definitivos

Los datos actuales son los provisionales que nos facilitaste:

- **Correo:** `Iber-STRategia@gmail.com`
- **Teléfono:** `911 122 3345`

Sobre el teléfono: el número facilitado (`9111223345`) tiene **10 dígitos**,
mientras que los números fijos españoles tienen 9. Se ha publicado tal cual,
agrupado para que se lea bien, pero conviene revisarlo. Cuando tengáis los
definitivos:

```sh
grep -rl "Iber-STRategia@gmail.com" . | xargs sed -i 's|Iber-STRategia@gmail.com|NUEVO@dominio.es|g'
grep -rn "9111223345\|911 122 3345" .
```

El correo aparece además dentro de `assets/js/contacto.js` (constante `DESTINO`).

Recomendación: un correo corporativo con el dominio propio
(`hola@tudominio.es`) transmite bastante más solidez que una cuenta de Gmail en
la web de una consultora tecnológica.

### 1.4 Certificado HTTPS

La política de privacidad afirma que las comunicaciones van cifradas con TLS.
Hay que asegurarse de que el alojamiento tiene el certificado activo y de que
todo el tráfico HTTP redirige a HTTPS.

---

## 2. Formulario de contacto

El formulario de `contacto.html` **todavía no envía a ningún servidor**. Como
solución provisional para poder publicar hoy, `assets/js/contacto.js` abre el
programa de correo del visitante con el mensaje ya redactado.

Funciona sin servidor, pero tiene dos límites: no deja registro de las
solicitudes y depende de que el visitante tenga un cliente de correo
configurado. Para dejarlo definitivo:

1. Dar de alta un endpoint de formularios (el del propio hosting, un servicio
   de formularios o un script en el servidor).
2. En `contacto.html`, poner ese endpoint en `action` y `method="post"`.
3. Quitar la línea `<script src="assets/js/contacto.js"></script>`.
4. Añadir protección antispam (captcha o campo trampa).
5. Firmar el contrato de encargado de tratamiento con ese proveedor y añadirlo
   a la lista del apartado 5 de `privacidad.html`.

Mientras tanto, el correo y el teléfono de la página de contacto sí funcionan y
son perfectamente utilizables.

---

## 3. Decisiones de contenido que conviene que revises

Estas son cosas que hemos escrito nosotros para que la web tuviera sentido.
Ninguna es un dato que nos hayas dado, así que revísalas y cámbialas si no
encajan con la realidad de la empresa.

- **«Diseño de maquetados».** Lo hemos interpretado como *maquetación de
  puestos de trabajo* (imagen maestra para desplegar equipos), que es lo que
  encaja entre Active Directory y despliegue de infraestructura. Si te referías
  a maquetación web o de interfaces, avísanos y reescribimos ese apartado de
  `servicios.html`.
- **«Respondemos en menos de 24 horas laborables».** Aparece en la portada y en
  la página de contacto. Es un compromiso público: confírmalo o cámbialo.
- **Horario de oficina: lunes a viernes, de 9:00 a 18:00** (`contacto.html`).
- **Cifras de `nosotros.html`:** solo usamos las que nos diste (+50 clientes) y
  dos que describen el método (6 áreas de servicio, 1 interlocutor por cliente).
  No hemos inventado años de experiencia ni tamaño del equipo. Si quieres
  añadirlos, es un buen sitio.
- **Compromisos del apartado de talento** (formación pagada dentro de la
  jornada, trabajo en pareja técnica, etc.): son creíbles para una consultora
  de vuestro perfil, pero sois vosotros quienes tenéis que poder sostenerlos.
- **Cómo llegar** (`contacto.html` y `nosotros.html`): menciona Nuevos
  Ministerios y Santiago Bernabéu como estaciones cercanas. Verificadlo.

---

## 4. Redes sociales

El pie de página tiene preparados los iconos de LinkedIn y Twitter, comentados
en el HTML. Para activarlos, buscar `PENDIENTE: sustituir "#"` en cualquier
`.html`, poner las URL reales y quitar las marcas de comentario. Están en todas
las páginas.

---

## 5. Recomendaciones técnicas (no bloquean la salida)

- **Tipografía Roboto.** Se carga desde Google Fonts (`assets/css/main.css`,
  línea 2). Eso implica una conexión a servidores de Google y la comunicación
  de la IP del visitante, algo ya declarado en la política de cookies y en la
  de privacidad. Si preferís evitarlo, se puede descargar la fuente y servirla
  desde `assets/webfonts/`, sustituyendo el `@import`. Es la opción más limpia
  desde el punto de vista de protección de datos.
- **Imagen para redes sociales.** Las etiquetas `og:image` apuntan de momento a
  `images/banner.jpg`. Lo ideal es una imagen de 1200×630 px con el logotipo y
  el lema, en JPG o PNG (las redes sociales no leen SVG).
- **Si algún día añadís analítica** (Google Analytics, píxeles de publicidad,
  mapas de calor…), pasa a ser **obligatorio** un panel de consentimiento de
  cookies, y habrá que actualizar `cookies.html`. Los estilos del aviso ya
  están preparados en `assets/css/iber.css` (bloque `#aviso-cookies`); solo
  falta el HTML y la lógica de consentimiento.
- **Página 404.** Existe `404.html`, pero hay que configurar el servidor para
  que la use. En Apache, añadir a `.htaccess`: `ErrorDocument 404 /404.html`.
- **Sitemap.** Una vez publicada la web, darla de alta en Google Search Console
  y enviar `sitemap.xml`.

---

## 6. Cómo está organizada la web

| Archivo | Contenido |
|---|---|
| `index.html` | Portada: lema, quiénes somos, servicios, talento y llamada a la acción |
| `servicios.html` | Los seis servicios en detalle, con anclas propias para enlazar desde el menú |
| `talento.html` | Apartado de talento |
| `nosotros.html` | Quiénes somos, cómo trabajamos, en qué creemos y cifras |
| `contacto.html` | Formulario, datos de contacto e información básica de protección de datos |
| `privacidad.html` | Política de Privacidad y Protección de Datos (RGPD / LOPDGDD) |
| `aviso-legal.html` | Aviso legal (LSSI-CE) |
| `cookies.html` | Política de cookies |
| `404.html` | Página de error |
| `robots.txt`, `sitemap.xml` | Indexación en buscadores |
| `assets/css/iber.css` | Estilos propios. **La plantilla original no se ha modificado**, para poder actualizarla sin perder estos cambios |
| `assets/js/contacto.js` | Envío provisional del formulario |
| `images/*.svg` | Logotipo, favicon, fondos y diagramas, creados para esta web |

La cabecera y el pie están repetidos en cada archivo `.html`: es lo normal en
una web estática como esta. Si se cambia un enlace del menú, hay que cambiarlo
en las nueve páginas.

Las páginas de demostración de la plantilla (`elements.html`, `left-sidebar.html`,
`right-sidebar.html`, `no-sidebar.html`) y sus imágenes de relleno se han
eliminado, porque contenían texto de ejemplo en latín y no deben quedar
accesibles en una web publicada. Siguen estando en el historial de Git si se
necesitan como referencia de estilos.
