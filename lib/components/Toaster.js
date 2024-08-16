import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useToastStore } from '../store/storeToast';
import { Toast } from '../components/toasts/Toast';
// Renderizamos el componente Toaster
export const Toaster = () => {
    const { toasts } = useToastStore();
    return (React.createElement(View, { style: [styles.container, StyleSheet.absoluteFillObject] }, toasts.map((toast, index) => (React.createElement(Toast, { key: index, type: toast.type, message: toast.message, ...toast.props })))));
};
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});
