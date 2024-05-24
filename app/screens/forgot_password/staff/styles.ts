import { Platform, StyleSheet } from "react-native";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: "white",
    flex: 1,
  },
  body: {
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleWidth(10),
  },
  btnBottom: {
    bottom: scaleHeight(40),
    left: scaleWidth(16),
    position: "absolute",
    right: scaleWidth(16),
    borderRadius: 8,
    borderWidth: 0,
    width: scaleWidth(343),
    height: scaleHeight(48),
  },
  textButton: {
    color: colors.textWhite,
    fontSize: fontSize.size14,
    fontWeight: "700",
    lineHeight: 24,
    paddingLeft: scaleWidth(15),
    textAlign: "center",
  },
  lableSelectText: {
    fontWeight: "500",
    lineHeight: 24,
    fontSize: fontSize.size12,
  },
  selectText: {
    fontWeight: "500",
    // lineHeight: 24,
    fontSize: fontSize.size16,
    paddingBottom: scaleWidth(5),
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleHeight(14),
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(1),
    height: 56,
    borderRadius: 8,
  },
  inputPass:
    Platform.OS === "ios"
      ? {
          fontSize: 24,
        }
      : {
          fontSize: 24,
        },
});
