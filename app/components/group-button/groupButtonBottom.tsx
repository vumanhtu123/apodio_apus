import React, { StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../text/text";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../app-purchase/theme";

interface GroupButtonBottom {
    onPressCancel: (data?: any) => void
    onPressConfirm: (data?: any) => void
    txCancel: any
    txConfirm: any
    isModal: boolean
}

const ViewGroupBtn: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: scaleHeight(20),
}

const ViewBtnCancel: ViewStyle = {
    // width: scaleWidth(157),
    width: '48%',
    height: scaleHeight(48),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.palette.veryLightGrey,
}

const ViewBtnConfirm: ViewStyle = {
    // width: scaleWidth(157),
    width: '48%',
    height: scaleHeight(48),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.palette.navyBlue,
}

const TextBtnCancel: TextStyle = {
    fontSize: fontSize.size14,
    color: colors.palette.dolphin,
    lineHeight: scaleHeight(24),
    fontWeight: "600",
}

const TextBtnConfirm: TextStyle = {
    fontSize: fontSize.size14,
    color: colors.palette.neutral100,
    lineHeight: scaleHeight(24),
    fontWeight: "600",
}

export const GroupButtonBottom = (props: GroupButtonBottom) => {
    return (
        <View style={[ViewGroupBtn, {paddingHorizontal: props.isModal ? 0 : scaleWidth(16)}]}>
            <TouchableOpacity
                onPress={props.onPressCancel}
                style={ViewBtnCancel}
            >
                <Text tx={props.txCancel} style={TextBtnCancel} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={props.onPressConfirm}
                style={ViewBtnConfirm}
            >
                <Text
                    tx={props.txConfirm}
                    style={TextBtnConfirm}
                />
            </TouchableOpacity>
        </View>
    )
}