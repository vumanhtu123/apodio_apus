import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useRef, useState } from "react";
import { Button } from "../../../../../components/button/button";
import { Header } from "../../../../../components/header/header";
import { TextField } from "../../../../../components/text-field/text-field";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
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
import { styles } from "./styles";
import DialogSuccessUnSuccess from "../../../../../components/dialog-success-unsuccess.tsx/index";
import { Images } from "../../../../../../assets/index";
import { StackScreenProps } from "@react-navigation/stack";
import { useStores } from "../../../../models";
import { AuthParamList } from "../../../../navigators/auth-navigator";
import { VerificationCodeModal } from "../../../../../components/dialog-otp/dialog.otp";
import { ALERT_TYPE, Dialog } from "../../../../../components/dialog-notification";
import { translate } from "../../../../i18n";
import { Text } from "../../../../../components";
export const ForgotPasswordStaff: FC<
  StackScreenProps<AuthParamList, "forgotPasswordStaff">
> = observer(function ForgotPasswordStaff() {
  const navigation = useNavigation();
  // const [selectLanguage, setSelectLanguage] = useState(LANGUAGE.ENGLISH)
  const [isShowPassword, setisShowPassword] = useState(false);
  const [isShowPassword1, setisShowPassword1] = useState(false);
  const [isButton, setIsButton] = useState(true);
  const [isButtonConfirm, setIsButtonConfirm] = useState(false);
  const [isVisibleDialogOtp, setIsVisibleDialogOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isUnsuccessModalVisible, setIsUnsuccessModalVisible] = useState(false);
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [valueEmailPhone, setValueEmailPhone] = useState<string>("");
  const [valuePassNew, setValuePassNew] = useState<string>("");
  const [valuePassConfirm, setValuePassConfirm] = useState<string>("");
  const [valueErrorCheck, setValueErrorCheck] = useState<string>("");
  const { bottom } = useSafeAreaInsets();
  const { authenticationStore } = useStores();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "all",
  });

  useEffect(() => {}, [valueEmailPhone]);

  useEffect(() => {
    onShowButtonGetOtp();
  }, [valuePassNew, valuePassConfirm]);

  const isValid = isFormValid(errors, watch("phonenumber"));

  const isValidSecond = isFormValid(
    errors,
    watch("password"),
    watch("rePassword")
  );
  const onShowOtp = async () => {
    try {
      await authenticationStore
        .forgotPass(valueEmailPhone, "PHONE")
        .then((item: any) => {
          console.log("tuvm check success ==1", item);
          if (item.message == "Success") {
            setIsVisibleDialogOtp(!isVisibleDialogOtp);
          } else {
            Dialog.show({
              type: ALERT_TYPE.INFO,
              title: translate("txtDialog.notification"),
              textBody: item.errorCodes[0].message,
              button: translate("common.cancel"),
              closeOnOverlayTap: false,
              onPressButton: () => {
                Dialog.hide();
              },
            });
          }
        });
    } catch (e: any) {
      console.log("forgot pass tuvm", e.message);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
  };
  // Hàm xử lý sự kiện khi đóng modal unsucces
  const handleUnsuccessModalClose = () => {
    setIsUnsuccessModalVisible(false);
  };

  const onShowButtonGetOtp = () => {
    if (valuePassConfirm != "" && valuePassNew != "") {
      setIsButtonConfirm(true);
    } else {
      setIsButtonConfirm(false);
    }
  };
  //0855564423
  const onSubmitCheck = async (data: any) => {
    setValueErrorCheck("");
    console.log("onclick");
    if (data.valueEmailPhone == "") {
      return;
    }
    try {
      await authenticationStore
        .forgotPass(data.valueEmailPhone, "PHONE")
        .then((item: any) => {
          console.log("tuvm check success ==1", item);
          if (item.message == "Success") {
            setIsShowPass(true);
            setIsButton(false);
          } else {
            setValueErrorCheck(item.errorCodes[0].message);
            setIsShowPass(false);
            setIsButton(true);
          }
        });
    } catch (e: any) {
      console.log("forgot pass tuvm", e.message);
    }
  };

  const onSubmitPassword = async (data: any) => {
    console.log("onSubmit", data, valuePassConfirm, otp);
    // if (data.valueOtp == "") {
    //   Dialog.show({
    //     type: ALERT_TYPE.INFO,
    //     title: translate("txtDialog.permission_allow"),
    //     textBody: "Bạn cần nhập đủ OTP",
    //     button: translate("common.cancel"),
    //     button2: translate("txtDialog.settings"),
    //     closeOnOverlayTap: false,
    //     onPressButton: () => {
    //       Dialog.hide();
    //     },
    //   });
    //   return;
    // }
    try {
      await authenticationStore
        .submitPassword(Number(otp), valuePassConfirm)
        .then((item: any) => {
          console.log("tuvm check success ==", item);
          if (item.message == "Success") {
            Dialog.show({
              type: ALERT_TYPE.INFO,
              title: translate("txtDialog.notification"),
              textBody: item.message,
              button: translate("common.ok"),
              closeOnOverlayTap: false,
              onHide() {
                setValue("valueEmailPhone", "");
                setValue("passwordNew", "");
                setValue("passwordConfirm", "");
                setIsShowPass(!isShowPass);
                setIsButton(!isButton);
                setIsVisibleDialogOtp(!isVisibleDialogOtp);
              },
            });
            console.log("success tuvm forgot", item);
          } else {
            Dialog.show({
              type: ALERT_TYPE.INFO,
              title: translate("txtDialog.notification"),
              textBody: item.errorCodes[0].message,
              button: translate("common.cancel"),
              closeOnOverlayTap: false,
              onPressButton: () => {
                setIsVisibleDialogOtp(!isVisibleDialogOtp);
                Dialog.hide();
              },
            });
          }
        });
    } catch (e: any) {
      console.log("forgot pass", e.message);
    }
  };
  return (
    <View style={styles.ROOT}>
      <StatusBar translucent backgroundColor={"transparent"} />
      {/* <DialogLoading visible={loading} /> */}
      <Header
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerTx="demoPodcastListScreen.forgotPasswordMerchant.forgotPassword"
        style={{ height: scaleHeight(52) }}
      />
      {/* <Screen> */}
      <ScrollView
        bounces={false}
        style={styles.body}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              keyboardType={null}
              labelTx={"forgotPass.phoneOrEmail"}
              style={{
                marginBottom: scaleHeight(10),
                marginTop: scaleHeight(20),
              }}
              value={value}
              onBlur={onBlur}
              RightIconClear={Images.icon_delete2}
              error={""}
              onClearText={() => {
                onChange("");
                setValueEmailPhone("");
                setValueErrorCheck("");
              }}
              onChangeText={(value) => {
                onChange(value);
                setValueEmailPhone(value);
              }}
            />
          )}
          // Account test setup new pin
          defaultValue={""}
          // Account test
          // defaultValue={"67076743544"}
          name="valueEmailPhone"
          rules={{ required: "Username is required" }}
        />
        {valueErrorCheck != "" ? (
          <Text
            text={valueErrorCheck}
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: "red",
            }}
          />
        ) : null}
        {isShowPass ? (
          <View>
            <Controller
              control={control}
              // Account test setup new pin
              // defaultValue={"system_admin"}
              // Account test
              defaultValue={""}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextField
                  keyboardType={null}
                  labelTx={"forgotPass.passwordNew"}
                  style={{ marginBottom: scaleHeight(0) }}
                  inputStyle={isShowPassword === true ? styles.inputPass : null}
                  value={value}
                  secureTextEntry={isShowPassword}
                  onBlur={onBlur}
                  isShowPassword
                  RightIconClear={Images.icon_delete2}
                  RightIconShow={
                    isShowPassword ? Images.icon_eye : Images.icon_unEye
                  }
                  onClearText={() => {
                    onChange("");
                    setValuePassNew("");
                  }}
                  onShowPassword={() => setisShowPassword(!isShowPassword)}
                  error={""}
                  onChangeText={(value) => {
                    onChange(value);
                    setValuePassNew(value);
                  }}
                />
              )}
              name="passwordNew"
              rules={{ required: "Password is required" }}
            />

            <View style={{ marginBottom: scaleHeight(130), marginTop: 7 }}>
              <Controller
                control={control}
                // Account test setup new pin
                // defaultValue={"system_admin"}
                // Account test
                defaultValue={""}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextField
                    keyboardType={null}
                    labelTx={"forgotPass.passwordConfirm"}
                    style={{ marginBottom: scaleHeight(0) }}
                    inputStyle={
                      isShowPassword1 === true ? styles.inputPass : null
                    }
                    value={value}
                    // secureTextEntry={false}
                    secureTextEntry={isShowPassword1}
                    onBlur={onBlur}
                    isShowPassword
                    RightIconClear={Images.icon_delete2}
                    RightIconShow={
                      isShowPassword1 ? Images.icon_eye : Images.icon_unEye
                    }
                    onClearText={() => {
                      onChange("");
                      setValuePassConfirm("");
                    }}
                    onShowPassword={() => setisShowPassword1(!isShowPassword)}
                    error={""}
                    onChangeText={(value) => {
                      onChange(value);
                      setValuePassConfirm(value);
                    }}
                  />
                )}
                name="passwordConfirm"
                rules={{ required: "Password is required" }}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>

      {isButton ? (
        <Button
          tx={"forgotPass.continue"}
          onPress={handleSubmit(onSubmitCheck)}
          // onPress={() => { }}
          style={[
            styles.btnBottom,
            {
              backgroundColor: valueEmailPhone
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
      ) : (
        <Button
          tx={"forgotPass.continue"}
          // onPress={handleSubmit(onShowPass)}
          onPress={() => {
            onShowOtp();
          }}
          style={[
            styles.btnBottom,
            {
              backgroundColor: isButtonConfirm
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
      )}
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isVisibleDialogOtp}
          onRequestClose={() => {
            setIsVisibleDialogOtp(!isVisibleDialogOtp);
          }}>
          <VerificationCodeModal
            setIsVisible={setIsVisibleDialogOtp}
            getOTP={setOtp}
            checkOTP={handleSubmit(onSubmitPassword)}
            resend={handleSubmit(onSubmitCheck)}
            numberPhone={""}
            initStore={undefined}
          />
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isUnsuccessModalVisible}>
          <DialogSuccessUnSuccess
            imgPath={Images.ic_error}
            content={"forgotPassStore.messageError"}
            onPress={() => {
              handleUnsuccessModalClose();
            }}
            textButton="OK"
            title={"null"}
          />
        </Modal>
        {/* <Modal
                            animationType="fade"
                            transparent={true}
                            visible={forgotPassStore.checkOtp}>
                            <DialogSuccessUnSuccess
                                imgPath={Images.ic_error}
                                content={forgotPassStore.messageError}
                                onPress={() => { forgotPassStore.setCheckOtp(false) }}
                                textButton="OK"
                                title={null}
                            />
                        </Modal> */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isSuccessModalVisible}>
          <DialogSuccessUnSuccess
            imgPath={Images.ic_success}
            content={"You already forgot password successfully. Thank you!."}
            onPress={() => {
              handleSuccessModalClose();
              navigation.goBack();
            }}
            textButton="Login"
            title={"Successfully!"}
          />
        </Modal>
      </>
      {/* </Screen> */}
    </View>
  );
});
