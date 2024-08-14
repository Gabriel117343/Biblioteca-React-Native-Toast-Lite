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
}
