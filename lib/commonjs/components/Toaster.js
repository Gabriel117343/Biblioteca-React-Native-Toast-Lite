"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toaster = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _storeToast = require("../store/storeToast.js");
var _Toast = require("../components/toasts/Toast.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Renderizamos el componente Toaster
const Toaster = () => {
  const {
    toasts
  } = (0, _storeToast.useToastStore)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [styles.container, _reactNative.StyleSheet.absoluteFillObject],
    children: toasts.map((toast, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Toast.Toast, {
      type: toast.type,
      message: toast.message,
      ...toast.props
    }, index))
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