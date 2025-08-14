import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { useToastStore } from '../store/storeToast';
import { Toast } from '../components/toasts/Toast';
import { toastStyles } from '../components/toasts/commonStyles';
import type {
  NormalizedToastProps,
  ToasterProps,
} from '../../types/toastTypes';

export const Toaster: React.FC<ToasterProps> = ({
  respectSafeArea = true,
  extraOffsets,
  providedInsets,
  showDebugBorder = false,
  debugBorderOptions = { color: '#00FF00', width: 2, style: 'dotted' },
}) => {
  const { toasts } = useToastStore();

  // 1) Insets desde contexto (no falla si no hay provider)
  const ctxInsets = React.useContext(SafeAreaInsetsContext) ?? {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  // 2) Base según config
  const base = respectSafeArea
    ? (providedInsets ?? ctxInsets)
    : { top: 0, bottom: 0, left: 0, right: 0 };

  // 3) Extras (pueden ser negativos)
  const padTop = base.top + (extraOffsets?.top ?? 0);
  const padBottom = base.bottom + (extraOffsets?.bottom ?? 0);
  const padLeft = base.left + (extraOffsets?.left ?? 0);
  const padRight = base.right + (extraOffsets?.right ?? 0);

  // Borde para el área *con padding* (la que respeta safe area)
  const paddedDebugBorder = showDebugBorder
    ? {
        borderWidth: debugBorderOptions.width ?? 1,
        borderColor: debugBorderOptions.color ?? '#00FF00',
        borderStyle: debugBorderOptions.style ?? 'dotted',
      }
    : {};

  return (
    // Wrapper: ocupa toda la pantalla (sin borde)
    <View
      pointerEvents="box-none"
      style={[
        StyleSheet.absoluteFillObject,
        { zIndex: Platform.OS === 'web' ? 2147483647 : 9999 },
      ]}
    >
      {/* Contenedor efectivo: aquí va el padding que respeta safe area */}
      <View
        pointerEvents="box-none"
        style={[
          toastStyles.containerToast,
          StyleSheet.absoluteFillObject,
          {
            paddingTop: padTop,
            paddingBottom: padBottom,
            paddingLeft: padLeft,
            paddingRight: padRight,
          },
          paddedDebugBorder, // <- pinta el borde en el área segura real
        ]}
      >
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            props={t.props as NormalizedToastProps}
            createdAt={t.createdAt}
          />
        ))}
      </View>
    </View>
  );
};
