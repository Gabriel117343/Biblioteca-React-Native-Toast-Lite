import { create } from 'zustand';
import { ToastProps, ToastType } from '../../types/toastTypes';

// ESTE ES EL ESTADO PRINCIPAL DE LA APLICACIÓN PARA LOS TOASTS QUE SE MUESTRAN EN LA PANTALLA
interface ToastState {
  toasts: (ToastProps & { id: number; date: Date })[]; // indicamos que cada toast tendrá un id y una fecha además de las propiedades de ToastProps
  addToast: (
    type: ToastType,
    message: ToastProps['message'],
    props: ToastProps['props']
  ) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (type, message, props) => {
    const id = props?.id ?? Math.floor(Math.random() * 100);
    const date = new Date();
    // la duración por defecto prioriza la duración pasada en props
    const defaultDuration = !props?.duration
      ? type === 'loading'
        ? 100000
        : 3000
      : props.duration;
    let newToast = {
      id,
      type,
      message,
      props,
      date,
    };
    // si existe algún toast con  la id repetida se elimina y se agrega el nuevo manteniendo algunas propiedades

    set((state) => {
      const existingToastIndex = state.toasts.findIndex(
        (toast) => toast.id === id
      );
      if (existingToastIndex !== -1) {
        const existingToast = state.toasts[existingToastIndex];
        newToast = {
          ...existingToast,
          type,
          message,
          props: {
            ...props,
            duration: defaultDuration, // se sobreescribe la duración
            // estos valores se sobreescriben si se pasan en props y se mantienen si no
            position: props?.position ?? existingToast.props?.position,
            toastStyle: props?.toastStyle ?? existingToast.props?.toastStyle,
            styles: {
              // por defecto se heredan los estilos de toastStyles a menos que se indique lo contrario, inheriStyles sera undefined si no se pasa en props
              ...(props?.inheritStyles !== false && {
                ...existingToast.props?.styles,
              }),
              // los valores de ...props.styles sobreesciben los valores de ...existingToast.props.
              ...props?.styles,
            },
          },
          date,
        };

        const updatedToasts = [...state.toasts];
        updatedToasts[existingToastIndex] = newToast;
        return { toasts: updatedToasts };
      } else {
        // se restaura la duración por defecto si no se pasa en props
        return {
          toasts: [
            ...state.toasts,
            { ...newToast, props: { ...props, duration: defaultDuration } },
          ],
        };
      }
    });

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.date !== date),
      }));
    }, defaultDuration);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast?.props?.id !== id),
    })),
}));
// De esta forma sera posible acceder a las funciones de toast
// Ej: toast.error('Error al cargar los datos', { title: 'Error' });
export const toast = {
  error: (message: string, props: ToastProps['props']) =>
    useToastStore.getState().addToast('error', message, props),
  success: (message: string, props: ToastProps['props']) =>
    useToastStore.getState().addToast('success', message, props),
  info: (message: string, props: ToastProps['props']) =>
    useToastStore.getState().addToast('info', message, props),
  warning: (message: string, props: ToastProps['props']) =>
    useToastStore.getState().addToast('warning', message, props),
  dismiss: (id: number) => useToastStore.getState().removeToast(id),
  loading: (message: string, props: ToastProps['props']) =>
    useToastStore.getState().addToast('loading', message, props),
};
