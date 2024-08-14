import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useToastStore } from '../store/storeToast';

import { Toast } from '../components/toasts/Toast';

interface Toast {
  type: 'error' | 'success' | 'info' | 'warning' | 'loading';
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
    id?: number;
  };
}
// Renderizamos el componente Toaster
export const Toaster = () => {
  const { toasts } = useToastStore();

  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      {toasts.map((toast) => (
        <Toast
          key={toast.props.id}
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
