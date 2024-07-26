import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { colors, margin, scaleHeight, scaleWidth } from "../../../../theme";
import { Text } from "../../../../components";
import { styles } from "../styles";

const ProductClassificationDetail = ({ arrClassification, changeClassification, setChangeClassification, setDetailsClassification }: any) => {
    return (
        <>
            {arrClassification ? (
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginHorizontal: scaleWidth(margin.margin_16),
                        }}>
                        <Text
                            text={arrClassification?.length.toString()}
                            style={[
                                styles.textDolphin12,
                                {
                                    marginRight: scaleWidth(margin.margin_4),
                                    lineHeight: scaleHeight(14.52),
                                    color: colors.palette.neutral900,
                                },
                            ]}
                        />
                        <Text
                            tx={"productScreen.productClassification"}
                            style={[
                                styles.textDolphin12,
                                {
                                    lineHeight: scaleHeight(14.52),
                                    color: colors.palette.neutral900,
                                },
                            ]}
                        />
                    </View>
                    <ScrollView
                        style={{
                            marginVertical: scaleHeight(margin.margin_12),
                            marginHorizontal: scaleWidth(margin.margin_16),
                        }}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {arrClassification?.map((item: any, index: any) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.viewNameClassification,
                                        {
                                            borderColor:
                                                item.id === changeClassification
                                                    ? colors.palette.navyBlue
                                                    : colors.palette.aliceBlue,
                                        },
                                    ]}
                                    onPress={() => {
                                        setChangeClassification(item.id);
                                        setDetailsClassification(item);
                                        console.log("first", item);
                                        // setShowDetails(false);
                                    }}>
                                    <Text
                                        text={item.name}
                                        style={styles.textNameClassification}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            ) : null}
        </>
    )
}
export default React.memo(ProductClassificationDetail)