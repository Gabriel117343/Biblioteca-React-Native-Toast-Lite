"use strict";

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useToastStore } from "../store/storeToast.js";
import { Toast } from "../components/toasts/Toast.js";
import { toastStyles } from "../components/toasts/commonStyles.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const Toaster = () => {
  const {
    toasts
  } = useToastStore();
  // se renderiza el componente Toast con las props de cada toast
  return /*#__PURE__*/_jsx(View, {
    style: [toastStyles.containerToast, StyleSheet.absoluteFillObject],
    children: toasts.map(toast => /*#__PURE__*/_jsx(Toast, {
      id: toast.props?.id || 0 // el 0 nunca se aplicara
      ,
      type: toast.type,
      message: toast.message,
      ...toast.props
    }, toast.props?.id))
  });
};