import React, { FC, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Linking, Platform, TouchableOpacity, View } from "react-native";
import { AutoImage, Text, TextField } from "../../../components";
import { styles } from "../new-order/styles";
import { Images } from "../../../../assets";
import Modal from "react-native-modal";
import { colors, padding, scaleHeight, scaleWidth } from "../../../theme";
import ImagesGroup from "../../product/component/imageGroup";
import {
  ALERT_TYPE,
  Dialog,
  Loading,
  Toast,
} from "../../../components/dialog-notification";
import { translate } from "../../../i18n/translate";
import { RESULTS } from "react-native-permissions";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  checkCameraPermission,
  checkLibraryPermission,
  requestCameraPermission,
  requestLibraryPermission,
} from "../../../utils/requesPermissions";
import {
  checkArrayIsEmptyOrNull,
  validateFileSize,
} from "../../../utils/validate";
import { useStores } from "../../../models";

interface InputNote {
  note: boolean;
  setNoteData: (note: string, arr: []) => void;
  dataNote?: string;
}

export const ShowNote = (props: InputNote) => {
  const [modalImage, setModalImage] = useState(false);
  const { productStore } = useStores();
  const [imagesNote, setImagesNote] = useState<any>([]);
  const {
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const handleDeleteImage = () => {
    setImagesNote([]);
  };
  const handleDeleteImageItem = () => {
    const newArr1 = imagesNote.slice();
    newArr1.splice(productStore.imageModalIndex, 1);
    setImagesNote(newArr1);
  };

  const handleLibraryUse = async () => {
    const permissionStatus = await checkLibraryPermission();
    const numberUrl = checkArrayIsEmptyOrNull(imagesNote)
      ? 0
      : imagesNote.length;
    console.log("----------------indexItem-----------------", numberUrl);
    if (permissionStatus === RESULTS.GRANTED) {
      const options = {
        cameraType: "back",
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
        selectionLimit: 6 - numberUrl,
      };
      launchImageLibrary(options, (response) => {
        console.log("==========> response4564546", response);
        if (response.didCancel) {
          console.log("User cancelled photo picker1");
        } else if (response.errorCode) {
          console.log("ImagePicker Error2: ", response.errorCode);
        } else if (response.errorCode) {
          console.log("User cancelled photo picker1");
        } else if (response?.assets && response.assets.length > 0) {
          const selectedAssets = response.assets.map((asset) => asset);
          uploadImages(selectedAssets);
        }
      });
    } else if (permissionStatus === RESULTS.DENIED) {
      const newStatus = await requestLibraryPermission();
      if (newStatus === RESULTS.GRANTED) {
        console.log("Permission granted");
      } else {
        console.log("Permission denied");
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "",
          textBody: translate("txtToats.permission_denied"),
        });

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
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "",
        textBody: translate("txtToats.permission_blocked"),
      });

      console.log("Permission blocked, you need to enable it from settings");
    } else if (permissionStatus === RESULTS.UNAVAILABLE) {
      const options = {
        cameraType: "back",
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
        selectionLimit: 6 - numberUrl,
      };
      launchImageLibrary(options, (response) => {
        console.log("==========> response4564546", response);
        if (response.didCancel) {
          console.log("User cancelled photo picker1");
        } else if (response.errorCode) {
          console.log("ImagePicker Error2: ", response.errorCode);
        } else if (response.errorCode) {
          console.log("User cancelled photo picker1");
        } else if (response?.assets && response.assets.length > 0) {
          const selectedAssets = response.assets.map((asset) => asset);
          if (selectedAssets.length + numberUrl > 6) {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "",
              textBody: translate("txtToats.required_maximum_number_of_photos"),
            });
          } else {
            uploadImages(selectedAssets);
          }
        }
      });
    }
  };

  const handleCameraUse = async () => {
    const permissionStatus = await checkCameraPermission();
    const numberUrl = checkArrayIsEmptyOrNull(imagesNote)
      ? 0
      : imagesNote.length;
    console.log(permissionStatus);

    if (permissionStatus === RESULTS.GRANTED) {
      console.log("You can use the camera");
      const options = {
        cameraType: "back",
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
        selectionLimit: 6 - numberUrl,
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
          console.log(response?.assets[0].uri);
          const imageAssets = [response?.assets[0]];
          setModalImage(false);
          uploadImages(imageAssets);
        }
      });
    } else if (permissionStatus === RESULTS.DENIED) {
      const newStatus = await requestCameraPermission();
      if (newStatus === RESULTS.GRANTED) {
        console.log("Permission granted");
      } else {
        console.log("Permission denied");
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "",
          textBody: translate("txtToats.permission_denied"),
        });
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
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "",
        textBody: translate("txtToats.permission_blocked"),
      });
      console.log("Permission blocked, you need to enable it from settings");
    }
  };

  const uploadImages = async (imageArray: any[]) => {
    try {
      const uploadPromises = imageArray.map(async (image: any, index: any) => {
        const { fileSize, uri, type, fileName } = image;
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
        } else {
          const formData = new FormData();
          formData.append("file", {
            uri,
            type,
            name: fileName,
          });
          // Trả về một promise chứa cả vị trí của hình ảnh trong mảng
          return await productStore.uploadImages(formData);
        }
      });

      // Gửi các yêu cầu upload đồng thời và chờ cho đến khi tất cả hoàn thành
      const results = await Promise.all(uploadPromises);
      let hasNull = results.some((item) => item === null);
      if (!hasNull) {
        console.log("results-------123 : ", JSON.stringify(results));
        const newArr = imagesNote.concat(results);
        setImagesNote(newArr);
        props.setNoteData(getValues("noteText"), newArr);
      }
      // Xử lý kết quả upload
      results.forEach((result, index) => {
        if (result) {
          console.log(`Upload image ${imageArray[index]} successfully`);
        } else {
          console.log(`Failed to upload image ${imageArray[index]}`);
        }
      });
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <View>
      {props.note === true ? (
        <View style={styles.viewNote}>
          <View style={{ flex: 1 }}>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextField
                  keyboardType={null}
                  // labelTx={"order.address"}
                  style={styles.viewTextfieldNote}
                  inputStyle={{
                    marginBottom:
                      Platform.OS === "ios"
                        ? scaleHeight(padding.padding_8)
                        : 0,
                  }}
                  value={value != undefined ? value : props.dataNote}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                    props.setNoteData(value, imagesNote);
                  }}
                  // onClearText={() => onChange("")}
                  showRightIcon={false}
                  // RightIconClear={Images.icon_delete2}
                  multiline={true}
                  placeholderTx={"order.placeNote"}
                  placeholderTextColor={colors.palette.nero}
                  //isImportant={true}
                  // error={errors?.phone?.message}
                />
              )}
              name="noteText"
              // rules={{ required: "Address is required" }}
            />
          </View>

          <TouchableOpacity onPress={() => setModalImage(true)}>
            <TouchableOpacity
              // key={index}
              onPress={() => {
                setModalImage(true);
                // setModalImages(true);
                // setActiveSlide(index);
              }}>
              <ImagesGroup
                arrData={imagesNote || []}
                onPressOpenLibrary={() => {
                  if (imagesNote !== undefined) {
                    if (imagesNote?.length < 6) {
                      setModalImage(true);
                    } else {
                      Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: "",
                        textBody: translate(
                          "txtToats.required_maximum_number_of_photos"
                        ),
                      });
                    }
                  } else {
                    setModalImage(true);
                  }
                }}
                onPressDelete={() => handleDeleteImage()}
                onPressDelete1={() => handleDeleteImageItem()}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.setNote(false)}
            style={{ position: "absolute", right: 6, top: 6 }}>
            {/* <Images.icon_deleteDolphin /> */}
          </TouchableOpacity>
        </View>
      ) : null}
      <Modal isVisible={modalImage} style={{ alignItems: "center" }}>
        <View style={styles.viewModalImage}>
          <Text tx={"order.chooseImage"} style={styles.textTitleModalImage} />
          <View style={styles.viewLineModal} />
          <TouchableOpacity
            onPress={() => {
              setModalImage(false);
              setTimeout(handleCameraUse, 300);
            }}>
            <Text tx={"order.newImage"} style={styles.textButtonModalImage} />
          </TouchableOpacity>
          <View style={styles.viewLineModal} />
          <TouchableOpacity
            onPress={() => {
              setModalImage(false);
              setTimeout(handleLibraryUse, 300);
            }}>
            <Text
              tx={"order.chooseLibrary"}
              style={styles.textButtonModalImage}
            />
          </TouchableOpacity>
          <View style={styles.viewLineModal} />
          <TouchableOpacity onPress={() => setModalImage(false)}>
            <Text tx={"common.cancel"} style={styles.textButtonModalImage} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
