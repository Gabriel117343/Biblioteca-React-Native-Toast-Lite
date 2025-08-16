"use strict";

// Toast.tsx (final)
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, PanResponder, useWindowDimensions, Linking, Platform, Pressable } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft, FadeOutRight, useSharedValue, useAnimatedStyle, withTiming, interpolate, SlideInLeft, SlideOutRight, SlideOutLeft, BounceIn, BounceOut, cancelAnimation, runOnJS } from 'react-native-reanimated';
import RenderHTML from 'react-native-render-html';
import { toastStyles, positionStyles } from "./commonStyles.js";
import { TOAST_CONFIG } from "./toastConfig.js";
import { toast } from "../../store/storeToast.js";
import { RenderIcon } from "./RenderIcon.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Toast = ({
  message,
  type,
  props,
  createdAt
}) => {
  const {
    animationInDuration,
    animationOutDuration,
    animationType,
    border,
    callbacks,
    duration,
    icon,
    id,
    pauseOnPress,
    position,
    progress,
    styles,
    swipeable,
    title,
    toastStyle,
    iconUrl
  } = props;

  // ---- progreso / anim ----
  const progressValue = useSharedValue(0);
  const pressedSV = useSharedValue(false);

  // flags/work safe
  const dismissedSV = useSharedValue(0);
  const autoHideSV = useSharedValue(0);
  const runIdSV = useSharedValue(0);
  const latestCreatedAtSV = useSharedValue(createdAt);
  const isSwipingRef = useRef(false);
  const [defaultAnimation, setDefaultAnimation] = useState(animationType);
  const [swipeDirection, setSwipeDirection] = useState('none');
  const [progressAnimation, setProgressAnimation] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [linkPressed, setLinkPressed] = useState(false);
  const [htmlWidth, setHtmlWidth] = useState(0);
  const [selfH, setSelfH] = useState(0);
  const {
    width: contentWidth
  } = useWindowDimensions();
  const progressRef = useRef(null);
  const pressPauseTimeoutRef = useRef(null);
  const pressedEverPausedRef = useRef(false);

  // fallback JS por si el callback de la anim no corre
  const jsKillTimerRef = useRef(null);
  const clearJsTimer = () => {
    if (jsKillTimerRef.current) {
      clearTimeout(jsKillTimerRef.current);
      jsKillTimerRef.current = null;
    }
  };
  useEffect(() => {
    latestCreatedAtSV.value = createdAt;
  }, [createdAt, latestCreatedAtSV]);

  // ---- cierre robusto ----
  const closeToast = useCallback(() => {
    'worklet';

    if (dismissedSV.value === 1) return;
    dismissedSV.value = 1;
    autoHideSV.value = 1;
    cancelAnimation(progressValue);
    runOnJS(clearJsTimer)(); // limpia fallback

    if (callbacks?.onDismiss) runOnJS(callbacks.onDismiss)();
    runOnJS(toast.dismissInstance)(id, latestCreatedAtSV.value);
  }, [callbacks, id, progressValue, dismissedSV, autoHideSV, latestCreatedAtSV]);

  // ---- reanudar progreso ----
  const pauseProgressSafe = () => {
    // stop the progress animation and the JS fallback timeout while paused
    cancelAnimation(progressValue);
    if (progressRef.current?.setNativeProps) {
      progressRef.current.setNativeProps({
        style: {
          opacity: 0.6
        }
      });
    }
    clearJsTimer();
  };
  const resumeProgressSafe = () => {
    cancelAnimation(progressValue);
    const current = progressValue.value; // 0..115
    const remaining = Math.max(0, duration * (1 - current / 115));
    progressValue.value = withTiming(115, {
      duration: remaining
    }, () => {
      if (autoHideSV.value === 1) return;
      autoHideSV.value = 1;
      if (callbacks?.onAutoHide) runOnJS(callbacks.onAutoHide)();
      closeToast();
    });

    // reschedule JS fallback timer with the remaining time so total lifetime extends by paused duration
    clearJsTimer();
    jsKillTimerRef.current = setTimeout(() => {
      if (dismissedSV.value === 1) return;
      closeToast();
    }, Math.max(0, remaining + 80));
    if (progressRef.current?.setNativeProps) {
      progressRef.current.setNativeProps({
        style: {
          opacity: 1
        }
      });
    }
  };

  // ---- reset + arranque progreso + fallback ----
  useEffect(() => {
    runIdSV.value = runIdSV.value + 1;
    const myRunId = runIdSV.value;
    dismissedSV.value = 0;
    autoHideSV.value = 0;
    cancelAnimation(progressValue);
    progressValue.value = 0;
    clearJsTimer();
    setSwipeDirection('none');
    setProgressAnimation(false);
    setIsPressed(false);
    setLinkPressed(false);
    progressValue.value = withTiming(115, {
      duration
    }, () => {
      if (myRunId !== runIdSV.value) return;
      if (autoHideSV.value === 1) return;
      autoHideSV.value = 1;
      if (callbacks?.onAutoHide) runOnJS(callbacks.onAutoHide)();
      closeToast();
    });
    jsKillTimerRef.current = setTimeout(() => {
      if (dismissedSV.value === 1) return;
      closeToast();
    }, Math.max(0, duration + 80));
    return () => {
      cancelAnimation(progressValue);
      clearJsTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdAt, duration]);

  // ---- barra de progreso ----
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progressValue.value, [0, 50, 100], [0.6, 0.6, 1]);
    return {
      width: `${progressValue.value}%`,
      opacity
    };
  });

  // ---- swipe HORIZONTAL (izq/der) ----
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (_, {
      dx,
      dy
    }) => Boolean(swipeable && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)),
    onPanResponderGrant: () => {
      if (pressPauseTimeoutRef.current) {
        clearTimeout(pressPauseTimeoutRef.current);
        pressPauseTimeoutRef.current = null;
      }
      if (isPressed) {
        setIsPressed(false);
        pressedSV.value = false;
        if (pauseOnPress && pressedEverPausedRef.current) {
          resumeProgressSafe();
        }
      }
      isSwipingRef.current = false;
    },
    onPanResponderMove: (_, {
      dx,
      dy
    }) => {
      if (!swipeable || dismissedSV.value === 1) return;
      if (Math.abs(dx) <= Math.abs(dy)) return;
      setDefaultAnimation('fade');
      setProgressAnimation(true);
      isSwipingRef.current = true;
      const threshold = 50;
      if (dx > threshold) {
        if (swipeDirection !== 'right') {
          setSwipeDirection('right');
          // Primero notificamos la dirección
          if (callbacks?.onSwipe) {
            runOnJS(callbacks.onSwipe)('right');
            // Cerramos después de un pequeño retraso
            setTimeout(() => {
              if (dismissedSV.value !== 1) {
                closeToast();
              }
            }, 100);
            return; // Importante para evitar el closeToast inmediato
          }
        }
        closeToast(); // cerrar ya
      } else if (dx < -threshold) {
        if (swipeDirection !== 'left') {
          setSwipeDirection('left');
          // Primero notificamos la dirección
          if (callbacks?.onSwipe) {
            runOnJS(callbacks.onSwipe)('left');
            // Cerramos después de un pequeño retraso
            setTimeout(() => {
              if (dismissedSV.value !== 1) {
                closeToast();
              }
            }, 100);
            return; // Importante para evitar el closeToast inmediato
          }
        }
        closeToast(); // cerrar ya
      } else {
        if (swipeDirection !== 'none') setSwipeDirection('none');
      }
    },
    onPanResponderRelease: () => {
      if (dismissedSV.value !== 1 && pauseOnPress && pressedEverPausedRef.current) {
        resumeProgressSafe();
      }
      isSwipingRef.current = false;
      setSwipeDirection('none');
    },
    onPanResponderTerminate: () => {
      if (dismissedSV.value !== 1 && pauseOnPress && pressedEverPausedRef.current) {
        resumeProgressSafe();
      }
      isSwipingRef.current = false;
      setSwipeDirection('none');
    },
    onPanResponderTerminationRequest: () => true
  })).current;

  // ---- animaciones de entrada/salida ----
  const handleAnimation = phase => {
    if (phase === 'entering') {
      switch (defaultAnimation) {
        case 'slide':
          return SlideInLeft.duration(animationInDuration);
        case 'bounce':
          return BounceIn.duration(animationInDuration);
        default:
          return FadeInUp.duration(animationInDuration);
      }
    } else {
      if (progressAnimation && (swipeDirection === 'left' || swipeDirection === 'right')) {
        return swipeDirection === 'left' ? defaultAnimation === 'slide' ? SlideOutLeft.duration(animationOutDuration) : FadeOutLeft.duration(animationOutDuration) : defaultAnimation === 'slide' ? SlideOutRight.duration(animationOutDuration) : FadeOutRight.duration(animationOutDuration);
      }
      switch (defaultAnimation) {
        case 'slide':
          return SlideOutRight.duration(animationOutDuration);
        case 'bounce':
          return BounceOut.duration(animationOutDuration);
        default:
          return FadeOutLeft.duration(animationOutDuration);
      }
    }
  };

  // ---- helpers texto/layout ----
  const toBr = s => (s ?? '').replace(/\r\n|\r|\n|\\n/g, '<br/>');
  const toNL = s => (s ?? '').replace(/\\n/g, '\n');
  const resolveWidth = widthToResolve => {
    const w = widthToResolve;
    if (w === undefined || w === 'auto') return Platform.OS === 'web' ? 400 : '90%';
    return w;
  };

  // ---- RenderHTML ----
  const memoizedTagsStyles = React.useMemo(() => ({
    b: {
      fontWeight: 'bold'
    },
    strong: {
      fontWeight: 'bold'
    },
    i: {
      fontStyle: 'italic'
    },
    em: {
      fontStyle: 'italic'
    },
    u: {
      textDecorationLine: 'underline'
    },
    a: {
      color: styles?.linkColor ?? '#2E7DFF',
      textDecorationLine: 'underline',
      fontWeight: '500'
    },
    li: {
      marginBottom: 2
    }
  }), [styles?.linkColor]);
  const memoizedRenderersProps = React.useMemo(() => ({
    a: {
      // @ts-expect-error tipado RenderHTML
      onPress: (_, href) => {
        setLinkPressed(true);
        setTimeout(() => {
          if (callbacks?.onLinkPress) callbacks.onLinkPress(href ?? '');
          if (href) Linking.openURL(href).catch(() => {});
          setTimeout(() => setLinkPressed(false), 300);
        }, 10);
      }
    }
  }), [callbacks]);

  // ---- tap/press ----
  const handlePressIn = () => {
    setIsPressed(true);
    pressedSV.value = true;
    if (pauseOnPress && progress) {
      pressedEverPausedRef.current = false;
      if (pressPauseTimeoutRef.current) {
        clearTimeout(pressPauseTimeoutRef.current);
      }
      pressPauseTimeoutRef.current = setTimeout(() => {
        pauseProgressSafe();
        pressedEverPausedRef.current = true;
      }, 120);
    }
    if (callbacks?.onPressIn) callbacks.onPressIn();
  };
  const handlePressOut = () => {
    setIsPressed(false);
    pressedSV.value = false;
    if (pressPauseTimeoutRef.current) {
      clearTimeout(pressPauseTimeoutRef.current);
      pressPauseTimeoutRef.current = null;
    }
    if (pauseOnPress && pressedEverPausedRef.current) {
      resumeProgressSafe();
    }
    if (callbacks?.onPressOut) callbacks.onPressOut();
  };
  const handlePress = () => {
    if (callbacks?.onPress) callbacks.onPress();
  };

  // Posicionamiento: el Toaster ya aplica padding (safe areas), aquí solo offsets locales
  const centerFix = position === 'center' ? {
    top: '50%',
    alignSelf: 'center',
    transform: [{
      translateY: -selfH / 2
    }]
  } : undefined;
  const basePosStyle = positionStyles[position ?? 'top'];
  const anchorFix = position?.startsWith('top') ? {
    top: styles?.top ?? 10
  } : position?.startsWith('bottom') ? {
    bottom: styles?.bottom ?? 10
  } : undefined;

  // offsets explícitos del usuario (solo si están definidos)
  const userOffsets = {
    ...(styles?.top !== undefined ? {
      top: styles.top
    } : null),
    ...(styles?.bottom !== undefined ? {
      bottom: styles.bottom
    } : null),
    ...(styles?.left !== undefined ? {
      left: styles.left
    } : null),
    ...(styles?.right !== undefined ? {
      right: styles.right
    } : null)
  };
  return /*#__PURE__*/_jsx(Animated.View, {
    onLayout: e => setSelfH(e.nativeEvent.layout.height),
    entering: Platform.OS === 'web' ? undefined : handleAnimation('entering'),
    exiting: Platform.OS === 'web' ? undefined : handleAnimation('exiting'),
    style: [toastStyles.container, basePosStyle, anchorFix, centerFix, userOffsets, {
      borderWidth: border ? 1 : 0,
      width: resolveWidth(styles?.width),
      ...(styles?.maxWidth !== undefined && {
        maxWidth: styles.maxWidth
      }),
      ...(styles?.minWidth !== undefined && {
        minWidth: styles.minWidth
      }),
      minHeight: styles?.height ?? 58,
      borderColor: styles?.borderColor ?? TOAST_CONFIG[type][toastStyle].borderColor,
      borderRadius: styles?.borderRadius ?? 15,
      zIndex: styles?.zIndex ?? (Platform.OS === 'web' ? 2147483001 : 10)
    }],
    children: /*#__PURE__*/_jsxs(Pressable, {
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
      onPress: () => {
        if (!linkPressed) handlePress();
      },
      hitSlop: 8,
      ...(swipeable ? panResponder.panHandlers : {}),
      disabled: false,
      children: [/*#__PURE__*/_jsx(View, {
        pointerEvents: "none",
        style: [StyleSheet.absoluteFillObject, {
          backgroundColor: styles?.backgroundColor ?? TOAST_CONFIG[type][toastStyle].backgroundColor,
          borderLeftColor: toastStyle === 'secondary' ? TOAST_CONFIG[type][toastStyle].borderColor : 'transparent',
          borderLeftWidth: toastStyle === 'secondary' ? 5 : 0,
          opacity: styles?.opacity ? isPressed ? Math.min(1, styles.opacity + 0.1) : styles.opacity : isPressed ? 0.95 : 0.9
        }]
      }), /*#__PURE__*/_jsxs(View, {
        style: toastStyles.contentContainer,
        children: [/*#__PURE__*/_jsx(RenderIcon, {
          type: type,
          toastStyle: toastStyle,
          iconColor: styles?.iconColor ?? TOAST_CONFIG[type][toastStyle].iconColor,
          icon: icon,
          iconResizeMode: styles?.iconResizeMode,
          iconUrl: iconUrl,
          iconSize: styles?.iconSize,
          iconStyle: styles?.iconStyle,
          iconRounded: styles?.iconRounded,
          iconBorderRadius: styles?.iconBorderRadius
        }), /*#__PURE__*/_jsxs(View, {
          onLayout: e => setHtmlWidth(e.nativeEvent.layout.width),
          style: [title ? null : {
            alignItems: 'center'
          }, {
            flex: 1,
            minWidth: 0,
            paddingRight: 3
          }],
          children: [title ? styles?.titleIsHtml ? /*#__PURE__*/_jsx(RenderHTML, {
            contentWidth: htmlWidth || contentWidth,
            source: {
              html: `<span>${toBr(title ?? TOAST_CONFIG[type].title)}</span>`
            },
            baseStyle: {
              fontSize: styles?.titleSize ?? TOAST_CONFIG[type].titleSize,
              color: styles?.titleColor ?? TOAST_CONFIG[type][toastStyle].titleColor
            },
            tagsStyles: memoizedTagsStyles,
            renderersProps: memoizedRenderersProps
          }) : /*#__PURE__*/_jsx(Text, {
            style: [toastStyles.title, {
              fontSize: styles?.titleSize ?? TOAST_CONFIG[type].titleSize,
              color: styles?.titleColor ?? TOAST_CONFIG[type][toastStyle].titleColor
            }, {
              flexShrink: 1
            }],
            children: toNL(title ?? TOAST_CONFIG[type].title)
          }) : null, styles?.messageIsHtml ? /*#__PURE__*/_jsx(RenderHTML, {
            contentWidth: htmlWidth || contentWidth,
            source: {
              html: `<span>${toBr(message ?? TOAST_CONFIG[type].message)}</span>`
            },
            baseStyle: {
              fontSize: styles?.textSize ?? TOAST_CONFIG[type].textSize,
              color: styles?.textColor ?? TOAST_CONFIG[type][toastStyle].textColor,
              fontWeight: title ? 'normal' : 'bold'
            },
            tagsStyles: memoizedTagsStyles,
            renderersProps: memoizedRenderersProps
          }) : /*#__PURE__*/_jsx(Text, {
            style: [toastStyles.text, {
              fontSize: styles?.textSize ?? TOAST_CONFIG[type].textSize,
              color: styles?.textColor ?? TOAST_CONFIG[type][toastStyle].textColor
            }, !title && {
              fontWeight: 'bold'
            }, {
              flexShrink: 1
            }],
            children: toNL(message ?? TOAST_CONFIG[type].message)
          })]
        }), progress && /*#__PURE__*/_jsx(View, {
          style: toastStyles.progressContainer,
          pointerEvents: "none",
          children: /*#__PURE__*/_jsx(Animated.View, {
            ref: progressRef,
            style: [toastStyles.progressBar, animatedStyle, {
              backgroundColor: styles?.progressColor ?? TOAST_CONFIG[type][toastStyle].progressColor
            }]
          })
        })]
      })]
    })
  });
};