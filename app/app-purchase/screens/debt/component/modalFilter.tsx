
import { TouchableOpacity, View, } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import Modal from 'react-native-modal'
import { Styles } from '../screen/styles'
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../theme'
import { Text } from '../../../../components'
import { Svgs } from '../../../../../assets/svgs'
import { translate } from '../../../../i18n'


interface propsModal {
    isVisible?: boolean,
    setIsVisible?: () => void,
    sortMustPay: (value: string) => void,
    sortTotalDebt: (value: string) => void

}

export const ModalFilter: FC<propsModal> = ({ isVisible, setIsVisible, sortTotalDebt, sortMustPay }) => {
    // const [selectUpOrDow, setSelectUpOrDow] = useState("Dow")
    const [selectSortMustPay, setSelectSortMustPay] = useState(0)
    const [selectTotalDebt, setSelectTotalDebt] = useState(0)

    const selectUpOrDow = useRef('Dow')
    const totalDebt = useRef('Dow')



    const sendKeySortMustPay = () => {
        sortMustPay(selectUpOrDow.current)
    }
    const sendKeySortTotalDebt = () => {
        sortTotalDebt(totalDebt.current)
    }

    console.log('value select', selectUpOrDow.current);
    const dataUpOrDow = [
        {
            name: translate('debtScreen.dow'),
            sort: 'Dow'

        },
        {
            name: translate('debtScreen.up'),
            sort: 'Up'

        },

    ]

    return (

        <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={750}
            isVisible={isVisible}
            style={{ justifyContent: 'flex-end', margin: 0 }}
            avoidKeyboard={true}

        >
            <View style={Styles.modalView}>

                <View style={{
                    width: scaleWidth(68),
                    height: scaleHeight(5),
                    backgroundColor: colors.veryLightGrey1,
                    borderRadius: 10,
                    marginBottom: scaleWidth(25),
                    alignSelf: 'center'
                }} />

                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity>
                        <Text tx='inforMerchant.Arrange'
                            style={{ fontWeight: '700', fontSize: fontSize.size14 }}
                        ></Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={setIsVisible}
                    >
                        <Text tx='common.cancel'
                            style={{ fontWeight: '700', fontSize: fontSize.size14, color: colors.palette.radicalRed }}
                        ></Text>
                    </TouchableOpacity>

                </View>

                <View style={Styles.horizontalLine} />

                {

                }
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Text tx='debtScreen.theMoneyHaveToPay'></Text>
                    </View>
                    <View style={Styles.styleBtnSwipe}>
                        {
                            dataUpOrDow.map((item, index) => {
                                return (
                                    <TouchableOpacity style={[Styles.styBtnUp, { backgroundColor: index == selectSortMustPay ? colors.white : colors.lavender }]}
                                        onPress={() => {
                                            // setSelectUpOrDow('giảm')
                                            setSelectSortMustPay(index)
                                            console.log('select', selectUpOrDow.current);

                                            selectUpOrDow.current = item.sort
                                            sendKeySortMustPay()
                                        }}
                                    >
                                        <Text style={{ fontSize: fontSize.size12, padding: 7 }}

                                        >{item.name}</Text>

                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>

                <View style={Styles.horizontalLine} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                        <Text tx='debtScreen.totalDebt'></Text>
                    </View>
                    <View style={Styles.styleBtnSwipe}>

                        {
                            dataUpOrDow.map((item, index) => {
                                return (
                                    <TouchableOpacity style={[Styles.styBtnUp, { backgroundColor: index == selectTotalDebt ? colors.white : colors.lavender }]}
                                        onPress={() => {
                                            // setSelectUpOrDow('giảm')
                                            setSelectTotalDebt(index)
                                            console.log('select', selectUpOrDow.current);

                                            totalDebt.current = item.sort
                                            sendKeySortTotalDebt()
                                        }}
                                    >
                                        <Text style={{ fontSize: fontSize.size12, padding: 7 }}

                                        >{item.name}</Text>

                                    </TouchableOpacity>
                                )
                            })
                        }


                    </View>
                </View>
            </View>

        </Modal>
    )
}
