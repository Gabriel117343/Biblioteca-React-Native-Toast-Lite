export interface ToastProps {
  type: 'error' | 'success' | 'info' | 'warning' | 'loading';
  title?: string;
  message?: string;
  position?:
    | 'top'
    | 'bottom'
    | 'center'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  toastStyle?: 'primary' | 'secondary' | 'primaryDark' | 'dark';
  duration?: number;
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
    iconColor?: string;
    iconSize?: number;
    iconStyle?: 'solid' | 'outline' | 'default';
    progressColor?: string;
  };
}
