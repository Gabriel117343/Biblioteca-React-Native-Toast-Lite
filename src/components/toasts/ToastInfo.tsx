import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';
import InfoSvg from '../ui/InfoSvg';
import { toastStyles, positionStyles } from './commonStyles';
import { ToastProps } from './types';

export const ToastInfo: React.FC<ToastProps> = ({
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
          { backgroundColor: '#007BFF' },
        ]}
      />
      <InfoSvg color="white" size={24} />
      <View>
        <Text style={toastStyles.title}>{title ?? 'Error'}</Text>
        <Text style={toastStyles.text}>{message ?? 'Error inesperado'}</Text>
      </View>
    </Animated.View>
  );
};
