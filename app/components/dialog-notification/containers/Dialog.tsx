import * as React from 'react';
import { Animated, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ACTION, ALERT_TYPE, ENV } from '../config';
import { Color, getImage } from '../service';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../app-purchase/theme';
import { Loading } from './Loading';

export type IConfigDialog = {
  type?: ALERT_TYPE;
  title?: string;
  textBody?: string;
  textBodyWarning?: string;
  button?: string;
  button2?: string;
  autoClose?: number | boolean;
  closeOnOverlayTap?: boolean;
  onPressButton?: () => void;
  onShow?: () => void;
  onHide?: () => void;
};

type IProps = {
  isDark: boolean;
  config?: Pick<IConfigDialog, 'closeOnOverlayTap' | 'autoClose'>;
};

type IState = {
  styles: ReturnType<typeof __styles>;
  overlayClose?: boolean;
  visible: boolean;
  config?: IConfigDialog;
};

export class Dialog extends React.Component<IProps, IState> {
  /**
   * @type {React.RefObject<Dialog>}
   */
  public static instance: React.RefObject<Dialog> = React.createRef();

  /**
   * @param {IConfig} args
   */
  public static show = (args: IConfigDialog): void => {
    Dialog.instance.current?._open(args);
  };


  public static hide = (): void => {
    Dialog.instance.current?._close();
  };


  private _timeout?: NodeJS.Timeout;

  /**
   * @type {Animated.Value}
   * @private
   */
  private readonly _opacity: Animated.Value;

  /**
   * @type {Animated.Value}
   * @private
   */
  private readonly _positionDialog: Animated.Value;

  /**
   * @type {number}
   * @private
   */
  private _popupHeight: number;

  /**
   * @param {IProps} props
   */
  constructor(props: IProps) {
    super(props);
    this._opacity = new Animated.Value(0);
    this._positionDialog = new Animated.Value(ENV.WINDOWS.HEIGHT + 30);
    this._popupHeight = 0;

    this.state = {
      styles: __styles(props.isDark),
      visible: false,
    };
  }

  /**
   * @param {Readonly<IProps>} prevProps
   */
  public componentDidUpdate = (prevProps: Readonly<IProps>): void => {
    if (prevProps.isDark !== this.props.isDark) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState((prevState) => ({ ...prevState, styles: __styles(this.props.isDark) }));
    }
  };

  /**
   * @param {IConfig} config
   */
  private _open = async (config: IConfigDialog): Promise<void> => {
    if (this.state.visible) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      await this._startAnimation(ACTION.CLOSE, false);
      await new Promise<void>((resolve) => this.setState((prevState) => ({ ...prevState, config }), resolve));
      await this._startAnimation(ACTION.OPEN);
      return;
    }

    this.setState((prevState) => ({ ...prevState, visible: true, config }));
  };

  /**
   * @return {Promise<void>}
   */
  private _close = async (): Promise<void> => {
    if (!this.state.visible) {
      return;
    }
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    await this._startAnimation(ACTION.CLOSE);
    const onHide = this.state.config?.onHide;
    await new Promise<void>((resolve) => this.setState((prevState) => ({ ...prevState, config: undefined, visible: false }), resolve));
    onHide?.();
  };

  /**
   * @return {Promise<void>}
   */
  private _showModalHandler = async (): Promise<void> => {
    await this._startAnimation(ACTION.OPEN);
    const autoClose = this.state.config?.autoClose !== undefined ? this.state.config?.autoClose : this.props.config?.autoClose;
    if (autoClose) {
      const duration = typeof autoClose === 'number' ? autoClose : ENV.AUTO_CLOSE;
      this._timeout = setTimeout(() => {
        this._close();
      }, duration);
    }
    this.state.config!.onShow?.();
  };

  /**
   * @param {ACTION} action
   * @param opacity
   * @return {Promise<void>}
   */
  private _startAnimation = (action: ACTION, opacity: boolean = true): Promise<void> => {
    const open = action === ACTION.OPEN;

    let animations = [
      opacity
        ? Animated.timing(this._opacity, {
          toValue: action === ACTION.OPEN ? 1 : 0,
          duration: 300,
          useNativeDriver: false,
        })
        : null!,
      Animated[open ? 'spring' : 'timing'](this._positionDialog, {
        toValue: open ? ENV.WINDOWS.HEIGHT / 2 - this._popupHeight / 2 : ENV.WINDOWS.HEIGHT + 30,
        ...(open ? { bounciness: 12 } : { duration: 250 }),
        useNativeDriver: true,
      }),
    ].filter(Boolean);

    if (!open) {
      animations = animations.reverse();
    }

    return new Promise((resolve) => {
      Animated.sequence(animations).start(() => resolve());
    });
  };

  public static hideDialog = async (): Promise<void> => {
    return new Promise<void>((resolve) => {
      Dialog.hide();
      setTimeout(resolve, 300); // Điều chỉnh thời gian nếu cần để khớp với thời gian animation ẩn
    });
  };


  private onPressBTN = async () => {
    const { onPressButton } = this.state.config!;
    if (onPressButton) {
      await Dialog.hideDialog(); // Chờ dialog ẩn hoàn toàn
      onPressButton(); // Thực thi logic sau khi dialog đã ẩn
    }
  };


  /**
   * @return {JSX.Element}
   */
  private _buttonRender = (): JSX.Element => {
    const { styles } = this.state;
    const { type, onPressButton, button, button2 } = this.state.config!;
    return (
      <View style={styles.viewButton}>

        {button && (<TouchableOpacity style={StyleSheet.flatten([button2 ? styles.button : styles.buttonBackground])} onPress={this._close}>
          <Text style={[styles.buttonLabel, { color: button2 ? colors.dolphin : colors.white }]}>{button}</Text>
        </TouchableOpacity>)}
        {button && button2 && <View style={{ width: scaleWidth(9) }} />}
        {button2 && (<TouchableOpacity style={StyleSheet.flatten([styles.buttonAccept])} onPress={this.onPressBTN ?? this._close}>
          <Text style={styles.buttonLabelAccept}>{button2}</Text>
        </TouchableOpacity>)}
      </View>
    );
  };

  /**
   * @return {JSX.Element}
   */
  private _OverlayCloseRender = (): JSX.Element => {
    if (this.state.config?.closeOnOverlayTap === false ? false : this.props.config?.closeOnOverlayTap !== false) {
      // eslint-disable-next-line react-native/no-inline-styles
      return <TouchableOpacity onPressIn={this._close} style={{ flex: 1 }} />;
    }
    return <></>;
  };

  /**
   * @return {JSX.Element}
   */
  private _CardRender = (): JSX.Element => {
    if (!this.state.config) {
      return <></>;
    }

    const {
      styles,
      config: { title, type, textBody, textBodyWarning },
    } = this.state;
    const { _buttonRender } = this;
    return (
      <Animated.View
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => (this._popupHeight = height)}
        style={StyleSheet.flatten([styles.cardContainer, { transform: [{ translateY: this._positionDialog }] }])}
      >
        {/* <View style={styles.backendImage} /> */}
        {/* <Image source={getImage(type)} resizeMode="contain" style={StyleSheet.flatten([styles.image, styles[`${type}Image`]])} /> */}
        <View style={styles.cardBody}>
          {title && <Text style={styles.titleLabel}>{title}</Text>}
          {textBody && <Text style={styles.descLabel}>{textBody}</Text>}
          {textBodyWarning && <Text style={styles.textWarning}>{textBodyWarning}</Text>}
        </View>
        <View style={styles.cardFooter}>
          <_buttonRender />
        </View>
      </Animated.View>
    );
  };

  /**
   * @return {JSX.Element}
   */
  public render = (): JSX.Element => {
    const { visible, styles } = this.state;
    const { _OverlayCloseRender, _CardRender } = this;
    return (
      <Modal transparent={true} visible={visible} animated={false} onShow={this._showModalHandler}>
        <Animated.View style={StyleSheet.flatten([styles.backgroundContainer, { opacity: this._opacity }])} />
        <_OverlayCloseRender />
        <_CardRender />
      </Modal>
    );
  };
}

const __styles = (isDark: boolean) =>
  StyleSheet.create({
    backgroundContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#00000070',
    },
    cardContainer: {
      alignSelf: 'center',
      // maxWidth: 400,
      width: '90%',
      // margin : scaleWidth(16),
      // minHeight: 250,
      borderRadius: 8,
      paddingHorizontal: scaleWidth(10),
      paddingTop: scaleHeight(20),
      paddingBottom: scaleHeight(15),
      position: 'absolute',
      backgroundColor: Color.get('card', isDark),
    },

    viewButton: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingTop: scaleHeight(15),
    },
    cardBody: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      overflow: 'hidden',
    },
    cardFooter: {},

    titleLabel: {
      fontWeight: 'bold',
      fontSize: 20,
      color: Color.get('label', isDark),
    },
    textWarning: {
      fontSize: 10,
      color: colors.dolphin,
      fontWeight: "400",
      textAlign: 'center',
      fontStyle: 'italic'
    },
    descLabel: {
      textAlign: 'center',
      color: Color.get('label', isDark),
      marginVertical: scaleHeight(15)
    },
    button: {
      flex: 1,
      // backgroundColor : 'red',
      borderColor: "#d5d5d5",
      borderWidth: 1,
      borderRadius: 8,
      height: scaleHeight(44),
      // width: scaleWidth(153),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    buttonBackground: {
      flex: 1,
      borderColor: "#d5d5d5",
      borderWidth: 1,
      borderRadius: 8,
      height: scaleHeight(44),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: colors.navyBlue
    },
    buttonAccept: {
      flex: 1,
      borderRadius: 8,
      height: scaleHeight(44),
      // width: scaleWidth(153),
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: colors.navyBlue
    },
    buttonLabel: {
      // color: colors.dolphin,
      fontWeight: 'bold',
      fontSize: fontSize.size14,
    },
    buttonLabelAccept: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: fontSize.size14,
    },
    [ALERT_TYPE.SUCCESS]: {
      backgroundColor: Color.get('success', isDark),
    },
    [ALERT_TYPE.DANGER]: {
      backgroundColor: Color.get('danger', isDark),
    },
    [ALERT_TYPE.WARNING]: {
      backgroundColor: Color.get('warning', isDark),
    },
    [ALERT_TYPE.INFO]: {
      backgroundColor: Color.get('info', isDark),
    },
    backendImage: {
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      height: 50,
      width: 50,
      backgroundColor: colors.snow,
      borderRadius: 100,
      marginTop: -10,
    },
    image: {
      alignSelf: 'center',
      width: 80,
      aspectRatio: 1,
      position: 'absolute',
      top: -30,
    },

    [`${ALERT_TYPE.SUCCESS}Image`]: {
      tintColor: Color.get('success', isDark),
    },
    [`${ALERT_TYPE.DANGER}Image`]: {
      tintColor: Color.get('danger', isDark),
    },
    [`${ALERT_TYPE.WARNING}Image`]: {
      tintColor: Color.get('warning', isDark),
    },
    [`${ALERT_TYPE.INFO}Image`]: {
      tintColor: Color.get('info', isDark),
    },
  });
