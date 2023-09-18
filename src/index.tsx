import * as React from 'react';
import randiman from './lib/random'
import { BACKGROUND_COLORS, TEXT_COLORS, SHAPE_COLORS } from './lib/colors'
import Shape, { ShapeNames } from './shape/Shape'
import styled from 'styled-components/native'
import { ViewProps, TextProps } from 'react-native';

const DEFAULTS = {
  style: "character",
  size: 32,
  shadow: false,

  border: false,
  borderSize: 2,
  borderColor: "#fff"
}

interface WrapperProps {
  size: number
  color: string

  $shadow?: boolean

  $border?: boolean
  $borderSize?: number
  $borderColor?: string
  $radius?: number
}

const Wrapper = styled.View<WrapperProps>`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border-radius: ${p => p.$radius || p.size}px;
  background-color: ${p => p.color};

  ${p => p.$border && `
    border-width: ${p.$borderSize}px;
    border-color: ${p.$borderColor};
  `}

  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  &:hover {
    z-index: 3;
  }

  ${p => p.$shadow && `
    shadow-color: rgb(18, 18, 18);
    shadow-offset: 0px 3px;
    shadow-opacity: 0.04;
    shadow-radius: 8px;
    elevation: 1;
  `}
` as React.FC<WrapperProps & ViewProps>

// implement size
const Text = styled.Text<{ color: string, size: number }>`
  /* Reset */
  margin: 0;
  padding: 0;
  text-align: center;
  box-sizing: border-box;

  /* font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif; */

  font-size: ${p => Math.round(p.size / 100 * 37)}px;
  color: ${p => p.color};
  line-height: 0;
  text-transform: uppercase;
  font-weight: 500;
` as React.FC<TextProps & { color: string, size: number }>

type Style = 'character' | 'shape'
interface Params {
  displayValue?: string
  // this should be unique to user, it can be email, user id, or full name
  value: string
  size?: number
  shadow?: boolean
  style?: Style

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

export default function Avvvatars(params: Params) {
  const {
    style = DEFAULTS.style,
    displayValue,
    value,
    radius,
    size = DEFAULTS.size,
    shadow = DEFAULTS.shadow,
    border = DEFAULTS.border,
    borderSize = DEFAULTS.borderSize,
    borderColor = DEFAULTS.borderColor,
    backgroundColors = BACKGROUND_COLORS,
    textColors = TEXT_COLORS,
    shapeColors = SHAPE_COLORS
  } = params

  // get first two letters
  const name = String(displayValue || value).substring(0, 2);

  // generate unique random for given value
  // there is 20 colors in array so generate between 0 and 19
  const bgKey = randiman({ value, min: 0, max: backgroundColors.length - 1 });
  const textKey = randiman({ value, min: 0, max: textColors.length - 1 });
  // there is 60 shapes so generate between 1 and 60
  const shapeKey = randiman({ value, min: 1, max: 60 })

  return (
    <Wrapper
      size={size}
      color={backgroundColors[bgKey]}
      $shadow={shadow}
      $border={border}
      $borderSize={borderSize}
      $borderColor={borderColor}
      $radius={radius}
    >
      {style === 'character' ?
        <Text
          color={textColors[textKey]}
          size={size}
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
    </Wrapper>
  )
}
