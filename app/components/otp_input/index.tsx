import {colors} from '../../app-purchase/theme';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// const { width, height } = Dimensions.get('window');

interface OtpProps {
  code: any;
  setCode: any;
  setIsPinReady: any;
  isOtp: any;
  onBlur: any;
  autoFocus?: any;
}
const OTPInput = ({
  code,
  setCode,
  setIsPinReady,
  isOtp,
  onBlur,
  autoFocus,
}: OtpProps) => {
  const [pin, setPin] = useState('');
  const focus = useRef(null);
  const handlePinChange = text => {
    setPin(text);
  };
  useEffect(() => {
    setIsPinReady(code.length === 6);
    return () => {
      setIsPinReady(false);
    };
  }, [code, setIsPinReady]);

  return (
    <TouchableOpacity
      onPress={() => {
        focus.current.focus();
     
      }}
      activeOpacity={0.1}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
        height: 49,
        borderRadius: 14,
      }}>
      <TouchableOpacity
        style={styles.circleContainer}
        onPress={() => {
          focus.current.focus();
          
        
        }}>
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            style={[styles.circle, code.length > index && styles.filledCircle]}
          />
        ))}
      </TouchableOpacity>
      <TextInput
        ref={focus}
        // onLayout={() => focus.current.focus()}
        style={isOtp ? styles.input : styles.input1}
        keyboardType="numeric"
        maxLength={6}
        onBlur={onBlur}
        secureTextEntry={true}
        value={code}
        caretHidden={true}
        // autoFocus={autoFocus}
        onChangeText={setCode}
      />
      {/* <Text>{pin}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  circleContainer: {
    flexDirection: 'row',
    marginBottom: 0,
    marginHorizontal: '15%',
  },
  circle: {
    color: '#858992',
    width: 14,
    height: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#858992',
    backgroundColor: '#858992',
    marginHorizontal: '4%',
  },
  filledCircle: {
    backgroundColor: colors.palette.navyBlue,
    borderColor: colors.palette.navyBlue,
  },
  input: {
    borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 0,
    width: 0,
    textAlign: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    bottom: -10,
    right: 1,
    zIndex: -1,
    // marginTop: 10
  },
  input1: {
    borderWidth: 1,
    borderColor: 'black',
    // borderRadius: 8,
    // paddingHorizontal: 10,
    height: 0,
    width: 0,
    textAlign: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',
    // borderColor: 'transparent',
  },
});

export default OTPInput;
