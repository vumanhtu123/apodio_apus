import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Platform,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { stylesDescribe, stylesItem } from "../styles";
import { Images } from "../../../../../assets/index";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import Modal from "react-native-modal";
import { Button, Text, TextField } from "../../../../components";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { TxKeyPath, translate } from "../../../i18n";

const { width, height } = Dimensions.get("screen");

interface DescribeModalProps {
  isVisible: boolean;
  setIsVisible: () => void;
  title?: string;
  titleTx?: TxKeyPath;
  onCancel: () => void;
  onConfirm: (value: any) => void;
  dataDescribe: string;
}

const DescribeModal = (props: DescribeModalProps) => {
  const {
    isVisible,
    setIsVisible,
    title,
    titleTx,
    onCancel,
    onConfirm,
    dataDescribe,
  } = props;

  const actualTitle = titleTx ? translate(titleTx) : title;

  const { control, reset, handleSubmit, watch } = useForm();

  const onSubmit = (data: any) => {
    onConfirm(data);
    console.log(data);
    // reset();
  };

  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      isVisible={isVisible}
      style={{ margin: 0 }}
      // onBackdropPress={setIsVisible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={stylesDescribe.keyboardView}>
        <View style={stylesDescribe.viewTittle}>
          <Text style={stylesDescribe.textTittle} text={actualTitle} />
          <View style={stylesDescribe.viewTextField}>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextField
                  keyboardType={"default"}
                  placeholder={translate("productScreen.enterDescription")}
                  style={stylesDescribe.styleTextField}
                  inputStyle={{
                    marginBottom:
                      Platform.OS === "ios"
                        ? scaleHeight(padding.padding_8)
                        : 0,
                  }}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  // onClearText={() => onChange('')}
                  // RightIconClear={Images.icon_delete2}
                  showRightIcon={false}
                  multiline={true}
                  isMultiline={true}
                  // error={errors?.phone?.message}
                />
              )}
              defaultValue={dataDescribe}
              name="Describe"
            />
          </View>
          <View style={stylesDescribe.viewButton}>
            <Button
              onPress={() => onCancel()}
              tx={"common.cancel"}
              style={stylesDescribe.styleButtonCancel}
              textStyle={stylesDescribe.textButtonCancel}
            />
            <Button
              tx={"common.confirm"}
              style={stylesDescribe.buttonConfirm}
              textStyle={stylesDescribe.textButtonConfirm}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default DescribeModal;
