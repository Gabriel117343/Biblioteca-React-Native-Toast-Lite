# react-native-toast-lite

![react-native-toast-lite]

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

2. **Configurar el Toast Provider:**

   Asegúrate de envolver tu aplicación con el `ToasterProvider` para que los toasts funcionen correctamente. Añádelo en el archivo principal de tu aplicación:

   ```jsx
   import React from 'react';
   import { View, Text } from 'react-native';
   import { ToasterProvider } from 'react-native-toast-lite';
   import { Toaster } from './path/to/Toaster'; // Asegúrate de importar el componente Toaster

   const App = () => (
     <ToasterProvider>
       <View style={{ flex: 1 }}>
         <Text>Mi aplicación</Text>
         {/* Otros componentes */}
         <Toaster /> {/* Añade el Toaster en la parte superior de tu aplicación */}
       </View>
     </ToasterProvider>
   );

   export default App;

3. **Mostrar un Toast:**

   Utiliza los métodos `toast.success`, `toast.error`, etc., para mostrar los toasts desde cualquier parte de tu aplicación. A continuación se muestra un ejemplo:

   ```jsx
   import React from 'react';
   import { Button, View } from 'react-native';
   import { toast } from 'react-native-toast-lite';

   const ExampleComponent = () => {
     const showSuccessToast = () => {
       toast.success({
         title: 'Éxito',
         message: 'Operación completada con éxito.',
       });
     };

     const showErrorToast = () => {
       toast.error({
         title: 'Error',
         message: 'Hubo un problema con la operación.',
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


