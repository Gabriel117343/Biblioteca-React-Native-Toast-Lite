"use strict";

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft, useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';
import ErrorSvg from "../ui/ErrorSvg.js";
import SuccessSvg from "../ui/SuccessSvg.js";
import InfoSvg from "../ui/InfoSvg.js";
import WarningSvg from "../ui/WarningSvg.js";
import { toastStyles, positionStyles } from "./commonStyles.js";
import { TOAST_CONFIG } from "./toastConfig.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Toast = ({
  type,
  title,
  message,
  position,
  toastStyle = 'primary',
  icon,
  duration,
  // 3000 ms por defecto
  progress = true,
  border = true,
  styles // objeto de estilos personalizados
}) => {
  const progressValue = useSharedValue(0);
  useEffect(() => {
    // Reiniciar el progressValue cuando cambie el type y animarlo nuevamente
    progressValue.value = 0;
    // la animación se ejecuta varias veces hasta que se cumpla la duración
    progressValue.value = withTiming(115, {
      duration: duration
    });
  }, [duration, progressValue, progress, type]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`
    };
  });
  return /*#__PURE__*/_jsxs(Animated.View, {
    entering: FadeInUp,
    exiting: FadeOutLeft,
    style: [toastStyles.container, positionStyles[position ?? 'top'], {
      borderWidth: border ? 1 : 0,
      borderColor: styles?.borderColor ?? TOAST_CONFIG[type][toastStyle].borderColor
    }],
    children: [/*#__PURE__*/_jsx(View, {
      style: [StyleSheet.absoluteFillObject, toastStyles.fondoContainer, {
        backgroundColor: styles?.backgroundColor ?? TOAST_CONFIG[type][toastStyle].backgroundColor
      }]
    }), /*#__PURE__*/_jsxs(View, {
      style: toastStyles.contentContainer,
      children: [/*#__PURE__*/_jsx(RenderIcon, {
        type: type,
        toastStyle: toastStyle,
        iconColor: styles?.iconColor ?? TOAST_CONFIG[type][toastStyle].iconColor,
        icon: icon,
        iconSize: styles?.iconSize,
        iconStyle: styles?.iconStyle
      }), /*#__PURE__*/_jsxs(View, {
        style: title ? {} : {
          alignItems: 'center'
        },
        children: [title && /*#__PURE__*/_jsx(Text, {
          style: [toastStyles.title, {
            fontSize: styles?.titleSize ?? TOAST_CONFIG[type].titleSize,
            color: styles?.titleColor ?? TOAST_CONFIG[type][toastStyle].titleColor
          }],
          children: title ?? TOAST_CONFIG[type].title
        }), /*#__PURE__*/_jsx(Text, {
          style: [toastStyles.text, {
            fontSize: styles?.textSize ?? TOAST_CONFIG[type].textSize,
            color: styles?.textColor ?? TOAST_CONFIG[type][toastStyle].textColor
          }, !title && {
            fontWeight: 'bold'
          }],
          children: message ?? TOAST_CONFIG[type].message
        })]
      }), progress && /*#__PURE__*/_jsx(View, {
        style: toastStyles.progressContainer,
        children: /*#__PURE__*/_jsx(Animated.View, {
          style: [toastStyles.progressBar, animatedStyle, {
            backgroundColor: styles?.progressColor ?? TOAST_CONFIG[type][toastStyle].progressColor
          }]
        })
      })]
    })]
  });
};
// Función para renderizar el icono según el tipo de toast

function RenderIcon({
  type,
  toastStyle,
  iconColor,
  icon,
  iconSize,
  iconStyle
}) {
  const iconProgress = useSharedValue(0);
  useEffect(() => {
    // Reiniciar el iconProgress cuando cambie el type y animarlo nuevamente
    iconProgress.value = 0;
    iconProgress.value = withTiming(1, {
      duration: 500
    });
  }, [iconProgress, type]);
  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(iconProgress.value, [0, 1], [0, 1]),
      transform: [{
        scale: interpolate(iconProgress.value, [0, 1], [0.5, 1])
      }]
    };
  });
  const renderIcon = () => {
    if (icon) return /*#__PURE__*/_jsx(Text, {
      style: [{
        fontSize: iconSize ?? 25
      }],
      children: icon
    });
    switch (type) {
      case 'error':
        return /*#__PURE__*/_jsx(ErrorSvg, {
          toastStyle: toastStyle,
          iconColor: iconColor,
          iconSize: iconSize,
          iconStyle: iconStyle
        });
      case 'success':
        return /*#__PURE__*/_jsx(SuccessSvg, {
          toastStyle: toastStyle,
          iconColor: iconColor,
          iconSize: iconSize,
          iconStyle: iconStyle
        });
      case 'info':
        return /*#__PURE__*/_jsx(InfoSvg, {
          toastStyle: toastStyle,
          iconColor: iconColor,
          iconSize: iconSize,
          iconStyle: iconStyle
        });
      case 'warning':
        return /*#__PURE__*/_jsx(WarningSvg, {
          toastStyle: toastStyle,
          iconColor: iconColor,
          iconSize: iconSize,
          iconStyle: iconStyle
        });
      case 'loading':
        return /*#__PURE__*/_jsx(ActivityIndicator, {
          size: iconSize ?? 30,
          color: iconColor
        });
      default:
        return null;
    }
  };
  return /*#__PURE__*/_jsx(Animated.View, {
    style: animatedIconStyle,
    children: renderIcon()
  });
}