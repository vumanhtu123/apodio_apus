/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
  PermissionsAndroid,
  Alert,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import {  Row, SvgIcon, Text, VectorIcon } from "../../components"
import { SvgIcon } from "../../../components/svg-icon";
import { Text } from "../../../components/text/text";
import { Button } from "../../../components/button/button";
import {
  colors,
  fontSize,
  padding,
  palette,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
// import { bgMyacc, flagEnglish, flagTimoleste } from "../../theme/images"
import { styles } from "./styles";
import { useStores } from "../../../models";
import { TYPE_SELECT_IMAGE } from "../../../utils/enum";
// import { changeLanguage } from "../../../i18n"
// import { formatPhoneNumber, validateFileSize } from "../../../utils/validate"
import { clear, getAccessToken, setAccessToken } from "../../../utils/storage";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { hideLoading, showLoading } from "../../../utils/toast"
import ReactNativeModal from "react-native-modal";
import { useAuth } from "../../../screens/contexts/auth";
// import { Screen } from "../screen/screen"
import { Header } from "../../../components/header/header";
import { Images } from "../../../../assets/index";
import { LinearGradient } from "react-native-linear-gradient";
// import { string } from "mobx-state-tree/dist/internal"
// import { BulletItem } from "app/components/bullet-item/bullet-item"
import { Row } from "../../../../app/components/Row";
import {
  BottomParamList,
  TabScreenProps,
} from "../../../navigators/bottom-navigation";
import { TextField } from "../../../components";
// import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors"
// import { UsersScreen } from "../users/view/users-screen"
//
// const { width } = Dimensions.get('window');

// const Header = (prop) => {
//   return (
//     <View style={styles.accountHeader}>
//       {/* <TouchableOpacity onPress={props.onOpenCam}>
//         <View style={styles.viewAvatar}>
//           <Image
//             style={styles.avatar}
//             source={{
//               uri: props.url,
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${props.token}`,
//               },
//             }}
//           />
//           <SvgIcon
//             name={"icCamProfile"}
//             width={scaleWidth(32)}
//             height={scaleHeight(32)}
//             style={styles.iconCam}
//           />
//         </View>
//       </TouchableOpacity> */}
//       {/* <View style={styles.merchantInfo}>
//         <View style={styles.user}>
//           <Text style={styles.textUser} tx="Merchant"/>
//         </View>
//         <Text style={styles.textName} numberOfLines={1}>
//           {props?.name ?? ''}
//         </Text>
//         <Text style={styles.textPhone}>
//           {formatPhoneNumber(props?.data?.phoneNumber ?? '')}
//         </Text>
//       </View>

//       <View style={styles.boxId}>
//         <Text style={styles.textId}>
//           {props?.data?.id ?? ''}
//         </Text>
//       </View> */}
//     </View>
//   );
// };

const MainAccount1 = ({ title, onPress, index }: any) => {
  const IconData = ["ic_language", "ic_QR", "ic_userManual"];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.horViewMenu}>
        <SvgIcon name={IconData[index]} width={57} height={57} />
        <Text style={styles.horTextMenu} tx={title} />
      </View>
    </TouchableOpacity>
  );
};

export const UserScreen: FC<StackScreenProps<BottomParamList, "users">> =
  observer(function AccountScreen(props) {
    // const { accountStore } = useStores()
    // const { userId, imageUrl, name, selectedLanguage, setSelectedLanguage } = accountStore

    const navigation = useNavigation();
    const [isVisibleFeedback, setIsVisibleFeedback] = useState(false);
    const [selectLanguage, setSelectLanguage] = useState("");
    const { top } = useSafeAreaInsets();
    const [data, setData] = useState();
    const [showLanguage, setShowLanguage] = useState(false);
    const [diaLogLogout, setDiaLogout] = useState(false);
    const auth = useAuth();
    const { authenticationStore } = useStores();

    // const [showImagePicker, setShowImagePicker] = useState(false)
    // const [isShowChoose, setIsShowChoose] = useState(false)
    // const [imageAVT, setImageAVT] = useState("")

    // const navigation = useNavigation()
    // const auth = useAuth()

    // const getData = async () => {
    //   const res = await accountStore.accountInfo(accountStore.userId)
    //   console.log('res', res.result.data)
    //   setData(res.result.data)
    // }

    // useEffect(() => {
    //   getData()
    // }, [])

    const options = {
      includeBase64: false,
      mediaType: "photo",
      quality: 1,
      presentationStyle: "fullScreen",
      selectionLimit: 1,
    };

    // const requestCameraPermission = async () => {
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.CAMERA,
    //     );
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       launchCamera(options, (result) => uploadImage(result))
    //     } else {
    //       console.log("Camera permission denied");
    //     }
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // };

    // const onSelectImage = (type) => {
    //   if (type === TYPE_SELECT_IMAGE.CAMERA) {
    //     if(Platform.OS === "android") {
    //       requestCameraPermission()
    //     } else {
    //       launchCamera(options, (result) => uploadImage(result))
    //     }
    //   } else {
    //     launchImageLibrary(options, (result) => uploadImage(result))
    //   }
    // }

    // const uploadImage = useCallback(
    //   async (result) => {
    //     setIsShowChoose(false)
    //     if (result.didCancel) {
    //       hideLoading()
    //       // console.log("User cancelled image picker")
    //     } else if (result.error) {
    //       hideLoading()
    //       // console.log("ImagePicker Error:", result.error)
    //     } else {
    //       showLoading()
    //       const { fileSize, uri, type, fileName } = result?.assets[0]
    //       const checkFileSize = validateFileSize(fileSize)
    //       if (checkFileSize) {
    //         setIsShowChoose(false)
    //         console.log("Không được chọn ảnh quá 5MB")
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
    //           setImageAVT(uri)
    //           await accountStore.updateUserAVT(userId,imageUpload)
    //         } else {
    //           hideLoading()
    //         }
    //       }
    //     }
    //   },
    //   [imageUrl],
    // )

    const textData = [
      {
        title: "inforMerchant.btnInfor",
        icon: Images.ic_infor,
        onPress: () => {
          // Alert.alert('ok')
          props.navigation.navigate("inforAccount");
        },
      },
      {
        title: "inforMerchant.btnSecutityAcc",
        icon: Images.ic_secutity,
        onPress: () => props.navigation.navigate("accountSecurity"),
      },
      {
        title: "inforMerchant.btnChangePassword",
        icon: Images.ic_changePass,
        onPress: () => props.navigation.navigate("changePass"),
      },
      {
        title: "inforMerchant.btnIntroduct",
        icon: Images.ic_inTroduce,
        onPress: () => props.navigation.navigate("Introduce"),
      },
      {
        title: "inforMerchant.btnFeedback",
        icon: Images.ic_feedBack,
        onPress: () => setIsVisibleFeedback(!isVisibleFeedback),
      },
      {
        title: "inforMerchant.btnSettingBell",
        icon: Images.ic_settingBell,
        onPress: () => props.navigation.navigate("notificationSetting"),
      },
    ];

    // const onChangeLanguage = useCallback(
    //   (value) => {
    //     setShowLanguage(false)
    //     setSelectedLanguage(value)
    //     changeLanguage(value)
    //   },
    //   [selectedLanguage],
    // )

    // const onLogout = async () => {
    //   await clear()
    //   auth.changeLoginStatus()
    // }

    return (
      <ScrollView>
        <View style={styles.ROOT}>
          {/* <Image style={styles.imgTopHeader} source={bgMyacc} /> */}

          {/* <View style={{marginTop:top}}/> */}
          {
            // data && (
            //   // <Header
            //   //   navigation={'navigation'}
            //   //   name={name}
            //   //   data={data}
            //   //   url={imageUrl}
            //   //   token={accountStore.authToken}
            //   //   onOpenCam={() => {}}
            //   //   // onOpenCam={setShowImagePicker(true)}
            //   // />
            <View style={{ width: "100%" }}>
              <Header
                style={{
                  alignItems: "center",
                  height: 52,
                  justifyContent: "center",
                }}
                LeftIcon={Images.back}
                headerTx="inforMerchant.setTingShop"
                titleStyle={{ color: "#ffffff" }}
                type={"AntDesign"}
                onLeftPress={() => navigation.goBack()}
              />

              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={[colors.palette.navyBlue, colors.palette.malibu]}
                style={{ height: 70 }}></LinearGradient>
            </View>

            // )
          }

          {/* <View style={{backgroundColor:colors.palette.blueNavigator ,  width:'100%', height:70}}></View> */}
          <View style={styles.horView}>
            <MainAccount1
              title={"inforMerchant.setLanguage"}
              onPress={() => {
                setShowLanguage(true);
              }}
              index={0}
            />

            <MainAccount1
              title={"inforMerchant.userManual"}
              // onPress={() => setShowLanguage(true)}
              index={2}
            />
          </View>
        </View>
        <ScrollView
          style={{
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
            marginTop: 30,
          }}>
          <View style={styles.body}>
            {textData.map((item, index) => (
              <View key={index}>
                <TouchableOpacity style={styles.item} onPress={item.onPress}>
                  <View style={styles.leftContent}>
                    <View style={styles.iconBody}>
                      <item.icon width={20} height={20} />
                    </View>
                    <Text style={styles.textBody} tx={item.title} />
                  </View>
                  <Images.ic_right width={20} height={20} />
                </TouchableOpacity>
                <View style={styles.divider}></View>
              </View>
            ))}
          </View>
          <Text style={styles.version}>{"Version 0.1.0"}</Text>
        </ScrollView>
        <View style={styles.logOut}>
          <Button
            text="Logout"
            style={styles.logoutButton}
            textStyle={styles.logoutText}
            onPress={() => {
              // navigation.reset({
              //   index: 1,
              //   routes: [{ name: "login" as never }],
              // })
              // clear()
              // onLogout()
              setDiaLogout(!diaLogLogout);
            }}
          />
        </View>

        <ReactNativeModal
          statusBarTranslucent
          backdropOpacity={0.5}
          animationIn={"zoomIn"}
          animationOut={"fadeOut"}
          onBackdropPress={() => {
            setShowLanguage(showLanguage);
          }}
          isVisible={showLanguage}
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 15,
          }}>
          <View style={styles.viewModal}>
            <View style={styles.viewLineModal} />
            <Row justify="space-between">
              <Text
                tx={showLanguage ? "inforMerchant.setLanguage" : "selectMethod"}
                // tx="Hủy"

                style={styles.textMethod}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowLanguage(false);
                  // setshowModal(false)
                }}>
                <Text
                  tx="inforMerchant.cancel"
                  style={{
                    fontSize: fontSize.size14,
                    fontWeight: "500",
                    color: colors.palette.torchRed,
                  }}
                />
              </TouchableOpacity>
            </Row>

            <View
              style={{ width: "100%", height: 1, backgroundColor: "#E7EFFF" }}
            />
            <TouchableOpacity
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => setSelectLanguage(!selectLanguage)}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ padding: 8 }}>
                  <Images.icon_VietNam />
                </View>
                <Text>Tiếng Việt </Text>
              </View>
              {selectLanguage ? <Images.ic_tick /> : null}
            </TouchableOpacity>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#E7EFFF" }}
            />

            <TouchableOpacity
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => {
                setSelectLanguage(!selectLanguage);
              }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ padding: 8 }}>
                  <Images.icon_English />
                </View>
                <Text>Tiếng Anh </Text>
              </View>
              {selectLanguage ? null : <Images.ic_tick />}
            </TouchableOpacity>
          </View>
        </ReactNativeModal>

        <ReactNativeModal
          statusBarTranslucent
          backdropOpacity={0.5}
          animationIn={"zoomIn"}
          animationOut={"fadeOut"}
          onBackdropPress={() => {
            setDiaLogout(!diaLogLogout);
          }}
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 15,
          }}
          isVisible={diaLogLogout}>
          <View style={styles.viewModal}>
            <Text
              tx="inforMerchant.titleLogOut"
              style={{
                width: "100%",
                textAlign: "center",
                justifyContent: "center",
                paddingVertical: 16,
                fontWeight: "700",
              }}
            />
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#E7EFFF" }}
            />
            <TouchableOpacity
              style={{ marginVertical: 15, alignItems: "center" }}
              onPress={() => {
                console.log("log out app");
                authenticationStore.logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'SplashScreen' }],
                });
               // navigation.navigate("SplashScreen" as never);
              }}>
              <Text
                tx="inforMerchant.logout"
                style={{ color: colors.palette.radicalRed, fontWeight: "700" }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                backgroundColor: colors.palette.neutral100,
                borderRadius: 8,
                marginTop: 10,
                width: "100%",
              },
            ]}>
            <TouchableOpacity
              style={{
                width: "100%",
                alignItems: "center",
                paddingVertical: 12,
              }}
              onPress={() => {
                setDiaLogout(!diaLogLogout);
              }}>
              <Text
                tx="inforMerchant.cancel"
                style={{ color: colors.palette.malibu, fontWeight: "700" }}
              />
            </TouchableOpacity>
          </View>
        </ReactNativeModal>

        <ReactNativeModal
          animationIn={"fadeInDown"}
          backdropOpacity={0.5}
          isVisible={isVisibleFeedback}
          onBackdropPress={() => {
            setIsVisibleFeedback(!isVisibleFeedback);
          }}
          style={{ justifyContent: "flex-end" }}>
          <View
            style={{ backgroundColor: colors.palette.white, borderRadius: 8 }}>
            <View
              style={{
                backgroundColor: "#C7C7C7",
                width: 68,
                height: 5,
                borderRadius: 100,
                alignSelf: "center",
                marginTop: 8,
              }}
            />
            <View style={{ padding: scaleWidth(15) }}>
              <View
                style={{
                  paddingVertical: scaleWidth(18),
                  paddingHorizontal: scaleHeight(10),
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  marginBottom: scaleHeight(15),
                  borderBottomColor: "#E7EFFF",
                }}>
                <Text tx="menuDrawer.feedback" style={{ fontWeight: "bold" }} />
                <TouchableOpacity
                  onPress={() => setIsVisibleFeedback(!isVisibleFeedback)}>
                  <Text
                    tx="inforMerchant.cancel"
                    style={{ color: colors.palette.radicalRed }}
                  />
                </TouchableOpacity>
              </View>

              <TextField
                labelTx={"feedBack.improtFeedback"}
                style={{ height: scaleWidth(210) }}
              />
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  padding: scaleWidth(12),
                  backgroundColor: colors.palette.navyBlue,
                  borderRadius: 8,
                }}>
                <Text
                  tx="inforMerchant.btnSen"
                  style={{ color: palette.white }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ReactNativeModal>
      </ScrollView>
    );
  });
