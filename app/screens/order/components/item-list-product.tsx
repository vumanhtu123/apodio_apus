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
  ImageBackground,
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
import FastImage from "react-native-fast-image";
import { commasToDots, formatCurrency, formatNumberByString, formatStringToFloat, formatVND } from "../../../utils/validate";
import PriceModal from "./modal-price";
import { ALERT_TYPE, Toast } from "../../../components/dialog-notification";

interface AddProduct {
  onPress: ({ }) => void;
  onPressPlus: ({ }) => void;
  onPressMinus: ({ }) => void;
  onPressSelectTexas: ({ }) => void;
  onPressAddTexas: ({ }) => void;
  handleUpdatePrice: ({ }) => void;
  editDiscount?: ({ }) => void;
  arrData?: {}[];
  images?: string;
  name?: string;
  unit?: string;
  cost?: string;
  qty?: string;
  VAT?: string;
  taxesInput?: string;
  valueVAT?: string;
  sumTexas: string;
  addTaxes?: boolean;
  editTaxes?: boolean;
  selectUpdate?: boolean;
  priceList?: boolean;
  textDiscount?: number;
  disabled?: boolean;
  id: number;
  inputDiscount: (textInput: any) => void;
  inputPrice: (textInput: any) => void;
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
    id,
    valueVAT,
    sumTexas,
    onPressAddTexas,
    onPressSelectTexas,
    editDiscount,
    addTaxes,
    editTaxes,
    priceList,
    taxesInput,
    inputDiscount,
    textDiscount,
    handleUpdatePrice,
    selectUpdate,
    inputPrice,
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
  const [modalPrice, setModalPrice] = useState(false)
  const [dataModal, setDataModal] = useState('')
  const [taxesId, setTaxesId] = useState(0)
  console.log("taxes VAT", props.cost);
  const Price = () => {
    return Number((props.cost) ?? 0) * Number(props.qty);
  };

  const Sum = (): Number => {
    return (
      Price() * (1 - (Number(props.textDiscount ?? 0)) / 100) + Number(props.valueVAT ?? 0)
    );
  };

  console.log("sumfnjewdnf", cost);
  return (
    <View>
      {props.disabled === true ? null :
        <TouchableOpacity
          onPress={(item) => onPress(item)}
          style={{
            position: "absolute",
            left: 0,
            top: scaleHeight(8),
            zIndex: 1,
          }}>
          <Images.icon_delete2 height={scaleHeight(16)} width={scaleHeight(16)} />
        </TouchableOpacity>}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginVertical: scaleHeight(margin.margin_12),
          marginLeft: scaleWidth(margin.margin_8),
        }}>
        <View style={{ marginRight: scaleWidth(margin.margin_10) }}>
          <ImageBackground
            style={{ width: scaleWidth(48), height: scaleHeight(48) }}
            imageStyle={{
              borderRadius: 12,
            }}
            source={require("../../../../assets/Images/no_images.png")}>
            <FastImage
              style={{
                width: scaleWidth(48),
                height: scaleHeight(48),
                borderRadius: 12
              }}
              source={{
                uri: images != null && images.length > 0 ? images[0] : '',
                cache: FastImage.cacheControl.immutable,
              }}
              defaultSource={require("../../../../assets/Images/no_images.png")}
            />
          </ImageBackground>
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
            {selectUpdate ? (
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

                      keyboardType="numeric"
                      placeholder={translate("order.input_price")}
                      placeholderTextColor={"#747475"}
                      onChangeText={(newText) => {
                        // inputPrice(newText);
                        onChange(newText)
                      }}
                      value={formatCurrency(value)}

                      // onSubmitEditing={() => inputPrice(formatNumberByString(value).replace(/,/g, '.'))}
                      onSubmitEditing={() => inputPrice(formatStringToFloat(value))}
                    />
                  </View>
                )}
                name="input_price"
              />
            ) : (
              <Text
                text={formatVND(formatCurrency(commasToDots(cost)))}
                style={{
                  fontWeight: "400",
                  fontSize: fontSize.size12,
                  lineHeight: scaleHeight(14.52),
                  color: colors.palette.torchRed,
                  fontStyle: "italic",
                }}
              />
            )}
            {priceList ? (
              !selectUpdate ? (props.disabled === true ? null :
                <TouchableOpacity
                  onPress={(item) => {
                    handleUpdatePrice(item);
                  }}>
                  <Images.icon_edit />
                </TouchableOpacity>
              ) : null
            ) : null}
            <Text
              text={" " + unit}
              style={{
                fontStyle: "italic",
                fontWeight: "400",
                fontSize: fontSize.size12,
                lineHeight: scaleHeight(14.52),
                color: colors.palette.black,
                marginRight: scaleWidth(margin.margin_4),
              }}
              numberOfLines={1}
            />
          </View>
          {VAT != undefined ? (
            <View style={{ flexDirection: "column", marginTop: 6 }}>
              <View style={{ flexDirection: "row" }}>
                <Images.ic_tag />
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color: "#242424",
                    marginHorizontal: 4,
                    maxWidth: scaleWidth(100)
                  }}>
                  {/* {translate("order.taxes_vat")} */}
                  {VAT + " "}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    fontStyle: "italic",
                    color: "#F4AD22",
                  }}>
                  {formatVND(formatCurrency(commasToDots(valueVAT)))}
                </Text>
              </View>
            </View>
          ) : null}
          {props.disabled === true ? null :
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
            </TouchableOpacity>}
          {priceList == true ? (
            addTaxes == false ? (props.disabled === true ? null :
              <TouchableOpacity onPress={(item) => {
                console.log('---------onPressAddTexas---1--')
                onPressAddTexas(item)
                setTaxesId(props.id)
                setDataModal(taxesInput?.toString() ?? '')
                setModalPrice(true)
              }}>
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
            )
              // : editTaxes == true ? (props.disabled === true ? null :
              //   <TouchableOpacity onPress={(item) => {
              //     console.log('---------onPressAddTexas---2--')
              //     onPressAddTexas(item)
              //   }}>
              //     <View
              //       style={{
              //         flexDirection: "row",
              //         alignItems: "center",
              //       }}>
              //       <Images.minus_ic />
              //       <Controller
              //         control={control}
              //         defaultValue={""}
              //         render={({ field: { onChange, value, onBlur } }) => (
              //           <View style={{ flex: 1, alignContent: "center" }}>
              //             <TextInput
              //               style={{
              //                 fontWeight: "400",
              //                 height: scaleHeight(16),
              //                 alignContent: "center",
              //                 borderColor: "#F6F7FB",
              //                 padding: 0,
              //                 paddingBottom: 2,
              //                 paddingLeft: 4,
              //                 fontSize: 10,
              //                 color: "black",
              //                 borderBottomWidth: 1,
              //                 textAlignVertical: "bottom",
              //               }}
              //               keyboardType="numeric"
              //               maxLength={3}
              //               placeholder={translate("order.input_texas")}
              //               placeholderTextColor={"#747475"}
              //               onChangeText={(newText) => {
              //                 // inputDiscount(newText);
              //                 onChange(newText)
              //               }}
              //               value={value}
              //               onSubmitEditing={() => inputDiscount(value)}
              //             />
              //           </View>
              //         )}
              //         name="input_texas"
              //       />
              //     </View>
              //   </TouchableOpacity>
              // ) 
              :
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text tx={'order.promotions'} style={{
                  fontSize: 10,
                  fontWeight: "400",
                  marginHorizontal: 2,
                }} />
                <Text style={{
                  fontSize: 10,
                  fontWeight: "400",
                  marginHorizontal: 2,
                }}>
                  {formatCurrency(commasToDots(taxesInput)) + ' %'}
                </Text>
                {props.disabled === true ? null :
                  <TouchableOpacity onPress={() => setModalPrice(true)}>
                    <Images.icon_edit />
                  </TouchableOpacity>}
              </View>
          ) : null}
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
              {" " + (Sum().toString() === "NaN" ? "0" : formatVND(formatCurrency(commasToDots(Sum()))))}
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
          {props.disabled === true ? null :
            <TouchableOpacity
              onPress={(item) => onPressMinus(item)}
              style={{
                marginHorizontal: scaleWidth(margin.margin_6),
                alignItems: "center",
              }}>
              <Images.icon_minus />
            </TouchableOpacity>}
          <Text
            style={{
              marginHorizontal: 15,
              textAlign: "center",
              alignItems: "center",
              fontSize: 12,
              fontWeight: "400",
            }}>
            {qty}
          </Text>
          {props.disabled === true ? null : <TouchableOpacity
            onPress={(item) => onPressPlus(item)}
            style={{
              marginHorizontal: scaleWidth(margin.margin_6),
              alignContent: "center",
            }}>
            <Images.icon_plusGreen />
          </TouchableOpacity>}
        </View>
      </View>
      <PriceModal
        isVisible={modalPrice}
        setIsVisible={() => setModalPrice(false)}
        title={"productDetail.retailPrice"}
        onCancel={() => {
          setModalPrice(false);
        }}
        id={taxesId}
        onConfirm={(data) => {
          if(Number(data)< 100){
            inputDiscount(data)
            setModalPrice(false)
          }else{
            Toast.show({ type: ALERT_TYPE.DANGER, 
              textBody: 'Chiết khấu không thể lớn hơn 100' })
          }
        }}
        rightText={'%'}
        titleTx={'ImprotGoodsBook.discount'}
        placeholderTx={'order.input_texas'}
        titleInputTx={'ImprotGoodsBook.discount'}
      />
    </View>
  );
}
