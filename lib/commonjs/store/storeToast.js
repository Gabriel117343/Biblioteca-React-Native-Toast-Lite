"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToastStore = exports.toast = void 0;
var _zustand = require("zustand");
// tipos de toasts

const useToastStore = exports.useToastStore = (0, _zustand.create)(set => ({
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
const toast = exports.toast = {
  error: props => useToastStore.getState().addToast('error', props),
  success: props => useToastStore.getState().addToast('success', props)
  // Puedes agregar otros tipos de toasts aquí
};
//# sourceMappingURL=storeToast.js.map