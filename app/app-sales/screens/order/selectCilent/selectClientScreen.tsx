import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { FC, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  FlatList,
  Platform,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScreenStackProps } from "react-native-screens";
import { NavigatorParamList } from "../../../navigators";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { Header, Text } from "../../../../app-purchase/components";
import { Svgs } from "../../../../../assets/svgs";
import { colors, fontSize, padding, scaleHeight, scaleWidth } from "../../../theme";
import { Styles } from "./styles";
import SelectFilterModal from "./Modal/modal-select-filter";
import { useStores } from "../../../models";
import ModalCreateClient from "./Modal/modal-create-client";
import { useNavigation } from "@react-navigation/native";
import { ALERT_TYPE, Toast } from "../../../../app-purchase/components/dialog-notification";
import { translate } from "../../../i18n";

export const SelectClientScreen: FC<
  StackScreenProps<NavigatorParamList, "selectClient">
> = observer(function SelectClientScreen(props) {
  const [indexSelect, setIndexSelect] = useState<any>();
  const [onClick, setOnClick] = useState("successfully");
  const [isVisible, setIsVisible] = useState(false);
  const [myDataSelectClient, setMyDataSelectClient] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // const [size, setsize] = useState<any>();
  const getAPi = useStores();
  const [isVisibleCreateClient, setIsVisibleCreateClient] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [isShowSearch, setisShowSearch] = useState(false);
  const [dataItemSelect, setdataItemSelect] = useState(getAPi.orderStore.dataClientSelect)

  const size = useRef(15);
  // const isLoadingMore = useRef<boolean>(false)
  // console.log("doannnnn", dataItemSelect);


  const sort = getAPi.orderStore.sortCreateClient;

  const statusLoadMore = getAPi.orderStore.isLoadMoreSelectClient
  // console.log('value is load more', statusLoadMore);

  var partnerTagIds = props.route.params?.myTag
  console.log('====================================');
  console.log("My data Tag", partnerTagIds);
  console.log('====================================');

  const type = partnerTagIds?.map((item: any) => item).join(", ")
  // console.log("My data Tag 2", type);

  const getListClient = () => {
    getAPi.orderStore
      .getListSelectClient(0, size.current, sort, valueSearch, true, statusLoadMore, type ?? null)
      .then((data) => {
        // console.log("data SelectClient", data);

        // setTotalPage(data?.totalPages)

        const dataSelectClient = data?.content.map((item) => {
          return {
            id: item.id,
            name: item.name,
            code: item.code,
            phoneNumber: item.phoneNumber,
            isHaveDeliveryAddress: item.isHaveDeliveryAddress
          };
        });
        setMyDataSelectClient(dataSelectClient);
      });
  };

  useEffect(() => {
    getListClient();
  }, [getAPi.orderStore.sortCreateClient,]);

  useEffect(() => {
    getListClient();
  }, [size]);

  const getDebtLimit = () => {
    if (getAPi.orderStore.dataClientSelect !== null) {
      getAPi.orderStore
        .getDebtLimit(getAPi.orderStore.dataClientSelect.id)
        .then((data: any) => {
          console.log("check cln", data);
          getAPi.orderStore.setDataDebtLimit(data);
        });
    }
  };

  // console.log("load more", isLoadingMore);

  const handleRefresh = () => {
    setRefreshing(true);
    try {
      // Gọi API hoặc thực hiện các tác vụ cần thiết để lấy dữ liệu mới
      getListClient();
      // Cập nhật state của danh sách dữ liệu
      // setmyDataSlectClient(newData);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  const senDataClientSelected = () => {

    if (Number(dataItemSelect?.id) === Number(getAPi.orderStore.dataClientSelect.id)) {
      getAPi.orderStore.setCheckIdPartner(false)
    } else {
      getAPi.orderStore.setCheckIdPartner(true)
    }
    console.log('-------dataItemSelect------', JSON.stringify(dataItemSelect))
    getAPi.orderStore.setDataClientSelect(dataItemSelect);
    getAPi.orderStore.setIsLoadMoreSelectClient(false);
    props.navigation.goBack();
  };

  useEffect(() => {

    getListClient();

  }, [getAPi.orderStore.sortCreateClient, partnerTagIds]);

  useEffect(() => {
    getListClient()
  }, [size])

  console.log("load more", isLoadingMore);

  const handleLoadMore = () => {
    getAPi.orderStore.setIsLoadMoreSelectClient(true)
    setIsLoadingMore(true);
    // console.log('====================================');
    // console.log("value loading", isLoadingMore);
    // console.log('====================================');
    size.current = (size.current + 3);
    getListClient();
    setTimeout(() => {
      setIsLoadingMore(false);
    }, 3000);
  };
  const handelSearch = () => {
    getListClient();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        headerTx="selectClient.selectClient"
        LeftIcon={Svgs.back}
        onLeftPress={() => {
          getAPi.orderStore.setIsLoadMoreSelectClient(false)

          props.navigation.goBack()
        }}
        RightIcon={Svgs.icon_funnel}
        RightIcon1={Svgs.icon_search}
        style={{ height: scaleWidth(52) }}
        headerInput={isShowSearch}
        handleOnSubmitSearch={() => {
          handelSearch();
        }}
        onSearchValueChange={(txt: any) => {
          setValueSearch(txt);
        }}
        onRightPress={() => {
          // openTypeFilter

          props.navigation.navigate("filterSelectScreen");
        }}
        onRightPress1={() => {
          setisShowSearch(!isShowSearch);
        }}
      />
      <View style={{ alignItems: "center", padding: 8 }}>
        <Text
          style={{ fontSize: scaleWidth(12), color: colors.palette.dolphin }}
          tx="selectClient.selectCustomerForSalesOrder"></Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={myDataSelectClient}
          renderItem={({ item, index }): any => {
            // console.log('====================================');
            // console.log("data item:", item);
            // console.log('====================================');
            if (dataItemSelect?.id == item.id) {
              // console.log("id send", dataItemSelect?.id);
              // console.log("data item 2:", item);
              setdataItemSelect(item)
            }
            return (
              <TouchableOpacity
                style={[Styles.itemClient, {
                  backgroundColor:
                    dataItemSelect?.id == item.id ? "#DBEFFF" : "white",
                }]}
                onPress={() => {

                  setdataItemSelect(item);
                  setIndexSelect(index);
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={Styles.icCodeItem}>
                    <Text
                      style={{ fontSize: fontSize.size10, color: colors.navyBlue }}>
                      {item.code}
                    </Text>
                  </View>
                  <View style={{ marginHorizontal: padding.padding_6 }}>
                    <Text style={{ fontSize: fontSize.size10 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{ fontSize: fontSize.size10, color: colors.dolphin }}>
                      {item.phoneNumber}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setdataItemSelect(item);
                    setIndexSelect(index);
                  }}>
                  {/* <Images.icon_edit width={scaleWidth(14)} height={scaleHeight(14)} /> */}
                  <View
                    style={[Styles.dots, {

                      backgroundColor:
                        dataItemSelect.id === item.id
                          ? colors.palette.navyBlue
                          : colors.palette.white,
                    }]}></View>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item: any, index: any) => index.toString() + item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }

          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0.2}

          ListFooterComponent={() => {

            return <View>
              {
                myDataSelectClient?.length !== 1 ?
                  <>
                    {isLoadingMore && <ActivityIndicator />}
                  </>
                  : null
              }

            </View>;

          }}
        />

        <TouchableOpacity
          style={Styles.btnAddClient}
          onPress={() => {
            setIsVisibleCreateClient(!isVisibleCreateClient);
          }}>
          <Svgs.icon_plus
            width={scaleWidth(16)}
            height={scaleHeight(16)}
            style={{ marginRight: scaleWidth(6), marginTop: scaleHeight(2) }}
          />
          <Text
            style={{ color: "white", fontSize: fontSize.size14 }}
            tx="dashboard.client"></Text>
        </TouchableOpacity>
      </View>

      <View style={Styles.stylesBtnBottom}>
        <TouchableOpacity
          style={[
            onClick === "save" ? Styles.btnSuccessfully : Styles.btnSave,
            { marginRight: scaleWidth(13) },
          ]}
          onPress={() => {
            // set = false de co animation loading full man hinh
            getAPi.orderStore.setIsLoadMoreSelectClient(false)
            setdataItemSelect({ id: "", name: "", code: "", phoneNumber: "", isHaveDeliveryAddress: false })
            getAPi.orderStore.setDataClientSelect(dataItemSelect)
            props.navigation.goBack()
          }}>
          <Text
            style={{
              color:
                onClick === "save"
                  ? colors.palette.white
                  : colors.palette.navyBlue,
            }}
            tx="common.cancel"></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            onClick === "successfully" ? Styles.btnSuccessfully : Styles.btnSave
          }
          onPress={() => {
            console.log('----indexSelect-------', indexSelect)
            if (dataItemSelect.id != "") {
              senDataClientSelected();
              setOnClick("successfully");
              getDebtLimit();
            } else {
              Toast.show({
                type: ALERT_TYPE.DANGER,
                title: '',
                textBody: translate('ClientScreen.txtChoiceClient'),

              })
            }
          }}>
          <Text
            style={{
              color:
                onClick === "successfully"
                  ? colors.palette.white
                  : colors.palette.navyBlue,
            }}
            tx="selectClient.selected"></Text>
        </TouchableOpacity>
      </View>

      <SelectFilterModal
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(!isVisible)}
      />
      <ModalCreateClient
        isVisible={isVisibleCreateClient}
        setIsVisible={setIsVisibleCreateClient}
        handleRefresh={() => getListClient()}
        sendIdCreate={({ id }) => {
          // console.log('====================================');
          // console.log("da ta id", id);
          // console.log('====================================');

          setdataItemSelect(id)
        }}
      />
    </View>
  );
});
