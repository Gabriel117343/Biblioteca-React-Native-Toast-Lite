import React, { useEffect } from 'react';
import { Text, Image } from 'react-native';
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

type validURL = `http://${string}` | `https://${string}`;

interface RenderIconProps {
  type: 'error' | 'success' | 'info' | 'warning' | 'loading';
  toastStyle: 'primary' | 'secondary' | 'primaryDark' | 'dark'; // este parametro si tiene un valor por defecto
  icon?: string; // emoji
  iconUrl?: validURL;
  loadingType?: 'pulse' | 'wave';
  iconColor?: string; // opcionales
  iconSize?: number;
  iconStyle?: 'solid' | 'outline' | 'default';
  iconResizeMode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
}
export const RenderIcon: React.FC<RenderIconProps> = ({
  type,
  toastStyle,
  iconColor,
  icon,
  iconUrl,
  iconSize,
  iconStyle,
  iconResizeMode,
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
    // Prioridad 1: iconUrl (imagen remota)
    if (iconUrl) {
      return (
        <Image
          source={{ uri: iconUrl }}
          resizeMode={iconResizeMode ?? 'contain'}
          style={{
            width: iconSize ?? 25,
            height: iconSize ?? 25,
            resizeMode: iconResizeMode ?? 'contain',
            borderRadius: (iconSize ?? 25) / 6,
          }}
        />
      );
    }
    // Prioridad 2: icon (emoji)
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
    // Prioridad 3: icono predeterminado
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
