import {observer} from 'mobx-react-lite';
import {StackScreenProps} from '@react-navigation/stack';
import {NavigatorParamList} from '../../../navigators';
import React, {FC, useEffect, useState} from 'react';
import {styles} from '../staff/index';
import {View, Image, Text, ScrollView} from 'react-native';
import {Header} from '../../../components';
import {color} from '../../../theme/color';
import {useNavigation} from '@react-navigation/native';
import {useStores} from '../../../models';
import {Root} from './types';
import {hideLoading, showLoading} from '../../../utils/toast';

const MerchantInfo = ({label, value}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 9,
      }}>
      <Text style={{fontSize: 14, color: '#84888D'}}>{label}</Text>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 14,
          color: '#323232',
          maxWidth: 200,
          fontFamily: 'Arial',
          fontWeight: '700',
        }}>
        {value}
      </Text>
    </View>
  );
};
const ProfileImage = ({imageUrl, label, token}) => {
  return (
    <View>
      <Image
        resizeMode="stretch"
        source={{
          uri:
            imageUrl ??
            'https://th.bing.com/th/id/OIP.hhqab-_voCR-IcizNa1MKwHaG8?w=177&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }}
        style={styles.image}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};
export const InfoStaffScreen: FC<
  StackScreenProps<NavigatorParamList, 'infoStaff'>
> = observer(function InfoStaffScreen() {
  const [data, setData] = useState<Root>();
  const navigation = useNavigation();
  useEffect(() => {
    handleInfoMerchant();
  }, []);
  const {infoStaff} = useStores();

  const handleInfoMerchant = async () => {
    showLoading();
    const res = await infoStaff.infoStaff();
    setData(res.response);
    hideLoading();
    console.log('tuvmmm info : ' + data);
  };
  if (data) {
    return (
      <View style={styles.main}>
        <Header
          headerText="Merchant Information"
          type={'AntDesign'}
          leftIcon={'arrowleft'}
          onLeftPress={() => navigation.goBack()}
          colorIcon={color.text}
        />
        <ScrollView>
          <View style={styles.merchantInfor}>
            <Text style={styles.text}>Staff infomation</Text>
            <View style={styles.line} />
            <View style={{marginHorizontal: 24, marginTop: 9}}>
              <MerchantInfo
                label={'Staff name'}
                value={data.data.fullName ?? ''}
              />
              <MerchantInfo
                label={'Staff code'}
                value={data.data.staffCode ?? ''}
              />
              <MerchantInfo
                label={'Phone number'}
                value={data.data.phoneNumber ?? ''}
              />
              <MerchantInfo label={'Email'} value={data.data.email} />
            </View>
          </View>

          {/* {this.props.data.subMerchant != null ? ( */}
          <>
            <View style={styles.merchantInfor}>
              <Text style={styles.text}>Sub merchant infomation</Text>
              <View style={styles.line} />
              <View style={{marginHorizontal: 24, marginTop: 9}}>
                <MerchantInfo
                  label={'Sub merchant name'}
                  value={data.data.subMerchant.subMerchantName ?? ''}
                />
                <MerchantInfo
                  label={'Sub merchant code'}
                  value={data.data.subMerchant.subMerchantCode}
                />
                <MerchantInfo
                  label={'Phone number'}
                  value={data.data.subMerchant.subMerchantPhone}
                />
                <MerchantInfo
                  label={'Address'}
                  value={data.data.subMerchant.address}
                />
              </View>
            </View>
          </>
          {/* ) : null} */}

          <View style={styles.merchantInfor}>
            <Text style={styles.text}>Merchant infomation</Text>
            <View style={styles.line} />
            <View style={{marginHorizontal: 24, marginTop: 9}}>
              <MerchantInfo
                label={'Merchant name'}
                value={data.data.merchant.merchantName}
              />
              <MerchantInfo
                label={'Merchant code'}
                value={data.data.merchant.merchantCode}
              />
              <MerchantInfo
                label={'Phone number'}
                value={data.data.merchant.phoneNumber}
              />
              <MerchantInfo
                label={'Address'}
                value={data.data.merchant.address}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return null;
  }
});
