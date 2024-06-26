import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Header, Screen, Text, TextField } from "../../../components";
import { Images } from "../../../../assets";
import { colors, fontSize, scaleHeight } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { ModalPayment } from "../components/modal-payment-method";
import { useStores } from "../../../models";
import { advanceMethodData, methodData } from "./data";
import { translate } from "../../../i18n";
import moment from "moment";
import { TextFieldCurrency } from "../../../components/text-field-currency/text-field-currency";
import { formatCurrency } from "../../../utils/validate";

export const PaymentMethodScreen = observer(function PaymentMethodScreen(
  props: any
) {
  const type = props.route.params.params.type;
  const price = props.route.params.params.price;
  const debtAmount = props.route.params.params.debtAmount;
  const [method, setMethod] = useState<number>();
  const countRef = useRef();
  const [credit, setCredit] = useState(0)
  const [isCredit, setIsCredit] = useState(false)

  const { orderStore } = useStores();
  console.log("debt tuvm", debtAmount);

  const getDebtAccountLedger = async () => {
    try {
      const response = await orderStore.getListAccountLedger()
      if (response && response.kind === "ok") {
        const accountLedgerId = response.response.data.content[0].id
        const date = new Date()
        const month = date.getUTCMonth()
        const year = date.getUTCFullYear();
        const firstDayOfNextYear = new Date(year + 2, 0, 1);
        const lastDayOfCurrentYear = new Date(firstDayOfNextYear - 1);
        const firstDayOfMonth = new Date(year, month, 1);
        const start = moment(firstDayOfMonth).format('YYYY-MM-DD')
        const end = moment(lastDayOfCurrentYear).format('YYYY-MM-DD')
        console.log(start)
        console.log(end)
        try {
          const response1 = await orderStore.getDebtAccountLedger(accountLedgerId, start, end, Number(orderStore.dataClientSelect.id))
          if (response1 && response1.kind === "ok") {
            console.log(response1.response.data.endingBalance.credit, 'log data')
            if (response1.response.data.endingBalance.credit === 0) {
              setCredit(0)
              setIsCredit(false)
            } else {
              if (type === false) {
                if (Number(response1.response.data.endingBalance.credit) >= (Number(price) - Number(debtAmount))) {
                  setCredit(response1.response.data.endingBalance.credit)
                  setIsCredit(true)
                } else {
                  setCredit(response1.response.data.endingBalance.credit)
                  setIsCredit(false)
                }
              } else {
                setCredit(response1.response.data.endingBalance.credit)
                setIsCredit(true)
              }
            }
          } else {
            console.error("Failed to fetch list account ledger:", response1);
          }
        } catch (error) {
          console.error("Error fetching list account ledger:", error);
        }
      } else {
        console.error("Failed to fetch list account ledger:", response);
      }
    } catch (error) {
      console.error("Error fetching list account ledger:", error);
    }
  };

  useEffect(() => {
    getDebtAccountLedger()
  }, [])

  const Sum = () => {
    console.log(type, 'log=======')
    if (type === true) {
      return Number(price)
    } else {
      if ((Number(price) - Number(debtAmount)) >= Number(0)) {
        return Number(price) - Number(debtAmount)
      } else {
        return 0
      }

    }
  };
  const Sum1 = () => {
    console.log(type, 'log=======')
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
      if ((Number(price) - Number(text)) >= Number(0)) {
        return Number(price) - Number(text)
      } else {
        return 0
      }
    } else {
      if ((Number(price)- Number(debtAmount) - Number(text)) >= Number(0)) {
        return Number(price) - Number(debtAmount) - Number(text)
      } else {
        return 0
      }
    }
  };
  const Apply = () => {
    orderStore.setMethodPayment({
      sumAll: price ?? 0,
      methodPayment: countRef.current,
      debt: Remain(),
      inputPrice: Number(text) ?? 0,
      apply: true,
    });
    console.log(text, '==============+')
    navigation.goBack();
    if(countRef.current === translate("order.EXCEPT_FOR_LIABILITIES")){
      orderStore.setClearingDebt(true)
    }else{
      orderStore.setClearingDebt(false)
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
          LeftIcon={Images.back}
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
          {type === true ? null: (check !== true ? (
            <View
              style={{
                backgroundColor: "#FEF7E5",
                flexDirection: "row",
                paddingHorizontal: 20,
                justifyContent: "flex-start",
                paddingVertical: 10,
              }}>
              <Images.ic_warning_yellow />
              <Text
                tx="order.tittle_warning"
                style={{
                  color: "#242424",
                  fontSize: 12,
                  fontWeight: "400",
                }}></Text>
            </View>
          ) : null)}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#FF4956",
              textAlign: "center",
              marginVertical: 20,
            }}>
            {Sum()}
          </Text>
          <View style={{ flexDirection: "row", marginHorizontal: 16 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#747475",
              }}
              tx="order.text_money_limit"></Text>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#FF4956" }}>
              {Sum1()}
            </Text>
          </View>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextFieldCurrency
                keyboardType='numeric'
                labelTx={"order.customer_paid"}
                style={{
                  marginHorizontal: 16,
                  marginVertical: 8,
                  backgroundColor: "white",
                  borderRadius: 8,
                }}
                value={value}
                onBlur={onBlur}
                showRightIcon={false}
                RightIconClear={Images.icon_delete2}
                error={errors?.price?.message}
                styleError={{ marginLeft: scaleHeight(16) }}
                // onClearText={() => {
                //   onChange("");
                //   setText("");
                // }}
                onChangeText={(value) => {
                  // if (Number(value) >= Number(price)) {
                  //   setValue('price', price.toString())
                  // } else {
                    onChange(value)
                  // }
                }}
                onChangeValue={(value) => {
                  console.log('---price--', value)
                }}
                // defaultValue={text===""? "": text}
                onSubmitEditing={() => {
                  if (Number(value) >= Number(Sum1())&& Number(value)<= Number(price)) {
                    setValue('price', value.toString())
                    // onChange(price)
                    setText(value)
                    Remain()
                  }
                  if(Number(value) >= Number(price)){
                    setError('price', {
                      type: "validate",
                      message: "Không thể trả trước quá giá trị đơn hàng",
                    })
                  }
                  // if (Number(value) < Number(Sum())) {
                  //   setValue('price', value.toString())
                  //   // onChange(price)
                  //   setText(value)
                  //   Remain()
                  // }
                  if (Number(value) < Number(Sum1())) {
                    setError("price", {
                      type: "validate",
                      message: 'Khách cần trả lớn hơn số tiền tối thiểu',
                    });
                  }

                  // if (Number(price) > Number(value) && Number(value) >= Number(Sum())) {
                  //   setText(value)
                  //   Remain()
                  // }
                }}
              />
            )}
            name="price"
            rules={{ required: "Số tiền là bắt buộc" }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 16,
            }}>
            <Text
              tx="order.method_payment"
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#242424",
              }}></Text>
            <TouchableOpacity
              onPress={() => {
                setButtonPayment(true);
              }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  // text={}
                  // tx="order.money_face"
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    color: "#242424",
                    marginRight: 6,
                  }}>
                  {countRef.current}
                </Text>
                <Images.icon_caretRight2 />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 16,
              marginVertical: 6,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#747475",
              }}
              tx="order.amount_paid"></Text>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#FF4956" }}>
              {Remain()}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            Apply();
          }}>
          <View
            style={{
              backgroundColor: "#0078D4",
              borderRadius: 8,
              marginHorizontal: 15,
              marginBottom: 15,
              marginTop: 5,
            }}>
            <Text
              tx="order.apply"
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "600",
                marginHorizontal: 50,
                marginVertical: 12,
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
        arrData={advanceMethodData}
        method={method}
        setMethod={function (item: number, name: string): void {
          setMethod(item);
          countRef.current = name;
          setCheck(true)
          if (name === translate("order.EXCEPT_FOR_LIABILITIES")) {
            if(Number(Sum())<= credit){
              setText(Sum().toString())
              setValue('price',Sum().toString())
            }else{
              setText(credit.toString())
              setValue('price',credit.toString())
            }
          } else {
            setText('')
            setValue('price', '')
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
