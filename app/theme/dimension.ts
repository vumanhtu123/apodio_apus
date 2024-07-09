import {Dimensions, Platform, StatusBar} from 'react-native';

export const configs = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
};

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scaleWidth = (size: number) => (width / guidelineBaseWidth) * size;
const scaleHeight = (size: number) => (height / guidelineBaseHeight) * size;
const scaleText = (size: number, factor = 0.5) => {
  return size + (scaleHeight(size) - size) * factor;
};

const statusBarHeight = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
  default: 0,
});

const fontSize = {
  size8: scaleHeight(8),
  size9: scaleHeight(9),
  size10: scaleHeight(10),
  size11: scaleHeight(11),
  size12: scaleHeight(12),
  size13: scaleHeight(13),
  size14: scaleHeight(14),
  size15: scaleHeight(15),
  size16: scaleHeight(16),
  size17: scaleHeight(17),
  size18: scaleHeight(18),
  size19: scaleHeight(19),
  size20: scaleHeight(20),
  size21: scaleText(21),
  size22: scaleText(22),
  size23: scaleText(23),
  size24: scaleText(24),
  size25: scaleText(25),
  size26: scaleText(26),
  size32: scaleText(32),
  size35: scaleText(35),
  
};

export {scaleWidth, scaleHeight, scaleText, fontSize, statusBarHeight};

export default configs;
