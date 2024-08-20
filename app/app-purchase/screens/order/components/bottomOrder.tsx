import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Button, Text } from '../../../../components';
import { commasToDots, formatCurrency, formatVND } from '../../../utils/validate';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '../../../models';
import { Svgs } from '../../../../../assets/svgs';

interface BottomOrder {
  isDeposit: boolean
  price: number
  handleNamMethod: string
  onPressButton: () => void
  screen: string
}

export const BottomOrder = memo((props: BottomOrder) =>{
    const navigation = useNavigation()
    const {orderStore} = useStores()
  return (
    <View
        style={[
          styles.viewButtonOrder,
          {
            top:
              props.isDeposit === false
                ? Dimensions.get("window").height - scaleHeight(120)
                : props.handleNamMethod == "DEDUCTION_OF_LIABILITIES"
                  ? Dimensions.get("window").height - scaleHeight(216)
                  : Dimensions.get("window").height - scaleHeight(184),
          },
        ]}>
        <View
          style={{
            flexDirection: "row",
            paddingTop: scaleHeight(padding.padding_20),
            paddingBottom: scaleHeight(padding.padding_12),
          }}>
          <Text tx={"order.sum"} style={[styles.textTotal, { flex: 1 }]} />
          <Text style={props.isDeposit === true ? styles.textTotal : styles.textCost}>
            {formatVND(formatCurrency(commasToDots(Number(props.price))))}
          </Text>
        </View>
        {props.isDeposit === true && orderStore.dataDebtPayment.apply ? (
          <View
            style={{
              flexDirection: "row",
              paddingBottom: scaleHeight(padding.padding_12),
              justifyContent: "space-between",
            }}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <Text tx={"order.prepayment"} style={[styles.textTotal]} />
              <Text
                text={"(" + orderStore.dataDebtPayment.methodPayment + ")"}
                style={{
                  color: colors.dolphin,
                  fontSize: fontSize.size12,
                  fontWeight: "400",
                }}>
                {formatVND(formatCurrency(
                  commasToDots(Number(orderStore.dataDebtPayment.sumAll))
                ))}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  return navigation.navigate({
                    name: "paymentBuy", params: {
                      params: {
                        type:
                          props.handleNamMethod == "DEDUCTION_OF_LIABILITIES"
                            ? false
                            : true,
                        price: props.price,
                        warning: false,
                        debtAmount:
                          props.handleNamMethod == "DEDUCTION_OF_LIABILITIES"
                            ? Number(Math.max(0, (Number(orderStore.dataDebtLimit.debtAmount) -
                              Number(
                                orderStore.dataDebtLimit.amountOwed ?? 0
                              ))))
                            : null,
                      },
                    }
                  } as never);
                }}>
                <Svgs.icon_edit
                  style={{ marginRight: scaleWidth(margin.margin_6) }}
                />
              </TouchableOpacity>
              <Text style={styles.textTotal}>
                {formatVND(formatCurrency(
                  commasToDots(Number(orderStore.dataDebtPayment.inputPrice))
                ))}
              </Text>
            </View>
          </View>
        ) : null}
        {props.isDeposit === true && orderStore.dataDebtPayment.apply && props.handleNamMethod === "DEDUCTION_OF_LIABILITIES" ? (
          <View
            style={{
              flexDirection: "row",
              paddingBottom: scaleHeight(padding.padding_12),
            }}>

            <Text
              tx={"order.usedDebt"}
              style={[styles.textTotal,]}
            />
            <Text
              tx={'order.debtLimit'}
              style={{
                color: colors.dolphin,
                fontSize: fontSize.size12,
                fontWeight: "400",
                flex: 1,
              }}></Text>
            <Text
              style={[styles.textTotal,]}>
              {formatVND(formatCurrency(
                commasToDots(
                  Number(props.price ?? 0) -
                  Number(orderStore.dataDebtPayment.inputPrice ?? 0)
                ))
              )}
            </Text>
          </View>
        ) : null}
        {props.isDeposit === true && orderStore.dataDebtPayment.apply ? (
          props.handleNamMethod === "DEDUCTION_OF_LIABILITIES" ?
            <View
              style={{
                flexDirection: "row",
                paddingBottom: scaleHeight(padding.padding_12),
              }}>
              <Text
                tx={"order.stillInDebt"}
                style={[styles.textTotal, { flex: 1 }]}
              />
              <Text
                style={[styles.textCost, { color: colors.palette.radicalRed }]}>
                {Number(props.price ?? 0) - Number(orderStore.dataDebtPayment.inputPrice ?? 0) >
                  Number(orderStore.dataDebtLimit.debtAmount) - Number(orderStore.dataDebtLimit.amountOwed ?? 0)
                  ? formatVND(formatCurrency(
                    commasToDots(
                      (Number(props.price ?? 0) - Number(orderStore.dataDebtPayment.inputPrice ?? 0)) -
                      (Number(orderStore.dataDebtLimit.debtAmount) - Number(orderStore.dataDebtLimit.amountOwed ?? 0))
                    ))
                  ) : formatVND(0)
                }
              </Text>
            </View>
            :
            <View
              style={{
                flexDirection: "row",
                paddingBottom: scaleHeight(padding.padding_12),
              }}>
              <Text
                tx={"order.stillInDebt"}
                style={[styles.textTotal, { flex: 1 }]}
              />
              <Text
                style={[styles.textCost, { color: colors.palette.radicalRed }]}>
                {formatVND(formatCurrency(
                  commasToDots(
                    Number(props.price ?? 0) -
                    Number(orderStore.dataDebtPayment.inputPrice ?? 0)
                  ))
                )}
              </Text>
            </View>
        ) : null}
        <Button
          onPress={props.onPressButton}
          tx={props.screen === "edit" ? "order.editOrder" : "order.order"}
          style={styles.buttonOrder}
          textStyle={styles.textButtonOrder}
        />
      </View>
  )
})

const styles = StyleSheet.create({
  viewButtonOrder: {
    paddingHorizontal: scaleHeight(margin.margin_16),
    backgroundColor: colors.palette.neutral100,
    position: "absolute",
    top: Dimensions.get("window").height - scaleHeight(180),
    right: 0,
    left: 0,
    // bottom: 0,
  },
  buttonOrder: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.palette.navyBlue,
    height: scaleHeight(48),
    marginBottom: scaleHeight(margin.margin_20),
  },
  textTotal: {
    fontWeight: "600",
    fontSize: fontSize.size12,
    color: colors.palette.nero,
  },
  textCost: {
    color: colors.palette.nero,
    fontWeight: "600",
    fontSize: fontSize.size16,
    lineHeight: scaleHeight(20),
  },
  textButtonOrder: {
    fontSize: fontSize.size14,
    fontWeight: "600",
    lineHeight: scaleHeight(24),
    color: colors.palette.neutral100,
  },
})