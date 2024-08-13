"use strict";

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';
import WarningSvg from "../ui/WarningSvg.js";
import { toastStyles, positionStyles } from "./commonStyles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ToastWarning = ({
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
        backgroundColor: '#FFC107'
      }]
    }), /*#__PURE__*/_jsx(WarningSvg, {
      color: "white",
      size: 24
    }), /*#__PURE__*/_jsxs(View, {
      children: [/*#__PURE__*/_jsx(Text, {
        style: toastStyles.title,
        children: title ?? '¡Advertencia!'
      }), /*#__PURE__*/_jsx(Text, {
        style: toastStyles.text,
        children: message ?? 'Operación con advertencia'
      })]
    })]
  });
};
//# sourceMappingURL=ToastWarning.js.map