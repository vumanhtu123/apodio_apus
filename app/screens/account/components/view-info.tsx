import {
  View,
  Image,
  ImageStyle,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors, fontSize, scaleHeight, scaleWidth} from '../../../theme';
import {SvgIcon, Text} from '../../../components';
import {TxKeyPath} from '../../../i18n';
import {formatPhoneNumber} from '../../../utils/validate';
import {useStores} from '../../../models';

interface ViewInfoProp {
  tx?: TxKeyPath;
  text?: string;
  image?: string;
  name?: string;
  onPress?: () => void;
  onChangeAVT?: () => void;
  merchantPhone?: string;
}

export default function ViewInfo(props: ViewInfoProp) {
  const {image, name, onChangeAVT, merchantPhone} = props;
  const {accountStore} = useStores();

  return (
    <View style={{flexDirection: 'row', width: '65%'}}>
      <TouchableOpacity
        style={{width: scaleWidth(64), height: scaleHeight(64)}}
        onPress={onChangeAVT}>
        <Image
          source={{
            uri: image !== '' ? image : null,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accountStore.accessToken}`,
            },
          }}
          style={AVATAR}
        />
        <View style={VIEWCAMERA}>
          <SvgIcon name={'icCamera'} width={11} height={11} />
        </View>
      </TouchableOpacity>
      <View style={MERCHANT_INFO}>
        <View style={MERCHANT_ROLE}>
          <Text text={'Merchant'} style={MERCHANT_TEXT} />
        </View>
        <Text style={NAME} text={name} />
        <Text
          style={PHONE_TEXT}
          text={formatPhoneNumber(merchantPhone ?? '')}
        />
      </View>
    </View>
  );
}
const AVATAR: ImageStyle = {
  width: scaleWidth(64),
  height: scaleWidth(64),
  borderRadius: 64,
};
const VIEWCAMERA: ViewStyle = {
  width: scaleWidth(21),
  height: scaleHeight(21),
  backgroundColor: colors.text,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'baseline',
  borderRadius: 21,
  position: 'absolute',
  right: 0,
  bottom: 0,
};
const NAME: TextStyle = {
  fontWeight: '700',
  fontSize: fontSize.size16,
  lineHeight: 24,
};
const PHONE_TEXT: TextStyle = {
  fontWeight: '400',
  fontSize: fontSize.size14,
};
const MERCHANT_TEXT = {
  fontSize: fontSize.size12,
  fontWeight: '500',
  paddingVertical: scaleHeight(2),
  paddingHorizontal: scaleWidth(2),
};
const MERCHANT_INFO = {
  marginLeft: scaleWidth(15),
};
const MERCHANT_ROLE = {
  backgroundColor: '#3F91FF',
  alignSelf: 'baseline',
  alignItems: 'center',
  borderRadius: 3,
};
