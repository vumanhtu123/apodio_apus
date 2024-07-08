import React, { useEffect, useRef, useState } from "react";
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
  TouchableWithoutFeedback,
  Pressable,
  StyleSheet,
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
import CurrencyInput from 'react-native-currency-input';
import CustomKeyboard from "./custom-keyboard";


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
  styleError?: StyleProp<ViewStyle>
  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS;

  oldValue?: string;

  forwardedRef?: any;
  error?: any;
  isShowPassword?: boolean;
  onChangeValue: (value: any) => void;
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
  styleTextError?: StyleProp<TextStyle>
  isMultiline?: boolean;
  value?: any;
}

/**
 * A component which has a label and an input together.
 */
export function TextFieldCurrency(props: TextFieldProps) {
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
    onChangeValue,
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
    ...rest
  } = props;
  const [isFocused, setisFocused] = useState(false);
  const focus = useRef(null);
  const [rawValue, setRawValue] = useState('');

  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride];
  const inputStyles = [INPUT, inputStyleOverride];
  const actualPlaceholder = placeholderTx
    ? translate(placeholderTx)
    : placeholder;

  const handleFocus = () => {
    setisFocused(true);
    forwardedRef.current?.blur();
  };
  const handleBlur = () => {
    setisFocused(false);
    onBlur();
  };

  useEffect(() => {
    if (isFocused) {
      // Do something when the keyboard is visible
      forwardedRef.current?.focus();
    forwardedRef.current?.blur();
    }
  }, [isFocused]);
  
  const handleInputPress = () => {
    console.log('forwardedRef.current?.focus()')
    forwardedRef.current?.focus();
    forwardedRef.current?.blur();
    setisFocused(true);
  };

  console.log('-----isFocused--------', isFocused);
  // Hàm định dạng tiền tệ
  function formatCurrency(value: string | null, options = {}) {
    if (value == null || value === '') {
      return '';
    }

    const { separator = '.', prefix = '', suffix = '' } = options;

    // Loại bỏ ký tự không phải số và không phải dấu phẩy
    value = value.toString().replace(/[^0-9,]/g, '');

    // Thay dấu phẩy bằng dấu chấm để định dạng
    let [integerPart, decimalPart] = value.split(',');

    // Giới hạn số ký tự sau dấu phẩy
    if (decimalPart) {
      decimalPart = decimalPart.substring(0, 2);
    }

    // Thêm dấu phân cách hàng ngàn cho phần nguyên
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    const textValue = decimalPart !== undefined ? `${prefix}${integerPart},${decimalPart}${suffix}` : `${prefix}${integerPart}${suffix}`;
    onChangeValue(textValue);
    // Ghép phần nguyên và phần thập phân (nếu có)
    return textValue;

  }

  const handleTextChange = (value: string) => {
    // Chỉ giữ lại các ký tự số và dấu phẩy
    const numericValue = value.replace(/[^0-9,]/g, '');
    setRawValue(numericValue);
  };

  const handleKeyPress = (key) => {
    console.log('-----key-----', key)
    if (key === 'Del') {
      setRawValue((prev) => prev.slice(0, -1));
    } else if (key === '✓') {
      setisFocused(false)
    } else {
      setRawValue((prev) => prev + key);
    }
  };

  

  return (
    <View style={{}}>
      <View
        style={[
          containerStyles,
          { borderColor: colors.palette.aliceBlue, flexDirection: 'row', justifyContent: 'space-between', alignItems: isMultiline === true ? 'flex-start' : 'center' },

          //  { borderColor: isFocused ? color.yellow : color.gray }
        ]}>
        <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? scaleHeight(8) : scaleHeight(0) }}>
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

            }}>

        <Pressable onPress={handleInputPress} style={styles.inputContainer}>
          <View pointerEvents="none" >
            <TextInput
              {...props}
              editable={false}
              placeholder={actualPlaceholder}
              // underlineColorAndroid={colors.palette.neutral900}
              placeholderTextColor={colors.palette.dolphin}
              value={formatCurrency(rawValue)}
              //value={formatCurrency(rawValue, { suffix: ' VND' })}
              onChangeText={handleTextChange}
              style={[
                inputStyles,
                { paddingRight: showRightIcon === true ? scaleWidth(16) : 0,  
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0, },
              ]}
              ref={forwardedRef ? forwardedRef : focus}
              onFocus={handleFocus}
              onBlur={handleBlur}
              blurOnSubmit
              keyboardType={keyboardType}
            />
            <CustomKeyboard 
              isVisible={isFocused}
              setIsVisible={handleBlur}
              onKeyPress={handleKeyPress} />
            </View>
            </Pressable>
          </View>
        </View>
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
                forwardedRef.current.focus();
              }}>
              <RightIconClear />
            </TouchableOpacity>
          ) : RightIcon ? (
            <TouchableOpacity onPress={pressRightIcon} style={{}}>
              <RightIcon width={scaleWidth(18)} height={scaleHeight(18)} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {error ? (
        <View style={styleError}>
          <Text
            style={[{
              marginTop: Platform.OS === "android" ? scaleHeight(2) : scaleHeight(-5),
              fontSize: fontSize.size12,
              color: colors.error,
            }, styleTextError]}
            preset="fieldLabel"
            text={error}
          />
        </View>
      ) : <View style={{ flex: 1 }}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  inputContainer: {
    width: '100%',
    height: scaleHeight(50),
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
