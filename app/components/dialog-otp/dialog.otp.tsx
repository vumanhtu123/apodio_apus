import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  StyleSheet,
  Text as TextRN,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, scaleHeight, scaleWidth } from "../../app-purchase/theme";
import { Text } from "../text/text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField } from "../text-field/text-field";

const { width, height } = Dimensions.get("screen");

interface VerificationProps {
  setIsVisible: any;
  getOTP: any;
  checkOTP: any;
  resend: any;
  numberPhone: any;
  initStore: any;
}

export function VerificationCodeModal(props: VerificationProps) {
  const [isButtonEnable, setIsButtonEnable] = useState(false);
  // const { forgotPassStore } = useStores()
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const [secondss, resetSeconds] = useCountDown(60);
  const timer = useRef<NodeJS.Timeout | null>(null);
  function useCountDown(initialSeconds: number) {
    const [seconds, setSeconds] = useState(initialSeconds);
    useEffect(() => {
      if (seconds > 0) {
        timer.current = setTimeout(() => {
          setSeconds((prevSeconds: number) => prevSeconds - 1);
        }, 1000);

        return () => clearTimeout(timer.current!);
      } else if (seconds === 0) {
        clearInterval(timer.current!);
      }
    }, [seconds]);
    return [seconds, setSeconds];
  }
  useEffect(() => {
    // if (initStore) {
    setValue("otp", "");
    setIsButtonEnable(false);
    // }
  }, []);
  const handleResend = async () => {
    resetSeconds(60);
    props.resend();
  };
  return (
    <View style={styles.main}>
      <KeyboardAwareScrollView
        style={styles.content}
        keyboardShouldPersistTaps="handled">
        <View style={styles.modalView}>
          <TextRN style={styles.modalText} />
          <Text tx="dialog.title" style={styles.text} />
          <Text
            tx="dialog.content"
            style={{
              maxWidth: "80%",
              textAlign: "center",
              fontSize: 14,
              color: "#84888D",
              marginBottom: 18,
              marginHorizontal: 28,
              alignSelf: "center",
              fontWeight: "700",
            }}>
            <Text
              text={" +" + props.numberPhone.toString()}
              style={{
                color: "#323232",
                fontWeight: "700",
              }}></Text>
          </Text>
          <Controller
            control={control}
            defaultValue={""}
            render={({ field: { onChange, value, onBlur } }) => (
              <View>
                <TextField
                  autoFocus
                  maxLength={6}
                  keyboardType={"number-pad"}
                  labelTx={"demoPodcastListScreen.dialogOtp.OTP"}
                  txColor="red"
                  style={{
                    marginHorizontal: scaleWidth(14),
                    // borderWidth: 1.5,
                    borderColor: colors.palette.navyBlue,
                  }}
                  RightIconClear={null}
                  value={value}
                  onBlur={() => onBlur()}
                  error={""}
                  onClearText={() => onChange("")}
                  onChangeText={(value) => {
                    onChange(value);
                    props.getOTP(value);
                    if (value.length === 6) {
                      setIsButtonEnable(true);
                    } else {
                      setIsButtonEnable(false);
                    }
                  }}
                />
                <View style={styles.reSendOtp}>
                  <TouchableOpacity
                    onPress={() => {
                      secondss === 0 ? handleResend() : null;
                    }}>
                    <Text
                      style={[
                        styles.textResend,
                        { color: secondss === 0 ? "#3F91FF" : "#3F91FF80" },
                      ]}
                      text="Resend"
                    />
                  </TouchableOpacity>
                  <Text style={styles.countDownNumber}>
                    {" "}
                    (00:{secondss < 10 ? `0${secondss}` : secondss})
                  </Text>
                </View>
              </View>
            )}
            name="otp"
            rules={{
              required: "Password is required",
            }}
          />
          <View style={styles.viewButton}>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => {
                setValue("otp", "");
                setIsButtonEnable(false);
                props.setIsVisible(false);
              }}>
              <Text tx="common.cancel" style={styles.textCancel} />
            </TouchableOpacity>
            <TouchableOpacity
              style={
                isButtonEnable === true
                  ? styles.buttonConfirm
                  : styles.buttonConfirm2
              }
              onPress={() => {
                isButtonEnable === true ? props.checkOTP() : null;
              }}>
              <Text tx="common.confirm" style={styles.textConfirm} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    width: width,
    height: height,
    flex: 1,
  },
  content: {
    position: "absolute",
    bottom: 22,
    alignSelf: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  centeredView: {
    width: width - 16,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  modalView: {
    width: width - 32,
    // height: 279,
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  button: {
    marginHorizontal: 14,
    marginBottom: 23,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#F4AD22",
  },
  textButton: {
    fontSize: 14,
    color: "white",
    paddingVertical: 12,
    alignSelf: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
  },
  modalText: {
    marginTop: 10,
    textAlign: "center",
    width: 68,
    height: 5,
    backgroundColor: "#C7C7C7",
    borderRadius: 8,
    alignSelf: "center",
  },
  icon: {
    alignSelf: "center",
    marginTop: 37,
    marginBottom: 24,
  },
  text: {
    alignSelf: "center",
    color: "#323232",
    fontSize: 18,
    marginTop: 23,
    marginBottom: 14,
    fontWeight: "700",
  },
  row: {
    marginHorizontal: 16,
  },
  row1: {
    marginTop: 38,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectType: {
    fontSize: 14,
    color: "#323232",
  },
  cancel: {
    fontSize: 14,
    color: "#FF0000",
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "#E7EFFF",
    marginTop: 18,
    marginBottom: 14,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 14,
    width: "auto",
    paddingBottom: scaleHeight(15),
  },
  buttonCancel: {
    height: 44,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    width: "49%",
  },
  buttonConfirm: {
    height: 44,
    backgroundColor: colors.palette.navyBlue,
    borderRadius: 8,
    width: "49%",
  },
  buttonConfirm2: {
    height: 44,
    backgroundColor: "rgb(153,201,238)",
    borderRadius: 8,
    width: "49%",
  },
  textCancel: {
    paddingHorizontal: 52,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1F88D8",
    textAlign: "center",
    fontWeight: "700",
  },
  textConfirm: {
    paddingHorizontal: 52,
    paddingVertical: 12,
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
  },
  textResend: {
    fontSize: 14,
    color: "#3F91FF80",
    fontWeight: "700",
  },
  reSendOtp: {
    position: "absolute",
    right: 27,
    top: scaleHeight(15),
    // zIndex: 1,
    flexDirection: "row",
  },
  countDownNumber: {
    fontSize: 14,
    color: "#FF3B30",
    fontWeight: "700",
  },
});
