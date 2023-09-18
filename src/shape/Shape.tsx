import * as React from 'react';
import { ComponentType } from 'react'
import * as shapes from './shapes'
import { ShapeProps } from './shapes'
import styled from 'styled-components/native';

export type ShapeNames = keyof typeof shapes
interface ShapeList {
  [key: string]: ComponentType<ShapeProps>
}

export interface Props {
  name: ShapeNames
  size?: number
  color: string
}

export const ShapeWrapper = styled.View<Props>`
  align-items: center;
  justify-content: center;
  vertical-align: middle;

  color: #${p => p.color || 'currentColor'};
`

export const shapeList = Object.keys(shapes)

export default function Shape(props: Props) {
  const { name, size = 24 } = props

  const Tag = (shapes as ShapeList)[name]

  if (!Tag) {
    // shape doen't exists
    return null
  }

  return (
    <ShapeWrapper {...props}>
      <Tag
        width={size}
        height={size}
        color={props.color}
      />
    </ShapeWrapper>
  )
}