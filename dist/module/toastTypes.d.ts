export type ToastType = 'error' | 'success' | 'info' | 'warning' | 'loading';

type validURL = `http://${string}` | `https://${string}`;

export interface ToastProps {
  type: ToastType;
  message: string;
  props?: {
    id?: string;
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
    animationType?: 'fade' | 'slide' | 'bounce';
    animationInDuration?: number;
    animationOutDuration?: number;
    progress?: boolean;
    icon?: string; // emoji
    iconUrl?: validURL;
    border?: boolean;
    inheritStyles?: boolean;
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
      iconSize?: number;
      iconStyle?: 'solid' | 'outline' | 'default';
      iconResizeMode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
      iconRounded?: boolean; // true => círculo perfecto
      iconBorderRadius?: number; // override manual del radio
      loadingColor?: string;
      progressColor?: string;
      opacity?: number;
      width?: number;
      height?: number;
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
  };
}
