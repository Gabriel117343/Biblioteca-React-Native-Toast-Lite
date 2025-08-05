# react-native-toast-lite

![npm](https://img.shields.io/npm/v/react-native-toast-lite.svg?style=flat-square)
![npm](https://img.shields.io/npm/dm/react-native-toast-lite.svg?style=flat-square)
![License](https://img.shields.io/npm/l/react-native-toast-lite.svg?style=flat-square)
![Build Status](https://img.shields.io/github/actions/workflow/status/usuario/repo/main.yml?style=flat-square)
![Platforms](https://img.shields.io/badge/platforms-Android%20%7C%20Phone-blue.svg?style=flat-square)
![Expo](https://img.shields.io/badge/Expo-compatible-orange.svg?style=flat-square)

**Versión:** `v1.9.1`
## Descripción

**react-native-toast-lite** es una biblioteca de notificaciones `Toast` para aplicaciones React Native. Proporciona una manera fácil y configurable de mostrar mensajes breves y no intrusivos en tu aplicación. La biblioteca incluye soporte para varios tipos de mensajes, como errores y éxitos, con una personalización sencilla para adaptarse al diseño de tu aplicación.

## Características

- **Notificaciones de Toast**: Muestra mensajes en la pantalla de manera no intrusiva.
- **Tipos de Toast**: Soporte para varios tipos de notificaciones, como errores y éxitos.
- **Configuración Flexible**: Personaliza los colores, tamaños y estilos de los toasts.
- **Fácil Integración**: Instala y usa en tu proyecto con facilidad.
- **Contexto Global con Zustand**: Utiliza Zustand para manejar el estado global de los toasts.
- **Animaciones con react-native-reanimated**: Integra animaciones suaves para una mejor experiencia de usuario.

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

> Ejemplo de Uso

2. **Configurar el Toast Provider (Toaster):**

   Asegúrate de agregar al punto de entrada de tu aplicación el `Toaster` para que los toasts se rederizen allí:

   ```jsx
   import React from 'react';
   import { View, Text } from 'react-native';
 
   import { Toaster } from 'react-native-toast-lite'; // Asegúrate de importar el componente Toaster

   const App = () => (

       <View style={{ flex: 1 }}>
         <Toaster /> {/* Añade el Toaster en la parte superior de tu aplicación */}
         <Text>Mi aplicación</Text>
         {/* Otros componentes */}
       </View>

   );

   export default App;
   ```

3. **Mostrar un Toast:**

  Utiliza los métodos toast.success, toast.error, toast.info, toast.warning, y toast.loading para mostrar toasts desde cualquier parte de tu aplicación.

  Estos métodos te permiten mostrar mensajes con diferentes tipos de notificaciones y configuraciones personalizables.
  A continuación se muestra un ejemplo:

   ```jsx
  import React from 'react';
  import { Button, View } from 'react-native';
  import { toast } from 'react-native-toast-lite';
  
  const ExampleComponent = () => {
    const showSuccessToast = () => {
      toast.success('Operación completada con éxito.', {
        title: 'Éxito', // Título del toast (opcional)
        position: 'top-right', // Posición del toast (opcional)
        duration: 4000, // Duración del toast en milisegundos (opcional)
        progress: true, // Muestra el indicador de progreso (opcional)
        border: true, // Muestra un borde alrededor del toast (opcional)
        styles: {
          backgroundColor: '#28a745', // Color de fondo personalizado
          borderColor: '#155724', // Color del borde personalizado
          titleColor: '#fff', // Color del título personalizado
          textColor: '#ddd', // Color del texto personalizado
          progressColor: '#ffc107', // Color del indicador de progreso personalizado
        },
      });
    };
   toast.success("¡Gracias por visitarnosss!", { toastStyle: 'dark', icon : '🚀'})
  
    const showErrorToast = () => {
      toast.error('Hubo un problema con la operación.', {
        title: 'Error',
        position: 'center',
        duration: 2500,
        icon: '🚫', // Icono personalizado (emoji)
        styles: {
          backgroundColor: '#dc3545', // Color de fondo personalizado
          borderColor: '#721c24', // Color del borde personalizado
          titleColor: '#fff', // Color del título personalizado
          textColor: '#f8d7da', // Color del texto personalizado
        },
      });
    };
    // Ejemplo de uso real
    import { sendData } from './sendDatAxiosApi'

    const enviarDatos = async ({ formData }) => {
      toast.loading("Cargando...", {
        id: "cargaDatos",
        duration: 2000,
        position: top, // estado persistente si cambia el loading a success
        toastStyle: "dark", // esta prop tambien se mantiene
        icon: '⏳', // Icono personalizado (emoji)
      });
      try {
        const { success, message } = await sendData(formData)
        if (success) { 
          toast.info(message ?? 'Se ha realizado correctamente..', { title: 'Exito!', id: 'cargaDatos' }); // heredara position y toastStyle
          
        } else {
          // toast ...
          toast.error(message ?? 'Error inesperado', { title: 'Error', id: 'cargaDatos', duration: 2000 })
        }
      } catch(error) {
          // toast ...
      }
    }
    
    return (
      <View>
        <Button title="Mostrar éxito" onPress={showSuccessToast} />
        <Button title="Mostrar error" onPress={showErrorToast} />
      </View>
    );
  };
  
  export default ExampleComponent;
  ```

### Tipos de Toast

| **Tipo**   | **Descripción**                         |
|------------|-----------------------------------------|
| `error`    | Muestra un mensaje de error.            |
| `success`  | Muestra un mensaje de éxito.            |
| `info`     | Muestra un mensaje informativo.         |
| `warning`  | Muestra un mensaje de advertencia.      |
| `loading`  | Muestra un mensaje de carga.            |

### Propiedades de las props

| **Propiedad**        | **Tipo**                                                      | **Descripción**                                                                                          |
|----------------------|---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `id`                 | `number` _(opcional)_                                         | Identificador único para el toast.                                                                        |
| `title`              | `string` _(opcional)_                                         | Título del toast.                                                                                         |
| `duration`           | `number` _(opcional)_                                         | Duración del toast en milisegundos.                                                                       |
| `position`           | `'top' - 'bottom' - 'center' - 'top-left' - 'top-right' - 'bottom-left' - 'bottom-right'` _(opcional)_ | Posición en la pantalla donde se mostrará el toast.                                                    |
| `toastStyle`         | `'primary' - 'secondary' - 'primaryDark' - 'dark'` _(opcional)_ | Estilo del toast.                                                                                         |
| `animationType`      | `'fade' - 'slide' - 'bounce'` _(opcional)_                    | Tipo de animación del toast.                                                                              |
| `animationInDuration`  | `number` _(optional)_                                       | Duración de la animación de entrada en milisegundos.                                                               |
| `animationOutDuration` | `number` _(optional)_                                       | Duración de la animación de salida en milisegundos.                                                               |
| `progress`           | `boolean` _(opcional)_                                        | Indica si se muestra la barra de progreso.                                                                |
| `icon`               | `string` _(opcional)_                                         | Emoji o carácter a mostrar como ícono en el toast.                                                        |
| `border`             | `boolean` _(opcional)_                                        | Indica si se muestra un borde alrededor del toast.                                                        |
| `inheritStyles`      | `boolean` _(opcional)_                                        | Indica si se heredan los styles del toast con el mismo id  

### propiedad de los estilos personalizados

| **Propiedad**       | **Tipo**                                                         | **Descripción**                                                                             |
|---------------------|------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| `titleColor`        | `string` _(opcional)_                                            | Color del título del toast.                                                                 |
| `textColor`         | `string` _(opcional)_                                            | Color del texto del toast.                                                                  |
| `titleSize`         | `number` _(opcional)_                                            | Tamaño de la fuente del título del toast.                                                   |
| `textSize`          | `number` _(opcional)_                                            | Tamaño de la fuente del texto del toast.                                                    |
| `backgroundColor`   | `string` _(opcional)_                                            | Color de fondo del toast.                                                                   |
| `borderRadius`      | `number` _(opcional)_                                            | Radio de las esquinas del toast.                                                            |
| `borderColor`       | `string` _(opcional)_                                            | Color del borde del toast.                                                                  |
| `iconSize`          | `number` _(opcional)_                                            | Tamaño del ícono dentro del toast.                                                          |
| `iconStyle`         | `'solid' - 'outline' - 'default'` _(opcional)_                   | Estilo del ícono en el toast.                                                               |
| `loadingColor`      | `string` _(opcional)_                                            | Color del indicador de carga si se muestra un toast de tipo loading.                        |
| `progressColor`     | `string` _(opcional)_                                            | Color de la barra de progreso del toast.                                                    |
| `width`             | `number` _(opcional)_                                            | Ancho personalizado del toast.                                                              |
| `opacity`      | `number` _(optional)_                                        | Indica la opacidad del fondo(0.9 por defecto).                                       |
| `height`            | `number` _(opcional)_                                            | Altura personalizada del toast.                                                             |
| `top`               | `number` _(opcional)_                                            | Posición superior personalizada del toast en la pantalla.                                   |
| `bottom`            | `number` _(opcional)_                                            | Posición inferior personalizada del toast en la pantalla.                                   |
| `left`              | `number` _(opcional)_                                            | Posición izquierda personalizada del toast en la pantalla.                                  |
| `right`             | `number` _(opcional)_                                            | Posición derecha personalizada del toast en la pantalla.                                    |

 <img src="https://github.com/user-attachments/assets/e0d00a53-5e7d-4a41-872d-509413e347f7" alt="NASA Image 1" width="25%" />
