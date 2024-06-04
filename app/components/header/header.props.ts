import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { IconTypes } from '../icon/icons';
import { TxKeyPath } from '../../i18n';

export interface HeaderProps {
  /**
   * Main header, e.g. POWERED BY IGNITE
   */
  headerTx?: TxKeyPath;
  rightTx?: TxKeyPath
  rightTx1?: TxKeyPath
  leftText?: TxKeyPath
  TitleIcon?: TxKeyPath
  TitleIcon1?: TxKeyPath
  TitleIcon2?: TxKeyPath
  textBelowIconRightSearch?: any
  textBelowIconRight?: any
  /**
   * header non-i18n
   */
  headerText?: string;
  rightText?: string;
  rightText1?: string;

  /**
   * Icon that should appear on the left
   */
  LeftIcon?: any;

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void;

  /**
   * Icon that should appear on the right
   */
  RightIcon?: any;
  RightIcon1?: any;
  RightIcon2?: any;
  RightIconTextInput?: any;
  RightIconTextInputCenter?: any;
  RightIconAndTextBelow?: any;
  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void;
  onRightPress1?(): void;
  onRightPress2?(): void;
  onRightTextPress?(): void;
  onLeftPTextress?(): void;
  onRightIconTextInput?(): void;
  onRightIconTextInputCenter?(): void;
  onLeftTextPress?(): void;
  onRightIconAndTextBelow?(): void;

  /**
   * Container style overrides.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Title style overrides.
   */
  btnLeftStyle?: StyleProp<ViewStyle>
  btnRightStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  // type?: "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Fontisto" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "CustomIcon" | "MaterialIcons"
  titleMiddleStyle?: StyleProp<ViewStyle>
  widthRightIcon?: number;
  heightRightIcon?: number;
  widthLeftIcon?: number;
  heightLeftIcon?: number;
  headerInput?: any;
  searchValue?: string;
  headerInputCenter?: any;
  onSearchValueChange?: any
  handleOnSubmitSearch?: any
  type?:
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'CustomIcon'
  | 'MaterialIcons';
  colorIcon?: string;
}
