import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';
import WarningSvg from '../ui/WarningSvg';
import { toastStyles, positionStyles } from './commonStyles';
import { ToastProps } from './types';

export const ToastWarning: React.FC<ToastProps> = ({
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
          { backgroundColor: '#FFC107' },
        ]}
      />
      <WarningSvg color="white" size={24} />
      <View>
        <Text style={toastStyles.title}>{title ?? '¡Advertencia!'}</Text>
        <Text style={toastStyles.text}>
          {message ?? 'Operación con advertencia'}
        </Text>
      </View>
    </Animated.View>
  );
};
