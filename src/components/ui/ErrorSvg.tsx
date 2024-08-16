import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { SvgProps } from './types';
import { TOAST_CONFIG } from '../toasts/toastConfig';
const ErrorSvg: React.FC<SvgProps> = ({
  iconColor,
  iconSize = 28,
  iconStyle = 'outline',
  toastStyle,
}) => {
  const defaultColor = TOAST_CONFIG.error[toastStyle]['iconColor'];
  return (
    <Svg
      width={iconSize}
      height={iconSize}
      fill={iconColor ?? defaultColor}
      viewBox="0 0 16 16"
    >
      {toastStyle === 'primary' && iconStyle !== 'solid' ? (
        <>
          {iconStyle === 'outline' && (
            <>
              <Path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <Path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </>
          )}
          {iconStyle === 'default' && (
            <Path d="M6.502 11a1 1 0 1 1 3 0 1 1 0 0 1-3 0M6.1 4.995a.905.905 0 1 1 2.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          )}
        </>
      ) : (
        <Path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
      )}
    </Svg>
  );
};
export default ErrorSvg;
