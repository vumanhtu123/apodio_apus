import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';
import { Header } from '../../../../app-purchase/components/header/header';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Switch,
  View,
} from 'react-native';
import { Svgs } from '../../../../../assets/svgs';
import { Text } from '../../../../app-purchase/components/text/text';
import { colors, scaleHeight } from '../../../theme';
import { styles } from './styles';

export const NotificationSetting: FC = observer(function NotificationSetting() {
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
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
        LeftIcon={Svgs.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerTx="demoPodcastListScreen.notificationSetting.notificationSetting"
        style={{ height: scaleHeight(54) }}
        titleStyle={{ color: 'white' }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
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
              { backgroundColor: colors.palette.white, borderColor: colors.yellow },
            ]}>
            <View>
              <Text
                tx="demoPodcastListScreen.notificationSetting.allowMessage"
                style={[styles.lableSelectText, { color: 'black' }]}
              />
              <Text
                tx="demoPodcastListScreen.notificationSetting.validForThisDeviceOnly"
                style={[styles.selectText, { color: colors.aluminium }]}
              />
            </View>
            <Switch
              trackColor={{ false: colors.ghostWhite1, true: colors.ghostWhite1 }}
              thumbColor={isEnabled ? colors.palette.navyBlue : colors.selago}
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
                    borderColor: colors.yellow,
                  },
                ]}>
                <View>
                  <Text
                    tx="demoPodcastListScreen.notificationSetting.orderApproved"
                    style={[styles.lableSelectText, { color: 'black' }]}
                  />
                </View>
                <Switch
                  trackColor={{ false: colors.ghostWhite1, true: colors.ghostWhite1 }}
                  thumbColor={isEnabled1 ? colors.palette.navyBlue : colors.selago}
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
                    borderColor: colors.yellow,
                  },
                ]}>
                <View>
                  <Text
                    tx="demoPodcastListScreen.notificationSetting.newSalesPolicy"
                    style={[styles.lableSelectText, { color: 'black' }]}
                  />
                </View>
                <Switch
                  trackColor={{ false: colors.ghostWhite1, true: colors.ghostWhite1 }}
                  thumbColor={isEnabled2 ? colors.palette.navyBlue : colors.selago}
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
                    borderColor: colors.yellow,
                  },
                ]}>
                <View>
                  <Text
                    tx="demoPodcastListScreen.notificationSetting.newPromotions"
                    style={[styles.lableSelectText, { color: 'black' }]}
                  />
                </View>
                <Switch
                  trackColor={{ false: colors.ghostWhite1, true: colors.ghostWhite1 }}
                  thumbColor={isEnabled3 ? colors.palette.navyBlue : colors.selago}
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
