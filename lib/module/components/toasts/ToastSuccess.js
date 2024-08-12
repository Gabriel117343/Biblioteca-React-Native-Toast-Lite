"use strict";

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';
import SuccessSvg from "../ui/SuccessSvg.js";
import { toastStyles } from "./commonStyles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ToastSuccess = ({
  title,
  message
}) => {
  return /*#__PURE__*/_jsxs(Animated.View, {
    entering: FadeInUp,
    exiting: FadeOutLeft,
    style: toastStyles.container,
    children: [/*#__PURE__*/_jsx(View, {
      style: [StyleSheet.absoluteFillObject, toastStyles.fondoContainer, {
        backgroundColor: '#4CAF50'
      }]
    }), /*#__PURE__*/_jsx(SuccessSvg, {
      color: "white",
      size: 24
    }), /*#__PURE__*/_jsxs(View, {
      children: [/*#__PURE__*/_jsx(Text, {
        style: toastStyles.title,
        children: title ?? '¡Éxito!'
      }), /*#__PURE__*/_jsx(Text, {
        style: toastStyles.text,
        children: message ?? 'Operación realizada con éxito'
      })]
    })]
  });
};
//# sourceMappingURL=ToastSuccess.js.map