import { SvgProps as props } from 'react-native-svg';
// estos son tipos de parametros que se le pueden pasar a un componente
export interface SvgProps extends props {
  toastStyle: 'primary' | 'secondary' | 'primaryDark' | 'dark';
  iconStyle?: 'solid' | 'outline' | 'default';
  iconColor?: string;
  iconSize?: number;
}
