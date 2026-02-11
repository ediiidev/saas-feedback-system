## Project info
# 🚀 SaaS Feedback System - Fullstack

Este proyecto es una solución integral diseñada para capturar, gestionar y analizar las impresiones de los usuarios en tiempo real. He desarrollado tanto el núcleo del servidor como la integración con la base de datos en la nube para garantizar una experiencia fluida y profesional.

## 🛠️ Tecnologías y Configuración
* **Frontend:** React + TypeScript con **Vite**, utilizando **Tailwind CSS** para una interfaz moderna y responsiva.
* **Backend:** Arquitectura basada en **Node.js** y **Express**, configurada con rutas RESTful.
* **Base de Datos:** **PostgreSQL** alojado en **Supabase**, conectada mediante la librería oficial de `@supabase/supabase-js` para asegurar la conectividad a través de protocolos HTTPS seguros.

## 🌟 Características Principales

### 🗄️ Gestión de Base de Datos
* Esquema relacional optimizado para feedbacks con campos para nombre, categoría (SaaS, UI, Error) y mensajes.
* Conexión robusta que evita bloqueos de firewall mediante el uso del puerto 443.

## 🌐 Despliegue (Deployment)
* **Frontend:** Hosting en **Vercel/Netlify** con CI/CD.
* **Backend:** Servidor en **Render** configurado con variables de entorno protegidas.
* **Database:** Instancia en la nube de **Supabase** con persistencia de datos garantizada.


**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```
