import React, { StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "../text/text";
import { colors, fontSize, scaleHeight, scaleWidth } from "../theme";

interface GroupButtonBottom {

}

export const groupButtonBottom = (props: GroupButtonBottom) => {

    return (
        <View style={styles.viewGroupBtn}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={styles.viewBtnCancel}
            >
                <Text tx={"common.cancel"} style={styles.textBtnCancel} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={methods.handleSubmit(submitAdd)}
                style={styles.viewBtnConfirm}
            >
                <Text
                    tx={"createProductScreen.done"}
                    style={styles.textBtnConfirm}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    viewGroupBtn: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        paddingVertical: scaleHeight(20),
    },
    viewBtnCancel: {
        width: scaleWidth(157),
        height: scaleHeight(48),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.palette.veryLightGrey,
    },
    viewBtnConfirm: {
        width: scaleWidth(157),
        height: scaleHeight(48),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: colors.palette.navyBlue,
    },
    textBtnConfirm: {
        fontSize: fontSize.size14,
        color: colors.palette.neutral100,
        lineHeight: scaleHeight(24),
        fontWeight: "600",
    },
    textBtnCancel: {
        fontSize: fontSize.size14,
        color: colors.palette.dolphin,
        lineHeight: scaleHeight(24),
        fontWeight: "600",
    },
})