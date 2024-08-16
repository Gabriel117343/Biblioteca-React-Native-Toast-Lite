import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft, useSharedValue, useAnimatedStyle, withTiming, interpolate, } from 'react-native-reanimated';
import ErrorSvg from '../ui/ErrorSvg';
import SuccessSvg from '../ui/SuccessSvg';
import InfoSvg from '../ui/InfoSvg';
import WarningSvg from '../ui/WarningSvg';
import { toastStyles, positionStyles } from './commonStyles';
import { TOAST_CONFIG } from './toastConfig';
export const Toast = ({ type, title, message, position, toastStyle = 'primary', icon, duration = 3000, progress = false, border = true, styles, // objeto de estilos personalizados
 }) => {
    const progressValue = useSharedValue(0);
    useEffect(() => {
        // Reiniciar el progressValue cuando cambie el type y animarlo nuevamente
        progressValue.value = 0;
        // la animación se ejecuta varias veces hasta que se cumpla la duración
        progressValue.value = withTiming(120, { duration: duration });
    }, [duration, progressValue, progress, type]);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: `${progressValue.value}%`,
        };
    });
    return (React.createElement(Animated.View, { entering: FadeInUp, exiting: FadeOutLeft, style: [
            toastStyles.container,
            positionStyles[position ?? 'top'],
            {
                borderWidth: border ? 1 : 0,
                borderColor: styles?.borderColor ?? TOAST_CONFIG[type][toastStyle].borderColor,
            },
        ] },
        React.createElement(View, { style: [
                StyleSheet.absoluteFillObject,
                toastStyles.fondoContainer,
                {
                    backgroundColor: styles?.backgroundColor ??
                        TOAST_CONFIG[type][toastStyle].backgroundColor,
                },
            ] }),
        React.createElement(View, { style: toastStyles.contentContainer },
            React.createElement(RenderIcon, { type: type, toastStyle: toastStyle, iconColor: styles?.iconColor ?? TOAST_CONFIG[type][toastStyle].iconColor, icon: icon, iconSize: styles?.iconSize, iconStyle: styles?.iconStyle }),
            React.createElement(View, { style: title ? {} : { alignItems: 'center' } },
                title && (React.createElement(Text, { style: [
                        toastStyles.title,
                        {
                            fontSize: styles?.titleSize ?? TOAST_CONFIG[type].titleSize,
                            color: styles?.titleColor ??
                                TOAST_CONFIG[type][toastStyle].titleColor,
                        },
                    ] }, title ?? TOAST_CONFIG[type].title)),
                React.createElement(Text, { style: [
                        toastStyles.text,
                        {
                            fontSize: styles?.textSize ?? TOAST_CONFIG[type].textSize,
                            color: styles?.textColor ?? TOAST_CONFIG[type][toastStyle].textColor,
                        },
                        !title && { fontWeight: 'bold' },
                    ] }, message ?? TOAST_CONFIG[type].message)),
            progress && (React.createElement(View, { style: toastStyles.progressContainer },
                React.createElement(Animated.View, { style: [
                        toastStyles.progressBar,
                        animatedStyle,
                        {
                            backgroundColor: styles?.progressColor ??
                                TOAST_CONFIG[type][toastStyle].progressColor,
                        },
                    ] }))))));
};
function RenderIcon({ type, toastStyle, iconColor, icon, iconSize, iconStyle, }) {
    const iconProgress = useSharedValue(0);
    useEffect(() => {
        // Reiniciar el iconProgress cuando cambie el type y animarlo nuevamente
        iconProgress.value = 0;
        iconProgress.value = withTiming(1, { duration: 500 });
    }, [iconProgress, type]);
    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(iconProgress.value, [0, 1], [0, 1]),
            transform: [
                {
                    scale: interpolate(iconProgress.value, [0, 1], [0.5, 1]),
                },
            ],
        };
    });
    const renderIcon = () => {
        if (icon)
            return (React.createElement(Text, { style: [
                    {
                        fontSize: iconSize ?? 25,
                    },
                ] }, icon));
        switch (type) {
            case 'error':
                return (React.createElement(ErrorSvg, { toastStyle: toastStyle, iconColor: iconColor, iconSize: iconSize, iconStyle: iconStyle }));
            case 'success':
                return (React.createElement(SuccessSvg, { toastStyle: toastStyle, iconColor: iconColor, iconSize: iconSize, iconStyle: iconStyle }));
            case 'info':
                return (React.createElement(InfoSvg, { toastStyle: toastStyle, iconColor: iconColor, iconSize: iconSize, iconStyle: iconStyle }));
            case 'warning':
                return (React.createElement(WarningSvg, { toastStyle: toastStyle, iconColor: iconColor, iconSize: iconSize, iconStyle: iconStyle }));
            case 'loading':
                return React.createElement(ActivityIndicator, { size: iconSize ?? 30, color: iconColor });
            default:
                return null;
        }
    };
    return (React.createElement(Animated.View, { style: animatedIconStyle }, renderIcon()));
}
