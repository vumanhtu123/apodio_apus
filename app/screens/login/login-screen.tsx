/* eslint-disable react-native/no-inline-styles */

import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Button } from "../../components/button/button";
import { Text } from "../../components/text/text";
import { TextField } from "../../components/text-field/text-field";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useStores } from "../../models";
import { colors, palette, scaleHeight, scaleWidth } from "../../theme";
import { styles } from "./styles";
import { Buffer } from "buffer";
import { Images } from "../../../assets/index";
import { LinearGradient } from "react-native-linear-gradient";
import { useAuth } from "../contexts/auth";
import {
  getAccessToken,
  setAccessToken,
  setTenantId,
} from "../../utils/storage";
import { hideLoading, showLoading } from "../../utils/toast";

export const LoginScreen: FC = observer(function LoginScreen(props) {
  // Pull in one of our MST stores
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { authenticationStore } = useStores();

  const [isShowPassword, setisShowPassword] = useState(true);
  const [emptyInputData, setEmptyInputData] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState<String>("");
  const [password, setPassWord] = useState<String>("");
  const auth = useAuth();
  // Pull in navigation via hook
  const navigation = useNavigation();

  useEffect(() => {
    checkValidation();
  }, [userName, password]);

  const checkValidation = async () => {
    console.log("on login");
    console.log("user", userName);
    if (userName != "" && password != "") {
      setEmptyInputData(false);
    } else {
      setEmptyInputData(true);
    }
  };

  const onSubmit = async (data: any) => {
    checkValidation();
    console.log("login");
    await authenticationStore
      .login(data.username, data.password)
      .then((data) => {
        if (data.data) {
          console.log("success");
          setAccessToken(authenticationStore.accessToken);
          setTenantId(authenticationStore.tenantId);
          console.log("tuvm id", authenticationStore.tenantId);
          auth.changeLoginStatus();
        } else {
          setError(data.data.errorCodes.map((item: any) => item.message));
          console.log(
            "login error",
            data.data.errorCodes.map((item: any) => item.message)
          );
        }
      });
  };

  return (
    // <ImageBackground source={Images.iconEmpty} style={styles.ROOT}>
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      colors={[colors.palette.navyBlue, colors.palette.malibu]}
      style={styles.ROOT}>
      <View style={styles.viewBackground}>
        <Images.icon_backgroundLogin />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.viewImage}>
          <Images.icon_Logo1 />
        </View>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          style={styles.viewForm}>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                keyboardType={null}
                labelTx={"loginScreen.emailFieldLabel"}
                style={{ marginBottom: scaleHeight(10) }}
                value={value}
                onBlur={onBlur}
                RightIconClear={Images.icon_delete2}
                error={""}
                onClearText={() => {
                  onChange("");
                  setUserName("");
                  checkValidation();
                }}
                onChangeText={(value) => {
                  onChange(value);
                  setUserName(value);
                  checkValidation();
                }}
              />
            )}
            // Account test setup new pin
            defaultValue={"system_admin"}
            // Account test
            // defaultValue={"67076743544"}
            name="username"
            rules={{ required: "Username is required" }}
          />
          <Controller
            control={control}
            // Account test setup new pin
            // defaultValue={"system_admin"}
            // Account test
            defaultValue={"system_admin"}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                keyboardType={null}
                labelTx={"loginScreen.passwordFieldLabel"}
                style={{ marginBottom: scaleHeight(0) }}
                inputStyle={isShowPassword === true ? styles.inputPass : null}
                value={value}
                // secureTextEntry={false}
                secureTextEntry={isShowPassword}
                onBlur={onBlur}
                isShowPassword
                RightIconClear={Images.icon_delete2}
                RightIconShow={
                  isShowPassword ? Images.icon_eye : Images.icon_unEye
                }
                onClearText={() => {
                  onChange("");
                  setPassWord("");
                  checkValidation();
                }}
                onShowPassword={() => setisShowPassword(!isShowPassword)}
                error={""}
                onChangeText={(value) => {
                  onChange(value);
                  setPassWord(value);
                  checkValidation();
                }}
              />
            )}
            name="password"
            rules={{ required: "Password is required" }}
          />
          {error != "" ? <Text text={error} style={styles.textError} /> : null}
          {!emptyInputData ? (
            <Button
              tx="loginScreen.signIn"
              onPress={handleSubmit(onSubmit)}
              style={styles.btnBottom}
              textStyle={styles.textButton}
            />
          ) : (
            <Button
              tx="loginScreen.signIn"
              onPress={handleSubmit(onSubmit)}
              style={styles.btnBottomEmpty}
              textStyle={styles.textButton}
            />
          )}
          <TouchableOpacity
            style={[styles.viewForgot, { marginTop: 25 }]}
            onPress={() => {
              navigation.navigate("forgotPasswordStaff" as never);
            }}>
            <Text style={styles.textForgot} tx={"loginScreen.forgotPassword"} />
          </TouchableOpacity>
          <View
            style={[
              styles.viewLanguage,
              { height: Platform.OS === "android" ? 100 : null },
            ]}>
            <TouchableOpacity
              activeOpacity={1}
              // onPress={() => _onChangeLanguage(LANGUAGE.TIMOLESTE)}
              style={styles.viewFlag}>
              <Images.icon_VietNam />
              <Text style={styles.textFlag} tx={"loginScreen.vietNam"} />
            </TouchableOpacity>
            {/* <View style={{ width: scaleWidth(50) }} /> */}
            {/* <TouchableOpacity
              activeOpacity={1}
              // onPress={() => _onChangeLanguage(LANGUAGE.ENGLISH)}
              style={styles.viewFlag}>
              <Images.icon_English />
              <Text style={styles.textFlag} tx={"loginScreen.english"} />
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
    // </ImageBackground>
  );
});
