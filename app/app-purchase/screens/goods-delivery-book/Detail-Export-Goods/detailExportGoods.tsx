import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { FC } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScreenProps } from "react-native-screens";
import { NavigatorParamList } from "../../../navigators";
import { Header, Text } from "../../../../components";
import { colors, palette, scaleHeight, scaleWidth } from "../../../theme";
import { Images } from "../../../../../assets";



export const DetailExportGoods: FC<StackScreenProps<NavigatorParamList, "detaiExampleGoods">> = observer(
    function detaiExportGoods(props) {

        const [show, setShow] = useState(true);
        const dataItemGoodsDeliveryBook = props.route.params?.dataItemGoodsDeliveryBook
        console.log('====================================');
        console.log(dataItemGoodsDeliveryBook);
        console.log('====================================');


        interface DateItem {

            name: string,
            time: string,
            id: string,
            status: string,
            total: number,
            img: String,
            price: number,
        }
        const dataListGoodsDeliveryBook: DateItem[] = [
            {
                id: "-SP324242",
                time: "13:56",
                name: "Gạch 245575 60x60",
                status: "Đã thanh toán",
                total: 1,
                img: "https://www.prime.vn/storage/news/large/59c37023d5d116.7497618920170921145411.png",
                price: 21000
            },
            {
                id: "-SP324242",
                time: "13:56",
                name: "Gạch 245575 60x60",
                status: "Đã thanh toán",
                total: 2,
                img: "https://www.prime.vn/storage/news/large/59c37023d5d116.7497618920170921145411.png",
                price: 21000
            },
            {
                id: "-SP324242",
                time: "13:56",
                name: "Gạch 245575 60x60",
                status: "Đã thanh toán",
                total: 3,
                img: "https://www.prime.vn/storage/news/large/59c37023d5d116.7497618920170921145411.png",
                price: 21000
            },
            {
                id: "-SP324242",
                time: "13:56",
                name: "Gạch 245575 60x60",
                status: "Đã thanh toán",
                total: 5,
                img: "https://www.prime.vn/storage/news/large/59c37023d5d116.7497618920170921145411.png",
                price: 21000
            },
            {
                id: "-SP324242",
                time: "13:56",
                name: "Gạch 245575 60x60",
                status: "Đã thanh toán",
                total: 6,
                img: "https://www.prime.vn/storage/news/large/59c37023d5d116.7497618920170921145411.png",
                price: 21000
            },
            {
                id: "-SP324242",
                time: "13:56",
                name: "Gạch 245575 60x60",
                status: "Chưa thanh toán",
                total: 1,
                img: "https://www.prime.vn/storage/news/large/59c37023d5d116.7497618920170921145411.png",
                price: 21000
            },
            {
                id: "-SP324242",
                time: "13:56",
                name: "Gạch 245575 60x60",
                status: "Chưa thanh toán",
                total: 6,
                img: "https://www.prime.vn/storage/news/large/59c37023d5d116.7497618920170921145411.png",
                price: 21000
            }
        ]



        return (
            <View>
                <Header
                    RightIcon1={Images.ic_bin}
                    LeftIcon={Images.back}
                    widthRightIcon={scaleWidth(16)}
                    heightRightIcon={scaleHeight(16)}
                    headerTx="GoodsExportBook.shippingDetails"
                    style={{ height: scaleWidth(52) }}
                    onLeftPress={() => {
                        props.navigation.goBack()
                    }}
                />
                <View style={{ paddingTop: scaleHeight(20), paddingHorizontal: scaleWidth(16) }}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#FFFFFF', borderRadius: 8, paddingHorizontal: scaleWidth(16), paddingVertical: scaleHeight(10) }}
                        onPress={() => props.navigation.navigate('ballotDetail')}
                    >
                        <View style={Styles.flexRow}>
                            <Text style={{ fontWeight: '600' }} >{dataItemGoodsDeliveryBook.id}</Text>
                            <Text style={{
                                fontSize: 8,
                                backgroundColor: colors.palette.greenTea,
                                color: colors.palette.malachite,
                                alignSelf: 'center',
                                paddingHorizontal: scaleWidth(6),
                                borderRadius: scaleWidth(2)
                            }} >{dataItemGoodsDeliveryBook.status}</Text>
                        </View>
                        <Text style={Styles.stylesTextTime}>
                            {dataItemGoodsDeliveryBook.time} {dataItemGoodsDeliveryBook.date}
                        </Text>
                        <View style={Styles.line} />
                        <View style={[Styles.flexRow,]}>
                            <TouchableOpacity
                                style={[Styles.styleBtn, { borderColor: colors.palette.navyBlue }]}
                            >
                                <Images.ic_PaperPlaneTilt />
                                <Text tx="GoodsExportBook.submitBallot" style={{ marginLeft: 4, color: colors.palette.navyBlue, fontWeight: "600" }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[Styles.styleBtn, { borderColor: colors.palette.navyBlue, backgroundColor: colors.palette.navyBlue }]}
                            >
                                <Images.ic_dowload />
                                <Text tx="GoodsExportBook.dowloadBallot" style={{ marginLeft: 4, color: colors.palette.white, fontWeight: "600" }} />
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>
                    <View
                        style={{ backgroundColor: '#FFFFFF', marginVertical: scaleWidth(20), borderRadius: 8, paddingHorizontal: scaleWidth(16), paddingVertical: scaleHeight(10) }}
                    >
                        <View style={[Styles.flexRow,{marginBottom:scaleWidth(15)}]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: '600' }} tx="GoodsExportBook.product" />
                                <Text>({dataListGoodsDeliveryBook.length})</Text>
                            </View>

                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => setShow(!show)}
                            >
                                <Text style={{
                                    fontSize: scaleWidth(10),
                                    color: colors.palette.navyBlue,
                                    alignSelf: 'center',
                                    paddingHorizontal: scaleWidth(6),
                                    borderRadius: scaleWidth(2)
                                }} tx="GoodsExportBook.collapse"></Text>
                                <Images.iconDownBlue style={{ transform: [{ rotate: show ? '180deg' : '0deg' }], }} />

                            </TouchableOpacity>

                        </View>
                        {
                            show ?
                                <FlatList
                                    data={dataListGoodsDeliveryBook}
                                    // maxToRenderPerBatch={2} // Số lượng item tối đa được render trong một lần
                                    // initialNumToRender={2} // Số lượng item được render ban đầu
                                    // windowSize={3} // Số lượng item được render trước và sau item đang hiển thị
                                    style={{ height: scaleHeight(116) }}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity style={Styles.bodyItem}

                                            >
                                                <View style={{

                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',

                                                }}

                                                >

                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Image source={{ uri: item.img }}
                                                            width={48}
                                                            height={48}
                                                            borderRadius={8}
                                                            style={{ marginRight: 10 }}
                                                        />
                                                        <View>
                                                            <Text style={{ fontSize: 12, fontFamily: "Inter-Bold" }}>{item.name}</Text>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={Styles.stylesTextTime} >{item.id} </Text>
                                                                {/* <Text style={Styles.stylesTextTime}> {item.id}</Text> */}
                                                            </View>
                                                        </View>

                                                    </View>
                                                    <View style={{ height: 14, }}>
                                                        <Text style={{ fontSize: 8 }}>
                                                            {item.price} x {item.total}
                                                        </Text>
                                                        <Text
                                                            style={{ fontSize: 12, fontFamily: "Inter-Bold" }}
                                                        >{item.price * item.total}</Text>
                                                    </View>

                                                </View>

                                            </TouchableOpacity>
                                        )
                                    }}

                                /> : null

                        }


                    </View>
                    <View
                        style={{ backgroundColor: '#FFFFFF', borderRadius: 8, paddingHorizontal: scaleWidth(16), paddingVertical: scaleHeight(10), }}
                    >
                        <View style={Styles.flexRow}>
                            <Text style={Styles.txtGray}>Tổng số lượng</Text>
                            <Text>7</Text>
                        </View>
                        <View style={Styles.flexRow}>
                            <Text style={Styles.txtGray}>Tổng tiền hàng</Text>
                            <Text>700.000đ</Text>
                        </View>
                        <View style={Styles.flexRow}>
                            <Text style={Styles.txtGray}>Chiết khấu</Text>
                            <Text>0</Text>
                        </View>
                        <View style={Styles.flexRow}>
                            <Text style={Styles.txtGray}>Chi phí phát sinh</Text>
                            <Text>0</Text>
                        </View>

                    </View>
                </View>
            </View>

        )

    }
)
const Styles = StyleSheet.create({
    bodyItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        // paddingVertical: scaleHeight(10),
        // paddingHorizontal: scaleWidth(16),
        marginBottom: scaleWidth(15)
    },
    stylesTextTime: {
        fontSize: 10
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    line: {
        width: '100%',
        borderWidth: 1,
        borderColor: "#F6F7FB",
        marginVertical: scaleHeight(12)

    },
    styleBtn: {
        borderWidth: 1,
        padding: scaleWidth(8),
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: scaleWidth(149)
    },
    colorTextDate: {
        color: colors.palette.dolphin
    },
    txtGray: {
        color: colors.palette.dolphin
    }


})
export default Styles