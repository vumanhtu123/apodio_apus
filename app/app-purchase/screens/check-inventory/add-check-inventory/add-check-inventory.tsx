import { StackScreenProps } from "@react-navigation/stack";
import { FC, useState } from "react";
import {  NavigatorParamList } from "../../../navigators";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import { Alert, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Header, Text } from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { it } from "date-fns/locale";





export const addCheckInventory: FC<StackScreenProps<NavigatorParamList, "addCheckIventory">> = observer(




    function addCheckInventory(props) {
        interface Item {
            id: String;
            img: String;
            name: String;
            quantity: number;
        }

        const [sellectTab, setSellectTab] = useState('product')
        const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>({})

        const dataInventorycheckSheet = [
            {
                id: 'SP00001',
                img: "https://www.gachviet.vn/upload/product/910129732187.jpg",
                name: "Gạch 36815",
                quantity: 600,
            },
            {
                id: 'SP00002',
                img: "https://www.gachviet.vn/upload/product/910129732187.jpg",
                name: "Gạch 36815",
                quantity: 500,
            },
            {
                id: 'SP00003',
                img: "https://www.gachviet.vn/upload/product/910129732187.jpg",
                name: "Gạch 36815",
                quantity: 400,
            },
        ]


        const ItemListProduct = ({ item }: { item: Item }) => {

            const handleIncrement = () => {
               
                setItemCounts({ ...itemCounts, [item.id]: (itemCounts[item.id] || 0) + 1 });
                console.log('addd', {...itemCounts});
            };

            const handleDecrement = () => {
                setItemCounts({ ...itemCounts, [item.id]: Math.max((itemCounts[item.id] || 0) - 1, 0) });
            };
            return (
                <View style={{ flex: 1, padding: scaleWidth(6), flexDirection: 'row', backgroundColor: '#FFF', marginBottom: 12, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', borderRadius: 8, }}>
                        <Image
                            source={{ uri: item.img }}
                            style={{ width: scaleWidth(40), height: scaleHeight(40), borderRadius:8 }}
                        />
                        <View style={{ marginLeft: 10, justifyContent: 'space-between' }}>
                            <Text style={Style.StyleNameItem}>{item.name}</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={Style.StyleContentItem}>{item.id}</Text>

                                <Text style={[Style.StyleContentItem, { marginHorizontal: 6 }]}>|</Text>

                                <Text style={Style.StyleContentItem}>Còn:{itemCounts[item.id] || item.quantity}</Text>
                            </View>
                        </View>
                    </View>


                    <View style={Style.StyleBTNplusAndMinus}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}
                            onPress={() => handleDecrement()}
                        >
                            <Svgs.ic_minus />
                        </TouchableOpacity>
                        <Text style={{ flex: 1, textAlign: 'center' }}>
                            {itemCounts[item.id] || item.quantity}
                        </Text>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}
                            onPress={() => handleIncrement()}

                        >
                            <Svgs.icon_plusGreen
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <Header
                    LeftIcon={Svgs.back}
                    headerTx="checkInventory.createInventorySeets"
                    headerInput={true}
                    RightIconTextInput={Svgs.ic_QR}
                    style={{ height: scaleHeight(52) }}
                    onLeftPress={() => props.navigation.goBack()}
                />
                <View style={{ flex: 1, padding: 16 }}>
                    {
                        dataInventorycheckSheet ?
                            <View style={{ flex: 1 }}>

                                <View style={Style.StyleTabar}>
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
                                        <Text style={sellectTab === 'product' ? Style.StyleTextTabar : Style.StyleTextTabarUnSelect} >Sản phẩm</Text>
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
                                        <Text style={sellectTab === 'material' ? Style.StyleTextTabar : Style.StyleTextTabarUnSelect}>
                                            Nguyên vật liệu
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <FlatList

                                    data={dataInventorycheckSheet}
                                    renderItem={({ item }) => <ItemListProduct item={item} />}

                                />
                            </View>
                            :
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <Svgs.ic_BoxAndSearch />

                                <Text
                                    style={{ textAlign: 'center', fontSize: 16 }}
                                    tx="checkInventory.searchAndSelectProductsMaterialsToStartCheckingGoods"
                                />
                            </View>

                    }


                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: 48,
                            backgroundColor: colors.palette.navyBlue,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 8
                        }}
                        onPress={() => {
                            // Alert.alert('ok')
                            props.navigation.navigate('addProduct')
                        }}
                    >
                        <Text

                            style={{ color: '#FFF' }}
                            tx="checkInventory.btnAddProduct"
                        />
                    </TouchableOpacity>
                </View>




            </View>
        )
    }
)
export const Style = StyleSheet.create({
    StyleNameItem: {
        fontSize: 10,
        color: 'black',
        fontWeight: '600',
        fontFamily: 'Inter-Bold'
    },
    StyleContentItem: {
        fontSize: 8,
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
    StyleTabar: {
        flexDirection: 'row',
        backgroundColor: '#E6E7EA',
        height: 32,
        // justifyContent:'space-between',
        borderRadius: 8,
        marginBottom: 20
    },
    StyleTextTabar: {
        fontSize: 13,
        fontWeight: "700",

    },
    StyleTextTabarUnSelect: {
        fontSize: 13,
        fontWeight: "500",

    }, 


})

