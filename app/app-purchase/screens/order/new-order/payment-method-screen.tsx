import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Header, Screen, Text, TextField } from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { ModalPayment } from "../components/modal-payment-method";
import { useStores } from "../../../models";
import { advanceMethodData, methodData } from "./data";
import { translate } from "../../../../i18n";
import { commasToDots, formatCurrency, formatStringToFloat, formatVND } from "../../../utils/validate";
import { ALERT_TYPE, Toast } from "../../../../components/dialog-notification";
import { TextFieldCurrency } from "../../../../components/text-field-currency/text-field-currency";
import { InputSelect } from "../../../../components/input-select/inputSelect";

export const PaymentMethodScreen = observer(function PaymentMethodScreen(
  props: any
) {
  const type = props.route.params.params.type;
  const warning = props.route.params.params.warning;
  const price = props.route.params.params.price;
  const debtAmount = props.route.params.params.debtAmount;
  const [method, setMethod] = useState<number>();
  const countRef = useRef('');
  const [credit, setCredit] = useState(0)
  const [isCredit, setIsCredit] = useState(false)

  const { orderStore, vendorStore } = useStores();
  // console.log('zxcxzmmlmllm', credit)
  const getBalanceLimit = async () => {
    if (orderStore.dataClientSelect !== null) {
      const response = await orderStore.getBalanceLimit(Number(orderStore.dataClientSelect.id))
      console.log('127301265349263', response)
      if (response && response.kind === "ok") {
        console.log(response.response.data.inventory, 'log data')
        if (response.response.data.inventory === 0) {
          setCredit(0)
          setIsCredit(false)
        } else {
          if (type === false) {
            if (Number(response.response.data.inventory) >= (Number(price) - Number(debtAmount))) {
              setCredit(response.response.data.inventory)
              setIsCredit(true)
            } else {
              setCredit(response.response.data.inventory)
              setIsCredit(false)
            }
          } else {
            setCredit(response.response.data.inventory)
            setIsCredit(true)
          }
        }
      } else {
        console.error("Failed to fetch balance limit:", response);
      }
    }
  }

  useEffect(() => {
    getBalanceLimit()
    if (orderStore.dataDebtPayment.methodPayment !== '') {
      setText(formatCurrency(commasToDots(orderStore.dataDebtPayment.inputPrice)))
      setValue('price', formatCurrency(commasToDots(orderStore.dataDebtPayment.inputPrice)))
      countRef.current = orderStore.dataDebtPayment.methodPayment
      if (orderStore.dataDebtPayment.methodPayment === translate("order.EXCEPT_FOR_LIABILITIES")) {
        setMethod(1)
      } else {
        setMethod(0)
      }
      // setCheck(true)
    }
  }, [])

  const Sum = () => {
    // if (type === true) {
    return Number(price)
    // } else {
    //   if ((Number(price) - Number(debtAmount)) >= Number(0)) {
    //     return Number(price) - Number(debtAmount)
    //   } else {
    //     return 0
    //   }
    // }
  };
  const Sum1 = () => {
    if (type === true) {
      return 0
    } else {
      if ((Number(price) - Number(debtAmount)) >= Number(0)) {
        return Number(price) - Number(debtAmount)
      } else {
        return 0
      }
    }
  };

  const Remain = () => {
    if (type === true) {
      if ((Number(price) - Number(formatStringToFloat(text))) >= Number(0)) {
        return Number(price) - Number(formatStringToFloat(text))
      } else {
        return 0
      }
    } else {
      if ((Number(price) - Number(debtAmount) - Number(formatStringToFloat(text))) >= Number(0)) {
        return Number(price) - Number(debtAmount) - Number(formatStringToFloat(text))
      } else {
        return 0
      }
    }
  };
  const Apply = () => {
    if (countRef.current === '') {
      orderStore.setMethodPayment({
        sumAll: price ?? 0,
        methodPayment: countRef.current,
        debt: 0,
        inputPrice: 0,
        apply: false,
      });
      navigation.goBack();
    } else {
      orderStore.setMethodPayment({
        sumAll: price ?? 0,
        methodPayment: countRef.current,
        debt: Remain(),
        inputPrice: Number(formatStringToFloat(text)) ?? 0,
        apply: true,
      });
      navigation.goBack();
      if (countRef.current === translate("order.EXCEPT_FOR_LIABILITIES")) {
        orderStore.setClearingDebt(true)
      } else {
        orderStore.setClearingDebt(false)
      }
    }
    // navigation.navigate('newOrder', { goBackPayment: true })
  };
  console.log("tuvm", type);
  const [check, setCheck] = useState(false)
  const [buttonPayment, setButtonPayment] = useState<boolean>(false);
  const [text, setText] = useState("");
  const {
    control,
    formState: { errors }, setError, setValue
  } = useForm();
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: colors.palette.aliceBlue,
        justifyContent: "space-between",
        flexDirection: "column",
        flex: 1,
      }}>
      <View>
        <Header
          LeftIcon={Svgs.back}
          onLeftPress={() => navigation.goBack()}
          style={{ height: scaleHeight(70) }}
          headerTx={"order.warning_payment"}
          titleStyle={{
            alignSelf: "center",
            fontSize: fontSize.size16,
            lineHeight: scaleHeight(24),
            fontWeight: "700",
            color: colors.palette.neutral100,
          }}
        />
        <View style={{ backgroundColor: colors.palette.aliceBlue }}>
          {warning == false ? null :
            // (check !== true ? (
            <View
              style={{
                backgroundColor: "#FEF7E5",
                flexDirection: "row",
                paddingHorizontal: padding.padding_20,
                justifyContent: "flex-start",
                paddingVertical: padding.padding_10,
              }}>
              <Svgs.ic_warning_yellow />
              <Text
                tx="order.tittle_warning"
                style={{
                  color: colors.nero,
                  fontSize: fontSize.size12,
                  fontWeight: "400",
                }}></Text>
            </View>}
          {/* ) : null)} */}
          <Text
            style={{
              fontSize: fontSize.size20,
              fontWeight: "600",
              color: "#FF4956",
              textAlign: "center",
              marginVertical: margin.margin_20,
            }}>
            {formatVND(formatCurrency(commasToDots(Sum())))}
          </Text>
          {type === false ? (
            <View style={{ flexDirection: "row", marginHorizontal: scaleWidth(16) }}>
              <Text
                style={{
                  fontSize: fontSize.size12,
                  fontWeight: "400",
                  color: colors.dolphin,
                }}
                tx="order.debt_limit"></Text>
              <Text style={{ fontSize: fontSize.size12, fontWeight: "400", color: "#FF4956" }}>
                {formatVND(formatCurrency(commasToDots(debtAmount)))}
              </Text>
            </View>
          ) : null}
          <View style={{ flexDirection: "row", marginHorizontal: scaleWidth(16), marginVertical: scaleHeight(8) }}>
            <Text
              style={{
                fontSize: fontSize.size12,
                fontWeight: "400",
                color: colors.dolphin,
              }}
              tx="order.text_money_limit"></Text>
            <Text style={{ fontSize: fontSize.size12, fontWeight: "400", color: "#FF4956" }}>
              {formatVND(formatCurrency(commasToDots(Sum1())))}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setButtonPayment(true);
              // console.log('sakdas', method)
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: 'center',
              marginHorizontal: scaleWidth(16),
              marginVertical: scaleHeight(8)
            }}>
            <Text
              tx="order.method_payment"
              style={{
                fontSize: fontSize.size12,
                fontWeight: "400",
                color: colors.nero,
              }}></Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Text
                  style={{
                    fontSize: fontSize.size12,
                    fontWeight: "400",
                    color: colors.nero,
                    marginRight: scaleWidth(6),
                    textAlign: 'right'

                  }}>
                  {countRef.current}
                  {/* {credit} */}
                </Text>
                {method === 1 ? (
                  <Text
                    style={{
                      fontSize: fontSize.size12,
                      fontWeight: "400",
                      marginRight: scaleWidth(6),
                      textAlign: 'right',
                      color: "#FF4956"
                    }}>
                    {`(${formatVND(formatCurrency(commasToDots(credit)))})`}
                  </Text>
                ) : null}
              </View>
              <Svgs.icon_caretRight2 />
            </View>
          </TouchableOpacity>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                keyboardType='numeric'
                labelTx={type === false && price > debtAmount ? "order.customer_needPaid" : "order.customer_paid"}
                style={{
                  marginHorizontal: scaleWidth(16),
                  marginVertical: scaleHeight(8),
                  backgroundColor: "white",
                  borderRadius: scaleWidth(8),
                }}
                value={value}
                onBlur={onBlur}
                showRightIcon={false}
                RightIconClear={Svgs.icon_delete2}
                error={errors?.price?.message}
                styleError={{ marginLeft: scaleHeight(16) }}
                //valueCurrency={vendorStore.companyInfo.symbol}
                onChangeText={(value) => {
                  if (countRef.current === '') {
                    Toast.show({
                      type: ALERT_TYPE.DANGER,
                      title: '',
                      textBody: translate('txtToats.change_payment'),
                    })
                    setValue('price', '0')
                  } else {
                    onChange(formatCurrency(value))
                  }
                }}
                onSubmitEditing={() => {
                  if (Number(formatStringToFloat(value)) >= Number(price)) {
                    setError('price', {
                      type: "validate",
                      message: "productScreen.cannotPrepayMoreThanTheOrderValue",
                    })
                  }
                  if (Number(formatStringToFloat(value)) < Number(Sum1())) {
                    setError("price", {
                      type: "validate",
                      message: 'productScreen.guestsNeedToPay',
                    });
                  }
                  if (Number(formatStringToFloat(value)) > Number(credit) && countRef.current === translate("order.EXCEPT_FOR_LIABILITIES")) {
                    setError('price', {
                      type: "validate",
                      message: "productScreen.cannotPay",
                    })
                    return
                  }
                  if (Number(formatStringToFloat(value)) >= Number(Sum1()) && Number(formatStringToFloat(value)) <= Number(price)) {
                    setValue('price', value.toString())
                    console.log(value, '123')
                    setError('price', {})
                    setText(value)
                    Remain()
                  }
                }}
              />
            )}
            name="price"
            rules={{ required: "productScreen.amountIsRequired" }}
          />
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 16,
            }}> */}


          {/* </View> */}
          {warning === true ? null : <View
            style={{
              flexDirection: "row",
              marginHorizontal: margin.margin_16,
              marginVertical: margin.margin_6,
            }}>
            <Text
              style={{
                fontSize: fontSize.size12,
                fontWeight: "400",
                color: colors.dolphin,
              }}
              tx="order.amount_paid"></Text>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#FF4956" }}>
              {formatVND(formatCurrency(commasToDots(Remain())))}
            </Text>
          </View>}
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            Apply();
          }}>
          <View
            style={{
              backgroundColor: colors.navyBlue,
              borderRadius: 8,
              marginHorizontal: margin.margin_15,
              marginBottom: margin.margin_15,
              marginTop: margin.margin_5,
            }}>
            <Text
              tx="order.apply"
              style={{
                color: "white",
                fontSize: fontSize.size14,
                fontWeight: "600",
                marginHorizontal: margin.margin_50,
                marginVertical: margin.margin_12,
                textAlign: "center",
              }}></Text>
          </View>
        </TouchableOpacity>
      </View>
      <ModalPayment
        isVisible={buttonPayment}
        isPayment={false}
        closeDialog={function (): void {
          setButtonPayment(false);
        }}
        onSave={() => {
          console.log('da chon')
        }}
        arrData={advanceMethodData}
        method={method}
        setMethod={function (item: number, name: string): void {
          setMethod(item);
          countRef.current = name;
          console.log('/////////////', item)
          setCheck(true)
          if (name === translate("order.EXCEPT_FOR_LIABILITIES")) {
            if (Number(Sum1()) <= credit) {
              setText(formatCurrency(commasToDots(Sum1().toString())))
              setValue('price', formatCurrency(commasToDots(Sum1().toString())))
              setError('price', {})
            } else {
              setText(formatCurrency(commasToDots(credit.toString())))
              setValue('price', formatCurrency(commasToDots(credit.toString())))
              setError('price', {})
            }
          } else {
            setText('')
            setValue('price', '')
            setError('price', {})
          }
          console.log("tuvm method", countRef);
        }}
        debt={{
          isHaveDebtLimit: isCredit,
          debtAmount: credit,
        }}
      />
    </View>
  );
});