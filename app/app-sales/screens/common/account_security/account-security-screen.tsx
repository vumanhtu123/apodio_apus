import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';
import { Header } from '../../../../app-purchase/components/header/header';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Switch,
  View,
} from 'react-native';
import {colors, scaleHeight} from '../../../theme';
import {styles} from './styles';
import { Button } from '../../../../app-purchase/components/button/button';
import { Text } from '../../../../app-purchase/components/text/text';
import { SvgIcon } from '../../../../app-purchase/components/svg-icon/index';
import SelectTypeModal from './modal-select-type';
// import {icSuccess} from '../../theme/images';
import { Svgs } from '../../../../../assets/svgs';


export const AccountSecurity: FC = observer(function AccountSecurity() {
  const navigation = useNavigation();
  const [isShowPassword, setisShowPassword] = useState(true);
  const [defaultIdNumber, setDefaultIdNumber] = useState('');
  const [isShowRePassword, setisShowRePassword] = useState(true);
  const [isVisibleDialogOtp, setIsVisibleDialogOtp] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [oldPin, setOldPin] = useState('');
  const [isPinReady, setIsPinReady] = useState<boolean>(false);
  const [type, setType] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: 'all',
  });
  // const { height } = Dimensions.get('window');
  const keyboardVerticalOffset = Platform.select({
    ios: 0,
    android: scaleHeight(100),
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.ROOT}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Header
        type={'AntDesign'}
        LeftIcon={Svgs.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerTx="demoPodcastListScreen.accountSecurity.accountSecurity"
        style={{ height: scaleHeight(54), marginBottom: scaleHeight(20) }}

      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <ScrollView
          bounces={false}
          style={styles.body}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {/* <Controller
                            control={control}
                            defaultValue={''}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: 8, height: 27, backgroundColor: colors.palette.navyBlue, marginTop: 10 }} />
                                        <OTPInput code={pinCode} isOtp={true}
                                            setCode={(code:any) => { setPinCode(code); onChange(code); setOldPin(code); }}
                                            setIsPinReady={setIsPinReady}
                                            onBlur={onBlur} />
                                        <View style={{ width: 8, height: 27, backgroundColor: colors.palette.navyBlue, marginTop: 10 }} />
                                    </View>
                                </View>
                            )}
                            name="currentPin"
                            rules={{
                                required: "Please input data",
                                validate: value => value.length < 6 ? '' : null
                            }}
                        /> */}
          {/* <DialogOtp/> */}
          <View
            style={[
              styles.button,
              {backgroundColor: colors.palette.white, borderColor: colors.yellow, marginTop:scaleHeight(10)},
            ]}>
            <View >
              <Text
                
                text={'Đăng nhập bằng vân tay/FaceID'}
                style={[styles.lableSelectText, { color: 'black' }]}
              />
              <Text
                text={'chỉ có hiệu lực với thiết bị này'}
                style={[styles.selectText, { color: colors.aluminium }]}
              />
            </View>
            <Switch
              trackColor={{ false: colors.palette.dolphin, true: colors.palette.dolphin }}
              thumbColor={isEnabled ? colors.navyBlue : colors.selago}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={{ borderWidth:1,borderColor:colors.ghostWhite, marginHorizontal:8}}/>
          <Button
            onPress={() => {
              setIsVisible(!isVisible);
              console.log('isVisible after:', isVisible);
            }}
            style={[
              styles.button,
              {backgroundColor: colors.palette.white, borderColor: colors.yellow},
            ]}>
            <View>
              <Text
                text={'Tự động đăng xuật sau '}
                style={[styles.lableSelectText, { color: 'black' }]}
              />
              <Text
                text={
                  type === '2_minutes'
                    ? '2 minutes'
                    : type === '3_minutes'
                      ? '3 minutes'
                      : type === '4_minutes'
                        ? '4 minutes'
                        : type === '5_minutes'
                          ? '5 minutes'
                          : type === '10_minutes'
                            ? '10 minutes'
                            : type === '15_minutes'
                              ? '15 minutes'
                              : ''
                }
                style={[styles.selectText, { color: colors.aluminium }]}
              />
            </View>
            <SvgIcon
              name={'icDropdownSelect'}
              width={22}
              height={22}
              color="blue"
            />
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
      <SelectTypeModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setType={setType}
      />
      {/* <DialogOtp/> */}
      {/* <Modal
                            animationType="fade"
                            transparent={true}
                            // visible={true}
                            // visible={forgotPassStore.checkSubmitNewPass}
                            >
                            <DialogOtp/>
                        </Modal> */}
                        
      {/* <Modal
                    animationType="fade"
                    transparent={true}
                    // visible={isVisibleDialogOtp}
                    onRequestClose={() => {
                        setIsVisibleDialogOtp(!isVisibleDialogOtp);
                    }}>
                    <VerificationCodeModal
                        setIsVisible={setIsVisibleDialogOtp}
                        getOTP={null}
                    // checkOTP={checkOtp}
                    // resend={handleSubmit(handleResendOtp)}
                    />
                </Modal> */}
      {/* <Modal

      <Modal
        animationType="fade"
        transparent={true}
        // visible={forgotPassStore.checkSubmitNewPass}
      >
        <DialogSuccessUnSuccess
          imgPath={Images.ic_success}
          content={'You already forgot password successfully. Thank you!.'}
          onPress={() => {
            console.log('ok');
          }}
          textButton="Login"
          title={'Successfully!'}
        />
      </Modal> */}
    </View>
  );
});
