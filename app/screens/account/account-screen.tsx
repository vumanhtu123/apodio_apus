import { Header } from "@react-navigation/stack";
import { FlashList } from "@shopify/flash-list";
import { observer } from "mobx-react-lite";
import React, { FC, useState, useRef } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Images } from "../../../assets";
import CustomCalendar from "../../components/calendar";
import { scaleHeight, colors, margin } from "../../theme";
import ItemExample from "../example/components/Item-example";
import { styles } from "./style";
import { TabScreenProps } from "../../navigators/bottom-navigation";

export const AccountScreen: FC<TabScreenProps<"account">> = observer(
  function AccountScreen(props) {
    // Pull in one of our MST stores
    // const refCarousel = useRef(null)
    const [isShow, setIsShow] = useState(false);
    const paddingTop = useSafeAreaInsets().top;
    const [click, setclick] = useState(1);

    // console.log(click);
    const [isSortByDate, setIsSortByDate] = useState<boolean>(false);
    const today = new Date();
    const sevenDaysBefore = new Date(today);
    const [isReset, setIReset] = useState<boolean>(false);

    const markedDatesSRef = useRef("");
    const markedDatesERef = useRef("");

    const [markedDatesS, setMarkedDatesS] = useState("");
    const [markedDatesE, setMarkedDatesE] = useState("");
    markedDatesSRef.current = markedDatesS
      ? markedDatesS
      : sevenDaysBefore.toString();
    markedDatesERef.current = markedDatesE ? markedDatesE : today.toString();

    const tongleModalDate = () => {
      setIsSortByDate(!isSortByDate);
    };

    const dataExample = [
      {
        id: "#0958883765",
        date: "01/03 13:56",
        status: "Đã giao",
        code: "ĐH_21090930",
      },
      {
        id: "#3515888376",
        date: "01/03 13:56",
        status: "Đang giao",
        code: "ĐH_21090930",
      },
      {
        id: "#3588837655",
        date: "01/03 13:56",
        status: "Đã hủy",
        code: "ĐH_21090930",
      },
      {
        id: "#3588837659",
        date: "01/03 13:56",
        status: "Đã hủy",
        code: "ĐH_21090930",
      },
      {
        id: "#3588837657",
        date: "01/03 13:56",
        status: "Đã hủy",
        code: "ĐH_21090930",
      },
      {
        id: "#3588837651",
        date: "01/03 13:56",
        status: "Đã hủy",
        code: "ĐH_21090930",
      },
      {
        id: "#3588837652",
        date: "01/03 13:56",
        status: "Đã hủy",
        code: "ĐH_21090930",
      },
    ];
    return (
      <View style={{ flex: 1, backgroundColor: "#F6F7F9" }}>
        <Header
          style={{ height: scaleHeight(52) }}
          headerTx="inforMerchant.tile"
        />

        <View>
          <ScrollView
            horizontal={true}
            style={{ padding: 10, flexDirection: "row" }}>
            <TouchableOpacity
              style={[
                styles.bodyIconTabar,
                click === 1 && styles.ClickbodyIconTabar,
              ]}
              onPress={() => {
                setclick(1);
              }}>
              <Text
                tx="inforMerchant.All"
                style={[
                  styles.textTabbar,
                  click === 1 && styles.ClickTextTabbar,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.bodyIconTabar,
                click === 2 && styles.ClickbodyIconTabar,
              ]}
              onPress={() => {
                setclick(2);
              }}>
              <Text
                tx="inforMerchant.areDelivering"
                style={[
                  styles.textTabbar,
                  click === 2 && styles.ClickTextTabbar,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.bodyIconTabar,
                click === 3 && styles.ClickbodyIconTabar,
              ]}
              onPress={() => {
                setclick(3);
              }}>
              <Text
                tx="inforMerchant.Delivered"
                style={[
                  styles.textTabbar,
                  click === 3 && styles.ClickTextTabbar,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.bodyIconTabar,
                click === 4 && styles.ClickbodyIconTabar,
              ]}
              onPress={() => {
                setclick(4);
              }}>
              <Text
                tx="inforMerchant.Cancelled"
                style={[
                  styles.textTabbar,
                  click === 4 && styles.ClickTextTabbar,
                ]}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View
          style={{ width: "100%", borderWidth: 1, borderColor: "#F4F4F4" }}
        />

        <View style={styles.bodyCalendar}>
          <View>
            <Text>
              {markedDatesS}-{markedDatesE}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              tongleModalDate();
            }}>
            <Images.icon_calendar />
          </TouchableOpacity>
        </View>

        <CustomCalendar
          isReset={isReset}
          handleReset={() => setIReset(!isReset)}
          handleShort={() => {
            //   handleOrderMerchant()
            tongleModalDate();
          }}
          onMarkedDatesChangeS={(markedDatesS) => {
            setMarkedDatesS(markedDatesS);
          }}
          onMarkedDatesChangeE={(markedDatesE) => {
            setMarkedDatesE(markedDatesE);
          }}
          isSortByDate={isSortByDate}
          toggleModalDate={tongleModalDate}
        />

        <FlashList
          data={dataExample}
          renderItem={({ item }) => {
            return (
              <ItemExample
                onPress={() =>
                  props.navigation.navigate("detaiExample", { data: item })
                }
                id={item.id}
                status={item.status}
                time={item.date}
                code={item.code}
                styleTextStatus={{
                  color:
                    item.status === "Đã giao"
                      ? colors.palette.textExDoing
                      : item.status === "Đang giao"
                      ? colors.palette.textExDone
                      : colors.palette.textExCancle,
                }}
                styleViewStatus={{
                  backgroundColor:
                    item.status === "Đã giao"
                      ? colors.palette.blueExDG
                      : item.status === "Đang giao"
                      ? colors.palette.yallowExDG
                      : colors.palette.redExDG,
                  justifyContent: "center",
                  borderRadius: 8,
                }}
              />
            );
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 10,
            bottom: scaleHeight(margin.margin_30),
          }}
          onPress={() => props.navigation.navigate("resquestEample")}>
          <Images.ic_addExameple />
        </TouchableOpacity>
      </View>
    );
  }
);
