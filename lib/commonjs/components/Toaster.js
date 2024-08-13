"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toaster = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _storeToast = require("../store/storeToast.js");
var _ToastError = require("./toasts/ToastError.js");
var _ToastSuccess = require("./toasts/ToastSuccess.js");
var _ToastInfo = require("./toasts/ToastInfo.js");
var _ToastWarning = require("./toasts/ToastWarning.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Definimos una interfaz para los props de Toaster

// Definimos una interfaz para el objeto toast

const Toaster = () => {
  const {
    toasts
  } = (0, _storeToast.useToastStore)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [styles.container, _reactNative.StyleSheet.absoluteFillObject],
    children: toasts.map(toast => {
      if (toast.type === 'error') {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToastError.ToastError, {
          message: toast.message,
          ...toast.props
        }, toast.id);
      } else if (toast.type === 'success') {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToastSuccess.ToastSuccess, {
          message: toast.message,
          ...toast.props
        }, toast.id);
      } else if (toast.type === 'info') {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToastInfo.ToastInfo, {
          message: toast.message,
          ...toast.props
        }, toast.id);
      } else if (toast.type === 'warning') {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToastWarning.ToastWarning, {
          message: toast.message,
          ...toast.props
        }, toast.id);
      }
    })
  });
};
exports.Toaster = Toaster;
const styles = _reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center'
  }
});
//# sourceMappingURL=Toaster.js.map