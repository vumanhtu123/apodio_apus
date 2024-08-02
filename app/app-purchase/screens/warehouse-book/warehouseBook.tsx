import { StackScreenProps } from "@react-navigation/stack";
import { FC, useRef, useState } from "react";
import { NavigatorParamList } from "../../navigators";
import { observer } from "mobx-react-lite";
import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Header, Text } from "../../components";
import { colors, scaleHeight, scaleWidth } from "../../theme";
import { Image } from "react-native-svg";
import { Svgs } from "../../../../assets/svgs";
import { styles } from "./styles";



export const warehouseBook: FC<StackScreenProps<NavigatorParamList, "warehouseBook">> = observer(


    function wareHouseScreen(props) {

        interface DateItem {
            id: string,
            nameProduct: String,
            productCode: String,
            time: String,
            date: String,
            status: String,
            quantity: number,
            price: String

        }

        const dataListWarehouseBook: DateItem[] = [
            {
                id: "1",
                nameProduct: "Gạch 157599 60x60",
                productCode: "SP9584",
                time: "13:56",
                date: "26/4/2024",
                status: "#NH3 - gạch tồn kho",
                quantity: 1,
                price: "500.000"
            },
            {
                id: "2",
                nameProduct: "Gạch 157599 60x60",
                productCode: "SP9584",
                time: "13:56",
                date: "26/4/2024",
                status: "#NH3 - gạch tồn kho",
                quantity: 1,
                price: "500.000"
            },
            {
                id: "3",
                nameProduct: "Gạch 157599 60x60",
                productCode: "SP9584",
                time: "13:56",
                date: "26/4/2024",
                status: "#NH3 - gạch tồn kho",
                quantity: 1,
                price: "500.000"
            },
            {
                id: "4",
                nameProduct: "Gạch 157599 60x60",
                productCode: "SP9584",
                time: "13:56",
                date: "24/4/2024",
                status: "#NH3 - gạch tồn kho",
                quantity: 1,
                price: "500.000"
            },
            {
                id: "5",
                nameProduct: "Gạch 157599 60x60",
                productCode: "SP9584",
                time: "13:56",
                date: "26/3/2024",
                status: "#NH3 - gạch tồn kho",
                quantity: 1,
                price: "500.000"
            },
            {
                id: "6",
                nameProduct: "Gạch 157599 60x60",
                productCode: "SP9584",
                time: "13:56",
                date: "26/3/2024",
                status: "#NH3 - gạch tồn kho",
                quantity: 1,
                price: "500.000"
            }, {
                id: "7",
                nameProduct: "Gạch 157599 60x60",
                productCode: "SP9584",
                time: "13:56",
                date: "27/3/2024",
                status: "#NH3 - gạch tồn kho",
                quantity: 1,
                price: "500.000"
            },
            {
                id: "8",
                nameProduct: "Gạch 157599 60x60",
                productCode: "SP9584",
                time: "13:56",
                date: "29/3/2024",
                status: "#NH3 - gạch tồn kho",
                quantity: 1,
                price: "500.000"
            },
            {
                id: "9",
                nameProduct: "Gạch 157599 60x60",
                productCode: "SP9584",
                time: "13:56",
                date: "29/3/2024",
                status: "#NH3 - gạch tồn kho",
                quantity: 1,
                price: "500.000"
            },

        ]

        const groupBy = (data: DateItem[], key: string) => {
            return data.reduce((result: { [key: string]: DateItem[] }, item: any) => {
                const value = item[key];
                if (!result[value]) {
                    result[value] = [];
                }
                result[value].push(item);
                return result;
            }, {});


        }
        const groupedData = groupBy(dataListWarehouseBook, 'date');

        const [displayedData, setDisplayedData] = useState<DateItem[]>(dataListWarehouseBook)


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
                    filterData = dataListWarehouseBook.filter(item => item.date.includes(fullDay))
                    console.log('aaa', filterData);

                    break;
                case 'month':
                    filterData = dataListWarehouseBook.filter(item => item.date.includes(`${currentMonth}/${currentYear}`))
                    console.log('bbb', filterData);
                    break;
                case 'previous':

                    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1
                    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear

                    filterData = dataListWarehouseBook.filter(item => item.date.includes(`/${previousMonth}/${previousYear}`))
                    console.log('ccc', filterData);
                    break;
                default:
                    filterData = dataListWarehouseBook


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
        const [isRefreshhing, setIsRefreshhing] = useState(false)
        const [isloadMore, setIsloadMore] = useState(false)
        const [isVisibleOpenFilter, setisVisibleOpenFilter] = useState(false)

        const [markedDatesS, setMarkedDatesS] = useState("")
        const [markedDatesE, setMarkedDatesE] = useState("")
        markedDatesSRef.current = markedDatesS ? markedDatesS : sevenDaysBefore.toString();
        markedDatesERef.current = markedDatesE ? markedDatesE : today.toString();

        const tongleModalDate = () => {
            setIsSortByDate(!isSortByDate)
        }

        const handleRefresh = () => {
            setIsRefreshhing(true)
            setTimeout(() => {
                setIsRefreshhing(false)
            }, 2000);
        }
        const handleLoadMore = () => {
            setIsloadMore(true)
        }
        const renderFooter = () => {
            if (!isloadMore) return null;

            setTimeout(() => {
                setIsloadMore(false);
            }, 2000);

            return <ActivityIndicator size="small" color={colors.palette.navyBlue} />;
        };
        return (
            <View style={{ flex: 1 }}>

                <Header
                    LeftIcon={Svgs.back}
                    RightIcon1={Svgs.icon_search}
                    RightIconAndTextBelow={Svgs.ic_dowload}
                    textBelowIconRight={"Báo cáo"}
                    widthRightIcon={scaleWidth(15)}
                    heightRightIcon={scaleHeight(15)}
                    leftText="warehouseBook.warehouseBook"
                    style={{ height: scaleHeight(52), }}
                    btnRightStyle={{ width: 20 }}
                    onLeftPress={() => props.navigation.goBack()}
                />
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", marginBottom: scaleHeight(15), zIndex: 1 }}>

                        <TouchableOpacity
                            style={{
                                borderRadius: 8,
                                backgroundColor: colors.hawkesBlue,
                                width: scaleWidth(32),
                                height: scaleHeight(36),
                                marginRight: scaleWidth(16),
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}
                            onPress={() => {
                                // tongleModalDate()
                                // Alert.alert("ok")
                                props.navigation.navigate("filterInWarehouseBook")

                            }}
                        >
                            <Svgs.ic_Feilter />

                        </TouchableOpacity>


                        <View style={{
                            // width:scaleWidth(260),
                            // height:scaleHeight(32), 
                            backgroundColor: colors.hawkesBlue,
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
                                backgroundColor: selectCalendar === 1 ? colors.white : colors.hawkesBlue,
                                borderRadius: 8
                            }}
                                onPress={() => {
                                    handbleSlectdate('toDay')
                                    setSelectCalendar(1)
                                }}
                            >
                                <Text style={styles.TextTabbar}>Hôm nay</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                // width:scaleWidth(80), 
                                paddingHorizontal: (scaleWidth(12)),
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: selectCalendar === 2 ? colors.white : colors.hawkesBlue,
                                borderRadius: 8
                            }}
                                onPress={() => {
                                    handbleSlectdate('month')
                                    setSelectCalendar(2)

                                }}
                            >
                                <Text style={styles.TextTabbar}>Tháng này</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                // width:scaleWidth(80),
                                paddingHorizontal: (scaleWidth(12)),
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: selectCalendar === 3 ? colors.white : colors.hawkesBlue,
                                borderRadius: 8
                            }}
                                onPress={() => {
                                    handbleSlectdate('previous')
                                    setSelectCalendar(3)
                                }}
                            >
                                <Text style={styles.TextTabbar}>Tháng trước</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={styles.section}>
                        <View style={styles.flexRow}>
                            <Text tx="warehouseBook.ExistingAtTheBeginningOfThePeriod" style={styles.styleTextgray} />
                            <Text style={styles.styleNumber}>0</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text tx="warehouseBook.DuringThePeriod" style={styles.styleTextgray} />
                            <Text style={styles.styleNumber}>10.350.000</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text tx="warehouseBook.ExportedInPeriod" style={styles.styleTextgray} />
                            <Text style={styles.styleNumber}>150.000</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.flexRow}>
                            <Text tx="warehouseBook.EndingStocks" style={styles.styleTextgray} />
                            <Text style={styles.styleNumber}>10.200.000</Text>
                        </View>
                    </View>

                </View>
                <FlatList
                    data={Object.entries(groupedData)}
                    keyExtractor={([date]) => date}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: [date, products,] }) => (
                        <View style={styles.groupContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: scaleHeight(15) }}>
                                <View style={{ width: '40%', height: 1, backgroundColor: colors.solitude1 }} />
                                <Text style={styles.dateText}>{date}</Text>
                                <View style={{ width: '40%', height: 1, backgroundColor: colors.solitude1 }} />
                            </View>

                            <View style={{ backgroundColor: colors.white, padding: scaleWidth(6), borderRadius: scaleWidth(8) }}>
                                {products.map((product, index) => (
                                    <View key={product.id} style={styles.productContainer}>
                                        <View style={styles.flexRow}>
                                            <Text style={styles.productName}>{product.nameProduct}</Text>
                                            <Text style={styles.productPrice}>{product.price}</Text>
                                        </View>
                                        <View style={[styles.flexRow, { marginVertical: scaleWidth(6) }]}>
                                            <Text style={styles.productCode}>{product.productCode}</Text>
                                            <Text style={styles.productQuantity}>SL:+ {product.quantity}</Text>
                                        </View>

                                        <Text style={styles.styleTextgray}  >{product.status}</Text>


                                        {index !== products.length - 1 && <View style={styles.line} />}
                                    </View>
                                ))}
                            </View>

                        </View>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshhing}
                            onRefresh={handleRefresh}
                        />
                    }
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}

                />

                <View style={[styles.styleBTNBottom, styles.flexRow]}>
                    <TouchableOpacity style={[styles.StyleTextBtn, { backgroundColor: colors.palette.radicalRed }]}>
                        <Text tx="warehouseBook.productDelivery" style={{ color: colors.white }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.StyleTextBtn, { backgroundColor: colors.palette.navyBlue }]}>
                        <Text tx="warehouseBook.productDelivery" style={{ color: colors.white }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.StyleTextBtn, { backgroundColor: colors.palette.malachite }]}>
                        <Text tx="warehouseBook.productDelivery" style={{ color: colors.white }} />
                    </TouchableOpacity>
                </View>

            </View>
        )

    }
)

