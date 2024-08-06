import { useFocusEffect } from "@react-navigation/native";
import React, { memo, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { RESULTS } from "react-native-permissions";
import { Svgs } from "../../../../../../assets/svgs";
import { AutoImage, Text, TextField } from "../../../../../components";
import { CustomModal } from "../../../../../components/custom-modal";
import {
  ALERT_TYPE,
  Dialog,
  Loading,
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
import { stylesCreateDirectory } from "../../styles";

const CreateDirectoryModal = (props: any) => {
  const { isVisible, setIsVisible, onCreateDirectory } = props;
  const { categoryStore } = useStores();
  const handleCreateDirectory = async (name: any, imageUrl: any) => {
    const result = await categoryStore.getCreateCategories(name, imageUrl);
    if (result.kind === "ok") {
      console.log("Tạo danh mục thành công", result.response);
      onCreateDirectory(result.response.message, result.kind);
      setIsVisible(false);
    } else {
      console.log(
        "Tạo danh mục thất bại",
        result.response.errorCodes[0].message
      );
      onCreateDirectory(result.response.errorCodes[0].message);
    }
  };
  const {
    control,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const { productStore } = useStores();
  const [imagesNote, setImagesNote] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleCreateButtonPress = async () => {
    setShowLoading(true);
    handleCreateDirectory(getValues("nameCategory"), imagesNote)
      .then((result: any) => {
        setShowLoading(false);
      })
      .catch((error: any) => {
        setShowLoading(false);
      });
  };
  const uploadImages = async (imageNote: any) => {
    try {
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
      setShowLoading(true);
      // Upload ảnh
      const result = await productStore.uploadImages(formData, false);

      console.log(`successfully----------`, result);
      if (result) {
        console.log(`imageNote---------------`, imageNote);
        setImagesNote(result);
      }
      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  const handleCameraUse = async () => {
    const permissionStatus = await checkCameraPermission();
    console.log(permissionStatus);

    if (permissionStatus === RESULTS.GRANTED) {
      console.log("You can use the camera");
      const options: any = {
        cameraType: "back",
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
        } else if (response?.assets[0].uri) {
          const { fileSize, uri, type, fileName } = response?.assets[0];
          const result = { fileSize, uri, type, fileName };
          console.log("testtt", result);
          uploadImages(result);
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
      const options: any = {
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
          const result = { fileSize, uri, type, fileName };
          console.log("testtt", result);
          uploadImages(result);
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
      const options: any = {
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
          const result = { fileSize, uri, type, fileName };
          console.log("testtt", result);
          uploadImages(result);
        }
      });
    }
  };
  const handleCloseModal = () => {
    setShowLoading(false);
    setIsVisible(false);
  };
  const handleRemoveImage = () => {
    setImagesNote("");
  };
  useFocusEffect(
    useCallback(() => {
      setImagesNote("");
      setShowLoading(false);
      reset();
      clearErrors();
    }, [isVisible])
  );
  return (
    <CustomModal
      isVisible={isVisible}
      setIsVisible={handleCloseModal}
      isHideKeyBoards={isVisible}
      isVisibleLoading={showLoading}>
      <View style={styles.modalView}>
        <Text style={styles.modalText} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {translate("productScreen.create_directory")}
          </Text>
        </View>
        <View style={styles.horizontalLine} />
        {imagesNote !== "" ? (
          <View style={{ flexDirection: "row", marginBottom: scaleHeight(20) }}>
            <View
              style={{ flexDirection: "column", marginRight: scaleHeight(20) }}>
              <TouchableOpacity
                onPress={handleLibraryUse}
                style={stylesCreateDirectory.handleLib}>
                <Svgs.ic_addImages
                  width={scaleWidth(16)}
                  height={scaleHeight(16)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCameraUse}
                style={stylesCreateDirectory.handleCamera}>
                <Svgs.ic_camera
                  width={scaleWidth(16)}
                  height={scaleHeight(16)}
                />
              </TouchableOpacity>
            </View>
            <View>
              <AutoImage
                style={stylesCreateDirectory.autoImage}
                source={{ uri: imagesNote }}
              />
              <TouchableOpacity
                style={stylesCreateDirectory.viewClose}
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
              style={{ flexDirection: "row", marginBottom: scaleHeight(20) }}>
              <TouchableOpacity
                onPress={handleLibraryUse}
                style={stylesCreateDirectory.handleLib2}>
                <View style={stylesCreateDirectory.viewAddImage}>
                  <Svgs.ic_addImages
                    width={scaleWidth(16)}
                    height={scaleHeight(16)}
                  />
                  <Text
                    style={{
                      fontSize: fontSize.size14,
                      color: colors.navyBlue,
                    }}>
                    {translate("createProductScreen.uploadImage")}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCameraUse}
                style={stylesCreateDirectory.handleCamera2}>
                <View style={stylesCreateDirectory.viewIcCamera}>
                  <Svgs.ic_camera
                    width={scaleWidth(16)}
                    height={scaleHeight(16)}
                  />
                  <Text
                    style={{
                      fontSize: fontSize.size14,
                      color: colors.navyBlue,
                    }}>
                    {translate("createProductScreen.openCamera")}
                  </Text>
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
                  justifyContent: "center",
                }}
                inputStyle={{ fontSize: fontSize.size16, fontWeight: "500" }}
                isImportant={true}
                value={value}
                onBlur={onBlur}
                RightIconClear={Svgs.icon_delete2}
                error={errors?.nameCategory?.message}
                onClearText={() => {
                  onChange("");
                }}
                onChangeText={(value) => {
                  onChange(value);
                }}
                placeholderTx={"productScreen.placeholderDirectoryName"}
              />
            )}
            name="nameCategory"
            rules={{
              required: translate("messageError.required_value_null"),
            }}
          />
        </View>
        <View style={stylesCreateDirectory.viewButton1}>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={stylesCreateDirectory.handleOnClickClose}>
            <Text style={{ fontSize: fontSize.size14 }}>
              {translate("common.cancel")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit(handleCreateButtonPress)}
            style={stylesCreateDirectory.handleSubmit}>
            <Text style={{ fontSize: fontSize.size14, color: "white" }}>
              {translate("common.create")}
            </Text>
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
    // marginRight: 10
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
    marginTop: scaleHeight(18),
    marginBottom: scaleHeight(15),
  },
  cancel: {
    fontSize: fontSize.size14,
    color: colors.red,
    fontWeight: "700",
    lineHeight: scaleHeight(24),
  },
});
export default memo(CreateDirectoryModal);
