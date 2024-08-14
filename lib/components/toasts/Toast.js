import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';
import ErrorSvg from '../ui/ErrorSvg';
import SuccessSvg from '../ui/SuccessSvg';
import InfoSvg from '../ui/InfoSvg';
import WarningSvg from '../ui/WarningSvg';
import { toastStyles, positionStyles } from './commonStyles';
import { TOAST_CONFIG } from './toastConfig';
export const Toast = ({ type, title, message, position, }) => {
    return (React.createElement(Animated.View, { entering: FadeInUp, exiting: FadeOutLeft, style: [toastStyles.container, positionStyles[position ?? 'top']] },
        React.createElement(View, { style: [
                StyleSheet.absoluteFillObject,
                toastStyles.fondoContainer,
                { backgroundColor: TOAST_CONFIG[type].color },
            ] }),
        renderIcon(type),
        React.createElement(View, null,
            React.createElement(Text, { style: toastStyles.title }, title ?? TOAST_CONFIG[type].title),
            React.createElement(Text, { style: toastStyles.text }, message ?? TOAST_CONFIG[type].message))));
};
// Función para renderizar el icono según el tipo de toast
function renderIcon(type) {
    switch (type) {
        case 'error':
            return React.createElement(ErrorSvg, { color: "white", size: 24 });
        case 'success':
            return React.createElement(SuccessSvg, { color: "white", size: 24 });
        case 'info':
            return React.createElement(InfoSvg, { color: "white", size: 24 });
        case 'warning':
            return React.createElement(WarningSvg, { color: "white", size: 24 });
        case 'loading':
            return (React.createElement(View, { style: {
                    width: 24,
                    height: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                } },
                React.createElement(ActivityIndicator, { size: "small", color: "white" })));
        default:
            return null;
    }
}
