import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Images } from "../../../../assets";
import { scaleHeight, scaleWidth } from "../../../theme";
import { Text } from "../../../components";
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

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
        justifyContent: "space-between",
        marginHorizontal: 16,
        alignItems: "center",
      }}>
      <View
        style={{
          padding: scaleHeight(8),
          backgroundColor: "#EEEEEF",
          borderRadius: scaleHeight(6),
        }}>
        <Images.icon_calendar />
      </View>
      <View
        style={{
          backgroundColor: "#EEEEEF",
          flexDirection: "row",
          borderRadius: scaleHeight(8),
          padding: scaleWidth(2),
        }}>
        {props.date !== undefined ? (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: scaleHeight(7),
              shadowColor: "black",
              shadowOpacity: 0.2,
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Text
              text={"Tất cả"}
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#0078D4",
                textAlign: "center",
                marginHorizontal: scaleWidth(12),
                marginVertical: scaleHeight(7),
              }}></Text>
            <Images.ic_x />
          </View>
        ) : (
          listTitle.map((item, index) => {
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
          })
        )}
      </View>
      <View style={{}}>
        <Images.icon_searchBlack color="black" />
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
          item.id == item.index
            ? {
                backgroundColor: "#FFFFFF",
                borderRadius: scaleHeight(7),
                shadowColor: "black",
                shadowOpacity: 0.2,
              }
            : {}
        }>
        <Text
          text={item.name}
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: "#242424",
            textAlign: "center",
            marginHorizontal: scaleWidth(12),
            marginVertical: scaleHeight(7),
          }}></Text>
      </View>
    </TouchableOpacity>
  );
};
