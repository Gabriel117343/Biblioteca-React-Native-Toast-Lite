"use strict";

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useToastStore } from "../store/storeToast.js";
import { Toast } from "../components/toasts/Toast.js";

// Renderizamos el componente Toaster
import { jsx as _jsx } from "react/jsx-runtime";
export const Toaster = () => {
  const {
    toasts
  } = useToastStore();
  return /*#__PURE__*/_jsx(View, {
    style: [styles.container, StyleSheet.absoluteFillObject],
    children: toasts.map((toast, index) => /*#__PURE__*/_jsx(Toast, {
      type: toast.type,
      message: toast.message,
      ...toast.props
    }, index))
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