import { TouchableOpacity, View, } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import Modal from 'react-native-modal'
import { Styles } from '../screen/styles'
import { colors, fontSize, margin, scaleHeight, scaleWidth } from '../../../theme'

import { Svgs } from '../../../../../assets/svgs'
import { commasToDots, formatCurrency, formatVND } from '../../../utils/validate'
import { Controller, useForm } from 'react-hook-form'
import en from '../../../../i18n/en'
import { InputSelect } from '../../../../components/input-select/inputSelect'
import { id } from 'date-fns/locale'
import { translate } from '../../../../i18n'
import { Text, TextField } from '../../../../components'
import { number } from 'mobx-state-tree/dist/internal'
import { useStores } from '../../../models'

interface propsModal {
    isVisible?: boolean,
    setIsVisible?: any,
    keyToPass?: string,
    valueDebt?: number
}

export const ModalPay: FC<propsModal> = ({ isVisible, setIsVisible, keyToPass, valueDebt }) => {
    const [selectUpOrDow, setSelectUpOrDow] = useState("Up")
    const [totalDebt, setTotalDebt] = useState("Dow")
    const [selectCustomerAmount, setSelectCustomerAmount] = useState({ label: "", key: "" })
    const getAPI = useStores()
    const idSentAccountingBook = useRef<number>(0)

    console.log('KeyToPass', keyToPass, valueDebt);


    const { control, formState: { errors }, getValues, watch } = useForm({
        mode: 'all',

    })

    const dataInputSelect = [
        {
            id: 1,
            label: translate("debtScreen.amount"),
            key: "CASH"
        },
        {
            id: 2,
            label: translate("order.BANK_TRANSFER"),
            key: "BANK"
        }
    ]

    const myDataSelectAmount = dataInputSelect.map((item) => {
        return { label: item.label, id: item.id, key: item.key }
    })

    const onPressConfirm = () => {
        setIsVisible(!isVisible)
    }


    const valueInputNumberPay = watch("moneyPay")
    // console.log('====================================');
    // console.log("value Input", valueInputNumberPay.replace(/\./g, ''), Number(valueDebt), Number(valueInputNumberPay));
    // console.log('====================================');
    const numberDebt = Number(valueDebt) + Number(valueInputNumberPay?.replace(/\./g, ''))

    const getIdSentAccountingBook = async () => {
        const result = await getAPI.debtStore.getIdSentAccountingBook(true)
        console.log("Data get ID", result?.data?.data?.content[0]?.id);
        idSentAccountingBook.current = result?.data?.data?.content[0]?.id
    }

    const getListSelectAccountingBook = async () => {
        const listAccountingBook = await getAPI.debtStore.getListSelectAccountingBook(0, 20, 1, selectCustomerAmount.key)
        console.log("Daaaaaaaa", listAccountingBook?.data);

    }

    useEffect(() => {
        getIdSentAccountingBook()
        getListSelectAccountingBook()
    }, [])

    useEffect(() => {
        getListSelectAccountingBook()

    }, [selectCustomerAmount.key])


    console.log("1323", selectCustomerAmount.key);

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
                    {formatVND(formatCurrency(commasToDots(valueDebt)))}
                </Text>

                <Controller
                    control={control}
                    name='moneyPay'
                    render={({ field: { onBlur, onChange, value } }) =>
                        <TextField
                            labelTx={"debtScreen.paymentAmount"}
                            value={formatCurrency(value)}
                            // onChange={(text) => {
                            //     console.log('====================================');
                            //     console.log("doan dev 123", text.nativeEvent.text);
                            //     console.log('====================================');
                            //     onChange(text.nativeEvent.text)
                            // }}
                            onBlur={onBlur}
                            inputStyle={{ fontWeight: '500' }}
                            onChangeText={(text) => onChange(text)}
                            showRightIcon={false}
                            keyboardType={'numeric'}

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

                        {formatVND(formatCurrency(commasToDots(valueInputNumberPay == "" ? valueDebt : numberDebt)))}
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
                    selectCustomerAmount.label == translate("order.BANK_TRANSFER") ?
                        <View style={{ marginTop: scaleHeight(15) }}>
                            <InputSelect
                                titleTx='debtScreen.senderAccountNumber'
                                hintTx='debtScreen.payments'
                                arrData={myDataSelectAmount}
                                dataDefault={selectCustomerAmount.label}
                                onPressChoice={(item: any) => {
                                    setSelectCustomerAmount(item)
                                }}
                                styleView={{ marginBottom: scaleHeight(15) }}
                            />

                            <InputSelect
                                titleTx='debtScreen.recipientAccountNumber'
                                hintTx='debtScreen.payments'
                                arrData={myDataSelectAmount}
                                dataDefault={selectCustomerAmount.label}
                                onPressChoice={(item: any) => {
                                    setSelectCustomerAmount(item)
                                }}
                            />
                        </View>
                        :
                        <></>

                }
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
