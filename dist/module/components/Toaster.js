"use strict";

import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useToastStore } from "../store/storeToast.js";
import { Toast } from "../components/toasts/Toast.js";
import { toastStyles } from "../components/toasts/commonStyles.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const Toaster = () => {
  const {
    toasts
  } = useToastStore();
  return /*#__PURE__*/_jsx(View, {
    pointerEvents: "box-none",
    style: [toastStyles.containerToast, StyleSheet.absoluteFillObject, {
      zIndex: Platform.OS === 'web' ? 2147483647 : 9999
    }],
    children: toasts.map(toast => /*#__PURE__*/_jsx(Toast, {
      id: toast.props.id,
      type: toast.type,
      message: toast.message,
      callbacks: toast.props?.callbacks,
      pauseOnPress: toast.props?.pauseOnPress,
      swipeable: toast.props?.swipeable,
      ...toast.props
    }, toast.props?.id))
  });
};