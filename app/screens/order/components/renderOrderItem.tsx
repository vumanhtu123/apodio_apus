import React, { useState } from 'react';
import { TouchableOpacity, View, ImageBackground, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Images } from '../../../../assets';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import { Text } from '../../../components';
import { TurboModuleRegistry } from 'react-native-windows';
import { useStores } from '../../../models';
import AutoHeightImage from 'react-native-auto-height-image';

const RenderOrderItem = ({ item, index, isGridView, viewProduct, handleProductDetail, handleClassifyDetail }: any) => {
    const { orderStore } = useStores()
    const { dataProductAddOrderNew, setDataProductAddOrderNew } = orderStore

    const handleAddProduct = (data: any) => {
        console.log(data)
        const newArr1 = { ...data, amount: 1 }
        const newArr = dataProductAddOrderNew.concat(newArr1)
        setDataProductAddOrderNew(newArr)
        console.log(dataProductAddOrderNew)
    }

    const handleMinus = (data: any) => {
        const newArr1 = dataProductAddOrderNew.slice()
        const newArr2 = newArr1.map(items => {
            if (items.id === data.id) {
                const amounts = items.amount - 1
                if (amounts === 0) {
                    return
                } else {
                    return { ...items, amount: amounts }
                }
            } else { return items }
        })
        const newArr3 = newArr2.filter(items => items !== undefined)
        setDataProductAddOrderNew(newArr3)
        console.log(dataProductAddOrderNew)
    }
    const handlePlus = (data: any) => {
        const newArr1 = dataProductAddOrderNew.slice()
        const newArr2 = newArr1.map(items => {
            if (items.id === data.id) {
                return { ...items, amount: items.amount + 1 }
            } else { return items }
        })
        setDataProductAddOrderNew(newArr2)
        console.log(dataProductAddOrderNew)
    }

    const idItemCheck = dataProductAddOrderNew.filter(items => items.id === item.id)

    if (isGridView) {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    viewProduct === 'VIEW_PRODUCT' ? handleProductDetail(item.id) : handleClassifyDetail(item.id);
                }}
                style={[
                    stylesItem.item,
                    {
                        width: scaleWidth(107),
                        // height: scaleHeight(124),
                        marginRight: scaleWidth(11),
                    },
                ]}>
                <View
                    style={{
                        position: "absolute",
                        top: scaleHeight(44),
                        right: scaleWidth(6),
                        zIndex: 1,
                    }}>
                </View>
                <View
                    style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                    }}>
                    <View style={stylesItem.icon}>
                        <ImageBackground
                            style={{ width: scaleWidth(107), height: scaleHeight(50) }}
                            imageStyle={{
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                            }}
                            source={require("../../../../assets/Images/no_images.png")}
                        >
                            {viewProduct === "VIEW_PRODUCT" ? null :
                                <FastImage
                                    style={{
                                        width: scaleWidth(107),
                                        height: scaleHeight(50),
                                        borderTopLeftRadius: 12,
                                        borderTopRightRadius: 12,
                                    }}
                                    source={{
                                        uri: item.productImage && item?.productImage?.length !== 0 ? item.productImage[0] : '',
                                        cache: FastImage.cacheControl.immutable,
                                    }}
                                    defaultSource={require("../../../../assets/Images/no_images.png")}
                                />}
                        </ImageBackground>
                    </View>
                    <View
                        style={{
                            alignItems: viewProduct === "VIEW_PRODUCT" ? 'center' : 'flex-start',
                            paddingHorizontal: scaleWidth(8),
                            marginBottom: scaleHeight(8),
                            width: scaleWidth(107)
                        }}>
                        <Text numberOfLines={1} style={stylesItem.title}>{item.sku}</Text>
                        <Text numberOfLines={1} style={stylesItem.textName}>
                            {item.name}
                        </Text>
                        {viewProduct === "VIEW_PRODUCT" ?
                            <Text style={stylesItem.amount} numberOfLines={1}>
                                {item.quantityInventory} <Text text={item?.uom?.name} style={stylesItem.amount}></Text>
                            </Text>
                            : viewProduct === "VIEW_VARIANT" && orderStore.checkPriceList === true ?
                                <Text style={stylesItem.amount} numberOfLines={1}>
                                    {item.quantityInventory} <Text text={item?.uomName} style={stylesItem.amount}></Text>
                                </Text>
                                : null}
                        {viewProduct === "VIEW_PRODUCT" ? (
                            <Text style={stylesItem.content} numberOfLines={1}>
                                {item.variantCount} <Text tx="productScreen.productClassification" style={stylesItem.content}></Text>
                            </Text>
                        ) : null}
                        {viewProduct === "VIEW_PRODUCT" ?
                            (item.quantityInventory === 0 ? <Text numberOfLines={1} style={[stylesItem.amount, { fontStyle: 'italic' }]} text='Hết hàng' /> :
                                item.quantityInventory >= 10 ? <Text numberOfLines={1} style={[stylesItem.amount, { color: colors.palette.malachite, fontStyle: 'italic' }]} text='Còn hàng' /> :
                                    <Text numberOfLines={1} style={[stylesItem.amount, { color: colors.palette.yellow, fontStyle: 'italic' }]} text='Sắp hết hàng' />)
                            : viewProduct === "VIEW_VARIANT" && orderStore.checkPriceList === true ?
                                (item.quantityInventory === 0 ? <Text numberOfLines={1} style={[stylesItem.amount, { fontStyle: 'italic' }]} text='Hết hàng' /> :
                                    item.quantityInventory >= 10 ? <Text numberOfLines={1} style={[stylesItem.amount, { color: colors.palette.malachite, fontStyle: 'italic' }]} text='Còn hàng' /> :
                                        <Text numberOfLines={1} style={[stylesItem.amount, { color: colors.palette.yellow, fontStyle: 'italic' }]} text='Sắp hết hàng' />) : null}
                        {viewProduct === "VIEW_PRODUCT" ? null :
                            (idItemCheck.length === 0 ?
                                <TouchableOpacity style={{ marginVertical: scaleHeight(5.5) }}
                                    onPress={() => handleAddProduct(item)}>
                                    <Images.icon_plus_blue2 />
                                </TouchableOpacity>
                                : <View style={{
                                    // marginLeft: scaleWidth(margin.margin_12),
                                    marginTop: scaleHeight(2),
                                    flexDirection: 'row',
                                    borderWidth: 1, borderColor: colors.palette.whiteSmoke,
                                    alignItems: "center",
                                    paddingVertical: scaleHeight(3),
                                    borderRadius: 8,
                                }}>
                                    <TouchableOpacity onPress={() => handleMinus(item)}
                                        style={{ width: '30%', alignItems: 'center' }}
                                    >
                                        <Images.icon_minus />
                                    </TouchableOpacity>
                                    <Text style={{
                                        width: '40%',
                                        textAlign: 'center',
                                    }} >{idItemCheck[0].amount}</Text>
                                    <TouchableOpacity onPress={() => handlePlus(item)}
                                        style={{ width: '30%', alignItems: 'center' }}
                                    >
                                        <Images.icon_plusGreen />
                                    </TouchableOpacity>
                                </View>)
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => viewProduct === 'VIEW_PRODUCT' ? handleProductDetail(item.id) : handleClassifyDetail(item.id)}
                style={[
                    stylesItem.item,
                    { width: scaleWidth(343) },
                ]}>
                <View
                    style={{
                        position: "absolute",
                        top: scaleHeight(56),
                        right: scaleWidth(6),
                        backgroundColor: "#F6F7F9",
                        zIndex: 1,
                    }}>
                    {viewProduct === 'VIEW_VARIANT' && item.upc !== null ?
                        <TouchableOpacity >
                            <Images.ic_3d width={scaleWidth(20)} height={scaleHeight(20)} />
                        </TouchableOpacity> : null
                    }
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                    }}>
                    <View style={{ margin: 6, borderRadius: 10 }}>
                        <ImageBackground
                            style={{
                                width: scaleWidth(70),
                                height: scaleHeight(70),
                            }}
                            imageStyle={{ borderRadius: 8 }}
                            source={require("../../../../assets/Images/no_images.png")}>
                            {viewProduct === "VIEW_PRODUCT" ? null :
                                <FastImage
                                    style={{
                                        width: scaleWidth(70),
                                        height: scaleHeight(70),
                                        borderRadius: 8
                                    }}
                                    source={{
                                        uri: item.productImage && item?.productImage?.length !== 0 ? item.productImage[0] : '',
                                        cache: FastImage.cacheControl.immutable,
                                    }}
                                    defaultSource={require("../../../../assets/Images/no_images.png")}
                                />}
                        </ImageBackground>
                    </View>
                    <View
                        style={[
                            stylesItem.titleView,
                            { marginTop: scaleHeight(10), marginHorizontal: scaleWidth(6) },
                        ]}>
                        <Text numberOfLines={1} style={[stylesItem.title, { marginRight: scaleWidth(5) }]}>{item.sku}</Text>
                        <View style={{ width: scaleWidth(200) }}>
                            <Text numberOfLines={1} style={stylesItem.textName}>
                                {item.name}
                            </Text>
                        </View>
                        {viewProduct === "VIEW_PRODUCT" ?
                            <Text style={stylesItem.amount} numberOfLines={1}>
                                {item.quantityInventory} <Text text={item?.uom?.name} style={stylesItem.amount}></Text>
                            </Text>
                            : viewProduct === "VIEW_VARIANT" && orderStore.checkPriceList === true ?
                                <Text style={stylesItem.amount} numberOfLines={1}>
                                    {item.quantityInventory} <Text text={item?.uomName} style={stylesItem.amount}></Text>
                                </Text>
                                : null}
                        {viewProduct === "VIEW_PRODUCT" ? (
                            <Text style={stylesItem.content} numberOfLines={1}>
                                {item.variantCount} <Text tx="productScreen.productClassification" style={stylesItem.content}></Text>
                            </Text>
                        ) : null}
                        {viewProduct === "VIEW_PRODUCT" ?
                            (item.quantityInventory === 0 ? <Text numberOfLines={1} style={[stylesItem.amount, { fontStyle: 'italic' }]} text='Hết hàng' /> :
                                item.quantityInventory >= 10 ? <Text numberOfLines={1} style={[stylesItem.amount, { color: colors.palette.malachite, fontStyle: 'italic' }]} text='Còn hàng' /> :
                                    <Text numberOfLines={1} style={[stylesItem.amount, { color: colors.palette.yellow, fontStyle: 'italic' }]} text='Sắp hết hàng' />)
                            : viewProduct === "VIEW_VARIANT" && orderStore.checkPriceList === true ?
                                (item.quantityInventory === 0 ? <Text numberOfLines={1} style={[stylesItem.amount, { fontStyle: 'italic' }]} text='Hết hàng' /> :
                                    item.quantityInventory >= 10 ? <Text numberOfLines={1} style={[stylesItem.amount, { color: colors.palette.malachite, fontStyle: 'italic' }]} text='Còn hàng' /> :
                                        <Text numberOfLines={1} style={[stylesItem.amount, { color: colors.palette.yellow, fontStyle: 'italic' }]} text='Sắp hết hàng' />) : null}
                        {viewProduct === "VIEW_PRODUCT" ? null :
                            (idItemCheck.length === 0 ?
                                <TouchableOpacity style={{ marginVertical: scaleHeight(5.5) }}
                                    onPress={() => handleAddProduct(item)}>
                                    <Images.icon_plus_blue2 />
                                </TouchableOpacity>
                                : <View style={{
                                    // marginLeft: scaleWidth(margin.margin_12),
                                    marginTop: scaleHeight(2),
                                    flexDirection: 'row',
                                    borderWidth: 1, borderColor: colors.palette.whiteSmoke,
                                    alignItems: "center",
                                    paddingVertical: scaleHeight(3),
                                    borderRadius: 8,
                                }}>
                                    <TouchableOpacity onPress={() => handleMinus(item)}
                                        style={{ width: '15%', alignItems: 'center' }}
                                    >
                                        <Images.icon_minus />
                                    </TouchableOpacity>
                                    <Text style={{
                                        width: '25%',
                                        textAlign: 'center',
                                    }} >{idItemCheck[0].amount}</Text>
                                    <TouchableOpacity onPress={() => handlePlus(item)}
                                        style={{ width: '15%', alignItems: 'center' }}
                                    >
                                        <Images.icon_plusGreen />
                                    </TouchableOpacity>
                                </View>)
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
};

export default RenderOrderItem;

const stylesItem = StyleSheet.create({
    content: {
        color: colors.palette.navyBlue,
        fontSize: fontSize.size8,
        fontWeight: '500',
    },
    amount: {
        color: colors.palette.radicalRed,
        fontSize: fontSize.size8,
        fontWeight: '500',
    },

    icon: {
        marginTop: 0,
        marginBottom: 5,
        // backgroundColor : 'red'
    },
    item: {
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: scaleHeight(10),
    },
    title: {
        color: "#242426",
        fontSize: fontSize.size10,
        fontWeight: "700",
    },
    textName: {
        color: "#242426",
        fontSize: fontSize.size10,
        fontWeight: "400",
    },
    titleView: {
        alignItems: "flex-start",
    },
    description: {
        fontSize: fontSize.size9,
        color: "#888",
        fontStyle: "italic",
        // marginBottom: 4,
    },
    columnWrapper: {
        // justifyContent: 'space-between',
        // marginBottom: scaleHeight(16),
    },
});