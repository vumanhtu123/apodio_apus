import { useNavigation } from "@react-navigation/native"
import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from "react-native"
import { Screen } from "../../../app/components/screen/screen"
import { Images } from "../../../assets/index"
import { Header } from '../../components/header/header'
import { Text } from "../../components/text/text"
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme"
import { products, suppliers } from "./data"
import { styles } from "./styles"
import LinearGradient from "react-native-linear-gradient"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
export const ProductCategoriesScreen: FC = observer(() => {
    const navigation = useNavigation()
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const { categoryStore } = useStores();
    const pageSize = 5
   
    const handleEndReached = () => {
        if (!isLoading && page * pageSize < products.length) {
            setIsLoading(true);
            setTimeout(() => {
                setPage(page + 1);
                setIsLoading(false);
            }, 2000);
        }
    };
    const refreshNotifications = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            setPage(1)
            setIsRefreshing(false)
        }, 1000)
    }
    const renderFooter = () => {
        if (!isLoading) return null
        return (
            <View >
                <ActivityIndicator size="large" color="#F6961C" />
            </View>
        )
    }
    const renderProductItem = ({ item, index }: any) => {
        const handlePress = () => {
            navigation.navigate('productScreen' as never, { company: item.name });
        };
        if (item.company === 'APODIO') {
            return (
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                    colors={[colors.palette.navyBlue, colors.palette.malibu]}
                    style={{ marginRight: 10, marginBottom: 10, borderRadius: 10 }}
                >
                    <TouchableOpacity onPress={handlePress} style={[{ width: scaleWidth(166), height: scaleHeight(124) }]}>
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                paddingHorizontal: scaleHeight(15)
                            }}
                        >
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {/* <AutoImage
                            style={{ width: scaleWidth(107), height: scaleHeight(70), borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                            source={{
                                uri: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g",
                            }}
                        /> */}
                                <Images.logoApodioWhite width={scaleWidth(80)} height={scaleHeight(57)} />
                                <View style={{ top: 10 }}>
                                    <Text style={{ color: 'white', fontSize: fontSize.size10, lineHeight: 12, textAlign: 'center' }} numberOfLines={2}>{item.name}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
            )
        } else {
            return (
                <TouchableOpacity onPress={handlePress} style={[{ width: scaleWidth(166), height: scaleHeight(124), backgroundColor: 'white', marginRight: 10, marginBottom: 10, borderRadius: 10 }]}>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1
                        }}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {/* <AutoImage
                            style={{ width: scaleWidth(107), height: scaleHeight(70), borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                            source={{
                                uri: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g",
                            }}
                        /> */}
                            <Images.logoShop width={scaleWidth(27.63)} height={scaleHeight(29.75)} />
                            <View style={{ top: 10 }}>
                                <Text style={{ color: '#747475', fontSize: fontSize.size10, lineHeight: 12, textAlign: 'center' }} numberOfLines={2}>{item.name}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    };
    const displayedNotifications = suppliers.slice(0, page * pageSize)
    return (
        <View style={styles.ROOT}>
            <Header
                type={"AntDesign"}
                LeftIcon={Images.back}
                onLeftPress={() => navigation.goBack()}
                colorIcon={colors.text}
                headerText={`Danh mục sản phẩm`}
                style={{ height: scaleHeight(54) }}
                titleMiddleStyle={{ justifyContent: 'flex-start', paddingLeft: 5, flexDirection: 'row', alignItems: 'center' }}
            />
            <Screen style={styles.ROOT} preset="fixed">
                <View style={{ marginHorizontal: 16 }}>
                    <Text style={{ fontSize: fontSize.size14, fontWeight: '500' }}>Lựa chọn xem sản phẩm của nhà cung cấp:</Text>
                </View>
                <View style={{ flex: 0.95, margin: 16 }}>
                    <FlatList
                        data={displayedNotifications}
                        showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshNotifications} title="ok" />}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={handleEndReached}
                        onEndReachedThreshold={0.8}
                        ListFooterComponent={renderFooter}
                        numColumns={2}
                        // columnWrapperStyle={isGridView ? null : null}
                        renderItem={renderProductItem}
                    />
                </View>
            </Screen >
        </View>
    )
})
