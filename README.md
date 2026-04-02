# 🚀 SpaceX Mission Explorer

Una plataforma moderna, rápida y elegante para explorar el archivo de misiones de **SpaceX**. Construida con las tecnologías más recientes del ecosistema React para ofrecer una experiencia de usuario fluida y de alto rendimiento.

![SpaceX UI Banner](https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3)

---

## ✨ Características Principales

- **🔍 Búsqueda Dinámica:** Filtra misiones por nombre, año de lanzamiento, modelo de cohete o resultado de la misión en tiempo real.
- **❤️ Gestión de Favoritos:** Guarda tus lanzamientos preferidos. Gracias al uso de **React Context**, tus favoritos se sincronizan instantáneamente en todas las vistas de la aplicación.
- **📍 Mapa Interactivo:** Visualiza la ubicación exacta de las plataformas de lanzamiento utilizando la integración de **Google Maps JS API**.
- **⚡ Rendimiento Optimizado:** 
  - **Single Request Architecture:** Uso del endpoint `/query` de SpaceX API para obtener datos complejos (cohetes y plataformas) en una sola petición HTTP.
  - **Data Memoization:** Implementación de `useMemo` para evitar recalcular filtros innecesariamente.
  - **Skeleton Screens:** Experiencia de carga suave y profesional que elimina los saltos de interfaz.

---

## 🛠️ Stack Tecnológico

| Tecnología | Descripción |
| :--- | :--- |
| **Next.js 15** | El framework de React para la web, utilizando el App Router. |
| **React 19** | Última versión de la librería, aprovechando las mejoras de concurrencia. |
| **Tailwind CSS 4** | Estilado de última generación con una arquitectura basada en variables CSS. |
| **TypeScript** | Tipado estático riguroso para un código más seguro y mantenible. |
| **Lucide React** | Set de iconos minimalistas y consistentes. |
| **Axios** | Cliente HTTP configurado para interactuar con la SpaceX v4 API. |

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una estructura modular y escalable:

```text
src/
├── app/            # Rutas, Layouts y Páginas (App Router)
├── components/     # Componentes de UI reutilizables y Skeletons
├── hooks/          # Lógica de negocio (useLaunches, useFavorites)
├── lib/            # Configuraciones (Axios instance)
└── types/          # Definiciones de interfaces TypeScript
```

---

## 🚀 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:

### 1. Clonar y Preparar
```bash
git clone https://github.com/tu-usuario/spacex-explorer.git
cd spacex-explorer
npm install
```

### 2. Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto y añade tu clave de Google Maps:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

### 3. Ejecutar
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## ✅ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo.
- `npm run build` - Crea la versión de producción optimizada.
- `npm run start` - Inicia la aplicación compilada.
- `npm run lint` - Ejecuta el linter para asegurar la calidad del código.

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---
> [!TIP]
> Desarrollado con ❤️ para los entusiastas del espacio. ¡Que disfrutes explorando el cosmos!
