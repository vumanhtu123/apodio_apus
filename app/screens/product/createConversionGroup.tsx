import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import { Images } from "../../../assets";
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header, Text, TextField } from "../../components";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { InputSelect } from "../../components/input-select/inputSelect";
import Modal from 'react-native-modal';
import { useStores } from "../../models"
import { da } from "date-fns/locale";
import { hideDialog, showDialog, showToast } from "../../utils/toast";
import { translate } from "../../i18n/translate";

export const CreateConversionGroup: FC = observer(
    function CreateConversionGroup(props) {
        const paddingTop = useSafeAreaInsets().top
        const route = useRoute()
        const editScreen = route?.params?.editScreen
        const navigation = useNavigation()
        const { unitStore } = useStores()
        const [originalUnit, setOriginalUnit] = useState({ id: 0, label: '' })
        const [originalUnit2, setOriginalUnit2] = useState({ id: null, label: '' })
        const [arrData, setData] = useState([] as any)
        const [showModal, setShowModal] = useState(false)
        const [showModalDVT, setShowModalDVT] = useState(false)
        const [filteredData, setFilteredData] = useState([]);
        const [search, setSearch] = useState('');
        const [indexConversion, setIndexConversion] = useState(0)
        const [disabledSelect, setDisabledSelect] = useState(false)
        const [dataUnit, setDataUnit] = useState("");

        const handleSearch = (text: any) => {
            setSearch(text);
            if (text) {
                const dataChoiceItem = arrData.filter(item => item.label !== dataUnit);
                const newData = dataChoiceItem.filter((item: { label: string; }) => {
                    const itemData = item.label.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
                
                setFilteredData(newData);
            } else {
                const dataChoiceItem = arrData.filter(item => item.label !== dataUnit);
                setFilteredData(dataChoiceItem);
            }
        };

        const { control, reset, handleSubmit, watch, register, setValue, formState: { errors }, } = useForm({
            defaultValues: {
                groupName: '',
                conversion: [{ id: '', code: '', unitId: '', conversionRate: '', changeDVT: '' }],
                DVT: '',
            }
        });
        const { append, fields, remove } = useFieldArray({
            control,
            name: `conversion`
        })


        const conversionWatch = watch('conversion');
        const DVTWatch = watch('DVT')
        const groupNameWatch = watch('groupName')


        const goBackToProductCreateScreen = (id: string, name: string) => {
            if(editScreen=== true){
                navigation.navigate('ProductEditScreen', { idUnitGroup: id, nameUnitGroup: name, goBackConversionGroup: true, resetData: false })
            }else{
                navigation.navigate('ProductCreateScreen', { idUnitGroup: id, nameUnitGroup: name, goBackConversionGroup: true, resetData: false })
            }
        };

        useEffect(() => {
            getListUnit();
        }, [])

        useEffect(() => {
            if (conversionWatch.length === 1 && conversionWatch[0].code === '' && conversionWatch[0].conversionRate === '') {
                setDisabledSelect(false)
            } else {
                setDisabledSelect(true)
            }
        }, [conversionWatch[0].code, conversionWatch[0].conversionRate])

        const getListUnit = async () => {
            const unitResult = await unitStore.getListUnit()
            console.log('response11111', unitResult)
            if (unitResult && unitResult.kind === 'ok') {
                let dataModified = unitResult.result.data.content.map(
                    (obj: { id: any; name: any; }) => {
                        return {
                            "id": obj.id,
                            "label": obj.name
                        }
                    }
                );
                console.log('response2222', dataModified)
                setFilteredData(dataModified);
                setData(dataModified);
            } else {
                console.error('Failed to fetch list unit:', unitResult);
            }
        }


        const createUnitName = async (name: string, saveLocal: boolean) => {
            const unitResult = await unitStore.createUnitName(name)
            console.log('response11111', unitResult)
            if (unitResult && unitResult.kind === 'ok') {
                const data = unitResult.result.data;
                const dataModified = {
                    id: data.id,
                    label: data.name
                };
                console.log('response1134433434', dataModified, "----", arrData.length)
                // Thêm đối tượng mới vào vị trí đầu tiên của mảng bằng toán tử spread
                // const newArray = [dataModified, ...arrData];
                // Cập nhật state với mảng mới
                // setData(newArray);
                setShowModalDVT(false);
                if (saveLocal === true) {
                    setOriginalUnit(dataModified)
                }
                reset({
                    groupName: groupNameWatch,
                    conversion: conversionWatch,
                    DVT: ''
                })

                getListUnit()
            } else {
                console.error('Failed to fetch list unit:', unitResult);
            }
        }

        const createUnitGroupLine = async (params: any, saveLocal: boolean) => {
            const unitResult = await unitStore.createUnitGroupLine(params)
            if (unitResult && unitResult.kind === 'ok') {
                const data = unitResult.result.data;
                console.log('response11111', unitResult)
                goBackToProductCreateScreen(data.id, data.name);

            } else {
                showDialog(translate("txtDialog.txt_title_dialog"),'danger', unitResult.result.errorCodes[0].message, translate("common.ok"),'', () => {
                    //navigation.goBack()
                })
                console.error('Failed to fetch list unit:', unitResult);
            }
        }

        //luu va chon 
        const onSubmit = () => {
            if (groupNameWatch === '' || originalUnit.label === '' ||
                (conversionWatch.length === 1 && conversionWatch[0].code === '' && conversionWatch[0].conversionRate === '')
            ) {
                showToast('txtToats.required_information', 'error')
            } else {
                showDialog(translate("txtDialog.txt_title_dialog"),'danger', translate("txtDialog.save_the_conversion_group"), translate("common.cancel"), translate("common.confirm"), () => {
                    const params: any = {};
                            params.name = groupNameWatch;
                            params.originalUnitId = originalUnit.id;
                            const jsonArray = conversionWatch.map(item => ({
                                ...item,
                                conversionRate: parseInt(item.conversionRate, 10)
                            }));
                            params.unitGroupLines = jsonArray;
                            console.log(conversionWatch)
                            createUnitGroupLine(params, true);
                            hideDialog();
                })
            }
            // reset();
        };

        //luu
        const onSubmit1 = () => {
            if (groupNameWatch === '' || originalUnit.label === '' ||
                (conversionWatch.length === 1 && conversionWatch[0].code === '' && conversionWatch[0].conversionRate === '')
            ) {
                showToast('txtToats.required_information', 'error')
            } else {

                showDialog(translate("txtDialog.txt_title_dialog"),'danger', translate("txtDialog.save_the_conversion_group"), translate("common.cancel"), translate("common.confirm"), () => {
                    const params: any = {};
                            params.name = groupNameWatch;
                            params.originalUnitId = originalUnit.id;
                            const jsonArray = conversionWatch.map(item => ({
                                ...item,
                                conversionRate: parseInt(item.conversionRate, 10)
                              }));
                            params.unitGroupLines = jsonArray;
                            console.log(conversionWatch)
                            createUnitGroupLine(params, false);
                            hideDialog();
                })
            }
            // reset();
        };

        //luu va chon modal DVT
        const onSubmitDVT = () => {
            // onConfirm(data)
            if (DVTWatch === '') {
                showToast('txtToats.required_information', 'error')
            } else {
                showDialog(translate("txtDialog.txt_title_dialog"),'danger', translate("txtDialog.save_unit") + " " + DVTWatch, translate("common.cancel"), translate("common.confirm"), () => {
                    createUnitName(DVTWatch, true)
                    hideDialog();
                })
            }
            // reset();
        };

        //luu modal DVT
        const onSubmitDVT1 = () => {
            // onConfirm(data)
            if (DVTWatch === '') {
                showToast('txtToats.required_information', 'error')
            } else {
                showDialog(translate("txtDialog.txt_title_dialog"),'danger', translate("txtDialog.save_unit") + " " + DVTWatch, translate("common.cancel"), translate("common.confirm"), () => {
                    createUnitName(DVTWatch, false)
                    hideDialog();
                })
            }
            // reset();
        };

        return (
            <View style={{ backgroundColor: colors.palette.neutral100, flex: 1 }}>
                <Header
                    LeftIcon={Images.back}
                    onLeftPress={() => navigation.goBack()}
                    headerText="Tạo nhóm quy đổi"
                    style={{ height: scaleHeight(52) }}
                />
                <View style={{ marginHorizontal: scaleWidth(margin.margin_16), flex: 1 }}>
                    <Controller
                        control={control}
                        name={`groupName`}
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextField
                                keyboardType={null}
                                labelTx={'productDetail.groupName'}
                                style={{ marginTop: scaleHeight(20), marginBottom: scaleHeight(margin.margin_15) }}
                                placeholder="Nhập tên nhóm"
                                value={value}
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                // onClearText={() => onChange('')}
                                // RightIconClear={Images.icon_delete2}
                                showRightIcon={false}
                                isImportant={true}
                            />)}
                        // defaultValue={''}
                        rules={{ required: "Group name is required" }}
                    />
                    <InputSelect
                        titleTx={'productDetail.originUnit'}
                        hintTx={'productDetail.selectOriginUnit'}
                        isSearch
                        required={true}
                        arrData={arrData}
                        dataDefault={originalUnit.label}
                        onPressChoice={(item) => {
                            setDataUnit(item.label)
                            setOriginalUnit(item)
                            setFilteredData(prevItems => prevItems.filter(i => i.label !== item.label));
                        }}
                        disabled={disabledSelect}
                    />
                    <TouchableOpacity onPress={() => setShowModalDVT(true)}
                        style={{
                            marginTop: scaleHeight(6),
                            marginBottom: scaleHeight(margin.margin_15), flexDirection: 'row',
                        }}>
                        <Images.icon_plusCircleBlue />
                        <Text text="Tạo ĐVT" style={{
                            marginLeft: scaleWidth(4), fontWeight: '400',
                            fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                            color: colors.palette.navyBlue,
                        }} />
                    </TouchableOpacity>
                    <View >
                        <View style={{ flexDirection: 'row' }}>
                            <Text text="Tỷ lệ quy đổi" style={{
                                fontWeight: '600', fontSize: fontSize.size12,
                                lineHeight: scaleHeight(14.52), color: colors.palette.nero,
                                flex: 1
                            }} />
                            <TouchableOpacity onPress={() => {
                                const lastItem = conversionWatch[conversionWatch.length - 1];
                                if (lastItem.code && lastItem.conversionRate) {
                                    append({ id: '', code: '', unitId: '', conversionRate: '', changeDVT: '' });
                                } else {
                                    showToast('txtDialog.adding_a_new_price_range', 'error')
                                }
                            }} >
                                <Text text="Thêm dòng" style={{
                                    fontWeight: '400',
                                    fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                    color: colors.palette.navyBlue,
                                }} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView >
                            {fields.map((item, index) => {
                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} >
                                        <View style={{ flex: 1 }}>
                                            <View style={{
                                                flexDirection: 'row', alignItems: 'center',
                                                marginTop: scaleHeight(margin.margin_16)
                                            }}>
                                                <Controller
                                                    control={control}
                                                    name={`conversion.${index}.code`}
                                                    render={({ field: { onChange, value, onBlur } }) => (
                                                        <TextInput
                                                            keyboardType={'default'}
                                                            placeholder="Nhập mã quy đổi"
                                                            style={{
                                                                width: '35%',
                                                                borderBottomWidth: 1, borderBottomColor: '#DFE0EB',
                                                                paddingVertical: Platform.OS === 'ios' ? scaleHeight(15) : null
                                                            }}
                                                            value={value}
                                                            onBlur={onBlur}
                                                            onChangeText={(value) => {
                                                                if (originalUnit.label === '') {
                                                                    showToast('txtToats.required_dvt', 'error');
                                                                } else { onChange(value) }
                                                            }}
                                                            maxLength={50}
                                                        />)}
                                                />
                                                <TouchableOpacity onPress={() => {
                                                                if (originalUnit.label === '') {
                                                                    showToast('txtToats.required_dvt', 'error');
                                                                } else { setShowModal(true)
                                                                    setIndexConversion(index)
                                                                 }
                                                            }}
                                                    style={{
                                                        width: '25%',
                                                        borderBottomWidth: 1,
                                                        borderBottomColor: '#DFE0EB', flexDirection: 'row',
                                                        marginHorizontal: scaleWidth(8),
                                                        marginTop: 15,
                                                    }}>
                                                    {conversionWatch[index].changeDVT !== '' ?
                                                        <Text style={{ flex: 1, paddingBottom: scaleHeight(12) }} text={conversionWatch[index].changeDVT} />
                                                        : <Text style={{
                                                            flex: 1, fontWeight: '400', fontSize: fontSize.size12,
                                                            color: colors.palette.dolphin,
                                                            paddingBottom: scaleHeight(18),
                                                        }} text={'Chọn DVT'} />

                                                    }
                                                    <Images.icon_caretRightDown />
                                                </TouchableOpacity>
                                                <View style={{
                                                    flexDirection: 'row', justifyContent: 'flex-end', width: '35%',
                                                    borderBottomWidth: 1, borderBottomColor: '#DFE0EB',
                                                    paddingVertical: Platform.OS === 'ios' ? scaleHeight(15) : 0
                                                }}>

                                                    <Controller
                                                        control={control}
                                                        name={`conversion.${index}.conversionRate`}
                                                        render={({ field: { onChange, value, onBlur } }) => (
                                                            <TextInput
                                                                keyboardType={'numeric'}
                                                                placeholder="Nhập tỷ lệ"
                                                                style={{
                                                                    width: '60%',
                                                                }}
                                                                value={value}
                                                                onBlur={onBlur}
                                                                onChangeText={(value) => {
                                                                    if (originalUnit.label === '') {
                                                                        showToast('txtToats.required_dvt', 'error');
                                                                    } else { onChange(value) }
                                                                }}
                                                                maxLength={50}

                                                            />)}
                                                    />
                                                    <View style={{
                                                        alignSelf: 'center',
                                                        width: '40%'
                                                    }}>
                                                        <Text text={originalUnit.label} style={{ color: colors.palette.dolphin, fontWeight: '400', fontSize: fontSize.size10, textAlign: 'right' }} />
                                                    </View>
                                                </View>
                                            </View>
                                            {conversionWatch[index].changeDVT && originalUnit.label  && conversionWatch[index].conversionRate ?
                                                <Text text={'1 ' + conversionWatch[index].changeDVT + ' = ' + conversionWatch[index].conversionRate + ' ' + originalUnit.label}
                                                    style={{ color: colors.palette.dolphin, fontWeight: '400', fontSize: fontSize.size10 }} /> : null}
                                        </View>

                                        {fields.length > 1 ?
                                            <TouchableOpacity onPress={() => remove(index)} style={{ marginLeft: scaleWidth(7) }}>
                                                <Images.icon_minusCircle />
                                            </TouchableOpacity> :
                                            <View style={{ width: scaleWidth(12) }} />
                                        }
                                        <Modal isVisible={showModal}
                                            onBackdropPress={() => { setShowModal(false) }}
                                        >
                                            <View style={styles.viewModal}>
                                                <TextInput
                                                    style={{ fontSize: 16, fontWeight: '400' }}
                                                    onChangeText={(text) => handleSearch(text)}
                                                    value={search}
                                                    placeholder="Search..."
                                                />
                                                <FlatList
                                                    data={filteredData}
                                                    style={{
                                                        // flex: 1,
                                                        marginTop: scaleHeight(margin.margin_10)
                                                    }}
                                                    renderItem={({ item }) => {
                                                        return (
                                                            <View>
                                                                <TouchableOpacity onPress={() => {
                                                                    setDataUnit(item.label)
                                                                    setFilteredData(prevItems => prevItems.filter(i => i.label !== item.label));
                                                                    setValue(`conversion.${indexConversion}.unitId`, item.id)
                                                                    setValue(`conversion.${indexConversion}.changeDVT`, item.label)
                                                                    setShowModal(false)
                                                                }}>
                                                                    <Text text={item.label}
                                                                        style={styles.textLabelFlatList} />
                                                                </TouchableOpacity>
                                                                <View style={styles.viewLine}></View>
                                                            </View>
                                                        );
                                                    }}
                                                />
                                            </View>
                                        </Modal>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
                <Modal isVisible={showModalDVT}
                    style={{
                        marginHorizontal: scaleWidth(margin.margin_16),
                        backgroundColor: colors.palette.neutral100,
                        borderRadius: 8, paddingHorizontal: scaleWidth(margin.margin_16),
                        position: 'absolute', bottom: 20,
                        width: Dimensions.get('screen').width - scaleWidth(32)
                    }}
                    onBackdropPress={() => {
                        if (DVTWatch === '') {
                            setShowModalDVT(false)
                        } else {
                            showDialog(translate("txtDialog.txt_title_dialog"),'danger', translate("txtDialog.content_exit_dialog"), translate("common.cancel"), translate("common.ok"), () => {
                                setShowModalDVT(false)
                                        reset({
                                            groupName: groupNameWatch,
                                            conversion: conversionWatch,
                                            DVT: ''
                                        })
                            })
                        }
                    }}
                >
                    <View>
                        <Text text='Tạo đơn vị tính' style={{
                            fontWeight: '700', fontSize: fontSize.size14,
                            lineHeight: scaleHeight(24), color: colors.palette.nero,
                            marginVertical: scaleHeight(18), marginLeft: scaleWidth(margin.margin_6),
                        }} />
                        <View style={styles.viewLine} />
                        <Controller
                            control={control}
                            name={`DVT`}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <TextInput
                                    keyboardType={'default'}
                                    placeholder="Nhập tên đơn vị tính"
                                    style={{
                                        marginVertical: scaleHeight(18),
                                    }}
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={(value) => onChange(value)}
                                />)}
                        />
                        <View style={styles.viewLine} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: 'white',
                            paddingVertical: scaleHeight(20),
                        }}>
                            <TouchableOpacity onPress={() => onSubmitDVT1()}
                                style={{
                                    width: scaleWidth(145), height: scaleHeight(48),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderRadius: 10, borderColor: colors.palette.navyBlue,
                                }}>
                                <Text tx={'productScreen.save'} style={{ fontSize: fontSize.size14, fontWeight: '600', color: colors.palette.navyBlue }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={
                                    () => onSubmitDVT()
                                }
                                style={{ width: scaleWidth(145), height: scaleHeight(48), justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#0078d4' }}>
                                <Text tx={'productScreen.saveAndChange'} style={{ fontSize: fontSize.size14, fontWeight: '600', color: colors.palette.neutral100 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    backgroundColor: 'white',
                    paddingVertical: scaleHeight(20),
                }}>
                    <TouchableOpacity onPress={
                        () => onSubmit1()
                    }
                        style={{
                            width: scaleWidth(165), height: scaleHeight(48),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 10, borderColor: colors.palette.navyBlue,
                        }}>
                        <Text tx={'productScreen.save'} style={{ fontSize: fontSize.size14, fontWeight: '600', color: colors.palette.navyBlue }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={
                            () => onSubmit()
                        }
                        style={{ width: scaleWidth(150), height: scaleHeight(48), justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#0078d4' }}>
                        <Text tx={'productScreen.saveAndChange'} style={{ fontSize: fontSize.size14, fontWeight: '600', color: colors.palette.neutral100 }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
)

const styles = StyleSheet.create({
    viewModal: {
        // width: Dimensions.get('screen').width - 32,
        height: Dimensions.get('screen').height * 0.4,
        backgroundColor: colors.palette.neutral100,
        borderRadius: 8,
        paddingVertical: scaleHeight(padding.padding_12),
        paddingHorizontal: scaleWidth(padding.padding_16),
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
    }, textLabelFlatList: {
        fontWeight: '500',
        fontSize: fontSize.size16,
        lineHeight: scaleHeight(24),
        color: colors.palette.nero,
        marginVertical: scaleHeight(margin.margin_8)
    }, viewLine: {
        height: scaleHeight(1), width: '100%',
        backgroundColor: colors.palette.ghostWhite
    },
})