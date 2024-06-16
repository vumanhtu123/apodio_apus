import React, { useEffect, useState } from "react";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { Text } from "../../../components/text/text";
import {
  FlatList,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Button, TextField } from "../../../components";
import { Images } from "../../../../assets";
import { scheduleFlushOperations } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon";
import AutoHeightImage from "react-native-auto-height-image";
import { translate } from "../../../i18n/translate";
import { Controller, useForm } from "react-hook-form";
import { number } from "mobx-state-tree/dist/internal";

interface AddProduct {
  onPress: ({}) => void;
  onPressPlus: ({}) => void;
  onPressMinus: ({}) => void;
  onPressSelectTexas: ({}) => void;
  onPressAddTexas: ({}) => void;
  arrData?: {}[];
  images?: string;
  name?: string;
  unit?: string;
  cost?: string;
  qty?: string;
  VAT?: string;
  valueVAT?: string;
  sumTexas: string;
  addTaxes?: boolean;
}

export default function ItemListProduct(props: AddProduct) {
  const {
    arrData,
    onPress,
    onPressMinus,
    onPressPlus,
    images,
    name,
    unit,
    cost,
    qty,
    VAT,
    valueVAT,
    sumTexas,
    onPressAddTexas,
    onPressSelectTexas,
    addTaxes,
  } = props;

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  console.log("taxes VAT", props.cost);
  const Sum = (): Number => {
    return Number(props.cost) + Number(props.valueVAT ?? 0);
  };
  console.log("sum", Sum());
  return (
    <View>
      <TouchableOpacity
        onPress={(item) => onPress(item)}
        style={{
          position: "absolute",
          left: 0,
          top: scaleHeight(8),
          zIndex: 1,
        }}>
        <Images.icon_delete2 height={scaleHeight(18)} width={scaleHeight(18)} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginVertical: scaleHeight(margin.margin_12),
          marginLeft: scaleWidth(margin.margin_8),
        }}>
        <View style={{ marginRight: scaleWidth(margin.margin_10) }}>
          <AutoHeightImage
            source={{
              uri:
                images ??
                "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
            }}
            height={scaleHeight(48)}
            width={scaleHeight(48)}
            style={{ borderRadius: 16 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            text={name}
            style={{
              fontWeight: "600",
              fontSize: fontSize.size12,
              lineHeight: scaleHeight(14.52),
              color: colors.palette.nero,
            }}
          />
          <View style={{ flexDirection: "row", marginTop: scaleHeight(6) }}>
            <Text
              text={cost ?? 0 + " "}
              style={{
                fontWeight: "400",
                fontSize: fontSize.size12,
                lineHeight: scaleHeight(14.52),
                color: colors.palette.torchRed,
                fontStyle: "italic",
              }}
            />
            <Images.icon_edit />
            <Text
              text={unit}
              style={{
                fontStyle: "italic",
                fontWeight: "400",
                fontSize: fontSize.size12,
                lineHeight: scaleHeight(14.52),
                color: colors.palette.black,
                marginRight: scaleWidth(margin.margin_4),
              }}
            />
          </View>
          {VAT != undefined ? (
            <View style={{ flexDirection: "column", marginTop: 6 }}>
              <View style={{ flexDirection: "row" }}>
                <Images.ic_tag />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color: "#242424",
                    marginHorizontal: 4,
                  }}>
                  {/* {translate("order.taxes_vat")} */}
                  {VAT + " "}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  fontStyle: "italic",
                  color: "#F4AD22",
                }}>
                {valueVAT}
              </Text>
            </View>
          ) : null}
          <TouchableOpacity onPress={(item) => onPressSelectTexas(item)}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 6,
                alignItems: "center",
              }}>
              <Images.ic_plus_orange />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  color: "#F4AD22",
                  marginHorizontal: 2,
                  fontStyle: "italic",
                }}>
                {translate("order.select_texas")}
              </Text>
            </View>
          </TouchableOpacity>
          {addTaxes == false ? (
            <TouchableOpacity onPress={(item) => onPressAddTexas(item)}>
              <View style={{ flexDirection: "row" }}>
                <Images.icon_plusGreen />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "600",
                    color: "#00CC6A",
                    marginHorizontal: 2,
                    fontStyle: "italic",
                  }}>
                  {translate("order.add_texas")}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={(item) => onPressAddTexas(item)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Images.minus_ic />
                <Controller
                  control={control}
                  defaultValue={""}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <View style={{ flex: 1, alignContent: "center" }}>
                      <TextInput
                        style={{
                          fontWeight: "400",
                          height: scaleHeight(16),
                          alignContent: "center",
                          borderColor: "#F6F7FB",
                          padding: 0,
                          paddingBottom: 2,
                          paddingLeft: 4,
                          fontSize: 10,
                          color: "black",
                          borderBottomWidth: 1,
                          textAlignVertical: "bottom",
                        }}
                        placeholder={translate("order.input_texas")}
                        placeholderTextColor={"#747475"}
                        // onChangeText={newText => setText(newText)}
                      />
                    </View>
                  )}
                  name="input_texas"
                />
              </View>
            </TouchableOpacity>
          )}
          {/* {sumTexas != null ? ( */}
          <Text
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: "#242424",
              fontStyle: "italic",
              marginVertical: 6,
            }}>
            {translate("order.sum_texas")}
            <Text
              style={{
                fontSize: 10,
                fontWeight: "400",
                color: "#FF4956",
                fontStyle: "italic",
              }}>
              {" " + (Sum().toString() === "NaN" ? "0" : Sum())}
            </Text>
          </Text>
          {/* ) : null} */}
        </View>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: colors.palette.whiteSmoke,
            alignItems: "center",
            paddingVertical: scaleHeight(padding.padding_8),
            paddingHorizontal: scaleHeight(padding.padding_6),
            borderRadius: 8,
            marginTop: scaleHeight(margin.margin_12),
          }}>
          <TouchableOpacity
            onPress={(item) => onPressMinus(item)}
            style={{
              marginHorizontal: scaleWidth(margin.margin_6),
              alignItems: "center",
            }}>
            <Images.icon_minus />
          </TouchableOpacity>
          <Text
            style={{
              marginHorizontal: 23,
              textAlign: "center",
              alignItems: "center",
              fontSize: 12,
              fontWeight: "400",
            }}>
            {qty}
          </Text>
          <TouchableOpacity
            onPress={(item) => onPressPlus(item)}
            style={{
              marginHorizontal: scaleWidth(margin.margin_6),
              alignContent: "center",
            }}>
            <Images.icon_plusGreen />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
