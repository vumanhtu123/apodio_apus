import { FC, useEffect, useState } from "react";
import { NavigatorParamList } from "../../navigators";
import { observer } from "mobx-react-lite";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  RefreshControl,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Header, Text } from "../../components";
import { colors, scaleHeight, scaleWidth } from "../../theme";
import { useStores } from "../../models";
import FastImage from "react-native-fast-image";
import { StackScreenProps } from "@react-navigation/stack";

export const ListCompany: FC<
  StackScreenProps<NavigatorParamList, "listCompany">
> = observer(function ListCompany(props) {
  const [data, setData] = useState();
  const [idCompany, setIdCompany] = useState();
  const { HomeStore, authenticationStore } = useStores();
  const [refresControl, setRefresControl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  interface Item {
    id: String;
    name: String;
    code: String;
    hotline: String;
  }

  // const dataCompany = [
  //     {
  //         id: "1",
  //         name: "Công ty TNHH Mặt Trời Hồng",
  //         code: "MTH",
  //         hotline: '02466989909'
  //     },
  //     {
  //         id: "2",
  //         name: "Công ty TNHH MISUKO Việt Nam",
  //         code: "MSI",
  //         hotline: '02466989909'
  //     },
  //     {
  //         id: "3",
  //         name: "Công ty TNHH xây dựng kỹ ...",
  //         code: "HĐ",
  //         hotline: '02466989909'
  //     },
  //     {
  //         id: "4",
  //         name: "Công ty TNHH tư vân ROPA",
  //         code: "RP",
  //         hotline: '02466989909'
  //     },
  //     {
  //         id: "5",
  //         name: "Công ty TNHH xây dựng và sản...",
  //         code: "TCT",
  //         hotline: '02466989909'
  //     }

  // ]

  const getListCompany = async (userID: any) => {
    console.log("doan dccc ", userID);
    await HomeStore.getListCompany(userID).then((result) => {
      console.log("doannnnnnn2222222", result);
      setData(result.response.data.data);
    });
  };

  useEffect(() => {
    getListCompany(authenticationStore.userId);
  }, []);
  // useEffect(() => {
  //     // getListCompany(1)
  //     authenticationStore.setIdCompany(idCompany)

  //     console.log('nkdsna', authenticationStore.idCompany)
  // }, [idCompany])
  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const ItemListCompany = ({ item }: { item: Item }) => {
    return (
      <View
        style={{
          paddingHorizontal: scaleWidth(16),
          paddingVertical: scaleHeight(8),
        }}>
        <View style={Styles.bodyItem}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                borderRadius: scaleWidth(40),
                width: scaleWidth(40),
                height: scaleHeight(40),
                backgroundColor: colors.palette.aliceBlue2,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 6,
              }}>
              <ImageBackground
                style={{ width: scaleWidth(40), height: scaleHeight(40) }}
                imageStyle={{
                  borderRadius: 20,
                }}
                source={require("../../../assets/Images/no_images.png")}>
                <FastImage
                  style={{
                    width: scaleWidth(40),
                    height: scaleHeight(40),
                    borderRadius: 20,
                  }}
                  source={{
                    uri: `${item?.imageUrls ?? ""}`,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  defaultSource={require("../../../assets/Images/no_images.png")}
                />
              </ImageBackground>
            </View>
            <View>
              <Text style={[Styles.sizeName, { fontFamily: "Inter-Bold" }]}>
                {item.name}
              </Text>
              <Text
                style={[Styles.sizeName, { color: colors.palette.dolphin }]}>
                {item.id}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: 58,
              height: 24,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              paddingHorizontal: 8,
              backgroundColor: colors.palette.navyBlue,
            }}
            onPress={() => {
              // authenticationStore.setIdCompany(item.id)
              setIdCompany(item.id);
              props.navigation.navigate("mainBottom");
              // Alert.alert("ok")
            }}>
            <Text
              style={{
                fontSize: scaleHeight(10),
                color: "#FFF",
              }}>
              Truy cập
            </Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.line} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header
        headerTx="common.listCompany"
        style={{ height: scaleHeight(52) }}
      />

      <FlatList
        style={{ marginTop: 10 }}
        data={data}
        renderItem={({ item }) => <ItemListCompany item={item} />}
        keyExtractor={(item: any, index: any) => index}
        showsVerticalScrollIndicator={false}
        // "để hiện hình quay quay khi kéo xuống"
        // refreshControl={
        //     <RefreshControl refreshing={refresControl} onRefresh={() => {
        //         setRefresControl(true)
        //         console.log('====================================');
        //         console.log("doandev");
        //         console.log('====================================');
        //         setRefresControl(false)
        //     }}
        //         colors={['red']}
        //     />
        // }

        // Để hiện hình quay quay khi kéo lên
        // ListFooterComponent={() => (
        //     isLoading ? <View

        //     style={{

        //         marginTop:30,
        //         alignItems:'center',
        //         justifyContent:'center',
        //         // justifyContent:'space-between',
        //         flexDirection:'row',

        //         padding:10
        //     }}>
        //         <ActivityIndicator size={"large"} color={'blue'} />

        //     </View>

        //         : null
        //     )}

        // "Phần sử lý logic khi load more"
        // onEndReached={() =>{
        //     setIsLoading(true)
        //     // setPrevPaget(prevPaget+1)
        //     console.log("doandev load more");
        //     setdata(data.concat([{id:"10",name: "Cong Ty A", code: "123",hotline:"836666"}]))
        //     setTimeout(() => {
        //         setIsLoading(false)
        //     }, 3000);
        // }}

        // onEndReachedThreshold={0.2}
      />
    </View>
  );
});
const Styles = StyleSheet.create({
  bodyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  line: {
    borderWidth: 1,
    borderColor: colors.palette.ghostWhite,
    marginTop: 8,
  },
  sizeName: {
    fontSize: scaleWidth(10),
  },
});
export default Styles;
