import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useToastStore } from '../store/storeToast';
import { ToastProps } from '../../types/toastTypes';
import { Toast } from '../components/toasts/Toast';
import { toastStyles } from '../components/toasts/commonStyles';

export const Toaster = () => {
  const { toasts } = useToastStore();

  return (
    <View
      pointerEvents="box-none"
      style={[
        toastStyles.containerToast,
        StyleSheet.absoluteFillObject,
        { zIndex: Platform.OS === 'web' ? 2147483647 : 9999 },
      ]}
    >
      {toasts.map((toast: ToastProps) => (
        <Toast
          key={toast.props?.id}
          id={toast.props!.id!}
          type={toast.type}
          message={toast.message}
          callbacks={toast.props?.callbacks}
          pauseOnPress={toast.props?.pauseOnPress}
          swipeable={toast.props?.swipeable}
          {...toast.props}
        />
      ))}
    </View>
  );
};
