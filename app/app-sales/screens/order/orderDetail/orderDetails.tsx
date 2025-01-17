import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import Images from "../../../../../assets/index";
import { Svgs } from "../../../../../assets/svgs";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../../app-purchase/theme";
import { Button, Header, Text } from "../../../../components";
import { PlaceholderOrder } from "../../../../components/custom-placeholder/placeholder-detail/placeholder-order";
import { ALERT_TYPE, Dialog } from "../../../../components/dialog-notification";
import { translate } from "../../../../i18n";
import { useStores } from "../../../models";
import { formatDateTime } from "../../../utils/formatDate";
import {
  calculateTotalDiscount,
  calculateTotalPrice,
  calculateTotalUnitPrice,
  commasToDots,
  formatCurrency,
  formatVND,
} from "../../../utils/validate";
import ItemOrder from "../components/item-order";
import { styles } from "./styles";

export const OrderDetails: FC = observer(function OrderDetails(props) {
  const navigation = useNavigation();
  const { orderStore } = useStores();
  const { orderId } = orderStore;
  const [data, setData] = useState<any>([]);
  const [dataPayment, setDataPayment] = useState<any>([]);
  const [stateAllow, setStateAllow] = useState<any>(false);
  const [invoiceId, setInvoiceId] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleGetDetailInvoice = async (id: any) => {
    try {
      const response = await orderStore.getDetailInvoice(id);
      if (response && response.kind === "ok") {
        const data = response.response.data;
        console.log("dataDetailInvoice", JSON.stringify(data));
        setDataPayment(data);
      } else {
        console.error("Failed to fetch Detail Invoice:", response);
      }
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };
  const handleGetDetailOrder = async () => {
    try {
      const response = await orderStore.getDetailOrder(orderId, false);
      console.log("productId", orderId);
      if (response && response.kind === "ok") {
        const data: any = response.response.data;
        console.log("dataDetaillll", JSON.stringify(data));
        setData(data);
        setInvoiceId(data.invoiceIds[0]);
        await handleGetDetailInvoice(data.invoiceIds[0]);
        console.log("zzzzzzzzzzzzzzz", data.invoiceIds[0]);
      } else {
        console.error("Failed to fetch detail:", response);
      }
    } catch (error) {
      console.error("Error fetching detail:", error);
    } finally {
      setIsLoading(false); // Stop loading when data is fetched
    }
  };
  const handleGetStateAllow = async () => {
    try {
      const response: any = await orderStore.stateAllow(orderId);
      console.log("zzzzzzzzzzzzz", response);
      if (response && response.kind === "ok") {
        const data = response.result.data;
        console.log("dataStateAllow", JSON.stringify(data));
        setStateAllow(data);
      } else {
        console.error("Failed to fetch State:", response);
      }
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };
  const cancelOrder = async () => {
    const result: any = await orderStore.cancelOrder(orderId);
    console.log("//////////", result);
    if (result.kind === "ok") {
      console.log("Xoá danh mục thành công", result.response);
      Dialog.show({
        title: translate("txtDialog.txt_title_dialog"),
        textBody: result.result.message,
        button2: translate("common.ok"),
        onPressButton: () => {
          orderStore.setIsReload(true);
          navigation.goBack();
          Dialog.hide();
        },
        closeOnOverlayTap: false,
      });
    } else {
      Dialog.show({
        // type: ALERT_TYPE.DANGER,
        title: translate("txtDialog.txt_title_dialog"),
        textBody: result.result.errorCodes[0].message,
        button: translate("common.ok"),
        closeOnOverlayTap: false,
      });
      console.log("Xoá danh mục thất bại", result.result.errorCodes[0].message);
    }
  };
  useEffect(() => {
    // handleGetDetailOrder();
    handleGetStateAllow();
  }, [orderId]);
  useEffect(() => {
    console.log("---------useEffect---------reload------------------");
    const unsubscribe = navigation.addListener("focus", () => {
      handleGetDetailOrder();
    });
    return unsubscribe;
  }, [navigation]);
  const dataStatus = [
    { status: "Chờ lấy hàng", complete: true },
    { status: "Đã lấy hàng", complete: true },
    { status: "Đang vận chuyển", complete: true },
    { status: "Đã giao thành công", complete: false },
  ];
  const OrderStatusItem = ({ item, isLastStep }: any) => {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          paddingVertical: scaleHeight(12),
        }}>
        <View style={{}}>
          {item.complete ? (
            <Svgs.icon_checkGreen
              width={scaleWidth(13)}
              height={scaleHeight(13)}
            />
          ) : (
            <View
              style={{
                width: scaleWidth(13),
                height: scaleHeight(13),
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Svgs.ic_dot width={scaleWidth(5)} height={scaleHeight(5)} />
            </View>
          )}
        </View>
        <Text
          style={{
            fontSize: fontSize.size10,
            width: scaleWidth(70),
            textAlign: "center",
            paddingTop: scaleHeight(5),
          }}>
          {item.status}
        </Text>
        {/* {!isFirstStep && <View style={styles.leftBar} />} */}
        {!isLastStep && <View style={styles.rightBar} />}
      </View>
    );
  };
  function getInvoiceStateText(state: string) {
    if (state === "NOT_PAYMENT") {
      return "orderDetailScreen.no";
    } else if (state === "REVERSE") {
      return "orderDetailScreen.toInvoice";
    } else if (state === "PARTIAL_PAYMENT") {
      return "orderDetailScreen.partialInvoice";
    } else if (state === "PAID") {
      return "orderDetailScreen.invoiced";
    } else {
      return "";
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <Header
        type={"AntDesign"}
        LeftIcon={Svgs.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerTx={"order.orderDetail"}
        RightIcon1={Svgs.icon_copy}
        TitleIcon1="order.copy"
        RightIcon={stateAllow.isAllowCancel ? Svgs.icon_editWhite : null}
        TitleIcon="common.edit"
        // RightIcon2={Images.icon_printer}
        // TitleIcon2="order.printInvoice"
        // onRightPress2={() => navigation.navigate('printInvoiceScreen' as never, { invoiceId: invoiceId })}
        btnRightStyle={{ marginRight: scaleWidth(3), width: scaleWidth(40) }}
        onRightPress1={() => {
          navigation.navigate({
            name: "newAndEditOrder",
            params: { newData: data, screen: "copy" },
          } as never);
          orderStore.setCheckRenderList(true);
        }}
        onRightPress={() => {
          navigation.navigate({
            name: "newAndEditOrder",
            params: { newData: data, screen: "edit" },
          } as never);
          orderStore.setCheckRenderList(true);
        }}
        titleMiddleStyle={styles.titleHeader}
        widthRightIcon={20}
        heightRightIcon={20}
        style={{ height: scaleHeight(54) }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.viewScrollView}>
        {isLoading ? (
          <PlaceholderOrder />
        ) : (
          <>
            <View style={styles.viewCode}>
              <View style={styles.viewContentCode}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text text={data?.code} style={styles.textListProduct} />
                  </View>
                  <View
                    style={[
                      styles.viewStatus,
                      {
                        backgroundColor:
                          data.state === "SALE"
                            ? colors.palette.solitude
                            : data.state === "SENT"
                              ? colors.palette.floralWhite
                              : data.state === "CANCEL"
                                ? colors.palette.amour
                                : data.state === "DONE"
                                  ? colors.palette.mintCream
                                  : "",
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textStatus,
                        {
                          color:
                            data.state === "SALE"
                              ? colors.palette.metallicBlue
                              : data.state === "SENT"
                                ? colors.palette.yellow
                                : data.state === "CANCEL"
                                  ? colors.palette.radicalRed
                                  : data.state === "DONE"
                                    ? colors.palette.malachite
                                    : "",
                        },
                      ]}
                      tx={
                        data.state === "SENT"
                          ? "orderDetailScreen.sent"
                          : data.state === "SALE"
                            ? "orderDetailScreen.sale"
                            : data.state === "DONE"
                              ? "orderDetailScreen.done"
                              : data.state === "CANCEL"
                                ? "orderDetailScreen.cancel"
                                : null
                      }
                    />
                  </View>
                </View>
                <Text
                  text={formatDateTime(data?.orderDate)}
                  style={styles.textContent}
                />
              </View>
              <View style={styles.viewLine} />
              <View
                style={{
                  marginVertical: scaleHeight(margin.margin_12),
                  marginHorizontal: scaleWidth(margin.margin_16),
                }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      text={formatVND(
                        formatCurrency(commasToDots(data?.totalPrice))
                      )}
                    />
                  </View>
                  {data.state !== "CANCEL" ? (
                    <Button
                      tx={
                        dataPayment.isWithInvoice
                          ? "order.showInvoiceDetail"
                          : "order.sendInvoice"
                      } // Conditional text
                      // tx='order.sendInvoice' // Conditional text
                      onPress={() => {
                        if (dataPayment.isWithInvoice) {
                          navigation.navigate({
                            name: "printInvoiceScreen",
                            params: { invoiceId: invoiceId },
                          } as never); // Pass the first invoice ID
                        } else {
                          navigation.navigate("newInvoice" as never);
                        }
                      }}
                      style={styles.buttonSend}
                    />
                  ) : null}
                </View>
                <Text
                  tx={getInvoiceStateText(data.paymentStatus)}
                  style={[
                    styles.textPayStatus2,
                    {
                      color:
                        data.paymentStatus === "NOT_PAYMENT"
                          ? colors.palette.darkTangerine
                          : data.paymentStatus === "PARTIAL_PAYMENT"
                            ? colors.palette.malachite
                            : data.paymentStatus === "PAID"
                              ? colors.palette.malachite
                              : colors.palette.malachite,
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.viewName}>
              <View style={styles.viewImageName}>
                <ImageBackground
                  style={{ width: scaleWidth(32), height: scaleHeight(32) }}
                  imageStyle={{
                    borderRadius: 16,
                  }}
                  source={Images.noImages}>
                  <FastImage
                    style={{
                      width: scaleWidth(32),
                      height: scaleHeight(32),
                    }}
                    source={{
                      uri: data?.partner?.avatarUrl,
                      cache: FastImage.cacheControl.immutable,
                    }}
                    defaultSource={Images.noImages}
                  />
                </ImageBackground>
              </View>
              <View>
                <Text text={data?.partner?.name} style={styles.textListProduct} />
              </View>
              {/* <TouchableOpacity>
                            <Images.icon_copy2 style={{ marginLeft: scaleWidth(margin.margin_4) }} />
                        </TouchableOpacity> */}
            </View>
            <View style={styles.viewAddress}>
              <View>
                <Text tx={"order.deliveryAddress"} style={styles.textListProduct} />
                <View style={{ marginTop: scaleHeight(margin.margin_15) }}>
                  <Text
                    text={data?.partner?.name}
                    style={[
                      styles.textMoney2,
                      {
                        lineHeight: scaleHeight(14.52),
                        marginBottom: scaleHeight(margin.margin_8),
                      },
                    ]}
                  />
                  <Text
                    text={data.deliveryAddress?.phoneNumber}
                    style={[
                      styles.textMoney2,
                      {
                        lineHeight: scaleHeight(14.52),
                        marginBottom: scaleHeight(margin.margin_8),
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.textMoney2,
                      {
                        lineHeight: scaleHeight(14.52),
                        marginBottom: scaleHeight(margin.margin_8),
                      },
                    ]}>
                    {data.deliveryAddress?.address
                      ? data.deliveryAddress.address + ", "
                      : ""}
                    {data.deliveryAddress?.ward?.name
                      ? data.deliveryAddress.ward.name + ", "
                      : ""}
                    {data.deliveryAddress?.district?.name
                      ? data.deliveryAddress.district.name + ", "
                      : ""}
                    {data.deliveryAddress?.city?.name
                      ? data.deliveryAddress.city.name
                      : ""}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                borderRadius: 8,
                backgroundColor: colors.palette.neutral100,
              }}>
              {data.saleOrderLines?.map((item: any) => {
                return (
                  <TouchableOpacity
                    onPress={() => { }}
                    style={styles.viewItemListProduct}>
                    <ImageBackground
                      style={{
                        width: scaleWidth(48),
                        height: scaleHeight(48),
                        marginRight: scaleWidth(10),
                      }}
                      imageStyle={{
                        borderRadius: 16,
                      }}
                      source={Images.noImages}>
                      <FastImage
                        style={{
                          width: scaleWidth(48),
                          height: scaleHeight(48),
                          borderRadius: 16,
                        }}
                        source={{
                          uri: `${item.productInfo?.productImage ?? ""}`,
                          cache: FastImage.cacheControl.immutable,
                        }}
                        defaultSource={Images.noImages}
                      />
                    </ImageBackground>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          width: (Dimensions.get("screen").width - 64) * 0.45,
                        }}>
                        <Text
                          text={item.productInfo?.name}
                          style={styles.textListProduct}
                        />
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          text="SL: "
                          style={[
                            styles.textContent,
                            { fontSize: fontSize.size12 },
                          ]}
                        />
                        <Text text={item.quantity} style={styles.textListProduct} />
                        <Text
                          text={item.productInfo?.uomName}
                          style={[styles.textListProduct, { marginLeft: 2 }]}
                        />
                      </View>
                    </View>
                    {item.discount !== 0 ? (
                      <View>
                        <Text
                          text={formatVND(
                            formatCurrency(commasToDots(item.amountUntaxed))
                          )}
                          style={styles.textListProduct}
                        />
                        <Text
                          text={formatVND(
                            formatCurrency(
                              commasToDots(
                                calculateTotalUnitPrice(
                                  item.unitPrice,
                                  item.quantity
                                )
                              )
                            )
                          )}
                          style={styles.priceOriginal}
                        />
                      </View>
                    ) : (
                      <View>
                        <Text
                          text={formatVND(
                            formatCurrency(
                              commasToDots(
                                calculateTotalUnitPrice(
                                  item.unitPrice,
                                  item.quantity
                                )
                              )
                            )
                          )}
                          style={[
                            styles.priceOriginal,
                            {
                              textDecorationLine: "none",
                              color: colors.palette.nero,
                              fontWeight: "600",
                            },
                          ]}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
            <ItemOrder
              money={calculateTotalPrice(data.saleOrderLines)}
              // totalTax={formatCurrency(data.computeTaxInfo?.taxLines?.[0]?.amount)}
              discount={calculateTotalDiscount(data.saleOrderLines)}
              totalAmount={data?.totalPrice}
              // weight={data?.weight}
              // payStatus={data?.payStatus}
              dataTax={data.computeTaxInfo?.taxLines}
              styleViewItemOrder={{
                marginTop: scaleHeight(15),
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <View style={styles.viewDateMoney}>
              <Text
                tx={"order.sellerConfirm"}
                style={[styles.textDateMoney, { flex: 1 }]}
              />
              <Text
                tx={getInvoiceStateText(data.paymentStatus)}
                style={[
                  styles.textPayStatus2,
                  {
                    color:
                      data.paymentStatus === "NOT_PAYMENT"
                        ? colors.palette.darkTangerine
                        : data.paymentStatus === "PARTIAL_PAYMENT"
                          ? colors.palette.malachite
                          : data.paymentStatus === "PAID"
                            ? colors.palette.malachite
                            : colors.palette.malachite,
                  },
                ]}
              />
            </View>
            {dataPayment?.paymentResponses?.length > 0 ||
              data.paymentMethod == "DEDUCTION_OF_LIABILITIES" ? (
              <View style={styles.viewCash}>
                {dataPayment?.paymentResponses?.length > 0 ? (
                  <View>
                    {dataPayment.paymentResponses?.map((item: any) => (
                      <View>
                        <View
                          style={[
                            styles.viewStatus,
                            {
                              backgroundColor: colors.palette.mintCream,
                              width: scaleWidth(75),
                              alignItems: "center",
                              paddingVertical: scaleHeight(2),
                              // paddingHorizontal : scaleHeight(6),
                            },
                          ]}>
                          <Text
                            style={[
                              styles.textStatus,
                              {
                                color: colors.palette.malachite,
                              },
                            ]}
                            tx={"orderDetailScreen.invoiced"}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: scaleHeight(margin.margin_15),
                          }}>
                          <View
                            style={{
                              width: (Dimensions.get("screen").width - 64) * 0.2,
                            }}>
                            <Text
                              text={item.timePayment}
                              style={styles.textContent}
                            />
                          </View>
                          <View style={styles.viewLineCash}>
                            <Svgs.icon_ellipse />
                          </View>
                          <View style={styles.viewTextCash}>
                            <Text
                              tx={
                                item.paymentPopUpResponse?.paymentMethod === "CASH"
                                  ? "orderDetailScreen.cash"
                                  : ""
                              }
                              style={[styles.textContent, { flex: 1 }]}
                            />
                            <Text
                              text={formatVND(
                                formatCurrency(commasToDots(item.amount))
                              )}
                            />
                          </View>
                        </View>
                      </View>
                    ))}
                    {(data.paymentMethod == "DEDUCTION_OF_LIABILITIES" &&
                      data.debtAmount > 0) ||
                      dataPayment.moneyPaid == 0 ? null : (
                      <View>
                        <View style={{ margin: 0 }}>
                          <Text
                            style={[
                              styles.textStatus,
                              {
                                color: colors.palette.yellow,
                                width: scaleWidth(50),
                                // padding : 0,
                                paddingVertical: scaleHeight(2),
                                textAlign: "center",
                                backgroundColor: colors.palette.yallowExDG,
                              },
                            ]}
                            tx={"orderDetailScreen.outstanding"}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: scaleHeight(margin.margin_15),
                          }}>
                          <View
                            style={{
                              width: (Dimensions.get("screen").width - 64) * 0.2,
                            }}>
                            <Text
                              text={
                                dataPayment.paymentResponses[
                                  dataPayment.paymentResponses.length - 1
                                ]?.timePayment
                              }
                              style={styles.textContent}
                            />
                          </View>
                          <View style={styles.viewLineCash}>
                            <Svgs.icon_ellipse />
                          </View>
                          <View style={[styles.viewTextCash]}>
                            <Text
                              tx={
                                dataPayment.paymentMethod === "CASH"
                                  ? "orderDetailScreen.cash"
                                  : ""
                              }
                              style={[styles.textContent, { flex: 1 }]}
                            />
                            <Text
                              text={formatVND(
                                formatCurrency(commasToDots(dataPayment.moneyPaid))
                              )}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                ) : null}
                {data.paymentMethod == "DEDUCTION_OF_LIABILITIES" &&
                  data.debtAmount > 0 ? (
                  <View>
                    <View style={[styles.viewStatus]}>
                      <Text
                        style={[
                          styles.textStatus,
                          {
                            color: colors.palette.yellow,
                            width: scaleWidth(50),
                            paddingVertical: scaleHeight(2),
                            textAlign: "center",
                            backgroundColor: colors.palette.yallowExDG,
                          },
                        ]}
                        tx={"orderDetailScreen.outstanding"}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: scaleHeight(margin.margin_15),
                      }}>
                      <View
                        style={{
                          width: (Dimensions.get("screen").width - 64) * 0.2,
                        }}>
                        <Text
                          text={moment(data?.orderDate).format("YYYY-MM-DD")}
                          style={styles.textContent}
                        />
                      </View>
                      <View style={styles.viewLineCash}>
                        <Svgs.icon_ellipse />
                      </View>
                      <View style={styles.viewTextCash}>
                        <Text
                          tx={"orderDetailScreen.debt"}
                          style={[styles.textContent, { flex: 1 }]}
                        />
                        <Text
                          text={formatVND(
                            formatCurrency(commasToDots(data.debtAmount))
                          )}
                        />
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            ) : null}
            <TouchableOpacity
              onPress={() => navigation.navigate("orderTracking" as never)}
              style={{
                paddingHorizontal: scaleWidth(padding.padding_16),
                backgroundColor: colors.palette.neutral100,
                // backgroundColor : 'red' ,
                paddingVertical: scaleHeight(padding.padding_12),
                borderRadius: 8,
                marginBottom: scaleHeight(margin.margin_20),
                alignItems: "center",
                // flexDirection: 'row'
              }}>
              <View style={{ flexDirection: "row" }}>
                {dataStatus.map((item, index) => (
                  <OrderStatusItem
                    key={item.status}
                    item={item}
                    isFirstStep={index === 0}
                    isLastStep={index === dataStatus.length - 1}
                  />
                ))}
              </View>
            </TouchableOpacity>
            <Button
              tx={"order.return"}
              style={[
                styles.viewButton,
                !stateAllow.isAllowCancel && { opacity: 0.5 },
              ]}
              textStyle={styles.textButton}
              disabled={!stateAllow.isAllowCancel}
              onPress={() => {
                Dialog.show({
                  type: ALERT_TYPE.SUCCESS,
                  title: translate("txtDialog.txt_title_dialog"),
                  textBody:
                    translate("txtDialog.delete_order") +
                    `${data?.code}` +
                    " " +
                    translate("txtDialog.delete_order1"),
                  button: translate("common.cancel"),
                  button2: translate("common.confirm"),
                  closeOnOverlayTap: false,
                  onPressButton: async () => {
                    await cancelOrder();

                    // Dialog.hide();
                  },
                });
              }}
            // onPress={}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
});
