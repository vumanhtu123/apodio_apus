import React, { memo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  Text as TextRN,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from "react-native-image-picker";
import Modal from "react-native-modal";
import { RESULTS } from "react-native-permissions";
import { Svgs } from "../../../../../../assets/svgs";
import { AutoImage, Text, TextField } from "../../../../../components";
import {
  ALERT_TYPE,
  Dialog,
  Loading
} from "../../../../../components/dialog-notification";
import { translate } from "../../../../../i18n/translate";
import { useStores } from "../../../../models";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../../theme";
import {
  checkCameraPermission,
  checkLibraryPermission,
  requestCameraPermission,
  requestLibraryPermission,
} from "../../../../utils/requesPermissions";
import { validateFileSize } from "../../../../utils/validate";
import { CustomModal } from "../../../../../components/custom-modal";

const EditDirectoryModal = (props: any) => {
  const { isVisible, setType, setIsVisible, category, onUpdateDirectory } =
    props;
  const {
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "all",
  });
  const { productStore, categoryStore } = useStores();
  const [imagesNote, setImagesNote] = useState("");
  const [imagesUpload, setImagesUpload] = useState(null);
  const [modalImage, setModalImage] = useState(false);
  const [name, setName] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const isValidImageUrl = (url: string) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  };
  const handleUpdateDirectoryApi = async (
    name: string,
    imageUrl: string,
    productCategoryId: number
  ) => {
    const result = await categoryStore.getUpdateCategories(
      name,
      imageUrl,
      productCategoryId
    );
    if (result.kind === "ok") {
      onUpdateDirectory(result.response.message, result.kind)
      setIsVisible(false);
    } else {
      onUpdateDirectory(result.response.errorCodes[0].message);
    }
  };
  const handleUpdateDirectory = () => {
    setShowLoading(true)
    const selectedCategoryId = category.id;
    // onUpdateDirectory(name, imagesNote, selectedCategoryId);
    handleUpdateDirectoryApi(name, imagesNote, selectedCategoryId).then((result: any) => {
      setShowLoading(false);
    }).catch((error: any) => {
      setShowLoading(false);
    });
    // setIsVisible(false);
  };
  useEffect(() => {
    if (category) {
      setName(category.name);
      setImagesNote(category.imageUrl);
      // setImagesUpload(category.imageUrl)
    } else {
      setName("");
      setImagesNote("");
    }
  }, [category]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const checkChanges = () => {
      const isNameChanged = name !== category.name && name !== "";
      const isImagesNoteChanged = imagesNote !== category.imageUrl;
      setIsButtonDisabled(!isNameChanged && !isImagesNoteChanged);
    };
    checkChanges();
  }, [name, imagesNote]);
  const uploadImages = async (imageNote: any) => {
    try {
      console.log("đâsads", imageNote);
      const { fileSize, uri, type, fileName } = imageNote;
      const checkFileSize = validateFileSize(fileSize);

      if (checkFileSize) {
        Loading.hide();
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: translate("txtDialog.txt_title_dialog"),
          textBody: translate("txtDialog.imageUploadExceedLimitedSize"),
          button: translate("common.ok"),
          closeOnOverlayTap: false,
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", {
        uri,
        type,
        name: fileName,
      });
      setShowLoading(true)

      // Upload ảnh
      const result = await productStore.uploadImages(formData, false);

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
      setShowLoading(false)

    } catch (error) {
      console.error("Error uploading image:", error);
      setShowLoading(false)

    }
  };

  const handleCameraUse = async () => {
    const permissionStatus = await checkCameraPermission();
    console.log(permissionStatus);

    if (permissionStatus === RESULTS.GRANTED) {
      console.log("You can use the camera");
      const options: CameraOptions = {
        cameraType: "back",
        mediaType: 'photo',
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
      };
      launchCamera(options, (response) => {
        console.log("==========> response1233123", response);
        if (response.didCancel) {
          console.log("User cancelled photo picker1");
        } else if (response.errorCode) {
          console.log("ImagePicker Error2: ", response.errorCode);
        } else if (response.errorCode) {
          console.log("User cancelled photo picker1");
        } else if (response?.assets) {
          const { fileSize, uri, type, fileName } = response?.assets[0];
          const result = { fileSize, uri, type, fileName };
          console.log("testtt", result);
          uploadImages(result);
          setModalImage(false);
        }
      });
    } else if (permissionStatus === RESULTS.DENIED) {
      const newStatus = await requestCameraPermission();
      if (newStatus === RESULTS.GRANTED) {
        console.log("Permission granted");
      } else {
        console.log("Permission denied");
        Dialog.show({
          type: ALERT_TYPE.INFO,
          title: translate("txtDialog.permission_allow"),
          textBody: translate("txtDialog.allow_permission_in_setting"),
          button: translate("common.cancel"),
          button2: translate("txtDialog.settings"),
          closeOnOverlayTap: false,
          onPressButton: () => {
            Linking.openSettings();
            Dialog.hide();
          },
        });
      }
    } else if (permissionStatus === RESULTS.BLOCKED) {
      console.log("Permission blocked, you need to enable it from settings");
    }
  };

  const handleLibraryUse = async () => {
    const permissionStatus = await checkLibraryPermission();
    console.log("ads");
    console.log(permissionStatus);

    if (permissionStatus === RESULTS.GRANTED) {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
      };
      launchImageLibrary(options, (response) => {
        console.log("==========> response4564546", response);
        if (response.didCancel) {
          console.log("User cancelled photo picker1");
        } else if (response.errorCode) {
          console.log("ImagePicker Error2: ", response.errorCode);
        } else if (response.errorCode) {
          console.log("User cancelled photo picker1");
        } else if (response?.assets) {
          //xử lý uri ảnh hoặc video
          const { fileSize, uri, type, fileName } = response?.assets[0];
          const result = { fileSize, uri, type, fileName };
          console.log("testtt", result);
          uploadImages(result);
          setModalImage(false);
        }
      });
    } else if (permissionStatus === RESULTS.DENIED) {
      const newStatus = await requestLibraryPermission();
      if (newStatus === RESULTS.GRANTED) {
        console.log("Permission granted");
      } else {
        console.log("Permission denied");
        Dialog.show({
          type: ALERT_TYPE.INFO,
          title: translate("txtDialog.permission_allow"),
          textBody: translate("txtDialog.allow_permission_in_setting"),
          button: translate("common.cancel"),
          button2: translate("txtDialog.settings"),
          closeOnOverlayTap: false,
          onPressButton: () => {
            Linking.openSettings();
            Dialog.hide();
          },
        });
      }
    } else if (permissionStatus === RESULTS.BLOCKED) {
      console.log("Permission blocked, you need to enable it from settings");
    } else if (permissionStatus === RESULTS.UNAVAILABLE) {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
      };
      launchImageLibrary(options, (response) => {
        console.log("==========> response4564546", response);
        if (response.didCancel) {
          console.log("User cancelled photo picker1");
        } else if (response.errorCode) {
          console.log("ImagePicker Error2: ", response.errorCode);
        } else if (response.errorCode) {
          console.log("User cancelled photo picker1");
        } else if (response?.assets) {
          const { fileSize, uri, type, fileName } = response?.assets[0];
          const result = { fileSize, uri, type, fileName };
          console.log("testtt", result);
          uploadImages(result);
          setModalImage(false);
        }
      });
    }
  };
  const handleCloseModal = () => {
    setShowLoading(false)
    setIsVisible(false);
  };
  const handleRemoveImage = () => {
    setImagesNote("");
    setImagesUpload(null);
  };
  return (
    <CustomModal
      isVisible={isVisible}
      setIsVisible={handleCloseModal}
      isHideKeyBoards={isVisible}
      isVisibleLoading={showLoading}>
      <View style={styles.modalView}>
        <TextRN style={styles.modalText} />
        <View style={styles.header}>
          <Text
            tx="productScreen.refactorCategories"
            style={styles.headerTitle}></Text>
        </View>
        <View style={styles.horizontalLine} />

        {imagesNote !== "" && isValidImageUrl(imagesNote) ? (
          <View
            style={{ flexDirection: "row", marginBottom: scaleHeight(20) }}>
            <View
              style={{
                flexDirection: "column",
                marginRight: scaleHeight(20),
              }}>
              <TouchableOpacity
                onPress={handleLibraryUse}
                style={styles.handlerLibUse}>
                <Svgs.ic_addImages
                  width={scaleWidth(16)}
                  height={scaleHeight(16)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCameraUse}
                style={styles.handlerCameraUse}>
                <Svgs.ic_camera
                  width={scaleWidth(16)}
                  height={scaleHeight(16)}
                />
              </TouchableOpacity>
            </View>
            <View>
              <AutoImage
                style={{
                  width: scaleWidth(107),
                  height: scaleHeight(70),
                  borderRadius: 8,
                }}
                source={{ uri: imagesNote }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: scaleWidth(5),
                  top: scaleHeight(5),
                }}
                onPress={() => handleRemoveImage()}>
                <Svgs.circle_close
                  width={scaleWidth(16)}
                  height={scaleHeight(16)}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                marginBottom: scaleHeight(20),
              }}>
              <TouchableOpacity
                onPress={handleLibraryUse}
                style={styles.handleLibUse2}>
                <View style={styles.viewIcAdd}>
                  <Svgs.ic_addImages
                    width={scaleWidth(16)}
                    height={scaleHeight(16)}
                  />
                  <Text
                    tx="productScreen.uploadImage"
                    style={{
                      fontSize: fontSize.size14,
                      color: colors.navyBlue,
                    }}></Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCameraUse}
                style={styles.handleCameraUse2}>
                <View style={styles.viewIcCamera}>
                  <Svgs.ic_camera
                    width={scaleWidth(16)}
                    height={scaleHeight(16)}
                  />
                  <Text
                    tx={"productScreen.camera"}
                    style={{
                      fontSize: fontSize.size14,
                      color: colors.navyBlue,
                    }}></Text>
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
                style={{
                  marginBottom: scaleHeight(5),
                  justifyContent: "center",
                }}
                defaultValue={name}
                inputStyle={{
                  fontSize: fontSize.size16,
                  fontWeight: "500",
                }}
                value={name} // Ensure this uses the local state
                onBlur={onBlur}
                RightIconClear={Svgs.icon_delete2}
                error={errors?.nameEditCategory?.message}
                onClearText={() => {
                  onChange(""); // Clear the form value
                  setName(""); // Clear the local state
                }}
                onChangeText={(value) => {
                  onChange(value); // Update the form value
                  setName(value); // Update the local state
                }}
                placeholderTx={"productScreen.placeholderDirectoryName"}
              />
            )}
            rules={{ required: translate("ruleController.emptyText") }}
          />
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={styles.buttonClose}>
            <Text style={{ fontSize: fontSize.size14 }} tx="productScreen.cancel"></Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleUpdateDirectory}
            disabled={isButtonDisabled}
            style={[
              styles.buttonConfirm,
              { backgroundColor: isButtonDisabled ? "gray" : colors.navyBlue },
            ]}>
            <Text
              tx="common.confirm"
              style={{ fontSize: fontSize.size14, color: "white" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalView: {
    backgroundColor: colors.white,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    paddingTop: scaleHeight(8),
    paddingHorizontal: scaleWidth(16),
  },
  modalText: {
    textAlign: "center",
    width: scaleWidth(68),
    height: scaleHeight(5),
    backgroundColor: colors.veryLightGrey1,
    borderRadius: 8,
    alignSelf: "center",
  },
  header: {
    marginTop: scaleHeight(20),
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  headerButton: {
    fontSize: 16,
    color: "red",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.whisper,
  },
  optionText: {
    fontSize: 16,
  },
  radioButton: {
    width: scaleWidth(18),
    height: scaleHeight(18),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.veryLightGrey2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    width: scaleWidth(14),
    height: scaleHeight(14),
    borderRadius: 6,
    backgroundColor: colors.navyBlue,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(10),
    color: "black",
  },
  horizontalLine: {
    height: 1,
    backgroundColor: colors.solitude2,
    marginVertical: scaleHeight(15),
    // marginBottom: 18,
  },
  cancel: {
    fontSize: fontSize.size14,
    color: colors.red,
    fontWeight: "700",
    lineHeight: scaleHeight(24),
  },
  handlerLibUse: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.navyBlue,
    borderRadius: 8,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(7),
    marginBottom: scaleHeight(10),
  },
  handlerCameraUse: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.navyBlue,
    borderRadius: 8,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(7),
  },
  handleLibUse2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.navyBlue,
    marginRight: scaleWidth(10),
    borderRadius: 8,
  },
  viewIcAdd: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(7),
  },
  handleCameraUse2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.navyBlue,
    borderRadius: 8,
  },
  viewIcCamera: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(7),
  },
  viewButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: scaleHeight(15),
  },
  buttonClose: {
    width: scaleWidth(166),
    height: scaleHeight(48),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginRight: scaleWidth(12),
    borderRadius: 10,
    borderColor: colors.veryLightGrey,
  },
  buttonConfirm: {
    width: scaleWidth(166),
    height: scaleHeight(48),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default memo(EditDirectoryModal);
