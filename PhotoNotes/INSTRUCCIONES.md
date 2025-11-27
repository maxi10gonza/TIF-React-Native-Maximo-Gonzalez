# 📸 PhotoNotes - Instrucciones de Ejecución

## ✅ Requisitos Previos

- Node.js instalado (versión 16 o superior)
- npm (se instala con Node.js)
- Expo CLI (se instala automáticamente con npm)

## 🚀 Pasos para Ejecutar

### 1. Abre la terminal en la carpeta del proyecto

```bash
# Windows (PowerShell)
cd "c:\Users\maxim\OneDrive\Desktop\SEGUNDO AÑO\SEGUNDO CUATRIMESTRE\TLP III - React Native\TIF-React-Native\PhotoNotes"
```

### 2. Instala las dependencias (si no lo has hecho)

```bash
npm install
```

### 3. Inicia la aplicación

**Para Android:**

```bash
npm run android
```

**Para iOS (solo en Mac):**

```bash
npm run ios
```

**Para Web:**

```bash
npm run web
```

**Con Expo Go (multiplataforma):**

```bash
npx expo start
```

Luego presiona:

- `a` para Android
- `i` para iOS
- `w` para Web

## 📱 Opciones de Ejecución

### Opción 1: Emulador Android

- Ten Android Studio abierto con un emulador iniciado
- Ejecuta `npm run android`
- La app se instalará y abrirá automáticamente

### Opción 2: Teléfono Físico

- Instala la app "Expo Go" desde Play Store/App Store
- Ejecuta `npx expo start`
- Escanea el código QR con tu teléfono
- Se abrirá la app en Expo Go

### Opción 3: Navegador Web

- Ejecuta `npm run web`
- Se abrirá automáticamente en tu navegador predeterminado
- **Nota**: Las funciones de cámara funcionarán limitadamente en web

## 🎮 Prueba de Funcionalidades

### Crear una nota:

1. Presiona el botón flotante (+) en rojo
2. Selecciona "Tomar foto" o "De galería"
3. Ingresa un título (ejemplo: "Mi primera nota")
4. Ingresa una descripción
5. Presiona "Guardar Nota"

### Ver notas:

- Regresa a la pantalla principal
- Verás la lista de notas con miniaturas

### Editar una nota:

1. Toca cualquier nota de la lista
2. Presiona el botón "Editar"
3. Modifica los datos
4. Presiona "Guardar cambios"

### Eliminar una nota:

1. En la vista de detalle
2. Presiona "Eliminar"
3. Confirma la acción

## 🛠️ Solución de Problemas

### "Command not found: npm"

- Reinstala Node.js desde https://nodejs.org/

### "Error: expo-router not found"

- Ejecuta: `npm install` nuevamente
- Si persiste: `npm cache clean --force` y luego `npm install`

### "Permission denied" (en Android)

- Reinicia el emulador
- Limpia la caché: `npm run android -- --reset-cache`

### "Blank screen" al iniciar

- Presiona Ctrl+S en la terminal para recargar
- O ejecuta `r` en la terminal de Expo

### No puedo tomar fotos

- Verifica que el emulador tenga permisos de cámara
- En Android Studio: Settings > Permissions > Camera

## 📁 Estructura Final

```
PhotoNotes/
├── app/
│   ├── _layout.js          ← Rutas y navegación
│   ├── index.js            ← Pantalla principal (lista)
│   ├── create.js           ← Crear nota
│   ├── note/[id].js        ← Detalle de nota
│   └── edit/[id].js        ← Editar nota
├── utils/
│   └── storage.js          ← Funciones de datos
├── node_modules/           ← Dependencias (auto-generado)
├── app.json                ← Configuración Expo
├── package.json            ← Dependencias del proyecto
└── README.md               ← Documentación
```

## 🎯 Próximos Pasos Opcionales

Si quieres mejorar la app:

1. **Agregar categorías** a las notas
2. **Búsqueda y filtrado** de notas
3. **Exportar notas** como PDF
4. **Sincronización en la nube** con Firebase
5. **Temas oscuro/claro**
6. **Notificaciones** de recordatorios

## 📞 Soporte

Si tienes problemas:

1. Revisa los errores en la terminal
2. Intenta limpiar la caché: `npm cache clean --force`
3. Borra `node_modules` y `package-lock.json`, luego `npm install` nuevamente

¡Disfruta tu aplicación de notas fotográficas! 🎉
