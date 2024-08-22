import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import React, { FC, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../../navigators";
import { Header, Text, TextField } from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
import {
  colors,
  fontSize,
  margin,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { Styles } from "../Styles";
import { Controller, useForm } from "react-hook-form";
import { Numpad } from "../component/num-pad-component";
import en from "../../../../i18n/en";
import CustomCalendar from "../../../../components/calendar";
import { ClassifyModal } from "../classify-modal";
import { FundsModal } from "../funds-modal";
import { translate } from "../../../../i18n";
import { formatCurrency, formatNumberByString } from "../../../utils/validate";

export const RevenueScreen: FC<
  StackScreenProps<NavigatorParamList, "addRevenueScreen">
> = observer(function revenueScreen(props) {
  const [number, setNumber] = useState<any>([]);
  const [selectTaskbar, setSelectTaskbar] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [openOrClose, setOpenOrClose] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isShortByDate, setIsShortByDate] = useState(false);
  const [makeDateE, setMakeDateE] = useState<any>();
  const [makeDateS, setMakeDateS] = useState<any>();
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [isVisibleClassify, setIsVisibleClassify] = useState(false);
  const [isVisibleFunds, setIsVisibleFunds] = useState(false);

  //data test

  const field1 = useRef("Chưa phân loại");
  const field2 = useRef("Chọn để phân loại nguồn tiền");

  // console.log('doan data', number);
  const toggleModalDate = () => {
    setIsShortByDate(!isShortByDate);
  };

  type FromValue = {
    EnterTheAmount: string;
  };
  const {
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FromValue>();

  const value = watch("EnterTheAmount");

  console.log("value text", value);

  const formatValue = formatNumberByString(value);

  const dataTaskBar = [
    { name: translate("revenueAndExpenditure.unpaid") },
    { name: translate("revenueAndExpenditure.paid") },
  ];

  const open = () => {
    setOpenOrClose(!openOrClose);
  };

  return (
    <View style={Styles.Root}>
      <Header
        LeftIcon={Svgs.back}
        headerTx="analysis.revenue2"
        style={{ height: scaleHeight(52) }}
        onLeftPress={() => props.navigation.goBack()}
      />
      <ScrollView>
        <TouchableOpacity
          style={Styles.calendarDay}
          onPress={() => toggleModalDate()}>
          <Svgs.icon_calendar />
          <Text
            style={{
              color: colors.palette.navyBlue,
              marginHorizontal: scaleWidth(4),
            }}>
            Thứ 5:{" "}
          </Text>
          <Text
            style={{
              color: colors.palette.navyBlue,
              marginRight: scaleWidth(4),
            }}>
            {timeStart}
          </Text>
          <Svgs.icon_caretDownBlue />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingHorizontal: scaleWidth(15),
            marginTop: scaleWidth(15),
          }}
          onPress={() => open()}>
          <Controller
            control={control}
            name="EnterTheAmount"
            render={({ field: { onBlur, onChange, value } }) => (
              // <TextField
              //     value={number.join(" ")}
              //     onChange={onChange}
              //     onBlur={onBlur}
              //     labelTx='revenueAndExpenditure.enterTheAmount'
              //     onClearText={() => onChange('')}
              //     onChangeText={(value) => {
              //         // const filteredValue = value.replace(/\s/g, '').replace(/[^0-9]/g, '');
              //         onChange(value)

              //     }}
              //     error={errors?.EnterTheAmount?.message}
              //     editable={false}
              // />
              <TextField
                // autoFocus
                maxLength={11}
                keyboardType={null}
                labelTx={"analysis.initBalance"}
                txColor="black"
                style={{
                  // marginHorizontal: scaleWidth(14),
                  // borderWidth: 1.5,
                  borderColor: colors.palette.navyBlue,
                }}
                RightIconClear={null}
                value={formatCurrency(value) ?? 0}
                onBlur={() => onBlur()}
                error={""}
                onClearText={() => onChange("")}
                onChangeText={(value) => {
                  onChange(value);
                }}
                // editable={false}
              />
            )}
            rules={{
              required: translate("analysis.pleaseEnterMoney"),
            }}
          />
        </TouchableOpacity>

        {value == undefined || null || value == "" ? (
          <View style={{ flex: 1 }}></View>
        ) : (
          <View style={Styles.content}>
            <View style={[Styles.taskBar2, { marginTop: 0 }]}>
              {dataTaskBar.map((item: any, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      Styles.taskBar,
                      {
                        backgroundColor:
                          selectTaskbar === index
                            ? colors.palette.white
                            : "#EEEEEF",
                      },
                    ]}
                    onPress={() => {
                      // console.log('index', index);
                      setSelectTaskbar(index);
                    }}
                    key={item.name}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {selectTaskbar == 0 ? (
              <View>
                {/* Phân loại   */}
                <TouchableOpacity
                  style={Styles.btnNTN}
                  onPress={() => setIsVisibleClassify(!isVisibleClassify)}>
                  <View>
                    <Text
                      tx="revenueAndExpenditure.expense"
                      style={{ fontSize: fontSize.size12 }}
                    />
                    <Text
                      tx="revenueAndExpenditure.unclassified"
                      style={Styles.txtBtnNTN}
                    />
                  </View>
                  <Svgs.dropDown />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: margin.margin_20,
                  }}>
                  <TouchableOpacity style={Styles.btnSelect}>
                    <Text
                      tx="revenueAndExpenditure.importProduct"
                      style={Styles.textSize14}
                    />
                  </TouchableOpacity>
                </View>

                {/* Nguồn tiền */}
                <TouchableOpacity
                  style={Styles.btnNTN}
                  onPress={() => setIsVisibleFunds(!isVisibleFunds)}>
                  <View>
                    <Text
                      tx="revenueAndExpenditure.sourceOfMoneyReceived"
                      style={{ fontSize: fontSize.size12 }}
                    />
                    <Text
                      text={field2.current.toString()}
                      // tx="revenueAndExpenditure.classifySourcesOfMoney"
                      style={Styles.txtBtnNTN}
                    />
                  </View>
                  <Svgs.dropDown />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: margin.margin_20,
                  }}>
                  <TouchableOpacity style={Styles.btnSelect}>
                    <Text
                      tx="revenueAndExpenditure.cash"
                      style={Styles.textSize14}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      Styles.btnSelect,
                      { marginHorizontal: scaleHeight(6) },
                    ]}>
                    <Text
                      tx="revenueAndExpenditure.electronicWallet"
                      style={Styles.textSize14}
                    />
                  </TouchableOpacity>
                </View>

                {/* Người giao dịch    */}

                <TouchableOpacity
                  style={[Styles.btnNTN, { marginBottom: scaleWidth(20) }]}
                  onPress={() => setIsVisible(!isVisible)}>
                  <View>
                    <Text
                      tx="revenueAndExpenditure.trader"
                      style={{ fontSize: fontSize.size12 }}
                    />
                    <Text
                      tx="revenueAndExpenditure.selectTrader"
                      style={Styles.txtBtnNTN}
                    />
                  </View>
                  <Svgs.dropDown />
                </TouchableOpacity>

                {/* Ghi chú */}

                <TextField
                  labelTx={"revenueAndExpenditure.note"}
                  placeholderTx={"revenueAndExpenditure.ex"}
                />
              </View>
            ) : (
              <View>
                {/* Phân loại   */}
                <TouchableOpacity
                  style={Styles.btnNTN}
                  onPress={() => setIsVisibleClassify(!isVisibleClassify)}>
                  <View>
                    <Text
                      tx="revenueAndExpenditure.expense"
                      style={{ fontSize: fontSize.size12 }}
                    />
                    <Text
                      tx="revenueAndExpenditure.unclassified"
                      style={Styles.txtBtnNTN}
                    />
                  </View>
                  <Svgs.dropDown />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: margin.margin_20,
                  }}>
                  <TouchableOpacity style={Styles.btnSelect}>
                    <Text
                      tx="revenueAndExpenditure.importProduct"
                      style={Styles.textSize14}
                    />
                  </TouchableOpacity>
                </View>

                {/* Nguồn tiền */}
                <TouchableOpacity
                  style={Styles.btnNTN}
                  onPress={() => setIsVisibleFunds(!isVisibleFunds)}>
                  <View>
                    <Text
                      tx="revenueAndExpenditure.sourceOfMoneyReceived"
                      style={{ fontSize: fontSize.size12 }}
                    />
                    <Text
                      tx="revenueAndExpenditure.classifySourcesOfMoney"
                      style={Styles.txtBtnNTN}
                    />
                  </View>
                  <Svgs.dropDown />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: margin.margin_20,
                  }}>
                  <TouchableOpacity style={Styles.btnSelect}>
                    <Text
                      tx="revenueAndExpenditure.cash"
                      style={Styles.textSize14}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      Styles.btnSelect,
                      { marginHorizontal: scaleHeight(6) },
                    ]}>
                    <Text
                      tx="revenueAndExpenditure.electronicWallet"
                      style={Styles.textSize14}
                    />
                  </TouchableOpacity>
                </View>

                {/* Tham chiếu đơn hàng */}

                <TouchableOpacity
                  style={[Styles.btnNTN, { marginBottom: scaleWidth(20) }]}
                  onPress={() => setIsVisible(!isVisible)}>
                  <View>
                    <Text
                      tx="revenueAndExpenditure.orderReference"
                      style={{ fontSize: fontSize.size12 }}
                    />
                    <Text
                      tx="revenueAndExpenditure.selectOrder"
                      style={Styles.txtBtnNTN}
                    />
                  </View>
                  <Svgs.dropDown />
                </TouchableOpacity>

                {/* Người giao dịch    */}

                <TouchableOpacity
                  style={[Styles.btnNTN, { marginBottom: scaleWidth(20) }]}
                  onPress={() => setIsVisible(!isVisible)}>
                  <View>
                    <Text
                      tx="revenueAndExpenditure.trader"
                      style={{ fontSize: fontSize.size12 }}
                    />
                    <Text
                      tx="revenueAndExpenditure.selectTrader"
                      style={Styles.txtBtnNTN}
                    />
                  </View>
                  <Svgs.dropDown />
                </TouchableOpacity>

                {/* Ghi chú */}

                <TextField
                  labelTx={"revenueAndExpenditure.note"}
                  placeholderTx={"revenueAndExpenditure.ex"}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <View
        pointerEvents={value == "" ? "none" : "auto"}
        style={{
          height: 45,
          flexDirection: "row",
          paddingHorizontal: scaleWidth(15),
          opacity: value == "" ? 0.5 : 1,
          marginBottom: scaleWidth(15),
        }}>
        {/* <TouchableOpacity style={Styles.img}>
          <Svgs.ic_img_blue />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={Styles.btnCreate}
          onPress={() => {
            props.navigation.navigate({ name: "comingSoonScreen" } as never);
          }}>
          <Text tx="common.create" style={Styles.textCreate} />
        </TouchableOpacity>
      </View>

      {/* {openOrClose == true ? (
        <></>
      ) : (
        <Numpad
          addItem={(item) => {
            setNumber([...number, item]);
          }}
          deleteItem={() => {
            setNumber(number.slice(0, number.length - 1));
          }}
          selectedOK={() => open()}
        />
      )} */}

      <CustomCalendar
        onReset={() => setIsReset(!isReset)}
        handleShort={() => {
          setMakeDateS(timeStart);
          setMakeDateE(timeEnd);
          toggleModalDate();
        }}
        onMarkedDatesChangeS={(markedDateS: string) => {
          setTimeStart(markedDateS);
        }}
        onMarkedDatesChangeE={(markedDateE: string) => {
          setTimeEnd(markedDateE);
        }}
        isShowTabs={true}
        isSortByDate={isShortByDate}
        toggleModalDate={toggleModalDate}
      />

      <ClassifyModal
        onVisible={isVisibleClassify}
        onClose={() => setIsVisibleClassify(!isVisibleClassify)}
        selected={(data: any) => {
          field1.current = data.value;
        }}
      />
      <FundsModal
        onVisible={isVisibleFunds}
        onClose={() => setIsVisibleFunds(!isVisibleFunds)}
        selected={(data: any) => {
          field2.current = data.value;
        }}
      />
    </View>
  );
});
