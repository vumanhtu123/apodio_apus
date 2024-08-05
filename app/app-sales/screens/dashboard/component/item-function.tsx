import {
  View,
  Image,
  ImageStyle,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  colors,
  fontSize,
  margin,
  scaleHeight,
  scaleText,
  scaleWidth,
} from '../../../theme';
import {Text} from '../../../../components/text/text';
import {TxKeyPath} from '../../../../i18n';

interface ItemFunctionProp {
  Icon?: any;
  name?: TxKeyPath;
  onPress?: () => void;
  styles?: ViewStyle;
}

export default function ItemFunction(props: ItemFunctionProp) {
  const {Icon, name, onPress, styles} = props;
  return (
    <TouchableOpacity style={ROOT} onPress={onPress}>
      <View style={[VIEWICON, styles]}>
        <Icon />
      </View>
      <Text style={NAME} tx={name} />
    </TouchableOpacity>
  );
}
const ROOT: ViewStyle = {
  flex: 1,
  // justifyContent: "center",
  alignItems: 'center',
  marginVertical: margin.margin_4,
  marginHorizontal: margin.margin_6,
};
const NAME: TextStyle = {
  color: colors.palette.jaguar,
  fontSize: scaleText(12),
  fontWeight: '500',
  lineHeight: 16,
  textAlign: 'center',
  marginTop: scaleHeight(10),
};
const VIEWICON: ViewStyle = {
  width: scaleWidth(50),
  height: scaleHeight(50),
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 16,
};
