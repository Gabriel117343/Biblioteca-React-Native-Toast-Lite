import { create } from 'zustand';

export type ToastType = 'error' | 'success' | 'info' | 'warning' | 'loading';
export interface ToastProps {
  type: ToastType;
  message: string;
  props?: {
    id?: number;
    title?: string;
    duration?: number;
    position?:
      | 'top'
      | 'bottom'
      | 'center'
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right';

    toastStyle?: 'primary' | 'secondary' | 'primaryDark' | 'dark';
    progress?: boolean;
    icon?: string; // emoji
    border?: boolean;
    styles?: {
      titleColor?: string;
      textColor?: string;
      titleSize?: number;
      textSize?: number;
      backgroundColor?: string;
      borderColor?: string;
      iconSize?: number;
      iconStyle?: 'solid' | 'outline' | 'default';
      loadingColor?: string;
      progressColor?: string;
    };
  };
}
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
    const id = props?.id ?? Math.floor(Math.random() * 1000);
    const date = new Date();
    let newToast = { id, type, message, props, date };
    // si existe algún toast con  la id repetida se elimina y se agrega el nuevo

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
            // estos valores se sobreescriben si se pasan en props y se mantienen si no
            position: props?.position ?? existingToast.props?.position,
            toastStyle: props?.toastStyle ?? existingToast.props?.toastStyle,
          },
          date,
        };

        const updatedToasts = [...state.toasts];
        updatedToasts[existingToastIndex] = newToast;
        return { toasts: updatedToasts };
      } else {
        return { toasts: [...state.toasts, newToast] };
      }
    });

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.date !== date),
      }));
    }, props?.duration ?? 3000);
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
