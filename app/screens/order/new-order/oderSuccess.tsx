import React, { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Images } from "../../../../assets"
import { Text } from "../../../components"
import { fontSize, scaleHeight, scaleWidth } from "../../../theme"
import { useStores } from "../../../models"

export const OrderSuccess: FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { idOrder, screen } = route.params || undefined
    const { orderStore } = useStores()
    return (
        <View style={{
            backgroundColor: "#Ffffff",
            flex: 1,
            paddingHorizontal: scaleWidth(16)
          }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Images.ic_checkCircleBlue width={scaleWidth(98)} height={scaleHeight(98)} />
                <Text tx={screen === 'edit' ? 'successScreen.editSuccess' : "successScreen.labelSuccess"} style={{ fontSize: fontSize.size18, fontWeight: '700', marginTop: scaleHeight(40), marginBottom: scaleHeight(10) }} />
                <Text tx={screen === 'edit' ? 'successScreen.editTitleSuccess' : "successScreen.titleSuccessOrder"} style={{ fontSize: fontSize.size14, fontWeight: '500', color: '#84888D' }} />

            </View >
            <View style={{
            }}>
               {screen === 'edit'? null:
                <TouchableOpacity onPress={() => {
                    orderStore.reset();
                    navigation.goBack();
                }} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10, borderColor: '#c8c8c8',
                    paddingVertical: scaleHeight(12),
                    backgroundColor: '#0078d4'
                }}>
                    <Text tx="successScreen.btnCreateOrder" style={{ fontSize: fontSize.size14, color: 'white', fontWeight: '600' }} />
                </TouchableOpacity>}
                <TouchableOpacity
                    onPress={() => {
                        orderStore.setOrderId(idOrder);
                        navigation.navigate("orderDetails" as never)
                    }}
                    style={{ justifyContent: 'center', alignItems: 'center', marginTop: scaleHeight(15) }}>
                    <Text tx="successScreen.btnDetailOrder" style={{ fontSize: fontSize.size14, color: '#0078D4', fontWeight: '700' }} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('mainBottom' as never)
                    }}
                    style={{ justifyContent: 'center', alignItems: 'center', marginTop: scaleHeight(15), marginBottom: scaleHeight(30) }}>
                    <Text tx="successScreen.btnBack" style={{ fontSize: fontSize.size14, color: '#0078D4', fontWeight: '700' }} />
                </TouchableOpacity>
            </View>
        </View>
        // </View>
    )
}