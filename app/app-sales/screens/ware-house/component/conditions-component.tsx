import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button, TouchableOpacity, View } from "react-native";
import { TextField, Text } from "../../../../components";
import { scaleHeight } from "../../../theme";
import { stylesWareHouse } from "../style";
import { translate } from "../../../../i18n";
export const ConditionsComponent = (props: any) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  return (
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
            ValueTextRight={<Text text="°C"></Text>}
            isImportant
            maxLength={20}
            RightIconClear={null}
            RightIconShow={() => {}}
            value={value}
            onBlur={onBlur}
            error={errors.temperature1?.message ?? ""}
            onChangeText={(value) => {
              onChange(value.trim());
            }}
          />
        )}
        name="temperature1"
        rules={{
          required: translate("wareHouse.pleaseEnterInformation"),
          maxLength: 20,
          pattern: {
            value: /^-?\d+(\.\d+)?$/,
            message: "Nhiệt độ phải là số hoặc số thập phân",
          },
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
              ValueTextRight={<Text text="°C"></Text>}
              onBlur={onBlur}
              RightIconClear={null}
              RightIconShow={() => {}}
              error={errors.temperature2?.message ?? ""}
              onChangeText={(value) => {
                onChange(value.trim());
              }}
            />
          )}
          name="temperature2"
          rules={{
            required: translate("wareHouse.pleaseEnterInformation"),
            maxLength: 20,
            pattern: {
              value: /^-?\d+(\.\d+)?$/,
              message: "Nhiệt độ phải là số hoặc số thập phân",
            },
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
              ValueTextRight={<Text text="%"></Text>}
              // secureTextEntry={false}
              onBlur={onBlur}
              RightIconClear={null}
              RightIconShow={() => {}}
              error={errors.temperature3?.message ?? ""}
              onChangeText={(value) => {
                onChange(value.trim());
              }}
            />
          )}
          name="temperature3"
          rules={{
            required: translate("wareHouse.pleaseEnterInformation"),
            maxLength: 20,
            pattern: {
              value: /^-?\d+(\.\d+)?$/,
              message: "Nhiệt độ phải là số hoặc số thập phân",
            },
          }}
        />
      </View>
    </View>
  );
};
