import { observer } from "mobx-react-lite";
import React from "react";
import { FC } from "react";
import { ImageBackground, StyleSheet, View, Image, ScrollView, Dimensions} from "react-native";
import { Styles } from "../style";
import { Header, Text } from "../../../../components";
import { Images } from "../../../../../assets";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

const { width } = Dimensions.get('screen')
export const TransactionHistoryDetial: FC = observer(

    function transactionDetail(props) {

        const dataFake = [
            {
                id: '1232142141u516',
                transactionType: 'Thanh toán',
                merchanPhone: '099999999',
                merchanName: "Le Phong",
                status: true,
                time: "12:09:04 02/01/2022",
                amount: '-11.000.000',
                fee: '-1.000.000',
                totalAmount: '-12.000.000',
            }
        ]

        const DataItem = ({ title, value, currency, image, color, titleFw, titleColor }: any) => {
            return (
                <View style={Styles.viewData}>
                    <Text style={[Styles.textTitle, { fontWeight: titleFw ? titleFw : '400', color: titleColor ? titleColor : '#84888D' }]}
                        tx={title}
                    />

                    {image ? (
                        <View style={Styles.rowStaff}>
                            <Image
                                source={{ uri: `data:image/png;base64,${image}` }}
                                style={{ width: 30, height: 30, marginTop: 5 }}
                            />
                            <Text numberOfLines={2} style={Styles.textResult}>
                                {value} {currency}
                            </Text>
                        </View>
                    ) : (
                        <Text numberOfLines={2} style={[Styles.textResult, { color: color }]}>
                            {value} {currency}
                        </Text>
                    )}
                </View>
            );
        }

        return (
            <View style={Styles.main}>
                <Header
                    headerTx="tranSacTionHistory.transactionHistoryDetail"
                    LeftIcon={Images.back}
                    style={{ height: scaleHeight(52), zIndex: 2 }}
                    onLeftPress={() => props.navigation.goBack()}                    
                />
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                    colors={[colors.palette.navyBlue, colors.palette.malibu]}
                    style={{ height: scaleHeight(250), width: width, position: 'absolute' }}
                ></LinearGradient>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image
                        source={require('../../../../../assets/Images/img_bgr_transactionDetail.png')}
                        style={[{ width: width, alignSelf: 'center', zIndex: 1 }]}
                    >
                    </Image>


                    <View style={{ width: width, position: 'absolute', zIndex: 2, alignItems: 'center' }}>
                        <View style={Styles.flexRowNoJustyfy}>
                            <Images.ic_billPay />
                            <View style={{ width: '81%', marginLeft: scaleWidth(6), justifyContent: 'space-evenly', }}>
                                <Text tx="tranSacTionHistory.paymentOder" />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={Styles.flexRow}>
                                        <Text style={{ marginRight: 5 }}>
                                            ID: 200113566777
                                        </Text>
                                        <Images.ic_coppyID />
                                    </View>
                                    <Text style={{ color: '#ED1F43', }}>
                                        -12.000.000đ
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '91.5%', paddingVertical: scaleWidth(8), paddingHorizontal: scaleWidth(16), backgroundColor: '#EFF8FF', justifyContent: 'space-between', marginVertical: scaleHeight(16), }}>

                            <Text tx="tranSacTionHistory.transactionHistoryDetail"
                                style={{ color: '#0078D4', fontWeight: '700', textTransform: 'uppercase' }}
                            />


                        </View>

                        <View style={{ width: '91.5%' }}>
                            <DataItem
                                title="tranSacTionHistory.transactionType"
                                value={dataFake[0].transactionType}
                                color='#242424'

                            />
                            <DataItem
                                title="tranSacTionHistory.merchantPhone"
                                value={dataFake[0].merchanPhone}
                                color='#242424'
                            />
                            <DataItem
                                title="tranSacTionHistory.merchantName"
                                value={dataFake[0].merchanName}
                                color='#242424'
                            />
                            <DataItem
                                title="tranSacTionHistory.status"
                                value={dataFake[0].merchanName}
                                color='#242424'
                            />
                            <DataItem
                                title="tranSacTionHistory.transactionTime"
                                value={dataFake[0].time}
                                color='#242424'
                            />
                        </View>


                        <View style={{ width: '91.5%', paddingVertical: scaleWidth(8), paddingHorizontal: scaleWidth(16), backgroundColor: '#EFF8FF', justifyContent: 'space-between', marginVertical: scaleHeight(16), }}>

                            <Text tx="tranSacTionHistory.paymentDetail"
                                style={{ color: '#0078D4', fontWeight: '700', textTransform: 'uppercase' }}
                            />

                        </View>

                        <View style={{ width: '91.5%' }}>
                            <DataItem
                                title="tranSacTionHistory.amount"
                                value={dataFake[0].amount}
                                color='#ED1F43'
                            />
                            <DataItem
                                title="tranSacTionHistory.fee"
                                value={dataFake[0].fee}
                                color='#ED1F43'
                            />
                            <DataItem
                                title="tranSacTionHistory.totalAmount"
                                value={dataFake[0].totalAmount}
                                color='#ED1F43'
                            />

                        </View>
                    </View>


                </ScrollView>




            </View>
        )
    }
)

