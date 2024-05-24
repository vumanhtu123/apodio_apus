import { StackNavigationProp } from "@react-navigation/stack";
import { FC, useState } from "react";
import { AppStackParamList } from "../../../navigators";
import { observer } from "mobx-react-lite";
import { Header, Text } from "../../../components";
import { Images } from "../../../../assets";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../login/styles";



export const addProductCreate: FC<StackNavigationProp<AppStackParamList, "addProduct">> = observer(
    function AddProduct(props) {
        const navigation = useNavigation();

        const [titleTabar, setTitleTabar] = useState(['Tất cả', 'Apodio', 'Marvel'])
        const [indexTabbar, setIndexTabbar] = useState(0)
        const [onClick, setOnClick] = useState('successfully')

        return (
            <View style={{ flex: 1 }}>
                <Header
                    LeftIcon={Images.back}
                    headerTx="checkInventory.createInventorySeets"
                    headerInput={true}
                    RightIconTextInput={Images.ic_QR}
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
                            <Text style={Style.txtBtnAddProduct}>+ Thêm sản phẩm</Text>
                        </TouchableOpacity>

                        <View
                            style={{ flexDirection: 'row', marginTop: scaleHeight(24), marginBottom: scaleHeight(20) }}
                        >
                            <View style={{ zIndex: 1 }}>
                                <Images.ic_Brick />
                                <View style={{ zIndex: 2, position: 'absolute', top: scaleHeight(-6), start: scaleWidth(-2) }}>
                                    <Images.ic_Xcircle />
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
                                            <Images.ic_minus />
                                        </TouchableOpacity>
                                        <Text style={{ flex: 1, textAlign: 'center' }}>
                                            {/* {itemCounts[item.id] || item.quantity} */}
                                            0
                                        </Text>
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}
                                        // onPress={() => handleIncrement()}

                                        >
                                            <Images.icon_plusGreen
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: scaleWidth(12), fontWeight: '500' }}>Lệch : -6</Text>
                                    </View>
                                </View>

                                <Text style={{ fontSize: scaleWidth(12), color: colors.palette.radicalRed }}>
                                    Số lượng thực tế không được nhỏ hơn 0
                                </Text>

                            </View>
                        </View>

                    </View>

                    <View style={Style.styleGroup2}>
                        <View style={Style.flexRow}>
                            <Text style={Style.txtGroup2}>
                                Số lượng tồn thực tế
                            </Text>
                            <Text style={Style.stylesNumber}>
                                0
                            </Text>
                        </View>
                        <View style={[Style.flexRow, { marginVertical: scaleHeight(10) }]}>
                            <Text style={Style.txtGroup2}>
                                Số lượng tồn kho trong hệ thống
                            </Text>
                            <Text style={Style.stylesNumber}>
                                6
                            </Text>
                        </View>
                        <View style={Style.flexRow}>
                            <Text style={Style.txtGroup2}>
                                Số lượng chênh lệch
                            </Text>
                            <Text style={Style.stylesNumber}>
                                6
                            </Text>
                        </View>
                    </View>


                    <View style={Style.styleGroup2}>
                        <View style={[Style.flexRow, { alignItems: 'center' }]}>
                            <Text style={Style.txtGroup2}>
                                Ghi Chú
                            </Text>
                            <Images.icon_image />
                        </View>

                    </View>
                </View>

                <View style={Style.stylesBtnBottom}>
                    <TouchableOpacity
                        style={[onClick === 'save' ? Style.btnSuccessfully : Style.btnSave,{marginRight:13}]}
                        onPress={() => setOnClick('save')}
                    >
                        <Text
                            style={{ color: onClick === 'save' ? colors.palette.white : colors.palette.navyBlue }}
                        >
                            Lưu phiếu
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={onClick === 'successfully' ? Style.btnSuccessfully : Style.btnSave}
                        onPress={() => setOnClick('successfully')}
                    >
                        <Text
                            style={{ color: onClick === 'successfully' ? colors.palette.white : colors.palette.navyBlue }}
                        >
                            Hoàn thành
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
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
        backgroundColor: '#FFF',
        marginVertical: scaleHeight(15)

    },
    styleGroup2: {
        borderRadius: 8,
        backgroundColor: '#FFF',
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
        borderColor: '#F4F4F4',
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
       backgroundColor:'#FFF',
       padding:scaleWidth(16),
       flexDirection:'row',
       justifyContent:'space-between'
    
    },
    btnSave: {
        flex:1,
        borderWidth:1,
        borderRadius:7,
        padding:scaleWidth(12),
        backgroundColor:'#FFF',
        alignItems:'center',
       
        borderColor:colors.palette.navyBlue,
        width:scaleWidth(165)

    },
    btnSuccessfully:{
        width:scaleWidth(160),
        flex:1,
        borderWidth:1,
        borderRadius:7,
        padding:scaleWidth(12),
        backgroundColor:colors.palette.navyBlue,
        alignItems:'center',
        borderColor:colors.palette.navyBlue,

    },


})