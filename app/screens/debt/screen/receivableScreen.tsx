import { StackScreenProps } from "@react-navigation/stack";
import { FC } from "react";
import { NavigatorParamList } from "../../../navigators";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import React from "react";


export const ReceivableScreen: FC<StackScreenProps<NavigatorParamList, "receivable">> = observer(
    function receivableScreen(props) {
        return (
            <View>

            </View>
        )
    }
)