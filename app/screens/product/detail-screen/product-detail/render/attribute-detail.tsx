// ProductAttributeDetails.tsx
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../../../theme';
import { Text } from '../../../../../components';
import { translate } from '../../../../../i18n/translate';
import { Images } from '../../../../../../assets';
import ProductAttribute from '../../../component/productAttribute';

const ProductAttributeDetails = ({
    attributeDetailsClassification,
    attributes,
    showDetails,
    toggleDetails
}: any) => {
    return (
        <>
            {(attributeDetailsClassification?.length !== 0 || attributes?.length !== 0) && (
                <View>
                    <View style={styles.viewLine} />
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: scaleHeight(16),
                            marginHorizontal: scaleWidth(margin.margin_16),
                        }}
                        onPress={toggleDetails}>
                        <Text
                            style={{
                                color: colors.palette.navyBlue,
                                fontSize: fontSize.size12,
                            }}>
                            {translate("detailScreen.propertyDetails")}
                        </Text>
                        <Images.iconDownBlue
                            width={scaleWidth(16)}
                            height={scaleHeight(16)}
                            style={{
                                transform: [{ rotate: showDetails ? "180deg" : "0deg" }],
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )}
            {showDetails && (
                <View style={styles.viewDetails}>
                    <View style={styles.viewTitleDetail}>
                        <Text style={{ fontWeight: "600", fontSize: fontSize.size12 }}>
                            {translate("detailScreen.property")}
                        </Text>
                        <Text style={{ fontWeight: "600", fontSize: fontSize.size12 }}>
                            {translate("detailScreen.value")}
                        </Text>
                    </View>
                    <View style={styles.viewLine2} />
                    {attributeDetailsClassification.length !== 0 ? (
                        <View>
                            {attributeDetailsClassification?.map((item: any, index: any) => (
                                <View key={index}>
                                    <View
                                        style={{
                                            marginVertical: scaleHeight(margin.margin_12),
                                            paddingHorizontal: scaleWidth(padding.padding_12),
                                        }}>
                                        <Text
                                            style={{
                                                fontWeight: "600",
                                                fontSize: fontSize.size12,
                                                color: colors.palette.navyBlue,
                                            }}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={styles.viewLine2} />
                                    {item.items?.map((dto: { name: React.Key | null | undefined; value: any; }) => (
                                        <View
                                            key={dto.name}
                                            style={{
                                                marginTop: scaleHeight(margin.margin_12),
                                            }}>
                                            <ProductAttribute
                                                label={dto.name}
                                                value={dto.value}
                                                styleAttribute={{
                                                    paddingHorizontal: scaleWidth(padding.padding_12),
                                                }}
                                            />
                                            {index !== attributeDetailsClassification?.length - 1 && (
                                                <View style={styles.viewLine2} />
                                            )}
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View>
                            {attributes?.map((item: any, index: any) => (
                                <View key={index}>
                                    <View
                                        style={{
                                            marginVertical: scaleHeight(margin.margin_12),
                                            paddingHorizontal: scaleWidth(padding.padding_12),
                                        }}>
                                        <Text
                                            style={{
                                                fontWeight: "600",
                                                fontSize: fontSize.size12,
                                                color: colors.palette.navyBlue,
                                            }}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={styles.viewLine2} />
                                    {item.items?.map((dto: { name: React.Key | null | undefined; value: any[]; }) => (
                                        <View
                                            key={dto.name}
                                            style={{
                                                marginTop: scaleHeight(margin.margin_12),
                                            }}>
                                            <ProductAttribute
                                                label={dto.name}
                                                value={dto.value.join("/")}
                                                styleAttribute={{
                                                    paddingHorizontal: scaleWidth(padding.padding_12),
                                                }}
                                            />
                                            {index !== attributes?.length - 1 && (
                                                <View style={styles.viewLine2} />
                                            )}
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            )}
        </>
    );
};

export default React.memo(ProductAttributeDetails);