import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import CustomTabs from '../../../../components/calendar';
import moment from 'moment';
import {
  getDateLast7days,
  getDateToday,
  getDateTodayOneDate,
  getOfMonthdays,
} from '../../../utils/validate';
import { Text } from '../../../../components/text/text';
import { colors, padding, scaleHeight } from '../../../theme';
import { el } from 'date-fns/locale';

const CustomCalendarWarehouseBook = (props: any) => {
  const titles = ['Today', 'Last 7 days', 'This month'];

  const [markedDates, setMarkedDates] = useState({});
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const [isEndDatePicked, setIsEndDatePicked] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleChangeS = props.onMarkedDatesChangeS;
  const handleChangeE = props.onMarkedDatesChangeE;

  useEffect(() => {
    setInitialState();
  }, []);

  const setInitialState = () => {
    if (props.isOneDate) {
      //setSelectedIndex(0);
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

  const onReset = index => {
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

  const onPressTab = index => {
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


  const onDayPress = day => {
    if (props.isOneDate) {
      let newMarkedDates = {};
      console.log('-----state.isStartDatePicked1==', day.day);
      handleChangeE('');
      handleChangeS(day.dateString);
      newMarkedDates[day.dateString] = {
        selected: true,
        selectedColor: colors.palette.navyBlue,
        selectedTextColor: colors.white,
      };
      setMarkedDates(newMarkedDates);
      setIsStartDatePicked(true);
      setIsEndDatePicked(false);
      setStartDate(day.dateString);
    } else {
      if (!isStartDatePicked) {
        let newMarkedDates = {};
        console.log('-----state.isStartDatePicked1==', day.day);
        handleChangeE('');
        handleChangeS(day.dateString);
        newMarkedDates[day.dateString] = {
          startingDay: true,
          color: colors.palette.navyBlue,
          textColor: colors.white,
        };
        setMarkedDates(newMarkedDates);
        setIsStartDatePicked(true);
        setIsEndDatePicked(false);
        setStartDate(day.dateString);
      } else {
        console.log('-----state.isEndDatePicked1', day.dateString);
        handleChangeE(day.dateString);
        let newMarkedDates = { ...markedDates };
        let tempStartDate = moment(startDate);
        let tempEndDate = moment(day.dateString);
        let range = tempEndDate.diff(tempStartDate, 'days');
        console.log('-----state.endDate', tempEndDate);
        console.log('-----state.startDate', tempStartDate);
        if (range > 0) {
          for (let i = 1; i <= range; i++) {
            let tempDate = tempStartDate.add(1, 'day');
            //@ts-ignore
            tempDate = moment(tempDate).format('YYYY-MM-DD');
            if (i < range) {
              //@ts-ignore
              newMarkedDates[tempDate] = {
                color: colors.palette.gray,
                textColor: colors.black,
              };
            } else {
              //@ts-ignore
              newMarkedDates[tempDate] = {
                endingDay: true,
                color: colors.palette.navyBlue,
                textColor: colors.white,
                fontWeight: '700',
              };
            }
          }
          setMarkedDates(newMarkedDates);
          setIsStartDatePicked(false);
          setIsEndDatePicked(true);
          setStartDate('');
        } else {
          let newMarkedDates = {};
          console.log('-----state.isStartDatePicked1==', day.day);
          handleChangeE('');
          handleChangeS(day.dateString);
          newMarkedDates[day.dateString] = {
            startingDay: true,
            color: colors.palette.navyBlue,
            textColor: colors.white,
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
    <View style={styles.main}>
      <View style={styles.content}>
        <View style={styles.modalText} />
        {props.isShowTabs && <View style={styles.selectType}>
          <CustomTabs
            titles={titles}
            onPress={index => onPressTab(index)}
            selectedIndex={selectedIndex}
          />
        </View>}
        <View style={styles.modalView}>
          <Calendar
            // minDate={Date()}
            //@ts-ignore
            maxDate={today}
            monthFormat={'MMMM yyyy'}
            markedDates={(console.log(markedDates), markedDates)}
            markingType={props.isOneDate === true ? 'custom' : "period"}
            // hideExtraDays={false}
            onDayPress={onDayPress}
            theme={{ todayTextColor: colors.palette.nero }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    borderRadius: 8,
  },
  content: {
    flex: 1,
    //   padding: scaleHeight(padding.padding_16),

  },
  modalText: {
    //   marginBottom: 16,
  },
  selectType: {
    marginBottom: 16,
  },
  modalView: {

    //   flex: 1,
    //   backgroundColor:'black'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scaleHeight(padding.padding_16),
  },
});

export default CustomCalendarWarehouseBook;
