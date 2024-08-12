import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useToastStore } from '../store/storeToast';
import { ToastError } from './toasts/ToastError';
import { ToastSuccess } from './toasts/ToastSuccess';
// Definimos una interfaz para los props de Toaster
interface ToasterProps {}

// Definimos una interfaz para el objeto toast
interface Toast {
  id: number;
  type: string;
  props: {
    duration?: number;
    [key: string]: any;
  };
}

export const Toaster:FC<ToasterProps> = () => {
  const { toasts } = useToastStore();

  return (
    <View style={styles.container}>
      {toasts.map((toast: Toast) => {
        if (toast.type === 'error') {
          return <ToastError key={toast.id} {...toast.props} />;
        } else if (toast.type === 'success') {
          return <ToastSuccess key={toast.id} {...toast.props} />;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 10,
  },
});
