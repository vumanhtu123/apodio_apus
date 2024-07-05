import { View, TouchableOpacity, FlatList } from 'react-native'
import React, { FC } from 'react'
import { ScreenStackProps } from 'react-native-screens'
import { NavigatorParamList } from '../../../../navigators'
import { StackScreenProps } from '@react-navigation/stack'
import { observer } from 'mobx-react-lite'
import { Header, Text } from '../../../../components'
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../../theme'
import { Images } from '../../../../../assets'
import { Styles } from './styles'

export const MoneyManagementScreen: FC<StackScreenProps<NavigatorParamList, "moneyManagement">> = observer(
    function moneyManagementScreen(props) {
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
                    >
                        <Images.ic_ArrowsLeftRight />
                        <Text tx='revenueAndExpenditure.transferMoney' style={{ marginLeft: scaleWidth(6) }} />
                    </TouchableOpacity>
                </View>

                <FlatList

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
