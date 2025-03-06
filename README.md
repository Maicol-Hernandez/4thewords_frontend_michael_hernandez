(Due to technical issues, the search service is temporarily unavailable.)

# 4thewords - Frontend

Este repositorio contiene la interfaz de usuario para la gestión de leyendas, desarrollada con Vue 3 y Vite. La aplicación permite crear, editar, visualizar y eliminar leyendas, integrando componentes modernos de PrimeVue y una gestión de estado eficiente con Pinia.

## Características Principales

- 🚀 CRUD completo de leyendas
- 🖼️ Subida de imágenes con preview
- 🔍 Sistema avanzado de filtrado
- 📅 Manejo de fechas con validación
- 📱 Diseño completamente responsive
- ✅ Validación de formularios en tiempo real
- 🔄 Actualización en tiempo real del estado

## Tecnologías Utilizadas

- **Vue 3** - Framework principal
- **Vite** - Bundler y entorno de desarrollo
- **PrimeVue** - Componentes UI profesionales
- **Pinia** - Gestión del estado global
- **Axios** - Cliente HTTP para APIs
- **Zod** - Validación de esquemas
- **Tailwind CSS** - Utilidades CSS modernas
- **Vue Router** - Navegación entre vistas

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Maicol-Hernandez/4thewords_frontend_Maicol_Hernandez.git
   cd 4thewords_frontend_Maicol_Hernandez
   ```

2. **Instalar dependencias:**

   Utilizando npm:

   ```bash
   npm install
   ```

   O utilizando yarn:

   ```bash
   yarn install
   ```

3. **Configurar variables de entorno (crear un archivo `.env` en la raíz):**

   ```env
   VITE_API_URL=http://localhost:8080
   ```

4. **Iniciar el servidor de desarrollo:**

   Con Node:

   ```bash
   npm run dev
   ```

   O, alternativamente, usando Docker Compose:

   ```bash
   docker compose up --build
   ```

   El proyecto estará disponible en [http://localhost:3000](http://localhost:3000) (o en el puerto configurado en `vite.config.js`).

## Estructura del Proyecto

```
src/
├── assets/          # Recursos estáticos
├── components/      # Componentes reutilizables
│   ├── legends/     # Componentes específicos de leyendas
│   └── ui/          # Componentes UI genéricos
├── stores/          # Gestión de estado con Pinia
├── views/           # Vistas principales
├── router/          # Configuración de rutas
└── main.js          # Punto de entrada principal
```

## Configuración Importante

### Proxy de Desarrollo

Configuración en `vite.config.js` para evitar problemas de CORS:

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### Variables de Entorno

| Variable           | Descripción                     | Valor por Defecto           |
|--------------------|---------------------------------|-----------------------------|
| VITE_API_URL       | URL base del backend            | <http://localhost:8080/api/v1>|
| VITE_APP_TITLE     | Título de la aplicación         | 4thewords                   |

## Scripts Principales

| Comando           | Descripción                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Inicia servidor de desarrollo en :3000   |
| `npm run build`   | Construye versión para producción        |
| `npm run preview` | Previsualiza build de producción         |
| `npm run lint`    | Ejecuta linter y formateador de código   |

## Componentes Clave

### LegendForm

Formulario reutilizable para creación/edición de leyendas con:

- Validación en tiempo real
- Preview de imágenes
- Manejo de errores
- Estados de carga

```vue
<LegendForm 
  :legend="currentLegend"
  :loading="isSubmitting"
  @submit="handleSubmit"
  @cancel="router.push('/legends')"
/>
```

### LegendCard

Componente para mostrar leyendas en lista con:

- Información detallada
- Acciones rápidas
- Animaciones hover
- Fechas relativas

## Contribución

1. Haz fork del proyecto
2. Crea tu feature branch:

```bash
git checkout -b feature/nueva-funcionalidad
```

3. Realiza tus cambios y commits
4. Push a la rama:

```bash
git push origin feature/nueva-funcionalidad
```

5. Abre un Pull Request

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

## Contacto

Maicol Hernández - [maicolhernandez420@gmail.com](mailto:maicolhernandez420@gmail.com)
