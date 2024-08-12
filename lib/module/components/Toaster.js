"use strict";

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useToastStore } from "../store/storeToast.js";
import { ToastError } from "./toasts/ToastError.js";
import { ToastSuccess } from "./toasts/ToastSuccess.js";
// Definimos una interfaz para los props de Toaster

// Definimos una interfaz para el objeto toast
import { jsx as _jsx } from "react/jsx-runtime";
export const Toaster = () => {
  const {
    toasts
  } = useToastStore();
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: toasts.map(toast => {
      if (toast.type === 'error') {
        return /*#__PURE__*/_jsx(ToastError, {
          ...toast.props
        }, toast.id);
      } else if (toast.type === 'success') {
        return /*#__PURE__*/_jsx(ToastSuccess, {
          ...toast.props
        }, toast.id);
      }
    })
  });
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 10
  }
});
//# sourceMappingURL=Toaster.js.map