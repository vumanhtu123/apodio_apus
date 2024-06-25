import { StyleSheet } from "react-native";
import { colors, fontSize, margin, scaleHeight, scaleWidth } from "../../../theme";

export const styles = StyleSheet.create({
  ROOT: { backgroundColor: colors.palette.neutral100, flex: 1 },
  header: {
    height: scaleHeight(52),
  },
  textHeader: {
    color: colors.palette.neutral100,
    fontWeight: "700",
    fontSize: fontSize.size16,
    // alignSelf: "flex-start",
  },
  container: {
    // marginHorizontal: scaleWidth(16),
    flex : 1
  },
  infoContainer: {
    marginLeft: scaleWidth(10),
    width: scaleWidth(253)
  },
  companyName: {
    fontSize: fontSize.size12,
    fontWeight: 'bold',
    marginRight : scaleWidth(2)
    // textAlign: 'center',
  },
  textInfo: {
    color: '#242424',
    fontSize: fontSize.size12,
    // textDecorationLine: 'underline',
    // textAlign: 'center',/
  },
  viewLine: {
    height: 1,
    backgroundColor: colors.palette.dolphin,
    // borderWidth: 0.8,
    // borderColor :colors.palette.dolphin,
    // marginHorizontal: scaleWidth(margin.margin_16),
    marginVertical: scaleHeight(20)
  },
  invoiceName: {
    color: '#242424',
    fontSize: fontSize.size14,
    fontWeight: '600',
    textAlign: 'center',
  },
  invoiceTime: {
    color: '#242424',
    fontSize: fontSize.size12,
    textAlign: 'center',
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(20)
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#f6f7fb',

  },
  cell: {
    // flex: 1,
    // backgroundColor : 'red',
    marginRight: scaleWidth(12),
    width: scaleWidth(90)
  },
  cellUnitPrice: {
    fontSize : fontSize.size12,
    marginRight: scaleWidth(12),
    width: scaleWidth(72)

  },
  cellAmount: {
    fontSize : fontSize.size12,
    flex: 1,
    marginRight: scaleWidth(12),
    width: scaleWidth(52)
  },
  cellMoney: {
    fontSize : fontSize.size12,
    flex: 1,
    width: scaleWidth(72),
    fontWeight: '600'
  },
  sanPhamText: {
    fontSize: fontSize.size12
  },
  sizeText: {
    fontSize: fontSize.size12
  },
  headerRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#f6f7fb',
    // padding: 10,
  },
  cellProductHeader: {
    fontSize: fontSize.size12,
    fontWeight: '600',
    marginRight: scaleWidth(12),
    width: scaleWidth(90)
  },
  cellUnitPriceHeader: {
    fontSize: fontSize.size12,
    fontWeight: '600',
    marginRight: scaleWidth(12),
    width: scaleWidth(72)
  },
  cellAmountHeader: {
    fontSize: fontSize.size12,
    fontWeight: '600',
    flex: 1,
    marginRight: scaleWidth(12),
    width: scaleWidth(52)
  },
  cellMoneyHeader: {
    fontSize: fontSize.size12,
    flex: 1,
    width: scaleWidth(72),
    fontWeight: '600'
  },
  rowPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: { fontSize: fontSize.size10 },
  value: { fontSize: fontSize.size10, fontWeight: 'bold' },
  highlight: { color: 'red' },
  viewButton: {
    backgroundColor: colors.navyBlue,
    borderRadius: 8,
    height: scaleHeight(48),
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(12),
    marginTop : scaleHeight(28)
  },
  textButton: {
    fontWeight: "600",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
    color: colors.textWhite,
  },
})
