import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text as TextRN,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Text} from '../text/text';
import {Button} from '../button/button';
import {SvgIcon} from '../svg-icon';
import {colors, scaleHeight, scaleWidth} from '../theme';
const {width, height} = Dimensions.get('screen');

interface DialogSuccessUnSuccessProps {
  onPress: () => void;
  content: string;
  textButton: string;
  title: string;
  imgPath: any;
}

const DialogSuccessUnSuccess = (props: DialogSuccessUnSuccessProps) => {
  const {onPress, content, textButton, title, imgPath} = props;
  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <View style={styles.modalView}>
          <TextRN style={styles.modalText} />
          <Image
            source={imgPath}
            style={{
              width: 98,
              height: 98,
              alignSelf: 'center',
              marginTop: 37,
              marginBottom: 24,
            }}
          />
          {title && <Text style={styles.text} text={title} />}
          <Text style={styles.text2} text={content} />
          <View style={styles.buttonLogin}>
            <Button
              style={{height: 46, backgroundColor: colors.palette.navyBlue}}
              onPress={onPress}
              text={textButton}
              textStyle={{
                fontSize: 14,
                color: 'white',
                fontWeight: '700',
                textAlign: 'center',
                borderRadius: 8,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DialogSuccessUnSuccess;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: width,
    height: height,
    flex: 1,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  centeredView: {
    width: width - 32,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  modalView: {
    width: width - 32,
    // height: 319,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  button: {
    marginHorizontal: 14,
    marginBottom: 23,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.yellow,
  },
  textButton: {
    fontSize: 14,
    color: 'white',
    paddingVertical: 12,
    alignSelf: 'center',
  },
  buttonClose: {
    backgroundColor: colors.dodgerBlue1,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 10,
    textAlign: 'center',
    width: 68,
    height: 5,
    backgroundColor: colors.veryLightGrey1,
    borderRadius: 8,
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 37,
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    color: colors.nightRider1,
    fontWeight: '700',
    marginBottom: 10,
  },
  text2: {
    textAlign: 'center',
    color: colors.aluminium,
    marginTop: 3,
    marginHorizontal: 16,
  },
  buttonLogin: {
    marginTop: 25,
    marginHorizontal: 14,
    marginBottom: 15,
    // backgroundColor : colors.white,
  },
});
