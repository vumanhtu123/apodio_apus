import { TextStyle, ViewStyle } from "react-native";
import { TxKeyPath } from "../../i18n";

export interface InputSelectProps {
  titleText?: string;
  titleTx?: TxKeyPath;
  headerTxModal?: TxKeyPath | undefined;
  hintText?: string;
  hintTx?: TxKeyPath;
  required?: boolean;
  styleView?: ViewStyle;
  isShowCheckBox?: boolean,
  checkUse?: boolean;
  onPressNotUse?(): void;
  arrData: {}[];
  onPressChoice({ }): void;
  dataDefault?: string;
  multiple?: any;
  disabled?: boolean;
  isSearch?: boolean;
  onLoadMore?: any;
  onSearch?: any;
  handleOnSubmitSearch?: any;
  onChangeText?: any;
  textStyle?: TextStyle;
  styleViewDropdown?: ViewStyle;
  size?: any
  onRefresh?: any
  isRefreshing?: any
  setIsRefreshing?: any
  normalInputSelect?: any
}
