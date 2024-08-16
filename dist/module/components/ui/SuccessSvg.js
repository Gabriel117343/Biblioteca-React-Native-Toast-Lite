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
      children: [iconStyle === 'outline' && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Path, {
          d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
        }), /*#__PURE__*/_jsx(Path, {
          d: "m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"
        })]
      }), iconStyle === 'default' && /*#__PURE__*/_jsx(Path, {
        d: "M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"
      })]
    }) : /*#__PURE__*/_jsx(Path, {
      d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
    })
  });
};
export default SuccessSvg;