import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Header, Screen, Text, TextField } from "../../../components";
import { Images } from "../../../../assets";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { styles } from "./styles";
import { InputSelect } from "../../../components/input-select/inputSelect";
import AddProduct from "../components/itemListProduct";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AutoHeightImage from "react-native-auto-height-image";
import { Positions } from "react-native-calendars/src/expandableCalendar";
import { Controller, useForm } from "react-hook-form";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import {
  MediaType,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import Modal from "react-native-modal";
import { translate } from "../../../i18n";
import moment from "moment";
import CustomCalendar from "../../../components/calendar";
import { MakeResult } from "mobx/dist/internal";
import ItemListProduct from "../components/itemListProduct";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../../components/dialog-notification";

export const NewInvoice: FC = observer(function NewInvoice(props) {
  const navigation = useNavigation();
  const paddingTop = useSafeAreaInsets().top;
  const heightScroll =
    Dimensions.get("window").height -
    scaleHeight(120) -
    scaleHeight(52) -
    paddingTop;
  const route = useRoute();
  const {
    control,
    formState: { errors },
  } = useForm();

  const [arrProduct, setArrProduct] = useState<{}[]>([]);
  const [isDeposit, setIsDeposit] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [isSortByDate, setIsSortByDate] = useState(false);
  const [isReset, setIReset] = useState<boolean>(false);
  const [imagesNote, setImagesNote] = useState("");
  const [markedDatesS, setMarkedDatesS] = useState("");
  const [markedDatesE, setMarkedDatesE] = useState("");
  const [deposit, setDeposit] = useState<number>(0);
  const handleLibraryUse = async () => {
    // const permissionStatus = await checkLibraryPermission();
    // console.log('ads')
    // console.log(permissionStatus)

    // if (permissionStatus === RESULTS.GRANTED) {
    const options = {
      cameraType: "back",
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
      } else if (response?.assets[0].uri) {
        //xử lý uri ảnh hoặc video
        setImagesNote(response?.assets[0].uri);
        console.log(response?.assets[0].uri);
        setModalImage(false);
      }
    });
    // } else if (permissionStatus === RESULTS.DENIED) {
    //     const newStatus = await requestLibraryPermission();
    //     if (newStatus === RESULTS.GRANTED) {
    //         console.log("Permission granted");
    //     } else {
    //         console.log("Permission denied");
    //         Alert.alert('Permission allow', 'Allow permission in setting', [{
    //             text: 'Settings',
    //             onPress: () => Linking.openSettings()
    //         },
    //         {
    //             text: 'Cancel',
    //             onPress: () => console.log('cancel')
    //         },
    //         ])
    //     }
    // } else if (permissionStatus === RESULTS.BLOCKED) {
    //     console.log("Permission blocked, you need to enable it from settings");
    // }
  };

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === "ios") {
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
      if (Platform.OS === "ios") {
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
    console.log(permissionStatus);

    if (permissionStatus === RESULTS.GRANTED) {
      console.log("You can use the camera");
      const options = {
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
          console.log(response?.assets[0].uri);
          setImagesNote(response?.assets[0].uri);
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
          type: ALERT_TYPE.WARNING,
          title: translate("txtDialog.permission_allow"),
          textBody: translate("txtDialog.allow_permission_in_setting"),
          button: translate("common.cancel"),
          button2: translate("txtDialog.settings"),
          closeOnOverlayTap: false,
          onPressButton: () => {
            Linking.openSettings();
            Dialog.hide();
             
          }
      })
      }
    } else if (permissionStatus === RESULTS.BLOCKED) {
      console.log("Permission blocked, you need to enable it from settings");
    }
  };

  const toggleModalDate = () => {
    setIsSortByDate(!isSortByDate);
  };

  const handleIncrease = (id) => {
    let newArr = arrProduct!.map((item) => {
      if (item.id === id) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    setArrProduct(newArr);
  };

  const handleDecrease = (id) => {
    let newArr = arrProduct!
      .map((item) => {
        if (item.id === id) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      })
      .filter((item) => item.qty > 0);
    setArrProduct(newArr);
    console.log(arrProduct);
  };

  const deleteItemProduct = (id) => {
    const newArr = arrProduct.filter((item) => item.id !== id);
    setArrProduct(newArr);
  };

  const arrPayment = [
    {
      id: 1,
      label: "Payment on delivery",
    },
    {
      id: 2,
      label: "Pay immediately",
    },
    {
      id: 3,
      label: "Debt",
    },
  ];

  const arrProducts = [
    {
      images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
      name: "Gạch 1566CB503 60x60 wrw asfsada ads",
      unit: "Hop",
      qty: 1,
      cost: "28.000.000",
      price: "28.000.000",
      id: 1,
    },
    {
      images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
      name: "Gạch 1566CB503 60x60",
      unit: "Hop",
      qty: 2,
      cost: "28.000.000",
      price: "28.000.000",
      id: 2,
    },
  ];

  useEffect(() => {
    setArrProduct(arrProducts);
  }, []);

  return (
    <View style={{ backgroundColor: colors.palette.aliceBlue }}>
      <Header
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        style={{ height: scaleHeight(52) }}
        headerTx={"order.confirm"}
        titleStyle={styles.textTitle}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          style={[
            styles.viewScrollVertical,
            {
              height:
                isDeposit === true
                  ? heightScroll - scaleHeight(64)
                  : heightScroll,
            },
          ]}>
          <View style={styles.viewListProduct}>
            <FlatList
              data={arrProduct}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <ItemListProduct
                      name={item.name}
                      unit={item.unit}
                      images={item.images}
                      cost={item.cost}
                      qty={item.qty.toString()}
                      onPressPlus={() => handleIncrease(item.id)}
                      onPressMinus={() => handleDecrease(item.id)}
                      onPress={() => deleteItemProduct(item.id)}
                    />
                    {index !== arrProduct.length - 1 ? (
                      <View
                        style={{
                          height: scaleHeight(1),
                          backgroundColor: colors.palette.ghostWhite,
                        }}
                      />
                    ) : null}
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={[
          styles.viewButtonOrder,
          {
            top:
              isDeposit === true
                ? Dimensions.get("window").height - scaleHeight(184)
                : Dimensions.get("window").height - scaleHeight(120),
          },
        ]}>
       
        {isDeposit === true ? (
          <View
            style={{
              flexDirection: "row",
              paddingBottom: scaleHeight(padding.padding_12),
            }}>
            <Text
              tx={"order.prepayment"}
              style={[styles.textTotal, { flex: 1 }]}
            />
            <Text style={styles.textTotal}>{deposit}</Text>
            <TouchableOpacity>
              <Images.icon_edit
                style={{ marginLeft: scaleWidth(margin.margin_6) }}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        {isDeposit === true ? (
          <View
            style={{
              flexDirection: "row",
              paddingBottom: scaleHeight(padding.padding_12),
            }}>
            <Text
              tx={"order.stillInDebt"}
              style={[styles.textTotal, { flex: 1 }]}
            />
            <Text
              style={[styles.textCost, { color: colors.palette.radicalRed }]}>
              84000000000
            </Text>
          </View>
        ) : null}
        <Button
          onPress={() => {}}
          tx={"order.order"}
          style={styles.buttonOrder}
          textStyle={styles.textButtonOrder}
        />
      </View>
      <CustomCalendar
        isReset={isReset}
        handleReset={() => setIReset(!isReset)}
        handleShort={() => {
          // handleOrderMerchant()
          toggleModalDate();
        }}
        onMarkedDatesChangeS={(markedDatesS) => {
          setMarkedDatesS(markedDatesS);
        }}
        onMarkedDatesChangeE={(markedDatesE) => {
          setMarkedDatesE(markedDatesE);
        }}
        isShowTabs={false}
        isSortByDate={isSortByDate}
        isOneDate={true}
        toggleModalDate={toggleModalDate}
      />
      <Modal isVisible={modalImage} style={{ alignItems: "center" }}>
        <View style={styles.viewModalImage}>
          <Text tx={"order.chooseImage"} style={styles.textTitleModalImage} />
          <View style={styles.viewLineModal} />
          <TouchableOpacity onPress={() => handleCameraUse()}>
            <Text tx={"order.newImage"} style={styles.textButtonModalImage} />
          </TouchableOpacity>
          <View style={styles.viewLineModal} />
          <TouchableOpacity onPress={() => handleLibraryUse()}>
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
});
