import { createBottomTabNavigator, BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import React from "react"
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native"
import { DashBoardScreen, ProductScreen, OrderScreen } from "../screens"
import { CommonActions, CompositeScreenProps } from "@react-navigation/native"
import {NavigatorParamList, AppStackScreenProps} from './app-navigator';
import { SvgIcon, Text } from "../components"
import { colors } from "../theme"
import { fontSize, scaleHeight, scaleWidth } from "../theme/dimension"
import { Images } from '../../assets'
import { UserScreen } from "../screens/common/users/view/users-screen"

export type BottomParamList = {
  home: undefined
  orders: undefined
  products: undefined
  account: undefined
  users: undefined

}

export type TabScreenProps<T extends keyof BottomParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomParamList, T>,
    AppStackScreenProps<keyof NavigatorParamList>
  >

const Tab = createBottomTabNavigator<BottomParamList>()

export function MainBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="home" component={DashBoardScreen} />
      <Tab.Screen name="products" component={ProductScreen} />
      <Tab.Screen name="orders" component={OrderScreen} />
      <Tab.Screen name="users" component={UserScreen} />
    </Tab.Navigator>
  )
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={viewTabbar}>
      {state.routes.map((route: { key: string | number; name: string }, index: React.Key | null | undefined) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index
        const onPress = (routeKey: any, routeName: any) => {
          const event = navigation.emit({
            type: "tabPress",
            target: routeKey || route.key,
            canPreventDefault: true,
          })
          if (!event.defaultPrevented) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: routeName || route.name }],
              }),
            )
          }
        }

        let IconTabBar: React.ReactNode
        if (route.name === "home") {
          IconTabBar = isFocused ? <Images.icon_dashboardFocus /> : <Images.icon_dashboard />
        } else if (route.name === "orders") {
          IconTabBar = isFocused ? <Images.icon_orderTabFocus /> : <Images.icon_orderTab />
        } else if (route.name === "products") {
          IconTabBar = isFocused ? <Images.icon_exampleTabFocus /> : <Images.icon_exampleTab />
        } else if (route.name === "users") {
          IconTabBar = isFocused ? <Images.icon_userTabFocus /> : <Images.icon_userTab />
        }
        let label = 'home'
        if (route.name === "home") {
          label = !isFocused ? 'bottomNavigation.dashboard' : 'bottomNavigation.dashboard'
        } else if (route.name === "orders") {
          label = !isFocused ? 'bottomNavigation.order' : 'bottomNavigation.order'
        } else if (route.name === "products") {
          label = !isFocused ? 'bottomNavigation.product' : 'bottomNavigation.product'
        } else if (route.name === "users") {
          label = !isFocused ? 'bottomNavigation.users' : 'bottomNavigation.users'
        }
        return (
          <Tabbar
            key={index}
            route={route}
            isFocused={isFocused}
            options={options}
            onPress={onPress}
            IconTabBar={IconTabBar}
            label={label}
          />
        )
      })}
    </View>
  )
}

const Tabbar = ({ route, isFocused, options, onPress, label, IconTabBar }) => {
  return (
    <TouchableOpacity
      key={route.name}
      activeOpacity={1}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      style={viewItemTab}
    >
      {IconTabBar}
      <Text
        tx={label}
        style={{
          color: isFocused ? colors.yellow : '#B6B6B6',
          marginTop: scaleHeight(5),
          fontSize: fontSize.size11,
        }}
      />
    </TouchableOpacity>
  )
}

const viewTabbar: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: scaleHeight(10),
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  backgroundColor: '#FFFFFF',
  paddingHorizontal: scaleWidth(15),
  paddingBottom: Platform.OS === 'android' ? scaleHeight(15) : scaleHeight(25),
  shadowColor: '#000', // Màu của bóng
  shadowOffset: { width: 0, height: -2 }, // Độ dịch chuyển của bóng theo trục x và y
  shadowOpacity: 0.25, // Độ mờ của bóng
  shadowRadius: 3, // Bán kính của bóng
  elevation: 5, // Độ nâng của bóng (chỉ áp dụng cho Android)
}
const viewItemTab: ViewStyle = {
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  width: scaleWidth(59),
  height: scaleHeight(61),
  borderRadius: 100,
}
