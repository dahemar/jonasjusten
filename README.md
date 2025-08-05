# jonasjusten.com

Sitio web comercial de Jonas Justen, implementado como un **calco exacto** de la página `commercial-work` de `expensivemusic.com`.

## Características

- **Galería de imágenes comerciales**: Carga dinámica desde Google Sheets
- **Modal de zoom**: Click para ver imágenes en pantalla completa
- **Navegación responsive**: Sidebar adaptado para móvil y desktop
- **Enlaces cruzados**: Conexión con expensivemusic.com
- **Mismo diseño y estilos**: Layout idéntico al original

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview
```

## Estructura del Proyecto

```
jonasjusten/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   └── Commercial.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
│   └── commercial/     # Imágenes comerciales
├── dist/              # Build de producción
└── package.json
```

## Configuración

### Google Sheets API

El proyecto utiliza Google Sheets para cargar dinámicamente el contenido comercial:

- **Spreadsheet ID**: `1RTrPB8qONlXQG37mRzPJ8aanTlxLGLy3MeYpsyKnmBk`
- **Range**: `Commercial!A2:C`
- **API Key**: Configurada en el código

### Estructura de Datos

La hoja de Google Sheets debe tener la siguiente estructura:

| A (Image URL) | B (Alt Text) | C (Description) |
|---------------|---------------|-----------------|
| URL de imagen | Texto alternativo | Descripción |

## Navegación

- **/**: Página principal con galería comercial
- **personal work**: Enlace a expensivemusic.com

## Deployment

### Netlify/Vercel

1. Conectar el repositorio
2. Configurar build command: `npm run build`
3. Configurar publish directory: `dist`
4. Configurar variables de entorno si es necesario

## Tecnologías

- React 18
- React Router DOM
- Vite
- Google Sheets API
- CSS Grid/Flexbox

## Desarrollo

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Previsualizar build
npm run lint     # Linting
```

### Estructura de Componentes

- **App.jsx**: Componente principal con lógica de estado
- **Sidebar.jsx**: Navegación lateral
- **Commercial.jsx**: Galería de imágenes comerciales

## Integración con expensivemusic.com

Este proyecto está diseñado para trabajar en conjunto con expensivemusic.com:

- **Contenido compartido**: Misma hoja de Google Sheets
- **Enlaces cruzados**: Navegación entre ambos sitios
- **Estilos consistentes**: Mismo diseño y UX
- **Deployment independiente**: Cada sitio se puede actualizar por separado

## Diferencias con el Original

- **Dominio independiente**: jonasjusten.com vs expensivemusic.com
- **Navegación simplificada**: Solo commercial work y enlace a personal work
- **Mismo contenido**: Misma hoja de Google Sheets
- **Mismos estilos**: Layout y diseño idénticos 