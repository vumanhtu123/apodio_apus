
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { TabScreenProps } from "../../../navigators/bottom-navigation";
import { NavigatorParamList } from "../../../navigators";
import React from "react";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Header, Text } from "../../../components";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { Images } from "../../../../assets";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Styles } from "./styles";
import { ItemListMustPay } from "../component/itemListMustPay";

export const MustPayScreen: FC<StackScreenProps<NavigatorParamList, "mustPay">> = observer(
    function mustPayScreen(props) {
        const faceData = [
            {
                id: 1,
                name: "NCC",
                totalLiabilities: "2.000.000",
                paid: "1.000.000",
                musPay: "1.000.000"
            },
            {
                id: 2,
                name: "NCC",
                totalLiabilities: "2.000.000",
                paid: "1.000.000",
                musPay: "1.000.000"
            },
            {
                id: 3,
                name: "NCC",
                totalLiabilities: "2.000.000",
                paid: "1.000.000",
                musPay: "1.000.000"
            }
        ]

        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <Header
                    style={{ height: scaleHeight(52) }}
                    LeftIcon={Images.back}
                    headerTx="debtScreen.toPaydebt"
                    onLeftPress={() => {
                        props.navigation.goBack()
                    }}
                    RightIcon={Images.ic_calender_white}
                    RightIcon1={Images.ic_slider}
                    btnRightStyle={{}}
                    headerInput={true}
                    searchText="Tên nhà cung cấp"
                />
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                    colors={[colors.palette.navyBlue, colors.palette.malibu]}
                    style={{ height: scaleHeight(50) }}
                ></LinearGradient>
                <View
                    style={Styles.bodyCardMusPay}
                >
                    <View
                        style={{ flexDirection: "row", justifyContent: 'space-between' }}
                    >
                        <TouchableOpacity style={[{ alignItems: 'center', flex: 1 }]}>

                            <Text style={[Styles.styleNumber, { color: colors.palette.navyBlue }]}>10</Text>
                            <Text style={{ fontSize: (12), textAlign: 'center' }} tx="debtScreen.totalNumberOfSuppliersIncurringDebt"></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{ alignItems: 'center', flex: 1 }]}>

                            <Text style={[Styles.styleNumber, { color: colors.palette.textExCancle }]}>{`10 ${'đ'}`}</Text>
                            <Text style={{ fontSize: (12) }} tx="debtScreen.totalDebtMustPay"></Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={faceData}
                    renderItem={({ item }) => <ItemListMustPay item={item} />}
                />
            </View>
        )
    }
)