import { ComponentType } from 'react';
import { ToastProps } from './toastTypes';

export const Toaster: ComponentType;
export const toast: {
  error: (message: string, props?: ToastProps['props']) => void;
  success: (message: string, props?: ToastProps['props']) => void;
  info: (message: string, props?: ToastProps['props']) => void;
  warning: (message: string, props?: ToastProps['props']) => void;
  dismiss: (id: string) => void;
  loading: (message: string, props?: ToastProps['props']) => void;
};
export type { ToastProps } from './toastTypes';
export type { ToastPropsStyles } from './toastTypes';
