import { ToastProps } from './toastTypes';
declare module 'react-native-toast-lite' {
  import { ComponentType } from 'react';
  export const Toaster: ComponentType;
  export const toast: {
    error: (message: string, props?: ToastProps['props']) => void;
    success: (message: string, props?: ToastProps['props']) => void;
    info: (message: string, props?: ToastProps['props']) => void;
    warning: (message: string, props?: ToastProps['props']) => void;
    loading: (message: string, props?: ToastProps['props']) => void;
  };
}
