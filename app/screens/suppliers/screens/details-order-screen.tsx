import React from "react";
import { FC } from "react";
import { View } from "react-native";
import { styles } from "../styles/styles";
import { Header } from "../../../components";
import { Images } from "../../../../assets";
import { useNavigation } from "@react-navigation/native";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { AppStackScreenProps } from "../../../navigators";
import { HeaderOrderDetails } from "../component/header-details-order";

export const DetailsOrderScreen: FC<
  AppStackScreenProps<"detailsOrderScreen">
> = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.ROOT}>
      <Header
        // onRightPress={openTypeFilter}
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={`Nhà cung cấp`}
        RightIcon={Images.icon_funnel}
        // RightIcon1={isVisible ? Images.icon_close : Images.search}
        // RightIcon2={isVisible ? Images.icon_close : Images.search}
        // headerInput={isVisible}
        onRightPress1={() => navigation.navigate("filterScreen" as never)}
        widthRightIcon={scaleWidth(16)}
        heightRightIcon={scaleHeight(16)}
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={{
          paddingLeft: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
        titleStyle={{ fontSize: fontSize.size16, fontWeight: "700" }}
      />
      <HeaderOrderDetails />
    </View>
  );
};
