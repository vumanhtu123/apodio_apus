import { StyleSheet } from "react-native"
import { colors, fontSize, scaleHeight, scaleWidth, statusBarHeight } from "../../theme"

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: colors.text,
    flex: 1,
    marginHorizontal: scaleWidth(17),
  },
  btnBottom: {
    bottom: scaleHeight(40),
    left: 0,
    position: "absolute",
    right: 0,
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: scaleHeight(14),
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(12),
  },
  headerText: {
    color: colors.palette.accent400,
    fontSize: fontSize.size18,
    fontWeight: "700",
    lineHeight: 32,
    marginBottom:scaleHeight(24),
    textAlign: "center",
  },
  imageFlag: {
    height: scaleHeight(32),
    resizeMode: "contain",
    width: scaleWidth(32),
  },
  textButton: {
    color: colors.text,
    fontSize: fontSize.size14,
    fontWeight: "700",
    lineHeight: 24,
    paddingLeft: scaleWidth(15),
    textAlign: "center",
  },
})
