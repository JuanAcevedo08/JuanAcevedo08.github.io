# Juan Acevedo · Machine Learning Engineer Portfolio

Portafolio personal con temática espacial: empieza en el espacio profundo y, a medida que bajas, el cielo se vuelve atardecer hasta "aterrizar" en una granja con una moto en la carretera.

**Live:** https://juanacevedo08.github.io/

Sitio 100 % estático (HTML + CSS + JS, sin frameworks ni build). GitHub Pages lo sirve desde la carpeta `docs/`.

## Estructura

```
docs/
├── index.html            ← esqueleto de la página (casi nunca hay que tocarlo)
├── data/                 ← 👈 TODO EL CONTENIDO VIVE AQUÍ
│   ├── profile.js        ← nombre, frase, bio, gustos, redes, CV, foto
│   ├── skills.js         ← skills por categoría ("constelaciones")
│   ├── projects.js       ← proyectos ("misiones")
│   ├── journey.js        ← estudios, experiencia y ruta de aprendizaje
│   └── certifications.js ← certificados
└── assets/
    ├── css/main.css      ← diseño (colores en las variables de :root)
    ├── js/               ← motor: render, fondo de estrellas, efectos
    └── certificates/     ← imágenes/PDF de certificados
```

## Cómo agregar cosas (sin tocar el diseño)

### ➕ Un proyecto nuevo
Abre `docs/data/projects.js`, copia un bloque `{ ... }` y pégalo **al inicio** de la lista:

```js
{
  title: "Mi nuevo proyecto",
  category: "Deep Learning",          // crea el botón de filtro automáticamente
  year: "2026",                        // opcional
  featured: false,                     // true = tarjeta grande
  summary: "Qué hace y por qué importa, en 1-2 frases.",
  highlights: ["Logro 1", "Logro 2"],  // opcional
  metric: { value: "92%", label: "F1-score" }, // opcional
  stack: ["Python", "PyTorch"],
  links: { repo: "https://github.com/...", demo: "https://huggingface.co/spaces/..." }
},
```

El número de misión, los filtros y los contadores del inicio se calculan solos.

### ➕ Una skill
En `docs/data/skills.js` agrega `{ name: "MLflow", icon: "...", level: "learning" }` dentro de la categoría que quieras.
- `icon` es opcional: busca el nombre en https://devicon.dev (ej. `"docker/docker-original"`). Si no hay ícono, se muestra la inicial.
- `level`: `"core"` (lo manejo) o `"learning"` (lo estoy aprendiendo).
- Para una **categoría nueva**, copia un bloque `{ category, description, items: [...] }` completo.

### ➕ Estudios, cursos o experiencia
En `docs/data/journey.js` copia un bloque. `type`: `"education"`, `"experience"` o `"learning"`. `status`: `"done"`, `"now"` o `"next"`.

### ➕ Un certificado
En `docs/data/certifications.js` copia un bloque. Si es un archivo, ponlo en `docs/assets/certificates/` y usa `url: "assets/certificates/archivo.jpg"`.

### 🖼️ Tu foto / CV / frase
En `docs/data/profile.js`:
- `avatar: "assets/img/yo.jpg"` (mientras sea `null` se muestra el casco de astronauta con tus iniciales).
- `resume: "assets/cv.pdf"` muestra el botón *Resume*.
- `tagline` cambia la frase principal.
- Para agregar email, descomenta la línea `mailto:` en `social`.

## Ver el sitio en local

```bash
cd docs
python3 -m http.server 8000
# abre http://localhost:8000
```
(También funciona abriendo `docs/index.html` con doble clic.)

## Publicar
Haz commit y push a `main`. En GitHub → *Settings → Pages* la fuente debe ser **Deploy from a branch → `main` / `/docs`**.

## Easter eggs 🏍️🌾
Escribe `moto` o `farm` en cualquier parte de la página (o el código Konami).

---
Licencia MIT.
