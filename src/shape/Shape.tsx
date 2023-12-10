import * as React from 'react';
import { ComponentType } from 'react'
import { View, StyleSheet } from 'react-native'
import * as shapes from './shapes'
import { ShapeProps } from './shapes'

export type ShapeNames = keyof typeof shapes
interface ShapeList {
  [key: string]: ComponentType<ShapeProps>
}

export interface Props {
  name: ShapeNames
  size?: number
  color: string
}

export const shapeList = Object.keys(shapes)

export default function Shape(props: Props) {
  const { name, size = 24 } = props

  const Tag = (shapes as ShapeList)[name]

  if (!Tag) {
    // shape doen't exists
    return null
  }

  return (
    <View style={styles.shapeWrapper} {...props}>
      <Tag
        width={size}
        height={size}
        color={props.color}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  shapeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
  },
})
