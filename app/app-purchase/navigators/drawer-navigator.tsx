import React, { useState } from "react";
import { View, Dimensions, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text } from "../components";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../app-purchase/theme";
const { height } = Dimensions.get("window");
import { StyleSheet } from "react-native";
import { Svgs } from "../../../assets/svgs";
import Images from "../../../assets/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MainBottomTab } from "./bottom-navigation";
import { AppStack } from "./app-navigator";
import { OpenAppStack } from "./open-app-navigator";
import { AuthStack } from "./auth-navigator";
import en from "../i18n/en";
import { map } from "mobx-state-tree/dist/internal";
import { longPressHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler";
export function CustomDrawerContent(props: any) {
  const [selectBuy, setSelectBuy] = useState(0);

  const dataTop = [
    {
      textTittle: "menuDrawer.inforMerchant",
      imageIcon: Svgs.icon_info,
    },
    {
      textTittle: "menuDrawer.securityAccount",
      imageIcon: Svgs.icon_security,
    },
    {
      textTittle: "menuDrawer.changePass",
      imageIcon: Svgs.icon_pass,
    },
    {
      textTittle: "menuDrawer.settingNoti",
      imageIcon: Svgs.icon_noti,
    },
  ];

  const dataBottom = [
    {
      textTittle: "menuDrawer.introduct",
      imageIcon: Svgs.icon_introduct,
    },
    {
      textTittle: "menuDrawer.feedback",
      imageIcon: Svgs.icon_feedback,
    },
    {
      textTittle: "menuDrawer.logout",
      imageIcon: Svgs.icon_logout,
    },
  ];

  const dataType = [
    {
      id: 0,
      name: en.menuDrawer.textBuy,
      img: Svgs.icon_Box,
      onPress: () => {
        console.log("Man hinh 1:");

      }
    },
    {
      id: 1,
      name: en.menuDrawer.textSell,
      img: Svgs.icon_Store,
      onPress: () => {
        console.log("Man hinh 2:");

      }
    }, {
      id: 2,
      name: en.menuDrawer.finance,
      img: Svgs.ic_$,
      onPress: () => {
        console.log("Man hinh 3:");
      }
    }
  ]
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentScrollView}>
      <View style={styles.drawerContainer}>
        <View style={styles.leftContainer}>
          {/* Nội dung bên trái */}
          <IconLeftDrawer />
        </View>

      </View>
    </DrawerContentScrollView>
  );
  // eslint-disable-next-line react/no-unstable-nested-components
  function ItemDrawer(props: { onClick: any; item: any; textInfo: any }) {
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 16,
            marginTop: 16,
            alignItems: "center",
          }}>
          <props.item />
          <Text style={styles.textOptions} tx={props.textInfo} />
        </View>
      </TouchableOpacity>
    );
  }
  // eslint-disable-next-line react/no-unstable-nested-components
  function IconLeftDrawer() {
    return (
      <View style={{ flexDirection: "column", marginTop: 10 }}>
        <Text style={styles.textHeaderDrawer}
        >
          {en.menuDrawer.textHeaderDrawer}
        </Text>
        {
          dataType.map((item, index) => {
            return (

              <TouchableOpacity onPress={() => {
                console.log("value id", index);
                setSelectBuy(index)
                item.onPress()
              }}
                key={item.id}
              >
                <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: scaleWidth(5) }}>
                  <View
                    style={selectBuy == index ? styles.lineMenu : styles.noLineMenu}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={
                        selectBuy == index ? styles.circle : styles.circleInactive
                      }>
                      <item.img width={24} height={24} />
                    </View>
                    <Text
                      style={[selectBuy == index ? styles.textDrawer : styles.textDrawer2,]}
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }

        {/* <TouchableOpacity onPress={props.onClick}>
          <View style={{ flexDirection: "row", marginTop: 15, }}>
            <View
              style={selectBuy == 0 ? styles.lineMenu : styles.noLineMenu}
            />
            <View style={{ flexDirection: "row" }}>
              <View
                style={
                  selectBuy == 0 ? styles.circle : styles.circleInactive
                }>
                <Svgs.icon_Store width={24} height={24} />
              </View>
              <Text
                style={
                  selectBuy == 0 ? styles.textDrawer : styles.textDrawer2
                }
                tx="menuDrawer.textSell"
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onClick}>
          <View style={{ flexDirection: "row", marginTop: 15, }}>
            <View
              style={selectBuy == 0 ? styles.lineMenu : styles.noLineMenu}
            />
            <View style={{ flexDirection: "row" }}>
              <View
                style={
                  selectBuy == 0 ? styles.circle : styles.circleInactive
                }>
                <Svgs.ic_$ width={24} height={24} />
              </View>
              <Text
                style={
                  selectBuy == 0 ? styles.textDrawer : styles.textDrawer2
                }

              >
                {en.menuDrawer.finance}
              </Text>
            </View>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }
  // eslint-disable-next-line react/no-unstable-nested-components
  function RightDrawerTop(props: { onClick: any; nameCompany: any }) {
    return (
      <View style={{ backgroundColor: "white", borderBottomLeftRadius: 8 }}>
        <View
          style={{
            flexDirection: "row",
            paddingTop: scaleHeight(13),
            paddingLeft: scaleWidth(6),
          }}>
          {/* <Image
            source={require("../../assets/Images/Avatar.png")}
            width={20}
            height={20}
          /> */}
          <Svgs.icon_VietNam width={57} height={57} />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.tittleCompany}>{props.nameCompany}</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.textInfoCompany} tx="menuDrawer.inforStore" />
              <View style={styles.containerImage}>
                <Svgs.icon_caretRight width={10} height={10} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.containerImage2}>
          <Image source={Images.banner} style={{ width: 225, height: 130 }} />
        </View>
        {dataTop.map((index) => (
          <ItemDrawer
            onClick={{}}
            item={index.imageIcon}
            textInfo={index.textTittle}
          />
        ))}
        <View style={{ marginBottom: 16 }} />
      </View>
    );
  }
  // eslint-disable-next-line react/no-unstable-nested-components
  function RightDrawerBottom(_props: { onClick: any }) {
    return (
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 8,
          height: "100%",
          marginTop: 12,
        }}>
        {dataBottom.map((index) => (
          <ItemDrawer
            onClick={{}}
            item={index.imageIcon}
            textInfo={index.textTittle}
          />
        ))}
      </View>
    );
  }
}

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      {/* Các Screen của bạn */}
      {/* <Drawer.Screen
        name="home"
        component={MainBottomTab}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="app1"
        component={AuthStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="app2"
        component={OpenAppStack}
        options={{ headerShown: false }}
      /> */}
      <Drawer.Screen
        name="app"
        component={AppStack}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

export const styles = StyleSheet.create({
  textOptions: {
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 4,
  },
  containerImage2: {
    marginTop: 20,
  },
  containerInfo: {
    textAlign: "center",
    flexDirection: "row",
    marginLeft: scaleWidth(6),
    marginTop: scaleHeight(8),
  },
  containerImage: {
    marginTop: scaleHeight(4),
  },
  textInfoCompany: {
    color: colors.palette.dolphin,
    fontSize: 10,
    fontWeight: "400",
  },
  tittleCompany: {
    color: "black",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: scaleWidth(6),
    marginTop: scaleHeight(10),
  },
  contentScrollView: {
    flex: 1,
    flexDirection: "column",
  },
  drawerContainer: {
    flexDirection: "row",
    height: height,
  },
  leftContainer: {
    flex: 1,
    backgroundColor: colors.palette.colorDrawer1,
    flexDirection: "column",
  },
  rightContainer: {
    flex: 1,
    backgroundColor: colors.palette.colorDrawer1,
    flexDirection: "column",
  },
  circle: {
    marginLeft: 7,
    width: 50, // Đặt kích thước width
    height: 50, // Đặt kích thước height tương đương với width để tạo hình vuông
    borderRadius: 50, // Sử dụng một nửa giá trị của width/height để tạo hình tròn
    backgroundColor: colors.palette.navyBlue, // Màu nền của container hình tròn
    alignItems: "center",
    justifyContent: "center",
  },
  circleInactive: {
    marginLeft: 7,
    width: 50, // Đặt kích thước width
    height: 50, // Đặt kích thước height tương đương với width để tạo hình vuông
    borderRadius: 50, // Sử dụng một nửa giá trị của width/height để tạo hình tròn
    backgroundColor: colors.palette.colorIconInactive, // Màu nền của container hình tròn
    alignItems: "center",
    justifyContent: "center",
  },
  lineMenu: {
    width: 4,
    backgroundColor: colors.palette.red,

  },
  noLineMenu: {
    width: 4,
    // height: 82,

  },
  textDrawer: {
    fontSize: fontSize.size12,
    fontWeight: "400",
    marginLeft: 15,
    color: colors.palette.navyBlue,
    alignSelf: 'center'
  },
  textDrawer2: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    // lineHeight: 15,
    marginLeft: 15,
    color: colors.palette.dolphin,
    alignSelf: 'center'
  },
  textHeaderDrawer: {
    fontSize: fontSize.size12,
    fontWeight: '700',
    marginLeft: scaleWidth(15),
    marginVertical: scaleHeight(15)
  }
});
