export type ToastType = 'error' | 'success' | 'info' | 'warning' | 'loading';
export type ToastPosition =
  | 'top'
  | 'bottom'
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
export type ToastStyle = 'primary' | 'secondary' | 'primaryDark' | 'dark';
export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | 'none';
type validURL = `http://${string}` | `https://${string}`;

export interface ToastPropsStyles {
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
  width?: number | 'auto' | `${number}%`;
  maxWidth?: number | 'auto' | `${number}%`;
  minWidth?: number | 'auto' | `${number}%`;
  height?: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  zIndex?: number;
}

export interface ToastCallbacks {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onDismiss?: () => void;
  onSwipe?: (direction: SwipeDirection) => void;
  onAutoHide?: () => void;
  onLinkPress?: (href: string) => void;
}

export interface ToastProps {
  type: ToastType;
  message: string;
  createdAt: number;
  props?: {
    id?: string;
    title?: string;
    duration?: number;
    position?: ToastPosition;
    toastStyle?: ToastStyle;
    animationType?: 'fade' | 'slide' | 'bounce';
    animationInDuration?: number;
    animationOutDuration?: number;
    progress?: boolean;
    icon?: string; // emoji
    iconUrl?: validURL;
    border?: boolean;
    inheritStyles?: boolean;
    styles?: ToastPropsStyles;
    callbacks?: ToastCallbacks;
    pauseOnPress?: boolean; // si se pausa al mantener presionado
    swipeable?: boolean; // si se puede deslizar para cerrar
  };
}
export type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
  createdAt: number;
  props: Required<NonNullable<ToastProps['props']>>; // props ya normalizadas
};

export interface NormalizedToastProps {
  id: string;
  title: string;
  duration: number;
  position: ToastPosition;
  toastStyle: ToastStyle;
  animationType: 'fade' | 'slide' | 'bounce';
  animationInDuration: number;
  animationOutDuration: number;
  progress: boolean;
  icon: string;
  iconUrl?: validURL;
  border: boolean;
  inheritStyles: boolean;
  styles: ToastPropsStyles;
  callbacks: ToastCallbacks;
  pauseOnPress: boolean;
  swipeable: boolean;
}

export type ToastUpdatePatch = {
  id: string; // obligatorio
  message?: string;
  title?: string;
  toastStyle?: ToastStyle;
  animationOutDuration?: number;
  icon?: string;
  iconUrl?: validURL;
  border?: boolean;
  styles?: ToastPropsStyles; // override parcial, merge con existentes
  pauseOnPress?: boolean;
  swipeable?: boolean;
  position?: ToastPosition; // opcional: por si querés moverlo
  type?: ToastType;
  duration?: number;
  config: ToastUpdateOptions;
};

/**
 * Opciones de update:
 * - preserveProgress: true → NO reinicia el timer (default).
 * - inheritDuration: true → conserva la duración previa al reiniciar.
 *   (sólo aplica si preserveProgress=false)
 * - nextDuration: número → si querés setear una nueva duración al reiniciar.
 */
export type ToastUpdateOptions = {
  preserveProgress?: boolean; // default true
  inheritDuration?: boolean; // default true (cuando preserveProgress=false)
  nextDuration?: number; // override explícito de duración al reiniciar
};

export type ToasterProps = {
  /** Usa insets del SO; default true */
  respectSafeArea?: boolean;
  /** Offsets extra para sumar/restar a los safe areas */
  extraOffsets?: Partial<{
    top: number;
    bottom: number;
    left: number;
    right: number;
  }>;
  /** Si tu app NO usa SafeAreaProvider, provee insets manualmente */
  providedInsets?: { top: number; bottom: number; left: number; right: number };
  /** Muestra un borde visual para depuración del área del Toaster */
  showDebugBorder?: boolean;
  /** Configuración del borde de depuración */
  debugBorderOptions?: {
    color?: string;
    width?: number;
    style?: 'solid' | 'dotted' | 'dashed';
  };
};
