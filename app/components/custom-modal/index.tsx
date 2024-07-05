import React from "react"
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { colors, margin, scaleHeight } from "../../theme"
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
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={isVisible}
      {...rest}
      avoidKeyboard={true}
      onBackdropPress={setIsVisible}
      onBackButtonPress={setIsVisible}
      style={{ margin: 0 }}
    >
      <TouchableWithoutFeedback onPress={() => { isHideKeyBoards ? setIsVisible : {} }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableWithoutFeedback onPress={() => { }}>


            <View style={{
              maxHeight: Dimensions.get('screen').height * 0.6,
              width: '100%', 
              backgroundColor: colors.palette.neutral100,
              borderTopLeftRadius: margin.border_top_left_radius,
              borderTopRightRadius: margin.border_top_right_radius,
              paddingVertical: margin.margin_16,
              paddingHorizontal: margin.margin_16,
              position: 'absolute', bottom: 0,
            }}>
              {children}
              {isVisibleLoading ? (<View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%',position: 'absolute'}}>
                <ActivityIndicator size={'large'} color="#2A6FA8" />
              </View>) : null}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>

  )
}
