import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import WebView from "react-native-webview";
import { Images } from "../../../assets";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header, Text, TextField } from "../../components";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { InputSelect } from "../../components/input-select/inputSelect";
import Modal from "react-native-modal";
import { useStores } from "../../models";
import {
  ALERT_TYPE,
  Dialog,
  Toast,
  Loading,
} from "../../components/dialog-notification";
import { translate } from "../../i18n/translate";
import UnitModal from "./component/modal-unit";
import { CustomModal } from "../../components/custom-modal";

export const CreateConversionGroup: FC = observer(
  function CreateConversionGroup(props) {
    const paddingTop = useSafeAreaInsets().top;
    const route = useRoute();
    const editScreen = route?.params?.editScreen;
    const navigation = useNavigation();
    const { unitStore } = useStores();
    const [originalUnit, setOriginalUnit] = useState({ id: 0, label: "" });
    const [originalUnit2, setOriginalUnit2] = useState({ id: null, label: "" });
    const [arrData, setData] = useState([] as any);
    const [showModal, setShowModal] = useState(false);
    const [showModalDVT, setShowModalDVT] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const [indexConversion, setIndexConversion] = useState(0);
    const [disabledSelect, setDisabledSelect] = useState(false);
    const [dataUnit, setDataUnit] = useState("");

    const handleSearch = (text: any) => {
      setSearch(text);
      if (text) {
        const dataChoiceItem = arrData.filter(
          (item) => item.label !== dataUnit
        );
        const newData = dataChoiceItem.filter((item: { label: string }) => {
          const itemData = item.label.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });

        setFilteredData(newData);
      } else {
        const dataChoiceItem = arrData.filter(
          (item) => item.label !== dataUnit
        );
        setFilteredData(dataChoiceItem);
      }
    };

    const {
      control,
      reset,
      handleSubmit,
      watch,
      register,
      setValue,
      formState: { errors },
    } = useForm({
      defaultValues: {
        groupName: "",
        conversion: [
          { id: "", code: "", unitId: "", conversionRate: "", changeDVT: "" },
        ],
        DVT: "",
      },
    });
    const { append, fields, remove } = useFieldArray({
      control,
      name: `conversion`,
    });

    const conversionWatch = watch("conversion");
    const DVTWatch = watch("DVT");
    const groupNameWatch = watch("groupName");

    const goBackToProductCreateScreen = (id: string, name: string) => {
      if (editScreen === true) {
        navigation.navigate("ProductEditScreen", {
          idUnitGroup: id,
          nameUnitGroup: name,
          goBackConversionGroup: true,
          resetData: false,
        });
      } else {
        navigation.navigate("ProductCreateScreen", {
          idUnitGroup: id,
          nameUnitGroup: name,
          goBackConversionGroup: true,
          resetData: false,
        });
      }
    };

    useEffect(() => {
      getListUnit();
    }, []);

    useEffect(() => {
      if (
        conversionWatch.length === 1 &&
        conversionWatch[0].code === "" &&
        conversionWatch[0].conversionRate === ""
      ) {
        setDisabledSelect(false);
      } else {
        setDisabledSelect(true);
      }
    }, [conversionWatch[0].code, conversionWatch[0].conversionRate]);

    const getListUnit = async () => {
      const unitResult = await unitStore.getListUnit();
      console.log("response11111", unitResult);
      if (unitResult && unitResult.kind === "ok") {
        let dataModified = unitResult.result.data.content.map(
          (obj: { id: any; name: any }) => {
            return {
              id: obj.id,
              label: obj.name,
            };
          }
        );
        console.log("response2222", dataModified);
        setFilteredData(dataModified);
        setData(dataModified);
      } else {
        console.error("Failed to fetch list unit:", unitResult);
      }
    };

    const createUnitGroupLine = async (params: any, saveLocal: boolean) => {
      const unitResult = await unitStore.createUnitGroupLine(params);
      if (unitResult && unitResult.kind === "ok") {
        Dialog.hide();
        const data = unitResult.result.data;
        console.log("response11111", unitResult);
        goBackToProductCreateScreen(data.id, data.name);
      } else {
        await Dialog.hideDialog();
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: translate("productScreen.Notification"),
          textBody: unitResult.result.errorCodes[0].message,
          button: translate("common.ok"),
          closeOnOverlayTap: false,
        });
        console.error("Failed to fetch list unit:", unitResult);
      }
    };

    //luu va chon
    const onSubmit = () => {
      if (
        groupNameWatch === "" ||
        originalUnit.label === "" ||
        (conversionWatch.length === 1 &&
          conversionWatch[0].code === "" &&
          conversionWatch[0].conversionRate === "")
      ) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "",
          textBody: translate("txtToats.required_information"),
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.INFO,
          title: translate("txtDialog.txt_title_dialog"),
          textBody: translate("txtDialog.save_the_conversion_group"),
          button: translate("common.cancel"),
          button2: translate("common.confirm"),
          closeOnOverlayTap: false,
          onPressButton: () => {
            const params: any = {};
            params.name = groupNameWatch;
            params.originalUnitId = originalUnit.id;
            const jsonArray = conversionWatch.map((item) => ({
              ...item,
              conversionRate: parseInt(item.conversionRate, 10),
            }));
            params.unitGroupLines = jsonArray;
            console.log(conversionWatch);
            createUnitGroupLine(params, true);
          },
        });
      }
      // reset();
    };

    //luu
    const onSubmit1 = () => {
      if (
        groupNameWatch === "" ||
        originalUnit.label === "" ||
        (conversionWatch.length === 1 &&
          conversionWatch[0].code === "" &&
          conversionWatch[0].conversionRate === "")
      ) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "",
          textBody: translate("txtToats.required_information"),
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.INFO,
          title: translate("txtDialog.txt_title_dialog"),
          textBody: translate("txtDialog.save_the_conversion_group"),
          button: translate("common.cancel"),
          button2: translate("common.confirm"),
          closeOnOverlayTap: false,
          onPressButton: () => {
            const params: any = {};
            params.name = groupNameWatch;
            params.originalUnitId = originalUnit.id;
            const jsonArray = conversionWatch.map((item) => ({
              ...item,
              conversionRate: parseInt(item.conversionRate, 10),
            }));
            params.unitGroupLines = jsonArray;
            console.log(conversionWatch);
            createUnitGroupLine(params, false);
          },
        });
      }
      // reset();
    };

    return (
      <View style={{ backgroundColor: colors.palette.neutral100, flex: 1 }}>
        <Header
          LeftIcon={Images.back}
          onLeftPress={() => navigation.goBack()}
          headerText="Tạo nhóm quy đổi"
          style={{ height: scaleHeight(52) }}
        />
        <View
          style={{ marginHorizontal: scaleWidth(margin.margin_16), flex: 1 }}>
          <Controller
            control={control}
            name={`groupName`}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                keyboardType={null}
                labelTx={"productDetail.groupName"}
                style={{
                  marginTop: scaleHeight(20),
                  marginBottom: scaleHeight(margin.margin_15),
                }}
                placeholder={translate("productScreen.enterGroup")}
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                // onClearText={() => onChange('')}
                // RightIconClear={Images.icon_delete2}
                showRightIcon={false}
                isImportant={true}
              />
            )}
            // defaultValue={''}
            rules={{ required: "Group name is required" }}
          />
          <InputSelect
            titleTx={"productDetail.originUnit"}
            hintTx={"productDetail.selectOriginUnit"}
            isSearch
            required={true}
            arrData={arrData}
            dataDefault={originalUnit.label}
            onPressChoice={(item) => {
              setDataUnit(item.label);
              setOriginalUnit(item);
              setFilteredData((prevItems) =>
                prevItems.filter((i) => i.label !== item.label)
              );
            }}
            disabled={disabledSelect}
          />
          <TouchableOpacity
            onPress={() => setShowModalDVT(true)}
            style={{
              marginTop: scaleHeight(6),
              marginBottom: scaleHeight(margin.margin_15),
              flexDirection: "row",
            }}>
            <Images.icon_plusCircleBlue />
            <Text
              tx={"productScreen.createDVT"}
              style={{
                marginLeft: scaleWidth(4),
                fontWeight: "400",
                fontSize: fontSize.size12,
                lineHeight: scaleHeight(14.52),
                color: colors.palette.navyBlue,
              }}
            />
          </TouchableOpacity>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                tx="productScreen.conversionRate1"
                style={{
                  fontWeight: "600",
                  fontSize: fontSize.size12,
                  lineHeight: scaleHeight(14.52),
                  color: colors.palette.nero,
                  flex: 1,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  const lastItem = conversionWatch[conversionWatch.length - 1];
                  if (lastItem.code && lastItem.conversionRate) {
                    append({
                      id: "",
                      code: "",
                      unitId: "",
                      conversionRate: "",
                      changeDVT: "",
                    });
                  } else {
                    Toast.show({
                      type: ALERT_TYPE.DANGER,
                      title: "",
                      textBody: translate("txtDialog.adding_a_new_price_range"),
                    });
                  }
                }}>
                <Text
                  tx="productScreen.addLine"
                  style={{
                    fontWeight: "400",
                    fontSize: fontSize.size12,
                    lineHeight: scaleHeight(14.52),
                    color: colors.palette.navyBlue,
                  }}
                />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {fields.map((item, index) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    }}>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: scaleHeight(margin.margin_16),
                        }}>
                        <Controller
                          control={control}
                          name={`conversion.${index}.code`}
                          render={({ field: { onChange, value, onBlur } }) => (
                            <TextInput
                              keyboardType={"default"}
                              placeholder={translate(
                                "productScreen.enterConversionCode1"
                              )}
                              style={{
                                width: "35%",
                                borderBottomWidth: 1,
                                borderBottomColor: "#DFE0EB",
                                paddingVertical:
                                  Platform.OS === "ios"
                                    ? scaleHeight(15)
                                    : null,
                              }}
                              value={value}
                              onBlur={onBlur}
                              onChangeText={(value) => {
                                if (originalUnit.label === "") {
                                  Toast.show({
                                    type: ALERT_TYPE.DANGER,
                                    title: "",
                                    textBody: translate(
                                      "txtToats.required_dvt"
                                    ),
                                  });
                                } else {
                                  onChange(value);
                                }
                              }}
                              maxLength={50}
                            />
                          )}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            if (originalUnit.label === "") {
                              Toast.show({
                                type: ALERT_TYPE.DANGER,
                                title: "",
                                textBody: translate("txtToats.required_dvt"),
                              });
                            } else {
                              setShowModal(true);
                              setIndexConversion(index);
                            }
                          }}
                          style={{
                            width: "25%",
                            borderBottomWidth: 1,
                            borderBottomColor: "#DFE0EB",
                            flexDirection: "row",
                            marginHorizontal: scaleWidth(8),
                            marginTop: 15,
                          }}>
                          {conversionWatch[index].changeDVT !== "" ? (
                            <Text
                              style={{
                                flex: 1,
                                fontSize: fontSize.size12,
                                paddingBottom: scaleHeight(12),
                              }}
                              text={conversionWatch[index].changeDVT}
                              numberOfLines={1}
                            />
                          ) : (
                            <Text
                              style={{
                                flex: 1,
                                fontWeight: "400",
                                fontSize: fontSize.size12,
                                color: colors.palette.dolphin,
                                paddingBottom: scaleHeight(18),
                              }}
                              tx="productScreen.selectDVT"
                            />
                          )}
                          <Images.icon_caretRightDown />
                        </TouchableOpacity>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            width: "35%",
                            borderBottomWidth: 1,
                            borderBottomColor: "#DFE0EB",
                            paddingVertical:
                              Platform.OS === "ios" ? scaleHeight(15) : 0,
                          }}>
                          <Controller
                            control={control}
                            name={`conversion.${index}.conversionRate`}
                            render={({
                              field: { onChange, value, onBlur },
                            }) => (
                              <TextInput
                                keyboardType={"numeric"}
                                placeholder={translate(
                                  "productScreen.enterRatio"
                                )}
                                style={{
                                  width: "60%",
                                }}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={(value) => {
                                  if (originalUnit.label === "") {
                                    Toast.show({
                                      type: ALERT_TYPE.DANGER,
                                      title: "",
                                      textBody: translate(
                                        "txtToats.required_dvt"
                                      ),
                                    });
                                  } else {
                                    onChange(value);
                                  }
                                }}
                                maxLength={50}
                              />
                            )}
                          />
                          <View
                            style={{
                              alignSelf: "center",
                              width: "40%",
                            }}>
                            <Text
                              text={originalUnit.label}
                              style={{
                                color: colors.palette.dolphin,
                                fontWeight: "400",
                                fontSize: fontSize.size10,
                                textAlign: "right",
                              }}
                              numberOfLines={1}
                            />
                          </View>
                        </View>
                      </View>
                      {conversionWatch[index].changeDVT &&
                      originalUnit.label &&
                      conversionWatch[index].conversionRate ? (
                        <Text
                          text={
                            "1 " +
                            conversionWatch[index].changeDVT +
                            " = " +
                            conversionWatch[index].conversionRate +
                            " " +
                            originalUnit.label
                          }
                          style={{
                            color: colors.palette.dolphin,
                            fontWeight: "400",
                            fontSize: fontSize.size10,
                          }}
                        />
                      ) : null}
                    </View>

                    {fields.length > 1 ? (
                      <TouchableOpacity
                        onPress={() => remove(index)}
                        style={{ marginLeft: scaleWidth(7) }}>
                        <Images.icon_minusCircle />
                      </TouchableOpacity>
                    ) : (
                      <View style={{ width: scaleWidth(12) }} />
                    )}

                    <Modal
                      isVisible={showModal}
                      onBackdropPress={() => {
                        setShowModal(false);
                      }}
                      style={{ margin: 0 }}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setShowModal(false);
                        }}>
                        <KeyboardAvoidingView
                          behavior={
                            Platform.OS === "ios" ? "padding" : "height"
                          }
                          keyboardVerticalOffset={
                            Platform.OS === "ios" ? 64 : 0
                          }
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <View style={styles.viewModal}>
                            <View
                              style={{
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: "#53A0F6",
                                borderRadius: 4,
                                paddingVertical: scaleHeight(5),
                              }}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}>
                                <TouchableOpacity
                                  style={{
                                    justifyContent: "center",
                                    marginLeft: scaleWidth(8),
                                  }}>
                                  <Images.icon_searchBlack
                                    width={scaleWidth(18)}
                                    height={scaleHeight(18)}
                                  />
                                </TouchableOpacity>
                              </View>

                              <TextInput
                                style={{
                                  fontSize: fontSize.size16,
                                  fontWeight: "400",
                                  paddingVertical: 0,
                                  flex: 1,
                                }}
                                onChangeText={(text) => handleSearch(text)}
                                value={search}
                                placeholder={translate("productScreen.search")}
                              />
                            </View>
                            <FlatList
                              data={filteredData}
                              style={{
                                // flex: 1,
                                marginTop: scaleHeight(margin.margin_10),
                              }}
                              renderItem={({ item }) => {
                                return (
                                  <View>
                                    <TouchableOpacity
                                      onPress={() => {
                                        setDataUnit(item.label);
                                        setFilteredData((prevItems) =>
                                          prevItems.filter(
                                            (i) => i.label !== item.label
                                          )
                                        );
                                        setValue(
                                          `conversion.${indexConversion}.unitId`,
                                          item.id
                                        );
                                        setValue(
                                          `conversion.${indexConversion}.changeDVT`,
                                          item.label
                                        );
                                        setShowModal(false);
                                      }}>
                                      <Text
                                        text={item.label}
                                        style={styles.textLabelFlatList}
                                      />
                                    </TouchableOpacity>
                                    <View style={styles.viewLine}></View>
                                  </View>
                                );
                              }}
                            />
                          </View>
                        </KeyboardAvoidingView>
                      </TouchableWithoutFeedback>
                    </Modal>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>

        <UnitModal
          title={"productScreen.createUnit"}
          isVisible={showModalDVT}
          setIsVisible={() => setShowModalDVT(false)}
          onSave={(data) => {
            setShowModalDVT(false);
            getListUnit();
          }}
          onSaveAndChange={(data) => {
            setShowModalDVT(false);
            setOriginalUnit(data);
            reset({
              groupName: groupNameWatch,
              conversion: conversionWatch,
              DVT: "",
            });
            getListUnit();
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "white",
            paddingVertical: scaleHeight(20),
          }}>
          <TouchableOpacity
            onPress={() => onSubmit1()}
            style={{
              width: scaleWidth(165),
              height: scaleHeight(48),
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.palette.navyBlue,
            }}>
            <Text
              tx={"productScreen.save"}
              style={{
                fontSize: fontSize.size14,
                fontWeight: "600",
                color: colors.palette.navyBlue,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSubmit()}
            style={{
              width: scaleWidth(150),
              height: scaleHeight(48),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: "#0078d4",
            }}>
            <Text
              tx={"productScreen.saveAndChange"}
              style={{
                fontSize: fontSize.size14,
                fontWeight: "600",
                color: colors.palette.neutral100,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  viewModal: {
    // width: Dimensions.get('screen').width - 32,
    height: Dimensions.get("screen").height * 0.4,
    backgroundColor: colors.palette.neutral100,
    borderTopLeftRadius: margin.border_top_left_radius,
    borderTopRightRadius: margin.border_top_right_radius,
    paddingVertical: scaleHeight(padding.padding_12),
    paddingHorizontal: scaleWidth(padding.padding_16),
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  textLabelFlatList: {
    fontWeight: "500",
    fontSize: fontSize.size16,
    lineHeight: scaleHeight(24),
    color: colors.palette.nero,
    marginVertical: scaleHeight(margin.margin_8),
  },
  viewLine: {
    height: scaleHeight(1),
    width: "100%",
    backgroundColor: colors.palette.ghostWhite,
  },
});
