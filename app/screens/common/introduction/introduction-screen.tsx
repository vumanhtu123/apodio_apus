import React, { FC, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList, navigate } from "../../../navigators";
import { Screen } from "../../../components/screen/screen";
import { Button } from "../../../components/button/button";
import { styles } from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { View, Image, Dimensions, StatusBar } from "react-native";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Images } from "../../../../assets";
import { Text } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { setFirstOpenApp } from "../../../utils/storage";
import { useAuth } from "../../contexts/auth";

export const IntroductionScreen: FC<
  StackScreenProps<NavigatorParamList, "introduction">
> = observer(function IntroductionScreen() {
  const [activeSlide, setactiveSlide] = useState(0);
  const ref = useRef(null);
  const withWindow = Dimensions.get("window").width;
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const auth = useAuth();
  const dataIntro = [
    {
      id: 0,
      image: <Images.ic_introScreen1 />,
      title: "welcomeScreen.introScreenSubTitle1",
      content: "welcomeScreen.introScreenContent2",
    },
    {
      id: 1,
      image: <Images.ic_introScreen2 />,
      title: "welcomeScreen.introScreenSubTitle2",
      content: "welcomeScreen.introScreenContent2",
    },
    {
      id: 2,
      image: <Images.ic_introScreen3 />,
      title: "welcomeScreen.introScreenSubTitle3",
      content: "welcomeScreen.introScreenContent3",
    },
  ];

  const onGetStarted = async () => {
    await setFirstOpenApp();
    auth.changeLoginStatus();
  };

  return (
    <Screen style={styles.ROOT} preset="fixed">
      <StatusBar backgroundColor={colors.text} barStyle={"light-content"} />
      <View style={{ width: withWindow, alignItems: "flex-end" }}>
        <Button
          tx={"demoPodcastListScreen.intro.skip"}
          onPress={() => onGetStarted()}
          style={{
            width: 100,
            // backgroundColor:'pink' ,
            marginRight: 10,
            alignItems: "flex-end",
            backgroundColor: "#FFFFFF",
          }}
          textStyle={styles.textSkip}
        />
      </View>

      <Carousel
        data={dataIntro}
        ref={ref}
        autoplay={false}
        renderItem={({ item }) => (
          <View style={styles.viewItemCarousel}>
            {item.image}
            <Text tx={item.title} style={styles.textTitle} />
            <Text tx={item.content} style={styles.textContent} />
          </View>
        )}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        onSnapToItem={(index) => setactiveSlide(index)}
      />
      <View style={styles.viewDot}>{pagination(dataIntro, activeSlide)}</View>

      <Button
        style={{
          backgroundColor: "#0078D4",
          borderRadius: 8,
          marginBottom: scaleHeight(bottom + 14),
          marginHorizontal: scaleWidth(18),
          width: "90%",
        }}
        textStyle={styles.textNext}
        onPress={() => {
          activeSlide == dataIntro.length - 1
            ? onGetStarted()
            : ref.current.snapToNext();
        }}
        tx={
          activeSlide === dataIntro.length - 1
            ? "welcomeScreen.getStarted"
            : "welcomeScreen.next"
        }
      />
    </Screen>
  );
});
export const pagination = (data: any, activeSlide: any) => {
  return (
    <Pagination
      dotsLength={data.length > 0 && data.length}
      activeDotIndex={activeSlide}
      dotStyle={styles.dotStyle}
      dotColor={colors.palette.navyBlue}
      inactiveDotColor={colors.palette.neutral100}
      inactiveDotOpacity={1}
      inactiveDotScale={1}
      inactiveDotStyle={styles.inactiveDot}
      //   dotStyle={{
      //     width: 10,
      //     height: 10,
      //     borderRadius: 5,
      //     marginHorizontal: 8,
      //     backgroundColor: 'red'
      // }}
    />
  );
};
