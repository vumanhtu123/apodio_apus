import { TouchableOpacity, View, } from 'react-native'
import React, { FC, useState } from 'react'
import Modal from 'react-native-modal'
import { Styles } from '../screen/styles'
import { colors, fontSize, margin, scaleHeight, scaleWidth } from '../../../theme'
import { Text } from '../../../components'
import { Images } from '../../../../assets'
import { commasToDots, formatCurrency } from '../../../utils/validate'
import { Controller } from 'react-hook-form'

interface propsModal {
    isVisible?: boolean,
    setIsVisible?: () => void
}

export const ModalPay: FC<propsModal> = ({ isVisible, setIsVisible }) => {
    const [selectUpOrDow, setSelectUpOrDow] = useState("Up")
    const [totalDebt, setTotalDebt] = useState("Dow")

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
            <View style={[Styles.modalView, { borderRadius: 0 }]}>

                {/* <View style={{
                    width: scaleWidth(68),
                    height: scaleHeight(5),
                    backgroundColor: '#C7C7C7',
                    borderRadius: 10,
                    marginBottom: scaleWidth(25),
                    alignSelf: 'center'
                }} /> */}

                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity>
                        <Text tx='debtScreen.pay'
                            style={{ fontWeight: '700', fontSize: fontSize.size14 }}
                        ></Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={setIsVisible}
                    >
                        <Images.ic_x />
                    </TouchableOpacity>

                </View>

                <Text style={{
                    textAlign: 'center',
                    fontSize: fontSize.size20,
                    color: colors.palette.radicalRed,
                    fontWeight: '600'
                }} >
                    {formatCurrency(commasToDots("20000"))}
                </Text>

                {/* <Controller
                    control={ }
                    name='moneyPay'

                /> */}

            </View>

        </Modal>
    )
}
