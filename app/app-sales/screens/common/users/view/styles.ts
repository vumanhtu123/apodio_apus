import { pagination } from '../../introduction/introduction-screen';
import { colors } from '../../../../theme/colors';
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
import { Dimensions, StyleSheet } from "react-native"
import { fontSize, scaleHeight, scaleWidth } from "../../../../theme"

export const styles = StyleSheet.create({
  ROOT: {
    flex:1,
    alignItems:'center',
    
    
  },
  imgTopHeader: {
    width:"100%", 
    height: scaleHeight(178), 
    position:"absolute",
    
  },
  viewAvatar: {
    width:scaleWidth(64), 
    height:scaleWidth(64)
  },
  horView: {
    height: scaleHeight(140),
    backgroundColor: colors.white,
    // marginHorizontal: scaleWidth(16),
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingHorizontal: 33,
    paddingTop: scaleHeight(20),
    position:'absolute',
    marginTop:50,
    marginBottom:300,
    width:scaleWidth(343),
    // marginHorizontal:20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1, // Đối với Android
    // marginLeft:15,
    // marginRight:15
    
  },
  horViewMenu:{
    alignItems: 'center',
    justifyContent: 'center',
    width:100,
  },
  horTextMenu:{
    fontSize: fontSize.size12,
    color: colors.oxfordBlue,
    fontWeight: '500',
    alignSelf:"center",
    textAlign:"center",
    marginTop: scaleHeight(9)
  },
  logoutButton:{
    backgroundColor: colors.palette.navyBlue,
    height: scaleHeight(48),
    // width:'100%',

    borderRadius: 8,
    marginHorizontal:16
  },
  logoutText:{
    fontSize: 14,
    color: colors.palette.neutral100
  },
  btnBottom: {
    borderRadius: 8,
    bottom: 0,
    marginHorizontal: scaleWidth(16),
    marginTop: scaleHeight(13),
    position: "relative",
    right: 0,
    top: Dimensions.get("window").width,
  },
  btnRow: {
    alignItems: "center",
    backgroundColor: colors.text,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(27),
    paddingVertical: scaleHeight(16),
  },
  btnSelectImage: {
    alignItems: "flex-start",
    backgroundColor: colors.text,
    paddingVertical: scaleHeight(15),
    width: "100%",
  },
  btn_info: {
    backgroundColor: colors.text,
    borderRadius: 16,
    marginHorizontal: scaleWidth(12),
    marginTop: scaleHeight(19),
  },

  textButton: {
    color: colors.text,
    fontSize: fontSize.size14,
    fontWeight: "700",
    lineHeight: 24,
    paddingLeft: scaleWidth(15),
    paddingVertical: scaleHeight(5),
    textAlign: "center",
  },
  textMethod: {
    color: colors.palette.neutral900,
    fontSize: fontSize.size14,
    fontWeight: "700",
    lineHeight: 24,
    textAlign: "left",
  },
  textRow: {
    color: colors.palette.accent300,
    flex: 1,
    fontSize: fontSize.size14,
    fontWeight: "500",
    lineHeight: 24,
    marginLeft: scaleWidth(20),
  },
  textSelectImage: {
    color: colors.dimGray,
    fontSize: fontSize.size14,
    fontWeight: "500",
  },
  titleMethod: {
    color: colors.palette.accent300,
    fontSize: fontSize.size12,
    fontWeight: "500",
    lineHeight: 14,
    textAlign: "center",
  },
  viewIcon: {
    alignItems: "center",
    backgroundColor: colors.gray,
    borderRadius: 100,
    height: scaleHeight(57),
    justifyContent: "center",
    marginBottom: scaleHeight(9),
    width: scaleWidth(57),
  },
  viewID: {
    alignContent: "center",
    backgroundColor: colors.dodgerBlue2,
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(5),
  },
  viewInfo: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginBottom: scaleHeight(15),
    paddingHorizontal: scaleWidth(16),
  },

  viewItemMethod: { alignItems: "center", justifyContent: "center", width: scaleWidth(60) },

  viewLine: {
    alignSelf: "flex-end",
    backgroundColor: colors.gray,
    flex: 1,
    height: 1,
    width: "85%",
  },
  viewLineModal: {
    alignSelf: "center",
    backgroundColor: colors.veryLightGrey1,
    borderRadius: 5,
    height: 5,
    marginBottom:scaleHeight(25),
    marginTop:scaleHeight(8),
    width: 68
  },
  viewMethod: {
    backgroundColor: colors.text,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scaleWidth(12),
    paddingBottom: scaleHeight(39),
    paddingHorizontal: scaleWidth(33),
    paddingTop: scaleHeight(20),
  },
  viewModal: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    // paddingBottom:scaleHeight(26),
    paddingHorizontal:scaleHeight(14),
    width: "100%",
   
  },
 
  body: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: scaleHeight(65),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 1,
  
  },
  divider: {
    backgroundColor: colors.gray,
    height: 1,
    marginLeft: 31,
    marginRight: 15,
    marginTop: 16,
  },
  merchantInfo: {
    flex:1,
    flexDirection:"column",
    marginHorizontal:scaleWidth(9)
  },
  item: {
    alignItems:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
   
  },
  leftContent: {
    flexDirection: 'row',
  },
  main: {
    flex: 1,
  },
  // merchantInfor: {
  //   backgroundColor: 'white',
  //   borderRadius: 18,
  //   marginBottom: 25,
  //   marginHorizontal: 16,
  //   marginTop: 20,
  //   paddingBottom: 10,
  // },
  text: {
    color: colors.nightRider1,
    fontSize: 16,
    paddingLeft: 24,
    paddingTop: 9,
  },
  line: {
    backgroundColor: colors.solitude2,
    height: 1,
    marginTop: 9,
  },
  accountHeader: {
    flexDirection:"row", 
    flexWrap:"wrap",
    marginHorizontal:scaleWidth(17),
    marginTop:scaleHeight(14)
  },
  avatar: {
    borderRadius: scaleWidth(32),
    height:scaleWidth(64),
    resizeMode:"cover",
    width:scaleWidth(64),
  },
  boxUser: {
    left: 90,
    position: 'absolute',
    top: 58,
  },
  iconCam: {
    left:scaleWidth(32),
    position: 'absolute',
    top:scaleWidth(42),
    zIndex: 1,
  },
  user: {
    alignItems:"center",
    backgroundColor: colors.dodgerBlue2,
    borderRadius: 3,
    height: 16,
    justifyContent: 'center',
    marginTop:scaleHeight(2),
    width: 65
  },
  textUser: {
    color: 'white',
    fontSize: fontSize.size12,
  },
  textName: {
    color: 'white',
    fontSize: fontSize.size16,
    fontWeight: '700',
    lineHeight: 24,
  },
  textPhone: {
    color: 'white',
    fontSize: fontSize.size14,
    lineHeight: 24,
  },
  boxId: {
    alignSelf:"center",
    backgroundColor: colors.dodgerBlue2,
    borderRadius: 5,
    height: 26,
    justifyContent: 'center',
    width: 71,
  },
  textId: {
    alignSelf: 'center',
    color: 'white',
  },
  iconBody: {
    alignSelf: 'center',
  },
  textBody: {
    alignSelf: 'center',
    color: colors.nightRider1,
    fontSize: fontSize.size14,
    fontWeight: '500',
    marginLeft: 10,
  },
  version: {
    alignSelf: 'center',
    color:colors.aluminium,
    marginVertical: 20,
    marginBottom:36
  },
  logOut: {
    // borderWidth:1,
    // width:'100%',
    //  backgroundColor:'red',
    // position:"absolute", 
    bottom:scaleHeight(10),
    // left:scaleHeight(18),
    // right:scaleHeight(18),
  },
})
