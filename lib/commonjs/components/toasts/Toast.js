"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _ErrorSvg = _interopRequireDefault(require("../ui/ErrorSvg.js"));
var _SuccessSvg = _interopRequireDefault(require("../ui/SuccessSvg.js"));
var _InfoSvg = _interopRequireDefault(require("../ui/InfoSvg.js"));
var _WarningSvg = _interopRequireDefault(require("../ui/WarningSvg.js"));
var _commonStyles = require("./commonStyles.js");
var _toastConfig = require("./toastConfig.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Toast = ({
  type,
  title,
  message,
  position,
  toastStyle = 'primary',
  icon,
  duration = 3000,
  progress = false,
  border = true,
  styles // objeto de estilos personalizados
}) => {
  const progressValue = (0, _reactNativeReanimated.useSharedValue)(0);
  (0, _react.useEffect)(() => {
    // Reiniciar el progressValue cuando cambie el type y animarlo nuevamente
    progressValue.value = 0;
    // la animación se ejecuta varias veces hasta que se cumpla la duración
    progressValue.value = (0, _reactNativeReanimated.withTiming)(120, {
      duration: duration
    });
  }, [duration, progressValue, progress, type]);
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      width: `${progressValue.value}%`
    };
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeReanimated.default.View, {
    entering: _reactNativeReanimated.FadeInUp,
    exiting: _reactNativeReanimated.FadeOutLeft,
    style: [_commonStyles.toastStyles.container, _commonStyles.positionStyles[position ?? 'top'], {
      borderWidth: border ? 1 : 0,
      borderColor: styles?.borderColor ?? _toastConfig.TOAST_CONFIG[type][toastStyle].borderColor
    }],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [_reactNative.StyleSheet.absoluteFillObject, _commonStyles.toastStyles.fondoContainer, {
        backgroundColor: styles?.backgroundColor ?? _toastConfig.TOAST_CONFIG[type][toastStyle].backgroundColor
      }]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _commonStyles.toastStyles.contentContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(RenderIcon, {
        type: type,
        toastStyle: toastStyle,
        iconColor: styles?.iconColor ?? _toastConfig.TOAST_CONFIG[type][toastStyle].iconColor,
        icon: icon,
        iconSize: styles?.iconSize,
        iconStyle: styles?.iconStyle
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: title ? {} : {
          alignItems: 'center'
        },
        children: [title && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [_commonStyles.toastStyles.title, {
            fontSize: styles?.titleSize ?? _toastConfig.TOAST_CONFIG[type].titleSize,
            color: styles?.titleColor ?? _toastConfig.TOAST_CONFIG[type][toastStyle].titleColor
          }],
          children: title ?? _toastConfig.TOAST_CONFIG[type].title
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [_commonStyles.toastStyles.text, {
            fontSize: styles?.textSize ?? _toastConfig.TOAST_CONFIG[type].textSize,
            color: styles?.textColor ?? _toastConfig.TOAST_CONFIG[type][toastStyle].textColor
          }, !title && {
            fontWeight: 'bold'
          }],
          children: message ?? _toastConfig.TOAST_CONFIG[type].message
        })]
      }), progress && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: _commonStyles.toastStyles.progressContainer,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
          style: [_commonStyles.toastStyles.progressBar, animatedStyle, {
            backgroundColor: styles?.progressColor ?? _toastConfig.TOAST_CONFIG[type][toastStyle].progressColor
          }]
        })
      })]
    })]
  });
};
// Función para renderizar el icono según el tipo de toast
exports.Toast = Toast;
function RenderIcon({
  type,
  toastStyle,
  iconColor,
  icon,
  iconSize,
  iconStyle
}) {
  const iconProgress = (0, _reactNativeReanimated.useSharedValue)(0);
  (0, _react.useEffect)(() => {
    // Reiniciar el iconProgress cuando cambie el type y animarlo nuevamente
    iconProgress.value = 0;
    iconProgress.value = (0, _reactNativeReanimated.withTiming)(1, {
      duration: 500
    });
  }, [iconProgress, type]);
  const animatedIconStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: (0, _reactNativeReanimated.interpolate)(iconProgress.value, [0, 1], [0, 1]),
      transform: [{
        scale: (0, _reactNativeReanimated.interpolate)(iconProgress.value, [0, 1], [0.5, 1])
      }]
    };
  });
  const renderIcon = () => {
    if (icon) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [{
        fontSize: iconSize ?? 25
      }],
      children: icon
    });
    switch (type) {
      case 'error':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorSvg.default, {
          toastStyle: toastStyle,
          iconColor: iconColor,
          iconSize: iconSize,
          iconStyle: iconStyle
        });
      case 'success':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SuccessSvg.default, {
          toastStyle: toastStyle,
          iconColor: iconColor,
          iconSize: iconSize,
          iconStyle: iconStyle
        });
      case 'info':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InfoSvg.default, {
          toastStyle: toastStyle,
          iconColor: iconColor,
          iconSize: iconSize,
          iconStyle: iconStyle
        });
      case 'warning':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WarningSvg.default, {
          toastStyle: toastStyle,
          iconColor: iconColor,
          iconSize: iconSize,
          iconStyle: iconStyle
        });
      case 'loading':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
          size: iconSize ?? 30,
          color: iconColor
        });
      default:
        return null;
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
    style: animatedIconStyle,
    children: renderIcon()
  });
}
//# sourceMappingURL=Toast.js.map