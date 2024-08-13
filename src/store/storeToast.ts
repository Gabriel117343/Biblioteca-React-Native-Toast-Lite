import { create } from 'zustand';

export type ToastType =
  | 'error'
  | 'success'
  | 'info'
  | 'warning'
  | 'loading'
  | 'dismiss'; // tipos de toasts

export interface ToastProps {
  id?: number;
  type: ToastType;
  message: string;
  props: {
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
  };
}
interface ToastState {
  toasts: ToastProps[];
  addToast: (
    type: ToastType,
    message: ToastProps['message'],
    props: ToastProps['props']
  ) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (type, message, props, id = Date.now()) => {
    const newToast = { id, type, message, props };
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, props.duration ?? 3000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
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
};
