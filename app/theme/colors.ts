// TODO: write documentation for colors and palette in own markdown file and add links from here

export const palette = {
  neutral100: '#FFFFFF',
  neutral200: '#F4F2F1',
  neutral300: '#D7CEC9',
  neutral400: '#B6ACA6',
  neutral500: '#978F8A',
  neutral600: '#564E4A',
  neutral700: '#3C3836',
  neutral800: '#191015',
  neutral900: '#000000',

  primary100: '#F4E0D9',
  primary200: '#E8C1B4',
  primary300: '#DDA28E',
  primary400: '#D28468',
  primary500: '#C76542',
  primary600: '#A54F31',

  secondary100: '#DCDDE9',
  secondary200: '#BCC0D6',
  secondary300: '#9196B9',
  secondary400: '#626894',
  secondary500: '#41476E',

  accent100: '#FFEED4',
  accent200: '#FFE1B2',
  accent300: '#FDD495',
  accent400: '#FBC878',
  accent500: '#FFBB50',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)',

  normalNavigator: '#B6B6B6',
  black: '#1d1d1d',
  white: '#ffffff',
  offWhite: '#e6e6e6',
  orange: '#FBA928',
  orangeDarker: '#EB9918',
  // lightGrey: "#939AA4",
  lighterGrey: '#CDD4DA',
  angry: '#dd3333',
  deepPurple: '#5D2555',
  yellow: '#F4AD22',
  yellowOpacity: '#FFFAF0',
  gray: '#F2F2F2',
  dimGray: '#545456',
  // COLOR HOMESCREEN
  heatWave: '#FF7A00',
  metallicBlue: '#2D4982',
  verdigris: '#37BCAC',
  royalOrange: '#FE9545',

  dolphin: '#747475',
  nero: '#242424',
  textskip: '#242426',
  malibu: '#53A0F5',
  aliceBlue: '#F6F7F9',
  echoBlue: '#A1AEDB',
  lightGrey: '#858992',
  colorDrawer1: '#F6F7F9',
  colorIconInactive: '#D9D9D9',
  redOrange: '#FF3B30',
  jaguar: '#242426',
  radicalRed: '#FF4956',
  solitude: '#EAF1FF',
  ghostWhite: '#F6F7FB',
  ghostWhite2: '#F3F4F9',
  floralWhite: '#FFF9EC',
  amour: '#FFEFF0',
  malachite: '#00CC6A',
  torchRed: '#EE0033',
  veryLightGrey: '#C8C8C8',
  navyBlue: '#0078D4',
  whiteSmoke: '#F4F4F4',
  aliceBlue2: '#EFF8FF',
  mintCream: '#ECFFF6',
  darkTangerine: '#F89E19',
  dodgerBlue: '#007AFF',
  blueExDG: '#EAF1FF',
  yallowExDG: '#FFF9EC',
  redExDG: '#FFEFF0',
  textExDoing: '#2D4982',
  textExDone:'#F4AD22',
  textExCancle: '#FF4956',
  greenTea: '#DAFBDF',
  
} as const;

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  textWhite: palette.white,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral100,
  /**
   * The default border color.
   */
  border: palette.neutral500,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
  primary: palette.orange,
  storybookTextColor: palette.black,
  yellow: palette.yellow,
  yellowOpacity: palette.yellowOpacity,
  gray: palette.gray,
  dimGray: palette.dimGray,
  // COLOR HOMESCREEN
  heatWave: palette.heatWave,
  metallicBlue: palette.metallicBlue,
  verdigris: palette.verdigris,
  royalOrange: palette.royalOrange,
};
