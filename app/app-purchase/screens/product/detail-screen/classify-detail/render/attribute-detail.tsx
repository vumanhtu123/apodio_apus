import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { Text } from '../../../../../../components';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../../../theme';
import ProductAttribute from '../../../component/productAttribute';
import { Images } from '../../../../../../../assets';

interface ProductAttributesProps {
    dataClassification: any;
    nameValue: any[];
    attributeDetailsClassification: any[];
    attributes: any[];
}

const ProductAttributes: React.FC<ProductAttributesProps> = ({
    // showDetails,
    dataClassification,
    nameValue,
    attributeDetailsClassification,
    attributes
}) => {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
        console.log('czxx', attributes)
    };
    // if (!showDetails) return null; // Early return if not visible

    return (
        <View>
            {(dataClassification?.productTemplate == null || attributes?.length !== 0) && (
                <View>
                    <View style={styles.viewLine} />
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center", marginVertical: scaleHeight(16), marginHorizontal: scaleWidth(margin.margin_16) }}
                        onPress={toggleDetails} 
                    >
                        <Text tx="detailScreen.detailProperty" style={{ color: colors.palette.navyBlue, marginRight: scaleWidth(5), fontSize: fontSize.size12 }} />
                        <Images.iconDownBlue
                            width={scaleWidth(16)}
                            height={scaleHeight(16)}
                            style={{ transform: [{ rotate: showDetails ? "180deg" : "0deg" }] }}
                        />
                    </TouchableOpacity>
                </View>
            )}
            {showDetails && (
                <View style={styles.viewDetails}>
                    <View style={styles.viewTitleDetail}>
                        <Text tx="createProductScreen.property" style={{ fontWeight: "600", fontSize: fontSize.size12 }} />
                        <Text tx="createProductScreen.value" style={{ fontWeight: "600", fontSize: fontSize.size12 }} />
                    </View>
                    <View style={styles.viewLine2} />

                    {dataClassification?.productTemplate == null ? (
                        <View>
                            {nameValue?.map((item, index) => (
                                <View key={index} style={{ marginTop: scaleHeight(margin.margin_12) }}>
                                    <ProductAttribute
                                        label={item.name}
                                        value={item.value}
                                        styleAttribute={{ paddingHorizontal: scaleWidth(padding.padding_12) }}
                                    />
                                    {index !== attributeDetailsClassification.length - 1 && <View style={styles.viewLine2} />}
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View>
                            {attributes?.map((item, index) => (
                                <View key={index}>
                                    <View style={{ marginVertical: scaleHeight(margin.margin_12), paddingHorizontal: scaleWidth(padding.padding_12) }}>
                                        <Text style={{ fontWeight: "600", fontSize: fontSize.size12, color: colors.palette.navyBlue }}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={styles.viewLine2} />

                                    {item.items?.map((dto: { id: React.Key | null | undefined; name: any; value: any[]; }) => (
                                        <View key={dto.id} style={{ marginTop: scaleHeight(margin.margin_12) }}>
                                            <ProductAttribute
                                                label={dto.name}
                                                value={dto.value.join('/')}
                                                styleAttribute={{ paddingHorizontal: scaleWidth(padding.padding_12) }}
                                            />
                                            {index !== attributes.length - 1 && <View style={styles.viewLine2} />}
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default React.memo(ProductAttributes);
