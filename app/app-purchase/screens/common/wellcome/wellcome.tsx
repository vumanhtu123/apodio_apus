import React, {FC, memo} from 'react';
import {Text, View} from 'react-native';
import {Svgs} from '../../../../../assets/svgs';
import {navigate} from '../../../../app-purchase/navigators';

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
      <Svgs.icon_Logo1 />
    </View>
  );
};
