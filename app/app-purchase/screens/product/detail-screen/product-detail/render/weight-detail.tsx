// ProductWeightDetails.tsx
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../../../theme';
import { Text } from '../../../../../../components';
import { styles } from '../styles';
import { Svgs } from '../../../../../../../assets/svgs';
import { commasToDots } from '../../../../../utils/validate';

const ProductWeightDetails = ({
    // getVolume,
    dataClassification,
    detailProduct,
    arrClassification,
    detailsClassification,
}: any) => {
    const [showOrHiddenWeight, setShowOrHiddenWeight] = useState<boolean>(false);
    function getUnitName(uomGroupLineId: any) {
        const matchingLine = dataClassification?.uomGroup?.uomGroupLines.find((line: { id: any; }) => line.id === uomGroupLineId);
        return matchingLine ? matchingLine.unitName : null;
    }
    const getVolume = () => {
        if (arrClassification && detailsClassification.baseProductPackingLine?.volume) {
            return detailsClassification.baseProductPackingLine?.volume;
        } else {
            return dataClassification?.baseTemplatePackingLine?.volume;
        }
    };
    return (
        getVolume() ? (
            <View>
                <View>
                    <View style={styles.viewLine} />
                    <TouchableOpacity
                        style={[
                            styles.viewWeight,
                            { flex: 1, padding: scaleWidth(16) },
                        ]}
                        onPress={() => setShowOrHiddenWeight(!showOrHiddenWeight)}>
                        <Text
                            tx="productScreen.weight"
                            style={{
                                fontSize: fontSize.size12,
                                color: colors.navyBlue,
                                marginRight: scaleWidth(5),
                            }}
                        />
                        <Svgs.icon_caretDownBlue
                            width={scaleWidth(16)}
                            height={scaleHeight(16)}
                            style={{
                                transform: [
                                    { rotate: showOrHiddenWeight ? "180deg" : "0deg" },
                                ],
                            }}
                        />
                    </TouchableOpacity>
                </View>
                {
                    showOrHiddenWeight ?
                        <View style={{ paddingHorizontal: scaleWidth(16), flex: 1 }}>

                            <Text tx="productScreen.weightOriginal" style={{ fontSize: fontSize.size14, fontWeight: 'bold' }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: scaleHeight(9) }}>
                                <Text style={[styles.fontSizeWeight, { flex: 2 }]}>
                                    {dataClassification.uomId == null ? detailProduct?.uomGroupLineOutput?.unitName : dataClassification?.uom?.name}
                                </Text>
                                <View style={{ flex: 3, marginHorizontal: scaleWidth(25), flexDirection: 'row' }}>
                                    <Text tx={`detailScreen.weight`} style={[styles.fontSizeWeight]} />
                                    <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{arrClassification ? detailsClassification.baseProductPackingLine?.weight : detailProduct?.weight} kg</Text>
                                </View>
                                <View style={{ flex: 3, flexDirection: 'row' }}>
                                    <Text tx="detailScreen.volume" style={[styles.fontSizeWeight]} />
                                    <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{arrClassification ? detailsClassification.baseProductPackingLine?.volume : detailProduct?.volume} m3</Text>
                                </View>
                            </View>
                            {arrClassification && detailsClassification?.productPackingLines ? (
                                <View>
                                    <View>
                                        <Text tx="productScreen.weightExchange" style={{ fontSize: fontSize.size14, fontWeight: 'bold' }} />
                                        {detailsClassification.productPackingLines?.map((line: any, index: number) => (

                                            <View style={{ flexDirection: 'row', marginBottom: scaleHeight(12), justifyContent: 'space-between' }}>
                                                <View style={{ flex: 2 }}>
                                                    <Text style={[styles.fontSizeWeight, {}]}>
                                                        {getUnitName(line?.uomGroupLineId)}
                                                    </Text>
                                                    <View
                                                        style={{ backgroundColor: colors.solitude2, height: 1 }}
                                                    />
                                                    <Text style={[styles.fontSizeWeight, {}]}>
                                                        {`${commasToDots(line?.amount)} ${dataClassification.uomId == null ? detailProduct?.uomGroupLineOutput?.unitName : dataClassification?.uom?.name}`}
                                                    </Text>
                                                </View>
                                                {/* <View style={{}} key={index}> */}
                                                <View style={{ flex: 3, marginHorizontal: scaleWidth(25), flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text tx="detailScreen.weight" style={[styles.fontSizeWeight,]} />
                                                    <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{line.weight} kg</Text>
                                                </View>

                                                <View style={{ flex: 3, alignItems: 'center', flexDirection: 'row' }}>
                                                    <Text tx="detailScreen.volume" style={[styles.fontSizeWeight,]} />
                                                    <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{line.volume} m3</Text>
                                                </View>
                                                {/* </View> */}
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ) :
                                dataClassification?.templatePackingLines != null && arrClassification?.productPackingLines == null && arrClassification?.productPackingLines ? (
                                    <View>
                                        <View>
                                            <Text tx="productScreen.weightExchange" style={{ fontSize: fontSize.size14, fontWeight: 'bold' }} />
                                            <FlatList
                                                data={dataClassification.templatePackingLines}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <View style={{ flexDirection: 'row', marginBottom: scaleHeight(12), justifyContent: 'space-between' }}>
                                                            <View style={{ flex: 2 }}>
                                                                <Text style={[styles.fontSizeWeight, {}]}>
                                                                    {item.uomGroupLineOutput?.unitName}
                                                                </Text>
                                                                <View
                                                                    style={{ backgroundColor: colors.solitude2, height: 1 }}
                                                                />
                                                                <Text style={[styles.fontSizeWeight, {}]}>
                                                                    {`${commasToDots(item.amount)} ${detailProduct?.uomGroupLineOutput?.unitName}`}
                                                                </Text>
                                                            </View>
                                                            <View style={{ flex: 3, marginHorizontal: scaleWidth(25), flexDirection: 'row', alignItems: 'center' }}>
                                                                <Text tx="detailScreen.weight" style={[styles.fontSizeWeight,]} />
                                                                <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{item.weight} kg</Text>
                                                            </View>
                                                            <View style={{ flex: 3, alignItems: 'center', flexDirection: 'row' }}>
                                                                <Text tx="detailScreen.volume" style={[styles.fontSizeWeight,]} />
                                                                <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{item.volume} m3</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                }}
                                                keyExtractor={(item) => item.id.toString()}
                                                style={{ marginTop: scaleHeight(12) }}
                                            />
                                        </View>
                                    </View>
                                ) : null}
                        </View>
                        : null
                }
            </View>
        ) : null
    );
};

export default React.memo(ProductWeightDetails)