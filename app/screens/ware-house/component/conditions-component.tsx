import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Button, TouchableOpacity, View } from "react-native";
import { TextField } from "../../../components";
import { scaleHeight } from "../../../theme";
import { stylesWareHouse } from "../style";
import { translate } from "../../../i18n";
export const ConditionsComponent = ({
  control,
  errors,
  conditions,
  setValue,
  clearError,
}: any) => {
  console.log("check tuvm", conditions);
  useEffect(() => {
    setValue("temperature1", "");
    clearError("temperature1");
    setValue("temperature2", "");
    clearError("temperature2");
    setValue("temperature3", "");
    clearError("temperature3");
  }, [conditions]);
  return conditions ? (
    <View>
      <Controller
        control={control}
        // Account test setup new pin
        // defaultValue={"system_admin"}
        // Account test
        defaultValue={""}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            keyboardType={"numeric"}
            labelTx={"wareHouse.standardStorageTemperature"}
            placeholder={translate("wareHouse.enterTemperature")}
            style={{ marginBottom: scaleHeight(0) }}
            inputStyle={stylesWareHouse.inputPass}
            valueTextRight="°C"
            isImportant
            maxLength={20}
            RightIconClear={null}
            RightIconShow={() => {}}
            value={value}
            onBlur={onBlur}
            error={errors.temperature1?.message ?? ""}
            onChangeText={(value) => {
              onChange(value);
            }}
          />
        )}
        name="temperature1"
        rules={{
          required: "Vui lòng nhập thông tin",
          maxLength: 20,
        }}
      />

      <View
        style={{
          marginVertical: scaleHeight(15),
        }}>
        <Controller
          control={control}
          // Account test setup new pin
          // defaultValue={"system_admin"}
          // Account test
          defaultValue={""}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              isImportant
              maxLength={20}
              keyboardType={"numeric"}
              labelTx={"wareHouse.minimumStorageTemperature"}
              placeholder={translate("wareHouse.enterTemperature")}
              style={{ marginBottom: scaleHeight(0) }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              valueTextRight="°C"
              // secureTextEntry={false}
              onBlur={onBlur}
              RightIconClear={null}
              RightIconShow={() => {}}
              error={errors.temperature2?.message ?? ""}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          name="temperature2"
          rules={{
            required: "Vui lòng nhập thông tin",
            maxLength: 20,
          }}
        />
      </View>
      <View style={{ marginBottom: scaleHeight(0) }}>
        <Controller
          control={control}
          // Account test setup new pin
          // defaultValue={"system_admin"}
          // Account test
          defaultValue={""}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              maxLength={20}
              isImportant
              keyboardType={"numeric"}
              labelTx={"wareHouse.standardHumidity"}
              placeholder={translate("wareHouse.enterHumidity")}
              style={{ marginBottom: scaleHeight(0) }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              valueTextRight="%"
              // secureTextEntry={false}
              onBlur={onBlur}
              RightIconClear={null}
              RightIconShow={() => {}}
              error={errors.temperature3?.message ?? ""}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          name="temperature3"
          rules={{
            required: "Vui lòng nhập thông tin",
            maxLength: 20,
          }}
        />
      </View>
    </View>
  ) : null;
};
