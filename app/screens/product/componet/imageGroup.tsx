import React, { useEffect, useRef, useState } from "react"
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../../theme";
import { Text } from "../../../components/text/text";
import { Dimensions, FlatList, Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Button } from "../../../components";
import { Images } from "../../../../assets";
import Modal from 'react-native-modal'
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useStores } from "../../../models";

interface ImagesGroup {
    onPressZoom?: ([]) => void,
    onPressDelete?: () => void,
    onPressDelete1?: () => void,
    arrData: [],
    onPressOpenLibrary?: () => void;
}

export default function ImagesGroup(props: ImagesGroup) {
    const { arrData, onPressZoom, onPressDelete,onPressOpenLibrary, onPressDelete1 } = props

    const refCarousel = useRef(null)
    const [isModal, setIsModal] = useState(false)
    const [activeSlide, setactiveSlide] = useState(0);
    const { productStore } = useStores()

    console.log("-----arrData---------------", arrData);
    return (
        <View>
            {arrData?.length === 0 ?
                <TouchableOpacity onPress={onPressOpenLibrary} style={{ width: scaleWidth(68), height: scaleHeight(44) }}>
                    <Images.imageUpload />
                </TouchableOpacity>
                :
                <View style={{
                    height: scaleHeight(44), width: scaleWidth(68),
                    borderRadius: 8, borderWidth: 1,
                    borderColor: colors.palette.navyBlue,
                    alignItems: 'center',
                }} >
                    <TouchableOpacity onPress={() => onPressDelete()}
                        style={{
                            position: 'absolute', right: scaleWidth(-6),
                            top: scaleHeight(-6), zIndex: 1
                        }} >
                        <Images.icon_delete2 />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(arrData) => setIsModal(true)}
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            top: scaleHeight(13),
                            left: scaleWidth(24)
                        }} >
                        <Images.icon_zoom />
                    </TouchableOpacity>

                    {arrData?.length >= 3 ? <View style={{ flexDirection: 'row', }}>
                        <View>
                            <Image height={scaleHeight(42)} width={scaleWidth(41)}
                                style={{
                                    borderTopLeftRadius: 8,
                                    borderBottomLeftRadius: 8
                                }}
                                defaultSource={Images.imageError}
                                source={{ uri: arrData[0].uri }} />
                        </View>
                        <View style={{ marginLeft: scaleWidth(1) }}>
                            <Image height={scaleHeight(21)} width={scaleWidth(24)}
                                style={{
                                    borderTopRightRadius: 8, marginBottom: scaleHeight(1)
                                }}
                                defaultSource={Images.imageError}
                                source={{ uri: arrData[1].uri }} />
                            <Image height={scaleHeight(21)} width={scaleWidth(24)}
                                style={{
                                    borderBottomRightRadius: 8,
                                }}
                                defaultSource={Images.imageError}
                                source={{ uri: arrData[2].uri }} />
                        </View>
                    </View> : arrData?.length === 2 ? 
                    <View style={{ flexDirection: 'row', }}>
                        
                            <Image height={scaleHeight(42)} width={scaleWidth(33)}
                                style={{
                                    borderTopLeftRadius: 8,
                                    borderBottomLeftRadius: 8,
                                    marginRight: scaleWidth(1),
                                }}
                                defaultSource={Images.imageError}
                                source={{ uri: arrData[0].uri }} />
                            <Image height={scaleHeight(42)} width={scaleWidth(32)}
                                style={{
                                    borderTopRightRadius: 8, borderBottomRightRadius: 8
                                }}
                                defaultSource={Images.imageError}
                                source={{ uri: arrData[1].uri }} />
                    </View> 
                    : arrData?.length === 1 ? <View >
                        <Image height={scaleHeight(42)} width={scaleWidth(66)}
                            style={{
                                borderRadius: 8
                            }}
                            defaultSource={Images.imageError}
                            source={{ uri: arrData[0].uri }} />
                    </View> : null}
                </View>}
            <Modal isVisible={isModal} onBackdropPress={()=> setIsModal(false)}>
                <View >
                    {arrData && arrData.length > 0 ? (
                        <View >
                            <Carousel
                                data={arrData}
                                autoplay={false}
                                ref={refCarousel}
                                loop
                                renderItem={({ item, index } : any) => (
                                    <View>
                                        <TouchableOpacity style={{
                                            zIndex: 1, position: 'absolute',
                                            right: scaleWidth(40), top: scaleHeight(8)
                                        }}
                                            onPress={()=>onPressDelete1()}>
                                            <Images.icon_delete2 width ={scaleWidth(26)} height = {scaleHeight(26)} />
                                        </TouchableOpacity>
                                        <Image
                                            source={{
                                                uri: item.uri,
                                            }}
                                            defaultSource={Images.imageError}
                                            
                                            resizeMode='cover'
                                            style={{ height: scaleHeight(416), width: scaleWidth(294), borderRadius: 16, alignSelf: 'center' }}>
                                        </Image>
                                    </View>
                                )}
                                sliderWidth={Dimensions.get("window").width - 32}
                                itemWidth={Dimensions.get("window").width - 32}
                                onSnapToItem={(index) => {setactiveSlide(index)
                                    productStore.setImageModalIndex(index)
                                }}
                                onTouchStart={() => {
                                    productStore.setImageModalIndex(0)
                                }}
                                // lockScrollWhileSnapping={true}
                                // enableMomentum={false}
                                // decelerationRate={0.5}
                            />
                            <Pagination
                                dotsLength={ arrData.length}
                                activeDotIndex={activeSlide}
                                dotStyle={{
                                    borderRadius: 8,
                                    height: scaleHeight(14),
                                    width: scaleWidth(14),
                                    borderColor: colors.palette.neutral100,
                                    borderWidth: 2,
                                }}
                                dotColor={'#BBB9B9'}
                                inactiveDotColor={'#BBB9B9'}
                                inactiveDotOpacity={1}
                                inactiveDotScale={1}
                                inactiveDotStyle={{
                                    width: scaleWidth(8),
                                    height: scaleHeight(8),
                                    borderRadius: 5,
                                    borderColor: '#BBB9B9',
                                    borderWidth: 2,
                                }}
                            />
                        </View>
                    ) : null}
                    <View style={{alignItems: 'center'}}>

                    <Button onPress={onPressOpenLibrary} style={{height: scaleHeight(38), width: scaleWidth(127),
                        borderRadius: 8,
                        borderWidth: scaleWidth(1),
                        borderColor: colors.palette.navyBlue,
                        backgroundColor: colors.palette.neutral100,
                        flexDirection: 'row',
                        // marginTop : scaleHeight(10),
                        alignItems : 'center'
                    }} >
                        <Images.ic_addImages width = {scaleWidth(16)} height = {scaleHeight(16)}/>
                        <Text text="Tải ảnh lên" style={{fontWeight: '600', fontSize: fontSize.size14,
                            lineHeight: scaleHeight(24), color: colors.palette.navyBlue , marginLeft: scaleWidth(6)
                        }} />
                    </Button>
                        </View>
                </View>
            </Modal>
        </View>

    )
};