import React, { FC, useState } from "react";
import { styles } from "../styles/styles";
import { Header, Text } from "../../../components";
import { Images } from "../../../../assets";
import { AppStackScreenProps, navigationRef } from "../../../navigators";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { TouchableOpacity, View } from "react-native";
import { HeaderInfo } from "../component/header-details-supplier";
import { InfoDetails, InfoAddress, InfoBank } from "../component/info-supplier";
import { dataLineHeader } from "../styles/data";

export const DetailsSupplierScreen: FC<
  AppStackScreenProps<"suppliersScreen">
> = () => {
  const [onclick, setOnclick] = useState<number>(0);

  const onTap = (id: any) => {
    if (onclick !== id) {
      setOnclick(id);
    }
  };
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigationRef.goBack()}
        colorIcon={colors.text}
        headerText={`Chi tiết nhà cung cấp`}
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={{
          paddingLeft: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
        titleStyle={{ fontSize: fontSize.size16, fontWeight: "700" }}
      />
      <HeaderInfo />
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 16,
          paddingVertical: 15,
        }}>
        {dataLineHeader.map((item: any, index: any) => {
          return (
            <TouchableOpacity
              onPress={() => onTap(index)}
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Text
                style={{
                  marginHorizontal: scaleWidth(12),
                  fontSize: 12,
                  fontWeight: "400",
                  color: index == onclick ? "#0078D4" : "#242424",
                  marginBottom: 5,
                }}>
                {item.tittle}
              </Text>
              {index === onclick ? (
                <View
                  style={{
                    backgroundColor: "#0078D4",
                    height: 1,
                    width: scaleWidth(49),
                  }}></View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
      <InfoDetails />
      <InfoAddress />
      <InfoBank />
    </View>
  );
};
