import { Image, TouchableOpacity, View } from "react-native";
import { Styles } from "../style";
import { Text } from "../../../components";
import React from "react";
import { scaleHeight, scaleWidth } from "../../../theme";

interface Item {
    id: any;
    img: any;
    name: string;
    onPress: () => void;
}
export const ItemTabar = ({ item }: { item: Item }) => {
    return (
        <TouchableOpacity
            style={Styles.bodyItemTabar}
            onPress={() => {
                // console.log('====================================');
                // console.log('doann');
                // console.log('====================================');
                item.onPress();
            }}>
            <View style={{ alignItems: "center", }}>
                <Image
                    source={item.img}
                    style={{ width: scaleWidth(16), height: scaleHeight(16) }}
                />
                <Text
                    style={{
                        marginTop: scaleHeight(7),
                        fontSize: scaleWidth(10),
                        textAlign: "center",
                    }}>
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
