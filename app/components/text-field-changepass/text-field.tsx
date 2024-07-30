import React, { useRef, useState } from "react";
import {
  Animated,
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Text as TextRN,
} from "react-native";
import {
  colors,
  fontSize,
  scaleHeight,
  scaleWidth,
  spacing,
} from "../../app-purchase/theme";
import { translate, TxKeyPath } from "../../app-purchase/i18n";
import { Text } from "../text/text";

// the base styling for the container
const CONTAINER: ViewStyle = {
  backgroundColor: colors.palette.aliceBlue,
  height: 48,
  borderRadius: 8,
  borderWidth: 1,
};

// the base styling for the TextInput
const INPUT: TextStyle = {
  // fontFamily: typography.primary,
  color: colors.palette.nero,
  minHeight: 50,
  fontSize: 16,
  paddingTop: Platform.OS === "android" ? 16 : 16,
  paddingHorizontal: scaleWidth(16),
  // backgroundColor: color.palette.white,
  flex: 1,
};
const INPUT_CHANGE_PASS: TextStyle = {
  // fontFamily: typography.primary,
  color: colors.palette.nero,
  minHeight: 50,
  fontSize: 16,
  paddingTop: Platform.OS === "android" ? 8 : 12,
  // paddingHorizontal: scaleWidth(16),
  // backgroundColor: color.palette.white,
  flex: 1,
};
// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
};

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath;

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string;

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath;

  /**
   * The label text if no labelTx is provided.
   */
  label?: string;

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS;

  forwardedRef?: any;
  error?: any;
  isShowPassword?: boolean;
  onClearText?: () => void;
  onShowPassword?: () => void;
  children?: React.ReactNode;
  RightIconShow?: any;
  RightIconClear?: any;
  keyboardType?: any;
  isImportant?: boolean;
  isTL38?: boolean;
  onBlur: any;
  secureTextEntry?: boolean;
  isChangePass?: boolean;
}

/**
 * A component which has a label and an input together.
 */
export function TextFieldPass(props: TextFieldProps) {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    value,
    error,
    onClearText,
    onShowPassword,
    isShowPassword,
    RightIconShow,
    RightIconClear,
    onBlur,
    keyboardType,
    isImportant,
    isTL38,
    isChangePass,
    ...rest
  } = props;
  const [isFocused, setisFocused] = useState(false);
  const focus = useRef(null);

  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride];
  const style = isChangePass ? INPUT_CHANGE_PASS : INPUT;
  const inputStyles = [style, inputStyleOverride];
  const actualPlaceholder = placeholderTx
    ? translate(placeholderTx)
    : placeholder;

  const handleFocus = () => {
    setisFocused(true);
  };
  const handleBlur = () => {
    setisFocused(false);
    onBlur();
  };

  return (
    <View style={{ marginBottom: scaleHeight(5) }}>
      <View
        style={[
          containerStyles,
          {
            borderColor: isFocused
              ? colors.palette.aliceBlue
              : colors.palette.aliceBlue,
          },
        ]}>
        <Text
          preset="fieldLabel"
          tx={labelTx}
          style={{
            position: "absolute",
            left: isTL38 ? scaleWidth(50) : 0,
            top: !isFocused && value === "" ? 15 : 0,
            fontSize: !isFocused && value === "" ? 15 : 12,
            fontWeight: "500",
            color: !isFocused ? "#84888D" : colors.palette.dolphin,
            paddingHorizontal: scaleWidth(16),
            marginTop: isFocused && value === "" ? 3 : 3,
          }}
          //@ts-ignore
          text={
            <TextRN>
              {label}
              <TextRN style={{ color: "red" }}>
                {isImportant ? " *" : ""}
              </TextRN>
            </TextRN>
          }
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          {isTL38 ? (
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                color: value ? "#242426" : "#545456",
                marginLeft: scaleWidth(15),
                marginTop: scaleWidth(value ? 10 : 0),
              }}
              text="TL38"
            />
          ) : null}
          <TextInput
            {...props}
            placeholder={actualPlaceholder}
            // underlineColorAndroid={color.transparent}
            placeholderTextColor={colors.palette.dolphin}
            style={[inputStyles, { paddingBottom: 60, marginBottom: -50 }]}
            ref={forwardedRef ? forwardedRef : focus}
            onFocus={handleFocus}
            onBlur={handleBlur}
            blurOnSubmit
            keyboardType={keyboardType}
            // multiline={false}
          />
          <View
            style={{
              flexDirection: "row",
              paddingRight: scaleWidth(16),
              alignItems: "center",
            }}>
            {isShowPassword && value ? (
              <TouchableOpacity onPress={onShowPassword}>
                <RightIconShow />
              </TouchableOpacity>
            ) : null}
            <View style={{ width: scaleWidth(10) }} />
            {value ? (
              <TouchableOpacity
                onPress={() => {
                  onClearText();
                  focus.current.focus();
                }}>
                <RightIconClear width={16} height={16} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
      {error ? (
        <Text
          style={{
            marginTop: scaleHeight(-10),
            fontSize: fontSize.size14,
            color: colors.error,
          }}
          preset="fieldLabel"
          text={error}
        />
      ) : null}
    </View>
  );
}
