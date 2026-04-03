# 🚀 SpaceX Mission Explorer

Una plataforma moderna, rápida y elegante para explorar el archivo de misiones de **SpaceX**. Construida con las tecnologías más recientes del ecosistema React para ofrecer una experiencia de usuario fluida y de alto rendimiento.

![SpaceX UI Banner](https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3)

---

## ✨ Características Principales

- **🔍 Búsqueda Dinámica:** Filtra misiones por nombre, año de lanzamiento, modelo de cohete o resultado de la misión en tiempo real.
- **❤️ Gestión de Favoritos:** Guarda tus lanzamientos preferidos. Gracias al uso de **React Context**, tus favoritos se sincronizan instantáneamente en todas las vistas.
- **📍 Mapa Interactivo:** Visualiza la ubicación exacta de las plataformas de lanzamiento con **Google Maps JS API**.
- **⚡ Rendimiento Optimizado:** 
  - **Single Request Architecture:** Uso de `/query` para obtener datos complejos en una sola petición.
  - **Data Memoization:** Uso de `useMemo` para optimizar filtros.
  - **Skeleton Screens:** Carga suave y profesional.
- **🐳 Docker Ready:** Preparado para despliegue en contenedores.
- **🚀 CI/CD Integrado:** Pipeline automático para asegurar la calidad del código.

---

## 🛠️ Stack Tecnológico

| Tecnología | Descripción |
| :--- | :--- |
| **Next.js 15** | Framework de React profesional con App Router. |
| **React 19** | Última versión con mejoras de rendimiento y concurrencia. |
| **Tailwind CSS 4** | Estilado moderno con arquitectura basada en variables CSS. |
| **TypeScript** | Tipado estático riguroso para mayor seguridad. |
| **Docker** | Contenerización para despliegues consistentes. |
| **GitHub Actions** | Automatización de flujos de CI/CD. |

---

## 🐳 Docker (Contenerización)

Puedes ejecutar la aplicación en un contenedor Docker siguiendo estos pasos:

### 1. Construir la imagen
```bash
docker build -t spacex-explorer .
```

### 2. Correr el contenedor
```bash
docker run -p 3000:3000 --env-file .env.local spacex-explorer
```
> [!NOTE]
> La aplicación estará disponible en [http://localhost:3000](http://localhost:3000). Asegúrate de que el archivo `.env.local` contenga tu `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

---

## 📐 Calidad de Código

Mantenemos un estándar alto de calidad mediante herramientas de análisis estático.

### Linter
Para verificar la calidad del código y seguir las mejores prácticas:
```bash
npm run lint
```

---

## 🚀 CI/CD Pipeline

El proyecto incluye un flujo de trabajo de **GitHub Actions** configurado en `.github/workflows/ci.yml`.

**El flujo se activa en:**
- Cada `push` a las ramas `main` o `master`.
- Cada `pull_request` hacia `main` o `master`.

**Fases del Pipeline:**
1. 📥 **Install:** Instalación limpia de dependencias.
2. 🔍 **Lint:** Verificación de reglas de estilo y errores estáticos con ESLint.
3. 🏗️ **Build:** Compilación optimizada para producción.

---

## 🏗️ Arquitectura del Proyecto

```text
src/
├── app/            # Rutas, Layouts y Páginas (App Router)
├── components/     # UI reusable, Layout y Skeletons
├── hooks/          # Lógica de negocio (useLaunches, useFavorites)
├── lib/            # Configuraciones globales (Axios)
└── types/          # Definiciones de interfaces TypeScript
.github/workflows/  # Automatización de CI/CD
```

---

## 🏗️ Instalación Local (Sin Docker)

1. **Clonar:** `git clone https://github.com/tu-usuario/spacex-explorer.git`
2. **Instalar:** `npm install`
3. **Configurar:** Crea un archivo `.env.local` con `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
4. **Ejecutar:** `npm run dev`

---

## ✅ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo.
- `npm run build` - Compilación optimizada para producción.
- `npm run start` - Ejecuta la versión compilada.
- `npm run lint` - Ejecuta el análisis estático de código.

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---
> [!TIP]
> Desarrollado con ❤️ para los entusiastas del espacio. ¡Que disfrutes explorando el cosmos!
