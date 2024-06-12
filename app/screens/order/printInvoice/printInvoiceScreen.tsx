/* eslint-disable react-native/no-inline-styles */
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import {
    FlatList,
    TouchableOpacity,
    View
} from 'react-native';
import { styles } from './styles';

import { Images } from '../../../../assets/index';
import { Header } from '../../../components/header/header';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '../../../components';
import { fontSize, scaleHeight, scaleWidth } from '../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStores } from '../../../models';
import { formatCurrency } from '../../../utils/validate';
import ProductAttribute from '../../product/component/productAttribute';
import FastImage from 'react-native-fast-image';

export const PrintInvoiceScreen: FC = observer(
    function PrintInvoiceScreen(props) {
        const navigation = useNavigation();
        const { orderStore, vendorStore } = useStores();
        const [data, setData] = useState<any>([]);
        const [dataInfoCompany, setDataInfoCompany] = useState<any>([]);

        const handleGetDetailInvoice = async () => {
            try {
                const response = await orderStore.getDetailInvoice(328);
                if (response && response.kind === "ok") {
                    const data = response.response.data;
                    console.log('dataDetailInvoice', data)
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
        useEffect(() => {
            handleGetDetailInvoice()
            handleGetInfoCompany()
        }, []);
        useEffect(()=>{
            console.log('first',dataInfoCompany)
        })
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
                    <Text style={styles.cellMoney}>{formatCurrency(item.amountTotal)}</Text>
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
        const dataPrice = [
            { label: 'Cộng tiền hàng', value: 90000000 },
            { label: 'Tiền thuế (VAT 8%)', value: 7200000 },
            { label: 'Tiền thuế (VAT 10%)', value: 9000000 },
            { label: 'Tổng tiền thanh toán', value: 73800000, highlight: true },
        ];
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
                            <FastImage
                                    style={{
                                        width: scaleWidth(80),
                                        height: scaleHeight(80),
                                    }}
                                    source={{
                                        uri: dataInfoCompany.logo,
                                        cache: FastImage.cacheControl.immutable,
                                    }}
                                    defaultSource={require("../../../../assets/Images/no_images.png")}
                                />
                            <View style={styles.infoContainer}>
                                <Text style={styles.companyName}>{dataInfoCompany.name}</Text>
                                <Text style={styles.textInfo} >www.apodio.com.vn</Text>
                                <Text style={styles.textInfo}>{dataInfoCompany.phone}</Text>
                                <Text style={styles.textInfo}>{dataInfoCompany.address}</Text>
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
                                    {/* { ` ${data.deliveryAddress?.address}, ${data.deliveryAddress?.wardName}, ${data.deliveryAddress?.districtName}, ${data.deliveryAddress?.cityName}`} */}
                                    {data.deliveryAddress?.address ? ` ${data.deliveryAddress?.address}, ${data.deliveryAddress?.wardName}, ${data.deliveryAddress?.districtName}, ${data.deliveryAddress?.cityName}` : null}
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
                                value={formatCurrency(data.amountUntaxed)}
                            />
                            {data.computeTaxInfo?.taxLines?.[0]?.items?.map((item, index) => (
                                <ProductAttribute
                                    key={index}
                                    label={item.taxName}
                                    value={formatCurrency(item.amount)}
                                />
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
                // onPress={}
                />
            </View>
        );
    },
);
