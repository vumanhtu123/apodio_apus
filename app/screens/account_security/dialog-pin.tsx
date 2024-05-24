import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text as TextRN,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../theme';
// import {Button} from '../button/button';
// import {Text} from '../../components/Text';
import { Button } from '../../../app/components';
// import {Text} from '../../../app/components';
import { Controller, useForm } from 'react-hook-form';
import OTPInput from '../../components/otp_input/index';
import { SvgIcon } from '../../../app/components/svg-icon/index';
import { Text } from '../../components/text/text';
import { Images } from '../../../assets';
interface DialogOtp {
  onPress?: () => void;
  content?: string;
  textButton?: string;
  title?: string;
  imgPath?: any;
}
const DialogOtp = (props: DialogOtp) => {
  const [pinCode, setPinCode] = useState('');
  const [oldPin, setOldPin] = useState('');
  const [isPinReady, setIsPinReady] = useState<boolean>(false);
  const { control } = useForm({
    mode: 'all',
  });
  const handleClose = () => {
    console.log('12345')
  }
  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <Button onPress={handleClose} style={{ alignItems: 'center', backgroundColor: 'none', marginBottom: scaleHeight(8) }} >
          <Images.circle_close width={scaleWidth(24)} height={scaleHeight(24)} />
          <Text tx='demoPodcastListScreen.dialogOtp.close' style={{ color: 'white', fontSize: fontSize.size12, marginTop: scaleHeight(3), lineHeight: scaleHeight(24) }} />
        </Button>
        <View style={styles.modalView}>
          <TextRN style={styles.modalText} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: scaleWidth(26),
              marginTop: scaleHeight(17),
            }}>
            <SvgIcon name={'iconClockM'} width={22} height={22} color="blue" />
            <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>PIN</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: scaleHeight(20),
              // marginBottom : scaleHeight(20)
            }}>
            <View
              style={{
                width: scaleWidth(8),
                height: scaleHeight(27),
                backgroundColor: colors.palette.navyBlue,
                marginTop: 10,
              }}
            />
            <OTPInput
              code={pinCode}
              isOtp={true}
              setCode={setPinCode}
              setIsPinReady={setIsPinReady}
              onBlur={null}
            />
            <View
              style={{
                width: scaleWidth(8),
                height: scaleHeight(27),
                backgroundColor: colors.palette.navyBlue,
                marginTop: 10,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default DialogOtp;
const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
  },
  content: {
    position: 'absolute',
    bottom: scaleHeight(22),
    alignSelf: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  // centeredView: {
  //   width: width - 32,
  //   alignSelf: 'center',
  //   justifyContent: 'flex-end',
  // },
  modalView: {
    width: scaleWidth(346),
    // height: scaleHeight(137),
    backgroundColor: 'white',
    borderRadius: 20,
  },
  modalText: {
    marginTop: 10,
    textAlign: 'center',
    width: scaleWidth(68),
    height: scaleHeight(5),
    backgroundColor: '#C7C7C7',
    borderRadius: 8,
    alignSelf: 'center',
  },
});
