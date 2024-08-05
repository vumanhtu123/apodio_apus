import * as React from "react"
import { ActivityIndicator, TextStyle, View, ViewStyle , Modal, StyleSheet} from "react-native"
import { colors } from "../../app-purchase/theme"
import { Text } from ".."
// import Modal from "react-native-modal"

const CONTAINER: ViewStyle = {
  // justifyContent: "center",
  backgroundColor: colors.gray,
  opacity: 0.5,
  flex: 1,
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10

}

const TEXT: TextStyle = {
  fontSize: 14,
  color: colors.primary
}

export interface LoadingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export default class LoadingT extends React.Component {
  state = {
    isVisible: false
  }

  showLoading() {
    this.setState({ isVisible: true })
  }

  hideLoading() {
    this.setState({ isVisible: false })
  }

  render() {
    return this.state.isVisible ? (
      <View style={CONTAINER}>
        <ActivityIndicator size={"large"} color={colors.yellow} />
        <Text onPress={()=>this.hideLoading()} text="C"/>
      </View>
    ) : null

  }
}

const modalStyle = StyleSheet.create({
  modal: {
    borderRadius: 5,
    marginLeft: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    marginRight: 20,
    backgroundColor: colors.white,
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
    backgroundColor: colors.red,
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
    color: colors.nightRider,
    fontWeight: 'bold',
    lineHeight: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.nightRider,
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
    borderColor: colors.ivory,
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
