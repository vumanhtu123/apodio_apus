import { View } from "moti"
import React from "react"
import { FC } from "react"
import { Image, TouchableOpacity } from "react-native"
import { Text } from "../../../components"
import { fontSize } from "../../../theme"
import { Images } from "../../../../assets"
import { Styles } from "../screen/styles"

interface ItemData {
    id?: string,
    name: string,
    avatar: string,
    timeCreate: string,
    content: string

}
interface ItemProps {
    item: ItemData,
    onClickLike?: () => void,
    onClickComment?: () => void
}
export const ItemListExChange: FC<ItemProps> = ({ item, onClickLike, onClickComment }) => {
    return (
        <View
            style={{ flex: 1 }}
        >
            <View style={[{ flexDirection: 'row' }]}>
                <Image source={{ uri: item.avatar }}
                    width={25}
                    height={25}
                    borderRadius={10}
                />
                <Text style={{ fontSize: fontSize.size14, fontWeight: "700" }}>{item.name}</Text>
                <Text>{item.timeCreate}</Text>
            </View>
            <Text>
                {item.content}
            </Text>
            <View style={Styles.flexRow}>
                <View >
                    <View style={[{ flexDirection: 'row' }]}>
                        <Text>2</Text>
                        <Text tx="debtScreen.like" />

                    </View>
                    <View>
                        <Images.ic_comment />
                        <Text tx="debtScreen.comment" />
                    </View>
                </View>
                <TouchableOpacity>
                    <Images.ic_Like />
                </TouchableOpacity>
            </View>
        </View>
    )
}