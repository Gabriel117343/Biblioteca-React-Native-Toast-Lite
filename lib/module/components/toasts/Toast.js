"use strict";

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';
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
  position
}) => {
  return /*#__PURE__*/_jsxs(Animated.View, {
    entering: FadeInUp,
    exiting: FadeOutLeft,
    style: [toastStyles.container, positionStyles[position ?? 'top']],
    children: [/*#__PURE__*/_jsx(View, {
      style: [StyleSheet.absoluteFillObject, toastStyles.fondoContainer, {
        backgroundColor: TOAST_CONFIG[type].color
      }]
    }), renderIcon(type), /*#__PURE__*/_jsxs(View, {
      children: [/*#__PURE__*/_jsx(Text, {
        style: toastStyles.title,
        children: title ?? TOAST_CONFIG[type].title
      }), /*#__PURE__*/_jsx(Text, {
        style: toastStyles.text,
        children: message ?? TOAST_CONFIG[type].message
      })]
    })]
  });
};
// Función para renderizar el icono según el tipo de toast
function renderIcon(type) {
  switch (type) {
    case 'error':
      return /*#__PURE__*/_jsx(ErrorSvg, {
        color: "white",
        size: 24
      });
    case 'success':
      return /*#__PURE__*/_jsx(SuccessSvg, {
        color: "white",
        size: 24
      });
    case 'info':
      return /*#__PURE__*/_jsx(InfoSvg, {
        color: "white",
        size: 24
      });
    case 'warning':
      return /*#__PURE__*/_jsx(WarningSvg, {
        color: "white",
        size: 24
      });
    case 'loading':
      return /*#__PURE__*/_jsx(View, {
        style: {
          width: 24,
          height: 24,
          justifyContent: 'center',
          alignItems: 'center'
        },
        children: /*#__PURE__*/_jsx(ActivityIndicator, {
          size: "small",
          color: "white"
        })
      });
    default:
      return null;
  }
}
//# sourceMappingURL=Toast.js.map