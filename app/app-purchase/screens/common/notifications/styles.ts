import {StyleSheet} from 'react-native';
import {colors, fontSize, scaleHeight, scaleWidth} from '../../../theme';

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: colors.gray,
    flex: 1,
  },
  body: {
    marginBottom: scaleWidth(100),
    marginHorizontal: scaleWidth(16),
    marginTop: scaleWidth(26),
  },
  btnBottom: {
    borderRadius: 8,
    bottom: scaleHeight(40),
    left: scaleWidth(16),
    position: 'absolute',
    right: scaleWidth(16),
  },
  button: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    marginBottom: scaleHeight(14),
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(1),
  },
  lableSelectText: {
    fontSize: fontSize.size12,
    fontWeight: '500',
    lineHeight: 24,
  },
  rowNotiType: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 48,
    paddingLeft: 16,
  },
  selectText: {
    fontWeight: '500',
    // lineHeight: 24,
    fontSize: fontSize.size16,
    paddingBottom: scaleWidth(5),
  },
  textButton: {
    color: colors.text,
    fontSize: fontSize.size14,
    fontWeight: '700',
    lineHeight: 24,
    paddingLeft: scaleWidth(15),
    textAlign: 'center',
  },
});

export const stylesItem = StyleSheet.create({
  content: {
    color: colors.dolphin,
    fontSize: fontSize.size12,
    lineHeight: 22,
    marginHorizontal: 16,
    marginTop: 10,
    paddingBottom: 7,
    textAlign: 'left',
  },
  contentView: {
    backgroundColor: colors.gray,
    height: 1,
    marginTop: 12,
  },
  dot: {
    backgroundColor: colors.yellow,
    borderRadius: 30,
    height: 8,
    position: 'absolute',
    right: 17,
    top: 17,
    width: 8,
  },
  icon: {
    borderRadius: 16,
    height: 49,
    marginTop: 8,
    width: 49,
  },
  item: {
    backgroundColor: colors.white,
    borderBottomColor: colors.quartz,
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 14,
  },
  title: {
    color: colors.jaguar,
    fontSize: fontSize.size14,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'left',
  },
  titleView: {
    alignContent: 'flex-start',
    flex: 1,
    marginLeft: 17,
    marginVertical: 3,
  },
});
