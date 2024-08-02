
import React, { FC } from 'react';
import { View, Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { scaleWidth, padding, scaleHeight, colors } from '../../../theme';
import { Text, TextField } from '../../../components';
import { Controller, useForm } from 'react-hook-form';
import { validatePhoneStartsWith } from '../../../utils/validate';


interface ModalCreateGroup {
    isVisible: any,
    setIsVisible?: any
}

const Modal_Infor_wareHouse: FC<ModalCreateGroup> = ({ isVisible, setIsVisible }) => {

    const { control, handleSubmit, formState: {errors} } = useForm({ mode: 'all' });
    return (

        <Modal
            animationType='slide'
            visible={isVisible}
            transparent={true}

        >
            <View style={Styles.container}>
                <View style={Styles.modalView}>
                    <Text style={Styles.modalText} />
                    <View style={Styles.header}>
                        <Text style={Styles.headerTitle} tx='wareHouse.inforWareHouse' ></Text>
                        <TouchableOpacity onPress={setIsVisible}>
                            <Text style={Styles.headerButton} tx='inforMerchant.cancel'></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.horizontalLine} />
                    <View style={Styles.body}>
                        <View style={{ flex: 1 }}>
                           
                            {/* <Controller
                                control={control}

                                render={({ field: { onChange, value, onBlur } }) => ( */}
                                    <TextField

                                        // maxLength={maxLenngthPhoneNumber}
                                        keyboardType={'number-pad'}
                                        label={'Phone number'}
                                        style={{
                                            marginBottom: scaleHeight(10),
                                            marginTop: scaleWidth(10),
                                            justifyContent: 'center',
                                            // alignItems : 'center'
                                        }}
                                        // value={value}
                                        // onBlur={onBlur}
                                        // RightIconClear={Images.icon_delete}
                                        // error={errors?.phonenumber?.message}
                                        // onClearText={() => onChange('')}
                                        // onChangeText={value => onChange(value)}
                                        placeholder='Số lượng'
                                    />
                                {/* )}
                                defaultValue={'67075123362'}
                                name="phonenumber"
                                rules={{
                                    required: 'Please input data',
                                    validate: value =>
                                        validatePhoneStartsWith(value) == false
                                            ? 'Phone number isnt right'
                                            : null,
                                }}
                            /> */}
                              <TextField

                                        // maxLength={maxLenngthPhoneNumber}
                                        keyboardType={'number-pad'}
                                        label={'Phone number'}
                                        style={{
                                            marginBottom: scaleHeight(10),
                                            marginTop: scaleWidth(10),
                                            justifyContent: 'center',
                                            // alignItems : 'center'
                                        }}
                                        // value={value}
                                        // onBlur={onBlur}
                                        // RightIconClear={Images.icon_delete}
                                        // error={errors?.phonenumber?.message}
                                        // onClearText={() => onChange('')}
                                        // onChangeText={value => onChange(value)}
                                        placeholder='Giá vốn'
                                    />

                            <TouchableOpacity
                                style={{justifyContent:'center', alignItems:'center',backgroundColor:colors.palette.navyBlue, padding:scaleWidth(12), borderRadius:scaleWidth(8)}}
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                <Text
                                 style={{color:colors.white}}
                                 tx='wareHouse.confirm'
                                >
                                </Text>
                            </TouchableOpacity>

                         
                        </View>


                    </View>

                </View>
            </View>

        </Modal>
    );
}

export default Modal_Infor_wareHouse;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
    },
    modalView: {
        borderRadius: 8,
        backgroundColor: colors.white,
        padding: scaleWidth(padding.padding_16)
    },
    modalText: {
        textAlign: 'center',
        width: scaleWidth(68),
        height: scaleHeight(5),
        backgroundColor: colors.veryLightGrey1,
        borderRadius: 8,
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,

    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 8
    },
    headerButton: {
        fontSize: 16,
        color: 'red',
    },
    horizontalLine: {
        height: 1,
        backgroundColor: colors.solitude2,
        marginTop: scaleHeight(18),
        marginBottom: 18,
    },
    body: {
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    styleTextInPut: {
        width: '100%',
        borderRadius: 8,
        backgroundColor: colors.aliceBlue,
    },
    btnCreate: {
        backgroundColor: colors.palette.navyBlue,
        width: scaleWidth(78),
        height: scaleHeight(56),
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    styleTxT: {
        fontFamily: 'Inter',
        fontWeight: '600',
        color: colors.white
    }
})