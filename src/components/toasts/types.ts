export interface ToastProps {
  id: number;
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
  animationType?: 'fade' | 'slide' | 'bounce';
  animationDuration?: number;
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
    borderRadius?: number;
    borderColor?: string;
    iconColor?: string;
    iconSize?: number;
    iconStyle?: 'solid' | 'outline' | 'default';
    progressColor?: string;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
}
