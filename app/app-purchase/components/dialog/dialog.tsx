import * as React from 'react';
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { Button } from '../button/button';
import { Text } from '../text/text';
import Modal from 'react-native-modal';
import { colors } from '../../theme/colors';
// import { icError, icSuccess, icWarning } from "../../theme/"
import { LinearGradient } from 'react-native-svg';
import { fontSize, scaleHeight, scaleWidth } from '../../theme';
import { TxKeyPath } from '../../i18n';

const MODAL: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  // paddingBottom: 83,
};

const CONTAINER: ViewStyle = {
  backgroundColor: 'white',
  width: '100%',
  borderRadius: 8,
  alignItems: 'center',
  paddingHorizontal: scaleWidth(15),
  paddingVertical: scaleHeight(15)
};


const TEXTBUTTON: TextStyle = {
  paddingVertical: scaleHeight(14),
  fontSize: fontSize.size14,
  fontWeight: '500',
  color: 'white',
  textAlign: 'center',
  borderRadius: 8,
};
const BUTTON: ViewStyle = { flex: 1, };

const VIEWBUTTON: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  paddingTop: scaleHeight(15),
};
const TITLE: TextStyle = { color: 'black', fontWeight: '700', fontSize: fontSize.size18 };
const CONTENT: TextStyle = {
  color: colors.nero,
  fontWeight: '500',
  fontSize: fontSize.size14,
  paddingTop: scaleHeight(15),
  paddingHorizontal: scaleWidth(13),
  textAlign: 'center',
};

interface DialogProps {
  isVisible: boolean;
  title: TxKeyPath | {};
  content?: TxKeyPath | {};
  icon?: string | null;
  type?: 'success' | 'warning' | 'error' | null;
  imageSource?: any;
  titleBTN1?: TxKeyPath | {};
  titleBTN2?: TxKeyPath | {};
  onPressAccept?: () => void;
  onPressCancel?: () => void;
  styleBTN1?: ViewStyle
  styleBTN2?: ViewStyle
  errorMessage?: string;
}

const Dialog: React.FC<DialogProps> = ({
  isVisible,
  title,
  content,
  icon,
  type,
  imageSource,
  titleBTN1,
  titleBTN2,
  onPressAccept,
  onPressCancel,
  styleBTN1,
  styleBTN2,
  errorMessage

}) => {
  const hideDialog = () => {
    if (onPressCancel) {
      onPressCancel();
    }
  };

  const onPressBTN = () => {
    if (onPressAccept) {
      onPressAccept();
    }
  };

  return (
    <Modal
      statusBarTranslucent
      backdropOpacity={0.5}
      animationIn="zoomIn"
      animationOut="fadeOut"
      style={MODAL}
      isVisible={isVisible}
    >
      <View style={CONTAINER}>
        {/* {/ <View style={VIEWLINE} /> /}
        {/ <Image source={imageSource} style={styles.image} /> /} */}
        <Text tx={title} style={TITLE} />
        {content && (
          <Text tx={content} style={CONTENT} />
        )}
        {errorMessage && (
          <Text style={CONTENT}>{errorMessage}</Text>
        )}
        <View style={VIEWBUTTON}>
          {titleBTN1 && (
            <Button

              style={[BUTTON, styleBTN1]}
              textStyle={[TEXTBUTTON, { color: colors.palette.secondary500 }]}
              onPress={hideDialog}
              tx={titleBTN1}
            />
          )}
          {titleBTN1 && <View style={{ width: scaleWidth(9) }} />}
          {titleBTN2 && (
            <Button
              onPress={onPressBTN}
              textStyle={TEXTBUTTON}
              style={[BUTTON, styleBTN2]}
              tx={titleBTN2}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;