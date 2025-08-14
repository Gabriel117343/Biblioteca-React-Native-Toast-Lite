"use strict";

// storeToast.ts
import { create } from 'zustand';

// =========================
// Tipos internos
// =========================

const DEFAULT_DURATION_BY_TYPE = {
  loading: 100_000,
  success: 3_000,
  error: 3_000,
  info: 3_000,
  warning: 3_000
};
const randomId = () => Math.random().toString(36).slice(2, 10);

// =========================
// Store
// =========================
export const useToastStore = create((set, get) => ({
  toasts: [],
  addToast: (type, message, props) => {
    const normalizedId = String(props?.id ?? randomId());
    const createdAt = Date.now();

    // Duración por defecto
    const defaultDuration = props?.duration ?? (type === 'loading' ? DEFAULT_DURATION_BY_TYPE.loading : DEFAULT_DURATION_BY_TYPE[type]);

    // Normaliza props para el estado interno (sin undefineds)
    const normalizedProps = {
      id: normalizedId,
      title: props?.title ?? '',
      duration: defaultDuration,
      position: props?.position ?? 'top',
      toastStyle: props?.toastStyle ?? 'primary',
      animationType: props?.animationType ?? 'fade',
      animationInDuration: props?.animationInDuration ?? 500,
      animationOutDuration: props?.animationOutDuration ?? 500,
      progress: props?.progress ?? true,
      icon: props?.icon ?? '',
      iconUrl: props?.iconUrl ?? undefined,
      border: props?.border ?? true,
      inheritStyles: props?.inheritStyles ?? true,
      styles: props?.styles ?? {},
      callbacks: props?.callbacks ?? {},
      pauseOnPress: props?.pauseOnPress ?? true,
      swipeable: props?.swipeable ?? true
    };
    const newToast = {
      id: normalizedId,
      type,
      message,
      createdAt,
      props: normalizedProps
    };
    set(state => {
      const idx = state.toasts.findIndex(t => t.id === normalizedId);
      if (idx !== -1) {
        // Merge con el existente (misma id => actualizar instancia)
        const existing = state.toasts[idx];

        // Heredar estilos si corresponde
        const mergedStyles = normalizedProps.inheritStyles !== false ? {
          ...existing.props.styles,
          ...normalizedProps.styles
        } : {
          ...normalizedProps.styles
        };
        const updated = {
          ...existing,
          type,
          message,
          createdAt,
          // NUEVA instancia (clave para auto-remove por instancia)
          props: {
            ...existing.props,
            ...normalizedProps,
            duration: defaultDuration,
            // sobrescribe duración si llega una nueva
            styles: mergedStyles,
            // Mantener position / toastStyle anteriores si no se pasan ahora
            position: props?.position ?? existing.props.position ?? 'top',
            toastStyle: props?.toastStyle ?? existing.props.toastStyle ?? 'primary'
          }
        };
        const toasts = [...state.toasts];
        toasts[idx] = updated;
        return {
          toasts
        };
      }

      // Nueva id: push
      return {
        toasts: [...state.toasts, newToast]
      };
    });

    // Auto-remove por instancia (no borra el toast si fue reemplazado)
  },
  updateToast: patch => {
    const {
      id,
      type: patchType,
      duration: patchDuration,
      styles: stylesPatch,
      ...rest
    } = patch;
    const preserveProgress = patch.config.preserveProgress ?? true;
    const inheritDuration = patch.config.inheritDuration ?? true;
    const nextDuration = patch.config.nextDuration;
    set(state => {
      const idx = state.toasts.findIndex(t => t.id === id);
      if (idx === -1) return state;
      const existing = state.toasts[idx];
      const nextType = patchType ?? existing.type;

      // merge superficial de estilos
      const mergedStyles = stylesPatch ? {
        ...existing.props.styles,
        ...stylesPatch
      } : existing.props.styles;

      // si NO preservo progreso => reinicio timer => necesito una duración
      let computedDuration = existing.props.duration;
      if (!preserveProgress) {
        if (typeof nextDuration === 'number') {
          computedDuration = nextDuration;
        } else if (typeof patchDuration === 'number') {
          computedDuration = patchDuration;
        } else if (inheritDuration) {
          computedDuration = existing.props.duration;
        } else if (patchType && patchType !== existing.type) {
          // si cambió el tipo y NO quiero heredar => usa default del tipo
          computedDuration = DEFAULT_DURATION_BY_TYPE[nextType] ?? existing.props.duration;
        } else {
          // fallback seguro (igual que heredar)
          computedDuration = existing.props.duration;
        }
      }
      const updated = {
        ...existing,
        type: nextType,
        message: rest.message ?? existing.message,
        createdAt: preserveProgress ? existing.createdAt : Date.now(),
        // reinicia ó no
        props: {
          ...existing.props,
          title: rest.title ?? existing.props.title,
          toastStyle: rest.toastStyle ?? existing.props.toastStyle,
          animationOutDuration: rest.animationOutDuration ?? existing.props.animationOutDuration,
          icon: rest.icon ?? existing.props.icon,
          iconUrl: rest.iconUrl ?? existing.props.iconUrl,
          border: rest.border ?? existing.props.border,
          pauseOnPress: rest.pauseOnPress ?? existing.props.pauseOnPress,
          swipeable: rest.swipeable ?? existing.props.swipeable,
          position: rest.position ?? existing.props.position,
          styles: mergedStyles,
          duration: computedDuration
        }
      };
      const toasts = [...state.toasts];
      toasts[idx] = updated;
      return {
        toasts
      };
    });
  },
  // Dismiss por id (puede borrar múltiples instancias si existieran)
  removeToast: id => set(state => ({
    toasts: state.toasts.filter(t => t.id !== id)
  })),
  // Dismiss por instancia (id + createdAt)
  removeToastInstance: (id, createdAt) => set(state => ({
    toasts: state.toasts.filter(t => !(t.id === id && t.createdAt === createdAt))
  })),
  getActiveIds: () => Array.from(new Set(get().toasts.map(t => t.id)))
}));

// =========================
// API conveniente
// =========================
export const toast = {
  error: (message, props) => useToastStore.getState().addToast('error', message, props),
  success: (message, props) => useToastStore.getState().addToast('success', message, props),
  info: (message, props) => useToastStore.getState().addToast('info', message, props),
  warning: (message, props) => useToastStore.getState().addToast('warning', message, props),
  loading: (message, props) => useToastStore.getState().addToast('loading', message, props),
  // Dismiss por id (global)
  dismiss: id => useToastStore.getState().removeToast(id),
  // Dismiss por instancia (id + createdAt) — úsalo en auto-hide y swipe
  dismissInstance: (id, createdAt) => useToastStore.getState().removeToastInstance(id, createdAt),
  activeIds: () => useToastStore.getState().getActiveIds(),
  update: patch => useToastStore.getState().updateToast(patch)
};