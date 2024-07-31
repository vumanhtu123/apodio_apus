import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { Text } from "../../../../../components/text/text";
import { Header } from "../../../../../components/header/header";
import { TextField } from "../../../../../components/text-field/text-field";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { Button } from "../../../../../components/button/button";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../../theme";
import {
  isFormValid,
  patternPassword,
  validatePhoneStartsWith,
} from "../../../../theme/validate";
import SelectTypeModal from "./modal-select-type";
import { styles } from "./styles";
import VerificationCodeModal from "../../../../../components/dialog-otp/dialog.otp";
import DialogSuccessUnSuccess from "../../../../../components/dialog-success-unsuccess.tsx/index";
import { Svgs } from "../../../../../../assets/svgs";

export const ForgotPasswordMerchant: FC = observer(
  function ForgotPasswordMerchant() {
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(false);
    const [type, setType] = useState("");
    const { bottom } = useSafeAreaInsets();
    const [isShowPassword, setisShowPassword] = useState(true);
    const [defaultIdNumber, setDefaultIdNumber] = useState("");
    const [isShowRePassword, setisShowRePassword] = useState(true);
    const [isVisibleDialogOtp, setIsVisibleDialogOtp] = useState(false);
    const [otp, setOtp] = useState("");

    const {
      control,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
    } = useForm({
      mode: "all",
    });
    useEffect(() => {
      setValue("idNumber", defaultIdNumber);
    }, [defaultIdNumber, setValue]);
    const isValid = isFormValid(
      errors,
      watch("phonenumber"),
      watch("idNumber")
    );
    const isValidSecond = isFormValid(
      errors,
      watch("password"),
      watch("rePassword")
    );
    const { height } = Dimensions.get("window");
    const keyboardVerticalOffset = Platform.select({
      ios: 0,
      android: scaleHeight(100),
    });
    useEffect(() => {
      const defaultValue = () => {
        switch (type) {
          case "BI_CARD":
            return "1234567890123456A";
          case "PASSPORT":
            return "ABC123456";
          case "ELECTORAL_CARD":
            return "123456789";
          default:
            return "";
        }
      };
      setDefaultIdNumber(defaultValue());
    }, [type]);
    const onGetOtp = async () => {
      setIsVisibleDialogOtp(!isVisibleDialogOtp);
    };
    let maxLenngthPhoneNumber = 11;
    if (typeof watch("phonenumber") !== "undefined") {
      if (
        watch("phonenumber").startsWith("75") ||
        watch("phonenumber").startsWith("76")
      ) {
        maxLenngthPhoneNumber = 8;
      } else if (watch("phonenumber").startsWith("670")) {
        maxLenngthPhoneNumber = 11;
      } else {
        maxLenngthPhoneNumber = 11;
      }
    }
    return (
      <View style={styles.ROOT}>
        <StatusBar translucent backgroundColor={"transparent"} />
        <Header
          type={"AntDesign"}
          LeftIcon={Svgs.back}
          onLeftPress={() => navigation.goBack()}
          colorIcon={colors.text}
          headerTx="demoPodcastListScreen.forgotPasswordMerchant.forgotPassword"
          style={{ height: scaleHeight(54) }}
        />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <ScrollView
            bounces={false}
            style={styles.body}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextField
                  maxLength={maxLenngthPhoneNumber}
                  keyboardType={"number-pad"}
                  label={"Phone number"}
                  style={{
                    marginBottom: scaleHeight(10),
                    marginTop: scaleWidth(10),
                    justifyContent: "center",
                    // alignItems : 'center'
                  }}
                  value={value}
                  onBlur={onBlur}
                  RightIconClear={Svgs.icon_delete}
                  error={errors?.phonenumber?.message}
                  onClearText={() => onChange("")}
                  onChangeText={(value) => onChange(value)}
                />
              )}
              defaultValue={""}
              name="phonenumber"
              rules={{
                required: "Please input data",
                validate: (value) =>
                  validatePhoneStartsWith(value) == false
                    ? "Phone number isnt right"
                    : null,
              }}
            />
            <Button
              onPress={() => {
                setIsVisible(!isVisible);
                console.log("isVisible after:", isVisible);
              }}
              style={[
                styles.button,
                {
                  backgroundColor: colors.gray,
                  borderColor: "#F4AD22",
                  borderWidth: isVisible ? 1 : 0,
                },
              ]}>
              <View style={{ marginTop: scaleHeight(14) }}>
                <Text
                  text={"Select Type"}
                  style={[styles.lableSelectText, { color: "#84888D" }]}
                />
                <Text
                  text={
                    type
                      ? type === "BI_CARD"
                        ? "BI Card"
                        : type === "PASSPORT"
                        ? "Passport"
                        : "Eletoral Card"
                      : "Select..."
                  }
                  style={[styles.selectText, { color: "#242426" }]}
                />
              </View>
              <Svgs.dropDown />
            </Button>
            {/* <Controller
              control={control}
              defaultValue={defaultIdNumber}
              render={({field: {onChange, value, onBlur}}) => (
                <TextField
                  keyboardType={null}
                  label={'ID'}
                  style={{marginBottom: scaleHeight(13)}}
                  value={value}
                  onBlur={() => onBlur()}
                  isShowPassword
                  // rightIcon2="icClose"
                  // rightIcon1={isShowPassword ? "eyeHide" : "unEyeHide"}
                  onClearText={() => onChange('')}
                  onShowPassword={() => setisShowPassword(!isShowPassword)}
                  error={errors?.idNumber?.message}
                  onChangeText={value => onChange(value)}
                />
              )}
              name="idNumber"
              rules={{
                required: 'Please input data',
                pattern: {
                  value:
                    type === 'BI_CARD'
                      ? /^[a-zA-Z0-9]{17}$/
                      : type === 'PASSPORT'
                      ? /^[a-zA-Z0-9]{1,20}$/
                      : type === 'ELECTORAL_CARD'
                      ? /^[a-zA-Z0-9]{9}$/
                      : /^[a-zA-Z0-9]{1,20}$/,
                  message:
                    type === 'BI_CARD'
                      ? 'Only accept character & digit (17 char)'
                      : type === 'PASSPORT'
                      ? 'Only accept character & digit (1-20 char)'
                      : type === 'ELECTORAL_CARD'
                      ? 'Only accept character & digit (9 char)'
                      : '',
                },
              }}
            /> */}
            {/* hiển thi pass word  */}
            {/* {type && isValid && ( */}
            <View style={{ marginBottom: scaleHeight(130) }}>
              {/* <Controller
                control={control}
                defaultValue={''}
                render={({field: {onChange, value, onBlur}}) => (
                  <TextField
                    keyboardType={null}
                    label={'Enter password'}
                    style={{marginBottom: scaleHeight(13)}}
                    value={value}
                    secureTextEntry={isShowPassword}
                    onBlur={() => onBlur()}
                    isShowPassword
                    // rightIcon2="icClose"
                    // rightIcon1={isShowPassword ? 'eye' : 'unEye'}
                    onClearText={() => onChange('')}
                    onShowPassword={() => setisShowPassword(!isShowPassword)}
                    error={errors?.password?.message}
                    onChangeText={value => onChange(value)}
                  />
                )}
                name="password"
                rules={{
                  required: 'Please input data',
                  pattern: {
                    value: patternPassword,
                    message:
                      'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character',
                  },
                }}
              />
              <Controller
                control={control}
                defaultValue={''}
                render={({field: {onChange, value, onBlur}}) => (
                  <TextField
                    keyboardType={null}
                    label={'Re-enter password'}
                    style={{marginBottom: scaleHeight(13)}}
                    value={value}
                    secureTextEntry={isShowRePassword}
                    onBlur={() => onBlur()}
                    isShowPassword
                    // rightIcon2="icClose"
                    // rightIcon1={isShowRePassword ? 'eye' : 'unEye'}
                    onClearText={() => onChange('')}
                    onShowPassword={() =>
                      setisShowRePassword(!isShowRePassword)
                    }
                    error={errors?.rePassword?.message}
                    onChangeText={value => onChange(value)}
                  />
                )}
                name="rePassword"
                rules={{
                  required: 'Please input data',
                  validate: value =>
                    value != watch('password') ? 'Password do not match' : null,
                }}
              /> */}
            </View>
            {/* )
                    } */}
          </ScrollView>
        </KeyboardAvoidingView>
        {/* <Button
                    tx={"demoPodcastListScreen.forgotPasswordMerchant.continue"}
                    onPress={handleSubmit(onGetOtp)}
                    style={[
                        styles.btnBottom,
                        { backgroundColor: isValidSecond ? colors.palette.navyBlue : "rgb(153,201,238)", marginBottom: bottom + 20 }
                    ]}
                    textStyle={[
                        styles.textButton,
                        { fontWeight: "700", fontSize: fontSize.size14, paddingVertical: scaleHeight(5), },
                    ]}
                /> : */}
        <Button
          tx={"demoPodcastListScreen.forgotPasswordMerchant.continue"}
          // onPress={(handleSubmit(onGetOtp))}
          onPress={() => {}}
          style={[
            styles.btnBottom,
            {
              backgroundColor:
                isValid && type !== ""
                  ? colors.palette.navyBlue
                  : "rgb(153,201,238)",
              marginBottom: bottom + 20,
            },
          ]}
          textStyle={[
            styles.textButton,
            {
              fontWeight: "700",
              fontSize: fontSize.size14,
              paddingVertical: scaleHeight(5),
            },
          ]}
        />
        <SelectTypeModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setType={setType}
        />
        {
          <>
            <Modal
              animationType="fade"
              transparent={true}
              visible={isVisibleDialogOtp}
              onRequestClose={() => {
                setIsVisibleDialogOtp(!isVisibleDialogOtp);
              }}>
              <VerificationCodeModal
                numberPhone={watch("phonenumber")}
                setIsVisible={setIsVisibleDialogOtp}
                getOTP={setOtp}
                // checkOTP={handleSetNewPassWord}
                // resend={handleSubmit(handleResendOtp)}
              />
            </Modal>
            {/* <Modal
                            animationType="fade"
                            transparent={true}
                        >
                            <DialogSuccessUnSuccess
                                imgPath={Images.ic_error}
                                content={'mmmmmmmmmmmmmm'}
                                onPress={() => {console.log('ok') }}
                                textButton="OK"
                                title={'12345'}
                            />

                        </Modal> */}
            {/* <Modal
                            animationType="fade"
                            transparent={true}
                            // visible={forgotPassStore.checkSubmitNewPass}
                            >
                            <DialogSuccessUnSuccess
                                imgPath={Images.ic_success}
                                content={'You already forgot password successfully. Thank you!.'}
                                onPress={() => {console.log('ok') }}
                                textButton="Login"
                                title={'Successfully!'}
                            />
                        </Modal> */}
          </>
        }
      </View>
    );
  }
);
