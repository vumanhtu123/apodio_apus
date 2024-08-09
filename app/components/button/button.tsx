import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../text/text';
import { viewPresets, textPresets } from './button.presets';
import { ButtonProps } from './button.props';

export function Button(props: ButtonProps) {
  const {
    preset = 'primary',
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    Icon,
    iconPosition = 'left',
    ...rest
  } = props;

  const viewStyle = viewPresets[preset] || viewPresets.primary;
  const viewStyles = [viewStyle, styleOverride];
  const textStyle = textPresets[preset] || textPresets.primary;
  const textStyles = [textStyle, textStyleOverride];

  const content = children || <Text tx={tx} text={text} style={textStyles} />;

  return (
    <TouchableOpacity activeOpacity={1} style={viewStyles} {...rest}>
      {/* {icon && iconPosition === 'left' && (
        <View style={{ marginRight: 8 }}>{icon}</View>
      )} */}
      {content}
    </TouchableOpacity>
  );
}