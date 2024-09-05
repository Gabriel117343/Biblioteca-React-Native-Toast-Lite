import React, { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

import ErrorSvg from '../ui/ErrorSvg';
import SuccessSvg from '../ui/SuccessSvg';
import InfoSvg from '../ui/InfoSvg';
import WarningSvg from '../ui/WarningSvg';
import CustomLoading from './CustomLoading';
interface RenderIconProps {
  type: 'error' | 'success' | 'info' | 'warning' | 'loading';
  toastStyle: 'primary' | 'secondary' | 'primaryDark' | 'dark'; // este parametro si tiene un valor por defecto
  icon?: string; // emoji
  loadingType?: 'pulse' | 'wave';
  iconColor?: string; // opcionales
  iconSize?: number;
  iconStyle?: 'solid' | 'outline' | 'default';
}
export const RenderIcon: React.FC<RenderIconProps> = ({
  type,
  toastStyle,
  iconColor,
  icon,
  iconSize,
  iconStyle,
}) => {
  const iconProgress = useSharedValue(0);

  useEffect(() => {
    // restart the progressValue when the type changes
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
        return <CustomLoading color={iconColor} size={iconSize} />;
      default:
        return null;
    }
  };

  return (
    <Animated.View style={animatedIconStyle}>{renderIcon()}</Animated.View>
  );
};
