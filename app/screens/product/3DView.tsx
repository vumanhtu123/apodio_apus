import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import { Images } from "../../../assets";
import { colors, scaleHeight, scaleWidth } from "../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

export const View3D: FC = observer(
    function View3D(props) {
        const paddingTop = useSafeAreaInsets().top
        const navigation = useNavigation()
        const route = useRoute()
        const scene = route?.params?.upc
        return (
            <WebView style={{ flex: 1, marginTop: paddingTop }}
                source={{ uri: scene }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{
                        position: 'absolute', top: scaleHeight( 15),
                        left: scaleWidth(16), zIndex: 1
                    }}>
                    <Images.icon_deleteBlue />
                </TouchableOpacity>
            </WebView>
        )
    }
)