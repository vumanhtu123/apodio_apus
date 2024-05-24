import {  palette } from './../../theme/colors';
import { Platform, StyleSheet } from "react-native"
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme"

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: colors.background,
    flex: 1,
    // borderWidth:10,
    // borderColor:'blue',
    // justifyContent:"space-between",
    alignItems:'center'
    
  },

  btnNext: {
    borderRadius: 8,
    marginBottom: scaleHeight(30),
    marginHorizontal: scaleWidth(18),
  },
  dotStyle: {
    color : palette.navyBlue ,
    borderRadius: 5,
    height: scaleHeight(11),
    width: scaleWidth(10),
  },

  inactiveDot: {
    width: scaleWidth(10),
    height: scaleHeight(11),
    borderRadius: 5,
    borderWidth:1,
    borderColor: colors.palette.navyBlue
  },
  imageCarousel: { borderRadius: 10, flex: 1 , width:'100%',borderWidth:1},
  textContent: {
    color: colors.palette.dolphin,
    fontSize: fontSize.size14,
    fontWeight: "400",
    lineHeight: 24,
    paddingTop: scaleHeight(8),
    textAlign: "center",
    
  },
  textNext: {
    fontSize: fontSize.size14,
    fontWeight: "700",
    lineHeight: 24,
    paddingVertical: 5,
    textAlign: "center",
  },
  textSkip: {
    // backgroundColor:'yellow',
    color: colors.palette.neutral900,
    fontSize: fontSize.size14,
    fontWeight: "400",
    lineHeight: 24,
    marginTop:20,
  },
  textTitle: {
    color: colors.palette.nero,
    fontSize: fontSize.size18,
    fontWeight: "600",
    lineHeight: 32,
    textAlign: "center",
    
  },
  viewDot: {
    alignSelf: "center",
    height: scaleHeight(80),
    marginBottom: scaleHeight(30),
    width: scaleWidth(50),
  },
  viewItemCarousel: {
    borderRadius: 10,
    marginTop : scaleHeight(150),
    height: scaleHeight(560),
    paddingHorizontal: scaleWidth(27),
    width: "100%",
  },
})
