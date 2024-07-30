import {size} from 'lodash';
import {Platform, StyleSheet} from 'react-native';
import {
  colors,
  fontSize,
  palette,
  scaleHeight,
  scaleWidth,
} from '../../../theme';

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: '#f6f7f9',
    flex: 1,
  },
  body: {
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleWidth(20),
  },
  btnBottom: {
    // bottom: scaleHeight(40),
    // left: scaleWidth(16),
    // // position: "absolute",
    // right: scaleWidth(16),
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
    fontWeight: 'bold',
    lineHeight: 25,
    fontSize: fontSize.size16,
    // flexWrap: 'wrap',
  },
  selectText: {
    fontWeight: '500',
    // lineHeight: 24,
    fontSize: fontSize.size14,
    paddingBottom: scaleWidth(10),
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(2),
    paddingHorizontal: scaleWidth(18),
    paddingVertical: scaleHeight(16),
    // height: 56,
    // marginTop: scaleHeight(20),
    borderRadius: 8,
  },
});
