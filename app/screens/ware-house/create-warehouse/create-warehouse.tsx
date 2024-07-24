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
    watch,
  } = useForm({
    mode: "all",
  });

  const status = useRef(props.route.params.status ?? null);
  const id = useRef(props.route.params.id ?? null);
  const heightUom = useRef({ value: 0, text: "" });
  const lengthUom = useRef({ value: 0, text: "" });
  const widthUom = useRef({ value: 0, text: "" });
  const weightCapacityUom = useRef({ value: 0, text: "" });
  const conditions = watch("conditions", false);
  const config = watch("config", false);

  const [listUnit, setListUnit] = useState([]);
  console.log(
    "status: ",
    JSON.stringify(props.route.params.conditionStorage?.minTemperature)
  );

  const handlerDataList = () => {
    api.warehouseStore.getListUnit().then((unit: any) => {
      const data = unit.result.data.content;
      const listUnit = data.map((obj: { id: any; name: any }) => {
        return {
          value: obj.id,
          text: obj.name,
        };
      });
      setListUnit(listUnit);
    });
  };

  useEffect(() => {
    console.log("width uom", lengthUom.current);
    heightUom.current = props.route.params.additionalInfo?.heightUom;
    lengthUom.current = props.route.params.additionalInfo?.lengthUom;
    widthUom.current = props.route.params.additionalInfo?.widthUom;
    weightCapacityUom.current =
      props.route.params.additionalInfo?.weightCapacityUom;
  }, []);

  useEffect(() => {
    handlerDataList();
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
    setValue(
      "latitude",
      String(props.route.params.additionalInfo?.latitude ?? "")
    );
    setValue(
      "longitude",
      String(props.route.params.additionalInfo?.longitude ?? "")
    );
    setValue("height", String(props.route.params.additionalInfo?.height ?? ""));
    setValue("longs", String(props.route.params.additionalInfo?.length ?? ""));
    setValue("width", String(props.route.params.additionalInfo?.width ?? ""));
    setValue(
      "temperature1",
      String(props.route.params.conditionStorage?.standardTemperature ?? "")
    );
    setValue(
      "temperature2",
      String(props.route.params.conditionStorage?.minTemperature ?? "")
    );
    setValue(
      "temperature3",
      String(props.route.params.conditionStorage?.standardHumidity ?? "")
    );
    setValue(
      "weight",
      String(props.route.params.additionalInfo?.weightCapacity ?? "")
    );
    setValue(
      "conditions",
      props.route.params?.hasConditionStorage ? true : false
    );
    setValue("config", props.route.params?.hasAdditionalInfo ? true : false);
  }, [props.route.params]);

  // const [conditions, setConditions] = useState(
  //   props.route.params.hasConditionStorage ? true : false
  // );
  // const [config, setConfig] = useState(
  //   props.route.params.hasAdditionalInfo ? true : false
  // );

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
    try {
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
                id: heightUom.current.value ?? 0,
                name: heightUom.current.text ?? "",
              },
              length: data.longs,
              lengthUom: {
                id: lengthUom.current.value ?? 0,
                name: lengthUom.current.text ?? "",
              },
              width: data.width,
              widthUom: {
                id: widthUom.current.value ?? 0,
                name: widthUom.current.text ?? "",
              },
              weightCapacity: data.weight,
              weightCapacityUom: {
                id: weightCapacityUom.current.value ?? 0,
                name: weightCapacityUom.current.text ?? "",
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
                props.navigation.navigate("wareHouse", { reset: true });
              },
            });
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: translate("txtDialog.txt_title_dialog"),
              textBody: item.data.errorCodes[0].message.toString(),
              button: translate("common.ok"),
              closeOnOverlayTap: false,
              onPressButton() {
                props.navigation.navigate("wareHouse", { reset: true });
              },
            });
          }

          console.log(
            "tuvm response: ",
            JSON.stringify(item.data.errorCodes[0].message.toString())
          );
        });
    } catch (e: any) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: translate("txtDialog.txt_title_dialog"),
        textBody: e.message.toString(),
        button: translate("common.ok"),
        closeOnOverlayTap: false,
        onPressButton() {
          props.navigation.navigate("wareHouse", { reset: true });
        },
      });
    }
  };

  const onHandleDataCopy = (data: any) => {
    console.log("copy data");
    try {
      api.warehouseStore
        .postCreateWareHouse({
          name: data?.nameWareHouse,
          code: data?.codeWareHouse == "" ? null : data?.codeWareHouse,
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
              id: heightUom.current.value ?? 0,
              name: heightUom.current.text ?? "",
            },
            length: data.longs,
            lengthUom: {
              id: lengthUom.current.value ?? 0,
              name: lengthUom.current.text ?? "",
            },
            width: data.width,
            widthUom: {
              id: widthUom.current.value ?? 0,
              name: widthUom.current.text ?? "",
            },
            weightCapacity: data.weight,
            weightCapacityUom: {
              id: weightCapacityUom.current.value ?? 0,
              name: weightCapacityUom.current.text ?? "",
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
                props.navigation.navigate("wareHouse", { reset: true });
              },
            });
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: translate("txtDialog.txt_title_dialog"),
              textBody: item.data.errorCodes[0].message.toString(),
              button: translate("common.ok"),
              closeOnOverlayTap: false,
            });
          }
          console.log(
            "tuvm response: ",
            JSON.stringify(item.data.errorCodes[1].message.toString())
          );
        });
    } catch (e: any) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: translate("txtDialog.txt_title_dialog"),
        textBody: e.message.toString(),
        button: translate("common.ok"),
        closeOnOverlayTap: false,
        onPressButton() {
          props.navigation.navigate("wareHouse", { reset: true });
        },
      });
    }
  };

  const onHandleData = (data: any) => {
    console.log("create data", data);
    try {
      api.warehouseStore
        .postCreateWareHouse({
          name: data?.nameWareHouse,
          code: data?.codeWareHouse == "" ? null : data?.codeWareHouse,
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
              id: heightUom.current?.value ?? 0,
              name: heightUom.current?.text ?? "",
            },
            length: data.longs,
            lengthUom: {
              id: lengthUom.current?.value ?? 0,
              name: lengthUom.current?.text ?? "",
            },
            width: data.width,
            widthUom: {
              id: widthUom.current?.value ?? 0,
              name: widthUom.current?.text ?? "",
            },
            weightCapacity: data.weight,
            weightCapacityUom: {
              id: weightCapacityUom.current?.value ?? 0,
              name: weightCapacityUom.current?.text ?? "",
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
          if (item.message == "Success") {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: translate("txtDialog.txt_title_dialog"),
              textBody: item.message,
              button: translate("common.ok"),
              onHide() {
                props.navigation.navigate("wareHouse", { reset: true });
              },
            });
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: translate("txtDialog.txt_title_dialog"),
              textBody: item.data.errorCodes[0].message.toString(),
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
    } catch (e: any) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: translate("txtDialog.txt_title_dialog"),
        textBody: e.message.toString(),
        button: translate("common.ok"),
        closeOnOverlayTap: false,
        onPressButton() {
          props.navigation.navigate("wareHouse", { reset: true });
        },
      });
    }
  };

  return (
    <View style={Styles.main}>
      <Header
        LeftIcon={Images.back}
        style={{ height: scaleHeight(52) }}
        headerTx={
          status.current == "UPDATE"
            ? "wareHouse.refactorWareHouse"
            : "wareHouse.createWareHouse"
        }
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
                value: /^[a-zA-Z0-9-]+$/,
                message: "Mã chỉ gồm chữ , số và ký tự _",
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
              required: "Vui lòng nhập thông tin",
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
              required: "Vui lòng nhập thông tin",
              maxLength: 250,
            }}
          />
          <Controller
            name="conditions"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  marginVertical: scaleHeight(15),
                }}
                onPress={() => {
                  // setConditions(!conditions);
                  setValue("conditions", !conditions);
                  console.log(conditions);
                }}>
                {conditions ? (
                  <Images.ic_checkbox marginRight={5} />
                ) : (
                  <View style={stylesWareHouse.selected}></View>
                )}
                <Text tx="wareHouse.storageConditions"></Text>
              </TouchableOpacity>
            )}
          />
          {conditions ? (
            <ConditionsComponent
              control={control}
              errors={errors}
              // conditions={conditions}
              setValue={setValue}
              clearError={clearErrors}
            />
          ) : null}
          <Controller
            name="config"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  marginVertical: scaleHeight(15),
                }}
                onPress={() => {
                  setValue("config", !config);
                  // setConfig(!config);
                }}>
                {config ? (
                  <Images.ic_checkbox marginRight={5} />
                ) : (
                  <View style={stylesWareHouse.selected}></View>
                )}
                <Text tx="wareHouse.configInfoMore"></Text>
              </TouchableOpacity>
            )}
          />
          {config ? (
            <ConfigInfoMoreComponent
              control={control}
              errors={errors}
              // config={config}
              setValue={setValue}
              clearError={clearErrors}
              list={listUnit}
              heightUomData={heightUom.current}
              lengthUomData={lengthUom.current}
              widthUomData={widthUom.current}
              weightCapacityUomData={weightCapacityUom.current}
              heightUom={(item: any) => {
                heightUom.current = item;
                console.log("item uom", heightUom.current);
              }}
              lengthUom={(item: any) => {
                lengthUom.current = item;
                console.log("item length", lengthUom.current);
              }}
              widthUom={(item: any) => {
                widthUom.current = item;
                console.log("item width", widthUom.current);
              }}
              weightCapacityUom={(item: any) => {
                weightCapacityUom.current = item;
                console.log("item weight capacity", weightCapacityUom.current);
              }}
            />
          ) : null}
          {/* <Controller
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
          /> */}
        </ScrollView>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{
            backgroundColor: "#0078D4",
            alignItems: "center",
            borderRadius: 10,
          }}>
          <Text
            tx={
              status.current == "UPDATE"
                ? "wareHouse.refactor"
                : "wareHouse.createWareHouse"
            }
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
