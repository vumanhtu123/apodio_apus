import React, { FC } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Svgs } from "../../../../../assets/svgs";
import { Header, Text } from "../../../../components";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { useStores } from "../../../models";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import {
  commasToDots,
  formatCurrency,
  formatVND,
} from "../../../utils/validate";
import Images from "../../../../../assets/index";

export const OrderSuccess: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idOrder, screen, price, inputPrice, code, paymentMethod }: any =
    route.params || undefined;
  const { orderStore } = useStores();

  const formattedPrice = price;
  const formattedInputPrice = inputPrice;
  const receivables = price - inputPrice;
  const formattedReceivables = receivables;

  const now = moment();
  const formattedDateTime = now.format("HH:mm:ss - DD/MM/YYYY");
  return (
    <View style={styles.ROOT}>
      <View>
        <Header
          LeftIcon={Svgs.back}
          headerTx="order.createOrderSuccess"
          style={{ height: scaleWidth(52) }}
          onLeftPress={() => navigation.goBack()}
        />
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          colors={[colors.palette.navyBlue, colors.palette.malibu]}
          style={{ height: scaleHeight(228) }}></LinearGradient>
        <ImageBackground
          source={Images.backgroundSuccess}
          style={styles.viewImageBackground}
          resizeMode="cover">
          <View style={{ alignItems: "center", marginTop: scaleWidth(50) }}>
            <Svgs.ic_Frame width={scaleWidth(219)} height={scaleHeight(171)} />
          </View>
          <View style={{ alignItems: "center", marginTop: scaleWidth(30) }}>
            {/* <Text tx={screen === 'edit' ? 'successScreen.editSuccess' : "successScreen.labelSuccess"} style={{ fontSize: fontSize.size18, fontWeight: '700', marginTop: scaleHeight(40), marginBottom: scaleHeight(10) }} /> */}
            <Text
              tx={
                screen === "edit"
                  ? "successScreen.editTitleSuccess"
                  : "successScreen.titleSuccessOrder"
              }
              style={[styles.textRed500, {color: colors.aluminium}]}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: fontSize.size14 }}>#{code}</Text>
              {screen === "edit" ? null : (
                <>
                  <Text
                    tx="successScreen.value"
                    style={{ fontSize: fontSize.size14 }}
                  />
                  <Text
                    style={styles.textRed500}>
                    {formatVND(formatCurrency(commasToDots(formattedPrice)))}
                  </Text>
                </>
              )}
            </View>
            {screen === "edit" ? null : (
              <>
                <View
                  style={{
                    marginVertical: scaleWidth(12),
                    flexDirection: "row",
                  }}>
                  <Text
                    style={{ fontSize: fontSize.size14 }}
                    tx="successScreen.orderHasBeenPaid"
                  />
                  <Text style={{ fontSize: fontSize.size14 }}>
                    {paymentMethod == true
                      ? formatVND(formatCurrency(commasToDots(formattedPrice)))
                      : formatVND(
                          formatCurrency(commasToDots(formattedInputPrice))
                        )}
                  </Text>
                </View>

                <Text
                  style={{ fontSize: fontSize.size14 }}
                  tx="successScreen.theRemainingAmount"
                />
                <Text
                  style={[styles.textRed500, {
                    marginBottom: scaleWidth(12),
                  }]}>
                  {paymentMethod == true
                    ? formatVND(0)
                    : formatVND(
                        formatCurrency(commasToDots(formattedReceivables))
                      )}
                </Text>
              </>
            )}

            <Text
              style={{
                fontSize: fontSize.size14,
                color: colors.palette.dolphin,
              }}
              tx={
                screen == "edit"
                  ? "successScreen.timeEditOderSuccess"
                  : "successScreen.timeCreateOderSuccess"
              }
            />
            <Text style={{ fontSize: fontSize.size14 }}>
              {formattedDateTime}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          paddingHorizontal: scaleWidth(16),
        }}>
        {screen === "edit" ? null : (
          <TouchableOpacity
            onPress={() => {
              orderStore.reset();
              navigation.goBack();
            }}
            style={styles.viewButtonCreateOrder}>
            <Text
              tx="successScreen.btnCreateOrder"
              style={styles.textButton}/>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            orderStore.setOrderId(idOrder);
            navigation.navigate("orderDetails" as never);
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: scaleHeight(15),
          }}>
          <Text
            tx="successScreen.btnDetailOrder"
            style={styles.textButton}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            orderStore.setIsReload(true);
            navigation.navigate("mainBottom" as never);
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: scaleHeight(15),
            marginBottom: scaleHeight(30),
          }}>
          <Text
            tx="successScreen.btnBack"
            style={styles.textButton}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ROOT: {
    flex: 1,
    justifyContent: "space-between",
  },
  viewImageBackground: {
    position: "absolute",
    alignItems: "center",
    // justifyContent: '',
    height: scaleHeight(556),
    top: scaleWidth(45),
    marginHorizontal: scaleWidth(16),
    width: scaleWidth(343),
    // backgroundColor: 'blue',
  },
  textButton: {
    fontSize: fontSize.size14,
    color: "white",
    fontWeight: "700",
  },
  viewButtonCreateOrder: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scaleWidth(10),
    borderColor: colors.veryLightGrey,
    paddingVertical: scaleHeight(12),
    backgroundColor: colors.navyBlue,
  },
  textRed500: {
    color: colors.palette.radicalRed,
    fontWeight: "500",
    fontSize: fontSize.size14,
  },
})