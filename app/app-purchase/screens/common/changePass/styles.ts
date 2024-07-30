import {
  colors,
  margin,
  scaleHeight,
  scaleWidth,
} from '../../../theme';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
  },
  viewLogo: {
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(margin.margin_20),
  },
  header: {
    height: scaleHeight(52),
  },
  textHeader: {
    color: colors.palette.neutral100,
    fontWeight: '700',
    fontSize: 16,
    alignItems: 'center',
    // fontFamily: typography.primary.bold,
  },
  textLabel: {
    height: 17,
    marginLeft: 0.5,
    fontWeight: '700',
    fontSize: 14,
    color: colors.palette.nero,
  },
  body: {
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleWidth(100),
    marginTop: scaleWidth(26),
  },
  btnBottom: {
    bottom: scaleHeight(40),
    left: scaleWidth(16),
    position: 'absolute',
    right: scaleWidth(16),
    borderRadius: 8,
    height: 48,
    backgroundColor: colors.palette.navyBlue,
  },
  textButton: {
    color: colors.palette.accent100,
    fontWeight: '600',
    fontSize: 14,
    alignItems: 'center',
  },
  inputTextHide:
    Platform.OS === 'ios'
      ? {
          color: colors.palette.lightGrey,
          fontSize: 24,
          letterSpacing: 7,
        }
      : {
          color: colors.palette.lightGrey,
          letterSpacing: 7,
          fontSize: 24,
          paddingTop: 10,
        },
  inputTextShow: {
    color: colors.palette.nero,
    fontSize: 16,
    fontWeight: '500',
  },
});
