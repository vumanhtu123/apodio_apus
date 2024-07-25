import React, {FC, memo} from 'react';
import {Text, View} from 'react-native';
import {Images} from '../../../assets/index';
import {navigate} from '../../../app/navigators';

export const WellComeScreen: FC = () => {
  setTimeout(() => {
    navigate('selectLanguage');
  }, 3000);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Images.icon_Logo1 />
    </View>
  );
};
