import { create } from 'zustand';
export const useToastStore = create((set) => ({
    toasts: [],
    addToast: (type, message, props) => {
        const id = props.id ?? Date.now(); // si no se pasa un id, se le asigna la fecha actual
        const newToast = { id, type, message, props };
        set((state) => ({
            toasts: [...state.toasts, newToast],
        }));
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((toast) => toast.props.id !== id),
            }));
        }, props.duration ?? 3000);
    },
    removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((toast) => toast.props.id !== id),
    })),
}));
// De esta forma sera posible acceder a las funciones de toast
// Ej: toast.error('Error al cargar los datos', { title: 'Error' });
export const toast = {
    error: (message, props) => useToastStore.getState().addToast('error', message, props),
    success: (message, props) => useToastStore.getState().addToast('success', message, props),
    info: (message, props) => useToastStore.getState().addToast('info', message, props),
    warning: (message, props) => useToastStore.getState().addToast('warning', message, props),
    dismiss: (id) => useToastStore.getState().removeToast(id),
};
