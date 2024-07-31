import React, { FC, useEffect, useState } from "react"
import { ImageBackground, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Svgs } from "../../../../../assets/svgs"
import { Header, Text } from "../../../../components"
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme"
import { useStores } from "../../../models"
import LinearGradient from "react-native-linear-gradient"
import moment from "moment"
import { commasToDots, formatCurrency, formatVND } from "../../../utils/validate"

export const OrderSuccess: FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { idOrder, screen, price, inputPrice, code, paymentMethod }: any = route.params || undefined
    const { orderStore } = useStores()

    const formattedPrice = price;
    const formattedInputPrice = inputPrice;
    const receivables = price - inputPrice;
    const formattedReceivables = receivables;

    const now = moment()
    const formattedDateTime = now.format('HH:mm:ss - DD/MM/YYYY')
    return (
        <View style={{
            flex: 1,
            justifyContent: 'space-between'
        }}>
            <View>
                <Header
                    LeftIcon={Svgs.back}
                    headerTx="order.createOrderSuccess"
                    style={{ height: scaleWidth(52) }}
                    onLeftPress={() => navigation.goBack()}
                />
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                    colors={[colors.palette.navyBlue, colors.palette.malibu]}
                    style={{ height: scaleHeight(228) }}
                ></LinearGradient>
                <ImageBackground
                    source={require('../../../../../assets/Images/back_Ground_Success.png')}
                    style={{
                        position: 'absolute',
                        alignItems: 'center',
                        // justifyContent: '',
                        height: scaleHeight(556),
                        top: scaleWidth(45),
                        marginHorizontal: scaleWidth(16),
                        width: scaleWidth(343),
                        // backgroundColor: 'blue',
                    }}
                    resizeMode="cover"
                >
                    <View style={{ alignItems: 'center', marginTop: scaleWidth(50) }}>
                        <Svgs.ic_Frame width={scaleWidth(219)} height={scaleHeight(171)} />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: scaleWidth(30) }}>
                        {/* <Text tx={screen === 'edit' ? 'successScreen.editSuccess' : "successScreen.labelSuccess"} style={{ fontSize: fontSize.size18, fontWeight: '700', marginTop: scaleHeight(40), marginBottom: scaleHeight(10) }} /> */}
                        <Text tx={screen === 'edit' ? 'successScreen.editTitleSuccess' : "successScreen.titleSuccessOrder"} style={{ fontSize: fontSize.size14, fontWeight: '500', color: colors.aluminium }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: fontSize.size14 }}>
                                #{code}
                            </Text>
                            {
                                screen === 'edit' ?
                                    null
                                    : <>
                                        <Text tx="successScreen.value"
                                            style={{ fontSize: fontSize.size14 }}
                                        />
                                        <Text style={{ color: colors.palette.radicalRed, fontWeight: "500", fontSize: fontSize.size14 }}>
                                            {formatVND(formatCurrency(commasToDots(formattedPrice)))}
                                        </Text>
                                    </>
                            }
                        </View>
                        {
                            screen === 'edit' ?
                                null
                                : <>
                                    <View style={{ marginVertical: scaleWidth(12), flexDirection: 'row' }}>
                                        <Text style={{ fontSize: fontSize.size14 }}
                                            tx="successScreen.orderHasBeenPaid"
                                        />
                                        <Text style={{ fontSize: fontSize.size14 }}>
                                            {paymentMethod == true ? formatVND(formatCurrency(commasToDots(formattedPrice))) : formatVND(formatCurrency(commasToDots(formattedInputPrice)))}
                                        </Text>
                                    </View>

                                    <Text style={{ fontSize: fontSize.size14 }}
                                        tx="successScreen.theRemainingAmount"
                                    />
                                    <Text style={{ color: colors.palette.radicalRed, fontWeight: "500", fontSize: fontSize.size14, marginBottom: scaleWidth(12) }}>
                                        {paymentMethod == true ? formatVND(0) : formatVND(formatCurrency(commasToDots(formattedReceivables)))}
                                    </Text>
                                </>
                        }

                        <Text style={{ fontSize: fontSize.size14, color: colors.palette.dolphin }}
                            tx={screen == "edit" ? "successScreen.timeEditOderSuccess" : "successScreen.timeCreateOderSuccess"}
                        />
                        <Text style={{ fontSize: fontSize.size14 }}>
                            {formattedDateTime}
                        </Text>
                    </View>

                </ImageBackground>
            </View >
            <View style={{
                paddingHorizontal: scaleWidth(16),
                // backgroundColor: 'yellow',
            }}>
                {screen === 'edit' ? null :
                    <TouchableOpacity onPress={() => {
                        orderStore.reset();
                        navigation.goBack();
                    }} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: scaleWidth(10), borderColor: colors.veryLightGrey,
                        paddingVertical: scaleHeight(12),
                        backgroundColor: colors.navyBlue
                    }}>
                        <Text tx="successScreen.btnCreateOrder" style={{ fontSize: fontSize.size14, color: 'white', fontWeight: '600' }} />
                    </TouchableOpacity>}
                <TouchableOpacity
                    onPress={() => {
                        orderStore.setOrderId(idOrder);
                        navigation.navigate("orderDetails" as never)
                    }}
                    style={{ justifyContent: 'center', alignItems: 'center', marginTop: scaleHeight(15) }}>
                    <Text tx="successScreen.btnDetailOrder" style={{ fontSize: fontSize.size14, color: colors.navyBlue, fontWeight: '700' }} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        orderStore.setIsReload(true);
                        navigation.navigate('mainBottom' as never)
                    }}
                    style={{ justifyContent: 'center', alignItems: 'center', marginTop: scaleHeight(15), marginBottom: scaleHeight(30) }}>
                    <Text tx="successScreen.btnBack" style={{ fontSize: fontSize.size14, color: colors.navyBlue, fontWeight: '700' }} />
                </TouchableOpacity>
            </View>
        </View >
        // </View>
    )
}