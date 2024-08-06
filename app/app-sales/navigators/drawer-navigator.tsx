import React, { useEffect, useState } from "react";
import { View, Dimensions, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text } from "../../components";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../app-sales/theme";
const { height } = Dimensions.get("window");
import { StyleSheet } from "react-native";
import { Svgs } from "../../../assets/svgs";
import Images from "../../../assets/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppStack } from "./app-navigator";
import en from "../../i18n/en";
import { useAppContext } from '../../app-context/AppContext';

export function CustomDrawerContent(props: any) {
  const [selectBuy, setSelectBuy] = useState(0);
  const { currentApp, setCurrentApp } = useAppContext();


  useEffect(() => {
    console.log('----------currentApp----22---', currentApp)
    const appItem = dataType.find(item => item.type === currentApp);
    if(appItem != undefined){
      setSelectBuy(appItem.id);
    }
  },[currentApp]);

  const dataType = [
    {
      id: 0,
      type: 'appPurchase',
      name: en.menuDrawer.textBuy,
      img: Svgs.icon_Box,
      onPress: () => {
        setCurrentApp('appPurchase')

      }
    },
    {
      id: 1,
      type: 'appSales',
      name: en.menuDrawer.textSell,
      img: Svgs.icon_Store,
      onPress: () => {
        setCurrentApp('appSales')

      }
    }, 
    {
      id: 2,
      type: 'appFinance',
      name: en.menuDrawer.finance,
      img: Svgs.ic_$,
      onPress: () => {
        setCurrentApp('appFinance')
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
  function IconLeftDrawer() {
    return (
      <View style={{ flexDirection: "column", marginTop: 10 }}>
        <Text style={styles.textHeaderDrawer}
        tx="menuDrawer.textHeaderDrawer">
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
                <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: scaleWidth(10) }}>
                  <View
                    style={selectBuy == index ? styles.lineMenu : styles.noLineMenu}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={
                        selectBuy == index ? styles.circle : styles.circleInactive
                      }>
                      <item.img width={22} height={22} />
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
      </View>
    );
  }
}

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
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
    fontSize: fontSize.size14,
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
    width: 40, // Đặt kích thước width
    height: 40, // Đặt kích thước height tương đương với width để tạo hình vuông
    borderRadius: 20, // Sử dụng một nửa giá trị của width/height để tạo hình tròn
    backgroundColor: colors.palette.navyBlue, // Màu nền của container hình tròn
    alignItems: "center",
    justifyContent: "center",
  },
  circleInactive: {
    marginLeft: 7,
    width: 40, // Đặt kích thước width
    height: 40, // Đặt kích thước height tương đương với width để tạo hình vuông
    borderRadius: 20, // Sử dụng một nửa giá trị của width/height để tạo hình tròn
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
  },
  textDrawer: {
    fontSize: fontSize.size12,
    fontWeight: "400",
    marginLeft: scaleWidth(15),
    color: colors.palette.navyBlue,
    alignSelf: 'center'
  },
  textDrawer2: {
    fontSize: fontSize.size12,
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
