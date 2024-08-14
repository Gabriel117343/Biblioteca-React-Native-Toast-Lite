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
         <Toaster /> {/* Añade el Toaster en la parte superior de tu aplicación */}
       </View>

   );

   export default App;
   ```

3. **Mostrar un Toast:**

   Utiliza los métodos `toast.success`, `toast.error`,`toast.info`, etc., para mostrar los toasts desde cualquier parte de tu aplicación. A continuación se muestra un ejemplo:

   ```jsx
   import React from 'react';
   import { Button, View } from 'react-native';
   import { toast } from 'react-native-toast-lite';

   const ExampleComponent = () => {
     const showSuccessToast = () => {
       toast.success('Operación completada con éxito.', {
        // valores opcionales
         title: 'Éxito', 
         position: 'top', 
         duration: 3000 
       });
     };

     const showErrorToast = () => {
       toast.error('Hubo un problema con la operación.', {
         title: 'Error',
         position: 'center',
         duration: 2500
       });
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

### Tipos de Toast

| **Tipo**   | **Descripción**                         |
|------------|-----------------------------------------|
| `error`    | Muestra un mensaje de error.            |
| `success`  | Muestra un mensaje de éxito.            |
| `info`     | Muestra un mensaje informativo.         |
| `warning`  | Muestra un mensaje de advertencia.      |
| `loading`  | Muestra un mensaje de carga.            |

### Propiedades de las props

| **Propiedad** | **Tipo**                              | **Descripción**                             |
|---------------|---------------------------------------|---------------------------------------------|
| `type`        | `'error'`, `'success'`, `'info'`, `'warning'`, `'loading'` | Tipo de notificación que se mostrará.     |
| `message`     | `string`                              | Mensaje principal del toast.                |
| `title`       | `string` (opcional)                   | Título del toast.                           |
| `duration`    | `number` (opcional)                   | Duración del toast en milisegundos.         |
| `position`    | `'top'`, `'bottom'`, `'center'`, `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'` | Posición en la pantalla donde se mostrará el toast. |
| `id`          | `number` (opcional)                   | Identificador único del toast.              |


> Resultado:
 <img src="https://github.com/user-attachments/assets/5459adc1-2470-40b4-beb4-1758c5901ddb" alt="NASA Image 1" width="25%" />
