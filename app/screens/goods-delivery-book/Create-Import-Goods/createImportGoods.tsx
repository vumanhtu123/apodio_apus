import { observer } from "mobx-react-lite";
import React from "react";
import { FC } from "react";
import { View } from "react-native";
import { ScreenProps } from "react-native-screens";
import { NavigatorParamList } from "../../../navigators";
import { StackScreenProps } from "@react-navigation/stack";
import { Header } from "../../../components";
import { scaleHeight } from "../../../theme";
import { Images } from "../../../../assets";


export const CreateImportGoods: FC<StackScreenProps<NavigatorParamList,"createImportGoods">> = observer (
    function createImportGoods(props) {
       return(
        <View >
                <Header
                    LeftIcon={Images.back}
                    leftText="GoodsDeliveryBook.createImportGood"
                    style={{height:scaleHeight(52)}}
                />
        </View>
       ) 
    }
)