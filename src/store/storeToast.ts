import { create } from 'zustand';

export type ToastType = 'error' | 'success' | 'info'; // tipos de toasts

export interface ToastProps {
  id: number;
  type: ToastType;
  props: {
    message: string;
    title?: string;
    duration?: number;
    // Agrega otras propiedades específicas para los toasts si es necesario
  };
}
interface ToastState {
  toasts: ToastProps[];
  addToast: (type: ToastType, props: ToastProps['props']) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (type, props) => {
    const id = Date.now();
    const newToast = { id, type, props };
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, props.duration || 3000);
  },
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((toast) => toast.id !== id),
  })),
}));

export const toast = {
  error: (props: ToastProps['props']) => useToastStore.getState().addToast('error', props),
  success: (props: ToastProps['props']) => useToastStore.getState().addToast('success', props),
  // Puedes agregar otros tipos de toasts aquí
};
