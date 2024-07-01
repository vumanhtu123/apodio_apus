/* eslint-disable react-native/no-inline-styles */
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import {
    FlatList,
    ImageBackground,
    NativeModules,
    PermissionsAndroid,
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
import { calculateTotalDiscount, calculateTotalPrice, calculateTotalUnitPrice, commasToDots, formatCurrency, formatVND } from '../../../utils/validate';
import ProductAttribute from '../../product/component/productAttribute';
import FastImage from 'react-native-fast-image';
import RNFS from 'react-native-fs';



export const PrintInvoiceScreen: FC = observer(
    function PrintInvoiceScreen(props) {
        const navigation = useNavigation();
        const { orderStore, vendorStore } = useStores();
        const [data, setData] = useState<any>([]);
        const [dataPrintInvoice, setDataPrintInvoice] = useState<any>([]);
        const [dataInfoCompany, setDataInfoCompany] = useState<any>([]);
        const route = useRoute()
        const invoiceId = route?.params?.invoiceId
        const { PrintManager } = NativeModules;
        console.log('firstzzzzádfasf', invoiceId)
        const handleGetDetailInvoice = async () => {
            try {
                const response = await orderStore.getDetailInvoice(invoiceId);
                if (response && response.kind === "ok") {
                    const data = response.response.data;
                    console.log('dataDetailInvoice', JSON.stringify(data))
                    setData(data);
                } else {
                    console.error("Failed to fetch detail Invoice:", response);
                }
            } catch (error) {
                console.error("Error fetching detail=== Invoice:", error);
            }
        };
        const handleGetPrintInvoice = async () => {
            try {
                const response = await orderStore.printInvoice(invoiceId);
                if (response && response.kind === "ok") {
                    const data = response.response.data;
                    console.log('dataPrintInvoice', JSON.stringify(data))
                    setDataPrintInvoice(data);
                } else {
                    console.error("Failed to fetch print:", response);
                }
            } catch (error) {
                console.error("Error fetching print:", error);
            }
        };


          const downloadAndPrintFile = async (url: any, fileType: any) => {      
            const extension = fileType === 'pdf' ? 'pdf' : 'jpg'; // Adjust this based on the expected file type
            const localFilePath = `${RNFS.DocumentDirectoryPath}/downloaded_file.${extension}`;    
            
            try {
              const downloadResult = await RNFS.downloadFile({
                fromUrl: url,
                toFile: localFilePath,
              }).promise;
          
              if (downloadResult.statusCode === 200) {
                console.log(`${fileType} downloaded to:`, localFilePath);
                PrintManager.print(localFilePath, fileType);
              } else {
                console.error(`${fileType} download failed:`, downloadResult);
              }
            } catch (error) {
              console.error(`Error downloading ${fileType}:`, error);
            }
          };

        function groupTaxValues(dataTax: any[] | undefined) {
            if (dataTax === undefined) {
                return [];
            }

            const groupedTaxValues = dataTax.reduce((acc: { [x: string]: { taxName: any; taxId: any; amount: any; }; }, curr: { items: any[]; }) => {
                curr.items.forEach((item: { taxId: any; amount: any; taxName: any; }) => {
                    const key = item.taxId;
                    if (acc[key]) {
                        acc[key].amount += item.amount;
                    } else {
                        acc[key] = {
                            taxName: item.taxName,
                            taxId: key,
                            amount: item.amount
                        };
                    }
                });
                return acc;
            }, {});

            return Object.values(groupedTaxValues);
        }

        useEffect(() => {
            handleGetDetailInvoice()
            handleGetPrintInvoice()
            // handleGetInfoCompany()
        }, []);
        function RenderItem({ item }: any) {
            return (
                <View style={styles.row}>
                    <View style={{ flexDirection: 'row', marginVertical: scaleHeight(15) }}>
                        <View style={styles.cell}>
                            <Text style={styles.sanPhamText}>{item.item?.product?.name}</Text>
                        </View>
                        <Text style={styles.cellUnitPrice}>{formatVND(formatCurrency(commasToDots(item.item?.unitPrice)))}</Text>
                        <Text style={styles.cellAmount}>
                            {item.item?.quantity} <Text style={{ fontSize: fontSize.size12 }}>{item?.item?.uom?.name}</Text>
                        </Text>
                        <Text style={styles.cellMoney}>
                            {formatVND(formatCurrency(commasToDots(calculateTotalUnitPrice(item.item?.unitPrice, item.item?.quantity))))}
                        </Text>
                    </View>
                </View>
            );
        }

        // );
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
                            {vendorStore?.companyInfo?.logo == '' ? (
                                <ImageBackground
                                    style={{ width: scaleWidth(80), height: scaleHeight(80) }}
                                    imageStyle={{
                                        borderRadius: 20,
                                    }}
                                    source={require("../../../../assets/Images/no_images.png")}>
                                </ImageBackground>

                            ) : (
                                <FastImage
                                    style={{
                                        width: scaleWidth(80),
                                        height: scaleHeight(80),
                                    }}
                                    resizeMode='contain'
                                    source={{
                                        uri: vendorStore?.companyInfo?.logo,
                                        cache: FastImage.cacheControl.immutable,
                                    }}
                                    defaultSource={require("../../../../assets/Images/no_images.png")}
                                />
                            )}
                            <View style={styles.infoContainer}>
                                <Text style={styles.companyName}>{vendorStore?.companyInfo?.name}</Text>
                                {/* <Text style={styles.textInfo} >www.apodio.com.vn</Text> */}
                                <Text style={styles.textInfo}>{vendorStore?.companyInfo?.phone}</Text>
                                <Text style={styles.textInfo}>
                                    {vendorStore?.companyInfo?.address ? vendorStore?.companyInfo?.address + " " : ""}
                                    {vendorStore?.companyInfo?.ward ? vendorStore?.companyInfo?.ward + ", " : ""}
                                    {vendorStore?.companyInfo?.district ? vendorStore?.companyInfo?.district + ", " : ""}
                                    {vendorStore?.companyInfo?.city ? vendorStore?.companyInfo?.city : ""}
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
                                renderItem={item => <RenderItem item={item} />}
                                scrollEnabled={false}
                                // extraData={data.invoiceLines}
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
                                value={formatVND(formatCurrency(commasToDots(calculateTotalPrice(data.invoiceLines))))}
                            />
                            <ProductAttribute
                                labelTx="dashboard.promotions"
                                value={formatVND(formatCurrency(commasToDots(calculateTotalDiscount(data.invoiceLines))))}
                            />
                            {groupTaxValues(data.computeTaxInfo?.taxLines).map((item: any) => (

                                <ProductAttribute
                                    label={item.taxName}
                                    value={formatVND(formatCurrency(commasToDots(item.amount)))}
                                />

                            ))}
                            {/* <ProductAttribute
                                labelTx="printInvoiceScreen.amountUntaxed"
                                value={formatCurrency(data.amountUntaxed)}
                            /> */}
                            <ProductAttribute
                                labelTx="printInvoiceScreen.totalPrice"
                                value={formatVND(formatCurrency(commasToDots(data.amountTotal)))}
                            />
                        </View>
                    </View>
                </ScrollView>
                <Button
                    tx={"printInvoiceScreen.printInvoice"}
                    style={styles.viewButton}
                    textStyle={styles.textButton}
                    
                    onPress={() => {
                        console.log('firstzzz', dataPrintInvoice?.url)
                        
                        downloadAndPrintFile(dataPrintInvoice?.url, 'pdf')
                        // downloadAndPrintFile(
                        //     'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg',
                        //     'image',
                        //   )
                    }
                    }
                />
            </View>
        );
    },
);
