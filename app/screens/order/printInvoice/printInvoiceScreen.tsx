/* eslint-disable react-native/no-inline-styles */
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import {
    FlatList,
    ImageBackground,
    NativeModules,
    TouchableOpacity,
    View
} from 'react-native';
import { styles } from './styles';

import { Images } from '../../../../assets/index';
import { Header } from '../../../components/header/header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from '../../../components';
import { fontSize, scaleHeight, scaleWidth } from '../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStores } from '../../../models';
import { calculateTotalDiscount, calculateTotalPrice, calculateTotalUnitPrice, formatCurrency } from '../../../utils/validate';
import ProductAttribute from '../../product/component/productAttribute';
import FastImage from 'react-native-fast-image';
import RNFS from 'react-native-fs';



export const PrintInvoiceScreen: FC = observer(
    function PrintInvoiceScreen(props) {
        const navigation = useNavigation();
        const { orderStore, vendorStore } = useStores();
        const [data, setData] = useState<any>([]);
        const [dataInfoCompany, setDataInfoCompany] = useState<any>([]);
        const route = useRoute()
        const invoiceId = route?.params?.invoiceId
        const { PrintManager } = NativeModules;

        const handleGetDetailInvoice = async () => {
            try {
                const response = await orderStore.getDetailInvoice(invoiceId);
                if (response && response.kind === "ok") {
                    const data = response.response.data;
                    console.log('dataDetailInvoice', JSON.stringify(data))
                    setData(data);
                } else {
                    console.error("Failed to fetch detail:", response);
                }
            } catch (error) {
                console.error("Error fetching detail:", error);
            }
        };
        const handleGetInfoCompany = async () => {
            try {
                const response = await vendorStore.getInfoCompany();
                console.log('INFO COMPANY', response)
                if (response && response.kind === "ok") {
                    // vendorStore.setCheckSeparator(response.result.data.thousandSeparator)
                    setDataInfoCompany(response.result.data)
                } else {
                    console.error("Failed to fetch categories:", response.result.errorCodes);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }

        };
        const downloadAndPrintImage = async (imageUrl: any) => {
            try {
                // Đường dẫn tạm thời trên thiết bị
                const localFilePath = `${RNFS.DocumentDirectoryPath}/tempimage.jpg`;

                // Tải file ảnh từ URL về thiết bị
                const downloadResult = await RNFS.downloadFile({
                    fromUrl: imageUrl,
                    toFile: localFilePath,
                }).promise;

                if (downloadResult.statusCode === 200) {
                    console.log('Image downloaded to:', localFilePath);
                    // Gọi hàm in với đường dẫn file cục bộ
                    PrintManager.print(localFilePath);
                } else {
                    console.error('Image download failed:', downloadResult);
                }
            } catch (error) {
                console.error('Error downloading image:', error);
            }
        };

        useEffect(() => {
            handleGetDetailInvoice()
            handleGetInfoCompany()
        }, []);
        const renderItem = ({ item }: any) => (
            <View style={styles.row}>
                <View style={{ flexDirection: 'row', marginVertical: scaleHeight(15) }}>
                    <View style={styles.cell}>
                        <Text style={styles.sanPhamText}>{item.product.name}</Text>
                    </View>
                    <Text style={styles.cellUnitPrice}>{formatCurrency(item.unitPrice)}</Text>
                    <Text style={styles.cellAmount}>
                        {item.quantity} <Text style={{ fontSize: fontSize.size12 }}>
                            {item.uom.name}</Text></Text>
                    <Text style={styles.cellMoney}>{formatCurrency(calculateTotalUnitPrice(item.unitPrice, item.quantity))}</Text>
                </View>
            </View>
        );
        const HeaderList = () => (
            <View style={styles.headerRow}>
                <View style={{ flexDirection: 'row', marginBottom: scaleHeight(15) }}>
                    <Text tx='printInvoiceScreen.product' style={styles.cellProductHeader} />
                    <Text tx='printInvoiceScreen.unitPrice' style={styles.cellUnitPriceHeader} />
                    <Text tx='printInvoiceScreen.quality' style={styles.cellAmountHeader} />
                    <Text tx='printInvoiceScreen.amountPrice' style={styles.cellMoneyHeader} />
                </View>
            </View>
        );
        return (
            <View style={styles.ROOT}>
                <Header
                    headerTx={'printInvoiceScreen.printInvoice'}
                    type={"AntDesign"}
                    LeftIcon={Images.back}
                    onLeftPress={() => navigation.goBack()}
                    style={styles.header}
                    titleStyle={styles.textHeader}
                />
                <ScrollView style={styles.container} nestedScrollEnabled={true}>
                    <View style={{ marginHorizontal: scaleWidth(16) }}>
                        <View style={{ marginTop: 20, flexDirection: 'row' }}>
                            {/* <Images.icon_QRCode width={80} height={80} /> */}
                            <ImageBackground
                                style={{ width: scaleWidth(80), height: scaleHeight(80) }}
                                imageStyle={{
                                    borderRadius: 20,
                                }}
                                source={require("../../../../assets/Images/no_images.png")}>
                                <FastImage
                                    style={{
                                        width: scaleWidth(80),
                                        height: scaleHeight(80),
                                    }}
                                    // resizeMode='cover'
                                    source={{
                                        uri: dataInfoCompany.logo,
                                        cache: FastImage.cacheControl.immutable,
                                    }}
                                    defaultSource={require("../../../../assets/Images/no_images.png")}
                                />
                            </ImageBackground>
                            <View style={styles.infoContainer}>
                                <Text style={styles.companyName}>{dataInfoCompany.name}</Text>
                                {/* <Text style={styles.textInfo} >www.apodio.com.vn</Text> */}
                                <Text style={styles.textInfo}>{dataInfoCompany.phone}</Text>
                                <Text style={styles.textInfo}>
                                    {dataInfoCompany?.address ? dataInfoCompany?.address + " " : ""}
                                    {dataInfoCompany?.ward ? dataInfoCompany.ward + ", " : ""}
                                    {dataInfoCompany.district ? dataInfoCompany.district + ", " : ""}
                                    {dataInfoCompany.city ? dataInfoCompany.city : ""}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.viewLine} />
                        <View>
                            <View style={{ marginBottom: scaleHeight(20) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text tx='printInvoiceScreen.invoice' style={styles.invoiceName} />
                                    <Text style={styles.invoiceName}> #{data.codeInvoice}</Text>
                                </View>
                                <Text style={styles.invoiceTime}>{data.invoiceDate}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: scaleHeight(12) }}>
                                <Text tx='printInvoiceScreen.name' style={styles.companyName} />
                                <Text style={styles.textInfo}> {data.partner?.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: scaleHeight(12) }}>
                                <Text tx='printInvoiceScreen.address' style={styles.companyName} />
                                <Text style={styles.textInfo}>
                                    {data.deliveryAddress?.address ? data.deliveryAddress.address + " " : ""}
                                    {data.deliveryAddress?.ward ? data.deliveryAddress.ward + ", " : ""}
                                    {data.deliveryAddress?.district ? data.deliveryAddress.district + ", " : ""}
                                    {data.deliveryAddress?.city ? data.deliveryAddress.city : ""}
                                    {/* { ` ${data.deliveryAddress?.address}, ${data.deliveryAddress?.wardName}, ${data.deliveryAddress?.districtName}, ${data.deliveryAddress?.cityName}`} */}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text tx='printInvoiceScreen.phone' style={styles.companyName} />
                                <Text style={styles.textInfo}> {data.partner?.phoneNumber}</Text>
                            </View>
                        </View>
                        <View style={styles.viewLine} />
                        <View>
                            <HeaderList />
                            <FlatList
                                data={data.invoiceLines}
                                renderItem={renderItem}
                                scrollEnabled={false}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={{ marginTop: scaleHeight(15) }}>
                            {/* {dataPrice.map((item, index) => (
                                <View key={index} style={styles.rowPrice}>
                                    <Text style={styles.label}>{item.label}</Text>
                                    <Text style={[styles.value, item.highlight && styles.highlight]}>
                                        {item.value.toLocaleString()}
                                    </Text>
                                </View>
                            ))} */}
                            <ProductAttribute
                                labelTx="printInvoiceScreen.amountUntaxed"
                                value={formatCurrency(calculateTotalPrice(data.invoiceLines))}
                            />
                            <ProductAttribute
                                labelTx="dashboard.promotions"
                                value={formatCurrency(calculateTotalDiscount(data.invoiceLines))}
                            />
                            {data.computeTaxInfo?.taxLines.map((tax: any) => (
                                tax.items?.map((item: any, index: any) => (
                                    <ProductAttribute
                                        key={index}
                                        label={item.taxName}
                                        value={formatCurrency(item.amount)}
                                    />
                                ))
                            ))}
                            {/* <ProductAttribute
                                labelTx="printInvoiceScreen.amountUntaxed"
                                value={formatCurrency(data.amountUntaxed)}
                            /> */}
                            <ProductAttribute
                                labelTx="printInvoiceScreen.totalPrice"
                                value={formatCurrency(data.amountTotal)}
                            />
                        </View>
                    </View>
                </ScrollView>
                <Button
                    tx={"printInvoiceScreen.printInvoice"}
                    style={styles.viewButton}
                    textStyle={styles.textButton}
                    onPress={() =>
                        downloadAndPrintImage(
                            'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg',
                        )
                    }
                />
            </View>
        );
    },
);
