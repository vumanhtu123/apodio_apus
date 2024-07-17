import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../../navigators";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextField } from "../../../components";
import { stylesWareHouse } from "../style";
import { scaleHeight, scaleWidth } from "../../../theme";
import { Images } from "../../../../assets";
import { ConditionsComponent } from "../component/conditions-component";
import { ConfigInfoMoreComponent } from "../component/config-info-component";

export const CreateWareHouseScreen: FC<
  StackScreenProps<NavigatorParamList, "warehouse">
> = observer(function CreateWareHouseScreen(props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const [conditions, setConditions] = useState(false);
  const [config, setConfig] = useState(false);
  const onSubmit = (data: any) => console.log("tuvm test data", data);

  const onHandleData = () => {};

  return (
    <View style={stylesWareHouse.containerView}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Controller
          control={control}
          // Account test setup new pin
          // defaultValue={"system@123456"}
          // Account test
          defaultValue={""}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              keyboardType={null}
              labelTx={"wareHouse.codeWareHouse"}
              style={{
                marginBottom: scaleHeight(0),
                backgroundColor: "#F6F7F9",
                borderRadius: 8,
              }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              placeholderTx={"wareHouse.enterCodeWareHouse"}
              // secureTextEntry={false}
              secureTextEntry={false}
              onBlur={onBlur}
              isShowPassword
              RightIconClear={null}
              RightIconShow={() => {}}
              onClearText={() => {}}
              maxLength={50}
              onShowPassword={() => {}}
              error={errors.codeWareHouse?.message ?? ""}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          name="codeWareHouse"
          rules={{
            required: "",
            maxLength: 50,
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "Only letters, numbers, and underscores are allowed",
            },
          }}
        />

        <Controller
          control={control}
          // Account test setup new pin
          // defaultValue={"system@123456"}
          // Account test
          // defaultValue={""}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              keyboardType={null}
              labelTx={"wareHouse.nameWareHouse"}
              style={{
                backgroundColor: "#F6F7F9",
                borderRadius: 8,
                marginVertical: 15,
              }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              placeholderTx={"wareHouse.enterWareHouse"}
              // secureTextEntry={false}
              isImportant
              secureTextEntry={false}
              onBlur={onBlur}
              isShowPassword
              RightIconClear={null}
              RightIconShow={() => {}}
              onClearText={() => {}}
              maxLength={250}
              onShowPassword={() => {}}
              error={errors.nameWareHouse?.message ?? ""}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          name="nameWareHouse"
          rules={{
            required: "Please input data",
            maxLength: 250,
          }}
        />
        <Controller
          control={control}
          // Account test setup new pin
          // defaultValue={"system@123456"}
          // Account test
          // defaultValue={""}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              maxLength={250}
              keyboardType={null}
              labelTx={"wareHouse.address"}
              style={{
                marginBottom: scaleHeight(0),
                backgroundColor: "#F6F7F9",
                borderRadius: 8,
              }}
              error={errors.addressWareHouse?.message ?? ""}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              placeholderTx={"wareHouse.enterAddress"}
              // secureTextEntry={false}
              isImportant
              secureTextEntry={false}
              onBlur={onBlur}
              isShowPassword
              RightIconClear={null}
              RightIconShow={() => {}}
              onClearText={() => {}}
              onShowPassword={() => {}}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          name="addressWareHouse"
          rules={{
            required: "Please input data",
            maxLength: 250,
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignContent: "center",
            marginVertical: scaleHeight(15),
          }}
          onPress={() => {
            setConditions(!conditions);
          }}>
          {conditions ? (
            <Images.ic_checkbox marginRight={5} />
          ) : (
            <View style={stylesWareHouse.selected}></View>
          )}
          <Text tx="wareHouse.storageConditions"></Text>
        </TouchableOpacity>
        {conditions ? (
          <ConditionsComponent control={control} errors={errors} />
        ) : null}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignContent: "center",
            marginVertical: scaleHeight(15),
          }}
          onPress={() => {
            setConfig(!config);
          }}>
          {config ? (
            <Images.ic_checkbox marginRight={5} />
          ) : (
            <View style={stylesWareHouse.selected}></View>
          )}
          <Text tx="wareHouse.configInfoMore"></Text>
        </TouchableOpacity>
        {config ? (
          <ConfigInfoMoreComponent control={control} errors={errors} />
        ) : null}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 15,
              }}>
              <Text tx="wareHouse.defaultWareHouse"></Text>
              <Switch
                thumbColor="#0178D4"
                trackColor={{ false: "#C8C8C8", true: "#C8C8C8" }}
                onValueChange={onChange}
                value={value}
              />
            </View>
          )}
          name="notifications"
        />
      </ScrollView>
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "#0078D4",
          alignItems: "center",
          borderRadius: 10,
        }}>
        <Text
          tx="wareHouse.createWareHouse"
          style={{
            fontSize: 14,
            color: "#FFFFFF",
            fontWeight: "600",
            paddingVertical: scaleHeight(12),
          }}
        />
      </TouchableOpacity>
    </View>
  );
});
