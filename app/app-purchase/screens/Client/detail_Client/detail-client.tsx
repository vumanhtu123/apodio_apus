import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { FC, } from "react";

import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Header, Text } from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { colors, fontSize, padding, scaleHeight, scaleWidth } from "../../../theme";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StylesClient } from "./styles";
import ItemlistUnpaid from "../Item/Item-list-unpaid";
import { FlatList } from "react-native";
import { NavigatorParamList } from "../../../navigators";


export const detailClientScrent: FC<StackScreenProps<NavigatorParamList, "detailClient">> = observer(

    function DetaiClient(props) {



        const dataUnPaid = [
            {
                id: "DH12324",
                date: "09: 00 12/12/2023",
                money: "24.000.000",
            },
            {
                id: "DH1232",
                date: "09: 00 12/12/2023",
                money: "24.000.000",
            },
            {
                id: "DH123245",
                date: "09: 00 12/12/2023",
                money: "24.000.000",
            },
            {
                id: "DH123242",
                date: "09: 00 12/12/2023",
                money: "24.000.000",
            },
            {
                id: "DH123247",
                date: "09: 00 12/12/2023",
                money: "24.000.000",
            },
            {
                id: "DH125324",
                date: "09: 00 12/12/2023",
                money: "24.000.000",
            },
            {
                id: "DH3125324",
                date: "09: 00 12/12/2023",
                money: "24.000.000",
            },
        ]

        return (
            <View style={{ flex: 1, }}>
                <View style={{ zIndex: 0 }}>
                    <Header
                        headerTx="ClientScreen.detailClient"
                        LeftIcon={Svgs.back}
                        titleStyle={{ alignSelf: 'flex-start' }}
                        style={{ height: scaleHeight(73), }}
                        onLeftPress={() => props.navigation.goBack()}
                    />
                    <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                        colors={[colors.palette.navyBlue, colors.palette.malibu]}
                        style={{ height: scaleHeight(73) }}
                    ></LinearGradient>


                </View>
                <View
                    style={StylesClient.bodyInfor}
                >
                    <View style={StylesClient.styleInforTop}>
                        <View>
                            <Text tx="NCCScreen.iHaveToCollect" style={{ fontSize: fontSize.size12, fontWeight: '400' }}>

                            </Text>
                            <Text style={StylesClient.txMoney}>
                                5.555.555đ
                            </Text>
                            <Text style={{ fontSize: scaleWidth(10), fontWeight: "400" }}>
                                Ngày hết hạn: 12/09/2023
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={StylesClient.btnWriteTT}
                        >
                            <Text style={{ fontSize: 10, color: colors.white, fontWeight: '400' }}>
                                Ghi nhận thanh toán
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 1, backgroundColor: colors.solitude2 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: scaleWidth(16) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Svgs.icon_calendar width={14} height={14} />
                            <Text
                                style={{ fontSize: fontSize.size10, fontWeight: "400", marginHorizontal: 6 }}
                                tx="ClientScreen.setUpAutomaticDebtReminders"
                            />
                        </View>
                        <TouchableOpacity>
                            <Text
                                style={{ fontSize: scaleWidth(10), fontWeight: "400", color: colors.palette.navyBlue }}
                                tx="ClientScreen.change"
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ padding: 16, marginTop: scaleHeight(60), marginBottom: scaleHeight(12) }}>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: colors.nero, fontFamily: 'Inter-ExtraBold' }}>
                        Danh sách giao dịch chưa thanh toán
                    </Text>
                </View>

                <FlatList
                    style={{ marginBottom: 20 }}
                    data={dataUnPaid}
                    renderItem={({ item }) => <ItemlistUnpaid item={item} />}
                    showsVerticalScrollIndicator={false} // Tắt thanh trạng thái bên phải
                />

            </View >
        )
    }

);