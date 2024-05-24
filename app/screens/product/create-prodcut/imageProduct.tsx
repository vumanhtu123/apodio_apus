import React, { Dimensions, FlatList, Image, TouchableOpacity, View } from "react-native"
import { scaleHeight, scaleWidth } from "../../../theme"
import { showToast } from "../../../utils/toast"
import { Images } from "../../../../assets"
import { styles } from "./styles"
import { AutoImage, Text } from "../../../components"
import Modal from "react-native-modal/dist/modal";
import Carousel, { Pagination } from "react-native-snap-carousel"
import { useRef, useState } from "react"
import { useStores } from "../../../models"

interface ImageProduct {
    arrData: any
    useCamera: () => void
    useLibrary: () => void
    deleteImage: (index: any, item: any) => void
}

export default function ImageProduct(props: ImageProduct) {
    const { arrData, useCamera, useLibrary, deleteImage } = props

    const [modalImages, setModalImages] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const refCarousel = useRef(null);

    const { productStore } = useStores()

    return (
        <View>
            {arrData?.length > 0 ? (
                <View
                    style={{ flexDirection: "row", marginBottom: scaleHeight(20) }}>
                    <View
                        style={{
                            flexDirection: "column",
                            marginRight: scaleHeight(11),
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (arrData.length < 6) {
                                    // handleLibraryUse()
                                    useLibrary()
                                    productStore.setImagesLimit(arrData.length)
                                } else {
                                    showToast('txtToats.required_maximum_number_of_photos', 'error')
                                }
                            }}
                            style={styles.btnLibrary}>
                            <Images.ic_addImages
                                width={scaleWidth(16)}
                                height={scaleHeight(16)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (arrData.length < 6) {
                                    // handleCameraUse() 
                                    useCamera()
                                } else {
                                    showToast('txtToats.required_maximum_number_of_photos', 'error')
                                }
                            }}
                            style={styles.btnCamera}>
                            <Images.ic_camera
                                width={scaleWidth(16)}
                                height={scaleHeight(16)}
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={arrData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setModalImages(true);
                                    setActiveSlide(index);
                                }}>
                                <AutoImage
                                    style={{
                                        width: scaleWidth(107),
                                        height: scaleHeight(70),
                                        borderRadius: 8,
                                    }}
                                    source={{ uri: item }}
                                />
                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        right: scaleWidth(5),
                                        top: scaleHeight(5),
                                    }}
                                    onPress={() => deleteImage(index, item)}>
                                    <Images.circle_close
                                        width={scaleWidth(16)}
                                        height={scaleHeight(16)}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                            <View style={{ width: scaleWidth(11) }} />
                        )}
                    />
                </View>
            ) : (
                <>
                    <View style={{ flexDirection: "row", marginBottom: scaleHeight(20) }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (arrData.length < 6) {
                                    // handleLibraryUse()
                                    useLibrary()
                                    productStore.setImagesLimit(arrData.length)
                                } else {
                                    showToast('txtToats.required_maximum_number_of_photos', 'error')
                                }
                            }}
                            style={styles.viewBtnCamera}>
                            <View style={styles.btnCamera2}>
                                <Images.ic_addImages
                                    width={scaleWidth(16)}
                                    height={scaleHeight(16)}
                                />
                                <Text style={styles.textBtnCamera}>
                                    Tải ảnh lên
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (arrData.length < 6) {
                                    // handleCameraUse() 
                                    useCamera()
                                } else {
                                    showToast('txtToats.required_maximum_number_of_photos', 'error')
                                }
                            }}
                            style={styles.viewBtnLibrary}>
                            <View style={styles.btnCamera2}>
                                <Images.ic_camera
                                    width={scaleWidth(16)}
                                    height={scaleHeight(16)}
                                />
                                <Text style={styles.textBtnCamera}>
                                    Chụp ảnh
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            <Modal
                isVisible={modalImages}
                onBackdropPress={() => setModalImages(false)}>
                <View>
                    {arrData && arrData?.length > 0 ? (
                        <View>
                            <Carousel
                                data={arrData}
                                autoplay={false}
                                ref={refCarousel}
                                loop
                                renderItem={({ item, index }: any) => (
                                    <View>
                                        <Image
                                            source={{
                                                uri: item.uri,
                                            }}
                                            defaultSource={Images.imageError}
                                            resizeMode="cover"
                                            style={styles.viewItemCarousel}></Image>
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
                                    arrData.length > 0 && arrData.length
                                }
                                activeDotIndex={activeSlide}
                                dotStyle={styles.paginationDotStyle}
                                dotColor={"#BBB9B9"}
                                inactiveDotColor={"#BBB9B9"}
                                inactiveDotOpacity={1}
                                inactiveDotScale={1}
                                inactiveDotStyle={styles.paginationInactiveDotStyle}
                            />
                        </View>
                    ) : null}
                </View>
            </Modal>
        </View>
    )
};