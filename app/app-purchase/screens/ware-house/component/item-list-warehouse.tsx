import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { Styles } from "../style";
import { useNavigation } from "@react-navigation/native";
import en from "../../../i18n/en";
import FastImage from "react-native-fast-image";
import Images from "../../../../../assets/index";

interface ItemList {
  id: number;
  code: string;
  name: string;
  state: string;
}

const ItemListWareHouse: React.FC<{ item: ItemList }> = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={Styles.itemList}
      onPress={() => {
        // setIdWarehouse(item.id)
        console.log("id select", item.id);
        navigation.navigate({
          name: "detailWarehouse",
          params: { id: item.id, state: item.state, name: item.name },
        } as never);
      }}>
      <ImageBackground
        style={{
          width: scaleWidth(60),
          height: scaleHeight(60),
        }}
        imageStyle={{ borderRadius: 8 }}
        source={Images.noImages}>
        <FastImage
          style={{
            width: scaleWidth(60),
            height: scaleHeight(60),
            borderRadius: 8,
          }}
          source={{
            uri: "",
            cache: FastImage.cacheControl.immutable,
          }}
        />
      </ImageBackground>
      <View
        style={[
          Styles.flexRow,
          { flex: 2, alignItems: "center", marginLeft: 20 },
        ]}>
        <View style={{ flex: 1 }}>
          <Text style={Styles.txtItemWareHouse}>{item.code}</Text>
          <Text style={{ fontSize: scaleWidth(10), fontWeight: "500" }}>
            {item?.name}
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: scaleWidth(8),
              fontWeight: "400",
              color: item?.state === "APPROVED" ? colors.navyBlue : "#9EA6B3",
            }}>
            {item?.state === "APPROVED"
              ? en.wareHouse.isActive
              : en.wareHouse.save}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemListWareHouse;
