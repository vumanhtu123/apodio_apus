import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { scaleHeight } from "../theme"

type JustifyTypes =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
type FlexAlignType = "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
type HitSlopType = {
  top: number
  right: number
  bottom: number
  left: number
}

export type RowProps = {
  justify?: JustifyTypes
  align?: FlexAlignType
  children?: React.ReactNode
  style?: ViewStyle | ViewStyle[]
  onPress?: () => void
  hitSlop?: HitSlopType
}

export const Row = (props: RowProps) => {
  const { justify, children, align, style, ...rest } = props
  return (
    <TouchableOpacity
      activeOpacity={1}
      {...rest}
      style={[
        {
          flexDirection: "row",
          justifyContent: justify || "flex-start",
          alignItems: align || "center",
          marginBottom: scaleHeight(10),
          marginTop: scaleHeight(5)
        },
        style || {},
      ]}
    >
      {children}
    </TouchableOpacity>
  )
}
