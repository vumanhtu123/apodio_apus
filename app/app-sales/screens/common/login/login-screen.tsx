import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Button } from "../../../../components/button/button";
import { Text } from "../../../../components/text/text";
import { TextField } from "../../../../components/text-field/text-field";
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
import { useStores } from "../../../models";
import { colors, palette, scaleHeight, scaleWidth } from "../../../theme";
import { styles } from "./styles";
import { Svgs } from "../../../../../assets/svgs";
import { LinearGradient } from "react-native-linear-gradient";
import { getAccessToken, getCurrentLanguage } from "../../../utils/storage";
import ModalSelectLanguage from "./modalSelectLanguage";

export const LoginScreen: FC = observer(function LoginScreen(props) {
  // Pull in one of our MST stores
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { authenticationStore } = useStores();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const [emptyInputData, setEmptyInputData] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("apodio@gmail.com");
  const [password, setPassWord] = useState<string>("system@123456");
  const [isVisibleSelectLanguage, setIsVisibleSelectLanguage] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<{
    id: string,
    icon: React.JSX.Element
    name: string
  }[]>([{ id: 'vi', name: "Tiếng việt", icon: <Svgs.icon_VietNam /> }])
  // Pull in navigation via hook
  const navigation = useNavigation();

  console.log("login 2");
  useEffect(() => {
    checkValidation();
  }, [userName, password]);

  const checkValidation = async () => {
    console.log("user", userName);
    if (userName != "" && password != "") {
      setEmptyInputData(false);
    } else {
      setEmptyInputData(true);
    }
  };

  const onSubmit = async (data: any) => {
    await authenticationStore.login(data.username, data.password);
    if (getAccessToken() !== null) {
      navigation.navigate("listCompany" as never);
    }
  };
  const languages = [
    { id: 'vi', name: 'Tiếng Việt', icon: <Svgs.icon_VietNam /> },
    { id: 'en', name: 'English', icon: <Svgs.icon_English /> },
    // Thêm các ngôn ngữ khác ở đây
  ];

  const getValueLanguage = async () => {
    const value = await getCurrentLanguage()
    console.log('vaaaaaaaaaa', value);
    languages.map((item) => {
      if (item.id == value) {

        setCurrentLanguage([item])
      }
    })
  }

  useEffect(() => {
    getValueLanguage()
  }, [])

  return (
    // <ImageBackground source={Images.iconEmpty} style={styles.ROOT}>
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      colors={[colors.palette.navyBlue, colors.palette.malibu]}
      style={styles.ROOT}>
      <View style={styles.viewBackground}>
        <Svgs.icon_backgroundLogin />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.viewImage}>
          <Svgs.icon_Logo1 />
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
                RightIconClear={Svgs.icon_delete2}
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
            defaultValue={"afs@gmail.com"}
            // defaultValue={"apodio@gmail.com"}
            // Account test
            // defaultValue={"67076743544"}
            name="username"
            rules={{ required: "Username is required" }}
          />
          <Controller
            control={control}
            // Account test setup new pin
            // defaultValue={"system@123456"}
            // Account test
            defaultValue={"system@123456"}
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
                RightIconClear={Svgs.icon_delete2}
                RightIconShow={
                  isShowPassword ? Svgs.icon_eye : Svgs.icon_unEye
                }
                onClearText={() => {
                  authenticationStore.setErrorMessage("");
                  onChange("");
                  setPassWord("");
                  checkValidation();
                }}
                onShowPassword={() => setIsShowPassword(!isShowPassword)}
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
          {authenticationStore.errorMessage != "" ? (
            <Text
              text={authenticationStore.errorMessage}
              style={styles.textError}
            />
          ) : null}
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
            {
              currentLanguage?.map((language) => {
                return (

                  <TouchableOpacity
                    // activeOpacity={1}
                    // onPress={() => _onChangeLanguage(LANGUAGE.TIMOLESTE)}
                    onPress={() => setIsVisibleSelectLanguage(true)}
                    style={styles.viewFlag}>
                    {language.icon}
                    <Text style={styles.textFlag}  >
                      {language.name}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
            {/* <View style={{ width: scaleWidth(50) }} /> */}
            {/* <TouchableOpacity
              activeOpacity={1}
              // onPress={() => _onChangeLanguage(LANGUAGE.ENGLISH)}
              style={styles.viewFlag}>
              <Images.icon_English />
              <Text style={styles.textFlag} tx={"loginScreen.english"} />
            </TouchableOpacity> */}
          </View>

          <ModalSelectLanguage
            isVisible={isVisibleSelectLanguage}
            setIsVisible={() => setIsVisibleSelectLanguage(false)}
            // currentLanguage={currentLanguage}

            arrLanguage={languages}

            onSelectLanguage={(data) => {
              console.log('====================================');
              console.log("data doan", data);
              console.log('====================================');
              setCurrentLanguage([{ id: data.id, name: data.name, icon: data.icon }])
            }} />

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
    // </ImageBackground>
  );
});
