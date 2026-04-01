# PROGRESS.md — Planner Personal · Gonzalo
> Tareas pendientes al 26 de marzo de 2026. Tildá cada ítem a medida que lo completás.

---

## Deploy

- [x] Crear repositorio en GitHub — repo público `daily-planner` → `gonzapala.github.io/daily-planner`
- [x] Subir los archivos al repo — `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`, fuentes locales, Tailwind compilado
- [x] Activar GitHub Pages — GitHub Actions workflow con build de Tailwind + deploy automático
- [x] Reemplazar CDN por assets locales — Tailwind v3 via npm, Google Fonts descargadas como woff2

---

## PWA

- [x] Crear manifest.json, sw.js, íconos PNG — PWA instalable con cache-first strategy
- [ ] Instalar el planner en el teléfono — abrir la URL en Chrome → menú ⋮ → Agregar a pantalla de inicio
- [ ] Migrar service worker a Vite PWA Plugin *(fase React)* — usar `vite-plugin-pwa` con workbox para estrategias de caché más robustas
- [ ] Notificaciones push *(fase 2)* — notificaciones locales para recordatorios de hábitos y planificación semanal, no requiere backend

---

## IA / Chat

- [x] Obtener API key de Anthropic — inyectada via GitHub Actions secret (no expuesta en código fuente)
- [ ] Obtener API key de YouTube *(opcional)* — `console.cloud.google.com` → habilitar YouTube Data API v3 → crear API key para videos de recetas

---

## Planner

- [ ] Planificar la semana actual — abrir el planner → tocar ⚡ Autocompletar o cargar manualmente cada día
- [ ] Hacer el Sunday Prep esta semana — arrollado + pastel de arroz + hamburguesas de lentejas + verduras lavadas (75 min el domingo)
- [ ] Hacer las compras del sábado o domingo — usar la lista del tab Compras con cantidades exactas calculadas

---

## Migración a React (Claude Code)

- [ ] Leer el `SPEC.md` y arrancar con Claude Code
  ```
  claude "Leé el SPEC.md y construí el proyecto siguiendo el orden de implementación. Empezá por el paso 1."
  ```
- [ ] Setup base — Vite + React + TypeScript + Tailwind con paleta avocado y fuentes Space Mono / Outfit
- [ ] Crear funciones serverless en `/api` — `/api/chat`, `/api/youtube`, `/api/sheets` para no exponer API keys en el cliente
- [ ] Deploy en Vercel con variables de entorno — `npm i -g vercel` → `vercel login` → `vercel --prod` → agregar las 4 env vars en el dashboard

---

## Google Sheets BD

- [ ] Crear el spreadsheet de Google Sheets — hojas: `comidas_principales`, `recetas`, `habitos`, `objetivos_template`, `lista_compras` (schema en `SPEC.md` sección 6)
- [ ] Cargar comidas principales y recetas — migrar los platos del planner y las recetas del tab Batch al spreadsheet
- [ ] Conectar Google Sheets al planner — implementar hook `useGoogleSheets` con cache local de 1 hora y fallback offline

---

## Planner — mejoras futuras

- [ ] Importar CSV para reemplazar planes semanales A/B — CSV generado por Claude AI con formato definido (semana, día, almuerzo, cena, badges). Parseo + validación + preview en pestaña Configuración. Plan custom se guarda en localStorage con opción de restaurar original. Ver plan detallado en `.claude/plans/humble-foraging-sutherland.md`
- [ ] Agregar más recetas y postres saludables — Gonzalo tiene registros de comidas e ideas de postres para incorporar
- [ ] Registrar peso semanal en Objetivos — campo de seguimiento de peso para ver progreso hacia los 85 kg

---

## Completadas

- [x] Crear repositorio en GitHub (`gonzapala/daily-planner`)
- [x] Subir archivos al repo con GitHub Actions deploy
- [x] Activar GitHub Pages con workflow automático
- [x] Reemplazar Tailwind CDN → Tailwind v3 npm + build compilado (23KB)
- [x] Reemplazar Google Fonts CDN → woff2 locales (Outfit + Space Mono)
- [x] Crear manifest.json, sw.js, icon-192.png, icon-512.png
- [x] Inyectar API key de Anthropic via GitHub Actions secret

---

_Última actualización: 1 Abr 2026_
