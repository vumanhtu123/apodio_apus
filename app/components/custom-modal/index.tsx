import React, { useCallback } from "react"
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { colors, margin, scaleHeight, scaleWidth } from "../theme"
import Modal from 'react-native-modal'


export type ModalProps = {
  children?: React.ReactNode
  style?: ViewStyle | ViewStyle[]
  isVisible: boolean;
  isVisibleLoading?: boolean;
  setIsVisible: () => void;
  isHideKeyBoards?: boolean;
}

export const CustomModal = (props: ModalProps) => {
  const { children, style, isVisible, isVisibleLoading, setIsVisible, isHideKeyBoards, ...rest } = props

  // const handleBackdropPress = useCallback(() => {
  //   if (isHideKeyBoards) {
  //     setIsVisible();
  //   }
  // }, [isHideKeyBoards, setIsVisible]);
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
      isVisible={isVisible}
      useNativeDriver={true}
      avoidKeyboard={true}
      onBackdropPress={setIsVisible}
      onBackButtonPress={setIsVisible}
      style={{ margin: 0 }}
    >
      {/* <TouchableWithoutFeedback onPress={handleBackdropPress}> */}
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      > */}
      {/* <TouchableWithoutFeedback  > */}

      <View style={{
        maxHeight: Dimensions.get('screen').height * 0.45,
        minHeight: Dimensions.get('screen').height * 0.3,
        width: '100%',
        backgroundColor: colors.palette.neutral100,
        borderTopLeftRadius: margin.border_top_left_radius,
        borderTopRightRadius: margin.border_top_right_radius,
        paddingVertical: scaleHeight(margin.margin_16),
        paddingHorizontal: scaleWidth(margin.margin_16),
        paddingBottom : scaleHeight(20),
        position: 'absolute', bottom: 0,
      }}>
        {children}
        {isVisibleLoading ? (<View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', position: 'absolute' }}>
          <ActivityIndicator size={'large'} color="#2A6FA8" />
        </View>) : null}
      </View>
      {/* </TouchableWithoutFeedback> */}
      {/* </KeyboardAvoidingView> */}
      {/* </TouchableWithoutFeedback> */}
    </Modal>

  )
}
