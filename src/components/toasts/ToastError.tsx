import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';
import ErrorSvg from '../ui/ErrorSvg';
import { toastStyles, positionStyles } from './commonStyles';
import { ToastProps } from './types';

export const ToastError: React.FC<ToastProps> = ({
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
          { backgroundColor: '#FF5347' },
        ]}
      />
      <ErrorSvg color="white" size={24} />
      <View>
        <Text style={toastStyles.title}>
          {title ?? 'Ha ocurrido  un error'}
        </Text>
        <Text style={toastStyles.text}>{message ?? 'Error inesperado'}</Text>
      </View>
    </Animated.View>
  );
};
