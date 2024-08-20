import React, { memo, useCallback, useMemo, useState } from 'react';
import { Dimensions, View, Platform } from 'react-native';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import { Button, Text, TextField } from '../../../../components';
import { Controller, useForm } from 'react-hook-form';
import { TxKeyPath, translate } from '../../../../i18n';
import { useStores } from '../../../models';
import { useFocusEffect } from '@react-navigation/native';
import { CustomModal } from '../../../../components/custom-modal';
import { GroupButtonBottom } from '../../../../components/group-button/groupButtonBottom';

interface UnitModalProps {
    isVisible: boolean;
    setIsVisible: () => void;
    title?: string;
    titleTx?: TxKeyPath;
    onSave: (value: any) => void;
    onSaveAndChange: (value: any) => void;
}

const UnitModal = (props: UnitModalProps) => {
    console.log('--------re-render---unit----');
    const { isVisible, setIsVisible, title, titleTx, onSave, onSaveAndChange } = props;
    const actualTitle = useMemo(() => titleTx ? translate(titleTx) : title, [titleTx, title]);

    const { control, reset, setValue, getValues, handleSubmit, formState: { errors }, clearErrors } = useForm();
    const { unitStore } = useStores()
    const [textError, setTextError] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const createUnitName = useCallback(async (onclickSave: any) => {
        setShowLoading(true);
        const name = getValues('unit');
        const unitResult = await unitStore.createUnitName(name);
        if (unitResult && unitResult.kind === 'ok') {
            const data = unitResult.result.data;
            const dataModified = {
                id: data.id,
                label: data.name,
            };
            if (onclickSave) {
                onSave(dataModified);
            } else {
                onSaveAndChange(dataModified);
            }
            setShowLoading(false);
        } else {
            setShowLoading(false);
            setTextError(unitResult.result.errorCodes[0].message);
            console.error('Failed to fetch list unit:', unitResult);
        }
    }, [getValues, unitStore, onSave, onSaveAndChange]);

    const saveData = useCallback(() => {
        createUnitName(true);
    }, [createUnitName]);

    const saveAndChange = useCallback(() => {
        createUnitName(false);
    }, [createUnitName]);

    useFocusEffect(
        useCallback(() => {
            reset();
            clearErrors();
        }, [isVisible, reset, clearErrors])
    );

    const onError = useCallback((errors: any) => {
        if (errors.unit) {
            setTextError(errors.unit.message);
        }
    }, []);

    return (
        <CustomModal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            isHideKeyBoards={isVisible}
            isVisibleLoading={showLoading}
        >
            <Text style={{
                fontWeight: '700', fontSize: fontSize.size14,
                lineHeight: scaleHeight(24),
                color: colors.palette.nero,
                marginVertical: scaleHeight(margin.margin_16)
            }} text={actualTitle} />
            <View style={{
                flexDirection: 'row', alignItems: 'center',
            }}>
                <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <TextField
                            keyboardType={'default'}
                            placeholder={translate('productScreen.input_unit')}
                            style={{
                                width: '100%',
                                marginBottom: scaleHeight(10),
                            }}
                            inputStyle={{ marginBottom: Platform.OS === 'ios' ? scaleHeight(padding.padding_8) : 0 }}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={(value) => {
                                onChange(value);
                                setTextError('');
                            }}
                            showRightIcon={false}
                            multiline={true}
                            error={textError}
                        />)}
                    defaultValue={''}
                    name='unit'
                    rules={{
                        required: translate("messageError.required_value_null"),
                    }}
                />
            </View>
            <GroupButtonBottom
                onPressCancel={handleSubmit(saveData, onError)}
                onPressConfirm={handleSubmit(saveAndChange, onError)}
                txCancel={'productScreen.save'}
                txConfirm={'productScreen.saveAndChange'}
                isModal={true}
            />
        </CustomModal>
    );
};

export default memo(UnitModal);
