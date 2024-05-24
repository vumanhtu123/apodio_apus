import { StyleSheet } from "react-native";
import { colors, fontSize, scaleHeight } from "../../theme";

export const styles = StyleSheet.create({
    textHeader: { 
        alignItems: 'center',
        alignSelf: 'flex-start',
        fontWeight: '700',
        fontSize: fontSize.size16,
        lineHeight: scaleHeight(24),
        color: colors.palette.neutral100
    },
})