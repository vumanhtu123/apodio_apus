/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
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
import { SvgIcon } from "../../../../../components/svg-icon";
import { Text } from "../../../../../components/text/text";
import { Button } from "../../../../../components/button/button";
import {
  colors,
  fontSize,
  padding,
  palette,
  scaleHeight,
  scaleWidth,
} from "../../../../theme";
// import { bgMyacc, flagEnglish, flagTimoleste } from "../../theme/images"
import { styles } from "./styles";
import { useStores } from "../../../../models";
import { TYPE_SELECT_IMAGE } from "../../../../utils/enum";
// import { changeLanguage } from "../../../i18n"
// import { formatPhoneNumber, validateFileSize } from "../../../utils/validate"
import {
  clear,
  getAccessToken,
  getCurrentLanguage,
  setAccessToken,
  setCurrentLanguage,
} from "../../../../utils/storage";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { hideLoading, showLoading } from "../../../utils/toast"
import ReactNativeModal from "react-native-modal";
import { useAuth } from "../../../contexts/auth";
// import { Screen } from "../screen/screen"
import { Header } from "../../../../../components/header/header";
import { Svgs } from "../../../../../../assets/svgs";
import { LinearGradient } from "react-native-linear-gradient";
// import { string } from "mobx-state-tree/dist/internal"
// import { BulletItem } from "app/components/bullet-item/bullet-item"
import { Row } from "../../../../../components/Row";
import {
  BottomParamList,
  TabScreenProps,
} from "../../../../navigators/bottom-navigation";
import { TextField } from "../../../../../components";
import { changeLanguage } from "../../../../../i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import I18n from "i18n-js";


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
    const [selectLanguage, setSelectLanguage] = useState<string>();
    const { top } = useSafeAreaInsets();
    const [data, setData] = useState();
    const [showLanguage, setShowLanguage] = useState(false);
    const [diaLogLogout, setDiaLogout] = useState(false);
    const auth = useAuth();
    const { authenticationStore } = useStores();

    const _onChangeLanguage = useCallback(
      (value: any) => {
        console.log("onChangeLanguage", value);
        setSelectLanguage(value);
        switch (value) {
          case 'vi':
            changeLanguage("en")
            break;
          case 'en':
            changeLanguage("fr")
          default:

            break;
        }
      },
      [selectLanguage]
    );


    const getValueLanguage = async () => {
      const a = await getCurrentLanguage()
      console.log('====================================');
      console.log('AAAAAAA', a);
      console.log('====================================');
      setSelectLanguage(a)
      return a
    }


    useEffect(() => {
      getValueLanguage()
      console.log('====================================');
      console.log("key select lenguage", I18n.locale);
      console.log('====================================');
      // _onChangeLanguage(selectLanguage)
    }, [])

    const textData = [
      {
        title: "inforMerchant.btnInfor",
        icon: Svgs.ic_infor,
        onPress: () => {
          // Alert.alert('ok')
          props.navigation.navigate("inforAccount" as never);
        },
      },
      {
        title: "inforMerchant.btnSecutityAcc",
        icon: Svgs.ic_secutity,
        onPress: () => props.navigation.navigate("accountSecurity" as never),
      },
      {
        title: "inforMerchant.btnChangePassword",
        icon: Svgs.ic_changePass,
        onPress: () => props.navigation.navigate("changePass" as never),
      },
      {
        title: "inforMerchant.btnIntroduct",
        icon: Svgs.ic_inTroduce,
        onPress: () => props.navigation.navigate("Introduce" as never),
      },
      {
        title: "inforMerchant.btnFeedback",
        icon: Svgs.ic_feedBack,
        onPress: () => setIsVisibleFeedback(!isVisibleFeedback),
      },
      {
        title: "inforMerchant.btnSettingBell",
        icon: Svgs.ic_settingBell,
        onPress: () => props.navigation.navigate("notificationSetting" as never),
      },
    ];


    return (
      <ScrollView>
        <View style={styles.ROOT}>
          <View style={{ width: "100%" }}>
            <Header
              style={{
                alignItems: "center",
                height: 52,
                justifyContent: "center",
              }}
              LeftIcon={Svgs.back}
              headerTx="inforMerchant.setTingShop"
              titleStyle={{ color: colors.white }}
              type={"AntDesign"}
              onLeftPress={() => navigation.goBack()}
            />

            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              colors={[colors.palette.navyBlue, colors.palette.malibu]}
              style={{ height: 70 }}></LinearGradient>
          </View>
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
            // elevation: 5,
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
                  <Svgs.ic_right width={20} height={20} />
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
          onBackdropPress={async () => {
            setShowLanguage(false);
            const a = await getCurrentLanguage()
            console.log('asdgfkas', a)
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
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
            </Row>

            <View
              style={{ width: "100%", height: 1, backgroundColor: colors.solitude2 }}
            />
            <TouchableOpacity
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={async () => {
                // selectLanguage.current = true;
                _onChangeLanguage('vi');

                await setCurrentLanguage("vi")
                setShowLanguage(false);

              }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ padding: 8 }}>
                  <Svgs.icon_VietNam />
                </View>
                <Text>Tiếng Việt </Text>
              </View>
              {selectLanguage == 'vi' ? <Svgs.ic_tick /> : null}
            </TouchableOpacity>
            <View
              style={{ width: "100%", height: 1, backgroundColor: colors.solitude2 }}
            />

            <TouchableOpacity
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => {
                // selectLanguage.current = false;
                _onChangeLanguage('en');
                setCurrentLanguage('en')
                setShowLanguage(false);

              }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ padding: 8 }}>
                  <Svgs.icon_English />
                </View>
                <Text>Tiếng Anh </Text>
              </View>
              {selectLanguage == "en" ? <Svgs.ic_tick /> : null}
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
              style={{ width: "100%", height: 1, backgroundColor: colors.solitude2 }}
            />
            <TouchableOpacity
              style={{ marginVertical: 15, alignItems: "center" }}
              onPress={() => {
                console.log("log out app");
                authenticationStore.logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: "SplashScreen" }],
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
                backgroundColor: colors.veryLightGrey1,
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
                  borderBottomColor: colors.solitude2,
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
