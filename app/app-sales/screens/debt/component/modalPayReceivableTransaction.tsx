import { TouchableOpacity, View, } from 'react-native'
import React, { FC, useState } from 'react'
import Modal from 'react-native-modal'
import { Styles } from '../screen/styles'
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../theme'
import { Text, TextField } from '../../../../components'
import { Svgs } from '../../../../../assets/svgs'
import { commasToDots, formatCurrency, formatVND } from '../../../utils/validate'
import { Controller, useForm } from 'react-hook-form'
import { translate } from '../../../../i18n'
import { InputSelect } from '../../../../components/input-select/inputSelect'
import en from '../../../../i18n/en'

interface propsModal {
    isVisible?: boolean,
    setIsVisible?: any,
}


export const ModalPayReceivableTransaction: FC<propsModal> = ({ isVisible, setIsVisible }) => {
    const [selectUpOrDow, setSelectUpOrDow] = useState("Up")
    const [totalDebt, setTotalDebt] = useState("Dow")
    const [selectCustomerAmount, setSelectCustomerAmount] = useState({ label: "" })

    // console.log('KeyToPass', keyToPass);


    const { control, formState: { errors } } = useForm({
        mode: 'all'
    })

    const dataInputSelect = [
        {
            id: 1,
            label: translate("debtScreen.amount")
        },
        {
            id: 2,
            label: translate("order.BANK_TRANSFER")
        }
    ]

    const myDataSelectAmount = dataInputSelect.map((item) => {
        return { label: item.label, id: item.id }
    })

    const onPressConfirm = () => {

        setIsVisible(!isVisible)

    }
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


                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity>
                        <Text tx={'debtScreen.payDebt'}
                            style={{ fontWeight: '700', fontSize: fontSize.size14 }}
                        ></Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={setIsVisible}
                    >
                        <Svgs.ic_x />
                    </TouchableOpacity>

                </View>

                <Text style={{
                    textAlign: 'center',
                    fontSize: fontSize.size20,
                    color: colors.palette.radicalRed,
                    fontWeight: '600',
                    marginVertical: scaleWidth(20),

                }} >
                    {formatVND(formatCurrency(commasToDots(30000)))}
                </Text>

                <Controller
                    control={control}
                    name='moneyPay'
                    render={({ field: { onBlur, onChange, value } }) =>
                        <TextField
                            labelTx={"debtScreen.payDebt"}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputStyle={{ fontWeight: '500' }}
                        />
                    }
                    rules={{
                        required: translate("validate.enterData")
                    }}

                />
                <View style={{
                    flexDirection: 'row',
                    marginTop: scaleHeight(8),
                    alignItems: 'center',
                    marginBottom: scaleHeight(20)
                }}>
                    <Text
                        tx='suppliers.amountOwed'
                        style={{
                            fontSize: fontSize.size12,
                            color: colors.palette.dolphin,

                        }}
                    />

                    <Text style={{ fontSize: fontSize.size12, color: colors.palette.radicalRed }}>

                        {formatVND(formatCurrency(commasToDots(20000)))}
                    </Text>
                </View>


                <InputSelect
                    titleText={en.debtScreen.payments}
                    hintTx='debtScreen.payments'
                    arrData={myDataSelectAmount}
                    dataDefault={selectCustomerAmount.label}
                    onPressChoice={(item: any) => {
                        setSelectCustomerAmount(item)
                    }}

                />

                <InputSelect
                    titleText={en.debtScreen.payments}
                    hintTx='debtScreen.payments'
                    arrData={myDataSelectAmount}
                    dataDefault={selectCustomerAmount.label}
                    onPressChoice={(item: any) => {
                        setSelectCustomerAmount(item)
                    }}
                    styleView={{ marginTop: scaleHeight(20) }}

                />
                <TouchableOpacity
                    style={[Styles.btnPay, { padding: scaleWidth(12), borderRadius: scaleWidth(8), marginTop: scaleWidth(20) }]}
                    onPress={onPressConfirm}
                >

                    <Text tx="debtScreen.pay2" style={{ color: colors.white, fontSize: fontSize.size14 }}></Text>
                </TouchableOpacity>

            </View>

        </Modal>
    )
}
