import React, { useCallback, useState } from "react";
import { Dimensions, View, Platform } from "react-native";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { Button, Text, TextField } from "../../../components";
import { Controller, useForm } from "react-hook-form";
import { TxKeyPath, translate } from "../../../i18n";
import { useStores } from "../../../models";
import { useFocusEffect } from "@react-navigation/native";
import { CustomModal } from "../../../components/custom-modal";
import { stylesModalInit } from "../styles";

interface UnitModalProps {
  isVisible: boolean;
  setIsVisible: () => void;
  title?: string;
  titleTx?: TxKeyPath | {};
  onSave: (value: any) => void;
  onSaveAndChange: (value: any) => void;
}

const UnitModal = (props: UnitModalProps) => {
  const { isVisible, setIsVisible, title, titleTx, onSave, onSaveAndChange } =
    props;
  const actualTitle = titleTx ? translate(titleTx) : title;

  const {
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const { unitStore } = useStores();
  const [textError, setTextError] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const createUnitName = async (onclickSave: boolean) => {
    setShowLoading(true);
    const name = getValues("unit");
    const unitResult = await unitStore.createUnitName(name);
    if (unitResult && unitResult.kind === "ok") {
      const data = unitResult.result.data;
      const dataModified = {
        id: data.id,
        label: data.name,
      };
      if (onclickSave) {
        console.log("--------onSave---111----", dataModified),
          onSave(dataModified);
      } else {
        console.log("--------onSaveAndChange---111----", dataModified),
          onSaveAndChange(dataModified);
      }
      setShowLoading(false);
    } else {
      setShowLoading(false);
      setTextError(unitResult.result.errorCodes[0].message);
      console.error("Failed to fetch list unit:", unitResult);
    }
  };

  const saveData = async () => {
    createUnitName(true);
    console.log("------saveData----");
  };

  const saveAndChange = async () => {
    createUnitName(false);
    console.log("------saveAndChange----");
  };

  useFocusEffect(
    useCallback(() => {
      reset();
      clearErrors();
    }, [isVisible])
  );

  const onError = (errors) => {
    if (errors.unit) {
      setTextError(errors.unit.message);
      console.log("------setTextError----");
    }
  };

  return (
    <CustomModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      isHideKeyBoards={isVisible}
      isVisibleLoading={showLoading}>
      <Text style={stylesModalInit.textInit} tx={actualTitle} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              keyboardType={"default"}
              placeholder={translate("productScreen.input_unit")}
              style={{
                width: "100%",
                marginBottom: scaleHeight(10),
              }}
              inputStyle={{
                marginBottom:
                  Platform.OS === "ios" ? scaleHeight(padding.padding_8) : 0,
              }}
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
                setTextError("");
              }}
              showRightIcon={false}
              multiline={true}
              error={textError}
            />
          )}
          defaultValue={""}
          name="unit"
          rules={{
            required: translate("messageError.required_value_null"),
          }}
        />
      </View>
      <View style={stylesModalInit.viewButton}>
        <Button
          onPress={handleSubmit(saveData, onError)}
          tx={"productScreen.save"}
          style={stylesModalInit.viewButtonSave}
          textStyle={stylesModalInit.textButtonSave}
        />
        <Button
          tx={"productScreen.saveAndChange"}
          style={stylesModalInit.buttonSaveChange}
          textStyle={stylesModalInit.textButtonSaveChange}
          onPress={handleSubmit(saveAndChange, onError)}
        />
      </View>
    </CustomModal>
  );
};

export default UnitModal;
