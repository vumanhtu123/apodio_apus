/* eslint-disable react-native/no-inline-styles */
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
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
import { scaleHeight, scaleWidth } from '../../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export const PrintInvoiceScreen: FC = observer(
    function PrintInvoiceScreen(props) {
        const navigation = useNavigation();
        const data = [
            {
                sanPham: "Gạch 1566CB502",
                size: "60x60",
                donGia: 28000000,
                soLuong: 1,
                thanhTien: 28000000,
            },
            {
                sanPham: "Gạch 1566CB503 ",
                size: "60x60",
                donGia: 28000000,
                soLuong: 1,
                thanhTien: 28000000,
            },
            {
                sanPham: "Gạch 1566SG501 ",
                size: "60x60",
                donGia: 28000000,
                soLuong: 1,
                thanhTien: 28000000,
            },
        ];
        const Item = ({ sanPham, donGia, soLuong, thanhTien }: any) => (
            <View style={styles.row}>
                <View style={{ flexDirection: 'row', marginVertical: scaleHeight(15) }}>
                    <View style={styles.cell}>
                        <Text style={styles.sanPhamText}>{sanPham}</Text>
                        <Text style={styles.sizeText}>60x60</Text>
                    </View>
                    <Text style={styles.cellUnitPrice}>{donGia}</Text>
                    <Text style={styles.cellAmount}>{soLuong}</Text>
                    <Text style={styles.cellMoney}>{thanhTien}</Text>
                </View>
            </View>
        );
        const renderItem = ({ item }: any) => (
            <Item
                sanPham={item.sanPham}
                donGia={item.donGia}
                soLuong={item.soLuong}
                thanhTien={item.thanhTien}
            />
        );
        const HeaderList = () => (
            <View style={styles.headerRow}>
                <View style={{ flexDirection: 'row', marginBottom: scaleHeight(15) }}>
                    <Text style={styles.cellProductHeader}>Sản phẩm</Text>
                    <Text style={styles.cellUnitPriceHeader}>Đơn giá</Text>
                    <Text style={styles.cellAmountHeader}>Số lượng</Text>
                    <Text style={styles.cellMoneyHeader}>Thành tiền</Text>
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
                            <Images.icon_QRCode width={80} height={80} />
                            <View style={styles.infoContainer}>
                                <Text style={styles.companyName}>Công ty Cổ phần Gốm sứ CTH - APODIO</Text>
                                <Text style={styles.textInfo} >www.apodio.com.vn</Text>
                                <Text style={styles.textInfo}>(+84) 2103 722 868</Text>
                                <Text style={styles.textInfo}>467 Nguyễn Đức Thuận, Thị Trấn Trâu Quỳ, Gia Lâm, Hà Nội</Text>
                            </View>
                        </View>
                        <View style={styles.viewLine} />
                        <View>
                            <View style={{ marginBottom: scaleHeight(20) }}>
                                <Text style={styles.invoiceName}>Hóa đơn #JQT02AP</Text>
                                <Text style={styles.invoiceTime}>09:07 21/04/2023</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: scaleHeight(12) }}>
                                <Text tx='printInvoiceScreen.name' style={styles.companyName} />
                                <Text style={styles.textInfo}> Công ty TNHH Mặt Trời Hồng </Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: scaleHeight(12) }}>
                                <Text tx='printInvoiceScreen.address' style={styles.companyName} />
                                <Text style={styles.textInfo}> 98 Hai Bà Trưng, Hoàn Kiếm, Hà Nội</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text tx='printInvoiceScreen.phone' style={styles.companyName} />
                                <Text style={styles.textInfo}> 02477651198</Text>
                            </View>
                        </View>
                        <View style={styles.viewLine} />
                        <View>
                            <HeaderList />
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                scrollEnabled={false}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={{ marginTop: scaleHeight(15) }}>
                            {dataPrice.map((item, index) => (
                                <View key={index} style={styles.rowPrice}>
                                    <Text style={styles.label}>{item.label}</Text>
                                    <Text style={[styles.value, item.highlight && styles.highlight]}>
                                        {item.value.toLocaleString()}
                                    </Text>
                                </View>
                            ))}
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
