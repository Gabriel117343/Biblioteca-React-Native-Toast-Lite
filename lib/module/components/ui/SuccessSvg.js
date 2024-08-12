"use strict";

import Svg, { Path } from 'react-native-svg';
import React from 'react';

// estos son tipos de parametros que se le pueden pasar a un componente
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SvgComponent = ({
  color = 'white',
  size = 16,
  ...props
}) => /*#__PURE__*/_jsxs(Svg
// xmlns="http://www.w3.org/2000/svg"
, {
  width: size,
  height: size,
  fill: color,
  viewBox: "0 0 16 16",
  ...props,
  children: [/*#__PURE__*/_jsx(Path, {
    d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
  }), /*#__PURE__*/_jsx(Path, {
    d: "m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"
  })]
});
export default SvgComponent;
//# sourceMappingURL=SuccessSvg.js.map