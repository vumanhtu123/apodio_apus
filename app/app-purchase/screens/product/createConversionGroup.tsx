import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import {
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
import { Svgs } from "../../../../assets/svgs";
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
} from "../../components/dialog-notification";
import { translate } from "../../i18n/translate";
import UnitModal from "./component/modal-unit";

export const CreateConversionGroup: FC = observer(
  function CreateConversionGroup(props) {
    const paddingTop = useSafeAreaInsets().top;
    const route = useRoute();
    const { editScreen }: any = route?.params;
    const navigation = useNavigation();
    const { unitStore } = useStores();
    const [originalUnit, setOriginalUnit] = useState({ id: 0, label: "" });
    const [originalUnit2, setOriginalUnit2] = useState({ id: null, label: "" });
    const [arrData, setData] = useState([] as any);
    const [showModal, setShowModal] = useState(false);
    const [showModalDVT, setShowModalDVT] = useState(false);
    const [filteredData, setFilteredData] = useState<{ id: number, label: string }[]>([]);
    const [search, setSearch] = useState("");
    const [indexConversion, setIndexConversion] = useState(0);
    const [disabledSelect, setDisabledSelect] = useState(false);
    const [dataUnit, setDataUnit] = useState("");

    const handleSearch = (text: any) => {
      setSearch(text);
      if (text) {
        const dataChoiceItem = arrData.filter(
          (item: { label: string }) => item.label !== dataUnit
        );
        const newData = dataChoiceItem.filter((item: { label: string }) => {
          const itemData = item.label.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredData(newData);
      } else {
        const dataChoiceItem = arrData.filter(
          (item: { label: string }) => item.label !== dataUnit
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

    const goBackToProductCreateScreen = (id: number, name: string) => {
      if (editScreen === true) {
        navigation.navigate({
          name: "ProductEditScreen", params: {
            idUnitGroup: id,
            nameUnitGroup: name,
            goBackConversionGroup: true,
            resetData: false,
          }
        } as never);
      } else {
        navigation.navigate({
          name: "ProductCreateScreen", params: {
            idUnitGroup: id,
            nameUnitGroup: name,
            goBackConversionGroup: true,
            resetData: false,
          }
        } as never);
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
      console.log('du lieu tra ve', unitResult)
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
          LeftIcon={Svgs.back}
          onLeftPress={() => navigation.goBack()}
          headerTx="createProductScreen.createUnitGroup"
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
                showRightIcon={false}
                isImportant={true}
              />
            )}
            rules={{ required: "Tên nhóm thuộc tính là bắt buộc" }}
          />
          <InputSelect
            titleTx={"productDetail.originUnit"}
            hintTx={"productDetail.selectOriginUnit"}
            isSearch
            required={true}
            arrData={arrData}
            dataDefault={originalUnit.label}
            onPressChoice={(item: { label: string, id: number }) => {
              setDataUnit(item.label);
              setOriginalUnit(item);
              setFilteredData((prevItems) =>
                prevItems.filter((i: { label: string }) => i.label !== item.label)
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
            <Svgs.icon_plusCircleBlue />
            <Text
              tx={"productScreen.createDVT"}
              style={[styles.textAddLine, {
                marginLeft: scaleWidth(4),
              }]}
            />
          </TouchableOpacity>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                tx="productScreen.conversionRate1"
                style={styles.textTitleConversionRate} />
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
                  style={styles.textAddLine} />
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
                        style={styles.viewLineItemUnit}>
                        <Controller
                          control={control}
                          name={`conversion.${index}.code`}
                          render={({ field: { onChange, value, onBlur } }) => (
                            <TextInput
                              keyboardType={"default"}
                              placeholder={translate(
                                "productScreen.enterConversionCode1"
                              )}
                              style={styles.viewInputCode}
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
                          style={styles.viewChangeDvt}>
                          {conversionWatch[index].changeDVT !== "" ? (
                            <Text
                              style={styles.textChangeDvt}
                              text={conversionWatch[index].changeDVT}
                              numberOfLines={1}
                            />
                          ) : (
                            <Text
                              style={[styles.textChangeDvt, {
                                color: colors.palette.dolphin,
                              }]}
                              tx="productScreen.selectDVT"
                            />
                          )}
                          <Svgs.icon_caretRightDown />
                        </TouchableOpacity>
                        <View
                          style={styles.viewInputConversionRate}>
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
                              style={styles.textOriginalUint}
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
                          style={styles.textLineConversion}
                        />
                      ) : null}
                    </View>
                    {fields.length > 1 ? (
                      <TouchableOpacity
                        onPress={() => remove(index)}
                        style={{ marginLeft: scaleWidth(7) }}>
                        <Svgs.icon_minusCircle />
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
                              style={styles.viewSearchModal}>
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
                                  <Svgs.icon_searchBlack
                                    width={scaleWidth(18)}
                                    height={scaleHeight(18)}
                                  />
                                </TouchableOpacity>
                              </View>
                              <TextInput
                                style={styles.viewInputModal}
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
                              renderItem={({ item }: any) => {
                                return (
                                  <View>
                                    <TouchableOpacity
                                      onPress={() => {
                                        setDataUnit(item.label);
                                        setFilteredData((prevItems) =>
                                          prevItems.filter(
                                            (i: any) => i.label !== item.label
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
          titleTx={"productScreen.createUnit"}
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
          style={styles.viewGroupButton}>
          <TouchableOpacity
            onPress={() => onSubmit1()}
            style={styles.viewButtonSave}>
            <Text
              tx={"productScreen.save"}
              style={styles.textButtonSave} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSubmit()}
            style={styles.viewButtonSaveAndChange}>
            <Text
              tx={"productScreen.saveAndChange"}
              style={styles.textButtonSaveChange} />
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
    // fontWeight: "500",
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
  viewGroupButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    paddingVertical: scaleHeight(20),
  },
  viewButtonSave: {
    width: scaleWidth(158),
    height: scaleHeight(48),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.palette.navyBlue,
  },
  viewButtonSaveAndChange: {
    width: scaleWidth(158),
    height: scaleHeight(48),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.navyBlue,
  },
  textTitleConversionRate: {
    fontWeight: "600",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(14.52),
    color: colors.palette.nero,
    flex: 1,
  },
  textButtonSave: {
    fontSize: fontSize.size14,
    fontWeight: "600",
    color: colors.palette.navyBlue,
  },
  textButtonSaveChange: {
    fontSize: fontSize.size14,
    fontWeight: "600",
    color: colors.palette.neutral100,
  },
  textAddLine: {
    fontWeight: "400",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(14.52),
    color: colors.palette.navyBlue,
  },
  viewInputModal: {
    fontSize: fontSize.size16,
    fontWeight: "400",
    paddingVertical: 0,
    flex: 1,
  },
  viewSearchModal: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.cornflowerBlue,
    borderRadius: 4,
    paddingVertical: scaleHeight(5),
  },
  textLineConversion: {
    color: colors.palette.dolphin,
    fontWeight: "400",
    fontSize: fontSize.size10,
  },
  textOriginalUint: {
    color: colors.palette.dolphin,
    fontWeight: "400",
    fontSize: fontSize.size10,
    textAlign: "right",
  },
  viewInputConversionRate: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "35%",
    borderBottomWidth: 1,
    borderBottomColor: colors.quartz,
    paddingVertical:
      Platform.OS === "ios" ? scaleHeight(15) : 0,
  },
  viewChangeDvt: {
    width: "25%",
    borderBottomWidth: 1,
    borderBottomColor: colors.quartz,
    flexDirection: "row",
    marginHorizontal: scaleWidth(8),
    marginTop: 15,
  },
  textChangeDvt: {
    flex: 1,
    fontWeight: "400",
    fontSize: fontSize.size12,
    paddingBottom: scaleHeight(16),
  },
  viewInputCode: {
    width: "35%",
    borderBottomWidth: 1,
    borderBottomColor: colors.quartz,
    paddingVertical:
      Platform.OS === "ios"
        ? scaleHeight(15)
        : null,
  },
  viewLineItemUnit: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(margin.margin_16),
  },
});
