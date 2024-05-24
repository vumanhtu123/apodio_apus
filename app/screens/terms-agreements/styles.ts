import {StyleSheet} from 'react-native';
import {colors, fontSize, scaleHeight, scaleWidth} from '../../theme';

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
  },
  btnStart: {
    backgroundColor: '#0078D4',
    borderRadius: 8,
    marginHorizontal: scaleWidth(18),
    marginVertical: scaleHeight(14),
    paddingVertical: scaleHeight(12),
  },
  btnStartActive: {
    backgroundColor: colors.palette.accent400,
    borderRadius: 8,
    marginHorizontal: scaleWidth(18),
    marginVertical: scaleHeight(14),
    paddingVertical: scaleHeight(12),
  },
  content: {
    color: colors.palette.accent400,
    fontSize: fontSize.size16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'justify',
  },
  sectionEnd: {
    color: colors.palette.accent400,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: scaleHeight(100),
    marginTop: scaleHeight(12),
  },
  textStart: {
    fontSize: fontSize.size14,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
    color: 'white',
  },
  tittle: {
    color: colors.palette.neutral800,
    fontSize: fontSize.size16,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'justify',
  },
});
