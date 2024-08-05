import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { FC } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Styles } from "../style";
import { Header, Text } from "../../../../components";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { Svgs } from "../../../../../assets/svgs";
import CustomCalendar from "../../../../components/calendar";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../../navigators/app-navigator";


export const TransactionHistoryScreen: FC<StackScreenProps<NavigatorParamList, 'transactionHistoryDetail'>> = observer(
    function tranSactionHistory(props) {

        const navigation = useNavigation();
        const [reset, setReset] = useState(false)
        const [openCalender, setOpenCalender] = useState(false)
        const [onMarkedDatesChangeS, setOnMarkedDatesChangeS] = useState('')
        const [onMarkedDatesChangeE, setonMarkedDatesChangeE] = useState('')



        const toggleModalDate = () => {
            setOpenCalender(!openCalender)
            // console.log('====================================');
            // console.log(onMarkedDatesChangeE);
            // console.log('====================================');
        }

        const currentDate = new Date();

        var options = {
            timeZone: 'Asia/Ho_Chi_Minh', // Múi giờ Việt Nam
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        const formatter = new Intl.DateTimeFormat('vi-VN', options);

        const date = formatter.format(currentDate)

        const dataTransaction = [
            {
                id: '01',
                name: 'Thanh toán đơn hàng',
                time: '03:52:45',
                status: true,
                price: "20.000.000"
            },
            {
                id: '02',
                name: 'Thanh toán đơn hàng',
                time: '03:52:45',
                status: true,
                price: "20.000.000"
            }
        ]

        interface Item {
            id: String,
            name: String,
            time: String,
            status: boolean,
            price: String
        }
        const ItemTransactionHistory = ({ item }: { item: Item }) => {
            return (
                <TouchableOpacity style={{ backgroundColor: colors.palette.white, marginBottom: scaleWidth(20), borderRadius: 8, }}
                    onPress={() => {
                        // console.log(item.id);

                        navigation.navigate('transactionHistoryDetail')
                    }}
                >
                    <View style={Styles.BodyItem}>
                        <View style={Styles.ItemList}>
                            <View style={{ flexDirection: 'row' }}>

                                <Svgs.ic_pay />

                                <View
                                    style={{ justifyContent: 'space-evenly', marginLeft: scaleWidth(6) }}
                                >
                                    <Text style={{ fontWeight: "700", fontSize: scaleWidth(15) }}>{item.name}</Text>

                                    <Text style={{ fontSize: scaleWidth(12), color: colors.palette.lightGrey }}>id:  {item.id}</Text>
                                </View>

                            </View>
                            <View
                                style={{ justifyContent: 'space-evenly', alignItems: 'flex-end' }}
                            >
                                <Text style={{ fontSize: scaleWidth(12), color: colors.palette.lightGrey }} >{item.time}</Text>

                                <Text style={{ fontSize: scaleWidth(14), color: colors.palette.malachite, fontWeight: "700" }}>+{item.price}</Text>
                            </View>
                        </View>

                    </View>
                    <View
                        style={Styles.line}
                    />

                    <View
                        style={{ paddingVertical: scaleHeight(8), paddingHorizontal: scaleWidth(14) }}
                    >
                        {

                            item.status ? (
                                <Text style={{ color: colors.palette.malachite, fontSize: scaleWidth(12), fontWeight: '700' }}
                                    tx="tranSacTionHistory.success"
                                >

                                </Text>
                            ) : (
                                <Text
                                    tx="tranSacTionHistory.fail">

                                </Text>
                            )

                        }
                    </View>
                </TouchableOpacity>

            )
        }

        return (
            <View style={Styles.main}>
                <Header
                    headerTx="tranSacTionHistory.tranSactionHistory"
                    style={{ height: scaleHeight(52) }}
                    LeftIcon={Svgs.back}

                    onLeftPress={() => props.navigation.goBack()}
                />
                {
                    dataTransaction
                        ?
                        (
                            <View
                                style={{ flex: 1 }}
                            >
                                <View
                                    style={Styles.body2}
                                >
                                    <Text style={Styles.textDate}>
                                        {onMarkedDatesChangeS.split('-').reverse().join('-')} - {onMarkedDatesChangeE.split('-').reverse().join('-')}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => toggleModalDate()}
                                    >

                                        <Svgs.icon_calendar />
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{ flex: 1, paddingHorizontal: scaleWidth(15), paddingVertical: scaleHeight(20) }}
                                >
                                    <Text
                                        style={[Styles.textDate, { margin: scaleWidth(8), textAlign: 'center' }]}

                                    >
                                        {date}
                                    </Text>

                                    <FlatList
                                        data={dataTransaction}
                                        renderItem={({ item }) => <ItemTransactionHistory item={item} />}

                                    />

                                </View>
                            </View>
                        )
                        :
                        (
                            <View style={Styles.body}>
                                <Svgs.img_not_init />
                                <Text tx="message.noTransactionYet"

                                />
                            </View>
                        )
                }

                <CustomCalendar
                    handReset={() => setReset(!reset)}

                    // để đóng mở calender
                    handleShort={() =>
                        toggleModalDate()
                    }

                    onMarkedDatesChangeS={(markedDateS) => {
                        console.log('doandev', markedDateS);

                        setOnMarkedDatesChangeS(markedDateS)
                    }}

                    onMarkedDatesChangeE={(markedDateE) => {
                        console.log('doandev', markedDateE)
                        setonMarkedDatesChangeE(markedDateE)
                    }}
                    // để đóng mở calender
                    isSortByDate={openCalender}

                    toggleModalDate={toggleModalDate}

                />
                {/* <CustomCalendar
                    // isReset={isReset}
                    handleReset={() => setIReset(!isReset)}
                    handleShort={() => {
                        //   handleOrderMerchant()
                        tongleModalDate()

                    }}
                    onMarkedDatesChangeS={(markedDatesS) => {
                        setMarkedDatesS(markedDatesS)
                    }}
                    onMarkedDatesChangeE={(markedDatesE) => {
                        setMarkedDatesE(markedDatesE)
                    }}
                    isSortByDate={isSortByDate}
                    toggleModalDate={tongleModalDate}
                /> */}

            </View>
        )
    }
)