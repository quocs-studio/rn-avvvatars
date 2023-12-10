import * as React from 'react';
import randiman from './lib/random'
import { BACKGROUND_COLORS, TEXT_COLORS, SHAPE_COLORS } from './lib/colors'
import Shape, { ShapeNames } from './shape/Shape'
import { ViewProps, TextProps, StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';

const DEFAULTS = {
  style: "character",
  size: 32,
  border: false,
  borderSize: 2,
  borderColor: "#fff"
}

interface WrapperProps {
  size: number
  color: string
  $border?: boolean
  $borderSize?: number
  $borderColor?: string
  $radius?: number
}

type Style = 'character' | 'shape'
interface Params {
  displayValue?: string
  // this should be unique to user, it can be email, user id, or full name
  value: string
  size?: number
  style?: Style
  wrapperStyle?: ViewStyle
  wrapperProps?: ViewProps
  textStyle?: TextStyle
  textProps?: TextProps

  // toggle border
  border?: boolean
  borderSize?: number
  borderColor?: string
  radius?: number

  // colors
  backgroundColors?: string[]
  textColors?: string[]
  shapeColors?: string[]
}

export default function Avvvatars({
  wrapperStyle,
  wrapperProps,
  textStyle,
  textProps,
  style = DEFAULTS.style as Style,
  displayValue,
  value,
  radius,
  size = DEFAULTS.size,
  border = DEFAULTS.border,
  borderSize = DEFAULTS.borderSize,
  borderColor = DEFAULTS.borderColor,
  backgroundColors = BACKGROUND_COLORS,
  textColors = TEXT_COLORS,
  shapeColors = SHAPE_COLORS
}: Params) {

  // get first two letters
  const name = String(displayValue || value).substring(0, 2);

  // generate unique random for given value
  // there is 20 colors in array so generate between 0 and 19
  const bgKey = randiman({ value, min: 0, max: backgroundColors.length - 1 });
  const textKey = randiman({ value, min: 0, max: textColors.length - 1 });
  // there is 60 shapes so generate between 1 and 60
  const shapeKey = randiman({ value, min: 1, max: 60 })

  return (
    <View
      style={[
        styles.wrapper,
        {
          width: size,
          height: size,
          borderRadius: radius || size,
          backgroundColor: backgroundColors[bgKey]
        },
        border && {
          borderWidth: borderSize,
          borderColor,
          elevation: 1
        },
        wrapperStyle
      ]}
      {...wrapperProps}
    >
      {style === 'character' ?
        <Text
          style={[
            styles.text,
            {
              fontSize: Math.round(size / 100 * 37),
              color: textColors[textKey]
            },
            textStyle
          ]}
          {...textProps}
        >
          {name}
        </Text>
        :
        <Shape
          name={`Shape${shapeKey}` as ShapeNames}
          color={shapeColors[randiman({ value, min: 1, max: shapeColors.length - 1 })]}
          size={Math.round((size) / 100 * 50)}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
  },
  text: {
    margin: 0,
    padding: 0,
    textAlign: 'center',
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
})
