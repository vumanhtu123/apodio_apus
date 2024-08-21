import React, { useState, useEffect, useMemo, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import {
  getDateLast7days,
  getDateToday,
  getDateTodayOneDate,
  getOfMonthdays,
} from "../theme/validate";
import { Text } from "../text/text";
import { colors, padding, scaleHeight } from "../theme";
import { CustomModal } from "../custom-modal";
import CustomTabs from "./custom-tab/index";

LocaleConfig.locales["vi"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthNamesShort: [
    "Thg 1",
    "Thg 2",
    "Thg 3",
    "Thg 4",
    "Thg 5",
    "Thg 6",
    "Thg 7",
    "Thg 8",
    "Thg 9",
    "Thg 10",
    "Thg 11",
    "Thg 12",
  ],
  dayNames: [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  today: "Hôm nay",
};

LocaleConfig.defaultLocale = "vi";
interface MarkedDate {
  color?: string;
  textColor?: string;
  startingDay?: boolean;
  endingDay?: boolean;
  selected?: boolean;
  selectedColor?: string;
  selectedTextColor?: string;
  fontWeight?: string;
}

const CustomCalendar = React.memo((props: any) => {
  const titles = ["calendar.today", "calendar.last7days", "calendar.thisMonth"];

  const [markedDates, setMarkedDates] = useState({});
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const [isEndDatePicked, setIsEndDatePicked] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleChangeS = props.onMarkedDatesChangeS;
  const handleChangeE = props.onMarkedDatesChangeE;

  const setInitialState = useCallback(() => {
    if (props.isOneDate) {
      const todayDate = getDateTodayOneDate();
      setMarkedDates(todayDate);
      const dayStart = Object.keys(getDateToday())[0];
      handleChangeS(dayStart);
      handleChangeE(dayStart);
    } else {
      setSelectedIndex(1);
      const last7Days = getDateLast7days();
      setMarkedDates(last7Days);
      const dayStart = Object.keys(last7Days)[0];
      const dayEnd = Object.keys(last7Days).pop();
      handleChangeS(dayStart);
      handleChangeE(dayEnd);
    }
  }, [handleChangeS, handleChangeE, props.isOneDate]);

  useEffect(() => {
    setInitialState();
  }, []);

  const onReset = useCallback(
    (index: number) => {
      if (props.isOneDate) {
        const todayDate = getDateTodayOneDate();
        setMarkedDates(todayDate);
        const dayStart = Object.keys(getDateToday())[0];
        handleChangeS(dayStart);
        handleChangeE(dayStart);
      } else {
        if (index === 0) {
          const todayDate = getDateToday();
          setMarkedDates(todayDate);
          const dayStart = Object.keys(todayDate)[0];
          handleChangeS(dayStart);
          handleChangeE(dayStart);
        } else if (index === 1) {
          const last7Days = getDateLast7days();
          setMarkedDates(last7Days);
          const dayStart = Object.keys(last7Days)[0];
          const dayEnd = Object.keys(last7Days).pop();
          handleChangeS(dayStart);
          handleChangeE(dayEnd);
        } else if (index === 2) {
          const ofMonthDays = getOfMonthdays();
          setMarkedDates(ofMonthDays);
          const dayStart = Object.keys(ofMonthDays)[0];
          const dayEnd = Object.keys(ofMonthDays).pop();
          handleChangeS(dayStart);
          handleChangeE(dayEnd);
        }
      }
    },
    [handleChangeS, handleChangeE, props.isOneDate]
  );

  const onPressTab = useCallback(
    (index: React.SetStateAction<number>) => {
      if (index === 0 && index !== selectedIndex) {
        setSelectedIndex(index);
        const todayDate = getDateToday();
        setMarkedDates(todayDate);
        const dayStart = Object.keys(todayDate)[0];
        handleChangeS(dayStart);
      } else if (index === 1 && index !== selectedIndex) {
        setSelectedIndex(index);
        const last7Days = getDateLast7days();
        setMarkedDates(last7Days);
        const dayStart = Object.keys(last7Days)[0];
        const dayEnd = Object.keys(last7Days).pop();
        handleChangeS(dayStart);
        handleChangeE(dayEnd);
      } else if (index === 2 && index !== selectedIndex) {
        setSelectedIndex(index);
        const ofMonthDays = getOfMonthdays();
        setMarkedDates(ofMonthDays);
        const dayStart = Object.keys(ofMonthDays)[0];
        const dayEnd = Object.keys(ofMonthDays).pop();
        handleChangeS(dayStart);
        handleChangeE(dayEnd);
      }
    },
    [selectedIndex, handleChangeS, handleChangeE]
  );

  const onDayPress = useCallback(
    (day: { dateString: string }) => {
      if (props.isOneDate) {
        handleChangeS(day.dateString);
        handleChangeE("");
        setMarkedDates({
          [day.dateString]: {
            selected: true,
            selectedColor: colors.palette.navyBlue,
            selectedTextColor: colors.white,
          },
        });
        setIsStartDatePicked(true);
        setIsEndDatePicked(false);
        setStartDate(day.dateString);
      } else {
        if (!isStartDatePicked) {
          handleChangeS(day.dateString);
          handleChangeE("");
          setMarkedDates({
            [day.dateString]: {
              startingDay: true,
              color: colors.palette.navyBlue,
              textColor: colors.white,
            },
          });
          setIsStartDatePicked(true);
          setIsEndDatePicked(false);
          setStartDate(day.dateString);
        } else {
          handleChangeE(day.dateString);
          const newMarkedDates: { [key: string]: MarkedDate } = {
            ...markedDates,
          };
          const tempStartDate = moment(startDate);
          const tempEndDate = moment(day.dateString);
          const range = tempEndDate.diff(tempStartDate, "days");
          if (range > 0) {
            for (let i = 1; i <= range; i++) {
              const tempDate = moment(startDate)
                .add(i, "days")
                .format("YYYY-MM-DD");

              if (i < range) {
                newMarkedDates[tempDate] = {
                  color: colors.palette.gray,
                  textColor: colors.black,
                };
              } else {
                newMarkedDates[tempDate] = {
                  endingDay: true,
                  color: colors.palette.navyBlue,
                  textColor: colors.white,
                  fontWeight: "700",
                };
              }
            }
            setMarkedDates(newMarkedDates);
            setIsStartDatePicked(false);
            setIsEndDatePicked(true);
            setStartDate("");
          } else {
            handleChangeS(day.dateString);
            handleChangeE("");
            setMarkedDates({
              [day.dateString]: {
                startingDay: true,
                color: colors.palette.navyBlue,
                textColor: colors.white,
              },
            });
            setIsStartDatePicked(true);
            setIsEndDatePicked(false);
            setStartDate(day.dateString);
          }
        }
      }
    },
    [
      props.isOneDate,
      handleChangeS,
      handleChangeE,
      isStartDatePicked,
      startDate,
      markedDates,
    ]
  );

  const today = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }, []);

  useEffect(() => {
    if (props.dateS && props.dateE === undefined) {
      if (props.isOneDate) {
        console.log(props.dateS, 'dateS')
        handleChangeS(props.dateS);
        handleChangeE("");
        setMarkedDates({
          [props.dateS]: {
            selected: true,
            selectedColor: colors.palette.navyBlue,
            selectedTextColor: colors.white,
          },
        });
      }
    }
    if (props.dateS && props.dateE) {
      if (props.isOneDate == false) {
        handleChangeS(props.dateS)
        handleChangeE(props.dateE);
          const newMarkedDates: { [key: string]: MarkedDate } = {};
          const tempStartDate = moment(props.dateS);
          const tempEndDate = moment(props.dateE);
          const range = tempEndDate.diff(tempStartDate, "days");
          newMarkedDates[props.dateS] = {
            startingDay: true,
            color: colors.palette.navyBlue,
            textColor: colors.white,
            fontWeight: "700",
          };
          if (range > 0) {
            for (let i = 1; i <= range; i++) {
              const tempDate = moment(props.dateS)
                .add(i, "days")
                .format("YYYY-MM-DD");
              if (i < range) {
                newMarkedDates[tempDate] = {
                  color: colors.palette.gray,
                  textColor: colors.black,
                };
              } else {
                newMarkedDates[tempDate] = {
                  endingDay: true,
                  color: colors.palette.navyBlue,
                  textColor: colors.white,
                  fontWeight: "700",
                };
              }
            }
            setMarkedDates(newMarkedDates);
            setIsStartDatePicked(false);
            setIsEndDatePicked(true);
            setStartDate("");
          } else {
            handleChangeS(props.dateS);
            handleChangeE("");
            setMarkedDates({
              [props.dateS]: {
                startingDay: true,
                color: colors.palette.navyBlue,
                textColor: colors.white,
              },
            });
            setIsStartDatePicked(true);
            setIsEndDatePicked(false);
            setStartDate(props.dateS);
          }
      }
    }
  }, [props.isSortByDate])

  return (
    <CustomModal
      isVisible={props.isSortByDate}
      isHideKeyBoards={props.isSortByDate}
      setIsVisible={props.toggleModalDate}>
      <View style={styles.content}>
        {props.isShowTabs && (
          <View style={styles.selectType}>
            <CustomTabs
              titles={titles}
              onPress={onPressTab}
              selectedIndex={selectedIndex}
            />
          </View>
        )}
        <View style={styles.modalView}>
          <Calendar
            minDate={props.minDate || ""}
            maxDate={props.maxDate || ""}
            monthFormat={"MMMM yyyy"}
            markedDates={markedDates}
            markingType={props.isOneDate ? "custom" : "period"}
            onDayPress={onDayPress}
            theme={{ todayTextColor: colors.palette.nero }}
          />
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button2}
          // onPress={() => props.onClose() ?? onReset(selectedIndex)}>
          onPress={() => onReset(selectedIndex)}>
          <Text tx="calendar.reset" style={styles.resetButtonText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={props.handleShort}>
          <Text tx="calendar.done" style={styles.doneButtonText} />
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
    //padding: scaleHeight(padding.padding_16),
  },
  selectType: {
    marginBottom: 16,
  },
  modalView: {
    flex: 1,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    //padding: scaleHeight(padding.padding_16),
    marginTop: scaleHeight(12),
    marginBottom: scaleHeight(4)
  },
  button2: {
    flex: 1,
    height: scaleHeight(40),
    backgroundColor: colors.palette.solitude,
    padding: scaleHeight(10),
    borderRadius: 8,
    marginRight: 8,
  },
  button: {
    flex: 1,
    height: scaleHeight(40),
    backgroundColor: colors.palette.navyBlue,
    padding: scaleHeight(10),
    borderRadius: 8,
    marginLeft: 8,
  },
  resetButtonText: {
    alignSelf: "center",
    fontSize: 14,
    color: colors.palette.nero,
    fontWeight: "700",
  },
  doneButtonText: {
    alignSelf: "center",
    fontSize: 14,
    color: colors.white,
    fontWeight: "700",
  },
});

export default CustomCalendar;
