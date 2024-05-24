
import { NavigatorParamList } from "../../../navigators";
import { FC } from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Header } from "../../../components";
import { Images } from "../../../../assets";
import { scaleHeight, scaleWidth } from "../../../theme";
import { Text } from "../../../components";

export const InforAccount: FC<StackScreenProps<NavigatorParamList, "inforAccount">> = observer(

    function inforAccount(props) {

        const MerchantInfo = ({ label, value }) => {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 9,
                    }}>
                    <Text style={{ fontSize: 14, color: '#84888D' }}>{label}</Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 14,
                            color: '#323232',
                            maxWidth: 200,
                            fontFamily: 'Arial',
                            fontWeight: '700',
                        }}>
                        {value}
                    </Text>
                </View>
            );
        };

        const data = {
            inforMer: {
                merchantType: 'Công ty',
                //   businessSector: 'Nhà hàng',
                businessLicens: '00482276',
                phoneNumber: '0123456789',
                merchantName: 'Cong Ty Thanh Long',
                merChantCode: 'MC0833',
                merChanName: 'Merchant',
                documentType: 'Hộ chiếu',
                documentNumber: '004988276511',
                dateIused: '12/09/1994',
                //   dateEnd: '12/09/2023',
                isudePlance: 'Hà Nội',
                province: 'Hà Nội',
                district: 'Hoàn Kiếm',
                precinct: 'Hàng Bài',
                addRess: '49 Hàng Bài',
                gener: 'Nam',
                email: 'info@company.com',
            },
            ifnorBank: {
                bankName: 'Techcombank',
                bankNumber: '19029887983298',
                bankNameAccount: 'Công ty Thanh Long',
                branch: 'Hà Nội',
            }
        }
        return (
            <View style={{ flex: 1 }}>
                <Header
                    headerTx="inforMerchant.InforMerChant"
                    style={{ height: 52 }}
                    LeftIcon={Images.back}
                    onLeftPress={() => props.navigation.goBack()}

                />
                <View style={{ flex: 1, paddingHorizontal: scaleWidth(16), paddingVertical: scaleWidth(20), }}>
                    <View style={styles.merchantInfor}>
                        <Text style={styles.text}>Merchant Information</Text>
                        <View style={styles.line} />
                        <View style={{ marginHorizontal: 24, marginTop: 9 }}>


                            <MerchantInfo
                                label={'Mã merchant'}
                                value={data.inforMer.merChantCode}
                            />

                            <MerchantInfo
                                label={'Tỉnh/Thành phố'}
                                value={data.inforMer.province}
                            />

                            <MerchantInfo label={'Quận/Huyện'} value={data.inforMer.district} />
                            <MerchantInfo label={'Phường/Xã'} value={data.inforMer.precinct} />
                            <MerchantInfo label={'Địa chỉ'} value={data.inforMer.addRess} />
                            <MerchantInfo label={'Giới tính:'} value={data.inforMer.gener} />
                            <MerchantInfo
                                label={'Email'}
                                value={data.inforMer.email}
                            />
                            <MerchantInfo
                                label={'Số điện thoại'}
                                value={data.inforMer.phoneNumber}
                            />
                        </View>
                    </View>
                    <View style={[styles.merchantInfor, {marginTop:scaleHeight(20)}]}>
                    <Text style={styles.text}>Thông tin ngân hàng</Text>
                    <View style={styles.line} />
                    <View style={{ marginHorizontal: 24, marginTop: 9 }}>
                        <MerchantInfo
                            label={'Tên ngân hàng'}
                            value={data.ifnorBank.bankName}
                        />
                        <MerchantInfo
                            label={'Số tài khoản'}
                            value={data.ifnorBank.bankNumber}
                        />
                        <MerchantInfo
                            label={'Tên tài khoản ngân hàng'}
                            value={data.ifnorBank.bankNameAccount}
                        />
                        <MerchantInfo label={'Chi nhánh'} value={data.ifnorBank.branch} />
                    </View>
                </View>
                </View>
                
            </View>
        )
    }

)

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: -10,
    },
    body: {
        marginHorizontal: 16,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#F2F2F2',
        marginLeft: 31,
        marginRight: 15,
        marginTop: 16,
    },
    item: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
    },
    leftContent: {
        flexDirection: 'row',
    },
    main: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    merchantInfor: {
        backgroundColor: 'white',
        // marginHorizontal: 16,
        borderRadius: 18,
        // marginTop: 20,
        // marginBottom: 20,
        paddingBottom: 20,
    },
    text: {
        fontSize: 16,
        color: '#323232',
        paddingTop: 9,
        paddingLeft: 24,
        fontFamily: 'Arial',
        fontWeight: '700',
    },
    line: {
        height: 1,
        backgroundColor: '#E7EFFF',
        marginTop: 9,
    },
    image: {
        width: width / 2 - 60,
        height: 82,
        borderRadius: 8,
    },

    label: {
        fontSize: 14,
        color: '#84888D',
        alignSelf: 'center',
    },
});

export default styles
