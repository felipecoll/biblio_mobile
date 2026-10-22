# 📚 biblioMobile - Personal Reading Dashboard & Tracker

**biblioMobile** es una aplicación web moderna, responsive y full-stack diseñada para la gestión, seguimiento e inspección analítica de hábitos de lectura. Permite a los lectores organizar su biblioteca personal en la nube, registrar citas destacadas, buscar portadas automáticamente mediante la API de Open Library y visualizar métricas clave en tiempo real.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## ✨ Características Principales

- 🔐 **Autenticación Multi-usuario:** Sistema de registro e inicio de sesión seguro gestionado con **Supabase Auth**.
- 📖 **Gestión CRUD Completa:** Registro de libros con título, autor, número de páginas, estado (*por leer, leyendo, terminado*), calificación por estrellas y fechas de lectura.
- 📝 **Notas y Citas Destacadas:** Espacio dedicado para agregar múltiples notas, reflexiones o pasajes favoritos por cada ejemplar.
- 🖼️ **Integración con Open Library API:** Búsqueda y asignación automática de portadas de libros con un solo clic.
- 📊 **Dashboard Estadístico en Tiempo Real:** Métricas dinámicas que calculan total de libros, lecturas activas, porcentaje de avance, páginas totales leídas y promedio de valoración.
- 🔍 **Filtros & Búsqueda Dinámica:** Filtrado en tiempo real por término de búsqueda (título/autor) y por estado de lectura.
- 🌙 **Modo Oscuro / Claro:** Soporte nativo para temas claro y oscuro con persistencia en la configuración del usuario.
- 🔄 **Sincronización Manual:** Botón de recarga para forzar la sincronización con la base de datos PostgreSQL de Supabase.

---

## 🛠️ Stack Tecnológico & Librerías

### **Frontend**
* **[React 18](https://react.dev/):** Biblioteca principal para la construcción de componentes e interfaz de usuario.
* **[Vite](https://vitejs.dev/):** Bundler rápido y entorno de desarrollo.
* **[Tailwind CSS](https://tailwindcss.com/):** Framework de utilidad de CSS para diseño moderno, adaptativo y utilitario.
* **[Lucide React](https://lucide.dev/):** Conjunto de iconos vectoriales ligeros y consistentes.

### **Backend & Base de Datos**
* **[Supabase](https://supabase.com/):** Backend-as-a-Service (BaaS) que provee:
  * Base de datos **PostgreSQL** para la persistencia de datos y arreglos de notas (`text[]`).
  * **Supabase Auth** para la gestión de tokens JWT y sesiones de usuario.
  * Políticas de Seguridad a Nivel de Fila (**RLS**) para aislar la información por cada usuario.

### **API Externa**
* **[Open Library API](https://openlibrary.org/dev/docs/api/covers):** Consumo de endpoint REST para la búsqueda y extracción automática de imágenes de portadas de libros.

---

## 🚀 Instalación y Configuración Local

Si deseas ejecutar este proyecto en tu entorno local, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/tu-usuario/biblio-mobile.git](https://github.com/tu-usuario/biblio-mobile.git)
cd biblio-mobile