import React, { useEffect, useState } from 'react';
import { Text, Image, ActivityIndicator, View } from 'react-native';
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
  iconRounded?: boolean; // true => círculo perfecto
  iconBorderRadius?: number; // override manual del radio
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
  iconRounded,
  iconBorderRadius,
}) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const iconProgress = useSharedValue(0);
  useEffect(() => {
    // al cambiar la url, resetea estados
    if (iconUrl) {
      setImageLoading(true);
      setLoadFailed(false);
    }
  }, [iconUrl]);
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
      const size = iconSize ?? 25;
      const radius =
        typeof iconBorderRadius === 'number'
          ? Math.max(0, Math.round(iconBorderRadius))
          : iconRounded
            ? Math.round(size / 2)
            : Math.round(size / 6);

      // fallback si falló la imagen remota
      if (loadFailed) {
        return icon ? (
          <Text style={{ fontSize: size }}>{icon}</Text>
        ) : type === 'error' ? (
          <ErrorSvg
            toastStyle={toastStyle}
            iconColor={iconColor}
            iconSize={size}
            iconStyle={iconStyle}
          />
        ) : type === 'success' ? (
          <SuccessSvg
            toastStyle={toastStyle}
            iconColor={iconColor}
            iconSize={size}
            iconStyle={iconStyle}
          />
        ) : type === 'info' ? (
          <InfoSvg
            toastStyle={toastStyle}
            iconColor={iconColor}
            iconSize={size}
            iconStyle={iconStyle}
          />
        ) : type === 'warning' ? (
          <WarningSvg
            toastStyle={toastStyle}
            iconColor={iconColor}
            iconSize={size}
            iconStyle={iconStyle}
          />
        ) : (
          <CustomLoading color={iconColor} size={size} />
        );
      }

      return (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: radius,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={{ uri: iconUrl }}
            resizeMode={iconResizeMode ?? 'contain'}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setLoadFailed(true);
            }}
            blurRadius={imageLoading ? 8 : 0}
            style={{ width: '100%', height: '100%' }}
          />
          {imageLoading && (
            <ActivityIndicator size="small" color={iconColor ?? '#999'} />
          )}
        </View>
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
