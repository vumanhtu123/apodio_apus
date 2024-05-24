import * as React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Text } from ".."
import Modal from "react-native-modal"
import { colors, palette } from "../../theme"
import { icError, icSuccess, icWarning } from "../../../assets"

const MODAL: ViewStyle = { justifyContent: 'center', alignItems: "center", paddingBottom: 83 , flex: 1 }

const CONTAINER: ViewStyle = {
  backgroundColor: palette.white,
  width: "100%",
  borderRadius: 8,
  alignItems: "center",
  //flex: 1,
  justifyContent: 'center',
  padding: 15,
}

const VIEWLINE: ViewStyle = { backgroundColor: "#C7C7C7", width: 68, height: 5, borderRadius: 100 }

const TEXTBUTTON: TextStyle = {
  paddingVertical: 10,
  fontSize: 14,
  fontWeight: "700",
  color: palette.white,
  textAlign: "center",
  borderRadius: 8,
}
const IMAGE: ImageStyle = { width: 98, height: 98, marginTop: 40, marginBottom: 17 }
const BUTTON: ViewStyle = { flex: 1, backgroundColor: palette.navyBlue , borderRadius: 8 }

const VIEWBUTTON: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
  width: "100%",
  paddingTop: 15,
}
const TITLE: TextStyle = { color: "black", fontWeight: "bold", fontSize: 18, textAlign: "center", }
const CONTENT: TextStyle = {
  color: "#84888D",
  fontWeight: "500",
  fontSize: 14,
  paddingTop: 10,
  textAlign: "center",
}

export interface DialogProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export default class CustomDialog extends React.PureComponent<DialogProps> {
  state = {
    isShow: false,
    title: "",
    content: "",
    icon: null,
    type: null,
    imageSource: null,
    titleBTN1: "",
    titleBTN2: "",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPressAccept: () => {},
  }

  showDialog(title, type, content, titleBTN1, titleBTN2, onPressAccept) {
    this.setState({
      isShow: true,
      title,
      content,
      titleBTN1,
      titleBTN2,
      onPressAccept,
      imageSource: type === "success" ? icSuccess : type === "warning" ? icWarning : icError,
    })
  }

  hideDialog() {
    this.setState({ isShow: false })
  }

  onPressBTN = () => {
    this.state.onPressAccept()
  }

  render() {
    const { isShow, imageSource, title, content, titleBTN1, titleBTN2 } = this.state
    return (
      <Modal
        statusBarTranslucent
        backdropOpacity={0.5}
        // animationIn='slideInUp'
        // animationOut='slideOutDown'
        animationIn="bounceIn"
        hideModalContentWhileAnimating
        // animationOut="fadeOut"
        style={MODAL}
        isVisible={isShow}
      >
        <View style={CONTAINER}>
          <View style={VIEWLINE} />
          {/* <Image source={imageSource} style={IMAGE} /> */}
          <Text style={TITLE} text={title} />
          <Text style={CONTENT} text={content} />
          <View style={VIEWBUTTON}>
            {titleBTN1 !== "" && (
              <Button
                style={[BUTTON, { backgroundColor: colors.yellowOpacity }]}
                textStyle={[TEXTBUTTON, { color: colors.yellow }]}
                onPress={() => this.setState({ isShow: false })}
                text={titleBTN1}
              />
            )}
            {titleBTN1 !== "" && <View style={{ width: 9 }} />}
            {titleBTN2 !== "" && (
              <Button
                onPress={this.onPressBTN}
                textStyle={TEXTBUTTON}
                style={BUTTON}
                text={titleBTN2}
              />
            )}
          </View>
        </View>
      </Modal>
    )
  }
}
