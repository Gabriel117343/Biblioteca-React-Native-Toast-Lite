# react-native-toast-lite

## Descripción

**react-native-toast-lite** es una biblioteca de notificaciones `Toast` para aplicaciones React Native. Proporciona una manera fácil y configurable de mostrar mensajes breves y no intrusivos en tu aplicación. La biblioteca incluye soporte para varios tipos de mensajes, como errores y éxitos, con una personalización sencilla para adaptarse al diseño de tu aplicación.

## Características

- **Notificaciones de Toast**: Muestra mensajes en la pantalla de manera no intrusiva.
- **Tipos de Toast**: Soporte para varios tipos de notificaciones, como errores y éxitos.
- **Configuración Flexible**: Personaliza los colores, tamaños y estilos de los toasts.
- **Fácil Integración**: Instala y usa en tu proyecto con facilidad.
- **Contexto Global con Zustand**: Utiliza Zustand para manejar el estado global de los toasts.
- **Animaciones con react-native-reanimated**: Integra animaciones suaves para una mejor experiencia de usuario.

## Instalación

Para instalar la biblioteca, ejecuta el siguiente comando:

```bash
npm install react-native-toast-lite@latest
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
         <Toaster /> {/* Añade el Toaster en la parte superior de tu aplicación */}
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
    const enviarDatos = () => {
      toast.loading("Cargando...", {
        id: "cargaDatos",
        duration: 2000,
        position: top, // estado persistente si cambia el loading a success
        toastStyle: "dark", // esta prop tambien se mantiene
        icon: '⏳', // Icono personalizado (emoji)
      });
      try {
        const { success, message } = axios.post('https//....')
        if (success) { 
          toast.info(message, {title: 'Exito!'}); // heredara position y toastStyle
        } else {
          // toast ...
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
  
<<<<<<< HEAD
  export default ExampleComponent;
  ```
=======
>>>>>>> 61364bd5f28b6e533e53727b1a9f6e3eb78ccdb4
  
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

| **Propiedad**  | **Tipo**                                                                 | **Descripción**                                                                           |
|----------------|--------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| `id`           | `number` (opcional)                                                      | Identificador único opcional para el toast.                                               |
| `title`        | `string` (opcional)                                                      | Título opcional del toast.                                                                |
| `duration`     | `number` (opcional)                                                      | Duración en milisegundos que el toast permanecerá visible.                                |
| `position`     | `'top'-'bottom'-'center'-'top-left'-'top-right'-'bottom-left'-'bottom-right'` (opcional) | Posición del toast en la pantalla.                                                       |
<<<<<<< HEAD
| `toastStyle`   | `'primary'-'secondary'-'primaryDark'-'dark'` (opcional)          | Estilo del toast.                                                                         |
=======
| `toastStyle`   | `'primary' | 'secondary' | 'primaryDark' | 'dark'` (opcional)`          | Estilo del toast.                                                                         |
>>>>>>> 61364bd5f28b6e533e53727b1a9f6e3eb78ccdb4
| `progress`     | `boolean` (opcional)                                                     | Indica si se debe mostrar una barra de progreso.                                          |
| `icon`         | `string` (opcional)                                                      | Emoji o ícono opcional que se muestra junto al mensaje del toast.                         |
| `border`       | `boolean` (opcional)                                                     | Determina si el toast debe tener un borde visible.                                        |

### propiedad de los estilos personalizados

| **Propiedad**    | **Tipo**                                            | **Descripción**                                            |
|------------------|-----------------------------------------------------|------------------------------------------------------------|
| `titleColor`     | `string` (opcional)                                | Color del título del toast.                               |
| `textColor`      | `string` (opcional)                                | Color del texto del toast.                                |
| `titleSize`      | `number` (opcional)                                | Tamaño de la fuente del título del toast.                 |
| `textSize`       | `number` (opcional)                                | Tamaño de la fuente del texto del toast.                  |
| `backgroundColor`| `string` (opcional)                                | Color de fondo del toast.                                |
| `borderColor`    | `string` (opcional)                                | Color del borde del toast.                               |
| `iconSize`       | `number` (opcional)                                | Tamaño del ícono o emoji en el toast.                    |
<<<<<<< HEAD
| `iconStyle`      | `'solid'-'outline'-'default'` (opcional)      | Estilo del ícono (sólido, contorno o predeterminado).     |
=======
| `iconStyle`      | `'solid'-'outline'-'default'` (opcional)`      | Estilo del ícono (sólido, contorno o predeterminado).     |
>>>>>>> 61364bd5f28b6e533e53727b1a9f6e3eb78ccdb4
| `loadingColor`   | `string` (opcional)                                | Color del indicador de carga en el toast.                |
| `progressColor`  | `string` (opcional)                                | Color de la barra de progreso en el toast.               |

> Resultado:
<<<<<<< HEAD

<img src="https://github.com/user-attachments/assets/5459adc1-2470-40b4-beb4-1758c5901ddb" alt="NASA Image 1" width="25%" />
=======
 <img src="https://github.com/user-attachments/assets/5459adc1-2470-40b4-beb4-1758c5901ddb" alt="NASA Image 1" width="25%" />
>>>>>>> 61364bd5f28b6e533e53727b1a9f6e3eb78ccdb4
