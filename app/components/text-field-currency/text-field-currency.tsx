import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  colors,
  fontSize,
  scaleHeight,
  scaleWidth,
} from "../theme";
import { translate, TxKeyPath } from "../../i18n";
import { Text } from "../text/text";
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
    console.log('-------handleFocus--------')
    setisFocused(true);
    forwardedRef.current?.focus();
  };

  const handleBlur = () => {
    console.log('-------handleBlur--------')
    setisFocused(false);
    onBlur();
  };

  useEffect(() => {
    if (isFocused) {
      forwardedRef.current?.focus();
    }
  }, [isFocused]);

  const handleInputPress = () => {
    console.log('-------handleInputPress--------')
    setisFocused(true);
  };


  const formatCurrency = useMemo(
    () => (value: string | null) => {
      if (!value) return '';
      value = value.replace(/[^0-9,]/g, '');

      let [integerPart, decimalPart] = value.split(',');

      if (decimalPart) {
        decimalPart = decimalPart.substring(0, 2);
      }

      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      const textValue =
        decimalPart !== undefined
          ? `${integerPart},${decimalPart}`
          : `${integerPart}`;

      onChangeValue(textValue);
      return textValue;
    },
    [onChangeValue],
  );

  const handleTextChange = (value: string) => {
    const numericValue = value.replace(/[^0-9,]/g, '');
    setRawValue(numericValue);
  };

  const handleKeyPress = (key) => {
    console.log('-----', key)
    if (key === 'Del') {
      setRawValue((prev) => prev.slice(0, -1));
    } else if (key === 'Enter') {
      setisFocused(false);
    } else {
       // Loại bỏ dấu phẩy nếu nó là ký tự đầu tiên
      if (key == ',' && rawValue.length == 0) {
      }else {
        // Kiểm tra số ký tự sau dấu phẩy
        const [integerPart, decimalPart] = rawValue.split(',');
        console.log('decimalPart---', decimalPart)
        if (decimalPart == undefined || decimalPart.length < 2) {
        setRawValue((prev) => prev + key);
      }
    }
  }
  };

  return (
    <View style={{}}>
      <View
        style={[
          containerStyles,
          { borderColor: isFocused ? colors.palette.navyBlue: colors.palette.aliceBlue ,borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: isMultiline === true ? 'flex-start' : 'center' }
        ]}
      >
        <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? scaleHeight(8) : scaleHeight(0) }}>
          <View style={{ flexDirection: "row" }}>
            {labelTx ? (
              <Text
                preset="fieldLabel"
                tx={labelTx}
                style={{
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
                      ? scaleHeight(10)
                      : scaleHeight(10),
                }}
              />
            ) : null}
            {isImportant ? (
              <Text
                style={{
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
                }}
              >
                {" "}
                *
              </Text>
            ) : null}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Pressable onPress={handleInputPress} style={styles.inputContainer}>
              <TextInput
                {...props}
                editable={false}
                placeholder={actualPlaceholder}
                placeholderTextColor={colors.palette.dolphin}
                value={formatCurrency(rawValue)}
                onChangeText={handleTextChange}
                style={[
                  inputStyles,
                  { paddingRight: showRightIcon === true ? scaleWidth(16) : 0, backgroundColor: 'transparent', color: 'black', },
                ]}
                ref={forwardedRef ? forwardedRef : focus}
                onFocus={handleFocus}
                onBlur={handleBlur}
                blurOnSubmit
                keyboardType="decimal-pad"
              />
              <CustomKeyboard 
                isVisible={isFocused}
                setIsVisible={handleBlur}
                onKeyPress={handleKeyPress} 
              />
              
            </Pressable>
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingRight: scaleWidth(16) }}>
          {isShowPassword && value ? (
            <TouchableOpacity
              style={{ marginTop: scaleHeight(4) }}
              onPress={onShowPassword}
            >
              <RightIconShow />
            </TouchableOpacity>
          ) : null}
          <View style={{ width: scaleWidth(10) }} />
          {value && showRightIcon ? (
            <TouchableOpacity
              onPress={() => {
                forwardedRef.current.focus();
              }}
            >
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
    backgroundColor:'red',
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
    backgroundColor: colors.white,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.veryLightGrey2,
  },
}); 