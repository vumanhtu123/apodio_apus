import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { margin, scaleHeight, scaleWidth } from '../../../../../theme';
import { AutoImage } from '../../../../../components';
import { styles } from '../styles';

const ProductImageGallery = ({ arrImagesProduct, setModalImages, setActiveSlide }: any) => {
    if (arrImagesProduct?.length === 0) {
        return (
            <View style={{
                marginVertical: scaleHeight(margin.margin_12),
                marginHorizontal: scaleWidth(margin.margin_16),
            }}>
                <AutoImage
                    style={styles.viewImage}
                    source={require("../../../../../../assets/Images/no_images.png")}
                />
            </View>
        );
    }
    return (
        <ScrollView
            style={{
                marginVertical: scaleHeight(margin.margin_12),
                marginHorizontal: scaleWidth(margin.margin_16),
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {arrImagesProduct?.map((item: any, index: any) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        setModalImages(true);
                        setActiveSlide(index);
                    }}
                >
                    <AutoImage
                        style={styles.viewImage}
                        source={{ uri: item }}
                    />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};
export default React.memo(ProductImageGallery);