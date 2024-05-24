import React, { useCallback, useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, Text as TextRN, View, PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import { SvgIcon } from '../../../components/svg-icon/index';
import { fontSize, scaleHeight, scaleWidth } from '../../../theme';
import { navigate } from '../../../navigators';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../../../assets';
import { AutoImage, Button, Text, TextField } from '../../../components';
import { Controller, useForm } from 'react-hook-form';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { validateFileSize } from '../../../utils/validate';
import { hideDialog, hideLoading, showDialog } from '../../../utils/toast';
import { translate } from 'i18n-js';
import { useStores } from '../../../models';

const EditDirectoryModal = (props: any) => {
    const { isVisible, setType, setIsVisible, category, onUpdateDirectory } = props;
    const {
        control,
        formState: { errors }, setValue
    } = useForm({
        mode: 'all',
    });
    const { productStore } = useStores();
    const [imagesNote, setImagesNote] = useState('')
    const [imagesUpload, setImagesUpload] = useState(null)
    const [modalImage, setModalImage] = useState(false)
    const [name, setName] = useState('');
    const isValidImageUrl = (url: string) => {
        return /\.(jpg|jpeg|png|gif)$/i.test(url);
    };
    const handleUpdateDirectory = () => {
        const selectedCategoryId = category.id
        const categoryImages = category.imageUrl || null
        // const imagesUpdate = imagesNote || '' 
        if (imagesNote !== categoryImages && imagesNote !== '') {
            handleUploadImages(name, imagesUpload, selectedCategoryId);
        }else{
            onUpdateDirectory(name, imagesNote, selectedCategoryId);
        }
        // setIsVisible(false);
    };
    useEffect(() => {
        console.log('first' , name)
        console.log('first' , imagesNote)

    },[name])
    useEffect(() => {
        if (category) {
            setName(category.name);
            setImagesNote(category.imageUrl);
            // setImagesUpload(category.imageUrl)
        } else {
            setName('');
            setImagesNote('');
        }
    }, [category]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const checkChanges = () => {
            const isNameChanged = name !== category.name && name !== '' ;
            const isImagesNoteChanged = imagesNote !== category.imageUrl ;
            setIsButtonDisabled(!isNameChanged && !isImagesNoteChanged);
        };
        checkChanges();
    }, [name, imagesNote]);
    const handleUploadImages = useCallback(
        async (name: any, imagesUpload: any, selectedCategoryId: any) => {
            console.log('fileSize-----------------', imagesUpload)
            const { fileSize, uri, type, fileName } = imagesUpload;
            console.log('first', imagesUpload)
            const checkFileSize = validateFileSize(fileSize)
            if (checkFileSize) {
                hideLoading()
            } else {
                const formData = new FormData();
                const file = {
                    uri: uri,
                    type: type,
                    name: fileName
                };
                formData.append("file", file);
                const imageUriUpload = await productStore.uploadImages(formData);
                console.log('checkkm', imageUriUpload)
                if (imageUriUpload) {
                    hideLoading()
                    onUpdateDirectory(name, imageUriUpload, selectedCategoryId)
                    // setIsVisible(false)
                    // setImagesNote()
                } else {
                    hideLoading()
                }
            }
        },
        [imagesUpload]
    );
    const requestCameraPermission = async () => {
        try {
            if (Platform.OS === 'ios') {
                const result = await request(PERMISSIONS.IOS.CAMERA);
                return result;
            } else {
                const result = await request(PERMISSIONS.ANDROID.CAMERA);
                return result;
            }
        } catch (error) {
            console.warn(error);
            return null;
        }
    };
    const checkCameraPermission = async () => {
        try {
            if (Platform.OS === 'ios') {
                const result = await check(PERMISSIONS.IOS.CAMERA);
                return result;
            } else {
                const result = await check(PERMISSIONS.ANDROID.CAMERA);
                return result;
            }
        } catch (error) {
            console.warn(error);
            return null;
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
                    setImagesNote(uri);
                    setImagesUpload({ fileSize, uri, type, fileName })
                    console.log('mmmmmmm', response?.assets[0]);
                    setModalImage(false)
                }
            })
        } else if (permissionStatus === RESULTS.DENIED) {
            const newStatus = await requestCameraPermission();
            if (newStatus === RESULTS.GRANTED) {
                console.log("Permission granted");
            } else {
                console.log("Permission denied");
                showDialog(translate("txtDialog.permission_allow"),'danger', translate("txtDialog.allow_permission_in_setting"), translate("common.cancel"), translate("txtDialog.settings"), () => {
                    Linking.openSettings()
                    hideDialog();
                })
            }
        } else if (permissionStatus === RESULTS.BLOCKED) {
            console.log("Permission blocked, you need to enable it from settings");
        }
    };
    const requestLibraryPermission = async () => {
        try {
            if (Platform.OS === 'ios') {
                const result = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
                return result;
            } else {
                const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
                return result;
            }
        } catch (error) {
            console.warn(error);
            return null;
        }
    };

    const checkLibraryPermission = async () => {
        try {
            if (Platform.OS === 'ios') {
                const result = await check(PERMISSIONS.IOS.MEDIA_LIBRARY);
                return result;
            } else {
                const result = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
                return result;
            }
        } catch (error) {
            console.warn(error);
            return null;
        }
    };
    // useEffect(()=> {
    //     console.log('first img ' , imagesNote)
    // },[imagesNote])
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
            launchImageLibrary(options, (response) => {
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
                    const { fileSize, uri, type, fileName } = response?.assets[0];

                    console.log('snasc', response?.assets[0])
                    setImagesNote(uri);
                    setImagesUpload({ fileSize, uri, type, fileName })
                    // setImagesNote(response?.assets[0].uri)
                    console.log('mmmmmmm', response?.assets[0]);
                    setModalImage(false)
                }
            })
        } else if (permissionStatus === RESULTS.DENIED) {
            const newStatus = await requestLibraryPermission();
            if (newStatus === RESULTS.GRANTED) {
                console.log("Permission granted");
            } else {
                console.log("Permission denied");
                showDialog(translate("txtDialog.permission_allow"),'danger', translate("txtDialog.allow_permission_in_setting"), translate("common.cancel"), translate("txtDialog.settings"), () => {
                    Linking.openSettings()
                    hideDialog();
                })
            }
        } else if (permissionStatus === RESULTS.BLOCKED) {
            console.log("Permission blocked, you need to enable it from settings");
        } else if (permissionStatus === RESULTS.UNAVAILABLE) {
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

                    const { fileSize, uri, type, fileName } = response?.assets[0];
                    // console.log('testttt' ,uri);
                    setImagesNote(uri);
                    setImagesUpload({ fileSize, uri, type, fileName })
                    // console.log('testtt' ,response);
                    setModalImage(false);
                }
            });
        };
    };
    const handleCloseModal = () => {
        setIsVisible(false);
    };
    const handleRemoveImage = () => {
        setImagesNote('') 
        setImagesUpload(null)
    }
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={handleCloseModal}>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <TextRN style={styles.modalText} />
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Chỉnh sửa danh mục</Text>
                    </View>
                    <View style={styles.horizontalLine} />

                    {imagesNote !== '' && isValidImageUrl(imagesNote) ? (
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
                            name="nameEditCategory"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextField
                                    keyboardType={null}
                                    labelTx={"productScreen.directoryName"}
                                    style={{ marginBottom: scaleHeight(5), justifyContent: 'center' }}
                                    defaultValue={name}
                                    inputStyle={{ fontSize: fontSize.size16, fontWeight: '500' }}
                                    value={name}  // Ensure this uses the local state
                                    onBlur={onBlur}
                                    RightIconClear={Images.icon_delete2}
                                    error={errors?.nameEditCategory?.message}
                                    onClearText={() => {
                                        onChange('');  // Clear the form value
                                        setName('');  // Clear the local state
                                    }}
                                    onChangeText={(value) => {
                                        onChange(value);  // Update the form value
                                        setName(value);  // Update the local state
                                    }}
                                    placeholderTx={"productScreen.placeholderDirectoryName"}
                                />
                            )}
                            rules={{ required: 'Please input data' }}
                        />

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: scaleHeight(15) }}>
                        <TouchableOpacity onPress={handleCloseModal} style={{ width: scaleWidth(150), height: scaleHeight(48), justifyContent: 'center', alignItems: 'center', borderWidth: 1, marginRight: scaleWidth(12), borderRadius: 10, borderColor: '#c8c8c8' }}>
                            <Text style={{ fontSize: fontSize.size14 }}>Huỷ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleUpdateDirectory}
                            disabled={isButtonDisabled}
                            style={{
                                width: scaleWidth(150),
                                height: scaleHeight(48),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                backgroundColor: isButtonDisabled ? 'gray' : '#0078d4',
                            }}
                        >
                            <Text tx='common.confirm' style={{ fontSize: fontSize.size14, color: 'white' }}/>
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
        marginVertical: scaleHeight(15),
        // marginBottom: 18,
    },
    cancel: {
        fontSize: fontSize.size14,
        color: '#FF0000',
        fontWeight: '700',
        lineHeight: scaleHeight(24),
    },
});

export default EditDirectoryModal;