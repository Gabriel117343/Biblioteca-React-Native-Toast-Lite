import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft, FadeOutRight, useSharedValue, useAnimatedStyle, withTiming, interpolate, } from 'react-native-reanimated';
import { SlideInLeft, SlideOutRight, BounceIn, BounceOut, } from 'react-native-reanimated'; // esta es una importación adicional
import { toastStyles, positionStyles } from './commonStyles';
import { TOAST_CONFIG } from './toastConfig';
import { toast } from '../../store/storeToast';
import { RenderIcon } from './RenderIcon';
export const Toast = ({ id, type, title, message, position, toastStyle = 'primary', icon, duration, // 3000 ms por defecto
progress = true, border = true, styles, // objeto de estilos personalizados
animationType = 'fade', animationInDuration = 500, // Duration for the animation
animationOutDuration = 500, // Duration for the animation
 }) => {
    const progressValue = useSharedValue(0);
    const [defaultAnimation, setDefaultAnimation] = useState(animationType);
    const [animationExitLeft, setAnimationExitLeft] = useState(false);
    const [progressAnimation, setProgressAnimation] = useState(false);
    useEffect(() => {
        // Reiniciar el progressValue cuando cambie el type y animarlo nuevamente
        progressValue.value = 0;
        // la animación se ejecuta varias veces hasta que se cumpla la duración
        progressValue.value = withTiming(115, { duration: duration });
    }, [duration, progressValue, progress, type]);
    const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(progressValue.value, [0, 50, 100], [0.6, 0.6, 1]);
        return {
            width: `${progressValue.value}%`,
            opacity: opacity,
        };
    });
    // Definir el gesto de deslizar para cerrar el toast
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            // Detectar deslizamiento hacia la derecha o izquierda
            setDefaultAnimation('fade');
            setProgressAnimation(true);
            // solo se ejecutra si se desliza más de 50px o menos de -50px
            if (gestureState.dx > 50) {
                setTimeout(() => toast.dismiss(id), 100);
            }
            else if (gestureState.dx < -50) {
                setAnimationExitLeft(true);
                setTimeout(() => toast.dismiss(id), 100);
            }
            else {
                return;
            }
        },
        // onPanResponderRelease: () => {
        //   // Lógica adicional al soltar el gesto
        // },
    })).current;
    const handleAnimation = (type) => {
        switch (defaultAnimation) {
            case 'slide':
                if (type === 'entering')
                    return SlideInLeft.duration(animationInDuration);
                return SlideOutRight.duration(animationOutDuration);
            case 'bounce':
                if (type === 'entering')
                    return BounceIn.duration(animationInDuration);
                return BounceOut.duration(animationOutDuration);
            default:
                if (type === 'entering') {
                    return FadeInUp.duration(animationInDuration);
                }
                else if (progressAnimation) {
                    if (!animationExitLeft) {
                        return FadeOutRight.duration(animationOutDuration);
                    }
                    else
                        return FadeOutLeft.duration(animationOutDuration);
                }
                else
                    return FadeOutLeft.duration(animationOutDuration);
        }
    };
    // Código Refactorizado
    return (React.createElement(Animated.View, { entering: handleAnimation('entering'), exiting: handleAnimation('exiting'), style: [
            toastStyles.container,
            positionStyles[position ?? 'top'],
            {
                borderWidth: border ? 1 : 0,
                width: styles?.width ?? '90%',
                minHeight: styles?.height ?? 60,
                borderColor: styles?.borderColor ?? TOAST_CONFIG[type][toastStyle].borderColor,
                borderRadius: styles?.borderRadius ?? 15,
                // Aplica top, bottom, left, right solo si están definidos para que no ignore positionStyles por defecto
                ...(styles?.top !== undefined && { top: styles.top }),
                ...(styles?.bottom !== undefined && { bottom: styles.bottom }),
                ...(styles?.left !== undefined && { left: styles.left }),
                ...(styles?.right !== undefined && { right: styles.right }),
            },
        ], ...panResponder.panHandlers },
        React.createElement(View, { style: [
                StyleSheet.absoluteFillObject,
                {
                    backgroundColor: styles?.backgroundColor ??
                        TOAST_CONFIG[type][toastStyle].backgroundColor,
                    borderLeftColor: toastStyle === 'secondary'
                        ? TOAST_CONFIG[type][toastStyle].borderColor
                        : 'transparent',
                    borderLeftWidth: toastStyle === 'secondary' ? 5 : 0,
                    opacity: styles?.opacity ?? 0.9,
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
