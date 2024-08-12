"use strict";

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';
import ErrorSvg from "../ui/ErrorSvg.js";
import { toastStyles } from "./commonStyles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ToastError = ({
  title,
  message
}) => {
  return /*#__PURE__*/_jsxs(Animated.View, {
    entering: FadeInUp,
    exiting: FadeOutLeft,
    style: toastStyles.container,
    children: [/*#__PURE__*/_jsx(View, {
      style: [StyleSheet.absoluteFillObject, toastStyles.fondoContainer, {
        backgroundColor: '#FF5347'
      }]
    }), /*#__PURE__*/_jsx(ErrorSvg, {
      color: "white",
      size: 24
    }), /*#__PURE__*/_jsxs(View, {
      children: [/*#__PURE__*/_jsx(Text, {
        style: toastStyles.title,
        children: title ?? 'Ha ocurrido  un error'
      }), /*#__PURE__*/_jsx(Text, {
        style: toastStyles.text,
        children: message ?? 'Error inesperado'
      })]
    })]
  });
};
//# sourceMappingURL=ToastError.js.map