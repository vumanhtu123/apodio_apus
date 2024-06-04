import * as React from 'react';
import { ActivityIndicator, Platform, TextStyle, View, ViewStyle } from 'react-native';
import { colors } from '../../theme';
import { Text } from '../text/text';
import Modal from 'react-native-modal';

const CONTAINER: ViewStyle = {
  justifyContent: 'center',
};

const TEXT: TextStyle = {
  // fontFamily: typography.primary.bold,
  fontSize: 14,
  color: colors.text,
};

export interface LoadingProps {
  hideLoading: any;
  showLoading: any;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle;
}

/**
 * Describe your component here
 */
export default class Loading extends React.PureComponent {
  state = {
    isVisible: false,
  };

  showLoading() {
    this.setState({ isVisible: true });
  }

  hideLoading() {
    this.setState({ isVisible: false });
  }

  render() {
      return (
        <Modal
          statusBarTranslucent
          backdropOpacity={0.5}
          animationIn="zoomIn"
          animationOut="fadeOut"
          style={{ justifyContent: 'center', alignItems: 'center' }}
          isVisible={this.state.isVisible}>
          <View style={CONTAINER}>
            <ActivityIndicator size={'large'} color="#2A6FA8" />
            <Text
              style={{
                color: '#17315C',
                fontSize: 18,
                fontWeight: '500',
                marginTop: 8,
              }}>
              Loading...
            </Text>
          </View>
        </Modal>
      );
    // }
  }
}
