import { Observer, observer } from "mobx-react-lite";
import { FC, useState } from "react";
import React, {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useStores } from "../../../models";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import FastImage from "react-native-fast-image";
import { Text } from "../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Modal from "react-native-modal";
import {
  commasToDots,
  formatCurrency,
  formatNumber,
  formatVND,
  removeNonNumeric,
} from "../../../utils/validate";
import { InputSelect } from "../../../components/input-select/inputSelect";
import { translate } from "../../../i18n";
import PriceModal from "./modal-price";
import Images from "../../../../../assets/index";

interface ItemSelectVariant {
  item: any;
  handleMinusPrice: ({}) => void;
  handleMinus: ({}) => void;
  handlePlusPrice: ({}) => void;
  handlePlus: ({}) => void;
  handleAddToCart: ({}: any) => void;
  handleAddToCartPrice: ({}: any) => void;
  uomGroupLine?: {};
  changeText: ({}, {}) => void;
}

export function ItemSelectVariant(props: ItemSelectVariant) {
  const {
    item,
    handleMinus,
    handleMinusPrice,
    handlePlusPrice,
    handlePlus,
    handleAddToCart,
    changeText,
    handleAddToCartPrice,
  } = props;
  const { orderStore, vendorStore } = useStores();
  const [check, setCheck] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [arrData, setArrData] = useState([]);
  const [uomId, setUomId] = useState(item?.saleUom?.id);
  const [uom, setUom] = useState({ label: "", id: "", conversionRate: 0 });

  const [modalPrice, setModalPrice] = useState<any>(false);
  const [priceId, setPriceId] = useState<any>(0);

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
      price: [{ price: "" }],
    },
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: `price`,
  });

  if (orderStore.checkPriceList === true) {
    return (
      <TouchableOpacity
        onPress={() => handleAddToCartPrice(item)}
        disabled={item.quantityInventory < item.minQuantity ? true : false}
        style={[
          styles.ROOT,
          {
            borderColor:
              item.isSelect === true
                ? colors.palette.navyBlue
                : colors.palette.aliceBlue,
          },
        ]}>
        <ImageBackground
          style={styles.viewImageBackground}
          imageStyle={{
            borderRadius: 4,
          }}
          source={Images.noImages}>
          <FastImage
            style={styles.viewFastImage}
            source={{
              uri:
                item?.item?.productImage !== null &&
                item?.item?.productImage?.length !== 0
                  ? item?.item?.productImage[0]
                  : "",
              cache: FastImage.cacheControl.immutable,
            }}
            defaultSource={Images.noImages}
          />
        </ImageBackground>
        <View style={{ width: "100%" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              text={item.name}
              style={[
                styles.textName,
                {
                  color:
                    item.isSelect === true
                      ? colors.palette.navyBlue
                      : colors.nero,
                },
              ]}
            />
            {item.isSelect === true ? <Svgs.icon_checkCircleBlue /> : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: scaleHeight(3),
            }}>
            <Text
              style={[styles.text400Nero10, { marginRight: scaleWidth(6) }]}
              tx={"order.orderAccordingly"}
            />
            {item.saleUom.id === item.uomGroup.uomOriginId ? null : (
              <Text
                style={styles.text400Nero10}
                text={parseFloat(
                  (Number(item.amount) / Number(item.conversionRate)).toFixed(2)
                ).toString()}
              />
            )}
            <TouchableOpacity
              disabled={item.uomGroup === null ? true : false}
              onPress={() => {
                setIsModal(true);
                // const newArr = item?.uomGroup?.uomGroupLineItems.filter((items: any)=> items.id!== item?.saleUom.id)
                const newArr1 = item?.uomGroup?.uomGroupLineItems.map(
                  (items: any) => {
                    return { ...items, id: items.uomId, label: items.uomName };
                  }
                );
                setArrData(newArr1);
                setUom({
                  label: item.saleUom.name,
                  id: item.saleUom.id,
                  conversionRate: item.conversionRate,
                });
              }}
              style={{
                marginHorizontal: scaleWidth(6),
                flexDirection: "row",
                alignItems: "center",
              }}>
              <Text style={styles.text400Nero10} text={item.saleUom?.name} />
              <Svgs.icon_caretRightDown />
            </TouchableOpacity>
            {item.uomId === item.saleUom?.id ? null : (
              <View style={{ width: "34%" }}>
                <Text
                  style={[
                    styles.text400Nero10,
                    { color: colors.dolphin, fontStyle: "italic" },
                  ]}
                  text={
                    item.saleUom?.name +
                    " = " +
                    item?.conversionRate +
                    " " +
                    item.uomName
                  }
                  numberOfLines={1}
                />
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                opacity: item.quantityInventory < item.minQuantity ? 0.5 : 1,
                width: "60%",
              }}>
              <Text
                style={[
                  styles.text400Nero10,
                  { marginRight: scaleWidth(6), width: "22%" },
                ]}
                tx={"order.quanlity"}
              />
              <View
                style={[
                  styles.viewAmount,
                  {
                    borderWidth: scaleHeight(1),
                    borderColor:
                      item.amount !== 0
                        ? item.amount < item.minQuantity
                          ? colors.palette.radicalRed
                          : colors.textWhite
                        : colors.palette.white,
                    width: "30%",
                  },
                ]}>
                <TouchableOpacity
                  disabled={item.amount === 0 ? true : false}
                  onPress={() => handleMinusPrice(item)}
                  style={{
                    width: "25%",
                    alignItems: "center",
                    opacity: item.amount === 0 ? 0.5 : 1,
                  }}>
                  <Svgs.icon_minus />
                </TouchableOpacity>
                <Text style={{ width: "50%", textAlign: "center" }}>
                  {item.amount}
                </Text>
                <TouchableOpacity
                  disabled={
                    item.amount === item.quantityInventory ? true : false
                  }
                  onPress={() => handlePlusPrice(item)}
                  style={{
                    width: "25%",
                    alignItems: "center",
                    opacity: item.amount === item.quantityInventory ? 0.5 : 1,
                  }}>
                  <Svgs.icon_plusGreen />
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  text={item.uomGroup.uomOriginName}
                  style={[styles.text400Nero10, { marginLeft: scaleWidth(6) }]}
                  numberOfLines={1}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "10%",
              }}>
              <Text style={styles.text400Nero10} tx={"order.still"} />
              <Text
                style={[
                  styles.text400Nero10,
                  {
                    color: colors.palette.dolphin,
                    fontStyle: "italic",
                    marginRight: scaleWidth(2),
                  },
                ]}
                text={item.quantityInventory.toString()}
              />
              <Text
                style={[
                  styles.text400Nero10,
                  { color: colors.palette.dolphin },
                ]}
                text={item.uomGroup.uomOriginName}
                numberOfLines={1}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: scaleHeight(4),
            }}>
            {item.amount === 0 ? null : item.amount >= item.minQuantity ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%",
                }}>
                <Text style={styles.text400Nero12} tx={"order.price2"} />
                <Text
                  style={[
                    styles.text400Nero12,
                    { color: colors.palette.radicalRed, fontStyle: "italic" },
                  ]}
                  text={formatNumber(item.unitPrice)}
                />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "60%",
                }}>
                <Text style={styles.text400Nero8} tx={"order.miniumQuanlity"} />
                <Text
                  style={[
                    styles.text400Nero8,
                    { fontStyle: "italic", marginRight: scaleWidth(2) },
                  ]}
                  text={item?.minQuantity?.toString()}
                />
                <Text
                  style={[styles.text400Nero8, { fontStyle: "italic" }]}
                  text={item.uomGroup.uomOriginName}
                />
              </View>
            )}
          </View>
        </View>
        <Modal
          style={styles.viewModal}
          isVisible={isModal}
          onBackdropPress={() => setIsModal(false)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: scaleWidth(16),
              marginVertical: scaleHeight(20),
            }}>
            <Text
              tx={"order.orderUnit"}
              style={{
                fontWeight: "600",
                fontSize: fontSize.size16,
                lineHeight: scaleHeight(19.36),
                color: colors.nero,
                flex: 1,
              }}
            />
            <TouchableOpacity onPress={() => setIsModal(false)}>
              <Svgs.icon_deleteDolphin />
            </TouchableOpacity>
          </View>
          <InputSelect
            arrData={arrData}
            onPressChoice={(items: any) => {
              setUom({
                label: items.label,
                id: items.id,
                conversionRate: items.conversionRate,
              });
            }}
            styleView={{ marginHorizontal: scaleWidth(16) }}
            dataDefault={uom.label}
            titleTx={"productScreen.select_unit"}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: scaleWidth(16),
              marginTop: scaleHeight(8),
              marginBottom: scaleHeight(20),
            }}>
            <Text
              style={[styles.text400Nero12, { color: colors.dolphin }]}
              tx={"order.conversionRate"}
            />
            <Text
              style={[styles.text400Nero12, { color: colors.navyBlue }]}
              text={
                " 1 " +
                uom.label +
                " = " +
                uom.conversionRate +
                " " +
                item.uomGroup.uomOriginName
              }
            />
          </View>
          <TouchableOpacity
            style={{
              marginBottom: scaleHeight(20),
              marginHorizontal: scaleWidth(16),
              justifyContent: "center",
              alignItems: "center",
              height: scaleHeight(48),
              backgroundColor: colors.navyBlue,
              borderRadius: 8,
            }}
            onPress={() => {
              item.saleUom = { name: uom.label, id: uom.id };
              item.conversionRate = uom.conversionRate;
              setIsModal(false);
            }}>
            <Text
              tx={"common.confirm"}
              style={{
                color: colors.textWhite,
                fontWeight: "600",
                fontSize: fontSize.size14,
                lineHeight: scaleHeight(24),
              }}
            />
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        disabled={item.quantityInventory < item.minQuantity ? true : false}
        onPress={() => handleAddToCart(item)}
        style={[
          styles.ROOT,
          {
            borderColor:
              item.isSelect === true
                ? colors.palette.navyBlue
                : colors.palette.aliceBlue,
          },
        ]}>
        <ImageBackground
          style={styles.viewImageBackground}
          imageStyle={{
            borderRadius: 4,
          }}
          source={Images.noImages}>
          <FastImage
            style={styles.viewFastImage}
            source={{
              uri:
                item?.item?.productImage !== null &&
                item?.item?.productImage?.length !== 0
                  ? item?.item?.productImage[0]
                  : "",
              cache: FastImage.cacheControl.immutable,
            }}
            defaultSource={Images.noImages}
          />
        </ImageBackground>
        <View style={{ width: "100%" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              text={item.name}
              style={[
                styles.textName,
                {
                  color:
                    item.isSelect === true
                      ? colors.palette.navyBlue
                      : colors.nero,
                },
              ]}
            />
            {item.isSelect === true ? <Svgs.icon_checkCircleBlue /> : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: scaleHeight(3),
              width: "100%",
            }}>
            <Text
              style={[styles.text400Nero10, { marginRight: scaleWidth(6) }]}
              tx={"order.orderAccordingly"}
            />
            {item.saleUom?.id === item.uomGroup?.uomOriginId ? null : (
              <Text
                style={styles.text400Nero10}
                text={parseFloat(
                  (Number(item.amount) / Number(item.conversionRate)).toFixed(2)
                ).toString()}
              />
            )}
            <TouchableOpacity
              disabled={item.uomGroup === null ? true : false}
              onPress={() => {
                setIsModal(true);
                // const newArr = item?.uomGroup?.uomGroupLineItems.filter((items: any)=> items.id!== item?.saleUom.id)
                const newArr1 = item?.uomGroup?.uomGroupLineItems.map(
                  (items: any) => {
                    return { ...items, id: items.uomId, label: items.uomName };
                  }
                );
                setArrData(newArr1);
                setUom({
                  label: item.saleUom?.name,
                  id: item.saleUom?.id,
                  conversionRate: item.conversionRate,
                });
              }}
              style={{
                marginHorizontal: scaleWidth(6),
                flexDirection: "row",
                alignItems: "center",
              }}>
              <Text style={styles.text400Nero10} text={item.saleUom?.name} />
              <Svgs.icon_caretRightDown />
            </TouchableOpacity>
            {item.uomId === item.saleUom?.id ? null : (
              <View style={{ width: "34%" }}>
                <Text
                  style={[
                    styles.text400Nero10,
                    { color: colors.dolphin, fontStyle: "italic" },
                  ]}
                  text={
                    item.saleUom?.name +
                    " = " +
                    item?.conversionRate +
                    " " +
                    item.uomName
                  }
                  numberOfLines={1}
                />
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                opacity: item.quantityInventory < item.minQuantity ? 0.5 : 1,
                width: "60%",
              }}>
              <Text
                style={[
                  styles.text400Nero10,
                  { marginRight: scaleWidth(6), width: "22%" },
                ]}
                tx={"order.quanlity"}
              />
              <View style={[styles.viewAmount, { width: "30%" }]}>
                <TouchableOpacity
                  disabled={item.amount === 0 ? true : false}
                  onPress={() => handleMinus(item)}
                  style={{
                    width: "25%",
                    alignItems: "center",
                    opacity: item.amount === 0 ? 0.5 : 1,
                  }}>
                  <Svgs.icon_minus />
                </TouchableOpacity>
                <Text style={{ width: "50%", textAlign: "center" }}>
                  {item.amount}
                </Text>
                <TouchableOpacity
                  disabled={
                    item.amount === item.quantityInventory ? true : false
                  }
                  onPress={() => handlePlus(item)}
                  style={{
                    width: "25%",
                    alignItems: "center",
                    opacity: item.amount === item.quantityInventory ? 0.5 : 1,
                  }}>
                  <Svgs.icon_plusGreen />
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  text={item.uomGroup.uomOriginName}
                  style={[styles.text400Nero10, { marginLeft: scaleWidth(6) }]}
                  numberOfLines={1}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "10%",
              }}>
              <Text style={styles.text400Nero10} tx={"order.still"} />
              <Text
                style={[
                  styles.text400Nero10,
                  {
                    color: colors.palette.dolphin,
                    fontStyle: "italic",
                    marginRight: scaleWidth(2),
                  },
                ]}
                text={item.quantityInventory.toString()}
              />
              <Text
                style={[
                  styles.text400Nero10,
                  { color: colors.palette.dolphin },
                ]}
                text={item.uomGroup.uomOriginName}
                numberOfLines={1}
              />
            </View>
          </View>
          {item.isSelect === true ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: scaleHeight(3),
              }}>
              {item.unitPrice !== undefined && check === false ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "40%",
                  }}>
                  <Text style={styles.text400Nero10} tx={"order.price2"} />
                  <Text
                    style={styles.textPriceInput}
                    text={formatVND(
                      formatCurrency(commasToDots(item.unitPrice))
                    )}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      // setValue(`price.${item.id}.price`, formatCurrency(removeNonNumeric(item.unitPrice)).toString())
                      console.log("first price", item.unitPrice);
                      setCheck(true);
                    }}>
                    <Svgs.icon_edit />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    // backgroundColor: 'red',
                    paddingRight: scaleWidth(20),
                    paddingBottom: scaleHeight(5),
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setModalPrice(true);
                    setPriceId(item.id);
                  }}>
                  <Text style={{ fontSize: fontSize.size12 }}>Nhập giá</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: scaleHeight(17.52),
                marginTop: scaleHeight(3),
              }}></View>
          )}
        </View>
        <Modal
          style={styles.viewModal}
          isVisible={isModal}
          onBackdropPress={() => setIsModal(false)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: scaleWidth(16),
              marginVertical: scaleHeight(20),
            }}>
            <Text
              tx={"order.orderUnit"}
              style={{
                fontWeight: "600",
                fontSize: fontSize.size16,
                lineHeight: scaleHeight(19.36),
                color: colors.nero,
                flex: 1,
              }}
            />
            <TouchableOpacity onPress={() => setIsModal(false)}>
              <Svgs.icon_deleteDolphin />
            </TouchableOpacity>
          </View>
          <InputSelect
            arrData={arrData}
            onPressChoice={(items: any) => {
              setUom({
                label: items.label,
                id: items.id,
                conversionRate: items.conversionRate,
              });
            }}
            styleView={{ marginHorizontal: scaleWidth(16) }}
            dataDefault={uom.label}
            titleTx={"productScreen.select_unit"}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: scaleWidth(16),
              marginTop: scaleHeight(8),
              marginBottom: scaleHeight(20),
            }}>
            <Text
              style={[styles.text400Nero12, { color: colors.dolphin }]}
              tx={"order.conversionRate"}
            />
            <Text
              style={[styles.text400Nero12, { color: colors.navyBlue }]}
              text={
                " 1 " +
                uom.label +
                " = " +
                uom.conversionRate +
                " " +
                item.uomGroup.uomOriginName
              }
            />
          </View>
          <TouchableOpacity
            style={{
              marginBottom: scaleHeight(20),
              marginHorizontal: scaleWidth(16),
              justifyContent: "center",
              alignItems: "center",
              height: scaleHeight(48),
              backgroundColor: colors.navyBlue,
              borderRadius: 8,
            }}
            onPress={() => {
              item.saleUom = { name: uom.label, id: uom.id };
              item.conversionRate = uom.conversionRate;
              setIsModal(false);
              console.log(item);
            }}>
            <Text
              tx={"common.confirm"}
              style={{
                color: colors.textWhite,
                fontWeight: "600",
                fontSize: fontSize.size14,
                lineHeight: scaleHeight(24),
              }}
            />
          </TouchableOpacity>
        </Modal>
        <PriceModal
          isVisible={modalPrice}
          setIsVisible={() => setModalPrice(false)}
          // title={"productDetail.retailPrice"}
          onCancel={() => {
            setModalPrice(false);
          }}
          id={priceId}
          onConfirm={(data) => {
            changeText(item, data);
            setModalPrice(false);
            setCheck(false);
          }}
          titleTx={"selectPriceListApply.inputPrice"}
          placeholder="Nhập giá"
          titleInputTx={"productScreen.priceProduct"}
          rightText={vendorStore.companyInfo.symbol}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  ROOT: {
    alignItems: "center",
    backgroundColor: colors.palette.aliceBlue,
    paddingHorizontal: scaleWidth(6),
    flexDirection: "row",
    paddingVertical: scaleHeight(10),
    borderRadius: 8,
    marginBottom: scaleHeight(15),
    borderWidth: scaleHeight(1),
  },
  viewImageBackground: {
    width: scaleWidth(50),
    height: scaleHeight(50),
    marginRight: scaleWidth(6),
  },
  viewFastImage: {
    width: scaleWidth(107),
    height: scaleHeight(50),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  viewModal: {
    backgroundColor: colors.textWhite,
    maxHeight: Dimensions.get("screen").height * 0.4,
    minHeight: Dimensions.get("screen").height * 0.1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  viewAmount: {
    // marginLeft: scaleWidth(margin.margin_12),
    marginTop: scaleHeight(2),
    flexDirection: "row",
    backgroundColor: colors.palette.white,
    alignItems: "center",
    paddingVertical: scaleHeight(3),
    borderRadius: 8,
    width: "25%",
  },
  viewLine: {
    height: scaleHeight(1),
    backgroundColor: colors.palette.ghostWhite2,
    marginTop: scaleHeight(10),
  },
  viewTextInput: {
    width: (Dimensions.get("screen").width - scaleWidth(64)) * 0.5,
    padding: 0,
    fontSize: fontSize.size10,
  },
  text400Nero12: {
    fontWeight: "400",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(14.52),
    color: colors.nero,
  },
  text400Nero10: {
    fontWeight: "400",
    fontSize: fontSize.size10,
    lineHeight: scaleHeight(12.1),
    color: colors.nero,
  },
  text400Nero8: {
    fontWeight: "400",
    fontSize: fontSize.size8,
    lineHeight: scaleHeight(9.68),
    color: colors.palette.radicalRed,
  },
  textName: {
    fontWeight: "500",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(14.52),
    width: "76%",
  },
  textPriceInput: {
    fontWeight: "600",
    fontSize: fontSize.size10,
    lineHeight: scaleHeight(12.1),
    color: colors.palette.radicalRed,
  },
});
