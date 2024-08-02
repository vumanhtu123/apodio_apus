import { StackScreenProps } from "@react-navigation/stack";
import { Header } from "../../../../../app-purchase/components/header/header";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { TextInput, View } from "react-native";
import { Svgs } from "../../../../../../assets/svgs";
import { Text } from "../../../../../app-purchase/components/text/text";
import React from "react";
import { NavigatorParamList } from "../../../../navigators/app-navigator";
import { colors } from "../../../../theme";




 export const faqScren: FC<StackScreenProps<NavigatorParamList, "faqscren">> = observer(
    function faqscren (props){
        
        return(
           <View style={{flex:1,}}>
               
                    <Header
                    style={{height:52}}
                    LeftIcon={Svgs.back}
                    headerTx="inforMerchant.faq"
                    onLeftPress={() => props.navigation.goBack()}
                    /> 
                <View style={{padding:16,}}>
                    <Text
                        tx="inforMerchant.title"
                    />
                    <Text
                        style={{color: colors.dolphin, marginVertical:20}}
                        tx="inforMerchant.contenFAQ1"
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center',borderWidth: 1, borderColor: colors.aliceBlue,borderRadius:4 }}>
                        <Svgs.ic_search/>
                        <TextInput
                            
                            placeholder="Gõ từ khóa để tìm kiếm"
                            style={{  padding: 10, borderRadius: 5 }}
                        />
                    </View>            
                    
                    <Text
                        style={{color:colors.nero, marginVertical:20,}}
                        tx="inforMerchant.faq"
                    />
                    
                    <View style={{height:1, borderWidth:1, borderColor:colors.ghostWhite}} />

                    <View style={{ flexDirection: 'row', alignItems: 'center',borderWidth: 1, borderColor: colors.aliceBlue,borderRadius:4,justifyContent:'space-between' }}>
                        <TextInput
                            
                            placeholder="Lorem ipsum dolor sit amet consectetur"
                            style={{  padding: 10, borderRadius: 5 }}
                        />
                        <Svgs.ic_plus/>
                    </View>   

                    <View style={{height:1, borderWidth:1, borderColor:colors.ghostWhite}} />
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center',borderWidth: 1, borderColor: colors.aliceBlue,borderRadius:4,justifyContent:'space-between' }}>
                        <TextInput
                            
                            placeholder="Mattis nisl massa quis in et"
                            style={{  padding: 10, borderRadius: 5 }}
                        />
                        <Svgs.ic_minus/>
                    </View>

                    <View style={{height:1, borderWidth:1, borderColor:colors.ghostWhite}} />

                    <Text
                        text="Lorem ipsum dolor sit amet consectetur. Quis tristique massa placerat vel sed pulvinar. Id egestas non etiam scelerisque dolor elit pellentesque fames quisque. Urna in eget nibh et odio. Cras vitae enim elit in in quis commodo."
                    /> 

                    <View style={{height:1, borderWidth:1, borderColor:colors.ghostWhite}} />

                    <View style={{ flexDirection: 'row', alignItems: 'center',borderWidth: 1, borderColor: colors.aliceBlue,borderRadius:4,justifyContent:'space-between' }}>
                        <TextInput
                            
                            placeholder="Mattis nisl massa quis in et"
                            style={{  padding: 10, borderRadius: 5 }}
                        />
                        <Svgs.ic_plus/>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center',borderWidth: 1, borderColor: colors.aliceBlue,borderRadius:4,justifyContent:'space-between' }}>
                        <TextInput
                            
                            placeholder="Mattis nisl massa quis in et"
                            style={{  padding: 10, borderRadius: 5 }}
                        />
                        <Svgs.ic_plus/>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center',borderWidth: 1, borderColor: colors.aliceBlue,borderRadius:4,justifyContent:'space-between' }}>
                        <TextInput
                            
                            placeholder="Mattis nisl massa quis in et"
                            style={{  padding: 10, borderRadius: 5 }}
                        />
                        <Svgs.ic_plus/>
                    </View>
                
                </View>

                
           </View>

        )
     }
    )