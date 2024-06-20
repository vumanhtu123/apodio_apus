import { StackScreenProps } from "@react-navigation/stack";
import { FC, useState } from "react";
import { NavigatorParamList } from "../../../navigators";
import { observer } from "mobx-react-lite";
import { TouchableOpacity, View } from "react-native";
import { Header, Text } from "../../../components";
import { colors, scaleHeight } from "../../../theme";
import { Images } from "../../../../assets";
import en from "../../../i18n/en";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Styles } from "./styles";

export const DetailDebtScreen: FC<StackScreenProps<NavigatorParamList, "detailDebt">> = observer(
    function detailDebtScreen(props) {
        const [valueItemSelect, setValueItemSelect] = useState("")
        const [refreshing, setRefreshing] = useState(false);
        const [isLoadingMore, setIsLoadingMore] = useState(false);
        const [isVisible, setIsVisible] = useState(false)
        const fakeData: any = [

            {
                id: "1",
                name: "Công ty TNHH một thành viên APODIO",
                totalLiabilities: "2.000.000",
                paid: "1.000.000",
                musPay: "1.000.000"
            },
            {
                id: "2",
                name: "Công ty TNHH một thành viên APODIO",
                totalLiabilities: "2.000.000",
                paid: "1.000.000",
                musPay: "1.000.000"
            },
            {
                id: "3",
                name: "Công ty TNHH một thành viên APODIO",
                totalLiabilities: "2.000.000",
                paid: "1.000.000",
                musPay: "1.000.000"
            },
            {
                id: "4",
                name: "Công ty TNHH một thành viên APODIO",
                totalLiabilities: "2.000.000",
                paid: "1.000.000",
                musPay: "1.000.000"
            },
            {
                id: "5",
                name: "Công ty TNHH một thành viên APODIO",
                totalLiabilities: "2.000.000",
                paid: "1.000.000",
                musPay: "1.000.000"
            }
        ]

        const handleRefresh = () => {
            setRefreshing(true)

            setTimeout(() => {
                setRefreshing(false)
            }, 3000);
        }

        const handleLoadMore = () => {
            setIsLoadingMore(true)

            setTimeout(() => {
                setIsLoadingMore(false)
            }, 3000);
        }

        console.log('data fake', fakeData);

        return (
            <View style={{ flex: 1, }}>
                <Header
                    style={{ height: scaleHeight(52) }}
                    LeftIcon={Images.back}
                    headerTx="debtScreen.toPaydebt"
                    onLeftPress={() => {
                        props.navigation.goBack()
                    }}
                    RightIcon={Images.ic_calender_white}
                    btnRightStyle={{}}
                    headerInput={true}
                    searchText={en.NCCScreen.nameSuppliers}
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

                            <Text style={[Styles.styleNumber, { color: colors.palette.textExCancle }]}>{`10 ${'đ'}`}</Text>
                            <Text style={{ fontSize: (12), textAlign: 'center' }} tx="debtScreen.debtNeedToPaid"></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{ alignItems: 'center', flex: 1 }]}>

                            <Text style={[Styles.styleNumber, { color: colors.palette.textExCancle }]}>12/01/2022</Text>
                            <Text style={{ fontSize: (12) }} tx="debtScreen.paymentTerm"></Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
)