/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  StackActions,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import React from "react";
import { MainBottomTab } from "./bottom-navigation";
import { AuthProvider } from "../screens/contexts/auth";
import { Router } from "./router";
import { AuthStack } from "./auth-navigator";
import * as Screens from "../screens";
import { termsAndAgreementsScreen } from "../screens/common/users/termsAndAgreements/termsAndAgreements";
import { commentScreen } from "../screens/common/users/comment/comment";
import { faqScren } from "../screens/common/users/FAQ/faq";
import { addCheckInventory } from "../screens/check-inventory/add-check-inventory/add-check-inventory";
import { addProductCreate } from "../screens/check-inventory/add-check-inventory/addProduct";
import { TransactionHistoryScreen } from "../screens/transaction-history/transaction-history-screen/transactionHistoryScreen";
import { TransactionHistoryDetial } from "../screens/transaction-history/transaction-history-detail/transactionHistoryDetail";
import { CreateExportGoods } from "../screens/goods-delivery-book/Create-Export-Goods/createExportGoods";
import { ClientScreen } from "../screens/Client/client-screen";
import { detailClientScrent } from "../screens/Client/detail_Client/detail-client";
import { AddClientToGroup } from "../screens/Client/add-client-to-group";
import { useColorScheme } from "react-native";
import { navigationRef, useBackButtonHandler } from "./navigation-utilities";
import { MyDrawer } from "./drawer-navigator";

// import { CardStyleInterpolators } from "@react-navigation/stack";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  mainBottom: undefined;
  notificationSetting: undefined;
  notificationScreen: undefined;
  selectLanguage: undefined;
  productScreen: undefined;
  introduction: undefined;
  infoMerchant: undefined;
  orderDetails: undefined;
  newOrder: undefined;
  newAndEditOrder: undefined;
  promotion: undefined;
  arrangeProduct: undefined;
  selectFilter: undefined;
  productCategoriesScreen: undefined;
  productDetailScreen: undefined;
  classifyDetailScreen: undefined;
  suppliersScreen: undefined;
  introduction2: undefined;
  comment: undefined;
  termsAndAgreement: undefined;
  faqscren: undefined;
  listBrcik: undefined;
  example: undefined;
  detaiExample: undefined;
  resquestEample: undefined;
  filterScreen: undefined;
  authStack: any;
  ProductCreateScreen: undefined;
  view3D: undefined;
  createConversionGroup: undefined;
  ChooseSupplierScreen: undefined;
  TestDebug: undefined;
  addAttribute: undefined;
  successScreen: undefined;
  Introduce: undefined;
  accountSecurity: undefined;
  changePass: undefined;
  clientScreen: undefined;
  detailClient: undefined;
  addClientToGroup: undefined;
  inventoryManagement: undefined;
  addCheckIventory: undefined;
  addProduct: undefined;
  transactionHistory: undefined;
  transactionHistoryDetail: undefined;
  wareHouse: undefined;
  doan: undefined;
  GoodsDeliveryBook: undefined;
  createImportGoods: undefined;
  createExportGoods: undefined;
  createDeliveNote: undefined;
  detaiExampleGoods: undefined;
  inforAccount: undefined;
  ChooseVendorScreen: undefined;
  SplashScreen: undefined;
  ProductEditScreen: undefined;
  newAttribute: undefined;
  editAttribute: undefined;
  editAttributeByEdit: undefined;
  detailsSupplier: undefined;
  ballotDetail: undefined;
  detaiExportGoods: undefined;
  importGoodsBook: undefined;
  createGoodsReceipt: undefined;
  detailImportReceipt: undefined;
  voucherDetail: undefined;
  warehouseBook: undefined;
  filterInWarehouseBook: undefined;
  debt: undefined;
  mustPay: undefined;
  detailsOrderScreen: undefined;
  orderTracking: undefined;
  orderDetailsSupplier: undefined;
  selectClient: undefined;
  paymentBuy: undefined;
  deliveryAddress: { dataAddress: any };
  newDelivery: undefined;
  addProductOrder: undefined;
  filterSelectScreen: undefined;
  selectVariant: undefined;
  filterOrderScreen: undefined;
  printInvoiceScreen: undefined;
  newInvoice: undefined;
  selectApplicablePriceList: undefined;
  filterSelectApplicablePriceList: undefined;
  detailDebt: undefined;
  orderSuccess: undefined;
  orderScreen: undefined;
  editWeight: undefined;
  EditClassify: undefined;
  RevenueScreen: undefined;
  receivable: undefined;
  detailReceivable: undefined;
  moneyManagement: undefined;
  transferMoneyScreen: undefined;
  expenseScreen: undefined;
  addRevenueScreen: undefined;
  filterRevenueScreen: undefined;
  detailWarehouse: undefined;
  warehouse: undefined;
};

export type AppStackScreenProps<T extends keyof NavigatorParamList> =
  StackScreenProps<NavigatorParamList, T>;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<NavigatorParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Ẩn header cho tất cả các màn hình
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      }}
      // orderSuccess
      initialRouteName={"mainBottom"}>
      <Stack.Screen
        name="accountSecurity"
        component={Screens.AccountSecurity}
      />
      <Stack.Screen name="Introduce" component={Screens.IntroductionScreen2} />
      <Stack.Screen name="changePass" component={Screens.changePassScreen} />
      <Stack.Screen
        name="termsAndAgreement"
        component={termsAndAgreementsScreen}
      />
      <Stack.Screen name="comment" component={commentScreen} />
      <Stack.Screen name="faqscren" component={faqScren} />

      {/* clientScreen */}
      <Stack.Screen name="clientScreen" component={ClientScreen} />
      <Stack.Screen name="detailClient" component={detailClientScrent} />
      <Stack.Screen name="addClientToGroup" component={AddClientToGroup} />

      {/* màn hình kiểm kho */}
      <Stack.Screen
        name="inventoryManagement"
        component={Screens.InventoryManagement}
      />
      <Stack.Screen name="addCheckIventory" component={addCheckInventory} />
      <Stack.Screen name="addProduct" component={addProductCreate} />

      {/* <Stack.Screen name="listCompany" component={Screens.ListCompany} /> */}

      {/* màn hình lịch sử mua hàng */}
      <Stack.Screen
        name="transactionHistory"
        component={TransactionHistoryScreen}
      />
      <Stack.Screen
        name="transactionHistoryDetail"
        component={TransactionHistoryDetial}
      />

      {/* màn hình kho */}
      <Stack.Screen name="wareHouse" component={Screens.wareHouseScreen} />

      <Stack.Screen
        name="GoodsDeliveryBook"
        component={Screens.GoodsDeliveryBook}
      />
      <Stack.Screen name="createExportGoods" component={CreateExportGoods} />
      <Stack.Screen
        name="createDeliveNote"
        component={Screens.CreateDeliveryNote}
      />
      <Stack.Screen
        name="detaiExampleGoods"
        component={Screens.DetailExportGoods}
      />

      <Stack.Screen name="inforAccount" component={Screens.InfoAccount} />
      <Stack.Screen
        name="notificationSetting"
        component={Screens.NotificationSetting}
      />
      <Stack.Screen name="ballotDetail" component={Screens.BallotDetail} />

      <Stack.Screen
        name="detaiExportGoods"
        component={Screens.DetailExportGoods}
      />

      {/* màn sổ nhập */}
      <Stack.Screen
        name="importGoodsBook"
        component={Screens.ImprotGoodsBook}
      />
      <Stack.Screen
        name="createImportGoods"
        component={Screens.CreateImportGoods}
      />
      <Stack.Screen
        name="createGoodsReceipt"
        component={Screens.CreateGoodsReceipt}
      />
      <Stack.Screen
        name="detailImportReceipt"
        component={Screens.DetailImportReceipt}
      />
      <Stack.Screen name="voucherDetail" component={Screens.VoucherDetail} />

      {/* màn hình sô kho */}
      <Stack.Screen name="warehouseBook" component={Screens.warehouseBook} />
      <Stack.Screen
        name="filterInWarehouseBook"
        component={Screens.FilterWarehouseBook}
      />

      {/* Màn hình công nợ */}
      <Stack.Screen name="debt" component={Screens.DebtScreen} />
      <Stack.Screen name="mustPay" component={Screens.MustPayScreen} />
      <Stack.Screen name="detailDebt" component={Screens.DetailDebtScreen} />
      <Stack.Screen name="receivable" component={Screens.ReceivableScreen} />

      <Stack.Screen
        name="detailWarehouse"
        component={Screens.DetailWarehouseScreen}
      />

      <Stack.Screen name="addRevenueScreen" component={Screens.RevenueScreen} />
      <Stack.Screen name="expenseScreen" component={Screens.ExpenseScreen} />
      <Stack.Screen
        name="detailReceivable"
        component={Screens.DetailReceivable}
      />
      <Stack.Screen
        name="moneyManagement"
        component={Screens.MoneyManagementScreen}
      />

      <Stack.Screen
        name="transferMoneyScreen"
        component={Screens.TransferMoneyScreen}
      />

      <Stack.Screen
        name="selectClient"
        component={Screens.SelectClientScreen}
      />
      <Stack.Screen
        name="filterSelectScreen"
        component={Screens.FilterSelectScreen}
      />
      <Stack.Screen
        name="selectApplicablePriceList"
        component={Screens.SelectApplicablePriceList}
      />
      <Stack.Screen
        name="filterSelectApplicablePriceList"
        component={Screens.FilterSelectApplicablePriceList}
      />
      <Stack.Screen
        name="mainBottom"
        options={{ gestureEnabled: false }}
        component={MainBottomTab}
      />

      <Stack.Screen
        name="authStack"
        options={{ gestureEnabled: false }}
        component={AuthStack}
      />
      <Stack.Screen
        name="productCategoriesScreen"
        options={{ gestureEnabled: false }}
        component={Screens.ProductCategoriesScreen}
      />
      <Stack.Screen
        name="createConversionGroup"
        options={{ gestureEnabled: false }}
        component={Screens.CreateConversionGroup}
      />
      <Stack.Screen
        name="productScreen"
        options={{ gestureEnabled: false }}
        component={Screens.ProductScreen}
      />
      <Stack.Screen
        name="arrangeProduct"
        options={{ gestureEnabled: false }}
        component={Screens.ArrangeProduct}
      />
      <Stack.Screen
        name="selectFilter"
        options={{ gestureEnabled: false }}
        component={Screens.ArrangeProduct}
      />
      <Stack.Screen
        name="productDetailScreen"
        options={{ gestureEnabled: false }}
        component={Screens.ProductDetailScreen}
      />
      <Stack.Screen
        name="classifyDetailScreen"
        options={{ gestureEnabled: false }}
        component={Screens.ClassifyDetailScreen}
      />
      <Stack.Screen
        name="filterScreen"
        options={{ gestureEnabled: false }}
        component={Screens.FilterScreen}
      />
      <Stack.Screen
        name="ProductCreateScreen"
        options={{ gestureEnabled: false }}
        component={Screens.ProductCreateScreen}
      />

      <Stack.Screen
        name="editAttribute"
        options={{ gestureEnabled: false }}
        component={Screens.EditAttribute}
      />

      <Stack.Screen
        name="editAttributeByEdit"
        options={{ gestureEnabled: false }}
        component={Screens.EditAttributeByEdit}
      />

      <Stack.Screen
        name="addAttribute"
        options={{ gestureEnabled: false }}
        component={Screens.AddAttribute}
      />

      <Stack.Screen
        name="newAttribute"
        options={{ gestureEnabled: false }}
        component={Screens.NewAttribute}
      />
      <Stack.Screen
        name="deliveryAddress"
        options={{ gestureEnabled: false }}
        component={Screens.DeliveryAddress}
      />
      <Stack.Screen
        name="newDelivery"
        options={{ gestureEnabled: false }}
        component={Screens.NewDelivery}
      />
      <Stack.Screen
        name="orderSuccess"
        options={{ gestureEnabled: false }}
        component={Screens.OrderSuccess}
      />
      <Stack.Screen
        name="orderScreen"
        options={{ gestureEnabled: false }}
        component={Screens.OrderScreen}
      />
      <Stack.Screen
        name="addProductOrder"
        options={{ gestureEnabled: false }}
        component={Screens.AddProductOrder}
      />
      <Stack.Screen
        name="selectVariant"
        options={{ gestureEnabled: false }}
        component={Screens.SelectVariant}
      />
      <Stack.Screen
        name="filterOrderScreen"
        options={{ gestureEnabled: false }}
        component={Screens.FilterOrderScreen}
      />
      <Stack.Screen
        name="orderDetails"
        options={{ gestureEnabled: false }}
        component={Screens.OrderDetails}
      />
      <Stack.Screen
        name="printInvoiceScreen"
        options={{ gestureEnabled: false }}
        component={Screens.PrintInvoiceScreen}
      />
      <Stack.Screen
        name="newInvoice"
        options={{ gestureEnabled: false }}
        component={Screens.NewInvoice}
      />
      <Stack.Screen
        name="newOrder"
        options={{ gestureEnabled: false }}
        component={Screens.NewOrder}
      />
      <Stack.Screen
        name="newAndEditOrder"
        options={{ gestureEnabled: false }}
        component={Screens.NewAndEditOrder}
      />
      <Stack.Screen
        name="orderTracking"
        options={{ gestureEnabled: false }}
        component={Screens.OrderTracking}
      />
      <Stack.Screen
        name="view3D"
        options={{ gestureEnabled: false }}
        component={Screens.View3D}
      />
      <Stack.Screen
        name="ChooseVendorScreen"
        options={{ gestureEnabled: false }}
        component={Screens.ChooseVendorScreen}
      />
      <Stack.Screen
        name="successScreen"
        options={{ gestureEnabled: false }}
        component={Screens.SuccessScreen}
      />
      <Stack.Screen
        name="ProductEditScreen"
        options={{ gestureEnabled: false }}
        component={Screens.ProductEditScreen}
      />
      <Stack.Screen
        name="suppliersScreen"
        options={{ gestureEnabled: false }}
        component={Screens.SuppliersScreen}
      />
      <Stack.Screen
        name="TestDebug"
        options={{ gestureEnabled: false }}
        component={Screens.TestDebugger}
      />
      <Stack.Screen
        name="SplashScreen"
        options={{ gestureEnabled: false }}
        component={Screens.SplashScreen1}
      />
      <Stack.Screen
        name="editWeight"
        options={{ gestureEnabled: false }}
        component={Screens.EditWeight}
      />
      <Stack.Screen
        name="EditClassify"
        options={{ gestureEnabled: false }}
        component={Screens.EditClassify}
      />
      <Stack.Screen
        name="detailsSupplier"
        options={{ gestureEnabled: false }}
        component={Screens.DetailsSupplierScreen}
      />
      <Stack.Screen
        name="paymentBuy"
        options={{ gestureEnabled: false }}
        component={Screens.PaymentMethodScreen}
      />
      {/* <Stack.Screen
        name="detailsOrderScreen"
        options={{ gestureEnabled: false }}
        component={Screens.DetailsOrderScreen}
      /> */}
      <Stack.Screen
        name="orderDetailsSupplier"
        options={{ gestureEnabled: false }}
        component={Screens.OrderDetailsScreen}
      />
      <Stack.Screen
        name="RevenueScreen"
        options={{ gestureEnabled: false }}
        component={Screens.ListRevenueScreen}
      />
      <Stack.Screen
        name="filterRevenueScreen"
        options={{ gestureEnabled: true }}
        component={Screens.FilterRevenueScreen}
      />
      <Stack.Screen
        name="warehouse"
        options={{ gestureEnabled: true }}
        component={Screens.CreateWareHouseScreen}
      />
    </Stack.Navigator>
  );
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = (props: NavigationProps) => {
  // const colorScheme = useColorScheme()
  const colorScheme = useColorScheme();
  // useBackButtonHandler(canExit);
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

  // return (
  //   <AuthProvider>
  //     <NavigationContainer
  //       ref={navigationRef}
  //       theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
  //       {...props}>
  //       {/* <AppStack /> */}
  //       <MyDrawer />
  //     </NavigationContainer>
  //   </AuthProvider>
  // );

  return (
    <AuthProvider>
      <Router {...props} />
    </AuthProvider>
  );
};

AppNavigator.displayName = "AppNavigator";

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
