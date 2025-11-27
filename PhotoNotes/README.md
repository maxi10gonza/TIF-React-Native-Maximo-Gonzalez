# PhotoNotes - Aplicación de Notas Fotográficas

Una aplicación móvil simple para gestionar notas basadas en fotografías usando React Native y Expo.

## Características

✅ **Crear notas fotográficas**

- Captura fotos con la cámara del dispositivo
- Selecciona imágenes de la galería
- Añade título y descripción

✅ **Ver lista de notas**

- Lista con miniaturas de imágenes
- Acceso rápido a los detalles de cada nota

✅ **Ver detalles**

- Imagen a tamaño completo
- Título, descripción y fecha

✅ **Editar notas**

- Modifica título y descripción
- Reemplaza la imagen si lo deseas

✅ **Eliminar notas**

- Botón para eliminar con confirmación

✅ **Persistencia de datos**

- Almacenamiento local con AsyncStorage
- Sin necesidad de backend

## Estructura del Proyecto

```
PhotoNotes/
├── app/
│   ├── _layout.js           # Configuración de rutas
│   ├── index.js             # Pantalla principal (lista)
│   ├── create.js            # Crear nueva nota
│   ├── note/
│   │   └── [id].js          # Detalle de nota
│   └── edit/
│       └── [id].js          # Editar nota
├── utils/
│   └── storage.js           # Funciones de AsyncStorage
├── app.json                 # Configuración de Expo
└── package.json             # Dependencias
```

## Instalación

```bash
# Navega a la carpeta del proyecto
cd PhotoNotes

# Instala las dependencias (ya incluidas)
npm install

# Inicia la app
npm run android    # Para Android
npm run ios        # Para iOS (requiere Mac)
npm run web        # Para web
```

## Dependencias Principales

- **expo-router**: Navegación basada en archivos
- **expo-camera**: Acceso a la cámara
- **expo-image-picker**: Seleccionar imágenes de galería
- **@react-native-async-storage/async-storage**: Almacenamiento local
- **expo-constants**: Constantes de Expo

## Cómo Usar

### 1. **Crear una nota**

- Presiona el botón flotante (+)
- Elige "Tomar foto" o "De galería"
- Ingresa título y descripción
- Presiona "Guardar Nota"

### 2. **Ver una nota**

- En la pantalla principal, toca cualquier nota
- Verás la imagen completa, título, descripción y fecha

### 3. **Editar una nota**

- En la pantalla de detalle, presiona "Editar"
- Modifica lo que necesites
- Presiona "Guardar cambios"

### 4. **Eliminar una nota**

- En la pantalla de detalle, presiona "Eliminar"
- Confirma la eliminación

## Almacenamiento de Datos

Todas las notas se guardan en `AsyncStorage` como JSON. Cada nota contiene:

```json
{
  "id": "1234567890",
  "title": "Mi nota",
  "description": "Descripción de la nota",
  "imageUri": "file:///path/to/image.jpg",
  "createdAt": "2025-11-27T10:30:00.000Z",
  "updatedAt": "2025-11-27T10:30:00.000Z"
}
```

## Permisos Requeridos

- **Cámara**: Para capturar fotos
- **Almacenamiento**: Para seleccionar imágenes de galería

Los permisos se solicitan automáticamente cuando se necesitan.

## Notas

- La aplicación fue diseñada para ser simple y funcional
- No requiere backend ni conexión a internet
- Todos los datos se almacenan localmente en el dispositivo
- Las imágenes se guardan como referencias locales en el dispositivo

¡Disfruta creando tus notas fotográficas! 📸
