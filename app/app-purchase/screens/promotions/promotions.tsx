import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Dimensions, FlatList, Image, TextInput, TouchableOpacity, View } from "react-native"
import { Button, Header, Text, TextField } from "../../components"
import { Svgs } from "../../../../assets/svgs"
import { useNavigation, useRoute } from "@react-navigation/native"
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../theme"
import { styles } from "./styles"
import { Controller, useForm } from "react-hook-form"
import AutoHeightImage from "react-native-auto-height-image"
import { scheduleFlushOperations } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { isFormValid } from "../../utils/validate"

export const Promotions: FC = observer(
    function Promotions() {
        const { control } = useForm()
        const navigation = useNavigation()
        const paddingTop = useSafeAreaInsets().top

        const route = useRoute()

        const [isFocus, setIsFocus] = useState<string[]>([])


        const [promotionUsed, setPromotionUsed] = useState<{}[]>([])

        const arrVoucher = [
            {
                images: "https://s3-alpha-sig.figma.com/img/b28d/6f57/23e05d4cdb59d04eeb9fe1547e57649c?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mpDEt8BOyNG9cWujKVmAIizIvaP-hIP4pa86yy2CmRMxJ~Lh7nkRjcqgm6UUlqnkcb-HGKvbCoar-qckTbXQ8yKtATaCpJ6uoibPD2jCGHelS6YXOr~mL5PC-VUQMZOCCZogssLaDOF9DO65iZdbIDITWPSRaFmPJ4oMvxeA4y6XK2QPNpiFvzE1WslEEilquOs3mx4LJ-25Ce9fsASi1fYjYHqEeSKhoJWEhL1zRj1iVcBSLfCC4YNFWC1FiJos1Ar3ehr2ZSf4lQ4~t322zq0K~G0C7r1aDIyJiuj91hkocuppF~PrSNB-aUpgVbjnFzO0e1whzM~z7UM8po53wA__",
                name: 'Chuong trinh khuyen mai Tet',
                code: 'VC100007426',
                content: 'Thanh toan it nhat 1.000.000 de nhan uu dai nay.Thanh toan it nhat 1.000.000 de nhan uu dai nay.',
                textDisplay: 'Giam 30% toi da 50k',
                eligible: true,
            },
            {
                images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
                name: 'Tung bung don nam moi 2024',
                code: 'VC200000878',
                content: 'Thanh toan it nhat 1.000.000 de nhan uu dai nay',
                textDisplay: 'Giam 30% toi da 50k',
                eligible: true,
            },
            {
                images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
                name: 'Chuong trinh khuyen mai Tet',
                code: 'VC30000643343',
                content: 'Thanh toan it nhat 1.000.000 de nhan uu dai nay',
                textDisplay: 'Giam 30% toi da 50k',
                eligible: true,
            },
            {
                images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
                name: 'Chuong trinh khuyen mai Tet',
                code: 'VC000064253',
                content: 'Thanh toan it nhat 1.000.000 de nhan uu dai nay',
                textDisplay: 'Giam 30% toi da 50k',
                eligible: false,
            },
            {
                images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
                name: 'Chuong trinh khuyen mai Tet',
                code: 'VC0000612443',
                content: 'Thanh toan it nhat 1.000.000 de nhan uu dai nay',
                textDisplay: 'Giam 30% toi da 50k',
                eligible: false,
            },
            {
                images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
                name: 'Chuong trinh khuyen mai Tet',
                code: 'VC0000523',
                content: 'Thanh toan it nhat 1.000.000 de nhan uu dai nay',
                textDisplay: 'Giam 30% toi da 50k',
                eligible: false,
            },
            {
                images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
                name: 'Chuong trinh khuyen mai Tet',
                code: 'VC00001235',
                content: 'Thanh toan it nhat 1.000.000 de nhan uu dai nay',
                textDisplay: 'Giam 30% toi da 50k',
                eligible: false,
            },
            {
                images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
                name: 'Chuong trinh khuyen mai Tet',
                code: 'VC00001132',
                content: 'Thanh toan it nhat 1.000.000 de nhan uu dai nay',
                textDisplay: 'Giam 30% toi da 50k',
                eligible: false,
            },
            {
                images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
                name: 'Chuong trinh khuyen mai Tet',
                code: 'VC00001213',
                content: 'Thanh toan it nhat 1.000.000 de nhan uu dai nay',
                textDisplay: 'Giam 30% toi da 50k',
                eligible: false,
            },
            {
                images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
                name: 'Chuong trinh khuyen mai Tet',
                code: 'VC0000134613',
                content: 'Thanh toan it nhat 1.000.000 de nhan uu dai nay',
                textDisplay: 'Giam 30% toi da 50k',
                eligible: false,
            },
            {
                images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
                name: 'Chuong trinh khuyen mai Tet',
                code: 'VC0000134562',
                content: 'Thanh toan it nhat 1.000.000 de nhan uu dai nay',
                textDisplay: 'Giam 30% toi da 50k',
                eligible: false,
            },
        ]

        const handleAdd = (data: string) => {
            var indexArr = isFocus.findIndex((item) => item === data)
            if (indexArr === -1) {
                let a = isFocus.concat(data)
                setIsFocus(a)
            } else {
                let b = isFocus.slice()
                b.splice(indexArr, 1)
                setIsFocus(b)
            }
            setPromotionUsed([])
        }

        const handleUsed = () => {
            let arrCopy = arrVoucher.slice()
            let a = isFocus.slice()
            for (const str of a) {
                let isContained = arrCopy.filter(obj => {
                    return str === obj.code
                })
                if(isContained){
                    let indexCheck = promotionUsed.findIndex((item)=>{
                        item = isContained
                    })
                    if(indexCheck === -1){
                        promotionUsed.push(isContained)
                        setPromotionUsed(promotionUsed)
                    }
                }
                console.log(promotionUsed.length)
                // console.log(isContained)
                // console.log(isContained.length)

                // if (isContained) {
                //     const matchingIndex = promotionUsed.findIndex(obj => {
                //         obj === isContained
                //     });
                //     console.log(matchingIndex)
                //     if (matchingIndex === -1) {
                //         let a =  promotionUsed.concat(isContained);
                //         console.log(a, 'day la a')
                //         console.log(a.length, 'day la chieu dai a')
                //         setPromotionUsed(a)
                //         // navigation.goBack()
                //     } else {
                //         let b = promotionUsed.slice()
                //         b.splice(matchingIndex, 1)
                //         console.log(b, 'day la b')
                //         // navigation.goBack()
                //         setPromotionUsed(b)
                //     }
                // }
            }
            // console.log(promotionUsed)
            // console.log(promotionUsed.length)
            // console.log(isFocus)
        }

        return (
            <View style={{
                backgroundColor: colors.palette.aliceBlue,
            }}>
                <Header
                    LeftIcon={Svgs.back}
                    onLeftPress={() => navigation.goBack()}
                    headerTx={'order.confirm'}
                    style={{ height: scaleHeight(52), }}
                    titleStyle={styles.textHeader}
                />
                <View style={{ paddingHorizontal: scaleWidth(padding.padding_16) }}>
                    <Controller
                        control={control}
                        name="search"
                        render={({ field: { onBlur, onChange, value } }) => {
                            return (
                                <TextField
                                    onBlur={onBlur}
                                    value={value}
                                    onChangeText={(value) => onChange(value)}
                                    RightIconClear={Svgs.icon_delete2}
                                    onClearText={() => onChange('')}
                                    placeholderTx={'order.promotionHint'}
                                    style={{
                                        // backgroundColor: colors.palette.neutral900,
                                        // marginTop: scaleHeight(margin.margin_20),
                                        justifyContent: 'center',
                                        paddingBottom: scaleHeight(15),
                                        height: scaleHeight(35),
                                    }}
                                />
                            )
                        }}
                    />
                </View>
                <FlatList
                    data={arrVoucher}
                    style={{
                        // marginBottom: scaleHeight(40),
                        maxHeight: Dimensions.get('screen').height - scaleHeight(52 + 55 + 34 + 82 + paddingTop)
                    }}
                    keyExtractor={(item) => item.code}
                    showsVerticalScrollIndicator={true}
                    renderItem={(item) => {
                        return (
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: scaleHeight(margin.margin_10),
                                paddingHorizontal: scaleWidth(padding.padding_16),
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Image source={{ uri: item.item.images }}
                                        height={scaleHeight(48)} width={scaleWidth(48)}
                                        resizeMode='cover'
                                        style={{
                                            borderRadius: 4,
                                            marginRight: scaleWidth(margin.margin_8),
                                        }}
                                    />
                                    {/* <View style={{
                                                position: 'absolute',
                                                backgroundColor: colors.palette.dolphin,
                                                zIndex: 1, opacity: 0.8,
                                                height: scaleHeight(48), width: scaleWidth(48),
                                                borderRadius: 4
                                            }} >
                                        </View> */}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text text={item.item.name} style={{
                                        fontWeight: '600',
                                        fontSize: fontSize.size14, color: colors.palette.nero,
                                        lineHeight: scaleHeight(16.94)
                                    }} />
                                    <Text text={item.item.content} style={{
                                        fontWeight: '400',
                                        fontSize: fontSize.size10, color: colors.palette.dolphin,
                                        lineHeight: scaleHeight(12.1),
                                        marginTop: scaleHeight(margin.margin_2)
                                    }} />
                                </View>
                                {item.item.eligible === true ?
                                    <TouchableOpacity onPress={() => handleAdd(item.item.code)}
                                        style={{
                                            width: scaleWidth(30),
                                            marginLeft: scaleWidth(margin.margin_8),
                                        }}>
                                        {isFocus.includes(item.item.code)
                                            ?
                                            <Svgs.icon_choose /> :
                                            <Svgs.icon_plusCircle />
                                        }
                                    </TouchableOpacity> :
                                    <View style={{
                                        width: scaleWidth(30),
                                        marginLeft: scaleWidth(margin.margin_8),
                                    }}>
                                    </View>}

                            </View>
                        )
                    }}
                />

                {
                    isFocus.length > 0 ?
                        <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: scaleWidth(padding.padding_16),
                            alignItems: 'center',
                            marginVertical: scaleHeight(margin.margin_20),
                            paddingBottom: scaleHeight(34)

                        }}>
                            <Text style={{ flex: 1 }}>Da chon {isFocus.length} uu dai</Text>
                            <Button text="Ap dung"
                                onPress={() => handleUsed()}
                                style={{
                                    backgroundColor: colors.palette.navyBlue,
                                    height: scaleHeight(42), paddingVertical: scaleHeight(padding.padding_12),
                                    paddingHorizontal: scaleWidth(padding.padding_24)
                                }}
                                textStyle={{
                                    fontWeight: '600', fontSize: fontSize.size14,
                                    lineHeight: scaleHeight(16.94),
                                    color: colors.palette.neutral100
                                }} />
                        </View>
                        : null
                }
            </View>
        )
    }
)