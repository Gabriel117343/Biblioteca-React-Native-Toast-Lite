import { SvgProps as props } from 'react-native-svg';
// estos son tipos de parametros que se le pueden pasar a un componente
export interface SvgProps extends props {
  color?: string;
  size?: number;
}
