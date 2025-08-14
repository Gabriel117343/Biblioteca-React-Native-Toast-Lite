import React from 'react';
import { Platform } from 'react-native';
import { ActivityIndicator } from 'react-native';
function CustomLoading({ color = '#FFF', size = 28 }) {
  const sizeConvert =
    Platform.OS === 'android'
      ? size
      : Platform.OS === 'web'
        ? size > 28
          ? 'large'
          : 'small'
        : size > 28
          ? 'large'
          : 'small';

  return <ActivityIndicator size={sizeConvert} color={color} />;
}
export default CustomLoading;
