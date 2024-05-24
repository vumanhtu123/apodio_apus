/* eslint-disable react-native/no-inline-styles */

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
} from "../../theme";
import { translate, TxKeyPath } from "../../i18n";
import { Text } from "../text/text";
import { SvgIcon } from "../svg-icon";
import { Images } from "../../../assets";

// the base styling for the container
// const CONTAINER: ViewStyle = {
//   backgroundColor: colors.palette.aliceBlue,
//   borderRadius: 8,
//   height: 56,
//   // borderWidth: 1,
//   // borderColor : 'red'

// }

// // the base styling for the TextInput
// const INPUT: TextStyle = {
//   // fontFamily: typography.primary,
//   // color: colors.palette.neutral900,
//   // minHeight: 50,
//   fontSize: 16,
//   paddingTop: Platform.OS === "android" ? 6 : 8,
//   paddingHorizontal: scaleWidth(16),
//   flex: 1,
// }
const CONTAINER: ViewStyle = {
  backgroundColor: colors.palette.aliceBlue,
  borderRadius: 8,
  height: scaleHeight(56),
  // alignItems:'center',
  // justifyContent : 'center'
  // borderWidth: 1,
  // borderColor : 'red'
};
// the base styling for the TextInput
const INPUT: TextStyle = {
  // fontFamily: typography.primary,
  // color: colors.palette.neutral900,
  // minHeight: 50,
  fontSize: 16,
  paddingTop: Platform.OS === "android" ? 8 : 8,
  paddingLeft: scaleWidth(16),
  flex: 1,
};
const LABEL: TextStyle = {};
// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
};

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath | {};

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string;

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath | {};

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
  labelDolphin?: boolean;
  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS;

  oldValue?: string;

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
  txColor?: string;
  onBlur?: any;
  editable?: boolean;
  RightIcon?: any;
  showRightIcon?: boolean;
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
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
    oldValue,
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
    txColor,
    editable,
    RightIcon,
    showRightIcon = true,
    labelDolphin,
    ...rest
  } = props;
  const [isFocused, setisFocused] = useState(false);
  const focus = useRef(null);

  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride];
  const inputStyles = [INPUT, inputStyleOverride];
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


  // console.log("error------------------------", error);
  // const actualPlaceholder = (placeholderTx || placeholder) ? (placeholderTx ? translate(placeholderTx) : placeholder) : '';
  return (
    <View style={{ marginBottom: scaleHeight(10) }}>
      <View
        style={[
          containerStyles,
          { borderColor: colors.palette.aliceBlue },

          //  { borderColor: isFocused ? color.yellow : color.gray }
        ]}>
        {/* <Text preset="fieldLabel" tx={labelTx} text={label} />
      <TextInput
        placeholder={actualPlaceholder}
        placeholderTextColor={color.palette.lighterGrey}
        underlineColorAndroid={color.transparent}
        {...rest}
        style={inputStyles}
        ref={forwardedRef}
      /> */}
        <View style={{ flexDirection: "row" }}>
          {labelTx ? (
            <Text
              preset="fieldLabel"
              tx={labelTx}
              style={{
                // position: "absolute",
                left: isTL38
                  ? scaleWidth(Platform.OS === "android" ? 50 : 55)
                  : 0,
                top:
                  !isFocused && !actualPlaceholder && value === ""
                    ? scaleHeight(19)
                    : scaleHeight(8),
                fontSize:
                  !isFocused && !actualPlaceholder && value === ""
                    ? fontSize.size16
                    : fontSize.size12,
                fontWeight: "500",
                color: labelDolphin
                  ? colors.palette.dolphin
                  : !isFocused
                  ? txColor
                  : colors.palette.dolphin,
                paddingLeft: scaleWidth(16),
                marginTop:
                  isFocused && !actualPlaceholder && value === ""
                    ? scaleHeight(0)
                    : scaleHeight(0),
              }}
            />
          ) : null}
          {isImportant ? (
            <Text
              style={{
                // position: "absolute",
                left: isTL38
                  ? scaleWidth(Platform.OS === "android" ? 50 : 55)
                  : 0,
                top:
                  !isFocused && !actualPlaceholder && value === ""
                    ? scaleHeight(19)
                    : scaleHeight(8),
                fontSize:
                  !isFocused && !actualPlaceholder && value === ""
                    ? fontSize.size16
                    : fontSize.size12,
                fontWeight: "500",
                color: "red",
                marginTop:
                  isFocused && !actualPlaceholder && value === ""
                    ? scaleHeight(0)
                    : scaleHeight(0),
              }}>
              {" "}
              *
            </Text>
          ) : null}
        </View>

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
                fontSize: fontSize.size16,
                color: value ? "#242426" : "#545456",
                marginLeft: scaleWidth(15),
                marginTop: scaleWidth(isFocused ? 10 : 0),
              }}
              text="TL38"
            />
          ) : null}
          <TextInput
            {...props}
            editable={editable}
            placeholder={actualPlaceholder}
            // underlineColorAndroid={colors.palette.neutral900}
            placeholderTextColor={colors.palette.dolphin}
            style={[
              inputStyles,
              { paddingRight: showRightIcon === true ? scaleWidth(16) : 0 },
            ]}
            ref={forwardedRef ? forwardedRef : focus}
            onFocus={handleFocus}
            onBlur={handleBlur}
            blurOnSubmit
            keyboardType={keyboardType}
          />
          <View style={{ flexDirection: "row", paddingRight: scaleWidth(16) }}>
            {isShowPassword && value ? (
              <TouchableOpacity
                style={{ marginTop: scaleHeight(4) }}
                onPress={onShowPassword}>
                <RightIconShow />
              </TouchableOpacity>
            ) : null}
            <View style={{ width: scaleWidth(10) }} />
            {value && showRightIcon ? (
              <TouchableOpacity
                onPress={() => {
                  onClearText();
                  focus.current.focus();
                }}>
                <RightIconClear />
              </TouchableOpacity>
            ) : RightIcon ? (
              <TouchableOpacity onPress={() => {}} style={{}}>
                <RightIcon width={scaleWidth(18)} height={scaleHeight(18)} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
      {error ? (
        <Text
          style={{
            marginTop: Platform.OS === "android" ? scaleHeight(-5): scaleHeight(0),
            fontSize: fontSize.size12,
            color: colors.error,
          }}
          preset="fieldLabel"
          text={error}
        />
      ) : null}
    </View>
  );
}