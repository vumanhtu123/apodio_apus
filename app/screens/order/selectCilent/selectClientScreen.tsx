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
import { Header, Text } from "../../../components";
import { Images } from "../../../../assets";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { Styles } from "./styles";
import SelectFilterModal from "./Modal/modal-select-filter";
import { useStores } from "../../../models";
import ModalCreateClient from "./Modal/modal-create-client";
import { useNavigation } from "@react-navigation/native";
import { ALERT_TYPE, Toast } from "../../../components/dialog-notification";
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

  const size = useRef(20);
  // const isLoadingMore = useRef<boolean>(false)
  // console.log("doannnnn", totalPage);

  const sort = getAPi.orderStore.sortCreateClient;

  const getListClient = () => {
    getAPi.orderStore
      .getListSelectClient(0, size.current, sort, valueSearch, true)
      .then((data) => {
        console.log("dataaaaaaaaa", data);

        // setTotalPage(data?.totalPages)

        const dataSelectClien = data?.content.map((item) => {
          return {
            id: item.id,
            name: item.name,
            code: item.code,
            phoneNumber: item.phoneNumber,
          };
        });
        setMyDataSelectClient(dataSelectClien);
      });
  };

  useEffect(() => {
    getListClient();
  }, [getAPi.orderStore.sortCreateClient]);

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

  console.log("load more", isLoadingMore);

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
    getAPi.orderStore.setDataClientSelect(dataItemSelect);
    props.navigation.goBack();
  };

  useEffect(() => {

    getListClient();

  }, [getAPi.orderStore.sortCreateClient,]);

  useEffect(() => {
    getListClient()
  }, [size])

  console.log("load more", isLoadingMore);

  const handleLoadMore = () => {

    setIsLoadingMore(true);
    console.log('====================================');
    console.log("value loading", isLoadingMore);
    console.log('====================================');
    size.current = (size.current + 3);
    // getListClient();
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
        LeftIcon={Images.back}
        onLeftPress={() => props.navigation.goBack()}
        RightIcon={Images.icon_funnel}
        RightIcon1={Images.icon_search}
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
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: scaleWidth(375),
                  height: scaleHeight(56),
                  paddingHorizontal: 16,
                  backgroundColor:
                    dataItemSelect?.id == item.id ? "#DBEFFF" : "white",
                  marginBottom: 1.5,
                  justifyContent: "space-between",
                }}
                onPress={() => {
                  setdataItemSelect(item);
                  setIndexSelect(index);
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#EFF8FF",
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <Text
                      style={{ fontSize: fontSize.size10, color: "#0078D4" }}>
                      {item.code}
                    </Text>
                  </View>
                  <View style={{ marginHorizontal: 6 }}>
                    <Text style={{ fontSize: fontSize.size10 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{ fontSize: fontSize.size10, color: "#747475" }}>
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
                    style={{
                      borderRadius: scaleHeight(8),
                      borderWidth: 1,
                      borderColor: colors.palette.lightGrey,
                      width: scaleHeight(16),
                      height: scaleHeight(16),
                      backgroundColor:
                        dataItemSelect.id === item.id
                          ? colors.palette.navyBlue
                          : colors.palette.white,
                    }}></View>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item: any, index: any) => index.toString() + item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0.1}

        // ListFooterComponent={() => {
        //     return <View>
        //         {isLoadingMore && <ActivityIndicator />}
        //     </View>;
        // }}
        />

        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            position: "absolute",
            paddingHorizontal: scaleWidth(18),
            paddingVertical: scaleHeight(8),
            backgroundColor: colors.palette.navyBlue,
            bottom: Platform.OS === "ios" ? scaleHeight(20) : scaleHeight(5),
            right: scaleWidth(16),
          }}
          onPress={() => {
            setIsVisibleCreateClient(!isVisibleCreateClient);
          }}>
          <Images.icon_plus
            width={scaleWidth(16)}
            height={scaleHeight(16)}
            style={{ marginRight: 6, marginTop: 2 }}
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
            { marginRight: 13 },
          ]}
          onPress={() => props.navigation.goBack()}>
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
            if(indexSelect >= 0){
              senDataClientSelected();
              setOnClick("successfully");
              getDebtLimit();
            }else {
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
      />
    </View>
  );
});
