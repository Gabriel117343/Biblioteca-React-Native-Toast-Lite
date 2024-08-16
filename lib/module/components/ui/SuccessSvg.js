"use strict";

import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { TOAST_CONFIG } from "../toasts/toastConfig.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const SuccessSvg = ({
  iconColor,
  iconSize = 28,
  iconStyle = 'outline',
  toastStyle = 'primary'
}) => {
  const defaultColor = TOAST_CONFIG.success[toastStyle]['iconColor'];
  return /*#__PURE__*/_jsx(Svg, {
    width: iconSize,
    height: iconSize,
    fill: iconColor ?? defaultColor,
    viewBox: "0 0 16 16",
    children: toastStyle === 'primary' && iconStyle !== 'solid' ? /*#__PURE__*/_jsxs(_Fragment, {
      children: [iconStyle === 'outline' && /*#__PURE__*/_jsx(Path, {
        d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
      }), /*#__PURE__*/_jsx(Path, {
        d: "m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"
      })]
    }) : /*#__PURE__*/_jsx(Path, {
      d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
    })
  });
};
export default SuccessSvg;
//# sourceMappingURL=SuccessSvg.js.map