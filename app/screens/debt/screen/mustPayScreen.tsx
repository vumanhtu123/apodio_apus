
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { TabScreenProps } from "../../../navigators/bottom-navigation";
import { NavigatorParamList } from "../../../navigators";
import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Header, Text } from "../../../components";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { Images } from "../../../../assets";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Styles } from "./styles";

export const MustPayScreen: FC<StackScreenProps<NavigatorParamList, "mustPay">> = observer(
    function mustPayScreen(props) {
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
                />
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                    colors={[colors.palette.navyBlue, colors.palette.malibu]}
                    style={{ height: scaleHeight(80) }}
                ></LinearGradient>
                <View
                    style={Styles.bodyCard}
                >

                    <View
                        style={{ flexDirection: "row", marginTop: scaleWidth(16), justifyContent: 'space-between' }}
                    >
                        <TouchableOpacity style={Styles.bodyItem}>

                            <Text style={Styles.upcase}>0</Text>
                            <Text style={{ fontSize: (12), textAlign: 'center' }} tx="debtScreen.totalNumberOfSuppliersIncurringDebt"></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.bodyItem}>

                            <Text style={Styles.upcase}>0</Text>
                            <Text style={{ fontSize: (12) }} tx="debtScreen.totalDebtMustPay"></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
)