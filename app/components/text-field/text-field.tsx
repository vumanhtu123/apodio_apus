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
  ScrollView,
} from "react-native";
import {
  colors,
  fontSize,
  margin,
  scaleHeight,
  scaleWidth,
  spacing,
} from "../../theme";
import { translate, TxKeyPath } from "../../i18n";
import { SvgIcon } from "../svg-icon";
import { Images } from "../../../assets";
import { Text } from "../text/text";

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
  fontSize: fontSize.size16,
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
  styleError?: StyleProp<ViewStyle>;
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
  pressRightIcon?: () => void;
  showRightIcon?: boolean;
  styleTextError?: StyleProp<TextStyle>;
  styleTextRight?: StyleProp<TextStyle>;
  styleTextLabel?: boolean;
  valueTextRight?: string;
  isMultiline?: boolean;
  value?: any;
  valueInput?: any;
  valueCurrency?: any;
  iconRight?: any;
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
    pressRightIcon,
    showRightIcon = true,
    labelDolphin,
    styleError,
    styleTextError,
    isMultiline,
    valueInput,
    valueCurrency,
    valueTextRight,
    styleTextRight,
    styleTextLabel,
    iconRight,
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
    <View style={{}}>
      <View
        style={[
          containerStyles,
          {
            borderColor: colors.palette.aliceBlue,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: isMultiline === true ? "flex-start" : "center",
          },
          {
            borderColor: colors.palette.aliceBlue,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: isMultiline === true ? "flex-start" : "center",
          },

          //  { borderColor: isFocused ? color.yellow : color.gray }
        ]}>
        <View
          style={{
            flex: 1,
            paddingTop:
              Platform.OS === "android" ? scaleHeight(8) : scaleHeight(0),
          }}>
          <View style={{ flexDirection: "row" }}>
            {iconRight ? iconRight : null}
            {labelTx ? (
              <Text
                preset="fieldLabel"
                tx={labelTx}
                style={
                  styleTextLabel == false
                    ? {
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
                    }
                    : {
                      left: isTL38
                        ? scaleWidth(Platform.OS === "android" ? 50 : 55)
                        : 0,
                      top:
                        !isFocused && !actualPlaceholder && value === ""
                          ? scaleHeight(19)
                          : scaleHeight(8),
                      fontSize:
                        !isFocused && !actualPlaceholder && value === ""
                          ? fontSize.size13
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
                    }
                }
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

              marginTop: (Platform.OS === 'ios' ? margin.margin_10 : null),
              flexDirection: "row",
            }}>
            <TextInput
              {...props}
              editable={editable}
              placeholder={actualPlaceholder}
              // underlineColorAndroid={colors.palette.neutral900}
              placeholderTextColor={colors.palette.dolphin}
              value={valueInput ? valueInput : value}
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
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingRight: scaleWidth(16) }}>
          {valueCurrency ? (
            <Text
              style={{
                fontSize: fontSize.size16,
                marginTop: Platform.OS === "android" ? 8 : 8,
              }}>
              {valueCurrency}
            </Text>
          ) : null}
          {isShowPassword && value ? (
            <TouchableOpacity
              style={{ marginTop: scaleHeight(4) }}
              onPress={onShowPassword}>
              {RightIconShow !== null ? <RightIconShow /> : null}
            </TouchableOpacity>
          ) : null}
          <View style={{ width: scaleWidth(10) }} />

          {value && showRightIcon ? (
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                onClearText();
                focus.current.focus();
              }}>
              {RightIconClear !== null ? <RightIconClear /> : null}
            </TouchableOpacity>
          ) : RightIcon ? (
            <TouchableOpacity onPress={pressRightIcon} style={{}}>
              <RightIcon width={scaleWidth(18)} height={scaleHeight(18)} />
            </TouchableOpacity>
          ) : null}
          {valueTextRight !== "" ? (
            <Text style={styleTextRight}>{valueTextRight}</Text>
          ) : null}
        </View>
      </View>
      {error ? (
        <View style={styleError}>
          <Text
            style={[
              {
                marginTop:
                  Platform.OS === "android" ? scaleHeight(2) : scaleHeight(-5),
                fontSize: fontSize.size12,
                color: colors.error,
              },
              styleTextError,
            ]}
            preset="fieldLabel"
            text={error}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}></View>
      )}
    </View>
  );
}
