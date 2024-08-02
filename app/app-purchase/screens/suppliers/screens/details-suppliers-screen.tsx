import React, { FC, useState } from "react";
import { styles } from "../styles/styles";
import { Header, Text } from "../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { navigationRef, NavigatorParamList } from "../../../navigators";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { TouchableOpacity, View } from "react-native";
import { HeaderInfo } from "../component/header-details-supplier";
import { ContactSupplier } from "../component/contact-supplier";
import { InfoDetails, InfoAddress, InfoBank } from "../component/info-supplier";
import { dataLineHeader } from "../styles/data";
import { ScrollView } from "react-native-gesture-handler";
import { OrderSupplier } from "../component/order-supplier";
import { DebtSupplier } from "../component/debt-supplier";
import { ProductSupplier } from "../component/product-supplier";
import { StackScreenProps } from "@react-navigation/stack";

export const DetailsSupplierScreen: FC<
  StackScreenProps<NavigatorParamList, "suppliersScreen">
> = () => {
  const [onclick, setOnclick] = useState<number>(0);

  const onTap = (id: any) => {
    if (onclick !== id) {
      setOnclick(id);
    }
  };

  const renderComponent = (onclick: number) => {
    switch (onclick) {
      case 0:
        return (
          <View>
            <InfoDetails />
            <InfoAddress />
            <InfoBank />
          </View>
        );
      case 1:
        return <ContactSupplier />;
      case 2:
        return <OrderSupplier />;
      case 3:
        return <DebtSupplier />;
      case 4:
        return <ProductSupplier />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Svgs.back}
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
                  marginHorizontal: scaleWidth(13),
                  fontSize: 12,
                  fontWeight: "400",
                  color: index == onclick ? colors.navyBlue : colors.nero,
                  marginBottom: 5,
                }}>
                {item.tittle}
              </Text>
              {index === onclick ? (
                <View
                  style={{
                    backgroundColor: colors.navyBlue,
                    height: 1,
                    width: scaleWidth(49),
                  }}></View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
      <ScrollView>{renderComponent(onclick)}</ScrollView>
    </View>
  );
};
