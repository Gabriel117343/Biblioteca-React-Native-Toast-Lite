"use strict";

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';
import InfoSvg from "../ui/InfoSvg.js";
import { toastStyles, positionStyles } from "./commonStyles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ToastInfo = ({
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
        backgroundColor: '#007BFF'
      }]
    }), /*#__PURE__*/_jsx(InfoSvg, {
      color: "white",
      size: 24
    }), /*#__PURE__*/_jsxs(View, {
      children: [/*#__PURE__*/_jsx(Text, {
        style: toastStyles.title,
        children: title ?? 'Error'
      }), /*#__PURE__*/_jsx(Text, {
        style: toastStyles.text,
        children: message ?? 'Error inesperado'
      })]
    })]
  });
};
//# sourceMappingURL=ToastInfo.js.map