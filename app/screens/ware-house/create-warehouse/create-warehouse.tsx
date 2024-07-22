import { StackScreenProps } from "@react-navigation/stack";
import { navigate, NavigatorParamList } from "../../../navigators";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef, useState } from "react";
import { ScrollView, Switch, TouchableOpacity, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Header, Text, TextField } from "../../../components";
import { Styles, stylesWareHouse } from "../style";
import { scaleHeight, scaleWidth } from "../../../theme";
import { Images } from "../../../../assets";
import { ConditionsComponent } from "../component/conditions-component";
import { ConfigInfoMoreComponent } from "../component/config-info-component";
import { useStores } from "../../../models";
import { ALERT_TYPE, Dialog } from "../../../components/dialog-notification";
import { translate } from "../../../i18n";

export const CreateWareHouseScreen: FC<
  StackScreenProps<NavigatorParamList, "warehouse">
> = observer(function CreateWareHouseScreen(props: any) {
  const api = useStores();
  console.log("props adc", props.route.params);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    mode: "all",
  });
  // const [status, setCheckStatus] = useState(props.route.params.status ?? null);
  const status = useRef(props.route.params.status ?? null);
  const id = useRef(props.route.params.id ?? null);
  console.log(
    "status: ",
    JSON.stringify(props.route.params.conditionStorage?.minTemperature)
  );
  useEffect(() => {
    status.current == "COPY"
      ? setValue(
        "nameWareHouse",
        props.route.params.name +
        "-COPY-" +
        props.route.params.sequenceCopy ?? ""
      )
      : setValue("nameWareHouse", props.route.params.name ?? "");
    status.current == "COPY"
      ? setValue(
        "codeWareHouse",
        props.route.params.code +
        "-COPY-" +
        props.route.params.sequenceCopy ??
        "" ??
        ""
      )
      : setValue("codeWareHouse", String(props.route.params.code ?? ""));
    setValue("addressWareHouse", String(props.route.params.address ?? ""));
    setValue("latitude", String(props.route.params.additionalInfo?.latitude ?? ""));
    setValue("longitude", String(props.route.params.additionalInfo?.longitude ?? ""));
    setValue("height", String(props.route.params.additionalInfo?.height ?? ""));
    setValue("longs", String(props.route.params.additionalInfo?.length ?? ""));
    setValue("width", String(props.route.params.additionalInfo?.width ?? ""));
    setValue(
      "temperature1",
      String(props.route.params.conditionStorage?.minTemperature ?? "")
    );
    setValue(
      "temperature2",
      String(props.route.params.conditionStorage?.standardHumidity ?? "")
    );
    setValue(
      "temperature3",
      String(props.route.params.conditionStorage?.standardTemperature ?? "")
    );
    setValue(
      "weight",
      String(props.route.params.additionalInfo?.weightCapacity ?? "")
    );
  }, [props.route.params]);

  const [conditions, setConditions] = useState(
    props.route.params.hasConditionStorage ? true : false
  );
  const [config, setConfig] = useState(
    props.route.params.hasAdditionalInfo ? true : false
  );
  const onSubmit = (data: any) => {
    // console.log("tuvm test data", data);
    switch (status.current) {
      case "UPDATE":
        handlerUpdateData(data, id.current);
        break;
      case "COPY":
        onHandleDataCopy(data);
        break;
      default:
        onHandleData(data);
        break;
    }
  };

  const handlerUpdateData = (data: any, id: any) => {
    console.log("update data");
    api.warehouseStore
      .putUpdateWareHouse(
        {
          name: data.nameWareHouse,
          code: data.codeWareHouse ?? "",
          companyId: 0,
          branchId: 0,
          sourceProductType: "INTERNAL",
          address: data.addressWareHouse,
          areaCode: "string",
          hasAdditionalInfo: config,
          additionalInfo: {
            latitude: data.latitude,
            longitude: data.longitude,
            height: data.height,
            heightUom: {
              id: 0,
              name: "string",
            },
            length: data.longs,
            lengthUom: {
              id: 0,
              name: "string",
            },
            width: data.width,
            widthUom: {
              id: 0,
              name: "string",
            },
            weightCapacity: data.weight,
            weightCapacityUom: {
              id: 0,
              name: "string",
            },
            scene: "INDOOR",
          },
          hasConditionStorage: conditions,
          conditionStorage: {
            standardTemperature: data.temperature1,
            minTemperature: data.temperature2,
            standardHumidity: data.temperature3,
          },
          action: "UPDATE",
          note: "string",
          isMobile: true,
        },
        id
      )
      .then((item: any) => {
        if (item.message != null) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: translate("txtDialog.txt_title_dialog"),
            textBody: item.message,
            button: translate("common.ok"),
            closeOnOverlayTap: false,
            onHide() {
              props.navigation.navigate("wareHouse");
            },
          });
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: translate("txtDialog.txt_title_dialog"),
            textBody: item.data.errorCodes[1].message.toString(),
            button: translate("common.ok"),
            closeOnOverlayTap: false,
            onPressButton() {
              props.navigation.navigate("wareHouse");
            },
          });
        }
        // if (item.data.errorCodes[0].code.toString()) {

        console.log(
          "tuvm response: ",
          JSON.stringify(item.data.errorCodes[1].message.toString())
        );
      });
  };

  const onHandleDataCopy = (data: any) => {
    console.log("copy data");
    api.warehouseStore
      .postCreateWareHouse({
        name: data.nameWareHouse,
        code: data.codeWareHouse ?? "",
        companyId: 0,
        branchId: 0,
        sourceProductType: "INTERNAL",
        address: data.addressWareHouse,
        areaCode: "string",
        hasAdditionalInfo: config,
        additionalInfo: {
          latitude: data.latitude,
          longitude: data.longitude,
          height: data.height,
          heightUom: {
            id: 0,
            name: "string",
          },
          length: data.longs,
          lengthUom: {
            id: 0,
            name: "string",
          },
          width: data.width,
          widthUom: {
            id: 0,
            name: "string",
          },
          weightCapacity: data.weight,
          weightCapacityUom: {
            id: 0,
            name: "string",
          },
          scene: "INDOOR",
        },
        hasConditionStorage: conditions,
        conditionStorage: {
          standardTemperature: data.temperature1,
          minTemperature: data.temperature2,
          standardHumidity: data.temperature3,
        },
        copyId: id.current,
        action: "CREATE",
        note: "string",
        isMobile: true,
      })
      .then((item: any) => {
        if (item.message != null) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: translate("txtDialog.txt_title_dialog"),
            textBody: item.message,
            button: translate("common.ok"),
            onHide() {
              props.navigation.navigate("wareHouse");
            },
          });
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: translate("txtDialog.txt_title_dialog"),
            textBody: item.data.errorCodes[1].message.toString(),
            button: translate("common.ok"),
            closeOnOverlayTap: false,
          });
        }
        // if (item.data.errorCodes[0].code.toString()) {

        console.log(
          "tuvm response: ",
          JSON.stringify(item.data.errorCodes[1].message.toString())
        );
      });
  };

  const onHandleData = (data: any) => {
    console.log("create data");
    api.warehouseStore
      .postCreateWareHouse({
        name: data.nameWareHouse,
        code: data.codeWareHouse ?? "",
        companyId: 0,
        branchId: 0,
        sourceProductType: "INTERNAL",
        address: data.addressWareHouse,
        areaCode: "string",
        hasAdditionalInfo: config,
        additionalInfo: {
          latitude: data.latitude,
          longitude: data.longitude,
          height: data.height,
          heightUom: {
            id: 0,
            name: "string",
          },
          length: data.longs,
          lengthUom: {
            id: 0,
            name: "string",
          },
          width: data.width,
          widthUom: {
            id: 0,
            name: "string",
          },
          weightCapacity: data.weight,
          weightCapacityUom: {
            id: 0,
            name: "string",
          },
          scene: "INDOOR",
        },
        hasConditionStorage: conditions,
        conditionStorage: {
          standardTemperature: data.temperature1,
          minTemperature: data.temperature2,
          standardHumidity: data.temperature3,
        },
        action: "CREATE",
        note: "string",
        isMobile: true,
      })
      .then((item: any) => {
        if (item.message != null) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: translate("txtDialog.txt_title_dialog"),
            textBody: item.message,
            button: translate("common.ok"),
            onHide() {
              props.navigation.navigate("wareHouse");
            },
          });
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: translate("txtDialog.txt_title_dialog"),
            textBody: item.data.errorCodes[1].message.toString(),
            button: translate("common.ok"),
            closeOnOverlayTap: false,
          });
        }
        // if (item.data.errorCodes[0].code.toString()) {

        console.log(
          "tuvm response: ",
          JSON.stringify(item.data.errorCodes[1].message.toString())
        );
      });
  };

  return (
    <View style={Styles.main}>
      <Header
        LeftIcon={Images.back}
        style={{ height: scaleHeight(52) }}
        leftText="wareHouse.createWareHouse"
        onLeftPress={() => props.navigation.goBack()}
      />
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
                editable={status.current == "UPDATE" ? false : true}
                placeholderTx={"wareHouse.enterCodeWareHouse"}
                // secureTextEntry={false}
                secureTextEntry={false}
                onBlur={onBlur}
                isShowPassword
                RightIconClear={null}
                RightIconShow={() => { }}
                onClearText={() => { }}
                maxLength={50}
                onShowPassword={() => { }}
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
                value: /^[a-zA-Z0-9-]+$/,
                message: "Only letters, numbers, and underscores are allowed",
              },
            }}
          />

          <Controller
            control={control}
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
                RightIconShow={() => { }}
                onClearText={() => { }}
                maxLength={250}
                onShowPassword={() => { }}
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
                RightIconShow={() => { }}
                onClearText={() => { }}
                onShowPassword={() => { }}
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
              console.log(conditions);
            }}>
            {conditions ? (
              <Images.ic_checkbox marginRight={5} />
            ) : (
              <View style={stylesWareHouse.selected}></View>
            )}
            <Text tx="wareHouse.storageConditions"></Text>
          </TouchableOpacity>
          <ConditionsComponent
            control={control}
            errors={errors}
            conditions={conditions}
            setValue={setValue}
            clearError={clearErrors}
          />
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
          <ConfigInfoMoreComponent
            control={control}
            errors={errors}
            config={config}
            setValue={setValue}
            clearError={clearErrors}
          />
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
    </View>
  );
});
