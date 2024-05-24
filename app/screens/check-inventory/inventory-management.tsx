import { StackScreenProps } from "@react-navigation/stack";
import { FC, useRef, useState } from "react";
import {  AppStackScreenProps, NavigatorParamList, navigate } from "../../navigators";
import { observer } from "mobx-react-lite";
import React from "react";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../components";
import { Images } from "../../../assets";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme";
import { FlashList } from "@shopify/flash-list";
import { UserStatus } from "../../utils/const";
import { boolean, number } from "mobx-state-tree/dist/internal";
import CustomCalendar from "../../components/calendar";


export const InventoryManagement: FC<StackScreenProps<NavigatorParamList, "inventoryManagenment">> = observer(

    function inventoryManagement(props) {


        interface DateItem {

            id: string,
            time: string,
            date: string,
            status:string ,
        }

        const dataTabbar = [
            { name: "Tất cả" },
            { name: "Đang kiểm kho" },
            { name: "Đang cân bằng" },
            { name: "Lệch" },
            { name: " Trước" },
        ]

        const dataListInventory: DateItem[] = [
            {
                id: "#PXH00001",
                time: "13:56",
                date: "26/4/2024",
                status: "Đã thanh toán",
            },
            {
                id: "#PXH00003",
                time: "13:56",
                date: "26/4/2024",
                status: "Đã thanh toán",
            },
            {
                id: "#PXH00001",
                time: "13:56",
                date: "26/4/2024",
                status: "Đã thanh toán",
            },
            {
                id: "#PXH00011",
                time: "13:56",
                date: "24/4/2024",
                status: "Đã thanh toán",
            },
            {
                id: "#PXH00002",
                time: "13:56",
                date: "26/3/2024",
                status: "Đã thanh toán",
            },
            {
                id: "#PXH00004",
                time: "13:56",
                date: "26/3/2024",
                status: "Chưa thanh toán",
            },
            {
                id: "#PXH00044",
                time: "13:56",
                date: "25/3/2024",
                status: "Chưa thanh toán",
            }
        ]
        const [displayedData, setDisplayedData] = useState<DateItem[]>(dataListInventory)

        // console.log('doandev',displayedData);
        
        const handbleSlectdate = (selectType: any) => {
            let filterData: DateItem[];

            const today = new Date()
            var day = today.getDate();
            var currentMonth =  today.getMonth() + 1 
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
                    filterData = dataListInventory.filter(item => item.date.includes(fullDay))
                    console.log('aaa',filterData);

                    break;
                case 'month':
                    filterData = dataListInventory.filter(item => item.date.includes(`${currentMonth}/${currentYear}`))
                    console.log('bbb' ,filterData);
                    break;
                case 'previous':
                    
                    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1
                    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear

                    filterData = dataListInventory.filter(item => item.date.includes(`/${previousMonth}/${previousYear}`))
                    console.log('ccc'  ,filterData);
                    break;
                default:
                    filterData = dataListInventory
                  

            }
            console.log('doandevvvvv',filterData);
            
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
            <View style={{ flex: 1, }}>
                <Header
                    LeftIcon={Images.back}
                    headerTx="checkInventory.manageInventorySheets"
                    headerInput={true}
                    style={{ height: scaleHeight(55) }}
                    RightIconTextInput={Images.ic_dowload}
                    onLeftPress={() => props.navigation.goBack()}

                />

                <FlashList

                    horizontal={true}
                    data={dataTabbar}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    paddingVertical: scaleHeight(13),
                                    paddingHorizontal: scaleWidth(16),
                                    borderBottomWidth: 1,
                                    borderColor: isCLickTabBar === index ? colors.palette.navyBlue : '#FFF', backgroundColor: '#FFF'

                                }}

                                onPress={() => {
                                    console.log(index);

                                    setisCLickTabBar(index)
                                }}
                            >
                                <Text>
                                    {item.name}
                                </Text>

                            </TouchableOpacity>
                        )
                    }}
                />

                <View style={{ marginTop: scaleHeight(20), flexDirection: "row", }}>

                    <TouchableOpacity
                        style={{
                            borderRadius: 8,
                            backgroundColor: '#D9DADD',
                            width: scaleWidth(32),
                            height: scaleHeight(36),
                            marginHorizontal: scaleWidth(16),
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
                            <Text>Hôm nay</Text>
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
                            <Text>Tháng này</Text>
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
                            <Text>Tháng trước</Text>
                        </TouchableOpacity>

                    </View>



                </View>


                {
                    dataListInventory && (
                        <View style={{ flex: 1, padding: scaleWidth(15) }}>
                            <FlashList
                                data={displayedData}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{
                                            backgroundColor: '#FFF',
                                            borderRadius: 8,
                                            paddingVertical: scaleHeight(10),
                                            paddingHorizontal: scaleWidth(16),
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginBottom: 10
                                        }}

                                        >
                                            <View>
                                                <Text style={{ fontSize: 12, fontWeight: '600', color: '#333' }}>{item.id}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={Styles.stylesTextTime} >{item.time} </Text>
                                                    <Text style={Styles.stylesTextTime}> {item.date}</Text>
                                                </View>
                                            </View>
                                            <View style={{ backgroundColor: item.status === 'Đã thanh toán' ? '#DAFBDF' : '#FFEFF0', height: 14, paddingHorizontal: 8, paddingVertical: 2 }}>
                                                <Text style={{ fontSize: 8, color: item.status === 'Đã thanh toán' ? '#00CC6A' : 'red' }}>
                                                    {item.status}
                                                </Text>

                                            </View>
                                        </View>
                                    )
                                }}

                            />
                        </View>
                    )
                }
                {
                    !dataListInventory && (
                        <View style={{ alignItems: 'center', marginTop: scaleHeight(80), flex: 1, }}>
                            <Images.img_not_init />
                            <Text >
                                Chưa có phiếu kiểm kho nào được tạo
                            </Text>

                        </View>

                    )

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
                        props.navigation.navigate('addCheckIventory')

                    }}
                >
                    <Images.icon_plus width={scaleWidth(16)} height={scaleHeight(16)} style={{ marginRight: 6, marginTop: 2 }} />
                    <Text style={{ color: 'white', fontSize: fontSize.size14 }}>Tạo phiếu kiểm kho</Text>
                </TouchableOpacity>


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
    }
})
export default Styles