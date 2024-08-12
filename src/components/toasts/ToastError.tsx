import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';
import ErrorSvg from '../ui/ErrorSvg';
import { toastStyles } from './commonStyles';
interface ToastErrorProps {
  title?: string;
  message?: string;
}
export const ToastError: React.FC<ToastErrorProps> = ({ title, message }) => {
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutLeft}
      style={toastStyles.container}
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
