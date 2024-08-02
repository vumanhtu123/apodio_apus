import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { FlatList, Modal, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { NavigatorParamList } from "../../../navigators";
import { useNavigation } from "@react-navigation/native";
import { Svgs } from "../../../../../assets/svgs";
import { scaleHeight, colors, scaleWidth } from "../../../theme";
import { Header, Text } from "../../../../components";
import { UserStatus } from "../../../utils/const";
import data from "../../../../components/svg-icon/data";
import Style from "./Style";





export const CreateGoodsReceipt: FC<StackScreenProps<NavigatorParamList, 'createGoodsReceipt'>> = observer(
    function createGoodsReceipt(props) {
        const navigation = useNavigation();

        const [titleTabar, setTitleTabar] = useState(['Tất cả', 'Apodio', 'Marvel'])
        const [indexTabbar, setIndexTabbar] = useState(0)
        const [onClick, setOnClick] = useState('successfully')
        const [onClickFund, setonClickFund] = useState<any>()
        const [isVisibleConfimImportGoods, setisVisibleConfimImportGoods] = useState(false)
        const [isEnabled2, setIsEnabled2] = useState(false);
        const [isEnabled, setIsEnabled] = useState(false);
        const toggleSwitch = () => setIsEnabled(previousState => !previousState);
        const [sellectTab, setSellectTab] = useState('product')



        const dataSlectfunds = ["ImprotGoodsBook.unclassified", "ImprotGoodsBook.cash", "ImprotGoodsBook.electronicWallet", "ImprotGoodsBook.bank", "ImprotGoodsBook.storeWallet"]
        // const getData = dataTest[0];
        // console.log('====================================');
        // console.log("doannnnn", getData);
        // console.log('====================================');

        return (
            <View style={{ flex: 1 }}>
                <Header
                    LeftIcon={Svgs.back}
                    headerTx="ImprotGoodsBook.createGoodsReceipt"
                    style={{ height: scaleHeight(52) }}
                    onLeftPress={() => navigation.goBack()}
                />
                <View style={Style.body}>
                    <View style={Style.StyleTabar}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: sellectTab === 'product' ? colors.white : colors.solitude1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 7,
                                margin: 2
                            }}

                            onPress={() => setSellectTab('product')}
                        >
                            <Text style={sellectTab === 'product' ? Style.StyleTextTabar : Style.StyleTextTabarUnSelect} >Sản phẩm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: sellectTab === 'material' ? colors.white : colors.solitude1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 7,
                                margin: 2
                            }}
                            onPress={() => setSellectTab('material')}
                        >
                            <Text style={sellectTab === 'material' ? Style.StyleTextTabar : Style.StyleTextTabarUnSelect}
                                tx="productScreen.materials"
                            >

                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={Style.styleGroup1}
                    >
                        <TouchableOpacity
                            style={Style.styleBtnAddProduct}
                        >
                            <Text style={Style.txtBtnAddProduct} tx="ImprotGoodsBook.addProduct"></Text>
                        </TouchableOpacity>

                        <View
                            style={{ flexDirection: 'row', marginTop: scaleHeight(24), marginBottom: scaleHeight(20) }}
                        >
                            <View style={{ zIndex: 1 }}>
                                <Svgs.ic_Brick />
                                <View style={{ zIndex: 2, position: 'absolute', top: scaleHeight(-6), start: scaleWidth(-2) }}>
                                    <Svgs.ic_Xcircle />
                                </View>
                            </View>



                            <View style={{ flex: 1, marginLeft: scaleWidth(10) }}>
                                <Text style={{ fontSize: scaleWidth(12), fontWeight: '600', color: colors.nero }} tx="ImprotGoodsBook.brick"> </Text>
                                <View style={Style.flexRow}>
                                    <Text style={[Style.txtColorDolphin, { fontSize: scaleWidth(12) }]}>-SP9584</Text>
                                    <Text style={[Style.txtColorDolphin, { fontSize: scaleWidth(12) }]} tx="ImprotGoodsBook.price"></Text>
                                </View>

                                <View style={[Style.flexRow, { alignItems: "center" }]}>
                                    <View style={Style.StyleBTNplusAndMinus}>
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}
                                        // onPress={() => handleDecrement()}
                                        >
                                            <Svgs.ic_minus />
                                        </TouchableOpacity>
                                        <Text style={{ flex: 1, textAlign: 'center' }}>
                                            {/* {itemCounts[item.id] || item.quantity} */}
                                            0
                                        </Text>
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}
                                        // onPress={() => handleIncrement()}

                                        >
                                            <Svgs.icon_plusGreen />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: scaleWidth(12), fontWeight: '500', color: colors.palette.textExCancle }}>0</Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                    </View>

                    <View style={Style.styleGroup2}>
                        <Text tx="ImprotGoodsBook.supplier" style={{ fontWeight: '600' }} />
                        <View style={[Style.flexRow, { alignItems: 'center', paddingVertical: 20 }]}>
                            <Text style={Style.txtGroup2} tx="ImprotGoodsBook.note" />

                            <Svgs.ic_system_uico />
                        </View>

                    </View>

                    <View style={Style.styleGroup2}>
                        <View style={Style.flexRow}>
                            <Text style={Style.txtGroup2} tx="ImprotGoodsBook.Total" />

                            <Text style={Style.stylesNumber}>
                                0
                            </Text>
                        </View>
                        <View style={[Style.flexRow, { marginVertical: scaleHeight(10) }]}>
                            <Text style={Style.txtGroup2} tx="ImprotGoodsBook.totalCostOfGoods" />


                            <Text style={Style.stylesNumber}>
                                600.000đ
                            </Text>
                        </View>
                        <View style={Style.flexRow}>
                            <Text style={Style.txtGroup2} tx="ImprotGoodsBook.discount">

                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: colors.palette.navyBlue }}>
                                    0
                                </Text>
                                <Svgs.ic_pen />
                            </View>

                        </View>
                        <View style={Style.flexRow}>
                            <Text style={Style.txtGroup2} tx="ImprotGoodsBook.costsIncurred" />


                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <Svgs.ic_pen />
                            </View>

                        </View>
                    </View>


                    <View style={Style.styleGroup2}>
                        <View style={[Style.flexRow, { alignItems: 'center', }]}>
                            <Text style={Style.txtGroup2} tx="ImprotGoodsBook.note" />

                            <Svgs.icon_image />
                        </View>

                    </View>
                </View>

                {/* <View style={Style.notification}>

                    <Images.ic_Xcicle_Red />
                    <Text style={{ fontSize: scaleWidth(12), color: colors.palette.radicalRed, }}>
                        Số lượng tồn kho sản phẩm phải lớn hơn hoặc bằng số lượng trong đơn xuất hàng
                    </Text>
                </View> */}

                <View style={Style.stylesBtnBottom}>

                    <TouchableOpacity
                        style={onClick === 'successfully' ? Style.btnSuccessfully : Style.btnSave}
                        onPress={() => setisVisibleConfimImportGoods(!isVisibleConfimImportGoods)}
                    >
                        <Text
                            style={{ color: onClick === 'successfully' ? colors.palette.white : colors.palette.navyBlue }}
                            tx="ImprotGoodsBook.ImportGoods"
                        />


                    </TouchableOpacity>

                </View>

                {/* modal nhập hàng */}
                <Modal
                    animationType="slide"
                    visible={isVisibleConfimImportGoods}
                    transparent={true}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)', }}>
                        <View style={{ paddingVertical: scaleHeight(20), paddingHorizontal: scaleWidth(16), backgroundColor: colors.white }}>
                            <View style={Style.flexRow}>
                                <Text tx="ImprotGoodsBook.paymentConfirmation"></Text>
                                <TouchableOpacity
                                    onPress={() => setisVisibleConfimImportGoods(!isVisibleConfimImportGoods)}
                                >
                                    <Svgs.ic_x />
                                </TouchableOpacity>

                            </View>
                            <View style={{ marginVertical: scaleHeight(20), alignItems: 'center' }}>
                                <Text style={{ fontSize: scaleWidth(12) }}>Tổng tiền</Text>
                                <Text style={{ color: colors.palette.radicalRed, fontSize: scaleWidth(20) }}>600.000</Text>
                            </View>
                            <View style={{
                                paddingVertical: scaleHeight(8),
                                paddingHorizontal: scaleWidth(16),
                                backgroundColor: colors.palette.aliceBlue,
                                borderRadius: 8,
                                marginBottom: scaleHeight(20),

                            }}>
                                <Text tx="ImprotGoodsBook.iPaid" ></Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text>0</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text tx="ImprotGoodsBook.debit" />
                                        <Switch
                                            trackColor={{ false: colors.ghostWhite1, true: colors.ghostWhite1 }}
                                            thumbColor={isEnabled ? colors.palette.navyBlue : colors.selago}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}

                                        />
                                    </View>

                                </View>

                            </View>

                            <View>
                                <Text tx="ImprotGoodsBook.funds" style={{ marginBottom: scaleWidth(8) }}></Text>
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
                                backgroundColor: colors.white,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: scaleHeight(20)
                            }}>

                                <TouchableOpacity
                                    style={onClick === 'successfully' ? Style.btnSuccessfully : Style.btnSave}
                                    onPress={() => setisVisibleConfimImportGoods(!isVisibleConfimImportGoods)}
                                >
                                    <Text
                                        style={{ color: onClick === 'successfully' ? colors.palette.white : colors.palette.navyBlue }}
                                        tx="ImprotGoodsBook.ImportGoods"
                                    />


                                </TouchableOpacity>

                            </View>
                        </View>

                    </View>
                </Modal>
            </View>
        )

    }
)

