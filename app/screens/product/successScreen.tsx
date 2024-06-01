import React, { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { Images } from "../../../assets/index"
import { Text } from "../../components/text/text"
import { fontSize, scaleHeight, scaleWidth } from "../../theme"
import { styles } from "./styles"
import { navigate } from "../../navigators"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"

export const SuccessScreen: FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { idProduct } = route.params || undefined
    const { productStore } = useStores()
    return (
        <View style={styles.ROOT}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Images.ic_checkCircleBlue width={scaleWidth(98)} height={scaleHeight(98)} />
                <Text tx="successScreen.labelSuccess" style={{ fontSize: fontSize.size18, fontWeight: '700', marginTop: scaleHeight(40), marginBottom: scaleHeight(10) }} />
                <Text tx="successScreen.titleSuccess" style={{ fontSize: fontSize.size14, fontWeight: '500', color: '#84888D' }} />

            </View >
            <View style={{
                marginHorizontal: scaleWidth(16)
            }}>
                <TouchableOpacity onPress={() => navigation.reset({ index: 1, routes: [{ name: 'productScreen' as any }, { name: 'ProductCreateScreen' as any }]})} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10, borderColor: '#c8c8c8',
                    paddingVertical: scaleHeight(12),
                    backgroundColor: '#0078d4'
                }}>
                    <Text tx="successScreen.btnCreate" style={{ fontSize: fontSize.size14, color: 'white', fontWeight: '600' }} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        productStore.setSelectedProductId(idProduct);
                        navigation.navigate("productDetailScreen" as never)
                    }}
                    style={{ justifyContent: 'center', alignItems: 'center', marginTop: scaleHeight(15) }}>
                    <Text tx="successScreen.btnDetail" style={{ fontSize: fontSize.size14, color: '#0078D4', fontWeight: '700' }} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        productStore.setReloadProductScreen(true)
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