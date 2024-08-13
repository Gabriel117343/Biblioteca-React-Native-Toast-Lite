"use strict";

import { create } from 'zustand';

// tipos de toasts

export const useToastStore = create(set => ({
  toasts: [],
  addToast: (type, message, props, id = Date.now()) => {
    const newToast = {
      id,
      type,
      message,
      props
    };
    set(state => ({
      toasts: [...state.toasts, newToast]
    }));
    setTimeout(() => {
      set(state => ({
        toasts: state.toasts.filter(toast => toast.id !== id)
      }));
    }, props.duration ?? 3000);
  },
  removeToast: id => set(state => ({
    toasts: state.toasts.filter(toast => toast.id !== id)
  }))
}));

// De esta forma sera posible acceder a las funciones de toast
// Ej: toast.error('Error al cargar los datos', { title: 'Error' });
export const toast = {
  error: (message, props) => useToastStore.getState().addToast('error', message, props),
  success: (message, props) => useToastStore.getState().addToast('success', message, props),
  info: (message, props) => useToastStore.getState().addToast('info', message, props),
  warning: (message, props) => useToastStore.getState().addToast('warning', message, props),
  dismiss: id => useToastStore.getState().removeToast(id)
};
//# sourceMappingURL=storeToast.js.map