import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  PanResponder,
} from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutLeft,
  FadeOutRight,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {
  SlideInLeft,
  SlideOutRight,
  BounceIn,
  BounceOut,
} from 'react-native-reanimated'; // esta es una importación adicional
import ErrorSvg from '../ui/ErrorSvg';
import SuccessSvg from '../ui/SuccessSvg';
import InfoSvg from '../ui/InfoSvg';
import WarningSvg from '../ui/WarningSvg';
import { toastStyles, positionStyles } from './commonStyles';
import { ToastProps } from './types';
import { TOAST_CONFIG } from './toastConfig';
import { toast } from '../../store/storeToast';
export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  position,
  toastStyle = 'primary',
  icon,
  duration, // 3000 ms por defecto
  progress = true,
  border = true,
  styles, // objeto de estilos personalizados
  animationType = 'fade',
  animationDuration = 500, // Duración de la animación en ms
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
    const opacity = interpolate(
      progressValue.value,
      [0, 50, 100],
      [0.6, 0.6, 1]
    );
    return {
      width: `${progressValue.value}%`,
      opacity: opacity,
    };
  });

  // Definir el gesto de deslizar para cerrar el toast
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Detectar deslizamiento hacia la derecha o izquierda
        setDefaultAnimation('fade');
        setProgressAnimation(true);
        // solo se ejecutra si se desliza más de 50px o menos de -50px
        if (gestureState.dx > 50) {
          setTimeout(() => toast.dismiss(id), 100);
        } else if (gestureState.dx < -50) {
          setAnimationExitLeft(true);
          setTimeout(() => toast.dismiss(id), 100);
        } else {
          return;
        }
      },
      onPanResponderRelease: () => {
        // Lógica adicional al soltar el gesto
      },
    })
  ).current;

  const handleAnimation = (type: string) => {
    switch (defaultAnimation) {
      case 'slide':
        if (type === 'entering') return SlideInLeft.duration(animationDuration);
        return SlideOutRight.duration(animationDuration);

      case 'bounce':
        if (type === 'entering') return BounceIn.duration(animationDuration);
        return BounceOut.duration(animationDuration);
      default:
        if (type === 'entering') {
          return FadeInUp.duration(animationDuration);
        } else if (progressAnimation) {
          if (!animationExitLeft) {
            return FadeOutRight.duration(animationDuration);
          } else return FadeOutLeft.duration(animationDuration);
        } else return FadeOutLeft.duration(animationDuration);
    }
  };
  return (
    <Animated.View
      entering={handleAnimation('entering')}
      exiting={handleAnimation('exiting')}
      style={[
        toastStyles.container,
        positionStyles[position ?? 'top'],
        {
          borderWidth: border ? 1 : 0,
          width: styles?.width ?? '90%',
          minHeight: styles?.height ?? 60,
          borderColor:
            styles?.borderColor ?? TOAST_CONFIG[type][toastStyle].borderColor,
          borderRadius: styles?.borderRadius ?? 15,
          // Aplica top, bottom, left, right solo si están definidos para que no ignore positionStyles por defecto
          ...(styles?.top !== undefined && { top: styles.top }),
          ...(styles?.bottom !== undefined && { bottom: styles.bottom }),
          ...(styles?.left !== undefined && { left: styles.left }),
          ...(styles?.right !== undefined && { right: styles.right }),
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View
        style={[
          StyleSheet.absoluteFillObject,
          toastStyles.fondoContainer,
          {
            backgroundColor:
              styles?.backgroundColor ??
              TOAST_CONFIG[type][toastStyle].backgroundColor,
            borderLeftColor:
              toastStyle === 'secondary'
                ? TOAST_CONFIG[type][toastStyle].borderColor
                : 'transparent',
            borderLeftWidth: toastStyle === 'secondary' ? 5 : 0,
          },
        ]}
      />
      <View style={toastStyles.contentContainer}>
        <RenderIcon
          type={type}
          toastStyle={toastStyle}
          iconColor={
            styles?.iconColor ?? TOAST_CONFIG[type][toastStyle].iconColor
          }
          icon={icon}
          iconSize={styles?.iconSize}
          iconStyle={styles?.iconStyle}
        />

        <View style={title ? {} : { alignItems: 'center' }}>
          {title && (
            <Text
              style={[
                toastStyles.title,
                {
                  fontSize: styles?.titleSize ?? TOAST_CONFIG[type].titleSize,
                  color:
                    styles?.titleColor ??
                    TOAST_CONFIG[type][toastStyle].titleColor,
                },
              ]}
            >
              {title ?? TOAST_CONFIG[type].title}
            </Text>
          )}
          <Text
            style={[
              toastStyles.text,
              {
                fontSize: styles?.textSize ?? TOAST_CONFIG[type].textSize,
                color:
                  styles?.textColor ?? TOAST_CONFIG[type][toastStyle].textColor,
              },
              !title && { fontWeight: 'bold' },
            ]}
          >
            {message ?? TOAST_CONFIG[type].message}
          </Text>
        </View>

        {progress && (
          <View style={toastStyles.progressContainer}>
            <Animated.View
              style={[
                toastStyles.progressBar,
                animatedStyle,
                {
                  backgroundColor:
                    styles?.progressColor ??
                    TOAST_CONFIG[type][toastStyle].progressColor,
                },
              ]}
            />
          </View>
        )}
      </View>
    </Animated.View>
  );
};
// Función para renderizar el icono según el tipo de toast

interface RenderIconProps {
  type: 'error' | 'success' | 'info' | 'warning' | 'loading';
  toastStyle: 'primary' | 'secondary' | 'primaryDark' | 'dark'; // este parametro si tiene un valor por defecto
  icon?: string; // emoji
  iconColor?: string; // opcionales
  iconSize?: number;
  iconStyle?: 'solid' | 'outline' | 'default';
}
function RenderIcon({
  type,
  toastStyle,
  iconColor,
  icon,
  iconSize,
  iconStyle,
}: RenderIconProps) {
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
      return (
        <Text
          style={[
            {
              fontSize: iconSize ?? 25,
            },
          ]}
        >
          {icon}
        </Text>
      );
    switch (type) {
      case 'error':
        return (
          <ErrorSvg
            toastStyle={toastStyle}
            iconColor={iconColor}
            iconSize={iconSize}
            iconStyle={iconStyle}
          />
        );
      case 'success':
        return (
          <SuccessSvg
            toastStyle={toastStyle}
            iconColor={iconColor}
            iconSize={iconSize}
            iconStyle={iconStyle}
          />
        );
      case 'info':
        return (
          <InfoSvg
            toastStyle={toastStyle}
            iconColor={iconColor}
            iconSize={iconSize}
            iconStyle={iconStyle}
          />
        );
      case 'warning':
        return (
          <WarningSvg
            toastStyle={toastStyle}
            iconColor={iconColor}
            iconSize={iconSize}
            iconStyle={iconStyle}
          />
        );
      case 'loading':
        return <ActivityIndicator size={iconSize ?? 30} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <Animated.View style={animatedIconStyle}>{renderIcon()}</Animated.View>
  );
}
