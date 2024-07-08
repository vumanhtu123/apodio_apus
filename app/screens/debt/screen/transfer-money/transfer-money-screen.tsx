import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { NavigatorParamList } from '../../../../navigators'
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../../theme'
import { Header, Text } from '../../../../components'
import { Color } from '../../../../components/dialog-notification/service'
import { InputSelect } from '../../../../components/input-select/inputSelect'
import { Images } from '../../../../../assets'
import { observer } from 'mobx-react-lite'
import en from '../../../../i18n/en'


export const TransferMoneyScreen: FC<StackScreenProps<NavigatorParamList, 'transferMoneyScreen'>> = observer(
    function transferMoneyScreen(props) {

        const [selectCustomerType, setSelectCustomerType] = useState({ label: "" })

        const dataDepositSource = [
            { id: 1, title: en.revenueAndExpenditure.electronicWallet },
            { id: 2, title: en.revenueAndExpenditure.cash },
            { id: 3, title: en.revenueAndExpenditure.bank }
        ]
        const arrDepositSource = dataDepositSource.map((item) => {
            return {
                id: item.id, label: item.title
            }
        })

        return (
            <View style={Styles.Root}>
                <Header
                    LeftIcon={Images.back}
                    headerTx='revenueAndExpenditure.transferMoney'
                    style={{ height: scaleHeight(52) }}
                    onLeftPress={() => props.navigation.goBack()}

                />

                <View style={Styles.Main}>
                    <InputSelect
                        titleTx="revenueAndExpenditure.depositSource"
                        hintTx="revenueAndExpenditure.selectDepositSource"
                        arrData={arrDepositSource}
                        required
                        dataDefault={selectCustomerType.label}
                        onPressChoice={(item: any) => {
                            setSelectCustomerType(item)
                        }}
                        styleView={{ backgroundColor: colors.palette.aliceBlue, marginBottom: margin.margin_6 }}
                    />
                    <View
                        style={{ flexDirection: 'row', marginBottom: margin.margin_20 }}
                    >
                        <TouchableOpacity
                            style={Styles.btnSelect}
                        >
                            <Text tx='revenueAndExpenditure.cash' style={Styles.textSize14} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[Styles.btnSelect, { marginHorizontal: scaleHeight(6) }]}
                        >
                            <Text tx='revenueAndExpenditure.electronicWallet' style={Styles.textSize14} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Styles.btnSelect}
                        >
                            <Text tx='revenueAndExpenditure.bank' style={Styles.textSize14} />
                        </TouchableOpacity>
                    </View>


                    <InputSelect
                        titleTx="revenueAndExpenditure.sourceOfMoneyReceived"
                        hintTx="revenueAndExpenditure.selectSourceOfMoneyReceived"
                        arrData={arrDepositSource}
                        required
                        dataDefault={selectCustomerType.label}
                        onPressChoice={(item: any) => {
                            setSelectCustomerType(item)
                        }}
                        styleView={{ backgroundColor: colors.palette.aliceBlue, marginBottom: margin.margin_6 }}
                    />
                    <View
                        style={{ flexDirection: 'row', marginBottom: margin.margin_20 }}
                    >
                        <TouchableOpacity
                            style={Styles.btnSelect}
                        >
                            <Text tx='revenueAndExpenditure.cash' style={Styles.textSize14} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[Styles.btnSelect, { marginHorizontal: scaleHeight(6) }]}
                        >
                            <Text tx='revenueAndExpenditure.electronicWallet' style={Styles.textSize14} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Styles.btnSelect}
                        >
                            <Text tx='revenueAndExpenditure.bank' style={Styles.textSize14} />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={Styles.Bottom}>
                    <TouchableOpacity
                        style={[Styles.BtnBottom, { marginRight: scaleWidth(12) }]}
                    >
                        <Text tx="ImprotGoodsBook.back" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[Styles.BtnBottom, { backgroundColor: colors.palette.navyBlue }]}
                    >
                        <Text tx="suppliers.update" style={Styles.styleText} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

)

const Styles = StyleSheet.create({
    Root: {
        flex: 1,
        backgroundColor: '#FFF',

    },
    Main: {
        flex: 1,
        padding: padding.padding_16
    },
    Bottom: {
        padding: padding.padding_16,
        flexDirection: 'row',

    },
    BtnBottom: {
        flex: 1,
        padding: padding.padding_12,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: scaleWidth(8)

    },
    styleText: {
        fontSize: fontSize.size14,
        fontWeight: '600',
        color: '#FFF'
    },
    textSize14: {
        color: '#747475',
        fontWeight: '400',
        fontSize: fontSize.size14
    },
    btnSelect: {
        borderRadius: scaleWidth(8),
        backgroundColor: colors.palette.aliceBlue,
        paddingVertical: padding.padding_8,
        paddingHorizontal:
            padding.padding_12
    },

})  