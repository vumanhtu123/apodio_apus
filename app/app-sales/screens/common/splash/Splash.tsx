import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../../navigators";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { colors } from "../../../theme";
import LottieView from "lottie-react-native";
import { Svgs } from "../../../../../assets/svgs";
import { Text } from "../../../../components/text/text";
import React from "react";
import { useAuth } from "../../contexts/auth";
import { useStores } from "../../../models";
import { getAccessToken, setAccessToken } from "../../../utils/storage";
import Images from "../../../../../assets/index";

export const SplashScreen1: FC<
  StackScreenProps<NavigatorParamList, "SplashScreen">
> = observer(function SplashScreen(props) {
  const auth = useAuth();
  const { authenticationStore } = useStores();
  useEffect(() => {
    onInit();
  });
  const onInit = () => {
    setTimeout(() => {
      setAccessToken(null);
      console.log("logout", getAccessToken());
      // authenticationStore.logout();
      auth.changeLoginStatus();
    }, 4000);
  };
  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      colors={[colors.palette.navyBlue, colors.palette.malibu]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: "100%",
          height: "75%",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Svgs.ic_logofull style={{ width: 248, height: 178 }} />
      </View>

      <View style={{ width: "100%", height: "25%", alignItems: "center" }}>
        <LottieView
          style={{ width: 100, height: 100 }}
          source={Images.loading}
          autoPlay
        />
        <Text
          tx="inforMerchant.loading"
          style={{ color: colors.white, fontSize: 18, textTransform: "uppercase" }}
        />
      </View>
    </LinearGradient>
  );
});
