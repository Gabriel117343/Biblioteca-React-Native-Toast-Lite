import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';
import ErrorSvg from '../ui/ErrorSvg';
import SuccessSvg from '../ui/SuccessSvg';
import InfoSvg from '../ui/InfoSvg';
import WarningSvg from '../ui/WarningSvg';
import { toastStyles, positionStyles } from './commonStyles';
import { ToastProps } from './types';
import { TOAST_CONFIG } from './toastConfig';

export const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  position,
}) => {
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutLeft}
      style={[toastStyles.container, positionStyles[position ?? 'top']]}
    >
      <View
        style={[
          StyleSheet.absoluteFillObject,
          toastStyles.fondoContainer,
          { backgroundColor: TOAST_CONFIG[type].color },
        ]}
      />

      {renderIcon(type)}
      <View>
        <Text style={toastStyles.title}>
          {title ?? TOAST_CONFIG[type].title}
        </Text>
        <Text style={toastStyles.text}>
          {message ?? TOAST_CONFIG[type].message}
        </Text>
      </View>
    </Animated.View>
  );
};
// Función para renderizar el icono según el tipo de toast
function renderIcon(type: string) {
  switch (type) {
    case 'error':
      return <ErrorSvg color="white" size={24} />;
    case 'success':
      return <SuccessSvg color="white" size={24} />;
    case 'info':
      return <InfoSvg color="white" size={24} />;
    case 'warning':
      return <WarningSvg color="white" size={24} />;
    case 'loading':
      return (
        <View
          style={{
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="small" color="white" />
        </View>
      );
    default:
      return null;
  }
}
