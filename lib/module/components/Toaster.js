"use strict";

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useToastStore } from "../store/storeToast.js";
import { ToastError } from "./toasts/ToastError.js";
import { ToastSuccess } from "./toasts/ToastSuccess.js";
import { ToastInfo } from "./toasts/ToastInfo.js";
import { ToastWarning } from "./toasts/ToastWarning.js";
// Definimos una interfaz para los props de Toaster

// Definimos una interfaz para el objeto toast
import { jsx as _jsx } from "react/jsx-runtime";
export const Toaster = () => {
  const {
    toasts
  } = useToastStore();
  return /*#__PURE__*/_jsx(View, {
    style: [styles.container, StyleSheet.absoluteFillObject],
    children: toasts.map(toast => {
      if (toast.type === 'error') {
        return /*#__PURE__*/_jsx(ToastError, {
          message: toast.message,
          ...toast.props
        }, toast.id);
      } else if (toast.type === 'success') {
        return /*#__PURE__*/_jsx(ToastSuccess, {
          message: toast.message,
          ...toast.props
        }, toast.id);
      } else if (toast.type === 'info') {
        return /*#__PURE__*/_jsx(ToastInfo, {
          message: toast.message,
          ...toast.props
        }, toast.id);
      } else if (toast.type === 'warning') {
        return /*#__PURE__*/_jsx(ToastWarning, {
          message: toast.message,
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
    alignItems: 'center'
  }
});
//# sourceMappingURL=Toaster.js.map