import { StackScreenProps } from "@react-navigation/stack";
import { FC, useState } from "react";
import { NavigatorParamList } from "../../../../navigators";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import React from "react";
import { Header, Text } from "../../../../components";
import { colors, fontSize, margin, scaleHeight, scaleWidth } from "../../../../theme";
import { Images } from "../../../../../assets";
import LinearGradient from "react-native-linear-gradient";
import { Styles } from "../styles";
import en from "../../../../i18n/en";
import CustomCalendar from "../../../../components/calendar";
import { DrawerToggleButton } from "@react-navigation/drawer";
import moment from "moment";
import ItemListTransaction from "../../component/itemListTransaction";
import ItemListNCC from "../../component/itemListNCC";
import { ModalPayReceivable } from "../../component/ModalPayReceivable";


export const ReceivableScreen: FC<StackScreenProps<NavigatorParamList, "receivable">> = observer(
    function receivableScreen(props) {
        const [selectTaskbar, setSelectTaskbar] = useState(0)
        const [isShortByDate, setIsShortByDate] = useState(false)
        const [refreshing, setRefreshing] = useState(false);
        const [isLoadingMore, setIsLoadingMore] = useState(false);
        const [IsReset, setIsReset] = useState<boolean>()
        const [makeDateE, setMakeDateE] = useState<any>()
        const [makeDateS, setMakeDateS] = useState<any>()
        const [timeStart, setTimeStart] = useState("")
        const [timeEnd, setTimeEnd] = useState("")
        const [isVisible, setIsVisible] = useState(false)
        const dataTaskBar = [
            { name: en.debtScreen.accordingToTransaction },
            { name: en.debtScreen.accordingToSupplier }
        ]

        interface DataItemTranSaction {
            id: number,
            name: string,
            valueOrder: string,
            order: string,
            paid: string,
            dateOfPayment: string,
            remainingDebt: string,
            paymentTerm: string,
            day: string

        }
        interface DataItemNCC {
            id: number,
            nameCompany: string,
            pay: number,
            day: string

        }

        const dataFake = [
            {
                id: 1,
                name: "Trần Thanh Bình",
                order: "DH_30102511",
                valueOrder: "21.000.000",
                paid: "15.500.000",
                dateOfPayment: " 04/01/2022",
                remainingDebt: "5.500.000",
                paymentTerm: '12/01/2022',
                day: "09/12/2023",
            },
            {
                id: 2,
                name: "Hạnh Thơm Bình",
                order: "DH_30102511",
                valueOrder: "21.000.000",
                paid: "15.500.000",
                dateOfPayment: " 04/01/2022",
                remainingDebt: "5.500.000",
                paymentTerm: '12/01/2022',
                day: "08/12/2023",
            },
            {
                id: 3,
                name: "Trần Minh Quang",
                order: "DH_30102511",
                valueOrder: "21.000.000",
                paid: "15.500.000",
                dateOfPayment: " 04/01/2022",
                remainingDebt: "5.500.000",
                paymentTerm: '12/01/2022',
                day: "09/12/2023",
            },
            {
                id: 4,
                name: "Quốc Văn Lang",
                order: "DH_30102511",
                valueOrder: "21.000.000",
                paid: "15.500.000",
                dateOfPayment: " 04/01/2022",
                remainingDebt: "5.500.000",
                paymentTerm: '12/01/2022',
                day: "08/12/2023",
            },
            {
                id: 5,
                name: "Lang Văn Trung",
                order: "DH_30102511",
                valueOrder: "21.000.000",
                paid: "15.500.000",
                dateOfPayment: " 04/01/2022",
                remainingDebt: "5.500.000",
                paymentTerm: '12/01/2022',
                day: "08/12/2023",
            }
        ]

        const dataNhaCC = [
            {
                id: 1,
                nameCompany: "Công ty TNHH MVT Mặt Trời Hồng",
                pay: 15500000,
                day: "08/12/2023"
            },
            {
                id: 2,
                nameCompany: "Công ty CP Nguyễn Nam",
                pay: 15500000,
                day: "08/12/2023"
            },
            {
                id: 3,
                nameCompany: "Công ty CP Nguyễn Nam",
                pay: 15500000,
                day: "09/12/2023"
            },
            {
                id: 4,
                nameCompany: "Công ty CP Nguyễn Nam",
                pay: 15500000,
                day: "09/12/2023"
            },
            {
                id: 5,
                nameCompany: "Công ty TNHH MVT Mặt Trời Hồng",
                pay: 15500000,
                day: "09/12/2023"
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


        const groupByOfDayTranSaction = (data: DataItemTranSaction[], key: string) => {

            return data.reduce((result: { [key: string]: DataItemTranSaction[] }, item: any) => {
                const value = item[key];
                if (!result[value]) {
                    result[value] = [];
                }
                result[value].push(item)
                return result
            }, {})
        }
        const groupByOfDayNhaCC = (data: DataItemNCC[], key: string) => {

            return data.reduce((result: { [key: string]: DataItemNCC[] }, item: any) => {
                const value = item[key];
                if (!result[value]) {
                    result[value] = [];
                }
                result[value].push(item)
                return result
            }, {})
        }

        const myDataCompanyByOfDay = groupByOfDayNhaCC(dataNhaCC, 'day')
        const myGroupByOfDay = groupByOfDayTranSaction(dataFake, 'day')
        console.log('data group', groupByOfDayTranSaction(dataFake, 'day'))

        const toggleModalDate = () => {
            setIsShortByDate(!isShortByDate)
        }
        return (
            <View style={{ flex: 1, }}>
                <Header
                    LeftIcon={Images.back}
                    leftText="dashboard.debt"
                    style={{ height: scaleHeight(52) }}
                    RightIcon1={Images.ic_calender_white}
                    onLeftPress={() => {
                        props.navigation.goBack()
                    }}
                    onRightPress1={() => toggleModalDate()}
                    rightText1={` ${moment(timeStart).format("DD/MM/YYYY")} - ${moment(timeEnd).format("DD/MM/YYYY")} `}
                />
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                    colors={[colors.palette.navyBlue, colors.palette.malibu]}
                    style={{ height: scaleHeight(50) }}
                ></LinearGradient>

                <View
                    style={[Styles.bodyCardMusPay, { position: 'absolute', top: scaleWidth(50) }]}
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

                <View style={{
                    backgroundColor: colors.palette.veryLightGrey,
                    marginTop: scaleHeight(60),
                    flexDirection: 'row',
                    padding: scaleWidth(2),
                    marginHorizontal: scaleWidth(16),
                    borderRadius: scaleWidth(8)

                }}>
                    {
                        dataTaskBar.map((item: any, index) => {
                            return (
                                <TouchableOpacity style={[
                                    Styles.taskBar,
                                    { backgroundColor: selectTaskbar === index ? colors.palette.white : colors.palette.veryLightGrey }
                                ]}
                                    onPress={() => {
                                        // console.log('index', index);
                                        setSelectTaskbar(index)
                                    }}
                                    key={item.name}
                                >
                                    <Text>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>

                {
                    selectTaskbar == 0 ?
                        <FlatList
                            style={{ marginTop: scaleWidth(20) }}
                            data={Object.entries(myGroupByOfDay)}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={([day]) => day}

                            renderItem={({ item: [day, products] }) => {
                                console.log('====================================');
                                console.log('dataItem', products);
                                console.log('====================================');
                                return (
                                    <View style={[Styles.groupContainer,]}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginVertical: scaleHeight(15)
                                        }}
                                        >
                                            <View style={{ width: '40%', }} />
                                            <Text style={Styles.dateText}>{day}</Text>
                                            <View style={{ width: '40%', }} />
                                        </View>
                                        {
                                            products.map((item, index) => (
                                                <ItemListTransaction
                                                    item={item}
                                                    onPress={() => props.navigation.navigate('detailReceivable')}
                                                    key={item.id}

                                                />
                                            ))
                                        }

                                    </View>
                                )
                            }}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.2}
                            ListFooterComponent={() => isLoadingMore && <ActivityIndicator />}
                        />
                        :
                        <FlatList
                            data={Object.entries(myDataCompanyByOfDay)}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={([day]) => day}
                            renderItem={({ item: [day, company] }) => {
                                return (
                                    <View style={{ marginHorizontal: scaleWidth(16) }}>
                                        <Text style={[Styles.dateText,
                                        {
                                            textAlign: 'center',
                                            marginBottom: scaleWidth(8),
                                            marginTop: scaleWidth(20)
                                        }
                                        ]}
                                        >
                                            {day}
                                        </Text>
                                        {
                                            company.map((item, index) => (
                                                <ItemListNCC
                                                    key={item.id}
                                                    item={item}
                                                    isVisible={isVisible}
                                                    setIsVisible={setIsVisible}
                                                />
                                            ))
                                        }
                                    </View>
                                )
                            }}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.2}
                            ListFooterComponent={() => isLoadingMore && <ActivityIndicator />}
                        />

                }


                <CustomCalendar
                    onReset={() => setIsReset(!IsReset)}
                    handleShort={() => {
                        setMakeDateS(timeStart)
                        setMakeDateE(timeEnd)
                        toggleModalDate()
                    }}
                    onMarkedDatesChangeS={(markedDateS: string) => {
                        setTimeStart(markedDateS)
                    }}
                    onMarkedDatesChangeE={(markedDateE: string) => {
                        setTimeEnd(markedDateE)
                    }}
                    isShowTabs={true}
                    isSortByDate={isShortByDate}
                    toggleModalDate={toggleModalDate}
                />
                <ModalPayReceivable
                    isVisible={isVisible}
                    setIsVisible={() => setIsVisible(!isVisible)}
                />
            </View>

        )
    }
)