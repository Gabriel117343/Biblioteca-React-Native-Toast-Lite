import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useToastStore, ToastProps } from '../store/storeToast';

import { Toast } from '../components/toasts/Toast';

// Renderizamos el componente Toaster
export const Toaster = () => {
  const { toasts } = useToastStore();

  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      {toasts.map((toast: ToastProps, index) => (
        <Toast
          key={index}
          type={toast.type}
          message={toast.message}
          {...toast.props}
        />
      ))}
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
