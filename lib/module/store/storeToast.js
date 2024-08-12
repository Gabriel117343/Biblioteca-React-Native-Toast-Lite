"use strict";

import { create } from 'zustand';

// tipos de toasts

export const useToastStore = create(set => ({
  toasts: [],
  addToast: (type, props) => {
    const id = Date.now();
    const newToast = {
      id,
      type,
      props
    };
    set(state => ({
      toasts: [...state.toasts, newToast]
    }));
    setTimeout(() => {
      set(state => ({
        toasts: state.toasts.filter(toast => toast.id !== id)
      }));
    }, props.duration || 3000);
  },
  removeToast: id => set(state => ({
    toasts: state.toasts.filter(toast => toast.id !== id)
  }))
}));
export const toast = {
  error: props => useToastStore.getState().addToast('error', props),
  success: props => useToastStore.getState().addToast('success', props)
  // Puedes agregar otros tipos de toasts aquí
};
//# sourceMappingURL=storeToast.js.map