import {TextStyle} from 'react-native';
import {colors} from '../theme';

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  color: colors.text,
  fontSize: 15,
  fontFamily: 'Inter-Medium',
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: {...BASE, fontWeight: 'bold'} as TextStyle,

  /**
   * Large headers.
   */
  header: {...BASE, fontSize: 24, fontWeight: 'bold'} as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: {...BASE, fontSize: 13, color: colors.border} as TextStyle,

  /**
   * A smaller piece of secondary information.
   */
  secondary: {...BASE, fontSize: 9, color: colors.border} as TextStyle,
};

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets;
