import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

import ErrorSvg from '../ui/ErrorSvg';
import SuccessSvg from '../ui/SuccessSvg';
import InfoSvg from '../ui/InfoSvg';
import WarningSvg from '../ui/WarningSvg';
import CustomLoading from './CustomLoading';

type validURL = `http://${string}` | `https://${string}`;

interface RenderIconProps {
  type: 'error' | 'success' | 'info' | 'warning' | 'loading';
  toastStyle: 'primary' | 'secondary' | 'primaryDark' | 'dark';
  icon?: string; // emoji
  iconUrl?: validURL; // imagen remota
  iconColor?: string;
  iconSize?: number;
  iconStyle?: 'solid' | 'outline' | 'default';
  iconResizeMode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
  iconRounded?: boolean;
  iconBorderRadius?: number;
  loadingDelayMs?: number; // ms antes de mostrar spinner
}

type Kind = 'url' | 'emoji' | 'builtin';

export const RenderIcon: React.FC<RenderIconProps> = ({
  type,
  toastStyle,
  iconColor,
  icon,
  iconUrl,
  iconSize,
  iconStyle,
  iconResizeMode,
  iconRounded,
  iconBorderRadius,
  loadingDelayMs = 150,
}) => {
  const size = iconSize ?? 25;
  const radius =
    typeof iconBorderRadius === 'number'
      ? Math.max(0, Math.round(iconBorderRadius))
      : iconRounded
        ? Math.round(size / 2)
        : Math.round(size / 6);

  // Firma desde props
  const signature = useMemo(() => {
    return iconUrl
      ? `url:${iconUrl}`
      : icon
        ? `emoji:${icon}`
        : `builtin:${type}:${toastStyle}:${iconColor ?? ''}:${iconStyle ?? ''}`;
  }, [iconUrl, icon, type, toastStyle, iconColor, iconStyle]);

  // Helpers
  const kindFromSig = useCallback((sig: string): Kind => {
    if (sig.startsWith('url:')) return 'url';
    if (sig.startsWith('emoji:')) return 'emoji';
    return 'builtin';
  }, []);

  const parseBuiltinFromSig = useCallback(
    (sig: string) => {
      // builtin:<type>:<toastStyle>:<iconColor>:<iconStyle>
      const parts = sig.split(':');
      const typeFromSig = (parts[1] as RenderIconProps['type']) || type;
      const styleFromSig =
        (parts[2] as RenderIconProps['toastStyle']) || toastStyle;
      return { typeFromSig, styleFromSig };
    },
    [type, toastStyle]
  );

  // Estado “actual” y “pendiente”
  const [currentSig, setCurrentSig] = useState(signature);
  const [pendingSig, setPendingSig] = useState<string | null>(null);

  // Flags y timers
  const [loadFailed, setLoadFailed] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const spinnerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nonUrlTransitionRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Opacidades
  const currentOpacity = useSharedValue(1);
  const pendingOpacity = useSharedValue(0);

  const currentKind = useMemo<Kind>(
    () => kindFromSig(currentSig),
    [currentSig, kindFromSig]
  );
  const pendingKind = useMemo<Kind | null>(
    () => (pendingSig ? kindFromSig(pendingSig) : null),
    [pendingSig, kindFromSig]
  );

  // Para que el spinner quede por encima y el contenido por debajo
  const DIM_WHEN_SPINNER = 0.35;

  const currentAnimatedStyle = useAnimatedStyle(() => ({
    opacity:
      (showSpinner ? DIM_WHEN_SPINNER : 1) *
      interpolate(currentOpacity.value, [0, 1], [0, 1]),
    zIndex: 1, // debajo del spinner
  }));

  const pendingAnimatedStyle = useAnimatedStyle(() => ({
    opacity:
      (showSpinner ? DIM_WHEN_SPINNER : 1) *
      interpolate(pendingOpacity.value, [0, 1], [0, 1]),
    zIndex: 1, // debajo del spinner
  }));

  const promotePending = useCallback(
    (sig: string) => {
      currentOpacity.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(setCurrentSig)(sig);
        runOnJS(setPendingSig)(null);
        currentOpacity.value = 1;
        pendingOpacity.value = 0;
        runOnJS(setShowSpinner)(false);
      });
    },

    [currentOpacity, pendingOpacity]
  );

  // Preparar transición al cambiar firma
  useEffect(() => {
    if (signature === currentSig || signature === pendingSig) return;

    if (spinnerTimeout.current) clearTimeout(spinnerTimeout.current);
    if (nonUrlTransitionRef.current) clearTimeout(nonUrlTransitionRef.current);

    setLoadFailed(false);
    setShowSpinner(false);

    const nextKind = kindFromSig(signature);
    setPendingSig(signature);
    pendingOpacity.value = 0;

    if (nextKind === 'url') {
      // URL => spinner con delay; el promote ocurre en onLoadEnd
      spinnerTimeout.current = setTimeout(
        () => setShowSpinner(true),
        loadingDelayMs
      );
    } else {
      // emoji/builtin => micro-spinner y crossfade
      setShowSpinner(true);
      nonUrlTransitionRef.current = setTimeout(() => {
        pendingOpacity.value = withTiming(1, { duration: 200 }, () =>
          runOnJS(promotePending)(signature)
        );
        runOnJS(setShowSpinner)(false);
      }, loadingDelayMs);
    }
  }, [
    signature,
    currentSig,
    pendingSig,
    loadingDelayMs,
    kindFromSig,
    pendingOpacity,
    promotePending,
  ]);

  useEffect(() => {
    return () => {
      if (spinnerTimeout.current) clearTimeout(spinnerTimeout.current);
      if (nonUrlTransitionRef.current)
        clearTimeout(nonUrlTransitionRef.current);
    };
  }, []);

  // Render de capa
  const renderChild = (sig: string, kind: Kind) => {
    if (kind === 'url') {
      const url = sig.slice(4);
      if (loadFailed) return renderFallback();
      return (
        <Image
          source={{ uri: url }}
          resizeMode={iconResizeMode ?? 'contain'}
          onLoadStart={() => {}}
          onLoadEnd={() => {
            if (pendingSig === sig) {
              pendingOpacity.value = withTiming(
                1,
                { duration: 160 },
                () => runOnJS(promotePending)(sig) // ✅ ahora con argumento
              );
            } else {
              setShowSpinner(false);
            }
          }}
          onError={() => {
            setLoadFailed(true);
            setShowSpinner(false);
          }}
          style={StyleSheet.absoluteFill}
        />
      );
    }

    if (kind === 'emoji') {
      const emoji = sig.slice(6);
      const node = (
        <View style={styles.centerFill}>
          <Text style={{ fontSize: size }}>{emoji}</Text>
        </View>
      );
      if (pendingSig === sig) {
        pendingOpacity.value = withTiming(1, { duration: 160 }, () =>
          runOnJS(promotePending)(sig)
        );
      }
      return node;
    }

    // builtin
    const { typeFromSig, styleFromSig } = sig.startsWith('builtin:')
      ? parseBuiltinFromSig(sig)
      : { typeFromSig: type, styleFromSig: toastStyle };

    const builtinNode = (() => {
      switch (typeFromSig) {
        case 'error':
          return (
            <ErrorSvg
              toastStyle={styleFromSig}
              iconColor={iconColor}
              iconSize={size}
              iconStyle={iconStyle}
            />
          );
        case 'success':
          return (
            <SuccessSvg
              toastStyle={styleFromSig}
              iconColor={iconColor}
              iconSize={size}
              iconStyle={iconStyle}
            />
          );
        case 'info':
          return (
            <InfoSvg
              toastStyle={styleFromSig}
              iconColor={iconColor}
              iconSize={size}
              iconStyle={iconStyle}
            />
          );
        case 'warning':
          return (
            <WarningSvg
              toastStyle={styleFromSig}
              iconColor={iconColor}
              iconSize={size}
              iconStyle={iconStyle}
            />
          );
        case 'loading':
          return <CustomLoading color={iconColor} size={size} />;
        default:
          return null;
      }
    })();

    if (pendingSig === sig) {
      pendingOpacity.value = withTiming(1, { duration: 160 }, () =>
        runOnJS(promotePending)(sig)
      );
    }
    return <View style={styles.centerFill}>{builtinNode}</View>;
  };

  const renderFallback = () => {
    if (icon) {
      return (
        <View style={styles.centerFill}>
          <Text style={{ fontSize: size }}>{icon}</Text>
        </View>
      );
    }
    return (
      <View style={styles.centerFill}>
        {type === 'loading' ? (
          <CustomLoading color={iconColor} size={size} />
        ) : (
          (() => {
            switch (type) {
              case 'error':
                return (
                  <ErrorSvg
                    toastStyle={toastStyle}
                    iconColor={iconColor}
                    iconSize={size}
                    iconStyle={iconStyle}
                  />
                );
              case 'success':
                return (
                  <SuccessSvg
                    toastStyle={toastStyle}
                    iconColor={iconColor}
                    iconSize={size}
                    iconStyle={iconStyle}
                  />
                );
              case 'info':
                return (
                  <InfoSvg
                    toastStyle={toastStyle}
                    iconColor={iconColor}
                    iconSize={size}
                    iconStyle={iconStyle}
                  />
                );
              case 'warning':
                return (
                  <WarningSvg
                    toastStyle={toastStyle}
                    iconColor={iconColor}
                    iconSize={size}
                    iconStyle={iconStyle}
                  />
                );
              default:
                return null;
            }
          })()
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Capa actual (zIndex 1) */}
      <Animated.View
        style={[StyleSheet.absoluteFill, currentAnimatedStyle]}
        pointerEvents="none"
      >
        {renderChild(currentSig, currentKind)}
      </Animated.View>

      {/* Capa pending (zIndex 1) */}
      {pendingSig && (
        <Animated.View
          style={[StyleSheet.absoluteFill, pendingAnimatedStyle]}
          pointerEvents="none"
        >
          {renderChild(pendingSig, pendingKind!)}
        </Animated.View>
      )}

      {/* Spinner (zIndex 2) siempre por encima */}
      {showSpinner && (
        <View style={styles.spinnerOverlay} pointerEvents="none">
          <ActivityIndicator size="small" color={iconColor ?? '#999'} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centerFill: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2, // <- arriba de todo
  },
});
