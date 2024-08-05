import { StackScreenProps } from "@react-navigation/stack";
import { Header } from "../../../../components/header/header";
import { observer } from "mobx-react-lite";
import { FC} from "react";
import { ScrollView, View } from "react-native";
import { Svgs } from "../../../../../../assets/svgs";
import {Styles} from "./index"
import { Text } from "../../../../components/text/text";
import React from "react";
import { NavigatorParamList } from "../../../../navigators/app-navigator";



export const termsAndAgreementsScreen: FC<StackScreenProps<NavigatorParamList, "termsAndAgreement" >> = observer(

    function termsAndAgreements (props) {
        const textData = {

            tilte1: "These Terms of Service reflect the way  Google’s business works, the laws that apply  to our company, and certain things we’ve  always believed to be true.",
            title2: "New user",
            content1: "Besides these terms, we also publish a Privacy Policy. Although it’s not part of these terms, we encourage you to read it to better understand how you can update, manage, export, and  delete your information.",
            title3: "Service provider",
            content2: "Besides these terms, we also publish a Privacy Policy. Although it’s not part of these terms, we encourage you to read it to better understand how you can update, manage, export, and delete your information."
        }
        
        return(

          
            <View style={Styles.main}>
                <Header
                    style={{height:52}}
                    headerTx="inforMerchant.introductionbody"
                    LeftIcon={Svgs.back}
                    onLeftPress={props.navigation.goBack}   
                />
                <View style={{flex:1, borderRadius:8, margin:20, padding:16}}>
                    <ScrollView>
                        
                    <View style={Styles.body}>
                        <Text
                            style={{textAlign:'justify'}}
                            text={textData.tilte1}
                        />

                         <Text
                            style={{marginVertical:20}}
                            text={textData.title2}
                        />
                         <Text
                            style={{textAlign:'justify',fontWeight:'normal'}}
                            text={textData.content1}
                        />
                        <Text
                            style={{marginVertical:20, textAlign:'justify'}}
                            text={textData.title3}
                        />
                        <Text
                        style={{textAlign:'justify'}}
                        text={textData.content2}
                        />
                    </View>
                    </ScrollView>

                </View>

            </View>
           
          

        )

    }



)