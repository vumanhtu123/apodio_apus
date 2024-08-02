import React from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {SvgXml} from 'react-native-svg';
import _ from 'lodash';
import objInfo from './data';

interface hitSlopProps {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface SvgIconProps {
  name: string;
  width: number;
  height: number;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  hitSlop?: hitSlopProps;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  width,
  height,
  color,
  onPress,
  style,
  disabled,
  hitSlop,
}) => {
  const {xml, textFillColor} = objInfo[name] || {};

  if (!xml) {
    return null;
  }
  const customXml =
    color && textFillColor
      ? _.replace(xml, new RegExp(textFillColor, 'g'), color)
      : xml;

  const isDisable = disabled || !onPress;
  const opacity = disabled ? 0.5 : 1;
  return (
    <View collapsable={false} style={style}>
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={onPress}
        disabled={isDisable}
        style={{opacity}}>
        <View style={{width, height}}>
          <SvgXml xml={customXml} width="100%" height="100%" />
        </View>
      </TouchableOpacity>
    </View>
  );
};
