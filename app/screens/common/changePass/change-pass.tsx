import { Header } from "../../../components/header/header";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./styles";
import { colors, margin, scaleHeight, scaleWidth } from "../../../theme";
import { Controller, useForm } from "react-hook-form";
import { Images } from "../../../../assets";
import { Text } from "../../../components/text/text";
import { SvgIcon } from "../../../components/svg-icon";
import { TextFieldPass } from "../../../components/text-field-changepass/text-field";
import { Button } from "../../../components/button/button";
import { Screen } from "../../../../app/components/screen/screen";
import { useStores } from "../../../models";

export const changePassScreen: FC = observer(function ChangePassScreen(
  props: any
) {
  const {
    watch,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { authenticationStore } = useStores();
  const [isShowOldPass, setIsShowOldPass] = useState<boolean>(true);
  const [isShowNewPass, setIsShowNewPass] = useState<boolean>(true);
  const [isShowReNewPass, setIsShowReNewPass] = useState<boolean>(true);
  const newPass = watch("newPass");
  const reNewPass = watch("reNewPass");

  const checkReNewPass = () => {
    if (reNewPass !== newPass) {
      setError("reNewPass", {
        type: "required",
        message: "Password re-new does not match old password",
      });
    } else {
      clearErrors("reNewPass");
    }
  };

  const handleCheckOldPass = async (data: any) => {
    console.log("data post pass", data);
    authenticationStore
      .changePassword(data.newPass, data.reNewPass)
      .then((value: any) => {
        console.log("change pass", value);
      });
  };

  useEffect(() => {
    checkReNewPass();
  }, [reNewPass, newPass]);

  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        style={styles.header}
        titleStyle={styles.textHeader}
        headerTx={"changePass.changePass"}
        LeftIcon={Images.back}
        onLeftPress={() => props.navigation.goBack()}
      />
      <Screen>
        <View style={styles.viewLogo}>
          <Images.logoChangePass />
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          style={styles.body}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {/* <View style={{ alignItems: 'center' }}>
                        <SvgIcon name="icChangePin" width={18} height={18} />
                    </View> */}
          <>
            <View style={{ flexDirection: "row" }}>
              <SvgIcon name="icChangePin" width={24} height={24} />
              <Text
                text="Enter old password"
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  lineHeight: 24,
                  color: "#323232",
                  paddingLeft: 5,
                  paddingBottom: 20,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View
                style={{
                  width: 8,
                  height: 27,
                  backgroundColor: colors.palette.navyBlue,
                  marginTop: 10,
                }}
              />
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextFieldPass
                      keyboardType={null}
                      inputStyle={
                        isShowOldPass === true
                          ? styles.inputTextHide
                          : styles.inputTextShow
                      }
                      value={value}
                      onBlur={onBlur}
                      secureTextEntry={isShowOldPass}
                      isShowPassword
                      onShowPassword={() => setIsShowOldPass(!isShowOldPass)}
                      RightIconShow={
                        isShowOldPass ? Images.icon_eye : Images.icon_unEye
                      }
                      RightIconClear={Images.icon_delete2}
                      onClearText={() => onChange("")}
                      onChangeText={(value) => onChange(value)}
                    />
                  )}
                  defaultValue={""}
                  name="oldPass"
                  rules={{
                    required: "Please input data",
                    // validate: value => value != accountStore.pass ? 'The old password is incorrect' : null
                  }}
                />
              </View>
              <View
                style={{
                  width: 8,
                  height: 27,
                  backgroundColor: colors.palette.navyBlue,
                  marginTop: 10,
                }}
              />
            </View>
            <Text
              text={`${
                errors?.oldPass?.message === undefined
                  ? ""
                  : errors?.oldPass?.message
              }`}
              style={{
                color: colors.palette.radicalRed,
                alignItems: "center",
                fontSize: 12,
                paddingTop: 5,
                paddingBottom: 10,
              }}
            />
          </>
          <>
            <View style={{ flexDirection: "row" }}>
              <SvgIcon name="icChangePin" width={24} height={24} />
              <Text
                text="Enter new password"
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  lineHeight: 24,
                  color: "#323232",
                  paddingLeft: 5,
                  paddingBottom: 20,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View
                style={{
                  width: 8,
                  height: 27,
                  backgroundColor: colors.palette.navyBlue,
                  marginTop: 10,
                }}
              />
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextFieldPass
                      keyboardType={null}
                      inputStyle={
                        isShowNewPass === true
                          ? styles.inputTextHide
                          : styles.inputTextShow
                      }
                      value={value}
                      onBlur={onBlur}
                      secureTextEntry={isShowNewPass}
                      isShowPassword
                      onShowPassword={() => setIsShowNewPass(!isShowNewPass)}
                      RightIconShow={
                        isShowNewPass ? Images.icon_eye : Images.icon_unEye
                      }
                      RightIconClear={Images.icon_delete2}
                      onClearText={() => onChange("")}
                      onChangeText={(value) => {
                        onChange(value);
                      }}
                    />
                  )}
                  name="newPass"
                  rules={{
                    required: "Please input data",
                  }}
                />
              </View>
              <View
                style={{
                  width: 8,
                  height: 27,
                  backgroundColor: colors.palette.navyBlue,
                  marginTop: 10,
                }}
              />
            </View>
            <Text
              text={`${
                errors?.newPass?.message === undefined
                  ? ""
                  : errors?.newPass?.message
              }`}
              style={{
                color: "#FF0000",
                alignItems: "center",
                fontSize: 12,
                paddingTop: 5,
                paddingBottom: 10,
              }}
            />

            <View style={{ flexDirection: "row" }}>
              <SvgIcon name="icChangePin" width={24} height={24} />
              <Text
                text="Confirm the new password"
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  lineHeight: 24,
                  color: "#323232",
                  paddingLeft: 5,
                  paddingBottom: 20,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View
                style={{
                  width: 8,
                  height: 27,
                  backgroundColor: colors.palette.navyBlue,
                  marginTop: 10,
                }}
              />
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextFieldPass
                      keyboardType={null}
                      inputStyle={
                        isShowReNewPass === true
                          ? styles.inputTextHide
                          : styles.inputTextShow
                      }
                      value={value}
                      onBlur={onBlur}
                      secureTextEntry={isShowReNewPass}
                      isShowPassword
                      onShowPassword={() =>
                        setIsShowReNewPass(!isShowReNewPass)
                      }
                      RightIconShow={
                        isShowReNewPass ? Images.icon_eye : Images.icon_unEye
                      }
                      RightIconClear={Images.icon_delete2}
                      onClearText={() => onChange("")}
                      onChangeText={(value) => {
                        onChange(value);
                      }}
                    />
                  )}
                  defaultValue={""}
                  name="reNewPass"
                  rules={{
                    required: "Please input data",
                    // validate: value => value !== watch('newPass') ? 'Password do not match' : null
                  }}
                />
              </View>
              <View
                style={{
                  width: 8,
                  height: 27,
                  backgroundColor: colors.palette.navyBlue,
                  marginTop: 10,
                }}
              />
            </View>
            <Text
              text={`${
                errors?.reNewPass?.message === undefined
                  ? ""
                  : errors?.reNewPass?.message
              }`}
              style={{
                color: "#FF0000",
                alignItems: "center",
                fontSize: 12,
                paddingTop: 5,
                paddingBottom: 10,
              }}
            />
          </>
        </ScrollView>
        <Button
          tx={"changePass.next"}
          onPress={handleSubmit(handleCheckOldPass)}
          style={[
            styles.btnBottom,
            // {
            //     backgroundColor: isValid ? color.yellow : "rgba(244, 173, 34, 0.3)", marginBottom: bottom
            // }
          ]}
          textStyle={[
            styles.textButton,
            // { fontWeight: "700", fontSize: fontSize.size14, paddingVertical: scaleHeight(5) },
          ]}
        />
      </Screen>
    </View>
  );
});
