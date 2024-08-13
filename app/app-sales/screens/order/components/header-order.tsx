import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Svgs } from "../../../../../assets/svgs";
import { Text } from "../../../../components";
import { useNavigation } from "@react-navigation/native";
import { OnProgressEvent } from "react-native-fast-image";
import { Root1 } from "../../../models/order-store/entities/order-address-model";
import { useStores } from "../../../models";
import { commasToDots, formatCurrency, formatVND } from "../../../utils/validate";
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../../theme";
import { translate } from "../../../../i18n";
import { ModalPayment } from "./modal-payment-method";
import { methodData } from "../new-order/data";
interface InputData {
  openDialog: () => void;
  data: any;
  disabled?: boolean;
}
interface AddressData {
  onPressAddress: () => void;
  // data: Root1;
  addressDefault?: any
  addressIdDefault?: any
}
interface PriceData {
  id: number;
  name: string;
  priceListCategory: string;
  currencyId: number;
  pricelistId: number;
  disabled?: boolean;
}
export const HeaderOrder = (data: InputData) => {
  console.log(data);
  return (
    <TouchableOpacity
      disabled={data.disabled}
      onPress={() => {
        data.openDialog();
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          paddingHorizontal: scaleWidth(16),
          paddingVertical: scaleWidth(12),
          borderRadius: 8,
          justifyContent: "space-between",
          marginTop: scaleWidth(20),
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
          }}>
          <Svgs.ic_avatar_order />
          {data.data.name !== "" ? (
            <Text
              text={data.data.name}
              style={{
                marginLeft: margin.margin_8,
                color: colors.nero,
                fontSize: fontSize.size12,
                fontWeight: "600",
              }}></Text>
          ) : (
            <Text
              tx="order.choose_customer"
              style={{
                marginLeft: margin.margin_8,
                color: colors.dolphin,
                fontSize: fontSize.size12,
                fontWeight: "400",
              }}></Text>
          )}
        </View>
        {data.disabled === true ? null :
          <Svgs.icon_caretRight2 />
        }
      </View>
    </TouchableOpacity>
  );
};

export const PriceList = (data: PriceData) => {
  const navigation = useNavigation();
  console.log("price", Number(data.id));
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: scaleWidth(16),
        paddingVertical: scaleWidth(12),
        borderRadius: 8,
        justifyContent: "space-between",
      }}
      disabled={data.disabled}
      onPress={() => navigation.navigate("selectApplicablePriceList" as never)}>
      <View
        style={{
          flexDirection: "column",
        }}>
        <Text
          tx="order.price_list"
          style={{
            fontSize: fontSize.size12,
            color: colors.nero,
            fontWeight: "600",
            marginBottom: scaleWidth(4),
          }}></Text>
        {Number(data.id) !== 0 || data.name !== "" ? (
          <Text
            text={data.name}
            style={{
              fontSize: fontSize.size10,
              color: colors.dolphin,
              fontWeight: "400",
            }}></Text>
        ) : (
          <Text
            tx="order.no_price_list"
            style={{
              fontSize: fontSize.size10,
              color: colors.dolphin,
              fontWeight: "400",
            }}></Text>
        )}
      </View>
      {data.disabled === true ? null : <Svgs.icon_caretRight2 />}
    </TouchableOpacity>
  );
};

export const AddressOrder = (data: AddressData) => {
  const navigation = useNavigation();
  const { orderStore } = useStores()
  const [address, setAddress] = useState(orderStore.dataAddress);

  const getListAddress = async () => {
    if (
      orderStore.dataClientSelect.id == undefined ||
      Number(orderStore.dataClientSelect.id) == 0
    ) {
      return;
    }
    try {
      const response = await orderStore.getListAddress(
        Number(orderStore.dataClientSelect.id)
      );
      orderStore.setCheckIdPartner(false);
      if (response && response.kind === "ok") {
        console.log(
          "getListAddress---------------------",
          JSON.stringify(response.response.data)
        );
        const newArr = response.response.data;
        const newData = newArr.filter((item: any) => item.isDefault === true);
        if (newData.length !== 0) {
          orderStore.setDataAddress(newData[0]);
          setAddress(newData[0]);
        } else {
          setAddress({
            id: 0,
            partnerId: 0,
            phoneNumber: "",
            addressType: "",
            country: { id: 0, name: "" },
            region: { id: 0, name: "" },
            city: { id: 0, name: "" },
            district: { id: 0, name: "" },
            ward: { id: 0, name: "" },
            address: "",
            isDefault: false,
          } as any);
          orderStore.setDataAddress({
            id: 0,
            partnerId: 0,
            phoneNumber: "",
            addressType: "",
            country: { id: 0, name: "" },
            region: { id: 0, name: "" },
            city: { id: 0, name: "" },
            district: { id: 0, name: "" },
            ward: { id: 0, name: "" },
            address: "",
            isDefault: false,
          });
        }
      } else {
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (orderStore.checkRenderList === true) {
        if (data.addressIdDefault !== null) {
          setAddress(data.addressDefault);
        } else {
          setAddress(orderStore.dataAddress);
        }
      } else {
        if (
          orderStore.dataAddress.id === 0 ||
          orderStore.checkIdPartner === true
        ) {
          getListAddress();
        }
        setAddress(orderStore.dataAddress);
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <TouchableOpacity
      onPress={() => data.onPressAddress()}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          paddingHorizontal: scaleWidth(16),
          paddingVertical: scaleWidth(12),
          borderRadius: 8,
          justifyContent: "space-between",
          marginVertical: scaleHeight(15),
        }}>
        <View
          style={{
            flexDirection: "column",
          }}>
          <Text
            tx="order.address_order"
            style={{
              fontSize: fontSize.size12,
              color: colors.nero,
              fontWeight: "600",
              marginBottom: scaleWidth(4),
            }}></Text>
          {address.id !== 0 ? (
            <View>
              {/* <Text
                style={{
                  fontSize: 12,
                  color: colors.nero,
                  fontWeight: "400",
                }}></Text> */}
              {address.phoneNumber != null ? (
                <Text
                  text={address?.phoneNumber ?? ""}
                  style={{
                    marginVertical: scaleHeight(8),
                    fontSize: fontSize.size12,
                    color: colors.nero,
                    fontWeight: "400",
                  }}></Text>
              ) : null}

              <Text
                text={`${address?.address}${", "}${address?.ward?.name}${", "}${address?.district?.name}${", "}${address?.city?.name}`}
                style={{
                  fontSize: fontSize.size12,
                  color: colors.nero,
                  fontWeight: "400",
                }}></Text>
            </View>
          ) : (
            <Text
              tx="order.no_address_order"
              style={{
                fontSize: fontSize.size10,
                color: colors.dolphin,
                fontWeight: "400",
              }}></Text>
          )}
        </View>
        <Svgs.icon_caretRight2 />
      </View>
    </TouchableOpacity>
  );
};

interface DataSumMoney {
  arrVat: any;
  sumNoVat: any;
  sumVat: any;
  discount: any;
}

function groupTaxValues(dataTax: any[] | undefined) {
  if (dataTax === undefined) {
    return [];
  }
  const groupedTaxValues = dataTax.reduce((acc: { [x: string]: { label: any; value: any; taxValue: any; }; }, product: { VAT: { value: any; label: any; }; taxValue: any; }) => {
    console.log('------------groupedTaxValues----------', JSON.stringify(product));
    if (!product.VAT) {
      return acc; // Bỏ qua nếu VAT không tồn tại
    }
    const vatValue = product.VAT.value;
    if (acc[vatValue]) {
      acc[vatValue].taxValue += product.taxValue;
    } else {
      acc[vatValue] = {
        label: product.VAT?.label,
        value: vatValue,
        taxValue: product.taxValue
      };
    }
    return acc;
  }, {});

  return Object.values(groupedTaxValues);
}

export const SumMoney = (props: DataSumMoney) => {
  const { orderStore } = useStores()
  // Sử dụng useMemo để ghi nhớ kết quả của các phép tính
  const total = useMemo(() => {
    return props.arrVat.reduce((accumulator: number, currentObject: { unitPrice: any; amount: any; taxesInput: any; taxValue: any; }) => {
      return accumulator + ((Number(currentObject.unitPrice ?? 0) * Number(currentObject.amount ?? 0)) - ((Number(currentObject.taxesInput ?? 0) / 100) * (Number(currentObject.unitPrice ?? 0) * Number(currentObject.amount ?? 0))) + Number(currentObject.taxValue ?? 0));
    }, 0);
  }, [props.arrVat]);

  const discount = useMemo(() => {
    return props.arrVat.reduce((accumulator: number, currentObject: { taxesInput: any; unitPrice: any; amount: any; }) => {
      return accumulator + ((Number(currentObject.taxesInput ?? 0) / 100) * (Number(currentObject.unitPrice ?? 0) * Number(currentObject.amount ?? 0)));
    }, 0);
  }, [props.arrVat]);

  useEffect(() => {
    orderStore.setDataProductAddOrder(props.arrVat.slice());
  }, [props.arrVat, orderStore]);


  return (
    <View
      style={{
        paddingHorizontal: scaleWidth(16),
        paddingVertical: scaleHeight(12),
        // flexDirection: "row",
        borderRadius: 8,
        backgroundColor: "white",
        justifyContent: "space-between",
        marginVertical: scaleHeight(15),
      }}>


      <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Text
          tx="order.sum_no_texas"
          style={{ fontSize: fontSize.size10, fontWeight: "400", color: colors.dolphin }} />
        <Text style={{ fontSize: fontSize.size10, fontWeight: "400", color: colors.dolphin, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          {formatVND(formatCurrency(commasToDots(props.sumNoVat))) ?? 0}
        </Text>
      </View>

      {groupTaxValues(props.arrVat)?.map((data: any) => {
        return data.taxValue != undefined ? (
          <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: fontSize.size10,
                fontWeight: "400",
                color: colors.dolphin,
                marginTop: 8,
              }}>
              {data?.label ?? null}
            </Text>
            <Text
              style={{
                fontSize: fontSize.size10,
                fontWeight: "400",
                color: colors.dolphin,
                marginTop: 8,
              }}>
              {formatVND(formatCurrency(commasToDots(data?.taxValue))) ?? null}
            </Text>
          </View>
        ) : null;
      })}

      {orderStore.checkPriceList === false ?
        (
          <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text
              tx="order.discount"
              style={{
                fontSize: fontSize.size10,
                fontWeight: "400",
                color: colors.dolphin,
                marginTop: scaleWidth(8),
              }} />
            <Text
              style={{
                fontSize: fontSize.size10,
                fontWeight: "400",
                color: colors.dolphin,
                marginTop: scaleWidth(8),
              }}>
              {formatVND(formatCurrency(commasToDots(discount))) ?? 0}
            </Text>
          </View>
        ) : null}
      <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Text
          tx="order.sum_yes_texas"
          style={{
            fontSize: fontSize.size10,
            fontWeight: "400",
            color: colors.dolphin,
            marginTop: scaleWidth(8),
          }} />
        <Text
          style={{
            fontSize: fontSize.size12,
            fontWeight: "600",
            color: "#FF4956",
            marginTop: margin.margin_8,
          }}>
          {/* {(isNaN(Sum()) ? sumValue : SumNoVAT()) ?? 0} */}
          {formatVND(formatCurrency(commasToDots(total)))}
        </Text>
      </View>
    </View>
  );
};

interface ChangePayment {
  price: number
  handleNamMethod: string
  onChangeData: (data: { id: number, name: string }) => void
  screen: string
  defaultPayment: string
}
export const ChangePayment = (props: ChangePayment) => {
  const { orderStore } = useStores()
  const [modal, setModal] = useState(false)
  const [method, setMethod] = useState(0)
  const [payment, setPayment] = useState({ id: 0, name: translate("order.CASH") })
  const choicePayment = useRef({ id: 0, name: '' })

  useEffect(()=>{
    if(props.defaultPayment == translate("order.CASH") ){
      setPayment({ id: 0, name: props.defaultPayment })
    }
    if(props.defaultPayment == translate("order.BANK") ){
      setPayment({ id: 1, name: props.defaultPayment })
    }
    if(props.defaultPayment == translate("order.DEDUCTION_OF_LIABILITIES") ){
      setPayment({ id: 2, name: props.defaultPayment })
    }
  }, [props.defaultPayment])

  return (
    <View>
      <TouchableOpacity
        disabled={props.screen === "edit" ? true : false}
        onPress={() => {
          setMethod(payment.id)
          setModal(true);
        }}>
        <View
          style={{
            flexDirection: "row",
            borderRadius: scaleWidth(8),
            backgroundColor: "white",
            paddingHorizontal: padding.padding_16,
            paddingVertical: padding.padding_15,
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text
            tx="order.method_pay"
            style={{
              fontSize: fontSize.size10,
              fontWeight: "400",
              color: colors.nero,
            }}></Text>
          <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                text={payment.name.toString()}
                style={{
                  fontSize: fontSize.size10,
                  fontWeight: "400",
                  color: colors.nero,
                  marginRight: 6,
                }}></Text>
                  {props.screen === "edit" ? null : <Svgs.icon_caretRight2 />}
                  </View>
            {payment.name.toString() ===
              translate("order.DEDUCTION_OF_LIABILITIES") ? (props.screen === 'edit' ? null :
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  tx="order.available_limit"
                  style={{
                    fontWeight: "400",
                    fontSize: fontSize.size10,
                    color: colors.dolphin,
                    alignContent: "center",
                  }}></Text>
                <Text
                  style={{
                    fontSize: fontSize.size10,
                    fontWeight: "400",
                    color:
                      Math.max(0, (Number(orderStore.dataDebtLimit.debtAmount) -
                        Number(
                          orderStore.dataDebtLimit.amountOwed ?? 0
                        ))) >
                        Number(props.price)
                        ? colors.malachite
                        : colors.red,
                  }}>
                  {formatVND(formatCurrency(Math.max(0, (Number(orderStore.dataDebtLimit.debtAmount) -
                    Number(
                      orderStore.dataDebtLimit.amountOwed ?? 0
                    ))))) ?? 0}
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: fontSize.size10,
                      color: colors.dolphin,
                      alignContent: "center",
                    }}>
                    )
                  </Text>
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
      <ModalPayment
        isVisible={modal}
        isPayment={true}
        closeDialog={function (): void {
          setModal(false);
        }}
        onSave={() => {
          orderStore.setMethodPayment({
            sumAll: 0,
            methodPayment: '',
            debt: 0,
            inputPrice: 0,
            apply: false,
          });
          setPayment(choicePayment.current)
          props.handleNamMethod;
          props.onChangeData(choicePayment.current)
        }}
        arrData={methodData}
        method={method}
        setMethod={function (item: number, name: string): void {
          choicePayment.current = { id: item, name: name }
          setMethod(item);
        }}
        debt={{
          isHaveDebtLimit: orderStore.dataDebtLimit.isHaveDebtLimit,
          debtAmount:
            Math.max(0, (Number(orderStore.dataDebtLimit.debtAmount) -
              Number(orderStore.dataDebtLimit.amountOwed ?? 0))),
        }}
      />
    </View>
  )
}