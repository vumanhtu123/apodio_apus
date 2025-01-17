import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { TabScreenProps } from "../../../../navigators/bottom-navigation";
import { NavigatorParamList } from "../../../../navigators";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  NativeSyntheticEvent,
  RefreshControl,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Header, Text } from "../../../../../components";
import { colors, scaleHeight, scaleWidth } from "../../../../theme";
import { Svgs } from "../../../../../../assets/svgs";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Styles } from "../styles";
import { ItemListMustPay } from "../../component/itemListMustPay";
import en from "../../../../../i18n/en";
import { ModalFilter } from "../../component/modalFilter";
import { translate } from "../../../../../i18n";
import { useStores } from "../../../../models";
import { number } from "mobx-state-tree/dist/internal";
import { setISODay } from "date-fns/fp/setISODay";
import { commasToDots, formatCurrency, formatVND } from "../../../../utils/validate";
import CustomCalendar from "../../../../../components/calendar";
import moment from "moment";
import { convertToOffsetDateTime } from "../../../../utils/formatDate";


export const MustPayScreen: FC<
  StackScreenProps<NavigatorParamList, "mustPay">
> = observer(function mustPayScreen(props) {
  const [valueItemSelect, setValueItemSelect] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const page = useRef(0)
  const size = useRef(5)
  const totalPage = useRef<number>(0)
  const checkStatusLoadMore = useRef<boolean>(false)
  const valueSearch = useRef('')
  const totalElement = useRef<number>(0)
  const [totalMustPay, setTotalMustPay] = useState(0)
  const [totalProvider, setTotalProvider] = useState(0)
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [isReset, setIsReset] = useState<boolean>();
  const [makeDateS, setMakeDateS] = useState<any>(null);
  const [makeDateE, setMakeDateE] = useState<any>(null);
  const [isSortByDate, setIsSortByDate] = useState<boolean>(false);
  const [myData, setMyData] = useState<{}[]>([])
  const [debtAmountDesc, setDebtAmountDesc] = useState(true)
  const getAPI = useStores()

  console.log("ngay chon", makeDateS, makeDateE);

  console.log("total page", totalPage.current);
  console.log("total element", totalElement.current);

  const toggleModalDate = () => {
    setIsSortByDate(!isSortByDate);
  };

  const getDebtTotal = async () => {
    const dataTotal = await getAPI.debtStore.getTotalDebt("EXTERNAL");
    console.log("My data", dataTotal);

    if (dataTotal != null) {
      setTotalMustPay(dataTotal.data.debtAmount),
        setTotalProvider(dataTotal.data.totalPartner)
    }

  }

  const getDataDebt = async (dateStart: string | null, dateEnd: string | null) => {
    console.log("ngay da chon doan", dateStart, dateEnd);
    const formatDateStart = convertToOffsetDateTime(dateStart)
    const formatDateEnd = convertToOffsetDateTime(dateEnd)

    const dataTem = await getAPI.debtStore.getListMustPay(size.current, page.current, valueSearch.current, "EXTERNAL", debtAmountDesc, dateStart == null ? null : formatDateStart, dateEnd == null ? null : formatDateEnd, checkStatusLoadMore.current)
    console.log('====================================');
    console.log("data debt page", dataTem?.data?.data);
    console.log('====================================');

    totalPage.current = Number(dataTem?.data?.data?.totalPages)
    totalElement.current = Number(dataTem?.data?.data?.totalElements)

    // setTotalPage(Number(dataTem?.data.totalPages))

    if (dataTem?.data !== null) {
      // console.log("doan dev 1");
      if (page.current == 0) {
        // console.log("doan dev 2", dataTem.data.data.content);
        setMyData(dataTem.data.data.content)
      } else {
        // console.log("doan dev 3");
        setMyData((data) => [
          ...data,
          ...dataTem?.data?.data?.content
        ])
      }
    }
  }

  useEffect(() => {
    getDataDebt(makeDateS, makeDateE)
    getDebtTotal()
  }, [])

  useEffect(() => {
    getDataDebt(makeDateS, makeDateE)
    console.log("da chon ngay");

  }, [makeDateS, makeDateE]);

  useEffect(() => {
    setIsLoadingMore(false)
    console.log("leng data thay doi", myData.length);
  }, [myData.length])


  useEffect(() => {
    getDataDebt(makeDateS, makeDateE)
  }, [debtAmountDesc])

  // valueSearch

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setIsLoadingMore(true);
      checkStatusLoadMore.current = false;
      // setMyData([]);
      page.current = 0;

      await getDataDebt(null, null);
    } catch (error) {
      console.error("Error refreshing data:", error);
      // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo cho người dùng
    } finally {
      setRefreshing(false);
      setIsLoadingMore(false);
    }
  }, [getDataDebt]);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || page.current >= totalPage.current) {
      return
    }

    page.current += 1
    checkStatusLoadMore.current = true
    setIsLoadingMore(true)

    getDataDebt(makeDateS, makeDateE)
      .then(() => {
        if (myData.length >= totalElement.current) {
          setIsLoadingMore(false)
        }
      })
      .catch((error) => {
        console.error("Error loading more data:", error);
        setIsLoadingMore(false);

      })
      .finally(() => {
        checkStatusLoadMore.current = false
      })
  }, [isLoadingMore, myData.length, getDataDebt])
  // const handleLoadMore = () => {

  // }
  return (
    <View style={{ flex: 1 }}>
      <Header
        style={{ height: scaleHeight(52) }}
        LeftIcon={Svgs.back}
        headerTx="debtScreen.toPaydebt"
        onLeftPress={() => {
          props.navigation.goBack();
        }}
        RightIcon={Svgs.ic_calender_white}
        RightIcon1={Svgs.ic_slider}
        btnRightStyle={{}}
        headerInput={true}
        searchText={translate("NCCScreen.nameSuppliers")}
        onRightPress={() => setIsSortByDate(!isSortByDate)}
        onRightPress1={() => setIsVisible(true)}
        onSearchValueChange={(txt: any) => { }}
        handleOnSubmitSearch={(value: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
          console.log("value search debt", value.nativeEvent.text);
          valueSearch.current = value.nativeEvent.text
          page.current = 0
          setMyData([])
          getDataDebt(makeDateS, makeDateE)
        }}

      />
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={[colors.palette.navyBlue, colors.palette.malibu]}
        style={{ height: scaleHeight(50) }}></LinearGradient>
      <View style={[Styles.bodyCardMusPay, {
        top: scaleHeight(100),
        width: '92%',
        marginRight: scaleWidth(16),
        marginLeft: scaleWidth(16),
      }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={[{ alignItems: "center", flex: 1 }]}>
            <Text
              style={[Styles.styleNumber, { color: colors.palette.navyBlue }]}>
              {totalProvider}
            </Text>
            <Text
              style={{ fontSize: 12, textAlign: "center" }}
              tx="debtScreen.totalNumberOfSuppliersIncurringDebt"></Text>
          </TouchableOpacity>
          <TouchableOpacity style={[{ alignItems: "center", flex: 1 }]}>
            <Text
              style={[
                Styles.styleNumber,
                { color: colors.palette.textExCancle },
              ]}>{formatVND(formatCurrency(commasToDots(totalMustPay)))}</Text>
            <Text
              style={{ fontSize: 12 }}
              tx="debtScreen.totalDebtMustPay"></Text>
          </TouchableOpacity>
        </View>
      </View>

      {myData && myData.length > 0 ? (
        <FlatList
          data={myData}
          renderItem={({ item }: any) => (
            <ItemListMustPay
              key={item.partner.id}
              item={item}
              onClick={() => {
                console.log("id item", item.partner.id)
                setValueItemSelect(item.partner.id);
                props.navigation.navigate("detailDebt", { "idSend": item.partner.id });
              }}
              idSelect={valueItemSelect}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          keyExtractor={({ item, index }: any) => item?.partner.id}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0.2}
          ListFooterComponent={() => (
            <View>{isLoadingMore == true ? <ActivityIndicator size={20} /> : null}</View>
          )}
          style={{ marginTop: scaleHeight(80) }}
          // maxToRenderPerBatch={20}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Svgs.img_not_init />
          <Text tx="debtScreen.notThing" style={{ color: colors.aluminium1 }} />
        </View>
      )}

      <ModalFilter
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(!isVisible)}
        sortMustPay={(value) => {
          console.log("value sort must pay", value)
          setDebtAmountDesc(value)
        }}
        sortTotalDebt={(value) => {
          console.log("Hien dang bo", value)
        }}
      />

      <CustomCalendar
        isReset={() => {
          setIsReset(!isReset);
        }}

        handleShort={() => {
          setMakeDateE(timeEnd);
          setMakeDateS(timeStart);
          toggleModalDate();
        }}
        onMarkedDatesChangeS={(markedDatesS: React.SetStateAction<string>) => {
          console.log("markedDatesS------", markedDatesS);
          setTimeStart(markedDatesS);
        }}
        onMarkedDatesChangeE={(markedDatesE: React.SetStateAction<string>) => {
          console.log("markedDatesE------", markedDatesE);
          setTimeEnd(markedDatesE);
        }}
        isShowTabs={true}
        isSortByDate={isSortByDate}
        toggleModalDate={toggleModalDate}
      />
    </View>
  );
});
