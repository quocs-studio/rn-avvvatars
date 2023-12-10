import * as React from 'react';
import { ViewProps, TextProps, ViewStyle, TextStyle } from 'react-native';
declare type Style = 'character' | 'shape';
interface Params {
    displayValue?: string;
    value: string;
    size?: number;
    style?: Style;
    wrapperStyle?: ViewStyle;
    wrapperProps?: ViewProps;
    textStyle?: TextStyle;
    textProps?: TextProps;
    border?: boolean;
    borderSize?: number;
    borderColor?: string;
    radius?: number;
    backgroundColors?: string[];
    textColors?: string[];
    shapeColors?: string[];
}
export default function Avvvatars({ wrapperStyle, wrapperProps, textStyle, textProps, style, displayValue, value, radius, size, border, borderSize, borderColor, backgroundColors, textColors, shapeColors }: Params): React.JSX.Element;
export {};
