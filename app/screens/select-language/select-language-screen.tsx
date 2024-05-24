import React, { FC, useCallback, useReducer, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackParamList } from "../../navigators/AppNavigator"
import { Screen } from "../../components"
import { styles } from "./styles"
import { colors, fontSize, scaleHeight } from "../../theme"
import { Image, StatusBar, View,Text, Button,TouchableOpacity  } from "react-native"
// import { flagEnglish, flagTimoleste } from "../../theme/img"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LANGUAGE } from "../../utils/enum"
import { vi } from "date-fns/locale"
import { navigate } from "../../../app/navigators"

export const SelectLanguageScreen: FC<StackScreenProps<AppStackParamList, "selectLanguage">> =
  observer(function SelectLanguageScreen() {
    // const [selectLanguage, setSelectLanguage] = useState(LANGUAGE.ENGLISH)
    // const {top, bottom} = useSafeAreaInsets()

    // const _onChangeLanguage = useCallback(
    //   (value) => {
    //     setSelectLanguage(value)
    //     value === LANGUAGE.TIMOLESTE ? changeLanguage("ti") : changeLanguage("en")
    //   },
    //   [selectLanguage],
    // )  
       const [visibel, setvisibel] = useState(true);
      
       const handleLanguageSelection = (language :any) => {
        setvisibel(!language);
      };

      // useCallback(()=>{
      //   handleLanguageSelection
      // },[visibel])

    return (
      
      <View style={{ flex:1, backgroundColor:'#FFFFFF', alignItems:'center',padding:17 }}>
            <Text style={{ fontSize:18, fontWeight:'700', marginTop:100}}>Select the language to use</Text>
            {/* <StatusBar backgroundColor={color.text}/> */}
            {/* <View style={{marginTop: scaleHeight(top + 60)}}/> */}
            {/* <Text style={styles.headerText} tx="selectLanguage" /> */}
        <TouchableOpacity
          onPress={() => {
            console.log(visibel);
              navigate('introduction');
              handleLanguageSelection(visibel);

            }}
           style={{width:'100%' , height:56, borderRadius:8, backgroundColor: visibel ? '#0078D4' : '#F2F2F2' ,padding:12, justifyContent:'center',marginVertical:20}}
        >
          <View style={{flexDirection:'row', alignItems:'center'}}>

           <Image source={require('../../../assets/Images/ic_vietnam.png')}/>
            <Text style={{marginHorizontal:4}}>Tiếng Việt</Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() =>{
          // handleLanguageSelection(visibel)
          setvisibel(!visibel)
          navigate('introduction');
          console.log(visibel);
        }}
            style={{width:'100%' , height:56, borderRadius:8, backgroundColor: !visibel ? '#0078D4' : '#F2F2F2' ,padding:12, justifyContent:'center',}}
             >
          <View style={{flexDirection:'row', alignItems:'center'}}>

           <Image source={require('../../../assets/Images/ic_eng.png')}/>
            <Text  style={{marginHorizontal:4}} >Tiếng Anh</Text>

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
    )
  })


