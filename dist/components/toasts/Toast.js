import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder, useWindowDimensions, Linking, Platform, Pressable, } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft, FadeOutRight, FadeOutUp, FadeOutDown, useSharedValue, useAnimatedStyle, withTiming, interpolate, SlideInLeft, SlideOutRight, SlideOutLeft, SlideOutUp, SlideOutDown, BounceIn, BounceOut, cancelAnimation, } from 'react-native-reanimated';
import RenderHTML from 'react-native-render-html';
import { toastStyles, positionStyles } from './commonStyles';
import { TOAST_CONFIG } from './toastConfig';
import { toast } from '../../store/storeToast';
import { RenderIcon } from './RenderIcon';
export const Toast = ({ id, type, title, message, position, toastStyle = 'primary', icon, iconUrl, duration = 3000, // 3000 ms por defecto
progress = true, border = true, styles, // objeto de estilos personalizados
animationType = 'fade', animationInDuration = 500, animationOutDuration = 500, callbacks, // Nuevos callbacks para eventos
pauseOnPress = true, // Si se pausa al presionar
swipeable = true, // Si se puede deslizar para cerrar
 }) => {
    const progressValue = useSharedValue(0);
    const [defaultAnimation, setDefaultAnimation] = useState(animationType);
    const [swipeDirection, setSwipeDirection] = useState('none');
    const [progressAnimation, setProgressAnimation] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [remainingDuration, setRemainingDuration] = useState(null);
    const [autoHideTriggered, setAutoHideTriggered] = useState(false);
    const { width: contentWidth } = useWindowDimensions();
    const [htmlWidth, setHtmlWidth] = useState(0);
    // Detecta si hay enlaces en el contenido HTML
    const hasHtmlLinks = (styles?.messageIsHtml && /<a\s+[^>]*href=|<a>/i.test(message ?? '')) ||
        (styles?.titleIsHtml && title && /<a\s+[^>]*href=|<a>/i.test(title)) ||
        false;
    useEffect(() => {
        // Reiniciar el progressValue cuando cambie el type y animarlo nuevamente
        progressValue.value = 0;
        // la animación se ejecuta varias veces hasta que se cumpla la duración
        progressValue.value = withTiming(115, { duration }, () => {
            // Cuando termina la animación del progreso, disparar autoHide
            if (!autoHideTriggered) {
                setAutoHideTriggered(true);
                if (callbacks?.onAutoHide) {
                    callbacks.onAutoHide();
                }
                toast.dismiss(id);
            }
        });
        return () => {
            cancelAnimation(progressValue);
        };
    }, [
        duration,
        progressValue,
        progress,
        type,
        id,
        callbacks,
        autoHideTriggered,
    ]);
    const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(progressValue.value, [0, 50, 100], [0.6, 0.6, 1]);
        return {
            width: `${progressValue.value}%`,
            opacity: opacity,
        };
    });
    // Funciones para pausar/reanudar la animación
    const pauseProgress = () => {
        if (!progress || !pauseOnPress)
            return;
        cancelAnimation(progressValue);
        const currentProgress = progressValue.value;
        const elapsedPercentage = currentProgress / 115;
        const remainingTime = duration * (1 - elapsedPercentage);
        setRemainingDuration(remainingTime);
    };
    const resumeProgress = () => {
        if (!progress || !pauseOnPress || remainingDuration === null)
            return;
        progressValue.value = withTiming(115, {
            duration: remainingDuration,
        }, () => {
            if (!autoHideTriggered) {
                setAutoHideTriggered(true);
                if (callbacks?.onAutoHide) {
                    callbacks.onAutoHide();
                }
                toast.dismiss(id);
            }
        });
        setRemainingDuration(null);
    };
    // Definir el gesto de deslizar para cerrar el toast
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => swipeable,
        onMoveShouldSetPanResponder: () => swipeable,
        onPanResponderMove: (evt, gestureState) => {
            if (!swipeable)
                return;
            setDefaultAnimation('fade');
            setProgressAnimation(true);
            const { dx, dy } = gestureState;
            const isHorizontal = Math.abs(dx) > Math.abs(dy);
            const threshold = 50;
            // Detectar dirección de deslizamiento
            if (isHorizontal) {
                if (dx > threshold) {
                    setSwipeDirection('right');
                    if (callbacks?.onSwipe)
                        callbacks.onSwipe('right');
                    setTimeout(() => {
                        if (callbacks?.onDismiss)
                            callbacks.onDismiss();
                        toast.dismiss(id);
                    }, 100);
                }
                else if (dx < -threshold) {
                    setSwipeDirection('left');
                    if (callbacks?.onSwipe)
                        callbacks.onSwipe('left');
                    setTimeout(() => {
                        if (callbacks?.onDismiss)
                            callbacks.onDismiss();
                        toast.dismiss(id);
                    }, 100);
                }
            }
            else {
                if (dy > threshold) {
                    setSwipeDirection('down');
                    if (callbacks?.onSwipe)
                        callbacks.onSwipe('down');
                    setTimeout(() => {
                        if (callbacks?.onDismiss)
                            callbacks.onDismiss();
                        toast.dismiss(id);
                    }, 100);
                }
                else if (dy < -threshold) {
                    setSwipeDirection('up');
                    if (callbacks?.onSwipe)
                        callbacks.onSwipe('up');
                    setTimeout(() => {
                        if (callbacks?.onDismiss)
                            callbacks.onDismiss();
                        toast.dismiss(id);
                    }, 100);
                }
            }
        },
    })).current;
    const handleAnimation = (type) => {
        if (type === 'entering') {
            // Animación de entrada
            switch (defaultAnimation) {
                case 'slide':
                    return SlideInLeft.duration(animationInDuration);
                case 'bounce':
                    return BounceIn.duration(animationInDuration);
                default:
                    return FadeInUp.duration(animationInDuration);
            }
        }
        else {
            // Animación de salida según dirección de swipe
            if (progressAnimation) {
                switch (swipeDirection) {
                    case 'left':
                        return defaultAnimation === 'slide'
                            ? SlideOutLeft.duration(animationOutDuration)
                            : FadeOutLeft.duration(animationOutDuration);
                    case 'right':
                        return defaultAnimation === 'slide'
                            ? SlideOutRight.duration(animationOutDuration)
                            : FadeOutRight.duration(animationOutDuration);
                    case 'up':
                        return defaultAnimation === 'slide'
                            ? SlideOutUp.duration(animationOutDuration)
                            : FadeOutUp.duration(animationOutDuration);
                    case 'down':
                        return defaultAnimation === 'slide'
                            ? SlideOutDown.duration(animationOutDuration)
                            : FadeOutDown.duration(animationOutDuration);
                    default:
                        return FadeOutLeft.duration(animationOutDuration);
                }
            }
            else {
                // Animación de salida por tiempo o dismiss manual
                switch (defaultAnimation) {
                    case 'slide':
                        return SlideOutRight.duration(animationOutDuration);
                    case 'bounce':
                        return BounceOut.duration(animationOutDuration);
                    default:
                        return FadeOutLeft.duration(animationOutDuration);
                }
            }
        }
    };
    // Normaliza saltos de línea
    const toBr = (s) => (s ?? '').replace(/\r\n|\r|\n|\\n/g, '<br/>');
    const toNL = (s) => (s ?? '').replace(/\\n/g, '\n');
    // Resuelve el ancho según plataforma
    const resolveWidth = (widthToResolve) => {
        const w = widthToResolve;
        if (w === undefined || w === 'auto') {
            return Platform.OS === 'web' ? 400 : '90%';
        }
        return w;
    };
    // Manejo de interacción con prensa
    const handlePressIn = () => {
        if (hasHtmlLinks)
            return; // No interferir con links HTML
        setIsPressed(true);
        if (pauseOnPress)
            pauseProgress();
        if (callbacks?.onPressIn)
            callbacks.onPressIn();
    };
    const handlePressOut = () => {
        if (hasHtmlLinks)
            return;
        setIsPressed(false);
        if (pauseOnPress)
            resumeProgress();
        if (callbacks?.onPressOut)
            callbacks.onPressOut();
    };
    const handlePress = () => {
        if (hasHtmlLinks)
            return;
        if (callbacks?.onPress)
            callbacks.onPress();
    };
    return (React.createElement(Pressable, { onPressIn: handlePressIn, onPressOut: handlePressOut, onPress: handlePress, disabled: hasHtmlLinks },
        React.createElement(Animated.View, { entering: Platform.OS === 'web' ? undefined : handleAnimation('entering'), exiting: Platform.OS === 'web' ? undefined : handleAnimation('exiting'), style: [
                toastStyles.container,
                positionStyles[position ?? 'top'],
                {
                    borderWidth: border ? 1 : 0,
                    width: resolveWidth(styles?.width),
                    ...(styles?.maxWidth !== undefined && {
                        maxWidth: styles.maxWidth,
                    }),
                    ...(styles?.minWidth !== undefined && {
                        minWidth: styles.minWidth,
                    }),
                    minHeight: styles?.height ?? 60,
                    borderColor: styles?.borderColor ?? TOAST_CONFIG[type][toastStyle].borderColor,
                    borderRadius: styles?.borderRadius ?? 15,
                    zIndex: styles?.zIndex ?? (Platform.OS === 'web' ? 2147483001 : 10),
                    ...(styles?.top !== undefined && { top: styles.top }),
                    ...(styles?.bottom !== undefined && { bottom: styles.bottom }),
                    ...(styles?.left !== undefined && { left: styles.left }),
                    ...(styles?.right !== undefined && { right: styles.right }),
                    // Efectos visuales al presionar
                    transform: isPressed ? [{ scale: 0.98 }] : undefined,
                    elevation: isPressed ? 3 : 1,
                },
            ], ...(swipeable ? panResponder.panHandlers : {}) },
            React.createElement(View, { style: [
                    StyleSheet.absoluteFillObject,
                    {
                        backgroundColor: styles?.backgroundColor ??
                            TOAST_CONFIG[type][toastStyle].backgroundColor,
                        borderLeftColor: toastStyle === 'secondary'
                            ? TOAST_CONFIG[type][toastStyle].borderColor
                            : 'transparent',
                        borderLeftWidth: toastStyle === 'secondary' ? 5 : 0,
                        opacity: styles?.opacity
                            ? isPressed
                                ? Math.min(1, styles.opacity + 0.1)
                                : styles.opacity
                            : isPressed
                                ? 1.0
                                : 0.9,
                    },
                ] }),
            React.createElement(View, { style: toastStyles.contentContainer },
                React.createElement(RenderIcon, { type: type, toastStyle: toastStyle, iconColor: styles?.iconColor ?? TOAST_CONFIG[type][toastStyle].iconColor, icon: icon, iconResizeMode: styles?.iconResizeMode, iconUrl: iconUrl, iconSize: styles?.iconSize, iconStyle: styles?.iconStyle, iconRounded: styles?.iconRounded, iconBorderRadius: styles?.iconBorderRadius }),
                React.createElement(View, { onLayout: (e) => setHtmlWidth(e.nativeEvent.layout.width), style: [
                        title ? null : { alignItems: 'center' },
                        { flex: 1, minWidth: 0, paddingRight: 3 },
                    ] },
                    title &&
                        (styles?.titleIsHtml ? (React.createElement(RenderHTML, { contentWidth: htmlWidth || contentWidth, source: {
                                html: `<span>${toBr(title ?? TOAST_CONFIG[type].title)}</span>`,
                            }, baseStyle: {
                                fontSize: styles?.titleSize ?? TOAST_CONFIG[type].titleSize,
                                color: styles?.titleColor ??
                                    TOAST_CONFIG[type][toastStyle].titleColor,
                            }, tagsStyles: {
                                b: { fontWeight: 'bold' },
                                strong: { fontWeight: 'bold' },
                                i: { fontStyle: 'italic' },
                                em: { fontStyle: 'italic' },
                                u: { textDecorationLine: 'underline' },
                                a: {
                                    color: styles?.linkColor ?? '#2E7DFF',
                                    textDecorationLine: 'underline',
                                    fontWeight: '500',
                                },
                                li: { marginBottom: 2 },
                            }, renderersProps: {
                                a: {
                                    onPress: (_, href) => {
                                        if (href)
                                            Linking.openURL(href).catch(() => { });
                                    },
                                },
                            } })) : (React.createElement(Text, { style: [
                                toastStyles.title,
                                {
                                    fontSize: styles?.titleSize ?? TOAST_CONFIG[type].titleSize,
                                    color: styles?.titleColor ??
                                        TOAST_CONFIG[type][toastStyle].titleColor,
                                },
                                { flexShrink: 1 },
                            ] }, toNL(title ?? TOAST_CONFIG[type].title)))),
                    styles?.messageIsHtml ? (React.createElement(RenderHTML, { contentWidth: htmlWidth || contentWidth, source: {
                            html: `<span>${toBr(message ?? TOAST_CONFIG[type].message)}</span>`,
                        }, baseStyle: {
                            fontSize: styles?.textSize ?? TOAST_CONFIG[type].textSize,
                            color: styles?.textColor ??
                                TOAST_CONFIG[type][toastStyle].textColor,
                            fontWeight: title ? 'normal' : 'bold',
                        }, tagsStyles: {
                            b: { fontWeight: 'bold' },
                            strong: { fontWeight: 'bold' },
                            i: { fontStyle: 'italic' },
                            em: { fontStyle: 'italic' },
                            u: { textDecorationLine: 'underline' },
                            a: {
                                color: styles?.linkColor ?? '#2E7DFF',
                                textDecorationLine: 'underline',
                                fontWeight: '500',
                            },
                            li: { marginBottom: 2 },
                        }, renderersProps: {
                            a: {
                                onPress: (_, href) => {
                                    if (href)
                                        Linking.openURL(href).catch(() => { });
                                },
                            },
                        } })) : (React.createElement(Text, { style: [
                            toastStyles.text,
                            {
                                fontSize: styles?.textSize ?? TOAST_CONFIG[type].textSize,
                                color: styles?.textColor ??
                                    TOAST_CONFIG[type][toastStyle].textColor,
                            },
                            !title && { fontWeight: 'bold' },
                            { flexShrink: 1 },
                        ] }, toNL(message ?? TOAST_CONFIG[type].message)))),
                progress && (React.createElement(View, { style: toastStyles.progressContainer },
                    React.createElement(Animated.View, { style: [
                            toastStyles.progressBar,
                            animatedStyle,
                            {
                                backgroundColor: styles?.progressColor ??
                                    TOAST_CONFIG[type][toastStyle].progressColor,
                            },
                        ] })))))));
};
