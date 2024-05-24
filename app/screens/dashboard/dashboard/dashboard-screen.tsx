/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Dimensions,
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Animated,
} from "react-native";
import { styles } from "./styles";
import { Text } from "../../../components/text/text";

import {
  colors,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import Modal from "react-native-modal";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabScreenProps } from "../../../navigators/BottomTabNavigator";
import { Images } from "../../../../assets/index";
import ViewInfo from "../component/view-info";
import { LinearGradient } from "react-native-linear-gradient";
import ItemFunction from "../component/item-function";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Screen } from "../../../components/screen/screen";
import ItemOrder from "../../order/components/item-order";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useStores } from "../../../models";

export const DashBoardScreen: FC<TabScreenProps<"dashboard">> = observer(
  function DashBoardScreen(props) {
    // Pull in one of our MST stores
    const refCarousel = useRef(null);
    const [isShow, setIsShow] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [showRevenue, setShowRevenue] = useState(false);
    const [activeSlide, setactiveSlide] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const scrollY = useRef(new Animated.Value(0)).current;

    // const { accountStore, promotionStore, notifitionStoreModel } = useStores()
    // const { userId } = accountStore
    // const [arrPromotions, setarrPromotions] = useState(null)
    // const [arrBanner, setarrBanner] = useState(null)
    // const [showImagePicker, setShowImagePicker] = useState(false)
    // const [countNoti, setCountNoti] = useState(0)
    // const [imageAVT, setImageAVT] = useState(undefined)
    const navigation = useNavigation();
    const Drawer = createDrawerNavigator();
    const paddingTop = useSafeAreaInsets().top;
    // let bankAccount
    // let amount
    // useEffect(() => {
    //   getToken()
    // }, [])
    const { authenticationStore } = useStores();

    const handleScroll = (event: any) => {
      const scrollHeight = event.nativeEvent.contentOffset.y;
      setScrollHeight(scrollHeight);
    };

    function testDebug() {
      console.log("abcc");

      authenticationStore.onLogin();
    }

    const revenue = 1235780000;
    const debt = 1235780;

    const hideRevenue = "*".repeat(revenue.toString().length);
    const hideDebt = "*".repeat(debt.toString().length);

    const arrBanner = [
      {
        timeStart: "14/10/2021",
        timeEnd: "30/3/2022",
        image:
          "https://datadesignsb.com/wp-content/uploads/2019/09/thiet-ke-do-hoa-hinh-anh.jpg",
        name: "Chính sách MUA 3 TẶNG 1",
      },
      {
        timeStart: "15/10/2021",
        timeEnd: "30/3/2022",
        image:
          "https://datadesignsb.com/wp-content/uploads/2019/09/thiet-ke-do-hoa-hinh-anh.jpg",
        name: "Chính sách MUA 3 TẶNG 1",
      },
      {
        timeStart: "16/10/2021",
        timeEnd: "30/3/2022",
        image:
          "https://datadesignsb.com/wp-content/uploads/2019/09/thiet-ke-do-hoa-hinh-anh.jpg",
        name: "Chính sách MUA 3 TẶNG 1",
      },
    ];

    const arrPromotions: Array<{}> = [
      {
        id: 1,
        name: "Nguyen Ha Dung",
        time: "13:56 01/03",
        code: "Dh_21090930",
        status: "Đã gửi YC",
        money: "89.000.000",
        discount: "5.000.000",
        totalAmount: "84.000.000",
        weight: "37kg",
        payStatus: "Đã thanh toán",
        amount: "7",
      },
      {
        id: 2,
        name: "Nguyen Ha Dung",
        time: "13:56 01/03",
        code: "Dh_21090930",
        status: "Đang xử lý",
        money: "89.000.000",
        discount: "5.000.000",
        totalAmount: "84.000.000",
        weight: "37kg",
        payStatus: "Chưa thanh toán",
        amount: "7",
      },
      {
        id: 3,
        name: "Nguyen Ha Dung",
        time: "13:56 01/03",
        code: "Dh_21090930",
        status: "Hủy đơn",
        money: "89.000.000",
        discount: "5.000.000",
        totalAmount: "84.000.000",
        weight: "37kg",
        payStatus: "Đã thanh toán",
        amount: "7",
      },
      {
        id: 4,
        name: "Nguyen Ha Dung",
        time: "13:56 01/03",
        code: "Dh_21090930",
        status: "Chờ lấy hàng",
        money: "89.000.000",
        discount: "5.000.000",
        totalAmount: "84.000.000",
        weight: "37kg",
        payStatus: "Chưa thanh toán",
        amount: "7",
      },
      {
        id: 5,
        name: "Nguyen Ha Dung",
        time: "13:56 01/03",
        code: "Dh_21090930",
        status: "Đã giao",
        money: "89.000.000",
        discount: "5.000.000",
        totalAmount: "84.000.000",
        weight: "37kg",
        payStatus: "Đã thanh toán",
        amount: "7",
      },
      {
        id: 6,
        name: "Nguyen Ha Dung 6",
        time: "13:56 01/03",
        code: "Dh_21090930",
        status: "Đang vận chuyển",
        money: "89.000.000",
        discount: "5.000.000",
        totalAmount: "84.000.000",
        weight: "37kg",
        payStatus: "Chưa thanh toán",
        amount: "7",
      },
      {
        id: 7,
        name: "Nguyen Ha Dung 7",
        time: "13:56 01/03",
        code: "Dh_21090930",
        status: "Đang xử lý",
        money: "89.000.000",
        discount: "5.000.000",
        totalAmount: "84.000.000",
        weight: "37kg",
        payStatus: "Đã thanh toán",
        amount: "7",
      },
      {
        id: 8,
        name: "Nguyen Ha Dung 8",
        time: "13:56 01/03",
        code: "Dh_21090930",
        status: "Chờ lấy hàng",
        money: "89.000.000",
        discount: "5.000.000",
        totalAmount: "84.000.000",
        weight: "37kg",
        payStatus: "Đã thanh toán",
        amount: "7",
      },
      {
        id: 9,
        name: "Nguyen Ha Dung 9",
        time: "13:56 01/03",
        code: "Dh_21090930",
        status: "Đã giao",
        money: "89.000.000",
        discount: "5.000.000",
        totalAmount: "84.000.000",
        weight: "37kg",
        payStatus: "Đã thanh toán",
        amount: "7",
      },
    ];

    // const getToken = async () => {
    //   const promotion = await promotionStore.getPromotion({}, true)
    //   const balance = await promotionStore.getBalance()
    //   await notifitionStoreModel.getCountUnRead()
    //   console.log('balance', balance);
    //   console.log('prmotion', promotion.content);
    //   await accountStore.accountInfo(accountStore.userId)
    //   setarrPromotions(promotion.content)
    //   setarrBanner(promotion.content)
    //   setCountNoti(notifitionStoreModel.notiUnreadHome)
    //   setImageAVT(accountStore.imageUrl)
    //   console.log('notifitionStoreModel.notiUnreadHome', notifitionStoreModel.notiUnreadHome);
    // }

    // const deleteNoti = async () => {
    //   await notifitionStoreModel.delateCountUnRead()
    //   await notifitionStoreModel.getCountUnRead()
    //   navigation.navigate('notification' as never)
    // }

    // const onSelectImage = async (type) => {
    //   if (type === TYPE_SELECT_IMAGE.CAMERA) {
    //     if(Platform.OS === "android") {
    //       const permission = await requestCameraPermission()
    //       if(permission) {
    //         launchCamera(cameraOptions, (result) => uploadImage(result))
    //       }
    //     } else {
    //       launchCamera(cameraOptions, (result) => uploadImage(result))
    //     }
    //   } else {
    //     launchImageLibrary(imageOptions, (result) => uploadImage(result))
    //   }
    // }

    // const uploadImage = useCallback(
    //   async (result) => {
    //     setShowImagePicker(false)
    //     if (result.didCancel) {
    //       hideLoading()
    //       console.log("User cancelled image picker")
    //     } else if (result.error) {
    //       hideLoading()
    //       console.log("ImagePicker Error:", result.error)
    //     } else {
    //       showLoading()
    //       const { fileSize, uri, type, fileName } = result?.assets[0]
    //       const checkFileSize = validateFileSize(fileSize)
    //       if (checkFileSize) {
    //         hideLoading()
    //         showDialog(translate("imageUploadExceedLimitedSize"), "danger", "", "OK", "", "")
    //       } else {
    //         const formData = new FormData()
    //         formData.append("file", {
    //           uri,
    //           type,
    //           name: fileName,
    //         })
    //         const imageUpload = await accountStore.uploadAVT(formData)
    //         if (imageUpload) {
    //           hideLoading()
    //           await accountStore.updateUserAVT(userId, imageUpload)
    //           setImageAVT(uri)
    //         } else {
    //           hideLoading()
    //         }
    //       }
    //     }
    //   },
    //   [imageAVT],
    // )

    return (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={[colors.palette.navyBlue, colors.palette.malibu]}
        style={styles.ROOT}>
        <View
          style={{
            position: "absolute",
            top: Platform.OS === "ios" ? scaleHeight(44) : scaleHeight(32),
            right: 0,
          }}>
          <Images.icon_logoHome />
        </View>
        <Animated.View
          style={[
            styles.viewRevenue,
            {
              top: scaleHeight(paddingTop + 56),
              opacity: scrollY.interpolate({
                inputRange: [0, 30, 60],
                outputRange: [1, 0.5, 0],
                extrapolate: "clamp",
              }),
              pointerEvents: "box-none",
            },
          ]}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 12,
              marginLeft: 16,
            }}>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 12,
              }}
              tx={"dashboard.revenueMonth"}
            />
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginLeft: margin.margin_4,
              }}
              onPress={() => setShowRevenue(!showRevenue)}>
              {showRevenue === true ? (
                <Images.icon_eyeLine />
              ) : (
                <Images.icon_unEyeLine />
              )}
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row", margin: margin.margin_16 }}>
            <View>
              <View style={{ flexDirection: "row", width: scaleWidth(119) }}>
                <Images.icon_chartBar />
                <View style={{ marginLeft: margin.margin_4 }}>
                  <Text style={styles.textContent} tx={"dashboard.revenue"} />
                  {showRevenue === false ? (
                    <Text style={styles.textRevenue} text={hideRevenue} />
                  ) : (
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={styles.textRevenue}
                        text={revenue.toString()}
                      />
                      <Text style={styles.textUnit} text="đ" />
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.viewLine} />
            <View>
              <View style={{ flexDirection: "row", width: scaleWidth(71) }}>
                <Images.icon_orderBlue />
                <View style={{ marginLeft: margin.margin_4 }}>
                  <Text style={styles.textContent} tx={"dashboard.orders"} />
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.textRevenue} text="78" />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.viewLine} />
            <View>
              <View style={{ flexDirection: "row", width: scaleWidth(119) }}>
                <Images.icon_money />
                <View style={{ marginLeft: margin.margin_4 }}>
                  <Text style={styles.textContent} tx={"dashboard.debt"} />
                  {showRevenue === false ? (
                    <Text style={styles.textRevenue} text={hideDebt} />
                  ) : (
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textRevenue} text={debt.toString()} />
                      <Text style={styles.textUnit} text="đ" />
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
        <Animated.View
          style={{
            top: scaleHeight(paddingTop + 44),
            height: 97,
            position: "absolute",
            left: 16,
            opacity: scrollY.interpolate({
              inputRange: [0, 30, 60],
              outputRange: [0, 0.5, 1],
              extrapolate: "clamp",
            }),
          }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              margin: scaleHeight(margin.margin_16),
            }}>
            <View>
              <View style={{ flexDirection: "row", width: scaleWidth(119) }}>
                <Images.icon_chartBar />
                <View style={{ marginLeft: margin.margin_4 }}>
                  <Text
                    style={[
                      styles.textContent,
                      { color: colors.palette.neutral100 },
                    ]}
                    tx={"dashboard.revenue"}
                  />
                  {showRevenue === false ? (
                    <Text
                      style={[
                        styles.textRevenue,
                        { color: colors.palette.neutral100 },
                      ]}
                      text={hideRevenue}
                    />
                  ) : (
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[
                          styles.textRevenue,
                          { color: colors.palette.neutral100 },
                        ]}
                        text={revenue.toString()}
                      />
                      <Text
                        style={[
                          styles.textUnit,
                          { color: colors.palette.neutral100 },
                        ]}
                        text="đ"
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.viewLine} />
            <View>
              <View style={{ flexDirection: "row", width: scaleWidth(71) }}>
                <Images.icon_orderBlue />
                <View style={{ marginLeft: margin.margin_4 }}>
                  <Text
                    style={[
                      styles.textContent,
                      { color: colors.palette.neutral100 },
                    ]}
                    tx={"dashboard.orders"}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[
                        styles.textRevenue,
                        { color: colors.palette.neutral100 },
                      ]}
                      text="78"
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.viewLine} />
            <View>
              <View style={{ flexDirection: "row", width: scaleWidth(119) }}>
                <Images.icon_money />
                <View style={{ marginLeft: margin.margin_4 }}>
                  <Text
                    style={[
                      styles.textContent,
                      { color: colors.palette.neutral100 },
                    ]}
                    tx={"dashboard.debt"}
                  />
                  {showRevenue === false ? (
                    <Text
                      style={[
                        styles.textRevenue,
                        { color: colors.palette.neutral100 },
                      ]}
                      text={hideDebt}
                    />
                  ) : (
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[
                          styles.textRevenue,
                          { color: colors.palette.neutral100 },
                        ]}
                        text={debt.toString()}
                      />
                      <Text
                        style={[
                          styles.textUnit,
                          { color: colors.palette.neutral100 },
                        ]}
                        text="đ"
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
        <View
          style={[
            styles.viewHeaderInfo,
            { paddingTop: scaleHeight(paddingTop + 11) },
          ]}>
          <ViewInfo
            // token={accountStore.authToken}
            token="asd"
            image={""}
            // name={accountStore.name}
            name="Công ty Thang Long"
            onPress={() => setIsShow(!isShow)}
            showInfo={isShow}
            // kind={KIND_SCREEN.HOME}
            kind={1}
            onChangeAVT={() => {
              // navigation.dispatch(DrawerActions.openDrawer);
              testDebug();
            }}
          />
          <TouchableOpacity onPress={() => {}}>
            <Images.icon_search />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnNotification} onPress={() => {}}>
            <Images.icon_notification />
            {/* {notifitionStoreModel.notiUnreadHome > 0 ? ( */}
            <View style={styles.circleNoti}>
              <Text style={styles.textNoti} text={"10"} />
            </View>
            {/* // ) : null} */}
          </TouchableOpacity>
        </View>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          showsVerticalScrollIndicator={false}
          style={[
            styles.content,
            {
              paddingTop:
                scrollHeight >= 90
                  ? scaleHeight(padding.padding_66)
                  : scaleHeight(padding.padding_66),
              top:
                scrollHeight >= 90
                  ? paddingTop + scaleHeight(62)
                  : paddingTop + scaleHeight(102),
            },
          ]}>
          <View style={{ flexDirection: "row" }}>
            <ItemFunction
              styles={{ backgroundColor: colors.palette.heatWave }}
              name={"dashboard.orders"}
              Icon={Images.icon_orders}
              onPress={() => {}}
            />
            <ItemFunction
              styles={{ backgroundColor: colors.palette.metallicBlue }}
              name={"dashboard.sampleRequest"}
              Icon={Images.icon_request}
              onPress={() => {}}
            />
            <ItemFunction
              styles={{ backgroundColor: colors.palette.torchRed }}
              name={"dashboard.transactionHistory"}
              Icon={Images.icon_transactionHistory}
              onPress={() => props.navigation.navigate("transactionHistory")}
            />
            <ItemFunction
              styles={{ backgroundColor: colors.palette.verdigris }}
              name={"dashboard.promotions"}
              Icon={Images.icon_promotion}
              // onPress={() => {
              //   props.navigation.navigate('transferToBank', {});
              // }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <ItemFunction
              styles={{ backgroundColor: colors.palette.malachite }}
              name={"dashboard.client"}
              Icon={Images.icon_supplier}
              onPress={() => navigation.navigate("clientScreen" as never)}
            />
            <ItemFunction
              styles={{ backgroundColor: colors.palette.torchRed }}
              name={"dashboard.product"}
              Icon={Images.icon_product}
              onPress={() => {}}
            />
            <ItemFunction
              styles={{ backgroundColor: colors.palette.malachite }}
              name={"dashboard.supply"}
              Icon={Images.icon_supplier}
              onPress={() => navigation.navigate("suppliersScreen" as never)}
            />
            <ItemFunction
              styles={{ backgroundColor: colors.palette.navyBlue }}
              name={"wareHouse.wareHouse"}
              Icon={Images.ic_wareHouse}
              onPress={() => navigation.navigate("wareHouse" as never)}
            />

            {/* <ItemFunction  /> */}
          </View>
          <Text
            style={[
              styles.textTitle,
              {
                marginBottom: margin.margin_10,
              },
            ]}
            tx={"dashboard.titleBanner"}
          />
          {arrBanner && arrBanner.length > 0 ? (
            <View style={{ marginBottom: scaleHeight(25), borderRadius: 14 }}>
              <Carousel
                data={arrBanner}
                autoplay={true}
                ref={refCarousel}
                loop
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ height: 200, width: "100%", borderRadius: 4 }}
                    // onPress={() => props.navigation.navigate('promotionDetail', { id: item.campaign_id })}
                  >
                    <ImageBackground
                      source={{
                        uri: item.image,
                        // headers: {
                        //   'Content-Type': 'application/json',
                        //   Authorization: `Bearer ${accountStore.authToken}`,
                        // },
                      }}
                      resizeMode="cover"
                      style={{ height: 200, width: "100%", borderRadius: 4 }}>
                      <View style={styles.viewDateBanner}>
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: 12,
                            lineHeight: 14,
                          }}>
                          {item.timeStart.slice(0, 2)}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.textMonthBanner} text="tháng " />
                          <Text
                            style={styles.textMonthBanner}
                            text={item.timeStart.slice(3, 5)}
                          />
                        </View>
                      </View>
                      <View style={styles.viewContentBanner}>
                        <Text style={styles.textTitleBanner}>{item.name}</Text>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={styles.textContentBanner}
                            tx={"dashboard.start"}
                          />
                          <Text
                            style={styles.textContentBanner}
                            text={item.timeStart}
                          />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={styles.textContentBanner}
                            tx={"dashboard.end"}
                          />
                          <Text
                            style={styles.textContentBanner}
                            text={item.timeEnd}
                          />
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                )}
                sliderWidth={Dimensions.get("window").width - 32}
                itemWidth={Dimensions.get("window").width - 32}
                onSnapToItem={(index) => setactiveSlide(index)}
                lockScrollWhileSnapping={true}
                enableMomentum={false}
                decelerationRate={0.5}
              />
            </View>
          ) : null}
          <Text style={styles.textTitle} tx={"dashboard.titleOrder"} />
          <SafeAreaView style={{ flex: 1 }}>
            {arrPromotions && arrPromotions.length > 0 ? (
              <FlatList
                // keyExtractor={arrPromotions.indexOf}
                data={arrPromotions}
                style={styles.styleFlatlist}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <ItemOrder
                    onPress={() => {
                      navigation.navigate("orderDetails" as never, {
                        data: item,
                      });
                    }}
                    name={item.name}
                    time={item.time}
                    code={item.code}
                    status={item.status}
                    discount={item.discount}
                    payStatus={item.payStatus}
                    weight={item.weight}
                    totalAmount={item.totalAmount}
                    money={item.money}
                    amount={item.amount}
                    styleViewStatus={{
                      backgroundColor:
                        item.status === "Đã xử lý"
                          ? colors.palette.solitude
                          : item.status === "Chờ xử lý"
                          ? colors.palette.floralWhite
                          : colors.palette.amour,
                      justifyContent: "center",
                    }}
                    styleTextStatus={{
                      color:
                        item.status === "Đã xử lý"
                          ? colors.palette.metallicBlue
                          : item.status === "Chờ xử lý"
                          ? colors.palette.yellow
                          : colors.palette.radicalRed,
                    }}
                    styleTextPayStatus={{
                      color:
                        item.payStatus === "Đã thanh toán"
                          ? colors.palette.malachite
                          : colors.palette.darkTangerine,
                    }}
                  />
                )}
              />
            ) : null}
          </SafeAreaView>
        </Animated.ScrollView>
        {isShowModal === false ? (
          <TouchableOpacity
            onPress={() => setIsShowModal(true)}
            style={styles.btnShowModal}>
            <Images.icon_plus />
          </TouchableOpacity>
        ) : null}
        <Modal
          isVisible={isShowModal}
          animationIn="slideInUp"
          animationOut="slideOutDown">
          <View style={styles.viewModal}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text tx={"dashboard.orderNCC"} style={styles.textModal} />
              <TouchableOpacity onPress={() => {}} style={styles.circleModal}>
                <Images.icon_orderBlue width={18} height={18} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text tx={"dashboard.orderApodio"} style={styles.textModal} />
              <TouchableOpacity onPress={() => {}} style={styles.circleModal}>
                <Images.icon_orderBlue width={18} height={18} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text tx={"dashboard.request"} style={styles.textModal} />
              <TouchableOpacity onPress={() => {}} style={styles.circleModal}>
                <Images.icon_handWaving />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setIsShowModal(false)}
              style={[
                styles.circleModal,
                {
                  borderColor: colors.palette.neutral100,
                  backgroundColor: colors.palette.navyBlue,
                  borderWidth: 2,
                },
              ]}>
              <Images.icon_delete />
            </TouchableOpacity>
          </View>
        </Modal>
      </LinearGradient>
    );
  }
);