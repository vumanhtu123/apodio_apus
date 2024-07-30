import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../../../theme';
import { Text } from '../../../../../../components';
import { Images } from '../../../../../../../assets';
import { commasToDots } from '../../../../../utils/validate';

const ProductWeightDetails = ({ dataClassification, detailProduct }: any) => {
    const [showOrHiddenWeight, setShowOrHiddenWeight] = useState(false);

    return (
        <>
            {dataClassification?.baseProductPackingLine?.volume || dataClassification?.productPackingLines?.length > 0 ? (
                <View>
                    <View style={styles.viewLine} />
                    <TouchableOpacity
                        style={[styles.viewWeight, { flex: 1, padding: scaleWidth(16) }]}
                        onPress={() => setShowOrHiddenWeight(!showOrHiddenWeight)}
                    >
                        <Text tx="productScreen.weight"
                            style={{ fontSize: fontSize.size12, color: colors.navyBlue, marginRight: scaleWidth(5) }}
                        />
                        <Images.icon_caretDownBlue
                            width={scaleWidth(16)}
                            height={scaleHeight(16)}
                            style={{ transform: [{ rotate: showOrHiddenWeight ? '180deg' : '0deg' }] }} />
                    </TouchableOpacity>
                </View>
            ) : null}
            {
                showOrHiddenWeight ?
                    <View style={{ paddingHorizontal: scaleWidth(16), flex: 1 }}>
                        <Text tx="productScreen.weightOriginal" style={{ fontSize: fontSize.size14 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: scaleHeight(9) }}>
                            <Text style={[styles.fontSizeWeight, { flex: 2 }]}>
                                {dataClassification.uom == null ? detailProduct?.uomGroupLineOutput?.unitName : dataClassification?.uom?.name}
                            </Text>
                            <View style={{ flex: 3, marginHorizontal: scaleWidth(25), flexDirection: 'row' }}>
                                <Text tx={`detailScreen.weight`} style={[styles.fontSizeWeight]} />
                                <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{detailProduct?.weight} kg</Text>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'row' }}>
                                <Text tx="detailScreen.volume" style={[styles.fontSizeWeight]} />
                                <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{detailProduct?.volume} m3</Text>
                            </View>
                        </View>
                        {dataClassification.productPackingLines.length > 0 ? (
                            <View>
                                <Text tx="productScreen.weightExchange" style={{ fontSize: fontSize.size14 }} />
                                <FlatList
                                    data={dataClassification.productPackingLines}
                                    renderItem={({ item }) => (
                                        <View style={{ flexDirection: 'row', marginBottom: scaleHeight(12), justifyContent: 'space-between' }}>
                                            <View style={{ flex: 2 }}>
                                                <Text style={[styles.fontSizeWeight]}>
                                                    {item.uomGroupLineOutput?.unitName}
                                                </Text>
                                                <View style={{ backgroundColor: '#E7EFFF', height: 1 }} />
                                                <Text style={[styles.fontSizeWeight]}>
                                                    {`${commasToDots(item.amount)} ${dataClassification.uom == null ? detailProduct?.uomGroupLineOutput?.unitName : dataClassification?.uom?.name}`}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 3, marginHorizontal: scaleWidth(25), flexDirection: 'row', alignItems: 'center' }}>
                                                <Text tx="detailScreen.weight" style={[styles.fontSizeWeight]} />
                                                <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{item?.weight} kg</Text>
                                            </View>
                                            <View style={{ flex: 3, alignItems: 'center', flexDirection: 'row' }}>
                                                <Text tx="detailScreen.volume" style={[styles.fontSizeWeight]} />
                                                <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{item?.volume} m3</Text>
                                            </View>
                                        </View>
                                    )}
                                    keyExtractor={(item) => item.id.toString()}
                                    style={{ marginTop: scaleHeight(12) }}
                                />
                            </View>
                        ) : null}
                    </View>
                    : null
            }
        </>
    );
};

export default React.memo(ProductWeightDetails);
