import { observer } from "mobx-react-lite";
import { FC } from "react";
import { TabScreenProps } from "../../../navigators/bottom-navigation";
import { NavigatorParamList } from "../../../navigators";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Header, Text } from "../../../components";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { Images } from "../../../../assets";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Styles } from "./styles";

export const DebtScreen: FC<StackScreenProps<NavigatorParamList, "debt">> = observer(
    function debtScreen(props) {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    style={{ height: scaleHeight(52) }}
                    LeftIcon={Images.back}
                    headerTx="dashboard.debt"
                    onLeftPress={() => props.navigation.goBack()}
                />
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                    colors={[colors.palette.navyBlue, colors.palette.malibu]}
                    style={{ height: scaleHeight(80) }}
                ></LinearGradient>
                <View
                    style={Styles.bodyCard}
                >
                    <Text tx="dashboard.debt" />
                    <View
                        style={{ flexDirection: "row", marginTop: scaleWidth(16), justifyContent: 'space-between' }}
                    >
                        <TouchableOpacity style={Styles.bodyItem}
                            onPress={() => props.navigation.navigate('receivable')}
                        >
                            <Images.ic_receivables />
                            <Text tx="debtScreen.receivables" style={Styles.upcase}></Text>
                            <Text style={Styles.weightText}>939.000đ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.bodyItem}
                            onPress={() => props.navigation.navigate('mustPay')}
                        >
                            <Images.ic_toPay />
                            <Text tx="debtScreen.mustPay" style={Styles.upcase}></Text>
                            <Text style={Styles.weightText}>939.000đ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
)