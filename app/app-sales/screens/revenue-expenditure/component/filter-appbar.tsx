import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Svgs } from "../../../../../assets/svgs";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { Text } from "../../../../components";
import { translate } from "../../../i18n";

const listTitle = [
  { name: translate("calendar.today"), id: 0 },
  { name: translate("calendar.thisWeek"), id: 1 },
  { name: translate("calendar.thisMonth"), id: 2 },
];

interface SelectorProps {
  index: any;
  name: any;
  id: any;
  selected: () => void;
}

export const FilterAppBarComponent = (props: any) => {
  const [value, setValue] = useState(0);

  console.log("propss", props.date);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
        }}>
        <View style={styles.viewCalendar}>
          <TouchableOpacity
            onPress={() => {
              props.onShowCalender();
            }}>
            <Svgs.icon_calendar />
          </TouchableOpacity>
        </View>
        {props.date !== null ? (
          <View style={styles.viewShowDate}>
            <View style={styles.viewDate}>
              <Text text={props.date} style={styles.textDate}></Text>
              <TouchableOpacity
                onPress={() => {
                  props.clear();
                }}>
                <Svgs.ic_x />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {props.date !== null ? null : (
          <View style={styles.viewNoDate}>
            {listTitle.map((item, index) => {
              return (
                <ItemSelector
                  selected={() => {
                    setValue(item.id);
                  }}
                  name={item.name}
                  index={index}
                  id={value}
                />
              );
            })}
          </View>
        )}
      </View>
      <View style={{}}>
        <Svgs.icon_searchBlack color="black" />
      </View>
    </View>
  );
};

const ItemSelector = (item: SelectorProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        item.selected();
      }}>
      <View
        style={
          item.id == item.index ? styles.itemSelector : styles.itemNoSelector
        }>
        <Text text={item.name} style={styles.textItem}></Text>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewCalendar: {
    padding: scaleHeight(8),
    backgroundColor: "#EEEEEF",
    borderRadius: scaleHeight(6),
  },
  viewShowDate: {
    flexDirection: "row",
    backgroundColor: "#EEEEEF",
    borderRadius: scaleHeight(8),
    padding: scaleWidth(2),
    marginHorizontal: scaleWidth(9),
  },
  viewDate: {
    backgroundColor: colors.white,
    borderRadius: scaleHeight(7),
    shadowColor: "black",
    shadowOpacity: 0.2,
    flexDirection: "row",
    alignItems: "center",
  },
  textDate: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.navyBlue,
    marginHorizontal: scaleWidth(12),
  },
  viewNoDate: {
    backgroundColor: "#EEEEEF",
    flexDirection: "row",
    borderRadius: scaleHeight(8),
    padding: scaleWidth(2),
    marginHorizontal: scaleWidth(9),
  },
  itemSelector: {
    backgroundColor: colors.white,
    borderRadius: scaleHeight(7),
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  itemNoSelector: {},
  textItem: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.nero,
    textAlign: "center",
    marginHorizontal: scaleWidth(12),
    marginVertical: scaleHeight(7),
  },
});
