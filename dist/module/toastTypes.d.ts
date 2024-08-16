export type ToastType = 'error' | 'success' | 'info' | 'warning' | 'loading';

export interface ToastProps {
  type: ToastType;
  message: string;
  props?: {
    id?: number;
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
    toastStyle?: 'primary' | 'secondary' | 'primaryDark' | 'dark';
    progress?: boolean;
    icon?: string; // emoji
    border?: boolean;
    styles?: {
      titleColor?: string;
      textColor?: string;
      titleSize?: number;
      textSize?: number;
      backgroundColor?: string;
      borderColor?: string;
      iconSize?: number;
      iconStyle?: 'solid' | 'outline' | 'default';
      loadingColor?: string;
      progressColor?: string;
    };
  };
}
