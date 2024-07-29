import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../../navigators";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Header, Text, TextField } from "../../../components";
import { Styles, stylesWareHouse } from "../style";
import { scaleHeight } from "../../../theme";
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

  const status = useRef(props.route.params.status ?? null);
  const id = useRef(props.route.params.id ?? null);

  const [listUnit, setListUnit] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [checkErrorTriggered, setCheckErrorTriggered] = useState(0);
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

  const methods = useForm({
    mode: "all",
    defaultValues: {
      nameWareHouse:
        status.current == "COPY"
          ? props.route.params.name +
              "-COPY-" +
              props.route.params.sequenceCopy ?? ""
          : props.route.params.name ?? "",
      codeWareHouse:
        status.current == "COPY"
          ? props.route.params.code +
              "-COPY-" +
              props.route.params.sequenceCopy ??
            "" ??
            ""
          : String(props.route.params.code ?? ""),
      addressWareHouse: String(props.route.params.address ?? ""),
      temperature1: String(
        props.route.params.conditionStorage?.standardTemperature ?? ""
      ),
      temperature2: String(
        props.route.params.conditionStorage?.minTemperature ?? ""
      ),
      temperature3: String(
        props.route.params.conditionStorage?.standardHumidity ?? ""
      ),
      conditions: props.route.params?.hasConditionStorage ? true : false,
      config: props.route.params?.hasAdditionalInfo ? true : false,
      latitude: String(props.route.params.additionalInfo?.latitude ?? ""),
      longitude: String(props.route.params.additionalInfo?.longitude ?? ""),
      height: String(props.route.params.additionalInfo?.height ?? ""),
      longs: String(props.route.params.additionalInfo?.length ?? ""),
      width: String(props.route.params.additionalInfo?.width ?? ""),
      weight: String(props.route.params.additionalInfo?.weightCapacity ?? ""),
      lengthUom: {
        value: props.route.params.additionalInfo?.lengthUom?.id,
        text: props.route.params.additionalInfo?.lengthUom?.name,
      },
      heightUom: {
        value: props.route.params.additionalInfo?.heightUom?.id,
        text: props.route.params.additionalInfo?.heightUom?.name,
      },
      widthUom: {
        value: props.route.params.additionalInfo?.widthUom?.id,
        text: props.route.params.additionalInfo?.widthUom?.name,
      },
      weightCapacityUom: {
        value: props.route.params.additionalInfo?.weightCapacityUom?.id,
        text: props.route.params.additionalInfo?.weightCapacityUom?.name,
      },
    },
  });

  const {
    control,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
    watch,
  } = methods;

  const conditions = watch(
    "conditions",
    props.route.params?.hasConditionStorage ? true : false
  );
  const config = watch(
    "config",
    props.route.params?.hasAdditionalInfo ? true : false
  );

  const lengthUom = watch("lengthUom");
  const widthUom = watch("widthUom");

  const heightUom = watch("heightUom");
  const weightCapacityUom = watch("weightCapacityUom");

  useEffect(() => {
    handlerDataList();
  }, [props.route.params]);

  const onPressConditions = () => {
    setValue("conditions", !conditions);
    setValue("temperature1", "");
    clearErrors("temperature1");
    setValue("temperature2", "");
    clearErrors("temperature2");
    setValue("temperature3", "");
    clearErrors("temperature3");
  };

  const onError = (errors) => {
    console.log("Form validation errors:", errors);
    if(config){
      setShowErrors(true);
      setCheckErrorTriggered(prev => prev + 1);
    }
  };


  const onPressConfig = () => {
    setValue("config", !config);
    setValue("heightUom", { value: 0, text: "" });
    setValue("lengthUom", { value: 0, text: "" });
    setValue("widthUom", { value: 0, text: "" });
    setValue("weightCapacityUom", { value: 0, text: "" });
    setValue("longitude", "");
    setValue("latitude", "");
    setValue("longs", "");
    setValue("width", "");
    setValue("height", "");
    setValue("weight", "");
    clearErrors("longitude");
    clearErrors("latitude");
    clearErrors("longs");
    clearErrors("width");
    clearErrors("height");
    clearErrors("weight");
    clearErrors("heightUom");
    clearErrors("lengthUom");
    clearErrors("widthUom");
    clearErrors("weightCapacityUom");
  };

  

  const onSubmit = (data: any) => {
    console.log("tuvm test data", data);
    if (
      (data.heightUom.text &&
        data.lengthUom.text &&
        data.widthUom.text &&
        data.weightCapacityUom.text != undefined) ||
      ""
    ) {
      switch (status.current) {
        case "UPDATE":
          handlerUpdateData(data, id.current);
          console.log(
            "check data props",
            props.route.params.additionalInfo?.heightUom.name
          );
          break;
        case "COPY":
          onHandleDataCopy(data);
          break;
        default:
          onHandleData(data);
          break;
      }
    }else {
      if(config){
      setShowErrors(true);
      setCheckErrorTriggered(prev => prev + 1);
      }
    }
    
  };

  const handlerUpdateData = (data: any, id: any) => {
    console.log("update data", data);
    try {
      api.warehouseStore
        .putUpdateWareHouse(
          {
            name: data?.nameWareHouse ?? "",
            code: data?.codeWareHouse ?? "",
            companyId: 0,
            branchId: 0,
            sourceProductType: "INTERNAL",
            address: data?.addressWareHouse ?? "",
            areaCode: "string",
            hasAdditionalInfo: config,
            additionalInfo: {
              latitude: data?.latitude ?? "",
              longitude: data?.longitude ?? "",
              height: data?.height ?? "",
              heightUom: {
                id:
                  heightUom.value ??
                  props.route.params.additionalInfo?.heightUom.id,
                name:
                  heightUom?.text ??
                  props.route.params.additionalInfo?.heightUom.name,
              },
              length: data?.longs ?? "",
              lengthUom: {
                id:
                  lengthUom?.value ??
                  props.route.params.additionalInfo?.lengthUom.id,
                name:
                  lengthUom?.text ??
                  props.route.params.additionalInfo?.lengthUom.name,
              },
              width: data?.width ?? "",
              widthUom: {
                id:
                  widthUom.value ??
                  props.route.params.additionalInfo?.widthUom.id,
                name:
                  widthUom.text ??
                  props.route.params.additionalInfo?.widthUom.name,
              },
              weightCapacity: data?.weight ?? "",
              weightCapacityUom: {
                id:
                  weightCapacityUom?.value ??
                  props.route.params.additionalInfo?.weightCapacityUom.id,
                name:
                  weightCapacityUom?.text ??
                  props.route.params.additionalInfo?.weightCapacityUom.name,
              },
              scene: "INDOOR",
            },
            hasConditionStorage: conditions,
            conditionStorage: {
              standardTemperature: data?.temperature1,
              minTemperature: data?.temperature2,
              standardHumidity: data?.temperature3,
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
          address: data?.addressWareHouse ?? "",
          areaCode: "string",
          hasAdditionalInfo: config,
          additionalInfo: {
            latitude: data.latitude,
            longitude: data.longitude,
            height: data.height,
            heightUom: {
              id:
                heightUom.value ??
                props.route.params.additionalInfo?.heightUom.id,
              name:
                heightUom.text ??
                props.route.params.additionalInfo?.heightUom.name,
            },
            length: data.longs,
            lengthUom: {
              id:
                lengthUom.value ??
                props.route.params.additionalInfo?.lengthUom.id,
              name:
                lengthUom.text ??
                props.route.params.additionalInfo?.lengthUom.name,
            },
            width: data.width,
            widthUom: {
              id:
                widthUom.value ??
                props.route.params.additionalInfo?.widthUom.id,
              name:
                widthUom.text ??
                props.route.params.additionalInfo?.widthUom.name,
            },
            weightCapacity: data.weight,
            weightCapacityUom: {
              id:
                weightCapacityUom.value ??
                props.route.params.additionalInfo?.weightCapacityUom.id,
              name:
                weightCapacityUom.text ??
                props.route.params.additionalInfo?.weightCapacityUom.name,
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
          address: data?.addressWareHouse ?? "",
          areaCode: "string",
          hasAdditionalInfo: config,
          additionalInfo: {
            latitude: data?.latitude,
            longitude: data?.longitude,
            height: data?.height,
            heightUom: {
              id:
                heightUom.value ??
                props.route.params.additionalInfo?.heightUom.id,
              name:
                heightUom.text ??
                props.route.params.additionalInfo?.heightUom.name,
            },
            length: data?.longs,
            lengthUom: {
              id:
                lengthUom.value ??
                props.route.params.additionalInfo?.lengthUom.id,
              name:
                lengthUom.text ??
                props.route.params.additionalInfo?.lengthUom.name,
            },
            width: data?.width,
            widthUom: {
              id:
                widthUom.value ??
                props.route.params.additionalInfo?.widthUom.id,
              name:
                widthUom.text ??
                props.route.params.additionalInfo?.widthUom.name,
            },
            weightCapacity: data?.weight,
            weightCapacityUom: {
              id:
                weightCapacityUom.value ??
                props.route.params.additionalInfo?.weightCapacityUom.id,
              name:
                weightCapacityUom.text ??
                props.route.params.additionalInfo?.weightCapacityUom.name,
            },
            scene: "INDOOR",
          },
          hasConditionStorage: conditions,
          conditionStorage: {
            standardTemperature: data?.temperature1,
            minTemperature: data?.temperature2,
            standardHumidity: data?.temperature3,
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
    <FormProvider {...methods}>
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
                    onChange(value.trimStart());
                  }}
                />
              )}
              name="codeWareHouse"
              rules={{
                required: "",
                maxLength: 50,
                pattern: {
                  value: /^[a-zA-Z0-9-]+$/,
                  message: translate("wareHouse.messageError"),
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
                    onChange(value.trimStart());
                  }}
                />
              )}
              name="nameWareHouse"
              rules={{
                required: translate("wareHouse.pleaseEnterInformation"),
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
                    onChange(value.trimStart());
                  }}
                />
              )}
              name="addressWareHouse"
              rules={{
                required: translate("wareHouse.pleaseEnterInformation"),
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
                    onPressConditions();
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
              // control={control}
              // errors={errors}
              // conditions={conditions}
              // setValue={setValue}
              // clearError={clearErrors}
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
                    onPressConfig();
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
            {config ? <ConfigInfoMoreComponent list={listUnit} checkErrorTriggered={checkErrorTriggered} showErrors={showErrors} /> : null}
            
          </ScrollView>
          <TouchableOpacity
            onPress={methods.handleSubmit(onSubmit, onError)}
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
    </FormProvider>
  );
});
