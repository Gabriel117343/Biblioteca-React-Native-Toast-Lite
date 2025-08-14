import { FC } from 'react';
import {
  ToastProps,
  ToastUpdatePatch,
  ToastUpdateOptions,
  ToasterProps,
} from './toastTypes';

export const Toaster: FC<ToasterProps>;
const Toaster: FC<ToasterProps>;

export const toast: {
  error: (message: string, props?: ToastProps['props']) => void;
  success: (message: string, props?: ToastProps['props']) => void;
  info: (message: string, props?: ToastProps['props']) => void;
  warning: (message: string, props?: ToastProps['props']) => void;
  dismiss: (id: string) => void;
  loading: (message: string, props?: ToastProps['props']) => void;
  update: (patch: ToastUpdatePatch, opts?: ToastUpdateOptions) => void;
};
export type { ToastProps } from './toastTypes';
export type { ToastPropsStyles } from './toastTypes';
