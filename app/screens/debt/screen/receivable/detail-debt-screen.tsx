import { StackScreenProps } from "@react-navigation/stack";
import { FC, useState } from "react";
import { NavigatorParamList } from "../../../../navigators";
import { observer } from "mobx-react-lite";
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import React from "react";
import { Header, Text } from "../../../../components";
import { colors, fontSize, padding, palette, scaleHeight, scaleWidth } from "../../../../theme";
import { Images } from "../../../../../assets";
import { Styles } from "../styles";
import { commasToDots, formatCurrency, formatVND } from "../../../../utils/validate";
import ItemDetailDebt from "./item-detail-debt";
import { ModalPayReceivable } from "../../component/ModalPayReceivable";


export const DetailReceivable: FC<StackScreenProps<NavigatorParamList, 'detailReceivable'>> = observer(
    function detailDebtScreen(props) {
        const [isVisible, setIsVisible] = useState(false)
        const [refreshing, setRefreshing] = useState(false);
        const [isLoadingMore, setIsLoadingMore] = useState(false);

        const dataPayDebt = [
            {
                id: 1,
                day: '12/02/2020',
                debtAccordingToOrder: 150000000,
                phoneNumber: '0922552621',
                statusDebt: false
            },
            {
                id: 2,
                day: '1/02/2020',
                payDebt: 268000000,
                statusDebt: true
            },
            {
                id: 3,
                day: '12/02/2020',
                debtAccordingToOrder: 150000000,
                phoneNumber: '0922552621',
                statusDebt: false
            },
            {
                id: 4,
                day: '12/02/2020',
                debtAccordingToOrder: 150000000,
                phoneNumber: '0922552621',
                statusDebt: false
            },
            {
                id: 5,
                day: '1/02/2020',
                payDebt: 268000000,
                statusDebt: true
            },
            {
                id: 6,
                day: '12/04/2020',
                debtAccordingToOrder: 150000000,
                phoneNumber: '0922552621',
                statusDebt: false
            },
            {
                id: 7,
                day: '12/04/2020',
                debtAccordingToOrder: 150000000,
                phoneNumber: '0922552621',
                statusDebt: false
            },


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

        return (
            <View style={{ flex: 1 }}>
                <Header
                    LeftIcon={Images.back}
                    headerTx="debtScreen.detailDebt"
                    onLeftPress={() => props.navigation.goBack()}
                    style={{ height: scaleHeight(52) }}
                />
                <View
                    style={Styles.styleBody}
                >

                    <View
                        style={Styles.styleHeaderCard}

                    >
                        <View style={[Styles.flexRow, { alignItems: 'center' }]}>

                            <View style={{}}>

                                <Text style={{ fontSize: (12), }} tx="debtScreen.debtNeedToPaid"></Text>
                                <Text style={[Styles.styleNumber, { color: colors.palette.textExCancle }]}>{formatVND(formatCurrency(commasToDots(100000)))}</Text>

                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={Styles.styleBtnPay}
                                    onPress={() => setIsVisible(!isVisible)}
                                >
                                    <Text style={{ fontSize: fontSize.size12, color: '#FFF' }}
                                        tx="debtScreen.pay2"
                                    ></Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={Styles.styleLine} />
                        <View style={Styles.flexRow}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Images.ic_Calender_gray />
                                <Text tx="debtScreen.setAutomaticCalender" style={{ marginLeft: 2, fontSize: fontSize.size12 }} />
                            </View>

                            <Text
                                tx="debtScreen.change"
                                style={{ fontSize: fontSize.size12, color: colors.palette.navyBlue }}
                            ></Text>

                        </View>
                    </View>

                    <View
                        style={[Styles.styleHeaderCard, { marginTop: scaleWidth(20), flexDirection: 'row', alignItems: 'center' }]}

                    >
                        <Images.ic_avatar />
                        <View>
                            <Text style={{ fontWeight: '600', fontSize: fontSize.size12 }}>
                                Công ty TNHH Mặt trời hồng
                            </Text>
                            <Text
                                style={{
                                    fontSize: fontSize.size12,
                                    color: '#747475'
                                }}
                            >
                                Đối tác vận chuyển
                            </Text>
                        </View>

                    </View>

                    <View
                        style={[Styles.flexRow, { marginHorizontal: scaleWidth(15), marginTop: scaleWidth(20) }]}
                    >
                        <View style={[Styles.flexRow]}>
                            <Text style={[Styles.fontSize10]} >5 </Text>
                            <Text tx="debtScreen.transaction" style={[Styles.fontSize10]} />
                        </View>
                        <View style={[Styles.flexRow]}>
                            <Text style={[Styles.fontSize10]} > </Text>
                            <Text tx="debtScreen.debtIncurred" style={[Styles.fontSize10]} />
                        </View>
                        <View style={[Styles.flexRow]}>
                            <Text style={[Styles.fontSize10]}> </Text>
                            <Text tx="debtScreen.ariseYes" style={[Styles.fontSize10]} />
                        </View>
                    </View>

                </View>

                <FlatList
                    style={{
                        flex: 1,
                        backgroundColor: '#FFF',
                        padding: scaleWidth(15),
                        borderRadius: scaleWidth(8),
                        marginHorizontal: scaleWidth(15),

                    }}
                    showsVerticalScrollIndicator={false}
                    data={dataPayDebt}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }: any) => <ItemDetailDebt item={item} />}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={() => {
                        // console.log('doan');
                        return isLoadingMore && <ActivityIndicator style={{ marginBottom: 20 }} />;
                    }}

                />

                <ModalPayReceivable
                    isVisible={isVisible}
                    setIsVisible={() => setIsVisible(!isVisible)}
                />
            </View >


        )
    }
)