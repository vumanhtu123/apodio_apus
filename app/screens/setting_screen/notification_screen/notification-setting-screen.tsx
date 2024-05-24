import {observer} from 'mobx-react-lite';
import React, {FC, useState} from 'react';
import {Header} from '../../../components/header/header';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Switch,
  View,
} from 'react-native';
import {Images} from '../../../../assets/index';
import {Text} from '../../../components/text/text';
import {colors, scaleHeight} from '../../../theme';
import {styles} from './styles';

export const NotificationSetting: FC = observer(function NotificationSetting() {
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
  } = useForm({
    mode: 'all',
  });
  // const { height } = Dimensions.get('window');
  const keyboardVerticalOffset = Platform.select({
    ios: 0,
    android: scaleHeight(100),
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.ROOT}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Header
        type={'AntDesign'}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerTx="demoPodcastListScreen.notificationSetting.notificationSetting"
        style={{height: scaleHeight(54)}}
        titleStyle={{color: 'white'}}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <ScrollView
          bounces={false}
          style={styles.body}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View
            style={[
              styles.button,
              {backgroundColor: colors.palette.white, borderColor: '#F4AD22'},
            ]}>
            <View>
              <Text
                text={'Cho phép thông báo'}
                style={[styles.lableSelectText, {color: 'black'}]}
              />
              <Text
                text={'chỉ có hiệu lực với thiết bị này'}
                style={[styles.selectText, {color: '#84888D'}]}
              />
            </View>
            <Switch
              trackColor={{false: '#f1f1f2', true: '#f1f1f2'}}
              thumbColor={isEnabled ? colors.palette.navyBlue : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            {/* <SvgIcon name={'icDropdownSelect'} width={22} height={22} /> */}
          </View>
          {isEnabled ? (
            <View>
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.palette.white,
                    borderColor: '#F4AD22',
                  },
                ]}>
                <View>
                  <Text
                    text={'Đơn hàng được phê duyệt '}
                    style={[styles.lableSelectText, {color: 'black'}]}
                  />
                </View>
                <Switch
                  trackColor={{false: '#f1f1f2', true: '#f1f1f2'}}
                  thumbColor={isEnabled1 ? colors.palette.navyBlue : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setIsEnabled1}
                  value={isEnabled1}
                />
              </View>
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.palette.white,
                    borderColor: '#F4AD22',
                  },
                ]}>
                <View>
                  <Text
                    text={'Chính sách bán hàng mới '}
                    style={[styles.lableSelectText, {color: 'black'}]}
                  />
                </View>
                <Switch
                  trackColor={{false: '#f1f1f2', true: '#f1f1f2'}}
                  thumbColor={isEnabled2 ? colors.palette.navyBlue : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setIsEnabled2}
                  value={isEnabled2}
                />
              </View>
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.palette.white,
                    borderColor: '#F4AD22',
                  },
                ]}>
                <View>
                  <Text
                    text={'Chương trình khuyến mãi mới '}
                    style={[styles.lableSelectText, {color: 'black'}]}
                  />
                </View>
                <Switch
                  trackColor={{false: '#f1f1f2', true: '#f1f1f2'}}
                  thumbColor={isEnabled3 ? colors.palette.navyBlue : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setIsEnabled3}
                  value={isEnabled3}
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
});
