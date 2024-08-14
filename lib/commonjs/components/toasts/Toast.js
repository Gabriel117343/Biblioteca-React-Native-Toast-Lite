"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _ErrorSvg = _interopRequireDefault(require("../ui/ErrorSvg.js"));
var _SuccessSvg = _interopRequireDefault(require("../ui/SuccessSvg.js"));
var _InfoSvg = _interopRequireDefault(require("../ui/InfoSvg.js"));
var _WarningSvg = _interopRequireDefault(require("../ui/WarningSvg.js"));
var _commonStyles = require("./commonStyles.js");
var _toastConfig = require("./toastConfig.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Toast = ({
  type,
  title,
  message,
  position
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeReanimated.default.View, {
    entering: _reactNativeReanimated.FadeInUp,
    exiting: _reactNativeReanimated.FadeOutLeft,
    style: [_commonStyles.toastStyles.container, _commonStyles.positionStyles[position ?? 'top']],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [_reactNative.StyleSheet.absoluteFillObject, _commonStyles.toastStyles.fondoContainer, {
        backgroundColor: _toastConfig.TOAST_CONFIG[type].color
      }]
    }), renderIcon(type), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: _commonStyles.toastStyles.title,
        children: title ?? _toastConfig.TOAST_CONFIG[type].title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: _commonStyles.toastStyles.text,
        children: message ?? _toastConfig.TOAST_CONFIG[type].message
      })]
    })]
  });
};
// Función para renderizar el icono según el tipo de toast
exports.Toast = Toast;
function renderIcon(type) {
  switch (type) {
    case 'error':
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorSvg.default, {
        color: "white",
        size: 24
      });
    case 'success':
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SuccessSvg.default, {
        color: "white",
        size: 24
      });
    case 'info':
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InfoSvg.default, {
        color: "white",
        size: 24
      });
    case 'warning':
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WarningSvg.default, {
        color: "white",
        size: 24
      });
    case 'loading':
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          width: 24,
          height: 24,
          justifyContent: 'center',
          alignItems: 'center'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
          size: "small",
          color: "white"
        })
      });
    default:
      return null;
  }
}
//# sourceMappingURL=Toast.js.map