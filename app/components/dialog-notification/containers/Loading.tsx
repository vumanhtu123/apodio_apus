import React from 'react';
import { View, StyleSheet, StyleProp, TextStyle, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { colors } from '../../../app-purchase/theme';
import { Text } from '../../../components/text/text';

export type IConfigLoading = {
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  onShow?: () => void;
  onHide?: () => void;
};

type IProps = {
  isDark: boolean;
  config?: Pick<IConfigLoading, 'textStyle'>;
};

type IState = {
  isVisible: boolean;
  data: null | IConfigLoading;
};

export class Loading extends React.Component<IProps, IState> {
    public static instance: React.RefObject<Loading> = React.createRef();
  
    public static show = (args: IConfigLoading): void => {
      Loading.instance.current?._show(args);
    };
  
    public static hide = (): void => {
      Loading.instance.current?._hide();
    };
  
    constructor(props: IProps) {
      super(props);
      this.state = {
        isVisible: false,
        data: null,
      };
    }
  
    private _show = async (data: IConfigLoading): Promise<void> => {
      const { textStyle } = this.props.config || {};
      await new Promise<void>((resolve) =>
        this.setState((prevState) => ({ isVisible: true, data: { textStyle, ...data } }), resolve)
      );
      this.state.data?.onShow?.();
    };
  
    private _hide = async (): Promise<void> => {
      this._hideHandler();
    };
  
    private _hideHandler = async (): Promise<void> => {
      const onHide = this.state.data?.onHide;
      await new Promise<void>((resolve) => this.setState((prevState) => ({ isVisible: false, data: null }), resolve));
      onHide?.();
    };
  
    public render() {
      const { isVisible, data } = this.state;
      if (!isVisible) {
        return null;
      }
      const { isDark } = this.props;
      return (
        <View style={[styles.overlay, isDark ? styles.darkOverlay : styles.lightOverlay]}>
          <ActivityIndicator size={'large'} color="#2A6FA8" />
          {/* <ActivityIndicator size="large" color={isDark ? colors.white : colors.black} /> */}
          {data?.text ? <Text style={[styles.text, data.textStyle]}>{data.text}</Text> : null}
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    darkOverlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    lightOverlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    text: {
      marginTop: 10,
      fontSize: 16,
    },
  });
  