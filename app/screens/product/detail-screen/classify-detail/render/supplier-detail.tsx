import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { styles } from "../styles";
import { colors, margin, padding, scaleHeight, scaleWidth } from "../../../../../theme";
import { Text } from "../../../../../components";
import { Images } from "../../../../../../assets";

interface SupplierListProps {
    arrNCC: any[];
}

const SupplierList: React.FC<SupplierListProps> = ({ arrNCC }) => {
    const [showNCC, setShowNCC] = useState(false);
    return (
        <>
            {arrNCC?.length > 0 ? (
                <View>
                    <View style={styles.viewLine} />
                    <View
                        style={{
                            paddingVertical: scaleHeight(20),
                            paddingHorizontal: scaleWidth(16),
                        }}>
                        <Text tx={'detailScreen.supplier'} style={styles.textTitle} />
                        <View
                            style={{
                                flexDirection: "row",
                                marginBottom: showNCC ? scaleHeight(margin.margin_10) : 0,
                            }}>
                            <Text
                                style={[
                                    styles.textDolphin12,
                                    {
                                        flex: 1,
                                    },
                                ]}>
                                {arrNCC.length + " nhà cung cấp"}
                            </Text>

                            <TouchableOpacity onPress={() => {
                                setShowNCC(!showNCC)
                                console.log('ádsadwer', arrNCC)
                            }}>
                                {showNCC ? <Images.icon_caretUp /> : <Images.icon_caretRightDown />}
                            </TouchableOpacity>
                        </View>
                        {showNCC &&
                            arrNCC.map((item: any) => {
                                return (
                                    <View key={item.vendorCode}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                paddingVertical: scaleHeight(padding.padding_8),
                                            }}>
                                            <AutoHeightImage
                                                source={{ uri: item.avatarUrl }}
                                                width={scaleHeight(40)}
                                                height={scaleHeight(40)}
                                                style={{ borderRadius: 40 }}
                                                fallbackSource={Images.imageError}
                                            />
                                            <View
                                                style={{
                                                    marginLeft: scaleWidth(6),
                                                    justifyContent: "center",
                                                }}>
                                                <Text style={styles.textNameNCC}>
                                                    {item.vendorCode + "- " + item.vendorName}
                                                </Text>
                                                <Text style={styles.textNameClassification}>
                                                    {item.phoneNumber}
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                height: scaleHeight(1),
                                                backgroundColor: colors.palette.ghostWhite,
                                            }}
                                        />
                                    </View>
                                );
                            })}
                    </View>
                </View>
            ) : null}
        </>
    );
};

export default React.memo(SupplierList);
