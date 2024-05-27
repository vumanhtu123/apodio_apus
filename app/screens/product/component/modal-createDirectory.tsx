import React, { useCallback, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, Text as TextRN, View, PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import { SvgIcon } from '../../../components/svg-icon/index';
import { fontSize, scaleHeight, scaleWidth } from '../../../theme';
import { navigate } from '../../../navigators';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Images } from '../../../../assets';
import { AutoImage, Button, TextField } from '../../../components';
import { Controller, useForm } from 'react-hook-form';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useStores } from '../../../models';
import { hideDialog, hideLoading, showDialog } from '../../../utils/toast';
import { translate } from 'i18n-js';
import { validateFileSize } from '../../../utils/validate';
import { checkCameraPermission, checkLibraryPermission, requestCameraPermission, requestLibraryPermission } from '../../../utils/requesPermissions';

const CreateDirectoryModal = (props: any) => {
    const { isVisible, setType, setIsVisible, onCreateDirectory } = props;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'all',
    });
    const { productStore } = useStores();
    const [imagesNote, setImagesNote] = useState('')
    const [modalImage, setModalImage] = useState(false)
    const [name, setName] = useState('')


    const handleCreateButtonPress = async () => {
        onCreateDirectory(name, imagesNote);
        // setIsVisible(false)
        // setIsVisible(false);
    };
    const uploadImages = async (imageNote: any) => {
        try {
            console.log('đâsads', imageNote)
            const { fileSize, uri, type, fileName } = imageNote;
            const checkFileSize = validateFileSize(fileSize);

            if (checkFileSize) {
                hideLoading();
                showDialog(translate("imageUploadExceedLimitedSize"), "danger", "", "OK", "", "");
                return;
            }

            const formData = new FormData();
            formData.append("file", {
                uri,
                type,
                name: fileName,
            });

            // Upload ảnh
            const result = await productStore.uploadImages(formData);

            console.log(`successfully----------`, result);
            if (result) {
                console.log(`imageNote---------------`, imageNote);
                setImagesNote(result);
            }

            // Xử lý kết quả upload
            if (result) {
                console.log(`Upload image ${imageNote} successfully`);
            } else {
                console.log(`Failed to upload image ${imageNote}`);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };



    const handleCameraUse = async () => {

        const permissionStatus = await checkCameraPermission();
        console.log(permissionStatus)

        if (permissionStatus === RESULTS.GRANTED) {
            console.log("You can use the camera");
            const options = {
                cameraType: 'back',
                quality: 1,
                maxHeight: 500,
                maxWidth: 500,
            };
            launchCamera(options, (response) => {
                console.log('==========> response1233123', response);
                if (response.didCancel) {
                    console.log('User cancelled photo picker1');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error2: ', response.errorCode);
                } else if (response.errorCode) {
                    console.log('User cancelled photo picker1');
                }
                else if (response?.assets[0].uri) {
                    const { fileSize, uri, type, fileName } = response?.assets[0];
                    const result = { fileSize, uri, type, fileName }
                    console.log('testtt', result);
                    uploadImages(result)
                    setModalImage(false)
                }
            })
        } else if (permissionStatus === RESULTS.DENIED) {
            const newStatus = await requestCameraPermission();
            if (newStatus === RESULTS.GRANTED) {
                console.log("Permission granted");
            } else {
                console.log("Permission denied");
                showDialog(translate("txtDialog.permission_allow"), 'danger', translate("txtDialog.allow_permission_in_setting"), translate("common.cancel"), translate("txtDialog.settings"), () => {
                    Linking.openSettings()
                    hideDialog();
                })
            }
        } else if (permissionStatus === RESULTS.BLOCKED) {
            console.log("Permission blocked, you need to enable it from settings");
        }
    };
    const handleLibraryUse = async () => {
        const permissionStatus = await checkLibraryPermission();
        console.log('ads')
        console.log(permissionStatus)

        if (permissionStatus === RESULTS.GRANTED) {
            const options = {
                cameraType: 'back',
                quality: 1,
                maxHeight: 500,
                maxWidth: 500,
            };
            launchImageLibrary(options, (response: any) => {
                console.log('==========> response4564546', response);
                if (response.didCancel) {
                    console.log('User cancelled photo picker1');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error2: ', response.errorCode);
                } else if (response.errorCode) {
                    console.log('User cancelled photo picker1');
                }
                else if (response?.assets[0].uri) {
                    //xử lý uri ảnh hoặc video

                    const { fileSize, uri, type, fileName } = response?.assets[0]
                    // console.log('testttt' ,uri);
                    const result = { fileSize, uri, type, fileName }
                    console.log('testtt', result);
                    uploadImages(result)
                    setModalImage(false)
                }
            })
        } else if (permissionStatus === RESULTS.DENIED) {
            const newStatus = await requestLibraryPermission();
            if (newStatus === RESULTS.GRANTED) {
                console.log("Permission granted");
            } else {
                console.log("Permission denied");
                showDialog(translate("txtDialog.permission_allow"), 'danger', translate("txtDialog.allow_permission_in_setting"), translate("common.cancel"), translate("txtDialog.settings"), () => {
                    Linking.openSettings()
                    hideDialog();
                })
            }
        } else if (permissionStatus === RESULTS.BLOCKED) {
            console.log("Permission blocked, you need to enable it from settings");
        }
        else if (permissionStatus === RESULTS.UNAVAILABLE) {
            const options = {
                cameraType: "back",
                quality: 1,
                maxHeight: 500,
                maxWidth: 500,
            };
            launchImageLibrary(options, (response: any) => {
                console.log("==========> response4564546", response);
                if (response.didCancel) {
                    console.log("User cancelled photo picker1");
                } else if (response.errorCode) {
                    console.log("ImagePicker Error2: ", response.errorCode);
                } else if (response.errorCode) {
                    console.log("User cancelled photo picker1");
                } else if (response?.assets[0].uri) {
                    //xử lý uri ảnh hoặc video

                    const { fileSize, uri, type, fileName } = response?.assets[0]
                    // console.log('testttt' ,uri);
                    const result = { fileSize, uri, type, fileName }
                    console.log('testtt', result);
                    uploadImages(result)
                    setModalImage(false)
                }
            });
        };
    }
    const handleCloseModal = () => {
        // setImagesNote('')
        // setName('')
        setIsVisible(false);
    };
    const handleRemoveImage = () => {
        setImagesNote("")
    }
    useFocusEffect(
        useCallback(() => {
            setImagesNote('');
            setName('');
        }, [isVisible])
    )
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={handleCloseModal}>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <TextRN style={styles.modalText} />
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Tạo danh mục</Text>
                    </View>
                    <View style={styles.horizontalLine} />
                    {imagesNote !== '' ? (
                        <View style={{ flexDirection: 'row', marginBottom: scaleHeight(20) }}>
                            <View style={{ flexDirection: 'column', marginRight: scaleHeight(20) }}>
                                <TouchableOpacity onPress={handleLibraryUse}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderColor: '#0078d4',
                                        borderRadius: 8,
                                        paddingHorizontal: scaleWidth(10),
                                        paddingVertical: scaleHeight(7),
                                        marginBottom: scaleHeight(10)
                                    }}>
                                    <Images.ic_addImages width={scaleWidth(16)} height={scaleHeight(16)} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCameraUse}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderColor: '#0078d4',
                                        borderRadius: 8,
                                        paddingHorizontal: scaleWidth(10),
                                        paddingVertical: scaleHeight(7),
                                    }}
                                >
                                    <Images.ic_camera width={scaleWidth(16)} height={scaleHeight(16)} />
                                </TouchableOpacity>
                            </View>
                            <View >
                                <AutoImage
                                    style={{
                                        width: scaleWidth(107),
                                        height: scaleHeight(70),
                                        borderRadius: 8
                                    }}
                                    source={{ uri: imagesNote }}
                                />
                                <TouchableOpacity
                                    style={{ position: 'absolute', right: scaleWidth(5), top: scaleHeight(5) }}
                                    onPress={() => handleRemoveImage()}
                                >
                                    <Images.circle_close width={scaleWidth(16)} height={scaleHeight(16)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <>
                            <View style={{ flexDirection: 'row', marginBottom: scaleHeight(20) }}>
                                <TouchableOpacity onPress={handleLibraryUse} style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#0078d4', marginRight: scaleWidth(10), borderRadius: 8 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: scaleWidth(16), marginVertical: scaleHeight(7) }}>
                                        <Images.ic_addImages width={scaleWidth(16)} height={scaleHeight(16)} />
                                        <Text style={{ fontSize: fontSize.size14, color: '#0078d4' }}>Tải ảnh lên</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCameraUse} style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#0078d4', borderRadius: 8 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: scaleWidth(16), marginVertical: scaleHeight(7) }}>
                                        <Images.ic_camera width={scaleWidth(16)} height={scaleHeight(16)} />
                                        <Text style={{ fontSize: fontSize.size14, color: '#0078d4' }}>Chụp ảnh</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                    <View>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <TextField
                                    // maxLength={maxLenngthPhoneNumber}
                                    keyboardType={null}
                                    labelTx={"productScreen.directoryName"}
                                    style={{
                                        // marginBottom: scaleHeight(10),
                                        marginBottom: scaleHeight(5),
                                        justifyContent: 'center',
                                    }}
                                    inputStyle={{ fontSize: fontSize.size16, fontWeight: '500' }}
                                    isImportant={true}
                                    value={name}
                                    onBlur={onBlur}
                                    RightIconClear={Images.icon_delete2}
                                    error={errors?.nameCategory?.message}
                                    onClearText={() => {
                                        onChange('')
                                        setName('')
                                    }}
                                    onChangeText={value => {
                                        onChange(value)
                                        setName(value)
                                    }}
                                    placeholderTx={"productScreen.placeholderDirectoryName"}
                                />
                            )}
                            // defaultValue={''}
                            name="nameCategory"
                            rules={{
                                required: 'Please input data',
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: scaleHeight(15) }}>
                        <TouchableOpacity onPress={handleCloseModal} style={{ width: scaleWidth(150), height: scaleHeight(48), justifyContent: 'center', alignItems: 'center', borderWidth: 1, marginRight: scaleWidth(12), borderRadius: 10, borderColor: '#c8c8c8' }}>
                            <Text style={{ fontSize: fontSize.size14 }}>Huỷ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit(handleCreateButtonPress)} style={{ width: scaleWidth(150), height: scaleHeight(48), justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#0078d4' }}>
                            <Text style={{ fontSize: fontSize.size14, color: 'white' }}>Tạo</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingTop: scaleHeight(8),
        // paddingBottom: 5,
        marginHorizontal: scaleWidth(16),
        marginBottom: scaleHeight(15),
        paddingHorizontal: scaleWidth(16),

    },
    modalText: {
        textAlign: 'center',
        width: scaleWidth(68),
        height: scaleHeight(5),
        backgroundColor: '#C7C7C7',
        borderRadius: 8,
        alignSelf: 'center',
    },
    header: {
        marginTop: scaleHeight(20),
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    headerButton: {
        fontSize: 16,
        color: 'red',
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
    },
    radioButton: {
        width: scaleWidth(18),
        height: scaleHeight(18),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 10
    },
    radioButtonSelected: {
        width: 14,
        height: 14,
        borderRadius: 6,
        backgroundColor: '#0078d4',
    },
    groupTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: 'black'
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#E7EFFF',
        marginTop: scaleHeight(18),
        marginBottom: scaleHeight(15),
    },
    cancel: {
        fontSize: fontSize.size14,
        color: '#FF0000',
        fontWeight: '700',
        lineHeight: scaleHeight(24),
    },
});
export default CreateDirectoryModal;