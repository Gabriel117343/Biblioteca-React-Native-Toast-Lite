# react-native-toast-lite

![npm](https://img.shields.io/npm/v/react-native-toast-lite.svg?style=flat-square)
![npm](https://img.shields.io/npm/dm/react-native-toast-lite.svg?style=flat-square)
![License](https://img.shields.io/npm/l/react-native-toast-lite.svg?style=flat-square)
![Build Status](https://img.shields.io/github/actions/workflow/status/usuario/repo/main.yml?style=flat-square)
![Platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS%20%7C%20Web-blue.svg?style=flat-square)
![Web](https://img.shields.io/badge/Web-compatible-green.svg?style=flat-square)
![Expo](https://img.shields.io/badge/Expo-compatible-orange.svg?style=flat-square)
![Stable Version](https://img.shields.io/badge/Stable%20Version-%E2%89%A5v2.0.5-brightgreen.svg?style=flat-square)

**Versión:** `v2.0.5`

## Demostración

![ezgif-82b47038fbd8c01-ezgif com-optimize](https://github.com/user-attachments/assets/f9296397-d147-44a7-8910-e95761a0fe5d)

## Descripción

**react-native-toast-lite** es una biblioteca de notificaciones `Toast` para aplicaciones **React Native**. Proporciona una manera fácil y configurable de mostrar mensajes breves y no intrusivos en tu aplicación.

## Características

- **Notificaciones de Toast**: 🍞Muestra mensajes en la pantalla de manera no intrusiva.
- **Tipos de Toast**: Soporte para varios tipos de notificaciones, como errores y éxitos.
- **Configuración Flexible**: Personaliza los colores, tamaños y estilos de los toasts.
- **Fácil Integración**: Instala y usa en tu proyecto con facilidad.
- **Contexto Global con Zustand**: Utiliza Zustand para manejar el estado global de los toasts.
- **Animaciones con react-native-reanimated**: Integra animaciones suaves para una mejor experiencia de usuario.
- **Soporte Multiplataforma**: Los toasts funcionan tanto en **aplicaciones móviles** como en la **web**, siguiendo la filosofía multiplataforma.

## Compatibilidad

✅ **React 18+**: Compatible con React 18.2.0 y versiones superiores, incluyendo React 19.
✅ **React Native**: Compatible con React Native 0.74.3 y versiones superiores.
✅ **Expo**: Compatible con Expo SDK 53 y versiones superiores.
✅ **React Native Reanimated**: Compatible con Reanimated 3.10.1 y versiones superiores.

## Instalación

Para instalar la biblioteca, ejecuta el siguiente comando:

```bash
npm install react-native-toast-lite
```

2. **Recomendación de integración:**

- Coloca el `Toaster` dentro de los márgenes seguros (top/bottom) y antes del Stack para asegurar visibilidad y evitar bloquear interacción.
- No requiere configuración extra en móvil; en web se maneja overlay y z-index automáticamente.

```tsx
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toaster } from 'react-native-toast-lite';

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const colorScheme = 'light'; // tu lógica de tema

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <View
        style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}
      >
        {/* Toaster dentro de Safe Area y antes del Stack  */}
        <Toaster
          respectSafeArea={false}
          showDebugBorder
          debugBorderOptions={{
            color: '#00FF00',
            width: 2,
            style: 'dotted',
          }}
        />
        <Stack screenOptions={{ headerShown: true }} />
      </View>
      {/* App sin SafeAreaProvider */}
      {/* <Toaster providedInsets={{ top: 24, bottom: 0, left: 0, right: 0 }} /> */}

      {/* App que quiere “levantar” un poco más los toasts de abajo: */}
      {/* <Toaster extraOffsets={{ bottom: 8 }} /> */}
    </ThemeProvider>
  );
}
```

3. **Mostrar un Toast:**

Utiliza los métodos `toast.success`, `toast.error`, `toast.info`, `toast.warning`, y `toast.loading`, `toast.dismiss`, `toast.update` para mostrar toasts desde cualquier parte de tu aplicación.

```jsx
import React from 'react';
import { Button, View } from 'react-native';
import { toast } from 'react-native-toast-lite';

const ExampleComponent = () => {
  const showSuccessToast = () => {
    toast.success('Operación completada con éxito.', {
      title: 'Éxito', // Título del toast (opcional)
      id: 'my-id-22', // opcional pero recomendado
      position: 'top-right',
      duration: 4000, // Duración del toast en milisegundos (opcional)
      progress: true, // Muestra el indicador de progreso (opcional)
      border: true, // Muestra un borde alrededor del toast (opcional)
      styles: {
        backgroundColor: '#28a745',
        borderColor: '#155724', // Color del borde personalizado
        titleColor: '#fff',
        textColor: '#ddd',
        progressColor: '#ffc107', // Color del indicador de progreso personalizado
      },
    });
  };
  toast.success('¡Gracias por visitarnosss!', {
    toastStyle: 'dark',
    icon: '🚀',
  });

  const showErrorToast = () => {
    toast.error('Hubo un problema con la operación.', {
      title: 'Error',
      position: 'center',
      duration: 2500,
      icon: '🚫', // Icono personalizado (emoji)
      styles: {
        backgroundColor: '#dc3545', // Color de fondo personalizado
        borderColor: '#721c24',
        titleColor: '#fff',
        textColor: '#f8d7da',
      },
    });
  };
  // Ejemplo de uso real
  import { sendData } from './sendDatAxiosApi';

  const enviarDatos = async ({ formData }) => {
    toast.loading('Cargando...', {
      id: 'cargaDatos',
      duration: 2000,
      position: top, // estado persistente si cambia el loading a success
      toastStyle: 'dark', // esta prop tambien se mantiene
      icon: '⏳', // Icono personalizado (emoji)
    });
    try {
      const { success, message } = await sendData(formData);
      if (success) {
        toast.info(message ?? 'Se ha realizado correctamente..', {
          title: 'Exito!',
          id: 'cargaDatos',
        }); // heredara position y toastStyle
      } else {
        // toast ...
        toast.error(message ?? 'Error inesperado', {
          title: 'Error',
          id: 'cargaDatos',
          duration: 2000,
        });
      }
    } catch (error) {
      // toast ...
    }
  };

  return (
    <View>
      <Button title="Mostrar éxito" onPress={showSuccessToast} />
      <Button title="Mostrar error" onPress={showErrorToast} />
    </View>
  );
};

export default ExampleComponent;
```

## Iconos personalizados (emoji o imagen)

Puedes personalizar el icono del toast usando:

- `icon`: un emoji.
- `iconUrl`: una imagen remota (tiene prioridad sobre `icon` y los SVG por defecto).

Ejemplos:

```tsx
toast.success('Guardado', {
  iconUrl: 'https://example.com/success.png',
  'web-image',
  styles: {
    iconRounded: true,
    iconSize: 35,
    iconResizeMode: 'cover',
  },
});
toast.update({ id: 'web-image', styles: { iconSize: 30 }, message: '..'  }) // hereda propiedades y permite override
toast.dismiss('web-image') // elimina antes de timepo
// o
toast.success('Ok', { icon: '✅' });

// o usar el icono svg por defecto
```

## Contenido HTML en título y mensaje (opcional)

Puedes renderizar HTML básico en `title` y/o `message` activando:

- `styles.titleIsHtml`: renderiza HTML en el título.
- `styles.messageIsHtml`: renderiza HTML en el mensaje.

Etiquetas soportadas (básicas): `<b> <strong> <i> <em> <u> <br> <a> <li> <span>`.
Los enlaces `<a href="...">` se abrirán con Linking.openURL. Atributos como `target` o `rel` no aplican en React Native.

Ejemplos:

```tsx
toast.info(
  '¡Pide tus combos! Ingresa al <a href="https://example.com/menu">menú</a> <u>aquí</u> 🍔',
  {
    styles: { messageIsHtml: true, linkColor: '#2E7DFF' },
  }
);

toast.success('<b>Guardado con éxito</b>', {
  title: 'Resultado',
  styles: { titleIsHtml: true },
});
```

### Tipos de Toast

| **Tipo**  | **Descripción**                    |
| --------- | ---------------------------------- |
| `error`   | Muestra un mensaje de error.       |
| `success` | Muestra un mensaje de éxito.       |
| `info`    | Muestra un mensaje informativo.    |
| `warning` | Muestra un mensaje de advertencia. |
| `loading` | Muestra un mensaje de carga.       |

### Propiedades de las props

| **Propiedad**          | **Tipo**                                                                                               | **Descripción**                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `id`                   | `string` _(recomendado)_                                                                               | Identificador único para el toast.                                                              |
| `title`                | `string` _(opcional)_                                                                                  | Título del toast.                                                                               |
| `duration`             | `number` _(opcional)_                                                                                  | Duración del toast en milisegundos.                                                             |
| `position`             | `'top' - 'bottom' - 'center' - 'top-left' - 'top-right' - 'bottom-left' - 'bottom-right'` _(opcional)_ | Posición en la pantalla donde se mostrará el toast.                                             |
| `toastStyle`           | `'primary' - 'secondary' - 'primaryDark' - 'dark'` _(opcional)_                                        | Estilo del toast.                                                                               |
| `animationType`        | `'fade' - 'slide' - 'bounce'` _(opcional)_                                                             | Tipo de animación del toast.                                                                    |
| `animationInDuration`  | `number` _(opcional)_                                                                                  | Duración de la animación de entrada en milisegundos.                                            |
| `animationOutDuration` | `number` _(opcional)_                                                                                  | Duración de la animación de salida en milisegundos.                                             |
| `progress`             | `boolean` _(opcional)_                                                                                 | Indica si se muestra la barra de progreso.                                                      |
| `icon`                 | `string` _(opcional)_                                                                                  | Emoji/caracter como ícono. Si también pasas `iconUrl`, este será ignorado.                      |
| `iconUrl`              | `string` _(opcional)_                                                                                  | URL válida de imagen para usar como ícono (tiene prioridad sobre `icon` y los SVG por defecto). |
| `border`               | `boolean` _(opcional)_                                                                                 | Indica si se muestra un borde alrededor del toast.                                              |
| `inheritStyles`        | `boolean` _(opcional)_                                                                                 | Indica si se heredan los styles del toast con el mismo id.                                      |

### Propiedad de los estilos personalizados

| **Propiedad**      | **Tipo**                                         | **Descripción**                                                    |
| ------------------ | ------------------------------------------------ | ------------------------------------------------------------------ |
| `titleColor`       | `string` _(opcional)_                            | Color del título del toast.                                        |
| `textColor`        | `string` _(opcional)_                            | Color del texto del toast.                                         |
| `titleSize`        | `number` _(opcional)_                            | Tamaño de la fuente del título del toast.                          |
| `textSize`         | `number` _(opcional)_                            | Tamaño de la fuente del texto del toast.                           |
| `backgroundColor`  | `string` _(opcional)_                            | Color de fondo del toast.                                          |
| `borderRadius`     | `number` _(opcional)_                            | Radio de las esquinas del toast.                                   |
| `borderColor`      | `string` _(opcional)_                            | Color del borde del toast.                                         |
| `iconSize`         | `number` _(opcional)_                            | Tamaño del ícono dentro del toast.                                 |
| `iconColor`        | `string` _(opcional)_                            | Color del ícono (aplica a SVG/emoji, no a imágenes `iconUrl`).     |
| `iconStyle`        | `'solid' \| 'outline' \| 'default'` _(opcional)_ | Estilo del ícono en el toast.                                      |
| `loadingColor`     | `string` _(opcional)_                            | Color del indicador de carga (tipo `loading`).                     |
| `progressColor`    | `string` _(opcional)_                            | Color de la barra de progreso.                                     |
| `width`            | `number` _(opcional)_                            | Ancho personalizado del toast.                                     |
| `height`           | `number` _(opcional)_                            | Altura personalizada del toast.                                    |
| `opacity`          | `number` _(opcional)_                            | Opacidad del fondo (0.9 por defecto).                              |
| `top`              | `number` _(opcional)_                            | Posición superior personalizada del toast.                         |
| `bottom`           | `number` _(opcional)_                            | Posición inferior personalizada del toast.                         |
| `left`             | `number` _(opcional)_                            | Posición izquierda personalizada del toast.                        |
| `right`            | `number` _(opcional)_                            | Posición derecha personalizada del toast.                          |
| `titleIsHtml`      | `boolean` _(opcional)_                           | Renderiza HTML en el título.'\n' soportado                         |
| `messageIsHtml`    | `boolean` _(opcional)_                           | Renderiza HTML en el mensaje. '\n' soportado                       |
| `linkColor`        | `string` _(opcional)_                            | Color para enlaces `<a>` cuando se                                 |
| `iconResizeMode`   | `string` _(opcional)_                            | Para controlar como se ajusta la imagen url, por defecto 'contain' |
| `iconRounded`      | `boolean` _(opcional)_                           | círculo perfecto                                                   |
| `iconBorderRadius` | `number` _(opcional)_                            | override manual del radio                                          |

## Callbacks y Eventos Interactivos 🎮

Los toast pueden responder a interacciones del usuario mediante callbacks, permitiendo ejecutar código cuando ocurren eventos específicos.

### Callbacks disponibles

| **Callback**  | **Descripción**                                                                             |
| ------------- | ------------------------------------------------------------------------------------------- |
| `onPress`     | Se ejecuta cuando el usuario presiona el toast                                              |
| `onPressIn`   | Se ejecuta cuando comienza el presionado                                                    |
| `onPressOut`  | Se ejecuta cuando termina el presionado                                                     |
| `onSwipe`     | Se ejecuta cuando el usuario desliza el toast (incluye la dirección)                        |
| `onDismiss`   | Se ejecuta cuando el toast se cierra por cualquier motivo                                   |
| `onAutoHide`  | Se ejecuta específicamente cuando el toast se cierra automáticamente por tiempo             |
| `onLinkPress` | Se ejecuta específicamente cuando se paso un enlace de html <a>https://..</a> y se presiono |

### Opciones de interacción

| **Propiedad**  | **Tipo**  | **Descripción**                                                        |
| -------------- | --------- | ---------------------------------------------------------------------- |
| `pauseOnPress` | `boolean` | Si `true`, el toast pausa su temporizador mientras está presionado     |
| `swipeable`    | `boolean` | Si `true`, el toast puede cerrarse deslizándolo en cualquier dirección |

### Ejemplo de uso con callbacks

```javascript
toast.success('Operación completada', {
  title: '¡Éxito!',
  duration: 5000,
  callbacks: {
    onPress: () => console.log('Toast presionado'),
    onSwipe: (direction) => console.log(`Deslizado hacia: ${direction}`),
    onDismiss: () => console.log('Toast cerrado'),
  },
  pauseOnPress: true, // Pausa el temporizador al mantener presionado
  swipeable: true, // Permite cerrar deslizando en cualquier dirección
});
toast.info('Visita nuestra <a href="https://example.com">página web</a>', {
  title: '<nombrComercio>'
  styles: { messageIsHtml: true, titleIsHtml: false },
  callbacks: {
    onPress: () => console.log('Toast presionado'),
    onLinkPress: (url) => console.log(`Enlace presionado: ${url}`),
  },
});
```

Estos callbacks te permiten crear experiencias interactivas, como navegación al presionar un toast, análisis de interacción del usuario, o acciones de recuperación cuando se descarta una notificación.
