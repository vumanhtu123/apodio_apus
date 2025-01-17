import { StackNavigationProp } from "@react-navigation/stack";
import { FC, useState } from "react";
import { NavigatorParamList } from "../../../navigators";
import { observer } from "mobx-react-lite";
import { Header, Text } from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../login/styles";



export const addProductCreate: FC<StackNavigationProp<NavigatorParamList, "addProduct">> = observer(
    function AddProduct(props) {
        const navigation = useNavigation();

        const [titleTabar, setTitleTabar] = useState(['Tất cả', 'Apodio', 'Marvel'])
        const [indexTabbar, setIndexTabbar] = useState(0)
        const [onClick, setOnClick] = useState('successfully')

        return (
            <View style={{ flex: 1 }}>
                <Header
                    LeftIcon={Svgs.back}
                    headerTx="checkInventory.createInventorySeets"
                    headerInput={true}
                    RightIconTextInput={Svgs.ic_QR}
                    style={{ height: scaleHeight(52) }}
                    onLeftPress={() => navigation.goBack()}
                />
                <View style={Style.body}>

                    <View style={{ flexDirection: 'row' }}>
                        {titleTabar.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={indexTabbar === index ? Style.styleItemTabarIsclick : Style.styleItemTabar}
                                    key={item}
                                    onPress={() => {
                                        console.log(index)

                                        setIndexTabbar(index);
                                    }}
                                >
                                    <Text style={{ color: indexTabbar === index ? colors.palette.navyBlue : colors.palette.dolphin, fontSize: 10 }}>
                                        {item}
                                    </Text>

                                </TouchableOpacity>
                            )
                        })
                        }
                    </View>

                    <View
                        style={Style.styleGroup1}
                    >
                        <TouchableOpacity
                            style={Style.styleBtnAddProduct}
                        >
                            <Text style={Style.txtBtnAddProduct} tx="checkInventory.addProduct"></Text>
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
                                <Text style={{ fontSize: scaleWidth(12), fontWeight: '600' }}>Gạch 1566CB502 60x60</Text>
                                <View style={Style.flexRow}>
                                    <Text style={[Style.txtColorDolphin, { fontSize: scaleWidth(12) }]}>Kho thực tế:</Text>
                                    <Text style={[Style.txtColorDolphin, { fontSize: scaleWidth(12) }]}>Kho hệ thống</Text>
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
                                            <Svgs.icon_plusGreen
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: scaleWidth(12), fontWeight: '500' }}>Lệch : -6</Text>
                                    </View>
                                </View>

                                <Text style={{ fontSize: scaleWidth(12), color: colors.palette.radicalRed }}
                                    tx="validate.checkQuantity"
                                >

                                </Text>

                            </View>
                        </View>

                    </View>

                    <View style={Style.styleGroup2}>
                        <View style={Style.flexRow}>
                            <Text style={Style.txtGroup2}
                                tx="checkInventory.actualStock" />


                            <Text style={Style.stylesNumber}>
                                0
                            </Text>
                        </View>
                        <View style={[Style.flexRow, { marginVertical: scaleHeight(10) }]}>
                            <Text style={Style.txtGroup2}
                                tx="checkInventory.inventoryQuantityInTheSystem"
                            >

                            </Text>
                            <Text style={Style.stylesNumber}>
                                6
                            </Text>
                        </View>
                        <View style={Style.flexRow}>
                            <Text style={Style.txtGroup2}
                                tx="checkInventory.differenceInQuantity"
                            >

                            </Text>
                            <Text style={Style.stylesNumber}>
                                6
                            </Text>
                        </View>
                    </View>


                    <View style={Style.styleGroup2}>
                        <View style={[Style.flexRow, { alignItems: 'center' }]}>
                            <Text style={Style.txtGroup2}
                                tx="checkInventory.note"
                            >

                            </Text>
                            <Svgs.icon_image />
                        </View>

                    </View>
                </View>

                <View style={Style.stylesBtnBottom}>
                    <TouchableOpacity
                        style={[onClick === 'save' ? Style.btnSuccessfully : Style.btnSave, { marginRight: 13 }]}
                        onPress={() => setOnClick('save')}
                    >
                        <Text
                            style={{ color: onClick === 'save' ? colors.palette.white : colors.palette.navyBlue }}
                            tx="checkInventory.deponsit"
                        >

                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={onClick === 'successfully' ? Style.btnSuccessfully : Style.btnSave}
                        onPress={() => setOnClick('successfully')}
                    >
                        <Text
                            style={{ color: onClick === 'successfully' ? colors.palette.white : colors.palette.navyBlue }}
                            tx="checkInventory.complete"
                        >

                        </Text>
                    </TouchableOpacity>

                </View>
            </View >
        )
    }
)
export const Style = StyleSheet.create({
    body: {
        flex: 1,
        padding: 16,
    },
    styleItemTabar: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.palette.veryLightGrey,
        marginRight: 8,
    },
    styleItemTabarIsclick: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.palette.navyBlue,
        marginRight: 8,

    },
    styleGroup1: {
        paddingVertical: scaleHeight(10),
        paddingHorizontal: scaleWidth(16),
        borderRadius: 8,
        backgroundColor: colors.white,
        marginVertical: scaleHeight(15)

    },
    styleGroup2: {
        borderRadius: 8,
        backgroundColor: colors.white,
        paddingVertical: scaleHeight(12),
        paddingHorizontal: scaleWidth(16),
        marginBottom: scaleHeight(15),
    },
    styleBtnAddProduct: {
        borderWidth: 1,
        borderColor: colors.palette.navyBlue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7,
        borderRadius: 8,
    },
    StyleBTNplusAndMinus: {
        width: 91,
        height: 30,
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 10,
        borderColor: colors.whiteSmoke,
        alignItems: 'center',
        justifyContent: 'space-evenly'

    },
    txtBtnAddProduct: {
        color: colors.palette.navyBlue,
        fontSize: 14,
        fontWeight: "600",

    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtColorDolphin: {
        color: colors.palette.dolphin,
    },
    txtGroup2: {
        fontSize: scaleWidth(10),
        color: colors.palette.dolphin,
    },
    stylesNumber: {
        fontWeight: '500',
        fontSize: scaleWidth(12),


    },
    stylesBtnBottom: {
        backgroundColor: colors.white,
        padding: scaleWidth(16),
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    btnSave: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 7,
        padding: scaleWidth(12),
        backgroundColor: colors.white,
        alignItems: 'center',

        borderColor: colors.palette.navyBlue,
        width: scaleWidth(165)

    },
    btnSuccessfully: {
        width: scaleWidth(160),
        flex: 1,
        borderWidth: 1,
        borderRadius: 7,
        padding: scaleWidth(12),
        backgroundColor: colors.palette.navyBlue,
        alignItems: 'center',
        borderColor: colors.palette.navyBlue,

    },


})