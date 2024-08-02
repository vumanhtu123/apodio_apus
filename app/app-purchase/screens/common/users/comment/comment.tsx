import { StackScreenProps } from "@react-navigation/stack";
import { Header } from "../../../../components/header/header";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Svgs } from "../../../../../../assets/svgs";
import { Text } from "../../../../components/text/text";
import ModelSenSuccess from "./ModelSendSuccess";
import { useNavigation } from "@react-navigation/native";
import { action, makeObservable, observable } from "mobx";

import React from "react";
import StarRating from "react-native-star-rating-widget";
import { NavigatorParamList } from "../../../../navigators/app-navigator";
import { colors } from "../../../../theme";

export const commentScreen: FC<StackScreenProps<NavigatorParamList, "comment">> = observer(
        function comment (props) {

                const navigation = useNavigation();

                const data = props.route.params.defaultRating;
                
                const [defaultRating, setdefaultRating] = useState(data);

                // const dataOpen = onpen;
                // const openModal = setOnpen(!onpen);
                
                // console.log(openModal)
               
               
                const RatingFeedback = () =>{
                    
                    return(

                        <StarRating 
                            rating={defaultRating}
                            onChange={setdefaultRating}
                        
                        />
                    )
                   
                }

                return(
            

                <View style={{flex:1,}}>
                    <Header
                        style={{height:52}}
                        headerTx="inforMerchant.comment"
                        onLeftTextPress={() => {
                          navigation.goBack()
                        }}
                        onRightTextPress={() =>{
                                navigation.navigate('InfomerchantUsers');
                        }}
                        rightText="Gửi"
                        leftText="inforMerchant.cancel"
                        
                    />
                    <View style={{flex:1, padding:15}}>
                        <View style={{width:'100%', alignItems:'center',marginTop:30}}>
                         <RatingFeedback/>
                         <Text 
                            tx="inforMerchant.clickStar"
                            style={{color: colors.dolphin}}
                         />
                         <View style={{ width:'100%',height:1, borderWidth:1,borderColor:colors.ghostWhite, marginTop:20 }}/>
                        </View>

                        <TextInput
                            style={{width:'100%', padding:12}}
                            placeholder="BestAPP!"
                        />
                        <View style={{ width:'100%',height:1, borderWidth:1,borderColor:colors.ghostWhite}}/>

                        <TextInput
                            style={{width:'100%', padding:12}}
                            placeholder="Đánh giá (Tùy chọn)"
                        />      

                    </View>
                 
                   
                        

                </View>
            )

        } 


        
)

class Store  {

     valueShow = true;

    constructor() {
        makeObservable(this,{
            show: action,
            close: action,
            valueShow : observable
        })
    }

    show(){
        this.valueShow = true
    }
    close() {
       this.valueShow = false
    }

}

const store = new Store();
export default store;

