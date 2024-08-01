import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Dimensions,
  FlatList,
  ScrollView,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Modal from "react-native-modal";
import { Svgs } from "../../../../../assets/svgs";
import { Text } from "../../../../components";
import Dialog from "../../../../components/dialog/dialog";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { translate } from "../../../i18n";
const { width, height } = Dimensions.get("screen");

const VIEWMODAL: ViewStyle = {
  // width: Dimensions.get('screen').width - 32,
  height: Dimensions.get("screen").height * 0.4,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  paddingVertical: scaleHeight(padding.padding_12),
  paddingHorizontal: scaleWidth(padding.padding_16),
  position: "absolute",
  bottom: 16,
  left: 0,
  right: 0,
};
const TEXTLABELFLATLIST: TextStyle = {
  fontWeight: "500",
  fontSize: fontSize.size16,
  lineHeight: scaleHeight(24),
  color: colors.palette.nero,
  marginVertical: scaleHeight(margin.margin_8),
};
const VIEWLINE: ViewStyle = {
  height: scaleHeight(1),
  width: "100%",
  backgroundColor: colors.palette.ghostWhite,
};

interface ItemConversionProps {
  onCancel: () => void;
  onConfirm: (value: any) => void;
  unit: string;
}

const ItemConversion = (props: ItemConversionProps) => {
  const { onCancel, onConfirm, unit } = props;

  const [originalUnit, setOriginalUnit] = useState({ label: "" });
  const [data, setData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState<{}[]>([]);
  const [search, setSearch] = useState("");

  const handleSearch = (text: any) => {
    setSearch(text);
    if (text) {
      const newData = arrData.filter((item) => {
        const itemData = item.label.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(arrData);
    }
  };

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      conversion: [{ code: "", ratio: "" }],
    },
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: `conversion`,
  });

  const conversionWatch = watch("conversion");

  useEffect(() => {
    setFilteredData(arrData);
  }, []);

  const onSubmit = (data: any) => {
    onConfirm(data);
    console.log(data);
    // reset();
  };

  const arrData = [
    { id: "1", label: "Hop" },
    { id: "2", label: "Thung" },
  ];
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text
          tx="productScreen.conversionRate"
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
            if (lastItem.code && lastItem.ratio) {
              append({ code: "", ratio: "" });
            } else {
              setOpenDialog(true);
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
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
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
                          "productScreen.enterConversionCode"
                        )}
                        style={{
                          width:
                            (Dimensions.get("screen").width - scaleWidth(64)) *
                            0.4,
                          borderBottomWidth: 1,
                          borderBottomColor: "#DFE0EB",
                        }}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        // onClearText={() => onChange('')}
                        // RightIconClear={Images.icon_delete2}
                        maxLength={50}
                      />
                    )}
                    // defaultValue={''}
                    // rules={{ required: "Minimum purchase is required" }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowModal(true)}
                    style={{
                      width:
                        (Dimensions.get("screen").width - scaleWidth(64)) *
                        0.25,
                      borderBottomWidth: 1,
                      borderBottomColor: "#DFE0EB",
                      flexDirection: "row",
                      marginHorizontal: scaleWidth(5),
                    }}>
                    <Text style={{ flex: 1 }} text={originalUnit.label} />
                    <Svgs.icon_caretRightDown />
                  </TouchableOpacity>
                  <Controller
                    control={control}
                    name={`conversion.${index}.ratio`}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        keyboardType={"numeric"}
                        placeholder={translate("productScreen.enterRatio")}
                        style={{
                          width:
                            (Dimensions.get("screen").width - scaleWidth(64)) *
                            0.2,
                          borderBottomWidth: 1,
                          borderBottomColor: "#DFE0EB",
                        }}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        // onClearText={() => onChange('')}
                        // RightIconClear={Images.icon_delete2}
                        maxLength={50}
                      />
                    )}
                    // defaultValue={''}
                    // rules={{ required: "Minimum purchase is required" }}
                  />
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#DFE0EB",
                      // width: (Dimensions.get('screen').width - scaleWidth(64)) * 0.15,
                    }}>
                    <Text text={unit} />
                  </View>
                </View>
                {originalUnit.label && unit && conversionWatch[index].ratio ? (
                  <Text
                    text={
                      "1 " +
                      originalUnit.label +
                      " = " +
                      conversionWatch[index].ratio +
                      " " +
                      unit
                    }
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
                }}>
                <View style={VIEWMODAL}>
                  {/* <Text text="chon ly do" /> */}
                  <TextInput
                    style={{ fontSize: 16, fontWeight: "400" }}
                    onChangeText={(text) => handleSearch(text)}
                    value={search}
                    placeholder={translate("productScreen.search")}
                  />
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
                              setData(item.label);
                              setOriginalUnit(item);
                              setShowModal(false);
                            }}>
                            {/* {dataDefault !== '' ? <Text text={dataDefault}
                                            style={TEXTLABELFLATLIST} />: */}
                            <Text text={item.label} style={TEXTLABELFLATLIST} />
                            {/* } */}
                          </TouchableOpacity>
                          <View style={VIEWLINE}></View>
                        </View>
                      );
                    }}
                  />
                </View>
              </Modal>
            </View>
          );
        })}
      </ScrollView>
      <Dialog
        isVisible={openDialog}
        title={"productScreen.Notification"}
        content={"itemConversion.dialogNoti"}
        titleBTN2="productScreen.BtnNotificationAccept"
        styleBTN2={{ backgroundColor: "#0078D4", borderRadius: 8 }}
        onPressAccept={() => setOpenDialog(false)}
      />
    </View>
  );
};

export default ItemConversion;
