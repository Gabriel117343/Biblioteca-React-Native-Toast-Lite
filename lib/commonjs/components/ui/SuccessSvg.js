"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _react = _interopRequireDefault(require("react"));
var _toastConfig = require("../toasts/toastConfig.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SuccessSvg = ({
  iconColor,
  iconSize = 28,
  iconStyle = 'outline',
  toastStyle = 'primary'
}) => {
  const defaultColor = _toastConfig.TOAST_CONFIG.success[toastStyle]['iconColor'];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
    width: iconSize,
    height: iconSize,
    fill: iconColor ?? defaultColor,
    viewBox: "0 0 16 16",
    children: toastStyle === 'primary' && iconStyle !== 'solid' ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [iconStyle === 'outline' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
        d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
        d: "m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
    })
  });
};
var _default = exports.default = SuccessSvg;
//# sourceMappingURL=SuccessSvg.js.map