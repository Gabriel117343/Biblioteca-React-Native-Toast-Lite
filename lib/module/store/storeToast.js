"use strict";

import { create } from 'zustand';
export const useToastStore = create(set => ({
  toasts: [],
  addToast: (type, message, props) => {
    const id = props?.id ?? Math.floor(Math.random() * 1000);
    const date = new Date();
    let newToast = {
      id,
      type,
      message,
      props,
      date
    };
    // si existe algún toast con  la id repetida se elimina y se agrega el nuevo

    set(state => {
      const existingToastIndex = state.toasts.findIndex(toast => toast.id === id);
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
            toastStyle: props?.toastStyle ?? existingToast.props?.toastStyle
          },
          date
        };
        const updatedToasts = [...state.toasts];
        updatedToasts[existingToastIndex] = newToast;
        return {
          toasts: updatedToasts
        };
      } else {
        return {
          toasts: [...state.toasts, newToast]
        };
      }
    });
    setTimeout(() => {
      set(state => ({
        toasts: state.toasts.filter(toast => toast.date !== date)
      }));
    }, props?.duration ?? 3000);
  },
  removeToast: id => set(state => ({
    toasts: state.toasts.filter(toast => toast?.props?.id !== id)
  }))
}));

// De esta forma sera posible acceder a las funciones de toast
// Ej: toast.error('Error al cargar los datos', { title: 'Error' });
export const toast = {
  error: (message, props) => useToastStore.getState().addToast('error', message, props),
  success: (message, props) => useToastStore.getState().addToast('success', message, props),
  info: (message, props) => useToastStore.getState().addToast('info', message, props),
  warning: (message, props) => useToastStore.getState().addToast('warning', message, props),
  dismiss: id => useToastStore.getState().removeToast(id),
  loading: (message, props) => useToastStore.getState().addToast('loading', message, props)
};
//# sourceMappingURL=storeToast.js.map