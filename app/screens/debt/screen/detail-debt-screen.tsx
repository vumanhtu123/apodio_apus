import { StackScreenProps } from "@react-navigation/stack";
import { FC, useState } from "react";
import { NavigatorParamList } from "../../../navigators";
import { observer } from "mobx-react-lite";
import { TouchableOpacity, View, FlatList } from "react-native";
import { Header, Text } from "../../../components";
import { colors, margin, padding, scaleHeight, scaleWidth } from "../../../theme";
import { Images } from "../../../../assets";
import en from "../../../i18n/en";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Styles } from "./styles";
import data from "../../../components/svg-icon/data";
import { styles } from "../../login/styles";
import { ModalExchange } from "../component/ModalExchange";

export const DetailDebtScreen: FC<StackScreenProps<NavigatorParamList, "detailDebt">> = observer(
    function detailDebtScreen(props) {
        const [valueItemSelect, setValueItemSelect] = useState("")
        const [refreshing, setRefreshing] = useState(false);
        const [isLoadingMore, setIsLoadingMore] = useState(false);
        const [isVisible, setIsVisible] = useState(false)


        interface DataItem {
            id: string,
            order: string,
            valueOrder: string,
            paid: string,
            dateOfPayment: string,
            remainingDebt: string,
            latePaymentPenalty: string,
            totalRemainingDebt: string,
            paymentTerm: string,
            exchange: number,
            createDateTransaction: string
        }

        const fakeData: DataItem[] = [

            {
                id: "1",
                order: "DH_30102511",
                valueOrder: "21.000.000 đ",
                paid: "15.500.000 đ",
                dateOfPayment: " 04/01/2022",
                remainingDebt: "5.500.000",
                latePaymentPenalty: "700.000 đ",
                totalRemainingDebt: "6.200.000 đ",
                paymentTerm: '12/01/2022',
                exchange: 5,
                createDateTransaction: "08/10/2020"

            },
            {
                id: "2",
                order: "DH_30102511",
                valueOrder: "21.000.000 đ",
                paid: "15.500.000 đ",
                dateOfPayment: " 04/01/2022",
                remainingDebt: "5.500.000",
                latePaymentPenalty: "700.000 đ",
                totalRemainingDebt: "6.200.000 đ",
                paymentTerm: '12/01/2022',
                exchange: 5,
                createDateTransaction: "08/10/2020"

            },
            {
                id: "3",
                order: "DH_30102511",
                valueOrder: "21.000.000 đ",
                paid: "15.500.000 đ",
                dateOfPayment: " 04/01/2022",
                remainingDebt: "5.500.000",
                latePaymentPenalty: "700.000 đ",
                totalRemainingDebt: "6.200.000 đ",
                paymentTerm: '13/01/2022',
                exchange: 5,
                createDateTransaction: "08/11/2020"


            },
            {
                id: "4",
                order: "DH_30102511",
                valueOrder: "21.000.000 đ",
                paid: "15.500.000 đ",
                dateOfPayment: " 04/01/2022",
                remainingDebt: "5.500.000",
                latePaymentPenalty: "700.000 đ",
                totalRemainingDebt: "6.200.000 đ",
                paymentTerm: '13/01/2022',
                exchange: 5,
                createDateTransaction: "08/11/2020"


            },
            {
                id: "5",
                order: "DH_30102511",
                valueOrder: "21.000.000 đ",
                paid: "15.500.000 đ",
                dateOfPayment: " 04/01/2022",
                remainingDebt: "5.500.000",
                latePaymentPenalty: "700.000 đ",
                totalRemainingDebt: "6.200.000 đ",
                paymentTerm: '12/01/2022',
                exchange: 5,
                createDateTransaction: "08/11/2020"

            },
        ]
        const groupBy = (data: DataItem[], key: string) => {
            return data.reduce((result: { [key: string]: DataItem[] }, item: any) => {
                const value = item[key];
                if (!result[value]) {
                    result[value] = [];
                }
                result[value].push(item);
                return result;
            }, {});


        }
        const dataGroup = groupBy(fakeData, 'createDateTransaction')
        console.log('====================================');
        console.log("data groupBy", groupBy(fakeData, 'createDateTransaction'));
        console.log('====================================');
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
                    headerTx="debtScreen.detailDebt"
                    onLeftPress={() => {
                        props.navigation.goBack()
                    }}
                    titleStyle={Styles.textHeader}
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

                            <Text style={[Styles.styleNumber, { color: colors.palette.textExCancle }]}>{`100.000 ${'đ'}`}</Text>
                            <Text style={{ fontSize: (12), textAlign: 'center' }} tx="debtScreen.debtNeedToPaid"></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{ alignItems: 'center', flex: 1 }]}>

                            <Text style={[Styles.styleNumber, { color: colors.palette.textExCancle }]}>12/01/2022</Text>
                            <Text style={{ fontSize: (12) }} tx="debtScreen.paymentTerm"></Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    style={{ marginTop: 50 }}
                    data={Object.entries(dataGroup)}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={([createDateTransaction]) => createDateTransaction}
                    renderItem={({ item: [createDateTransaction, products] }) => {
                        return (
                            <View style={[Styles.groupContainer,]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: scaleHeight(15) }}>
                                    <View style={{ width: '40%', height: 1, backgroundColor: "#E6E7EA" }} />
                                    <Text style={Styles.dateText}>{createDateTransaction}</Text>
                                    <View style={{ width: '40%', height: 1, backgroundColor: "#E6E7EA" }} />
                                </View>
                                {
                                    products.map((item, index) => (
                                        <View key={item.id} style={{ backgroundColor: '#FFF', marginBottom: 10, borderRadius: margin.margin_8, padding: scaleWidth(15) }}>
                                            <View style={Styles.flexRow}>
                                                <Text tx="debtScreen.order" style={Styles.label} />
                                                <Text style={Styles.styleOrder} >{item.order}</Text>

                                            </View>
                                            <View style={Styles.flexRow}>
                                                <Text tx="debtScreen.valueOrder" style={Styles.label} />
                                                <Text style={[Styles.styleOrder, { color: colors.palette.malachite }]} >{item.valueOrder}</Text>
                                            </View>
                                            <View style={Styles.flexRow}>
                                                <Text tx="debtScreen.paid" style={Styles.label} />
                                                <Text style={[Styles.styleOrder, { color: colors.palette.malachite }]} >{item.paid}</Text>
                                            </View>
                                            <View style={Styles.flexRow}>
                                                <Text tx="debtScreen.dateOfPayment" style={Styles.label} />
                                                <Text style={[Styles.styleOrder,]} >{item.dateOfPayment}</Text>
                                            </View>
                                            <View style={Styles.flexRow}>
                                                <Text tx="debtScreen.remainingDebt" style={Styles.label} />
                                                <Text style={[Styles.styleOrder, { color: colors.palette.radicalRed }]} >{item.remainingDebt}</Text>
                                            </View>
                                            <View style={Styles.flexRow}>
                                                <Text tx="debtScreen.latePaymentPenalty" style={Styles.label} />
                                                <Text style={[Styles.styleOrder, { color: colors.palette.radicalRed }]} >{item.latePaymentPenalty}</Text>
                                            </View>
                                            <View style={Styles.flexRow}>
                                                <Text tx="debtScreen.totalRemainingDebt" style={Styles.label} />
                                                <Text style={[Styles.styleOrder, { color: colors.palette.radicalRed }]} >{item.totalRemainingDebt}</Text>
                                            </View>
                                            <View style={Styles.flexRow}>
                                                <Text tx="debtScreen.paymentTerm2" style={Styles.label} />
                                                <Text style={[Styles.styleOrder,]} >{item.paymentTerm}</Text>
                                            </View>
                                            <TouchableOpacity style={Styles.flexRow}
                                                onPress={() => {
                                                    setIsVisible(!isVisible)
                                                }}
                                            >
                                                <Text tx="debtScreen.exChange" style={Styles.label} />
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Images.ic_messenger />
                                                    <Text style={[Styles.styleOrder, { color: colors.palette.navyBlue, marginHorizontal: 4 }]} >
                                                        {item.exchange}
                                                    </Text>
                                                    <Text style={[Styles.styleOrder, { color: colors.palette.radicalRed, }]}>(2 Chưa xem)</Text>

                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    ))
                                }

                            </View>
                        )

                    }}


                />

                {/* <ModalExchange
                    isVisible={isVisible}
                    setIsVisible={() => setIsVisible(!isVisible)}
                /> */}
            </View>
        )
    }
)