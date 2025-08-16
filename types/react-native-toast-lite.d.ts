import { FC } from 'react';
import {
  ToastProps,
  ToastUpdatePatch,
  ToastUpdateOptions,
  ToasterProps,
} from './toastTypes';

/**
 * Global container that renders and manages toasts.
 * Mount it once at the root of your app.
 *
 * @example
 * ```tsx
 * export default function App() {
 *   return (
 *     <>
 *       <Toaster position="top" />
 *       <YourApp />
 *     </>
 *   )
 * }
 * ```
 */
export const Toaster: FC<ToasterProps>;
const Toaster: FC<ToasterProps>;

export const toast: {
  /**
   * Show an error toast.
   * @param message Message to display.
   * @param props Optional options: duration, position, styles, callbacks, etc.
   * @returns void
   * @example
   * toast.error('Something went wrong', { duration: 4000 })
   */
  error: (message: string, props?: ToastProps['props']) => void;

  /**
   * Show a success toast.
   * @param message Message to display.
   * @param props Optional options: duration, position, styles, callbacks, etc.
   * @returns void
   * @example
   * toast.success('Saved successfully')
   */
  success: (message: string, props?: ToastProps['props']) => void;

  /**
   * Show an informational toast.
   * @param message Message to display.
   * @param props Optional options: duration, position, styles, callbacks, etc.
   * @returns void
   * @example
   * toast.info('Updating data…')
   */
  info: (message: string, props?: ToastProps['props']) => void;

  /**
   * Show a warning toast.
   * @param message Message to display.
   * @param props Optional options: duration, position, styles, callbacks, etc.
   * @returns void
   * @example
   * toast.warning('Incomplete fields')
   */
  warning: (message: string, props?: ToastProps['props']) => void;

  /**
   * Dismiss all toasts that share the same id.
   * @param id Identifier of the toast to close.
   * @returns void
   * @example
   * toast.dismiss('upload')
   */
  dismiss: (id: string) => void;

  /**
   * Show a loading toast (long duration by default).
   * Useful for async operations. You can later update it with `toast.update`.
   * @param message Message to display.
   * @param props You may pass an `id` to later update or dismiss this same toast.
   * @returns void
   * @example
   * toast.loading('Uploading file…', { id: 'upload' })
   */
  loading: (message: string, props?: ToastProps['props']) => void;

  /**
   * Update an existing toast.
   * @param patch Changes to apply (id is required). You can change type, message, styles, etc.
   * @param opts Update options: e.g. `preserveProgress`, `inheritDuration`, `nextDuration`.
   * @returns void
   * @example
   * toast.update({ id: 'upload', type: 'success', message: 'Done!' })
   */
  update: (patch: ToastUpdatePatch, opts?: ToastUpdateOptions) => void;

  /**
   * Remove all toasts.
   * @returns void
   */
  clearAll: () => void;

  /**
   * Return the currently active toast ids (unique).
   */
  getActiveIds: () => string[];
};
export type { ToastProps } from './toastTypes';
export type { ToastPropsStyles } from './toastTypes';
