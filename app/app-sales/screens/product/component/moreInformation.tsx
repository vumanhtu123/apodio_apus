import React, { StyleSheet, TouchableOpacity, View } from "react-native"
import DescribeModal from "./modal-describe";
import { Text } from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

interface MoreInformation {
    addDescribe: boolean
    setAddVariant: (value: boolean)=> void
    addVariant: boolean
    setAddWeight: (value: boolean)=> void
    addWeight: boolean
    onChangeDescription: (data: string) => void
    onChangeIsVisible: (data: boolean) => void
}

export const MoreInformation = (props: MoreInformation) => {
    const [addDescribe, setAddDescribe] = useState(props.addDescribe)
    const [modalDescribe, setModalDescribe] = useState(false);
    const [description, setDescription] = useState('');

    const handleDescribe = () => {
        setAddDescribe(true);
        props.onChangeIsVisible(true)
      };
      const handleCloseDescribe = () => {
        setAddDescribe(false);
        props.onChangeIsVisible(false)
      };

    return (
        <View>
            {addDescribe ? (
                <View
                    style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}
                >
                    <View style={styles.viewViewDetail}>
                        <View>
                            <View
                                style={{ flexDirection: "row", alignContent: "center" }}
                            >
                                <Text
                                    tx={"createProductScreen.description"}
                                    style={styles.textTitleView}
                                />
                                {description ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalDescribe(true);
                                        }}
                                    >
                                        <Svgs.icon_edit
                                            style={{ marginLeft: scaleWidth(8) }}
                                            width={scaleWidth(14)}
                                            height={scaleHeight(14)}
                                        />
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                            <TouchableOpacity
                                onPress={handleCloseDescribe}
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    flexDirection: "row",
                                }}
                            >
                                <Svgs.ic_close
                                    width={scaleWidth(14)}
                                    height={scaleHeight(14)}
                                />
                            </TouchableOpacity>
                        </View>
                        {description === "" ? (
                            <View style={{}}>
                                <TouchableOpacity
                                    style={{ flexDirection: "row", alignItems: "center" }}
                                    onPress={() => setModalDescribe(true)}
                                >
                                    <Svgs.ic_plusCircleBlue
                                        width={scaleWidth(14)}
                                        height={scaleHeight(14)}
                                    />
                                    <Text
                                        tx={"createProductScreen.addDescription"}
                                        style={styles.textWeight400Blue}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Text text={description} />
                        )}
                    </View>
                </View>
            ) : null}
            <View
                style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}
            >
                <View style={styles.viewViewDetail}>
                    <Text
                        tx="createProductScreen.information"
                        style={styles.textTitleView}
                    />
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Svgs.icon_gear
                                width={scaleWidth(20)}
                                height={scaleHeight(20)}
                            />
                            {addDescribe === false ? (
                                <TouchableOpacity
                                    onPress={handleDescribe}
                                    style={styles.viewBtnInMorInfo}
                                >
                                    <Text
                                        tx={"createProductScreen.description"}
                                        style={styles.textBtnMorInfo}
                                    />
                                </TouchableOpacity>
                            ) : null}
                            {props.addVariant === false ? (
                                <TouchableOpacity
                                    onPress={() => props.setAddVariant(true)}
                                    style={styles.viewBtnInMorInfo}
                                >
                                    <Text
                                        tx={"createProductScreen.productClassification"}
                                        style={styles.textBtnMorInfo}
                                    />
                                </TouchableOpacity>
                            ) : null}
                            {props.addWeight === false ? (
                                <TouchableOpacity
                                    onPress={() => props.setAddWeight(true)}
                                    style={styles.viewBtnInMorInfo}
                                >
                                    <Text
                                        tx={"createProductScreen.weight"}
                                        style={styles.textBtnMorInfo}
                                    />
                                </TouchableOpacity>
                            ) : null}
                            {addDescribe === true &&
                                props.addVariant === true &&
                                props.addWeight === true ? (
                                <Text
                                    tx={"createProductScreen.notificationAddAllInfoProduct"}
                                    style={[
                                        styles.textWeight400Dolphin,
                                        { marginLeft: scaleWidth(8) },
                                    ]}
                                />
                            ) : null}
                        </View>
                    </View>
                </View>
            </View>
            <DescribeModal
                titleTx={"productScreen.describe"}
                isVisible={modalDescribe}
                dataDescribe={description}
                setIsVisible={() => setModalDescribe(false)}
                onCancel={() => setModalDescribe(false)}
                onConfirm={(data) => {
                    setDescription(data.Describe);
                    props.onChangeDescription(data.Describe)
                    setModalDescribe(false);
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewViewDetail: {
        marginHorizontal: scaleWidth(16),
        marginVertical: scaleHeight(20),
    },
    viewBtnInMorInfo: {
        borderWidth: 1,
        alignItems: "center",
        paddingVertical: scaleHeight(6),
        paddingHorizontal: scaleWidth(8),
        borderColor: colors.navyBlue,
        borderRadius: 4,
        marginLeft: scaleWidth(8),
    },
    textTitleView: {
        fontSize: fontSize.size14,
        fontWeight: "700",
        marginBottom: scaleHeight(15),
    },
    textWeight400Blue: {
        fontSize: fontSize.size12,
        fontWeight: "400",
        color: colors.navyBlue,
        marginLeft: scaleWidth(4),
    },
    textWeight400Dolphin: {
        fontSize: fontSize.size13,
        fontWeight: "400",
        color: colors.palette.dolphin,
    },
    textBtnMorInfo: {
        color: colors.palette.navyBlue,
        fontSize: fontSize.size10,
        fontWeight: "400",
        lineHeight: scaleHeight(12.1),
    },
})