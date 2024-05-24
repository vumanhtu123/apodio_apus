import {Platform, StyleSheet} from 'react-native';
import {colors, fontSize, palette, scaleHeight, scaleWidth} from '../../theme';

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  body: {
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleWidth(10),
  },
  btnBottom: {
    borderRadius: 8,
    marginHorizontal: scaleWidth(16),
    marginBottom: Platform.OS == 'ios' ? scaleHeight(45) : scaleHeight(40),
    backgroundColor: 'white',
    borderWidth: 0,
  },
  textButton: {
    color: palette.white,
    fontSize: fontSize.size14,
    fontWeight: '700',
    lineHeight: 24,
    // paddingLeft: scaleWidth(15),
    textAlign: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  lableSelectText: {
    fontWeight: '400',
    lineHeight: 24,
    fontSize: fontSize.size14,
    color : 'black'
  },
  selectText: {
    fontWeight: '400',
    // lineHeight: 24,
    fontSize: fontSize.size12,
    // paddingBottom: scaleWidth(10),
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(1.5),  
    paddingHorizontal: scaleWidth(16),
    // marginBottom: scaleHeight(20),
    // paddingHorizontal: scaleWidth(18),
    paddingVertical: scaleHeight(16),
    // height: 56,
    borderRadius: 8,
    width : scaleWidth(343),
    height : scaleHeight(82),
  },
});
