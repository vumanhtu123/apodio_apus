import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Header, Screen, Text, TextField } from "../../../components";
import { Images } from "../../../../assets";
import { colors, fontSize, scaleHeight } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { ModalPayment } from "../components/modal-payment-method";

export const PaymentMethodScreen = observer(function PaymentMethodScreen(
  props: any
) {
  const type = props.route.params.params.type;
  console.log("tuvm", type);
  const [buttonPayment, setButtonPayment] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
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
          {type != true ? (
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
          ) : null}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#FF4956",
              textAlign: "center",
              marginVertical: 20,
            }}>
            53.700.000
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
              30.000.000
            </Text>
          </View>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                keyboardType={null}
                labelTx={"order.customer_paid"}
                style={{ marginHorizontal: 16, marginVertical: 8 }}
                value={value}
                onBlur={onBlur}
                RightIconClear={Images.icon_delete2}
                error={""}
                onClearText={() => {
                  onChange("");
                }}
                onChangeText={(value) => {
                  onChange(value);
                }}
              />
            )}
            defaultValue={""}
            name="price"
            rules={{ required: "Username is required" }}
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
                  tx="order.money_face"
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    color: "#242424",
                    marginRight: 6,
                  }}></Text>
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
              30.000.000
            </Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
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
        closeDialog={function (): void {
          setButtonPayment(false);
        }}
      />
    </View>
  );
});
