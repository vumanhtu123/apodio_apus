import {
  View,
  Image,
  ImageStyle,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { Text } from "../../../../components/text/text";
import { TxKeyPath } from "../../../i18n";
import { Images } from "../../../../../assets/index";

interface ViewInfoProp {
  tx?: TxKeyPath;
  text?: string;
  image?: string;
  name?: string;
  onPress?: () => void;
  showInfo?: boolean;
  kind?: number;
  onChangeAVT?: () => void;
  token: string;
}

export default function ViewInfo(props: ViewInfoProp) {
  const { image, name, onPress, showInfo, onChangeAVT, token } = props;

  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <TouchableOpacity onPress={onChangeAVT}>
        <Image
          source={{
            uri:
              image !== ""
                ? image
                : "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }}
          style={AVATAR}
        />
      </TouchableOpacity>
      <View style={{ marginLeft: scaleWidth(6), justifyContent: "center" }}>
        <Text style={NAME} text={name} />
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={VIEWOPENSTORE}>
          <Text style={TEXTBALANCE} tx={"dashboard.storeInformation"} />
          <View style={DOWN}>
            <Images.icon_arrowRight />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const AVATAR: ImageStyle = {
  width: scaleWidth(30),
  height: scaleWidth(30),
  borderRadius: 20,
};
const NAME: TextStyle = {
  fontWeight: "700",
  fontSize: fontSize.size12,
  lineHeight: 14.52,
  color: colors.palette.neutral100,
};
const TEXTBALANCE: TextStyle = {
  fontWeight: "400",
  fontSize: fontSize.size10,
  lineHeight: 12.1,
  color: colors.palette.neutral100,
};
const DOWN: ViewStyle = {
  width: 10,
  height: 10,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: scaleWidth(2),
};
const VIEWOPENSTORE: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginTop: scaleHeight(2),
};
