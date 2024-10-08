import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { TOAST_CONFIG } from '../toasts/toastConfig';
const InfoSvg = ({ iconColor, iconSize = 28, iconStyle = 'outline', toastStyle, }) => {
    const defaultColor = TOAST_CONFIG.info[toastStyle]['iconColor'];
    return (React.createElement(Svg, { width: iconSize, height: iconSize, fill: iconColor ?? defaultColor, viewBox: "0 0 16 16" }, toastStyle === 'primary' && iconStyle !== 'solid' ? (React.createElement(React.Fragment, null,
        iconStyle === 'outline' && (React.createElement(React.Fragment, null,
            React.createElement(Path, { d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" }),
            React.createElement(Path, { d: "m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" }))),
        iconStyle === 'default' && (React.createElement(Path, { d: "m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0" })))) : (React.createElement(Path, { d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" }))));
};
export default InfoSvg;
