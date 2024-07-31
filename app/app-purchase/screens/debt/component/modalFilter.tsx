
import { TouchableOpacity, View, } from 'react-native'
import React, { FC, useState } from 'react'
import Modal from 'react-native-modal'
import { Styles } from '../screen/styles'
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../theme'
import { Text } from '../../../../components'
import { Svgs } from '../../../../../assets/svgs'


interface propsModal {
    isVisible?: boolean,
    setIsVisible?: () => void
}

export const ModalFilter: FC<propsModal> = ({ isVisible, setIsVisible }) => {
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
            <View style={Styles.modalView}>

                <View style={{
                    width: scaleWidth(68),
                    height: scaleHeight(5),
                    backgroundColor: '#C7C7C7',
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

                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text tx='debtScreen.nameProviders'></Text>
                    <Svgs.ic_tick />
                </TouchableOpacity>

                <View style={Styles.horizontalLine} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Text tx='debtScreen.theMoneyHaveToPay'></Text>
                    </View>
                    <View style={Styles.styleBtnSwipe}>

                        <TouchableOpacity style={[Styles.styBtnUp, { backgroundColor: selectUpOrDow == 'Dow' ? '#FFF' : '#EDEDEE' }]}
                            onPress={() => setSelectUpOrDow('Dow')}
                        >
                            <Text style={{ fontSize: fontSize.size12, padding: 7 }}
                                tx='debtScreen.dow'
                            >

                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[Styles.styBtnUp, { backgroundColor: selectUpOrDow == 'Up' ? '#FFF' : "#EDEDEE" }]}
                            onPress={() => setSelectUpOrDow('Up')}
                        >
                            <Text style={{ fontSize: fontSize.size12, padding: 7 }}
                                tx='debtScreen.up'
                            >

                            </Text>
                        </TouchableOpacity>



                    </View>
                </View>

                <View style={Styles.horizontalLine} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                        <Text tx='debtScreen.totalDebt'></Text>
                    </View>
                    <View style={Styles.styleBtnSwipe}>

                        <TouchableOpacity style={[Styles.styBtnUp, { backgroundColor: totalDebt == 'Dow' ? '#FFF' : '#EDEDEE' }]}
                            onPress={() => setTotalDebt('Dow')}
                        >
                            <Text style={{ fontSize: fontSize.size12, padding: 7 }}
                                tx='debtScreen.dow'
                            >
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[Styles.styBtnUp, { backgroundColor: totalDebt == 'Up' ? '#FFF' : "#EDEDEE" }]}
                            onPress={() => setTotalDebt('Up')}
                        >
                            <Text style={{ fontSize: fontSize.size12, padding: 7 }}
                                tx='debtScreen.up'
                            >
                            </Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </View>

        </Modal>
    )
}
