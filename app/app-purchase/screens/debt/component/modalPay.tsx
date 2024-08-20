import { TouchableOpacity, View, } from 'react-native'
import React, { FC, useState } from 'react'
import Modal from 'react-native-modal'
import { Styles } from '../screen/styles'
import { colors, fontSize, margin, scaleHeight, scaleWidth } from '../../../theme'
import { Text, TextField } from '../../../../components'
import { Svgs } from '../../../../../assets/svgs'
import { commasToDots, formatCurrency, formatVND } from '../../../utils/validate'
import { Controller, useForm } from 'react-hook-form'
import en from '../../../../i18n/en'
import { InputSelect } from '../../../../components/input-select/inputSelect'
import { id } from 'date-fns/locale'
import { translate } from '../../../../i18n'

interface propsModal {
    isVisible?: boolean,
    setIsVisible?: any,
    keyToPass?: string
}

export const ModalPay: FC<propsModal> = ({ isVisible, setIsVisible, keyToPass }) => {
    const [selectUpOrDow, setSelectUpOrDow] = useState("Up")
    const [totalDebt, setTotalDebt] = useState("Dow")
    const [selectCustomerAmount, setSelectCustomerAmount] = useState({ label: "" })

    console.log('KeyToPass', keyToPass);


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
                        <Text tx={keyToPass === 'pay' ? 'debtScreen.pay' : 'debtScreen.payTotal'}
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
                    fontWeight: '600'
                }} >
                    {formatVND(formatCurrency(commasToDots(20000)))}
                </Text>

                <Controller
                    control={control}
                    name='moneyPay'
                    render={({ field: { onBlur, onChange, value } }) =>
                        <TextField
                            labelTx={"debtScreen.paymentAmount"}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputStyle={{ fontWeight: '500' }}
                        />
                    }
                    rules={{
                        required: translate("debtScreen.pleaseEnterData")
                    }}

                />
                <View style={{
                    flexDirection: 'row',
                    marginTop: scaleHeight(8),
                    marginBottom: scaleHeight(15),
                    alignItems: 'center'
                }}>
                    <Text
                        tx='suppliers.amountOwed'
                        style={{
                            fontSize: fontSize.size12,
                            color: colors.palette.dolphin,

                        }} ></Text>
                    <Text>

                        {formatVND(formatCurrency(commasToDots(20000)))}
                    </Text>
                </View>


                <InputSelect
                    titleTx='debtScreen.payments'
                    hintTx='debtScreen.payments'
                    arrData={myDataSelectAmount}
                    dataDefault={selectCustomerAmount.label}
                    onPressChoice={(item: any) => {
                        setSelectCustomerAmount(item)
                    }}

                />
                {
                    keyToPass === 'pay' ?
                        <InputSelect
                            titleTx='debtScreen.accountingBook'
                            hintTx='debtScreen.payments'
                            arrData={myDataSelectAmount}
                            dataDefault={selectCustomerAmount.label}
                            onPressChoice={(item: any) => {
                                setSelectCustomerAmount(item)
                            }}
                            styleView={{ marginTop: 10 }}

                        />
                        : <></>
                }

                <TouchableOpacity
                    style={[Styles.btnPay, { padding: scaleWidth(12), borderRadius: scaleWidth(8), marginTop: scaleWidth(30) }]}
                    onPress={onPressConfirm}
                >

                    <Text tx="ImprotGoodsBook.confrim" style={{ color: colors.white, fontSize: fontSize.size14 }}></Text>
                </TouchableOpacity>

            </View>

        </Modal>
    )
}
