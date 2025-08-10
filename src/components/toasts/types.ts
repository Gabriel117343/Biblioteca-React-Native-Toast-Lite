type validURL = `http://${string}` | `https://${string}`;
export interface ToastProps {
  id: string;
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
  animationInDuration?: number;
  animationOutDuration?: number;
  duration?: number;
  progress?: boolean;
  icon?: string; // emoji
  iconUrl?: validURL;
  border?: boolean;
  styles?: {
    titleIsHtml?: boolean;
    messageIsHtml?: boolean;
    linkColor?: string;
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
    iconResizeMode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
    iconRounded?: boolean; // true => círculo perfecto
    iconBorderRadius?: number; // override manual del radio
    progressColor?: string;
    opacity?: number;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
}
