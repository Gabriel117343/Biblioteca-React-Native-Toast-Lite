import React from 'react';
import { Platform } from 'react-native';
import { ActivityIndicator } from 'react-native';
function CustomLoading({ color = '#FFF', size = 28 }) {
  // Verifica si la plataforma es android para cambiar el tamaño del ActivityIndicator
  const sizeConvert =
    Platform.OS === 'android' ? size : size > 28 ? 'large' : 'small';
  return <ActivityIndicator size={sizeConvert} color={color} />;
}

export default CustomLoading;
