import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AutoImage,
  Button,
  Header,
  Text,
  TextField,
} from "../../../components";
import { Images } from "../../../../assets";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  colors,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { styles } from "./styles";
import { InputSelect } from "../../../components/input-select/inputSelect";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
import ItemListProduct from "../components/item-list-product";
import {
  AddressOrder,
  HeaderOrder,
  PriceList,
} from "../components/header-order";
import { ModalPayment } from "../components/modal-payment-method";
import { ModalTaxes } from "../components/modal-taxes-apply";
import { ShowNote } from "../components/note-new-order-component";
import { arrPayment, arrProducts, dataPromotion, methodData } from "./data";

export const NewOrder: FC = observer(function NewOrder(props) {
  const navigation = useNavigation();
  const paddingTop = useSafeAreaInsets().top;
  const heightScroll =
    Dimensions.get("window").height -
    scaleHeight(120) -
    scaleHeight(52) -
    paddingTop;
  const route = useRoute();

  const [arrProduct, setArrProduct] = useState<{}[]>([]);
  const [payment, setPayment] = useState({ label: "" });
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
  const [buttonSelect, setButtonSelect] = useState<boolean>(false);
  const [buttonPayment, setButtonPayment] = useState<boolean>(false);
  const [method, setMethod] = useState<number>(0);
  const countRef = useRef("");

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
      launchCamera(options, (response: any) => {
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
          },
        });
      }
    } else if (permissionStatus === RESULTS.BLOCKED) {
      console.log("Permission blocked, you need to enable it from settings");
    }
  };

  const toggleModalDate = () => {
    setIsSortByDate(!isSortByDate);
  };

  const handleIncrease = (id: any) => {
    let newArr = arrProduct!.map((item: any) => {
      if (item.id === id) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    setArrProduct(newArr);
  };

  const handleAddTaxes = (id: any) => {
    let newArr = arrProduct.map((item: any) => {
      if (item.id === id) {
        return { ...item, addTaxes: (item.addTaxes = !item.addTaxes) };
      }
      return item;
    });
    setArrProduct(newArr);
  };

  const handleSelectTaxes = (id: any) => {
    setButtonSelect(true);
  };

  const handleDecrease = (id: any) => {
    let newArr = arrProduct!
      .map((item: any) => {
        if (item.id === id) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      })
      .filter((item) => item.qty > 0);
    setArrProduct(newArr);
    console.log(arrProduct);
  };

  const deleteItemProduct = (id: any) => {
    const newArr = arrProduct.filter((item: any) => item.id !== id);
    setArrProduct(newArr);
  };

  useEffect(() => {
    setArrProduct(arrProducts);
  }, []);

  return (
    <View style={{ backgroundColor: colors.palette.aliceBlue }}>
      <Header
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        style={{ height: scaleHeight(70) }}
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
          <HeaderOrder
            openDialog={function (): void {
              setButtonSelect(true);
            }}
          />
          <AddressOrder />
          <PriceList />
          <InputSelect
            styleView={{
              backgroundColor: "white",
              paddingHorizontal: 16,
              paddingVertical: 8,
              marginVertical: 15,
            }}
            required={true}
            hintTx={"order.selectPayment"}
            titleTx={"order.paymentMethods"}
            arrData={arrPayment}
            onPressChoice={(item: any) => {
              setPayment(item);
            }}
            dataDefault={payment.label}
          />
          <View style={styles.viewListProduct}>
            <Button
              style={styles.buttonListProduct}
              onPress={() => navigation.navigate("addProductOrder" as never)}>
              <Images.icon_add />
              <Text
                tx={"order.addProduct"}
                style={styles.textButtonListProduct}
              />
            </Button>
            <FlatList
              data={arrProduct}
              scrollEnabled={false}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item, index }: any) => {
                return (
                  <View>
                    <ItemListProduct
                      onPressAddTexas={() => handleAddTaxes(item.id)}
                      onPressSelectTexas={() => handleSelectTaxes(item.id)}
                      sumTexas={item.sumTexas}
                      VAT={item.VAT}
                      valueVAT={item.valueVAT}
                      name={item.name}
                      unit={item.unit}
                      images={item.images}
                      cost={item.cost}
                      qty={item.qty.toString()}
                      onPressPlus={() => handleIncrease(item.id)}
                      onPressMinus={() => handleDecrease(item.id)}
                      onPress={() => deleteItemProduct(item.id)}
                      addTaxes={item.addTaxes}
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
          <SumMoney
            arrVat={dataPromotion as any}
            sumNoVat={6000.0}
            sumVat={12}
          />
          <TouchableOpacity
            onPress={() => {
              setButtonPayment(true);
            }}>
            <View
              style={{
                flexDirection: "row",
                borderRadius: 8,
                backgroundColor: "white",
                paddingHorizontal: 16,
                paddingVertical: 15,
                justifyContent: "space-between",
              }}>
              <Text
                tx="order.method_pay"
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#242424",
                }}></Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  text={countRef.current.toString()}
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color: "#242424",
                    marginRight: 6,
                  }}></Text>
                <Images.icon_caretRight2 />
              </View>
            </View>
          </TouchableOpacity>

          <ShowNote
            note={note}
            setNote={function (item: boolean): void {
              setNote(item);
            }}
            imagesNote={imagesNote}
            setModalImage={function (item: boolean): void {
              setModalImage(item);
            }}
          />
          {desiredDate === true ? (
            <View
              style={{
                flexDirection: "row",
                marginVertical: 15,
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
                marginVertical: 15,
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
                    onPress={() => {
                      setIsDeposit(true);
                      navigation.navigate("paymentBuy", {
                        params: { type: true },
                      });
                    }}
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
          {/* <View style={styles.viewVoucher}>
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
          </View> */}
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
          <Text tx={"order.sum"} style={[styles.textTotal, { flex: 1 }]} />
          <Text style={isDeposit === true ? styles.textTotal : styles.textCost}>
            84000000000
          </Text>
        </View>
        {isDeposit === true ? (
          <View
            style={{
              flexDirection: "row",
              paddingBottom: scaleHeight(padding.padding_12),
              justifyContent: "space-between",
            }}>
            <View style={{ flexDirection: "row" }}>
              <Text tx={"order.prepayment"} style={[styles.textTotal]} />
              <Text
                tx="order.contrast"
                style={{
                  color: "#747475",
                  fontSize: 12,
                  fontWeight: "400",
                }}></Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTotal}>{deposit}</Text>
              <TouchableOpacity>
                <Images.icon_edit
                  style={{ marginLeft: scaleWidth(margin.margin_6) }}
                />
              </TouchableOpacity>
            </View>
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
        onMarkedDatesChangeS={(markedDatesS: any) => {
          setMarkedDatesS(markedDatesS);
        }}
        onMarkedDatesChangeE={(markedDatesE: any) => {
          setMarkedDatesE(markedDatesE);
        }}
        isShowTabs={false}
        isSortByDate={isSortByDate}
        isOneDate={true}
        toggleModalDate={toggleModalDate}
      />
      <ModalPayment
        isVisible={buttonPayment}
        closeDialog={function (): void {
          setButtonPayment(false);
        }}
        arrData={methodData}
        method={method}
        setMethod={function (item: number, name: string): void {
          setMethod(item);
          countRef.current = name;
          console.log("tuvm2", countRef);
        }}
      />
      <ModalTaxes
        isVisible={buttonSelect}
        closeDialog={function (): void {
          setButtonSelect(false);
        }}
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
interface DataSumMoney {
  arrVat: [{ percent: number; amount: number }];
  sumNoVat: number;
  sumVat: number;
}

const SumMoney = (props: DataSumMoney) => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        borderRadius: 8,
        backgroundColor: "white",
        justifyContent: "space-between",
        marginVertical: 15,
      }}>
      <View style={{ flexDirection: "column" }}>
        <Text
          tx="order.sum_no_texas"
          style={{ fontSize: 10, fontWeight: "400", color: "#747475" }}></Text>
        {props.arrVat != null
          ? props.arrVat.map((data) => {
              return (
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color: "#747475",
                    marginTop: 8,
                  }}>
                  {data.percent}
                </Text>
              );
            })
          : null}
        <Text
          tx="order.sum_yes_texas"
          style={{
            fontSize: 10,
            fontWeight: "400",
            color: "#747475",
            marginTop: 8,
          }}></Text>
      </View>
      <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
        <Text style={{ fontSize: 10, fontWeight: "400", color: "#747475" }}>
          {props.sumNoVat ?? ""}
        </Text>
        {props.arrVat != null
          ? props.arrVat.map((data) => {
              return (
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color: "#747475",
                    marginTop: 8,
                  }}>
                  {data.amount}
                </Text>
              );
            })
          : null}
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: "#FF4956",
            marginTop: 8,
          }}>
          {props.sumVat ?? ""}
        </Text>
      </View>
    </View>
  );
};
