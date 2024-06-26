import React, { FC } from "react"
import { ImageBackground, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Images } from "../../../../assets"
import { Header, Text } from "../../../components"
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme"
import { useStores } from "../../../models"
import LinearGradient from "react-native-linear-gradient"
import moment from "moment"

export const OrderSuccess: FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { idOrder, screen, price, inputPrice } = route.params || undefined
    const { orderStore } = useStores()
    // console.log(price, '234234')
    // console.log(inputPrice)
    const formattedPrice = price.toLocaleString('vi-VN');
    const formattedInputPrice = inputPrice.toLocaleString('vi-VN');
    const receivables = price - inputPrice;
    const formattedReceivables = receivables.toLocaleString('vi-VN')
    // console.log("so tien phai thu", formattedReceivables);

    moment.locale('vi')
    const now = moment()
    const formattedDateTime = now.format('HH:mm:ss - DD/MM/YYYY')
    return (

        <View style={{
            flex: 1,
            justifyContent: 'space-between'
        }}>
            <View>
                <Header
                    LeftIcon={Images.back}
                    headerTx="order.createOrderSuccess"
                    style={{ height: scaleWidth(52) }}
                    onLeftPress={() => navigation.goBack()}
                />
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                    colors={[colors.palette.navyBlue, colors.palette.malibu]}
                    style={{ height: scaleHeight(228) }}
                ></LinearGradient>


                <ImageBackground
                    source={require('../../../../assets/Images/back_Ground_Success.png')}
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
                        <Images.ic_Frame width={scaleWidth(219)} height={scaleHeight(171)} />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: scaleWidth(30) }}>
                        {/* <Text tx={screen === 'edit' ? 'successScreen.editSuccess' : "successScreen.labelSuccess"} style={{ fontSize: fontSize.size18, fontWeight: '700', marginTop: scaleHeight(40), marginBottom: scaleHeight(10) }} /> */}
                        <Text tx={screen === 'edit' ? 'successScreen.editTitleSuccess' : "successScreen.titleSuccessOrder"} style={{ fontSize: fontSize.size14, fontWeight: '500', color: '#84888D' }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={{ fontSize: fontSize.size14 }}>
                                {idOrder}
                            </Text>
                            <Text tx="successScreen.value"
                                style={{ fontSize: fontSize.size14 }}
                            />
                            <Text style={{ color: colors.palette.radicalRed, fontWeight: "500", fontSize: fontSize.size14 }}>
                                {formattedPrice} đ
                            </Text>
                        </View>

                        <View style={{ marginVertical: scaleWidth(12), flexDirection: 'row' }}>
                            <Text style={{ fontSize: fontSize.size14 }}
                                tx="successScreen.orderHasBeenPaid"
                            />
                            <Text style={{ fontSize: fontSize.size14 }}>
                                {formattedInputPrice}
                            </Text>
                        </View>

                        <Text style={{ fontSize: fontSize.size14 }}
                            tx="successScreen.theRemainingAmount"
                        />
                        <Text style={{ color: colors.palette.radicalRed, fontWeight: "500", fontSize: fontSize.size14, marginBottom: scaleWidth(12) }}>
                            {formattedReceivables} đ
                        </Text>
                        <Text style={{ fontSize: fontSize.size14, color: colors.palette.dolphin }}
                            tx="successScreen.timeCreateOderSuccess"
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
                        borderRadius: 10, borderColor: '#c8c8c8',
                        paddingVertical: scaleHeight(12),
                        backgroundColor: '#0078d4'
                    }}>
                        <Text tx="successScreen.btnCreateOrder" style={{ fontSize: fontSize.size14, color: 'white', fontWeight: '600' }} />
                    </TouchableOpacity>}
                <TouchableOpacity
                    onPress={() => {
                        orderStore.setOrderId(idOrder);
                        navigation.navigate("orderDetails" as never)
                    }}
                    style={{ justifyContent: 'center', alignItems: 'center', marginTop: scaleHeight(15) }}>
                    <Text tx="successScreen.btnDetailOrder" style={{ fontSize: fontSize.size14, color: '#0078D4', fontWeight: '700' }} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('mainBottom' as never, { isReload: true })
                    }}
                    style={{ justifyContent: 'center', alignItems: 'center', marginTop: scaleHeight(15), marginBottom: scaleHeight(30) }}>
                    <Text tx="successScreen.btnBack" style={{ fontSize: fontSize.size14, color: '#0078D4', fontWeight: '700' }} />
                </TouchableOpacity>
            </View>
        </View >
        // </View>
    )
}