import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useToastStore } from '../store/storeToast';
import { Toast } from '../components/toasts/Toast';
import { toastStyles } from '../components/toasts/commonStyles';
export const Toaster = () => {
    const { toasts } = useToastStore();
    // se renderiza el componente Toast con las props de cada toast
    return (React.createElement(View, { style: [toastStyles.containerToast, StyleSheet.absoluteFillObject] }, toasts.map((toast) => (React.createElement(Toast, { key: toast.props?.id, id: toast.props.id, type: toast.type, message: toast.message, ...toast.props })))));
};
