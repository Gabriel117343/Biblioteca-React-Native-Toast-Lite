import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutLeft } from 'react-native-reanimated';
import SuccessSvg from '../ui/SuccessSvg';
import { toastStyles } from './commonStyles';

interface ToastSuccessProps {
  title?: string;
  message?: string;
}
export const ToastSuccess: FC<ToastSuccessProps> = ({ title, message }) => {

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutLeft}
      style={toastStyles.container}
    >
      <View style={[StyleSheet.absoluteFillObject, toastStyles.fondoContainer, { backgroundColor: '#4CAF50'   }]} />
      <SuccessSvg color="white" size={24} />
      <View>
        <Text style={toastStyles.title}>{title ?? '¡Éxito!'}</Text>
        <Text style={toastStyles.text}>{message ?? 'Operación realizada con éxito'}</Text>
      </View>
    </Animated.View>
  )
}
