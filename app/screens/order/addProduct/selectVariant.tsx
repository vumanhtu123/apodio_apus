import { Observer, observer } from 'mobx-react-lite';
import { FC, useRef, useState } from 'react';
import React, { Dimensions, FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { AutoImage, Button, Header, Text } from '../../../components';
import { Images } from '../../../../assets';
import { useNavigation } from '@react-navigation/native';
import { colors, fontSize, margin, scaleHeight, scaleWidth } from '../../../theme';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Modal from 'react-native-modal'
import ProductAttribute from '../../product/component/productAttribute';
import FastImage from 'react-native-fast-image';

export const SelectVariant: FC = observer(
    function SelectVariant() {
        const navigation = useNavigation()
        const [modalImages, setModalImages] = useState(false);
        const [activeSlide, setActiveSlide] = useState(0);
        const refCarousel = useRef(null);

        const arrImagesProduct = ["https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg",
            "https://baothainguyen.vn/file/oldimage/baothainguyen/UserFiles/image/d1(21).jpg",
            "https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg",
            "https://baothainguyen.vn/file/oldimage/baothainguyen/UserFiles/image/d1(21).jpg",
            "https://baothainguyen.vn/file/oldimage/baothainguyen/UserFiles/image/d1(21).jpg",
        ]

        const dataFlatlist = [
            {
                name: 'gachj 123-132-asd',
                images: "https://baothainguyen.vn/file/oldimage/baothainguyen/UserFiles/image/d1(21).jpg",
                amount: 0,
                price: '20000',
                id: '1',
            },
            {
                name: 'gachj 123-132-asd',
                images: "https://baothainguyen.vn/file/oldimage/baothainguyen/UserFiles/image/d1(21).jpg",
                amount: 0,
                price: '20000',
                id: '2',
            },
            {
                name: 'gachj 123-132-asd',
                images: "https://baothainguyen.vn/file/oldimage/baothainguyen/UserFiles/image/d1(21).jpg",
                amount: 0,
                price: '20000',
                id: '3',
            },
            {
                name: 'gachj 123-132-asd',
                images: "https://baothainguyen.vn/file/oldimage/baothainguyen/UserFiles/image/d1(21).jpg",
                amount: 0,
                price: '20000',
                id: '4',
            },
        ]

        return (
            <View style={{ backgroundColor: colors.palette.white, flex: 1 }}>
                <Header
                    LeftIcon={Images.back}
                    onLeftPress={() => navigation.goBack()}
                    style={{ height: scaleHeight(54) }}
                />
                <View style={{ flex: 1, marginHorizontal: scaleWidth(16), marginVertical: scaleHeight(20), justifyContent: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text tx={'detailScreen.information'} style={{
                            flex: 1, fontWeight: '700', fontSize: fontSize.size12,
                            lineHeight: scaleHeight(14.52), color: colors.nero
                        }} />
                        <TouchableOpacity >
                            <Text tx={'order.seeDetail'} style={{
                                fontWeight: '400', fontSize: fontSize.size12,
                                lineHeight: scaleHeight(14.52), color: colors.navyBlue
                            }} />
                        </TouchableOpacity>
                    </View>
                    {arrImagesProduct?.length !== 0 ? (
                        <ScrollView
                            style={{
                                marginVertical: scaleHeight(margin.margin_12),
                                // marginHorizontal: scaleWidth(margin.margin_16),
                                maxHeight: scaleHeight(70)
                            }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={true}>
                            {arrImagesProduct?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setModalImages(true);
                                            setActiveSlide(index);
                                        }}>
                                        <AutoImage
                                            style={{
                                                width: scaleWidth(70),
                                                height: scaleHeight(70),
                                                borderRadius: 10,
                                                marginRight: 12,
                                            }}
                                            source={{
                                                uri: item,
                                            }}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    ) : (
                        <View
                            style={{
                                marginVertical: scaleHeight(margin.margin_12),
                                marginHorizontal: scaleWidth(margin.margin_16),
                            }}>
                            <AutoImage
                                style={{
                                    width: scaleWidth(70),
                                    height: scaleHeight(70),
                                    borderRadius: 10,
                                    marginRight: 12,
                                }}
                                source={require("../../../../assets/Images/no_images.png")}
                            />
                        </View>
                    )}
                    <ProductAttribute label='Mã sản phẩm' value={'max casd'} />
                    <ProductAttribute label='Tên sản phẩm' value={'max casd'} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: scaleHeight(12) }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text text={'4'} style={{ lineHeight: scaleHeight(14.52), fontWeight: '400', fontSize: fontSize.size12, color: colors.nero }} />
                            <Text text=' phân loại sản phẩm' style={{ lineHeight: scaleHeight(14.52), fontWeight: '400', fontSize: fontSize.size12, color: colors.nero }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text text='Đã chọn ' style={{ lineHeight: scaleHeight(14.52), fontWeight: '400', fontSize: fontSize.size12, color: colors.nero }} />
                            <Text text={'2'} style={{ lineHeight: scaleHeight(14.52), fontWeight: '400', fontSize: fontSize.size12, color: colors.nero }} />
                        </View>
                    </View>
                    <FlatList
                        data={dataFlatlist}
                        keyExtractor={item => item.id}
                        renderItem={(item) => {
                            return (
                                <View style={{
                                    alignItems: 'center',
                                    backgroundColor: colors.palette.aliceBlue, paddingHorizontal: scaleWidth(6),
                                    flexDirection: 'row', paddingVertical: scaleHeight(10), borderRadius: 8, marginBottom: scaleHeight(15)
                                }}>
                                    <AutoImage
                                        source={{ uri: item.item.images }}
                                        style={{ marginRight: scaleWidth(6), width: scaleWidth(50), height: scaleHeight(50) }}
                                    />
                                    <View style={{ width: '100%' }}>
                                        <Text text='teen san pham'
                                            style={{
                                                fontWeight: '500', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                                color: colors.nero
                                            }} />
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: scaleHeight(3) }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '40%' }}>
                                                <Text style={{
                                                    fontWeight: '400', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                                    color: colors.nero
                                                }} tx={'order.price2'} />
                                                <Text style={{
                                                    fontWeight: '400', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                                    color: colors.palette.radicalRed, fontStyle: 'italic'
                                                }} text='20000' />
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                                                <Text style={{
                                                    fontWeight: '400', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                                    color: colors.nero
                                                }} tx={'order.miniumQuanlity'} />
                                                <Text style={{
                                                    fontWeight: '400', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                                    color: colors.palette.radicalRed, fontStyle: 'italic'
                                                }} text='20' />
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{
                                                fontWeight: '400', fontSize: fontSize.size10, lineHeight: scaleHeight(12.1),
                                                color: colors.nero, marginRight: scaleWidth(6)
                                            }} tx={'order.quanlity'} />
                                            <View style={{
                                                // marginLeft: scaleWidth(margin.margin_12),
                                                marginTop: scaleHeight(2),
                                                flexDirection: 'row',
                                                backgroundColor: colors.palette.white,
                                                alignItems: "center",
                                                paddingVertical: scaleHeight(3),
                                                borderRadius: 8,
                                                width: '25%'
                                            }}>
                                                <TouchableOpacity onPress={() => handleMinus(item)}
                                                    style={{ width: '25%', alignItems: 'center' }}
                                                >
                                                    <Images.icon_minus />
                                                </TouchableOpacity>
                                                <Text style={{
                                                    width: '50%',
                                                    textAlign: 'center',
                                                }} >0</Text>
                                                <TouchableOpacity onPress={() => handlePlus(item)}
                                                    style={{ width: '25%', alignItems: 'center' }}
                                                >
                                                    <Images.icon_plusGreen />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ marginHorizontal: scaleWidth(6),flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{fontWeight: '400', fontSize: fontSize.size10, lineHeight: scaleHeight(12.1),
                                                color: colors.nero
                                            }} text={'hop'} />
                                            <Images.icon_caretRightDown/>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
                <TouchableOpacity style={{
                    flexDirection: 'row', alignItems: 'center', height: scaleHeight(48),
                    backgroundColor: colors.palette.navyBlue, marginHorizontal: scaleWidth(16), marginBottom: scaleHeight(20),
                    borderRadius: 8, justifyContent: 'center'
                }}>
                    <Images.ic_ShoopingCar />
                    <Text tx={'order.addToCart'} style={{
                        marginLeft: scaleWidth(12), fontWeight: '600', fontSize: fontSize.size14,
                        lineHeight: scaleHeight(24), color: colors.palette.white
                    }} />
                </TouchableOpacity>
                <Modal
                    isVisible={modalImages}
                    onBackdropPress={() => setModalImages(false)}>
                    <View>
                        {arrImagesProduct && arrImagesProduct?.length > 0 ? (
                            <View>
                                <Carousel
                                    data={arrImagesProduct}
                                    autoplay={false}
                                    ref={refCarousel}
                                    loop
                                    renderItem={({ item, index }) => (
                                        <View>
                                            <Image
                                                source={{
                                                    uri: item,
                                                }}
                                                defaultSource={Images.imageError}
                                                resizeMode="cover"
                                                style={{
                                                    height: scaleHeight(416),
                                                    width: scaleWidth(294),
                                                    borderRadius: 16,
                                                    alignSelf: "center",
                                                }}></Image>
                                        </View>
                                    )}
                                    sliderWidth={Dimensions.get("window").width - 32}
                                    itemWidth={Dimensions.get("window").width - 32}
                                    firstItem={activeSlide}
                                    onSnapToItem={(index) => setActiveSlide(index)}
                                    lockScrollWhileSnapping={true}
                                    enableMomentum={false}
                                    decelerationRate={0.5}
                                />
                                <Pagination
                                    dotsLength={
                                        arrImagesProduct?.length > 0 && arrImagesProduct?.length
                                    }
                                    activeDotIndex={activeSlide}
                                    dotStyle={{
                                        borderRadius: 8,
                                        height: scaleHeight(14),
                                        width: scaleWidth(14),
                                        borderColor: colors.palette.neutral100,
                                        borderWidth: 2,
                                    }}
                                    dotColor={"#BBB9B9"}
                                    inactiveDotColor={"#BBB9B9"}
                                    inactiveDotOpacity={1}
                                    inactiveDotScale={1}
                                    inactiveDotStyle={{
                                        width: scaleWidth(8),
                                        height: scaleHeight(8),
                                        borderRadius: 5,
                                        borderColor: "#BBB9B9",
                                        borderWidth: 2,
                                    }}
                                />
                            </View>
                        ) : null}
                    </View>
                </Modal>
            </View>
        )
    })