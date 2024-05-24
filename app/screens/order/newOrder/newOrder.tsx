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
import { panHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler";
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
import ImagesGroup from "../../product/component/imageGroup";
import { showDialog } from "../../../utils/toast";

export const NewOrder: FC = observer(function NewOrder(props) {
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
  const [payment, setPayment] = useState({ label: "" });
  const [addressChoice, setAddressChoice] = useState(false);
  const [note, setNote] = useState(false);
  const [desiredDate, setDesiredDate] = useState(false);
  const [isDeposit, setIsDeposit] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [isSortByDate, setIsSortByDate] = useState(false);
  const [isReset, setIReset] = useState<boolean>(false);
  const [imagesNote, setImagesNote] = useState("");
  const [markedDatesS, setMarkedDatesS] = useState("");
  const [markedDatesE, setMarkedDatesE] = useState("");
  const [deposit, setDeposit] = useState<number>(0);

  const requestLibraryPermission = async () => {
    try {
      if (Platform.OS === "ios") {
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
      if (Platform.OS === "ios") {
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
        showDialog(
          translate("txtDialog.permission_allow"),
          "danger",
          translate("txtDialog.allow_permission_in_setting"),
          translate("common.cancel"),
          translate("txtDialog.settings"),
          () => {
            Linking.openSettings();
            hideDialog();
          }
        );
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
          <View style={styles.viewSupplier}>
            <Text
              tx={"order.supplier"}
              style={[
                styles.textTotal,
                {
                  paddingBottom: scaleHeight(padding.padding_16),
                },
              ]}
            />
            <View style={{ flexDirection: "row" }}>
              <Text text="NCC00001" style={[styles.textContent, { flex: 1 }]} />
              <Images.icon_caretRight2 />
            </View>
            <Text
              text="Cong ty TNHH Mat Troi Hong"
              style={[
                styles.textContent,
                { marginVertical: scaleHeight(margin.margin_8) },
              ]}
            />
            <Text text="Nguyen Ngoc Anh" style={styles.textContent} />
          </View>
          <View style={styles.viewAddress}>
            <Text
              tx={"order.deliveryAddress"}
              style={[
                styles.textTotal,
                {
                  paddingBottom: scaleHeight(padding.padding_16),
                },
              ]}
            />
            <View style={styles.viewAddressChoice}>
              <TouchableOpacity
                onPress={() => setAddressChoice(!addressChoice)}
                style={styles.viewBorderCircleAddressChoice}>
                <View
                  style={[
                    styles.viewCircleAddressChoice,
                    {
                      backgroundColor:
                        addressChoice === false
                          ? colors.palette.navyBlue
                          : colors.palette.neutral100,
                    },
                  ]}></View>
              </TouchableOpacity>
              <Text
                tx={"order.warehouseAddress"}
                style={styles.textAddressChoice}
              />
            </View>
            <View style={styles.viewAddressChoice}>
              <TouchableOpacity
                onPress={() => setAddressChoice(!addressChoice)}
                style={styles.viewBorderCircleAddressChoice}>
                <View
                  style={[
                    styles.viewCircleAddressChoice,
                    {
                      backgroundColor:
                        addressChoice === true
                          ? colors.palette.navyBlue
                          : colors.palette.neutral100,
                    },
                  ]}></View>
              </TouchableOpacity>
              <Text
                tx={"order.specificAddress"}
                style={styles.textAddressChoice}
              />
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  text="Cong ty TNHH Mat Troi Hong"
                  style={[styles.textContent, { flex: 1 }]}
                />
                <Images.icon_caretRight2 />
              </View>
              <Text
                text="02466876656"
                style={[
                  styles.textContent,
                  { marginVertical: scaleHeight(margin.margin_8) },
                ]}
              />
              <Text
                text="85 Hang Bai, Hoan Kiem, HN"
                style={styles.textContent}
              />
            </View>
          </View>
          <View style={styles.viewNameCompany}>
            <AutoHeightImage
              height={32}
              width={32}
              style={{
                borderRadius: 16,
                marginRight: scaleWidth(margin.margin_8),
              }}
              source={{
                uri: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
              }}
              fallbackSource={Images.avatarError}
            />
            <Text
              text="Cong ty TNHH mot thanh vien Apodio"
              style={[
                styles.textContent,
                {
                  marginRight: scaleWidth(margin.margin_4),
                },
              ]}
            />
            {/* <Images.icon_copy2 /> */}
          </View>
          <View style={styles.viewListProduct}>
            <Button style={styles.buttonListProduct}>
              <Images.icon_add />
              <Text
                tx={"order.addProduct"}
                style={styles.textButtonListProduct}
              />
            </Button>
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
          <View style={styles.viewPaymentMethod}>
            <InputSelect
              required={true}
              hintTx={"order.selectPayment"}
              titleTx={"order.paymentMethods"}
              arrData={arrPayment}
              onPressChoice={(item) => {
                setPayment(item);
              }}
              dataDefault={payment.label}
            />
          </View>
          <View style={styles.viewVoucher}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.textVoucher, { flex: 1 }]}>
                {translate("order.total") +
                  " " +
                  arrProduct.length +
                  " " +
                  translate("order.product")}
              </Text>
              <Text
                style={[styles.textVoucher, { color: colors.palette.nero }]}>
                84000000
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("promotion" as any)}
              style={{
                flexDirection: "row",
                marginTop: scaleHeight(margin.margin_20),
              }}>
              <Images.icon_tag height={16} width={16} />
              <Text
                style={[
                  styles.textVoucher,
                  {
                    flex: 1,
                    marginLeft: scaleWidth(margin.margin_6),
                  },
                ]}
                tx={"order.applyPromoHint"}
              />
              <Images.icon_caretRight2 height={16} width={16} />
            </TouchableOpacity>
          </View>
          {note === true ? (
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
                      value={value}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      onClearText={() => onChange("")}
                      RightIconClear={Images.icon_delete2}
                      multiline={true}
                      placeholderTx={"order.placNote"}
                      placeholderTextColor={colors.palette.nero}
                      // isImportant={true}
                      // error={errors?.phone?.message}
                    />
                  )}
                  name="noteText"
                  // rules={{ required: "Address is required" }}
                />
              </View>
              {imagesNote === "" ? (
                <TouchableOpacity onPress={() => setModalImage(true)}>
                  <Images.icon_image />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setModalImage(true)}>
                  <Image
                    source={{ uri: imagesNote }}
                    height={scaleHeight(48)}
                    width={scaleWidth(48)}
                    resizeMode="cover"
                    style={{ borderRadius: 8 }}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => setNote(false)}
                style={{ position: "absolute", right: 6, top: 6 }}>
                <Images.icon_deleteDolphin />
              </TouchableOpacity>
            </View>
          ) : null}
          {desiredDate === true ? (
            <View
              style={{
                flexDirection: "row",
                marginBottom: scaleHeight(margin.margin_15),
                alignItems: "center",
              }}>
              <TouchableOpacity onPress={() => setDesiredDate(false)}>
                <Images.icon_deleteDolphin />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsSortByDate(true)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: scaleWidth(margin.margin_8),
                }}>
                <Images.icon_calendar />
                <Text
                  style={[
                    styles.textDate,
                    { marginHorizontal: scaleWidth(margin.margin_4) },
                  ]}>
                  {translate("order.desiredDate") +
                    ": " +
                    moment(
                      markedDatesS === "" ? new Date() : markedDatesS
                    ).format("MMMM DD, YYYY")}
                </Text>
                <Images.icon_caretDownBlue />
              </TouchableOpacity>
            </View>
          ) : null}
          <Text
            tx={"order.moreInformation"}
            style={[
              styles.textTotal,
              {
                color: colors.palette.neutral900,
                marginBottom: scaleHeight(margin.margin_12),
              },
            ]}
          />
          <View style={styles.viewMoreInformation}>
            <Images.icon_gear
              style={{ marginRight: scaleWidth(margin.margin_4) }}
            />
            {note === false || isDeposit === false || desiredDate === false ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {note === false ? (
                  <Button
                    tx={"order.note"}
                    onPress={() => setNote(true)}
                    style={styles.buttonFeature}
                    textStyle={[
                      styles.textVoucher,
                      { color: colors.palette.navyBlue },
                    ]}
                  />
                ) : null}
                {isDeposit === false ? (
                  <Button
                    tx={"order.deposit"}
                    onPress={() => setIsDeposit(true)}
                    style={styles.buttonFeature}
                    textStyle={[
                      styles.textVoucher,
                      { color: colors.palette.navyBlue },
                    ]}
                  />
                ) : null}
                {desiredDate === false ? (
                  <Button
                    tx={"order.desiredDate"}
                    onPress={() => setDesiredDate(true)}
                    style={styles.buttonFeature}
                    textStyle={[
                      styles.textVoucher,
                      { color: colors.palette.navyBlue },
                    ]}
                  />
                ) : null}
              </ScrollView>
            ) : (
              <Text tx={"order.noMoreInformation"} style={styles.textVoucher} />
            )}
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
        <View
          style={{
            flexDirection: "row",
            paddingTop: scaleHeight(padding.padding_20),
            paddingBottom: scaleHeight(padding.padding_12),
          }}>
          <Text tx={"order.total"} style={[styles.textTotal, { flex: 1 }]} />
          <Text style={isDeposit === true ? styles.textTotal : styles.textCost}>
            84000000000
          </Text>
        </View>
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
