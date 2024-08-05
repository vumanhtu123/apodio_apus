
import React from "react"
import { FC } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { Text } from "../../../../components"
import { colors, fontSize, scaleWidth } from "../../../theme"
import { Svgs } from "../../../../../assets/svgs"
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
const ItemListExChange: FC<ItemProps> = ({ item, onClickLike, onClickComment }) => {
    return (
        <View
            style={{ flex: 1, marginBottom: scaleWidth(20) }}
        >
            <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
                <Image source={{ uri: item.avatar }}
                    width={25}
                    height={25}
                    borderRadius={25}
                />
                <Text style={{ fontSize: fontSize.size14, fontWeight: "700", marginRight: scaleWidth(5), marginLeft: scaleWidth(5) }}>{item.name}</Text>
                <Text style={{ fontSize: fontSize.size12, color: colors.palette.dolphin }}>{item.timeCreate}</Text>
            </View>
            <Text style={{ fontSize: fontSize.size12, }}>
                {item.content}
            </Text>
            <View style={[Styles.flexRow, { marginTop: scaleWidth(9) }]}>
                <View style={Styles.flexRow}>
                    <View style={[{ flexDirection: 'row' }]}>
                        <Text style={{ fontSize: fontSize.size12, color: colors.palette.dolphin }}>2 </Text>
                        <Text style={{ fontSize: fontSize.size12, color: colors.palette.dolphin }} tx="debtScreen.like" />

                    </View>
                    <View style={[Styles.flexRow, { marginLeft: scaleWidth(12), alignItems: 'center' }]}>
                        <Svgs.ic_comment
                            width={scaleWidth(12)}
                        />
                        <Text style={{ fontSize: fontSize.size12, color: colors.palette.dolphin }} tx="debtScreen.comment" />
                    </View>
                </View>
                <TouchableOpacity>
                    <Svgs.ic_Like />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ItemListExChange

