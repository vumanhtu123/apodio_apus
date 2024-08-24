import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { NavigatorParamList } from "../../navigators";
import {
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scaleHeight, scaleWidth } from "../../theme";

import { Text } from "../../../components";
import { Svgs } from "../../../../assets/svgs";
import { styles } from "./styles";

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
export const ComingSoonScreen: FC<
  StackScreenProps<NavigatorParamList, "comingSoonScreen">
> = observer(function ComingSoonScreen(props) {
  const { bottom, top } = useSafeAreaInsets();

  console.log(top, bottom);

  return (
    <View style={styles.ROOT}>
      <StatusBar translucent backgroundColor={"transparent"} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        style={styles.body}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View
          style={{
            alignSelf: "center",
            marginTop: scaleHeight(top + 57),
            marginBottom: scaleHeight(56),
          }}>
          <Svgs.avatar />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Svgs.avatar />
        </View>
        <View>
          <Text
            tx="comingSoon"
            style={{
              color: "#242426",
              fontWeight: "700",
              fontSize: 24,
              textAlign: "center",
              marginTop: scaleHeight(19),
              marginBottom: scaleHeight(8),
            }}
          />
          <Text
            tx="currentFunctionalityUnderConstruction"
            style={{
              color: "#242426",
              fontWeight: "400",
              fontSize: 14,
              textAlign: "center",
              marginBottom: scaleHeight(19),
              lineHeight: 24,
            }}
          />
          <TouchableOpacity
            style={{
              alignSelf: "center",
              backgroundColor: "#FFFAF0",
              borderRadius: 8,
            }}
            onPress={() => props.navigation.goBack()}>
            <Text
              tx="Back to home"
              style={{
                color: "#F6961C",
                paddingVertical: scaleHeight(14),
                paddingHorizontal: scaleWidth(64),
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
});
