import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../../navigators";
import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { FlatList, Image, StyleSheet, TouchableOpacity, View, ScrollView, Modal, Switch, Alert } from "react-native";
import React from "react";
import { Header, Text } from "../../../components";
import { colors, fontSize, padding, scaleHeight, scaleWidth } from "../../../theme";
import { Images } from "../../../../assets";
import Styles from "./Styles";




export const DetailImportReceipt: FC<StackScreenProps<NavigatorParamList, "detailImportReceipt">> = observer(
    function detailImportReceipt(props) {

        const [show, setShow] = useState(true);
        const [sellectTab, setSellectTab] = useState('product')
        const dataItemGoodsImportBook = props.route.params?.dataItemGoodsImportBook
        const [isVisibleDeleteReceipt, setisVisibleDeleteReceipt] = useState(false)
        const [isVisibleConfirmDelete, setIsVisibleConfirmDelete] = useState(false)
        const toggleSwitch = () => setIsEnabled(previousState => !previousState);
        const [onClickFund, setonClickFund] = useState<any>()
        const [isEnabled, setIsEnabled] = useState(false);
        const [onClick, setOnClick] = useState('confirm')
        const [radioModal, setRadioModal] = useState(false)
        // console.log('====================================');
        // console.log(dataItemGoodsImportBook);
        // console.log('====================================');

        const dataSlectfunds = ["ImprotGoodsBook.unclassified", "ImprotGoodsBook.cash", "ImprotGoodsBook.electronicWallet", "ImprotGoodsBook.bank", "ImprotGoodsBook.storeWallet"]


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
            <ScrollView>
                <Header
                    LeftIcon={Images.back}
                    headerTx="ImprotGoodsBook.detailImportReceipt"
                    style={{ height: scaleHeight(52) }}
                    onLeftPress={() => props.navigation.goBack()}
                    RightIcon1={Images.ic_bin}
                    RightIcon2={Images.icon_printer}
                    onRightPress1={() => {
                        // Alert.alert("ok")
                        setisVisibleDeleteReceipt(!isVisibleDeleteReceipt)
                    }}

                    onRightPress2={() => props.navigation.navigate("voucherDetail")}
                    widthRightIcon={scaleWidth(16)}
                    heightRightIcon={scaleHeight(16)}
                    btnRightStyle={{ width: scaleWidth(16), marginLeft: scaleWidth(6), alignSelf: 'flex-end' }}
                />
                <View style={{ paddingTop: scaleHeight(20), paddingHorizontal: scaleWidth(16) }}>
                    <View style={Styles.StyleTabar}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: sellectTab === 'product' ? '#FFF' : '#E6E7EA',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 7,
                                margin: 2
                            }}

                            onPress={() => setSellectTab('product')}
                        >
                            <Text style={sellectTab === 'product' ? Styles.StyleTextTabar : Styles.StyleTextTabarUnSelect} >Sản phẩm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: sellectTab === 'material' ? '#FFF' : '#E6E7EA',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 7,
                                margin: 2
                            }}
                            onPress={() => setSellectTab('material')}
                        >
                            <Text style={sellectTab === 'material' ? Styles.StyleTextTabar : Styles.StyleTextTabarUnSelect}>
                                Nguyên vật liệu
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: '#FFFFFF', borderRadius: 8, paddingHorizontal: scaleWidth(16), paddingVertical: scaleHeight(10) }}
                    // onPress={() => props.navigation.navigate('ballotDetail')}
                    >
                        <View style={Styles.flexRow}>
                            <Text style={{ fontWeight: '600' }} >{dataItemGoodsImportBook.id}</Text>
                            <Text style={{
                                fontSize: 8,
                                backgroundColor: colors.palette.greenTea,
                                color: colors.palette.malachite,
                                alignSelf: 'center',
                                paddingHorizontal: scaleWidth(6),
                                borderRadius: scaleWidth(2)
                            }} >{dataItemGoodsImportBook.status}</Text>
                        </View>
                        <Text style={Styles.stylesTextTime}>
                            {dataItemGoodsImportBook.time} {dataItemGoodsImportBook.date}
                        </Text>
                        <View style={Styles.line} />
                        <View style={Styles.flexRow}>
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

                    <View style={Styles.styleGroup2}>
                        <Text tx="ImprotGoodsBook.supplier" style={{ fontWeight: '600' }} />
                        <View style={[{ alignItems: 'center', paddingVertical: scaleHeight(10), flexDirection: 'row' }]}>

                            <Images.ic_avatar />
                            <Text style={Styles.txtGroup2} tx="ImprotGoodsBook.note" />

                        </View>

                    </View>

                    <View
                        style={{ backgroundColor: '#FFFFFF', marginVertical: scaleWidth(20), borderRadius: 8, paddingHorizontal: scaleWidth(16), paddingVertical: scaleHeight(10) }}
                    >
                        <View style={[Styles.flexRow, { marginBottom: scaleHeight(15) }]}>
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
                            <Text style={Styles.txtGray} tx="ImprotGoodsBook.Total"></Text>
                            <Text style={{ fontSize: (scaleWidth(10)) }}>7</Text>
                        </View>
                        <View style={Styles.flexRow}>
                            <Text style={Styles.txtGray} tx="ImprotGoodsBook.totalCostOfGoods"></Text>
                            <Text style={{ fontSize: (scaleWidth(10)) }}>700.000đ</Text>
                        </View>
                        <View style={Styles.flexRow}>
                            <Text style={Styles.txtGray} tx="ImprotGoodsBook.discount"></Text>
                            <Text style={{ fontSize: (scaleWidth(10)) }}>0</Text>
                        </View>
                        <View style={Styles.flexRow}>
                            <Text style={Styles.txtGray} tx="ImprotGoodsBook.costsIncurred"></Text>
                            <Text style={{ fontSize: (scaleWidth(10)) }}>0</Text>
                        </View>

                    </View>

                    <View
                        style={{ backgroundColor: '#FFFFFF', marginTop: scaleHeight(20), borderRadius: 8, paddingHorizontal: scaleWidth(16), paddingVertical: scaleHeight(18), }}
                    >
                        <View style={Styles.flexRow}>
                            <View>
                                <Text style={Styles.txtGray} >
                                    Lorem ipsum dolor sit amet consectetur.
                                </Text>
                                <Text style={Styles.txtGray} >
                                    Lacus fames est id elit felis.
                                </Text>
                            </View>

                            <Images.img_test />
                        </View>
                    </View>
                </View>
                {/* modal nhập hàng */}
                <Modal
                    animationType="slide"
                    visible={isVisibleDeleteReceipt}
                    transparent={true}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)', }}>
                        <View style={{ paddingVertical: scaleHeight(20), paddingHorizontal: scaleWidth(16), backgroundColor: '#FFFFFF' }}>
                            <View style={[Styles.flexRow, { marginBottom: scaleHeight(20) }]}>
                                <Text tx="ImprotGoodsBook.cancelImportOrder" ></Text>
                                <TouchableOpacity
                                    onPress={() => setisVisibleDeleteReceipt(!isVisibleDeleteReceipt)}
                                >
                                    <Images.ic_x />
                                </TouchableOpacity>

                            </View>
                            {/* <View style={{ marginVertical: scaleHeight(20), alignItems: 'center' }}>
                                <Text style={{ fontSize: scaleWidth(12) }}>Tổng tiền</Text>
                                <Text style={{ color: colors.palette.radicalRed, fontSize: scaleWidth(20) }}>600.000</Text>
                            </View> */}
                            <View style={{
                                paddingVertical: scaleHeight(8),
                                paddingHorizontal: scaleWidth(16),
                                backgroundColor: colors.palette.aliceBlue,
                                borderRadius: 8,
                                marginBottom: scaleHeight(20),

                            }}>
                                <Text tx="ImprotGoodsBook.refund" ></Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text>666.000</Text>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text tx="ImprotGoodsBook.debit" />
                                        <Switch
                                            trackColor={{ false: '#f1f1f2', true: '#f1f1f2' }}
                                            thumbColor={isEnabled ? colors.palette.navyBlue : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}

                                        />
                                    </View> */}

                                </View>

                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: scaleWidth(15) }}>
                                <TouchableOpacity style={{
                                    borderWidth: scaleWidth(1),
                                    width: scaleWidth(18),
                                    borderRadius: 6,
                                    marginRight: scaleWidth(8),
                                    borderColor: colors.palette.veryLightGrey,
                                    padding: 1
                                }}
                                    onPress={() => setRadioModal(!radioModal)}
                                >
                                    <View style={{ backgroundColor: radioModal ? colors.palette.navyBlue : '#FFF', flex: 1, borderRadius: 3, }}>

                                    </View>
                                </TouchableOpacity>

                                <Text tx="ImprotGoodsBook.recordTheTransactionInDebt"></Text>
                            </View>

                            <View>
                                <Text tx="ImprotGoodsBook.funds" style={{ marginBottom: scaleWidth(6) }}></Text>
                                <FlatList
                                    data={dataSlectfunds}
                                    numColumns={3}
                                    renderItem={({ item, index }) => {

                                        return (
                                            <TouchableOpacity style={{
                                                width: scaleWidth(109),
                                                backgroundColor: index == onClickFund ? colors.palette.aliceBlue2 : colors.palette.aliceBlue,
                                                padding: scaleWidth(13),
                                                borderRadius: scaleWidth(8),
                                                borderWidth: 1,
                                                borderColor: index == onClickFund ? colors.palette.navyBlue : colors.palette.veryLightGrey,
                                                marginRight: scaleWidth(8),
                                                marginBottom: scaleHeight(8)
                                            }}
                                                onPress={() => {
                                                    // console.log("Vi tri", index);
                                                    setonClickFund(index)

                                                }}
                                            >
                                                <Text style={{ fontSize: scaleHeight(10), textAlign: 'center' }} tx={item}>

                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                            <View style={{
                                // backgroundColor: 'red',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: scaleHeight(20),
                                width: '100%'
                            }}>

                                <TouchableOpacity
                                    style={onClick === 'confirm' ? Styles.btnBack : Styles.btnConfirm}
                                    onPress={() => setOnClick('back')}
                                >
                                    <Text
                                        style={{ color: onClick === 'confirm' ? colors.palette.dolphin : colors.palette.white, fontWeight: '600' }}
                                        tx="ImprotGoodsBook.back"
                                    />


                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={onClick === 'confirm' ? Styles.btnConfirm : Styles.btnBack}
                                    onPress={() => {
                                        setOnClick('confirm')

                                        setIsVisibleConfirmDelete(!isVisibleConfirmDelete)
                                        setisVisibleDeleteReceipt(false)
                                    }}
                                >
                                    <Text
                                        style={{ color: onClick === 'confirm' ? colors.palette.white : colors.palette.navyBlue, fontWeight: '600' }}
                                        tx="ImprotGoodsBook.confrim"
                                    />


                                </TouchableOpacity>

                            </View>
                        </View>

                    </View>
                </Modal>

                <Modal
                    animationType='slide'
                    visible={isVisibleConfirmDelete}
                    transparent={true}

                >
                    <View style={Styles.container}>
                        <View style={Styles.modalView}>
                            <Text style={Styles.modalText} />
                            <View style={Styles.header}>
                                <Text style={Styles.headerTitle} tx="ImprotGoodsBook.cancelImportOrder"></Text>

                            </View>
                            {/* <View style={Styles.horizontalLine} /> */}
                            <View style={{ width: '100%', marginVertical: scaleHeight(30) }}>
                                <Text tx="ImprotGoodsBook.deletionWarning" style={{ textAlign: "center" }} ></Text>
                            </View>
                            <View style={{
                                // backgroundColor: 'red',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                // marginTop: scaleHeight(20),
                                // width: '100%'
                            }}>

                                <TouchableOpacity
                                    style={[
                                        onClick === 'confirm' ? Styles.btnBack2 : Styles.btnConfirm2
                                    ]}
                                    onPress={() => {
                                        setisVisibleDeleteReceipt(!isVisibleDeleteReceipt)
                                        setIsVisibleConfirmDelete(false)
                                    }}
                                >
                                    <Text
                                        style={{ color: onClick === 'confirm' ? colors.palette.dolphin : colors.palette.white, fontWeight: '600' }}
                                        tx="ImprotGoodsBook.back"
                                    />


                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={onClick === 'confirm' ? Styles.btnConfirm2 : Styles.btnBack2}
                                    onPress={() => setIsVisibleConfirmDelete(false)}
                                >
                                    <Text
                                        style={{ color: onClick === 'confirm' ? colors.palette.white : colors.palette.navyBlue, fontWeight: '600' }}
                                        tx="ImprotGoodsBook.confrim"
                                    />


                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                </Modal>
            </ScrollView>
        )
    }
)
