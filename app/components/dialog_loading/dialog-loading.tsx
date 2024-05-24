import React from 'react';
import {
  ActivityIndicator,
  Modal,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

interface DialogLoadingProps {
  visible: boolean;
}

export function DialogLoading(props: DialogLoadingProps) {
  const {visible} = props;
  return (
    <Modal onRequestClose={() => {}} transparent={true} visible={visible}>
      <View style={modalStyle.container}>
        <StatusBar
          animated={true}
          backgroundColor="rgba(0,0,0,0.5)"
          barStyle={'dark-content'}
          translucent={true}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </View>
    </Modal>
  );
}

const modalStyle = StyleSheet.create({
  modal: {
    borderRadius: 5,
    marginLeft: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    marginRight: 20,
    backgroundColor: '#fff',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#f00',
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    //fontFamily: fonts.notoSansJPBlack,
    color: '#333333',
    fontWeight: 'bold',
    lineHeight: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333333',
    marginLeft: 10,
    marginRight: 10,
    //fontFamily: fonts.notoSansJPRegular,
    // fontFamily: GLOBAL_STYLE.fontFamily,
    // lineHeight: Device.isAndroid ? 25: 20,
  },
  button: {
    marginTop: 30,
  },
  cancleButton: {
    width: '100%',
    marginRight: 10,
  },
  containerCancleButton: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButton: {
    width: '100%',
    height: 50,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#F8F8F7',
    flexDirection: 'row',
  },
  containerButtonOk: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okText: {
    // color: '#0198C9',
    color: 'black',
    //fontFamily: fonts.notoSansJPBlack,
    // fontFamily: GLOBAL_STYLE.fontFamilyBold
  },
});
