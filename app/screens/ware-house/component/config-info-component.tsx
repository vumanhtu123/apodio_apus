import React, { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { Text, TextField } from "../../../components";
import { scaleHeight } from "../../../theme";
import { stylesWareHouse } from "../style";
import { translate } from "../../../i18n";
import { Images } from "../../../../assets";
import { SelectUom } from "../modal/modal-select-uom";

export const ConfigInfoMoreComponent = (props: any) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const a = useRef(0);
  const [modalVisible, setModalVisible] = useState(false);

  const lengthUom = watch("lengthUom");
  const widthUom = watch("widthUom");

  const heightUom = watch("heightUom");
  const weightCapacityUom = watch("weightCapacityUom");
  console.log("rereder", a.current++);

  const [focusedField, setFocusedField] = useState("");

  const toggleModal = (name?: any) => {
    setFocusedField(name);
    setModalVisible(!modalVisible);
  };

  console.log("lengthUom", errors);

  const checkTicker = () => {
    switch (focusedField) {
      case "longs":
        return lengthUom.text;
      case "width":
        return widthUom.text;
      case "height":
        return heightUom.text;
      case "weight":
        return weightCapacityUom.text;
      default:
        return "";
    }
  };

  const handleItemSelect = (item: any) => {
    switch (focusedField) {
      case "longs":
        setValue("lengthUom", { value: item.value, text: item.text });
        console.log("selected length", lengthUom);
        toggleModal();
        break;
      case "width":
        setValue("widthUom", { value: item.value, text: item.text });
        toggleModal();
        break;
      case "height":
        setValue("heightUom", { value: item.value, text: item.text });
        toggleModal();
        break;
      case "weight":
        setValue("weightCapacityUom", { value: item.value, text: item.text });
        toggleModal();
        break;
      default:
        break;
    }
  };

  const errorMessageWeight = "Tuvm";

  return (
    <View>
      <Controller
        control={control}
        // Account test setup new pin
        // defaultValue={"system_admin"}
        // Account test
        rules={{
          required: "Vui lòng nhập thông tin",
          maxLength: 50,
          pattern: {
            value: /^\d+(\.\d+)?$/,
            message: "Nhập số hoặc số thập phân",
          },
        }}
        defaultValue={""}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            labelTx={"wareHouse.Longitude"}
            placeholder={translate("wareHouse.enterLongitude")}
            style={{ marginTop: scaleHeight(0) }}
            inputStyle={stylesWareHouse.inputPass}
            isImportant
            value={value}
            onBlur={onBlur}
            isShowPassword
            maxLength={20}
            keyboardType={"numeric"}
            RightIconClear={null}
            RightIconShow={() => {}}
            onClearText={() => {
              onChange("");
            }}
            error={errors.longitude?.message ?? ""}
            onChangeText={(value) => {
              onChange(value);
            }}
          />
        )}
        name="longitude"
      />
      <Controller
        control={control}
        // Account test setup new pin
        // defaultValue={"system_admin"}
        // Account test
        defaultValue={""}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            maxLength={20}
            keyboardType={"numeric"}
            labelTx={"wareHouse.Latitude"}
            placeholder={translate("wareHouse.enterLatitude")}
            style={{ marginTop: scaleHeight(15) }}
            inputStyle={stylesWareHouse.inputPass}
            isImportant
            value={value}
            onBlur={onBlur}
            isShowPassword
            RightIconClear={null}
            RightIconShow={() => {}}
            onClearText={() => {
              onChange("");
            }}
            error={errors.latitude?.message ?? ""}
            onChangeText={(value) => {
              onChange(value);
            }}
          />
        )}
        name="latitude"
        rules={{
          required: "Vui lòng nhập thông tin",
          maxLength: 50,
          pattern: {
            value: /^\d+(\.\d+)?$/,
            message: "Nhập số hoặc số thập phân",
          },
        }}
      />
      <Controller
        control={control}
        // Account test setup new pin
        // defaultValue={"system_admin"}
        // Account test
        defaultValue={""}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            maxLength={20}
            keyboardType={"numeric"}
            labelTx={"wareHouse.length"}
            placeholder={translate("wareHouse.enterLength")}
            style={{ marginTop: scaleHeight(15) }}
            inputStyle={stylesWareHouse.inputPass}
            isImportant
            value={value}
            onBlur={onBlur}
            isShowPassword
            RightIcon={Images.dropDown}
            styleTextRight={stylesWareHouse.textConfig}
            ValueTextRight={
              <Controller
                name="lengthUom"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Text
                    text={value.text}
                    style={stylesWareHouse.textConfig}></Text>
                )}
                rules={{
                  required: "Vui lòng chọn đơn vị tính",
                }}
                control={control}></Controller>
            }
            RightIconClear={null}
            RightIconShow={() => {}}
            onClearText={() => {
              onChange("");
            }}
            pressRightIcon={() => {
              toggleModal("longs");
            }}
            error={errors.longs?.message ?? ""}
            onChangeText={(value) => {
              onChange(value);
            }}
          />
        )}
        name="longs"
        rules={{
          required: "Vui lòng nhập thông tin",
          maxLength: 50,
          pattern: {
            value: /^-?\d+(\.\d+)?$/,
            message: "Nhập số hoặc số thập phân",
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
              labelTx={"wareHouse.width"}
              placeholder={translate("wareHouse.enterWidth")}
              style={{ marginBottom: scaleHeight(0) }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              // secureTextEntry={false}
              onBlur={onBlur}
              isShowPassword
              ValueTextRight={
                <Controller
                  name="widthUom"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Text
                      text={value.text}
                      style={stylesWareHouse.textConfig}></Text>
                  )}
                  rules={{
                    required: "Vui lòng chọn đơn vị tính",
                  }}
                  control={control}></Controller>
              }
              styleTextRight={stylesWareHouse.textConfig}
              RightIcon={Images.dropDown}
              pressRightIcon={() => {
                toggleModal("width");
              }}
              RightIconClear={null}
              RightIconShow={() => {}}
              onClearText={() => {
                onChange("");
              }}
              error={errors.width?.message ?? ""}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          name="width"
          rules={{
            required: "Vui lòng nhập thông tin",
            maxLength: 50,
            pattern: {
              value: /^-?\d+(\.\d+)?$/,
              message: "Nhập số hoặc số thập phân",
            },
          }}
        />
      </View>
      <View style={{ marginBottom: scaleHeight(15) }}>
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
              labelTx={"wareHouse.height"}
              placeholder={translate("wareHouse.enterHeight")}
              style={{ marginBottom: scaleHeight(0) }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              // secureTextEntry={false}
              onBlur={onBlur}
              isShowPassword
              ValueTextRight={
                <Controller
                  name="heightUom"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Text
                      text={value.text}
                      style={stylesWareHouse.textConfig}></Text>
                  )}
                  rules={{
                    required: "Vui lòng chọn đơn vị tính",
                  }}
                  control={control}></Controller>
              }
              RightIconClear={null}
              styleTextRight={stylesWareHouse.textConfig}
              RightIconShow={() => {}}
              pressRightIcon={() => {
                toggleModal("height");
              }}
              RightIcon={Images.dropDown}
              onClearText={() => {
                onChange("");
              }}
              error={errors.height?.message ?? ""}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          name="height"
          rules={{
            required: "Vui lòng nhập thông tin",
            maxLength: 50,
            pattern: {
              value: /^\d+(\.\d+)?$/,
              message: "Nhập số hoặc số thập phân",
            },
            validate: heightUom.text == "" ? "" : "",
          }}
        />
      </View>
      <View style={{ marginBottom: scaleHeight(30) }}>
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
              labelTx={"wareHouse.foundationLoad"}
              placeholder={translate("wareHouse.enterFoundationLoad")}
              style={{ marginBottom: scaleHeight(0) }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              // secureTextEntry={false}
              onBlur={onBlur}
              isShowPassword
              ValueTextRight={
                <Controller
                  name="weightCapacityUom"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Text
                      text={value.text}
                      style={stylesWareHouse.textConfig}></Text>
                  )}
                  rules={{
                    required: "Vui lòng chọn đơn vị tính",
                    pattern: {
                      value: /^\d+(\.\d+)?$/,
                      message: "Nhập số hoặc số thập phân",
                    },
                  }}
                  control={control}></Controller>
              }
              RightIconClear={null}
              RightIconShow={() => {}}
              pressRightIcon={() => {
                toggleModal("weight");
              }}
              styleTextRight={stylesWareHouse.textConfig}
              RightIcon={Images.dropDown}
              onClearText={() => {
                onChange("");
              }}
              error={errors.weight?.message}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          name="weight"
          rules={{
            required: "Vui lòng nhập thông tin",
            maxLength: 50,
            pattern: {
              value: /^\d+(\.\d+)?$/,
              message: "Nhập số hoặc số thập phân",
            },
          }}
        />
      </View>
      <SelectUom
        isSearch
        required={true}
        arrData={props.list}
        dataDefault={checkTicker()}
        showModal={modalVisible}
        setShowModal={toggleModal}
        onPressChoice={(item: any) => {
          handleItemSelect(item);
        }}
      />
    </View>
  );
};
