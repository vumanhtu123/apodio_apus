import { Platform, StyleSheet } from "react-native";
import {
  colors,
  fontSize,
  palette,
  scaleHeight,
  scaleWidth,
} from "../../../theme";

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: colors.text,
    flex: 1,
    flexDirection: "column",
  },
  btnBottom: {
    borderRadius: 8,
    marginTop: scaleHeight(10),
    paddingHorizontal: scaleWidth(16),
    height: scaleHeight(48),
    backgroundColor: colors.palette.navyBlue,
  },
  btnBottomEmpty: {
    borderRadius: 8,
    marginTop: scaleHeight(10),
    paddingHorizontal: scaleWidth(16),
    height: scaleHeight(48),
    backgroundColor: colors.palette.navyBlue,
    opacity: 0.5,
  },
  btnForgotPassword: {
    backgroundColor: colors.transparent,
    borderRadius: 8,
    paddingHorizontal: scaleWidth(16),
    paddingVertical: -10,
  },
  textButton: {
    color: colors.palette.neutral100,
    fontSize: fontSize.size14,
    fontWeight: "700",
    lineHeight: 24,
    textAlign: "center",
  },
  textFlag: {
    color: colors.text,
    fontWeight: "500",
    lineHeight: 24,
    paddingTop: scaleHeight(5),
    textAlign: "center",
  },

  textForgot: {
    color: "#3F91FF",
    fontSize: fontSize.size14,
    fontWeight: "700",
    lineHeight: 24,
    textAlign: "center",
  },
  viewForgot: {
    alignItems: "center",
    justifyContent: "center",
  },
  viewFlag: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: scaleHeight(10),
  },
  viewForm: {
    backgroundColor: palette.neutral100,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 0.2,
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(27),
  },
  viewImage: {
    alignItems: "center",
    flex: 0.8,
    justifyContent: "center",
  },
  viewLanguage: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    // position: 'absolute',
    marginTop: Platform.OS === "ios" ? scaleHeight(66) : scaleHeight(44),
    marginBottom: 100,
  },
  textError: {
    fontWeight: "400",
    fontSize: 12,
    color: "red",
  },
  viewBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.15,
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
