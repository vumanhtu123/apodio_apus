import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../navigators";
import { FC, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { View,TouchableOpacity, StyleSheet, Platform, Alert } from "react-native";
import React from "react";
import { Header, Text } from '../../components';
import { Images } from "../../../assets";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme";
import { FlashList } from "@shopify/flash-list";
import CustomCalendar from "../../components/calendar";


export const ImprotGoodsBook: FC<StackScreenProps<NavigatorParamList,"importGoodsBook">> = observer (
    function importGoodsBook(props) {
        interface DateItem {

            id: string,
            time: string,
            date: string,
            status: string,
            total: String
        }

        const dataListGoodsDeliveryBook: DateItem[] = [
            {
                id: "#PXH00001",
                time: "13:56",
                date: "26/4/2024",
                status: "Đã thanh toán",
                total: '0'
            },
            {
                id: "#PXH00003",
                time: "13:56",
                date: "26/4/2024",
                status: "Đã thanh toán",
                total: '2'
            },
            {
                id: "#PXH00001",
                time: "13:56",
                date: "26/4/2024",
                status: "Đã thanh toán",
                total: '5'
            },
            {
                id: "#PXH00011",
                time: "13:56",
                date: "24/4/2024",
                status: "Đã thanh toán",
                total: '1'
            },
            {
                id: "#PXH00002",
                time: "13:56",
                date: "26/3/2024",
                status: "Đã thanh toán",
                total: '3'
            },
            {
                id: "#PXH00004",
                time: "13:56",
                date: "26/3/2024",
                status: "Chưa thanh toán",
                total: '2'
            },
            {
                id: "#PXH00044",
                time: "13:56",
                date: "25/3/2024",
                status: "Chưa thanh toán",
                total: '8'
            }
        ]

        const [displayedData, setDisplayedData] = useState<DateItem[]>(dataListGoodsDeliveryBook)

        const handbleSlectdate = (selectType: any) => {
            let filterData: DateItem[];

            const today = new Date()
            var day = today.getDate();
            var currentMonth = today.getMonth() + 1
            var fullMonth = currentMonth < 10 ? `${0}+${currentMonth}` : currentMonth

            var currentYear = today.getFullYear()

            var fullDay = `${day}/${currentMonth}/${currentYear}`
            // console.log('====================================');
            // console.log(fullDay);
            // console.log('====================================');

            // console.log('====================================');
            // console.log(`${ 'ngay'+day}`,`${'thang'+currentMoth}`, `${'name'+currentYear}`);
            // console.log('====================================');

            switch (selectType) {
                case 'toDay':
                    filterData = dataListGoodsDeliveryBook.filter(item => item.date.includes(fullDay))
                    console.log('aaa', filterData);

                    break;
                case 'month':
                    filterData = dataListGoodsDeliveryBook.filter(item => item.date.includes(`${currentMonth}/${currentYear}`))
                    console.log('bbb', filterData);
                    break;
                case 'previous':

                    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1
                    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear

                    filterData = dataListGoodsDeliveryBook.filter(item => item.date.includes(`/${previousMonth}/${previousYear}`))
                    console.log('ccc', filterData);
                    break;
                default:
                    filterData = dataListGoodsDeliveryBook


            }
            console.log('doandevvvvv', filterData);

            setDisplayedData(filterData)
        }
        const [isCLickTabBar, setisCLickTabBar] = useState(0)
        const [selectCalendar, setSelectCalendar] = useState(1);

        const [isSortByDate, setIsSortByDate] = useState<boolean>(false);

        const [isReset, setIReset] = useState<boolean>(false)
        const today = new Date()
        const sevenDaysBefore = new Date(today)
        const markedDatesSRef = useRef('');
        const markedDatesERef = useRef('');

        const [markedDatesS, setMarkedDatesS] = useState("")
        const [markedDatesE, setMarkedDatesE] = useState("")
        markedDatesSRef.current = markedDatesS ? markedDatesS : sevenDaysBefore.toString();
        markedDatesERef.current = markedDatesE ? markedDatesE : today.toString();

        const tongleModalDate = () => {
            setIsSortByDate(!isSortByDate)
        }
        return (
            <View style={{ flex: 1 }}>
                <Header
                    LeftIcon={Images.back}
                    style={{ height: scaleHeight(51) }}
                    headerInputCenter={true}
                    textBelowIconRightSearch={true}
                    RightIconTextInputCenter={Images.ic_dowload}
                    onLeftPress={() => props.navigation.goBack()}
                />

                <View style={{ flex: 1 ,zIndex:1}}>


                    {
                        dataListGoodsDeliveryBook ?
                            <View style={{ flex: 1, padding: scaleWidth(14) }}>


                                <View style={{ flexDirection: "row", marginBottom: scaleHeight(15), zIndex: 1 }}>

                                    <TouchableOpacity
                                        style={{
                                            borderRadius: 8,
                                            backgroundColor: '#D9DADD',
                                            width: scaleWidth(32),
                                            height: scaleHeight(36),
                                            marginRight: scaleWidth(16),
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                        }}
                                        onPress={() => {
                                            tongleModalDate()
                                            // console.log('ok');

                                        }}
                                    >
                                        <Images.ic_Calender_gray />
                                    </TouchableOpacity>


                                    <View style={{
                                        // width:scaleWidth(260),
                                        // height:scaleHeight(32), 
                                        backgroundColor: '#D9DADD',
                                        borderRadius: 8,
                                        justifyContent: 'space-evenly',
                                        flexDirection: 'row',
                                        paddingVertical: 2
                                    }}>
                                        <TouchableOpacity style={{
                                            // width:scaleWidth(80), 
                                            paddingHorizontal: (scaleWidth(12)),
                                            paddingVertical: (scaleHeight(8)),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: selectCalendar === 1 ? "#FFF" : "#D9DADD",
                                            borderRadius: 8
                                        }}
                                            onPress={() => {
                                                handbleSlectdate('toDay')
                                                setSelectCalendar(1)
                                            }}
                                        >
                                            <Text style={Styles.TextTabbar}>Hôm nay</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            // width:scaleWidth(80), 
                                            paddingHorizontal: (scaleWidth(12)),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: selectCalendar === 2 ? "#FFF" : "#D9DADD",
                                            borderRadius: 8
                                        }}
                                            onPress={() => {
                                                handbleSlectdate('month')
                                                setSelectCalendar(2)
                                            }}
                                        >
                                            <Text style={Styles.TextTabbar}>Tháng này</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            // width:scaleWidth(80),
                                            paddingHorizontal: (scaleWidth(12)),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: selectCalendar === 3 ? "#FFF" : "#D9DADD",
                                            borderRadius: 8
                                        }}
                                            onPress={() => {
                                                handbleSlectdate('previous')
                                                setSelectCalendar(3)
                                            }}
                                        >
                                            <Text style={Styles.TextTabbar}>Tháng trước</Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>
                                <FlashList
                                    style={{ marginTop: scaleWidth(15),  flex: 1 }}
                                    data={displayedData}
                                    showsVerticalScrollIndicator={false}

                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity style={Styles.bodyItem}
                                                onPress={() => props.navigation.navigate('detailImportReceipt',{dataItemGoodsImportBook: item})}
                                            
                                            >
                                                <View style={{

                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',

                                                }}
                                    
                                                >
                                                    <View>
                                                        <Text style={{ fontSize: 12, fontWeight: '600', color: '#333' }}>{item.id}</Text>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={Styles.stylesTextTime} >{item.time} </Text>
                                                            <Text style={Styles.stylesTextTime}> {item.date}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ backgroundColor: item.status === 'Đã thanh toán' ? '#DAFBDF' : '#FFEFF0', height: 14, paddingVertical: 2 }}>
                                                        <Text style={{ fontSize: 8, color: item.status === 'Đã thanh toán' ? '#00CC6A' : 'red' }}>
                                                            {item.status}
                                                        </Text>

                                                    </View>

                                                </View>
                                                <View style={Styles.line}></View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={Styles.stylesTextTime}>
                                                        Tổng cộng
                                                    </Text>
                                                    <Text style={{ fontSize: scaleWidth(12) }}>
                                                        {item.total}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                        )
                                    }}

                                />
                            </View>

                            :
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Images.img_not_init />
                                <Text tx='GoodsExportBook.notCreateExportGoods' />
                            </View>
                    }



                    <TouchableOpacity style={{
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 30, position: 'absolute', paddingHorizontal: scaleWidth(18),
                        paddingVertical: scaleHeight(8),
                        backgroundColor: colors.palette.navyBlue,
                        bottom: Platform.OS === 'ios' ? scaleHeight(20) : scaleHeight(5),
                        right: scaleWidth(16)
                    }}

                        onPress={() => {
                            // Alert.alert('ok')
                            props.navigation.navigate('createImportGoods')

                        }}
                    >
                        <Images.icon_plus width={scaleWidth(16)} height={scaleHeight(16)} style={{ marginRight: 6, marginTop: 2 }} />
                        <Text style={{ color: 'white', fontSize: fontSize.size14 }} tx='ImprotGoodsBook.createImportGoods' ></Text>
                    </TouchableOpacity>

                </View>
                {/* <View style={{ width: '100%',height:40, position: 'absolute', top: 50, alignItems:'center',flexDirection: 'row', backgroundColor: '#F2FAF6', paddingVertical: scaleHeight(7), paddingHorizontal: scaleWidth(16),zIndex:2 }}>

                    <Images.ic_Tick_Green />
                    <Text style={{ fontSize: scaleWidth(12), color: colors.palette.malachite, marginLeft:3 }}>
                        Lưu phiếu xuất hàng thành công
                    </Text>
                </View> */}
                <CustomCalendar
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
                />
            </View>
        )
    }
) 

const Styles = StyleSheet.create({
    stylesTextTime: {
        fontSize: 10
    },
    TextTabbar:{
        fontSize:12,
    },
    line: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#F6F7FB',
        marginVertical: scaleWidth(12)
    },
    bodyItem: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingVertical: scaleHeight(10),
        paddingHorizontal: scaleWidth(16),
        marginBottom: scaleWidth(15)
    }
})