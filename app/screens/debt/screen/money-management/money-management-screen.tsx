import { View, TouchableOpacity, FlatList } from 'react-native'
import React, { FC } from 'react'
import { ScreenStackProps } from 'react-native-screens'
import { NavigatorParamList } from '../../../../navigators'
import { StackScreenProps } from '@react-navigation/stack'
import { observer } from 'mobx-react-lite'
import { Header, Text } from '../../../../components'
import { colors, fontSize, margin, padding, palette, scaleHeight, scaleWidth } from '../../../../theme'
import { Images } from '../../../../../assets'
import { Styles } from './styles'
import { commasToDots, formatCurrency, formatVND } from '../../../../utils/validate'
import ItemListManagement from './item-list-money-management'
import ItemListMoneyManagement from './item-list-money-management'

export const MoneyManagementScreen: FC<StackScreenProps<NavigatorParamList, "moneyManagement">> = observer(
    function moneyManagementScreen(props) {

        const dataFake = [
            {
                id: 1,
                kind: "Tiền mặt",
                money: -100000,
            },
            {
                id: 2,
                kind: "Ví điện tử",
                money: 0,
            },
            {
                id: 3,
                kind: "Ngân hàng",
                money: 0,
            },
            {
                id: 4,
                kind: "Ví của hàng",
                money: 0,
            }
        ]
        return (
            <View style={{ flex: 1 }}>
                <Header
                    LeftIcon={Images.back}
                    headerTx='revenueAndExpenditure.moneyManagement'
                    style={{ height: scaleHeight(52) }}

                />
                <View
                    style={Styles.boxHeader}
                >
                    <TouchableOpacity
                        style={Styles.btnTransferMoney}
                        onPress={() => props.navigation.navigate('transferMoneyScreen')}
                    >
                        <Images.ic_ArrowsLeftRight />
                        <Text tx='revenueAndExpenditure.transferMoney' style={{ marginLeft: scaleWidth(6) }} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={dataFake}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <ItemListMoneyManagement data={dataFake} index={index} item={item} />}
                />
                <View style={{ alignItems: 'flex-end', margin: scaleWidth(16) }}>
                    <TouchableOpacity
                        style={Styles.btnAddFunds}
                    >
                        <Images.icon_plus width={scaleWidth(16)} height={scaleHeight(16)} />
                        <Text
                            tx='revenueAndExpenditure.addFunds'
                            style={{ fontSize: fontSize.size14, color: colors.palette.white }}
                        />
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
)
