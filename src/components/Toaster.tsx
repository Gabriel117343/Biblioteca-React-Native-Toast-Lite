import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useToastStore } from '../store/storeToast';
import { ToastError } from './toasts/ToastError';
import { ToastSuccess } from './toasts/ToastSuccess';
import { ToastInfo } from './toasts/ToastInfo';
import { ToastWarning } from './toasts/ToastWarning';
// Definimos una interfaz para los props de Toaster

// Definimos una interfaz para el objeto toast
interface Toast {
  id?: number;
  type: string;
  message?: string;
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
export const Toaster = () => {
  const { toasts } = useToastStore();

  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      {toasts.map((toast: Toast) => {
        if (toast.type === 'error') {
          return (
            <ToastError
              key={toast.id}
              message={toast.message}
              {...toast.props}
            />
          );
        } else if (toast.type === 'success') {
          return (
            <ToastSuccess
              key={toast.id}
              message={toast.message}
              {...toast.props}
            />
          );
        } else if (toast.type === 'info') {
          return (
            <ToastInfo
              key={toast.id}
              message={toast.message}
              {...toast.props}
            />
          );
        } else if (toast.type === 'warning') {
          return (
            <ToastWarning
              key={toast.id}
              message={toast.message}
              {...toast.props}
            />
          );
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
    alignItems: 'center',
  },
});
