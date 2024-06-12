import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text as TextRn,
  Alert,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Calendar } from "react-native-calendars";
import CustomTabs from "./custom-tab";
import moment from "moment";
import {
  getDateLast7days,
  getDateToday,
  getDateTodayOneDate,
  getOfMonthdays,
} from "../../utils/validate";
import { Text } from "../text/text";
import { colors, padding, scaleHeight } from "../../theme";
import { el } from "date-fns/locale";

const CustomCalendar = (props: any) => {
  const titles = ["Today", "Last 7 days", "This month"];

  const [markedDates, setMarkedDates] = useState({});
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const [isEndDatePicked, setIsEndDatePicked] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleChangeS = props.onMarkedDatesChangeS;
  const handleChangeE = props.onMarkedDatesChangeE;
  const maxDate = props.maxDate;

  useEffect(() => {
    setInitialState();
  }, []);

  const setInitialState = () => {
    if (props.isOneDate) {
      //setSelectedIndex(0);
      console.log("tuvm");
      setMarkedDates(getDateTodayOneDate());
      const dayStart = Object.keys(getDateToday())[0];
      handleChangeS(dayStart);
      handleChangeE(dayStart);
    } else {
      setSelectedIndex(1);
      setMarkedDates(getDateLast7days());
      const dayStart = Object.keys(getDateLast7days())[0];
      const dayEnd = Object.keys(getDateLast7days())[
        Object.keys(getDateLast7days()).length - 1
      ];
      handleChangeS(dayStart);
      handleChangeE(dayEnd);
    }
  };

  const onReset = (index) => {
    if (props.isOneDate) {
      setSelectedIndex(index);
      setMarkedDates(getDateTodayOneDate());
      const dayStart = Object.keys(getDateToday())[0];
      handleChangeS(dayStart);
      handleChangeE(dayStart);
    } else {
      if (index == 0) {
        setSelectedIndex(index);
        setMarkedDates(getDateToday());
        const dayStart = Object.keys(getDateToday())[0];
        handleChangeS(dayStart);
        handleChangeE(dayStart);
      }
      if (index === 1) {
        setSelectedIndex(1);
        setMarkedDates(getDateLast7days());
        const dayStart = Object.keys(getDateLast7days())[0];
        const dayEnd = Object.keys(getDateLast7days())[
          Object.keys(getDateLast7days()).length - 1
        ];
        handleChangeS(dayStart);
        handleChangeE(dayEnd);
      }
      if (index == 2) {
        setSelectedIndex(index);
        setMarkedDates(getOfMonthdays());
        const dayStart = Object.keys(getOfMonthdays())[0];
        const dayEnd = Object.keys(getOfMonthdays())[
          Object.keys(getOfMonthdays()).length - 1
        ];
        handleChangeS(dayStart);
        handleChangeE(dayEnd);
      }
    }
  };

  const onPressTab = (index) => {
    if (index === 0 && index !== selectedIndex) {
      setSelectedIndex(index);
      setMarkedDates(getDateToday());
      const dayStart = Object.keys(getDateToday())[0];
      handleChangeS(dayStart);
    } else if (index === 1 && index !== selectedIndex) {
      setSelectedIndex(index);
      setMarkedDates(getDateLast7days());
      const dayStart = Object.keys(getDateLast7days())[0];
      const dayEnd = Object.keys(getDateLast7days())[
        Object.keys(getDateLast7days()).length - 1
      ];
      handleChangeS(dayStart);
      handleChangeE(dayEnd);
    } else if (index === 2 && index !== selectedIndex) {
      setSelectedIndex(index);
      setMarkedDates(getOfMonthdays());
      const dayStart = Object.keys(getOfMonthdays())[0];
      const dayEnd = Object.keys(getOfMonthdays())[
        Object.keys(getOfMonthdays()).length - 1
      ];
      handleChangeS(dayStart);
      handleChangeE(dayEnd);
    }
  };

  const onDayPress = (day) => {
    if (props.isOneDate) {
      let newMarkedDates = {};
      console.log("-----state.isStartDatePicked1==", day.day);
      handleChangeE("");
      handleChangeS(day.dateString);
      newMarkedDates[day.dateString] = {
        selected: true,
        selectedColor: colors.palette.navyBlue,
        selectedTextColor: "#FFFFFF",
      };
      setMarkedDates(newMarkedDates);
      setIsStartDatePicked(true);
      setIsEndDatePicked(false);
      setStartDate(day.dateString);
    } else {
      if (!isStartDatePicked) {
        let newMarkedDates = {};
        console.log("-----state.isStartDatePicked1==", day.day);
        handleChangeE("");
        handleChangeS(day.dateString);
        newMarkedDates[day.dateString] = {
          startingDay: true,
          color: colors.palette.navyBlue,
          textColor: "#FFFFFF",
        };
        setMarkedDates(newMarkedDates);
        setIsStartDatePicked(true);
        setIsEndDatePicked(false);
        setStartDate(day.dateString);
      } else {
        console.log("-----state.isEndDatePicked1", day.dateString);
        handleChangeE(day.dateString);
        let newMarkedDates = { ...markedDates };
        let tempStartDate = moment(startDate);
        let tempEndDate = moment(day.dateString);
        let range = tempEndDate.diff(tempStartDate, "days");
        console.log("-----state.endDate", tempEndDate);
        console.log("-----state.startDate", tempStartDate);
        if (range > 0) {
          for (let i = 1; i <= range; i++) {
            let tempDate = tempStartDate.add(1, "day");
            //@ts-ignore
            tempDate = moment(tempDate).format("YYYY-MM-DD");
            if (i < range) {
              //@ts-ignore
              newMarkedDates[tempDate] = {
                color: colors.palette.gray,
                textColor: "#000000",
              };
            } else {
              //@ts-ignore
              newMarkedDates[tempDate] = {
                endingDay: true,
                color: colors.palette.navyBlue,
                textColor: "#FFFFFF",
                fontWeight: "700",
              };
            }
          }
          setMarkedDates(newMarkedDates);
          setIsStartDatePicked(false);
          setIsEndDatePicked(true);
          setStartDate("");
        } else {
          let newMarkedDates = {};
          console.log("-----state.isStartDatePicked1==", day.day);
          handleChangeE("");
          handleChangeS(day.dateString);
          newMarkedDates[day.dateString] = {
            startingDay: true,
            color: colors.palette.navyBlue,
            textColor: "#FFFFFF",
          };
          setMarkedDates(newMarkedDates);
          setIsStartDatePicked(true);
          setIsEndDatePicked(false);
          setStartDate(day.dateString);
        }
      }
    }
  };
  const today = new Date();
  today.setDate(today.getDate() - 1);
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.isSortByDate}
      onRequestClose={props.toggleModalDate}>
      <TouchableWithoutFeedback onPress={props.toggleModalDate}>
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        />
      </TouchableWithoutFeedback>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          // borderRadius: 15,
          alignSelf: 'center',
        }}>
        <View style={styles.main}>
          <View style={styles.content}>
            <View style={styles.modalText} />
            {props.isShowTabs && (
              <View style={styles.selectType}>
                <CustomTabs
                  titles={titles}
                  onPress={(index) => onPressTab(index)}
                  selectedIndex={selectedIndex}
                />
              </View>
            )}
            <View style={styles.modalView}>
              <Calendar
                minDate={props.minDate ? props.minDate : ''}
                //@ts-ignore
                maxDate={props.maxData == true ? today : null}
                monthFormat={"MMMM yyyy"}
                markedDates={
                  (console.log("calender", markedDates), markedDates)
                }
                markingType={props.isOneDate === true ? "custom" : "period"}
                // hideExtraDays={false}
                onDayPress={onDayPress}
                theme={{ todayTextColor: colors.palette.nero }}
              />
            </View>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                onReset(selectedIndex);
              }}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  alignSelf: "center",
                  fontSize: 14,
                  color: colors.palette.nero,
                  fontWeight: "700",
                }}>
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.handleShort}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  alignSelf: "center",
                  fontSize: 14,
                  color: "#FFFFFF",
                  fontWeight: "700",
                }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    // borderRadius: 8,
    borderTopLeftRadius : 8,
    borderTopRightRadius : 8
  },
  content: {
    flex: 1,
    padding: scaleHeight(padding.padding_16),
  },
  modalText: {
    marginBottom: 16,
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
    padding: scaleHeight(padding.padding_16),
  },
  button2: {
    flex: 1,
    backgroundColor: colors.palette.solitude,
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  button: {
    flex: 1,
    backgroundColor: colors.palette.navyBlue,
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    // shadowColor: '#007AFF',
    // shadowOffset: {
    //     width: 0,
    //     height: 20,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 20,
    // elevation: 5,
  },
});

export default CustomCalendar;
