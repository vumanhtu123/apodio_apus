import React, { FC, useCallback, useReducer, useState } from "react";
import { observer } from "mobx-react-lite";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Image,
  StatusBar,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
// import { flagEnglish, flagTimoleste } from "../../theme/img"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LANGUAGE } from "../../utils/enum";
import { navigate, NavigatorParamList } from "../../../app-sales/navigators";
import { changeLanguage } from "../../../i18n";
import Images from "../../../../assets/index";
import { colors } from "../../theme";
import { Text } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { setCurrentLanguage } from "../../utils/storage";

export const SelectLanguageScreen: FC<
  StackScreenProps<NavigatorParamList, "selectLanguage">
> = observer(function SelectLanguageScreen() {
  const [selectLanguage, setSelectLanguage] = useState(LANGUAGE.ENGLISH);
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  const _onChangeLanguage = useCallback(
    (value: any) => {
      console.log("onChangeLanguage1", value);
      setSelectLanguage(value);
      switch (value) {
        case 'vi':
          changeLanguage("en")
          break;
        case 'en':
          changeLanguage("fr")
        default:

          break;
      }
    },
    [selectLanguage]
  );
  const [visible, setVisible] = useState(true);

  const handleLanguageSelection = (language: any) => {
    _onChangeLanguage(language);
    // setVisible(!language);
  };

  // useCallback(()=>{
  //   handleLanguageSelection
  // },[visibel])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        padding: 17,
      }}>
      <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 100 }}
        tx="common.selectLanguage"
      >

      </Text>
      {/* <StatusBar backgroundColor={color.text}/> */}
      {/* <View style={{marginTop: scaleHeight(top + 60)}}/> */}
      {/* <Text style={styles.headerText} tx="selectLanguage" /> */}
      <TouchableOpacity
        onPress={() => {
          setVisible(false);
          setCurrentLanguage('vi')
          navigate("introduction");
          _onChangeLanguage('vi')

          console.log("select english", visible);
        }}
        style={{
          width: "100%",
          height: 56,
          borderRadius: 8,
          backgroundColor: visible == true ? colors.navyBlue : colors.gray,
          padding: 12,
          justifyContent: "center",
          marginVertical: 20,
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={Images.iconVN} />
          <Text style={{ marginHorizontal: 4 }} tx="common.vietnamese"></Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          // handleLanguageSelection(visibel)
          setVisible(false);
          setCurrentLanguage('en')
          navigate("introduction");
          _onChangeLanguage('en')

          console.log("select english", visible);
        }}
        style={{
          width: "100%",
          height: 56,
          borderRadius: 8,
          backgroundColor: visible == false ? colors.navyBlue : colors.gray,
          padding: 12,
          justifyContent: "center",
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={Images.iconEN} />
          <Text style={{ marginHorizontal: 4 }} tx="common.english"></Text>
        </View>
      </TouchableOpacity>
    </View>
    // <Screen style={styles.ROOT} preset="scroll" unsafe={true}>

    //
    //   <Button
    //     onPress={() => _onChangeLanguage(LANGUAGE.ENGLISH)}
    //     style={[styles.button, { backgroundColor: selectLanguage ? color.yellow : color.gray }]}
    //   >
    //     <Image source={flagEnglish} style={styles.imageFlag} />
    //     <Text
    //       tx={"english"}
    //       style={[
    //         styles.textButton,
    //         { color: selectLanguage ? color.text : color.storybookDarkBg },
    //       ]}
    //     />
    //   </Button>
    //   <Button
    //     tx={"confirm"}
    //     onPress={() => navigate("introduction")}
    //     style={
    //       {
    //         bottom: scaleHeight(14),
    //         left: 0,
    //         position: "absolute",
    //         right: 0
    //       }
    //     }
    //     textStyle={styles.textButton}
    //   />
    //   <View style={{marginTop: scaleHeight(bottom )}}/>
    // </Screen>
  );
});
