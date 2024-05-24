import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';
import moment from 'moment';
import React, {FC, useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {Header} from '../../../components/header/header';
import {useStores} from '../../../models';

import {colors} from '../../../theme/colors';
// import { hideLoading, showLoading } from "../../../utils/toast"
import {styles} from '../merchant/index';
import {Root} from './types';
import {Images} from '../../../../assets/index';
import {iteratee} from 'lodash';
import { AppStackParamList } from '../../../navigators/AppNavigator';

const ProfileImage = ({imageUrl, label, token}) => {
  return (
    <View style={{width: 148}}>
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

export const InforMerChant: FC<StackScreenProps<AppStackParamList, 'infoMerchant'>> = observer(
  function InfoScreen(props) {
  // const { accountStore } = useStores()
  // const [data, setData] = useState<Root>()
  // const navigation = useNavigation()
  // useEffect(() => {
  //   handleInfoMerchant()
  // }, [])

  // const handleInfoMerchant = async () => {
  //   showLoading()
  //   const res = await accountStore.getInfoMerchant()
  //   setData(res.response)
  //   hideLoading()
  // }
  //Dataface
  const data = {
    inforMer: {
      merchantType: 'Công ty',
      businessSector: 'Nhà hàng',
      businessLicens: '00482276',
      phoneNumber: '0123456789',
      merchantName: 'Cong Ty Thanh Long',
      merChantCode: 'MC0833',
      merChanName: 'Merchant',
      documentType: 'Hộ chiếu',
      documentNumber: '004988276511',
      dateIused: '12/09/1994',
      dateEnd: '12/09/2023',
      isudePlance: 'Hà Nội',
      province: 'Hà Nội',
      district: 'Hoàn Kiếm',
      precinct: 'Hàng Bài',
      addRess: '49 Hàng Bài',
      gener: 'Nam',
      email: 'info@company.com',
    },
    ifnorBank: {
      bankName: 'Techcombank',
      bankNumber: '19029887983298',
      bankNameAccount: 'Công ty Thanh Long',
      branch: 'Hà Nội',
    },
    profileImg: {
      label: 'Portrait',
      front: 'Front (ID card)',
      back: 'Back (ID card)',
    },
  };

  // if (data) {
  return (
    <View style={styles.main}>
      <Header
        style={{height: 52}}
        RightIcon={Images.back}
        LeftIcon={Images.back}
        headerTx={'inforMerchant.InforMerChant'}
        onLeftPress={() => props.navigation.goBack()}
      />
      <ScrollView style={{flex: 1, marginBottom: 30}}>
        <View style={styles.merchantInfor}>
          <Text style={styles.text}>Merchant Information</Text>
          <View style={styles.line} />
          <View style={{marginHorizontal: 24, marginTop: 9}}>
            <MerchantInfo
              label={'Kiểu merchant'}
              value={data.inforMer.merchantType}
            />
            <MerchantInfo
              label={'Lĩnh vực kinh doanh'}
              value={data.inforMer.businessSector}
            />
            <MerchantInfo
              label={'Giấy phép kinh doanh'}
              value={data.inforMer.merChantCode}
            />
            <MerchantInfo
              label={'Số điện thoại'}
              value={data.inforMer.phoneNumber}
            />
            <MerchantInfo
              label={'Tên merchant'}
              value={data.inforMer.merchantName}
            />
            <MerchantInfo
              label={'Mã merchant'}
              value={data.inforMer.merChantCode}
            />
            <MerchantInfo
              label={'Loại giấy tờ'}
              value={data.inforMer.documentType}
            />
            <MerchantInfo
              label={'Số giấy tờ'}
              value={data.inforMer.documentNumber}
            />
            <MerchantInfo
              label={'Ngày ban hành'}
              value={data.inforMer.dateIused}
            />
            <MerchantInfo
              label={'Ngày hết hạn'}
              value={data.inforMer.dateEnd}
            />
            <MerchantInfo
              label={'Nơi phát hành'}
              value={data.inforMer.isudePlance}
            />
            <MerchantInfo
              label={'Tỉnh/Thành phố'}
              value={data.inforMer.province}
            />
            <MerchantInfo label={'Quận/Huyện'} value={data.inforMer.district} />
            <MerchantInfo label={'Phường/Xã'} value={data.inforMer.precinct} />
            <MerchantInfo label={'Địa chỉ'} value={data.inforMer.addRess} />
            <MerchantInfo label={'Giới tính:'} value={data.inforMer.gener} />
          </View>
        </View>
        <View style={styles.merchantInfor}>
          <Text style={styles.text}>Thông tin ngân hàng</Text>
          <View style={styles.line} />
          <View style={{marginHorizontal: 24, marginTop: 9}}>
            <MerchantInfo
              label={'Tên ngân hàng'}
              value={data.ifnorBank.bankName}
            />
            <MerchantInfo
              label={'Số tài khoản'}
              value={data.ifnorBank.bankNumber}
            />
            <MerchantInfo
              label={'Tên tài khoản ngân hàng'}
              value={data.ifnorBank.bankNameAccount}
            />
            <MerchantInfo label={'Chi nhánh'} value={data.ifnorBank.branch} />
          </View>
        </View>
        <View style={[styles.merchantInfor, {marginBottom: 20}]}>
          <Text style={styles.text}> Hình ảnh</Text>
          <View style={styles.line} />
          <View style={{marginHorizontal: 24, marginTop: 9}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <ProfileImage
                label={data.profileImg.label}
                imageUrl={
                  'https://th.bing.com/th/id/R.5eaa073873e55124770410ea27876275?rik=Re7I7PQ8hvs3Yw&riu=http%3a%2f%2fwww.kibiji-office.com%2fwp-content%2fuploads%2f2014%2f04%2f150.png&ehk=XQJqheFiW5Pb7cGYQicM9g5IOE539MmpAY67wCS6SA4%3d&risl=&pid=ImgRaw&r=0'
                }
              />
              <ProfileImage
                label={data.profileImg.front}
                imageUrl={
                  'https://th.bing.com/th/id/R.5eaa073873e55124770410ea27876275?rik=Re7I7PQ8hvs3Yw&riu=http%3a%2f%2fwww.kibiji-office.com%2fwp-content%2fuploads%2f2014%2f04%2f150.png&ehk=XQJqheFiW5Pb7cGYQicM9g5IOE539MmpAY67wCS6SA4%3d&risl=&pid=ImgRaw&r=0'
                }
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <ProfileImage
                label={data.profileImg.back}
                imageUrl={
                  'https://th.bing.com/th/id/R.5eaa073873e55124770410ea27876275?rik=Re7I7PQ8hvs3Yw&riu=http%3a%2f%2fwww.kibiji-office.com%2fwp-content%2fuploads%2f2014%2f04%2f150.png&ehk=XQJqheFiW5Pb7cGYQicM9g5IOE539MmpAY67wCS6SA4%3d&risl=&pid=ImgRaw&r=0'
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <AppBar isBack={true} navigation={this.props.navigation} title="Merchant Information" /> */}
      {/* <ScrollView>
            <View style={styles.merchantInfor}>
              <Text style={styles.text}>Merchant Information</Text>
              <View style={styles.line}></View>
              <View style={{ marginHorizontal: 24, marginTop: 9 }}>
                <MerchantInfo label={"Merchant type"} value={data.data.merchantType ?? ""} />
                <MerchantInfo
                  label={"Business sectors"}
                  value={data.data.businessSector.businessSectorName ?? ""}
                />
                <MerchantInfo label={"Business license"} value={data.data.businessLicense ?? ""} />
                <MerchantInfo label={"Merchant Phone"} value={data.data.merchantPhone ?? ""} />
                <MerchantInfo label={"Merchant Name"} value={data.data.merchantName ?? ""} />
                <MerchantInfo label={"Merchant Code"} value={data.data.merchantCode ?? ""} />
                <MerchantInfo label={"Paper type"} value={data.data.paperType ?? ""} />
                <MerchantInfo label={"Paper number"} value={data.data.paperNumber ?? ""} />
                <MerchantInfo
                  label={"Issued Date"}
                  value={moment(data.data.issuedDate).format("DD/MM/YYYY") ?? ""}
                />
                <MerchantInfo
                  label={"Expired Date"}
                  value={moment(data.data.expiredDate).format("DD/MM/YYYY") ?? ""}
                />
                <MerchantInfo label={"Isued Place"} value={data.data.issuedPlace ?? ""} />
                <MerchantInfo label={"Province"} value={data.data.province.areaName ?? ""} />
                <MerchantInfo label={"District"} value={data.data.district.areaName ?? ""} />
                <MerchantInfo label={"Precinct"} value={data.data.precinct.areaName ?? ""} />
                <MerchantInfo label={"Địa chỉ"} value={data.data.address ?? ""} />
                <MerchantInfo label={"Gender"} value={data.data.gender ?? ""} />
                <MerchantInfo label={"Email"} value={data.data.email ?? ""} />
              </View>
            </View>
            <View style={styles.merchantInfor}>
              <Text style={styles.text}>Bank Information</Text>
              <View style={styles.line}></View>
              <View style={{ marginHorizontal: 24, marginTop: 9 }}>
                <MerchantInfo label={"Bank Name"} value={data.data.bank.bankName} />
                <MerchantInfo label={"Bank Account No"} value={data.data.bankAccountNo} />
                <MerchantInfo label={"Bank Account Name"} value={data.data.bankAccountName} />
                <MerchantInfo label={"Bank Branch"} value={data.data.bankBranch} />
              </View>
            </View> */}
      {/* <View style={styles.merchantInfor}>
              <Text style={styles.text}>Image</Text>
              <View style={styles.line}></View>
              <View style={{ marginHorizontal: 24, marginTop: 9 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <ProfileImage
                    imageUrl={
                      data.data.backIdImage.downloadPath ??
                      "https://th.bing.com/th/id/R.5eaa073873e55124770410ea27876275?rik=Re7I7PQ8hvs3Yw&riu=http%3a%2f%2fwww.kibiji-office.com%2fwp-content%2fuploads%2f2014%2f04%2f150.png&ehk=XQJqheFiW5Pb7cGYQicM9g5IOE539MmpAY67wCS6SA4%3d&risl=&pid=ImgRaw&r=0"
                    }
                    label="Portrait"
                    token={accountStore.authToken}
                  />
                  <ProfileImage
                    imageUrl={
                      data.data.fontIdImage.downloadPath ??
                      "https://th.bing.com/th/id/R.5eaa073873e55124770410ea27876275?rik=Re7I7PQ8hvs3Yw&riu=http%3a%2f%2fwww.kibiji-office.com%2fwp-content%2fuploads%2f2014%2f04%2f150.png&ehk=XQJqheFiW5Pb7cGYQicM9g5IOE539MmpAY67wCS6SA4%3d&risl=&pid=ImgRaw&r=0"
                    }
                    label="Front (ID card)"
                    token={accountStore.authToken}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 9,
                  }}
                >
                  <ProfileImage
                    imageUrl={
                      data.data.backIdImage.downloadPath ??
                      "https://th.bing.com/th/id/R.5eaa073873e55124770410ea27876275?rik=Re7I7PQ8hvs3Yw&riu=http%3a%2f%2fwww.kibiji-office.com%2fwp-content%2fuploads%2f2014%2f04%2f150.png&ehk=XQJqheFiW5Pb7cGYQicM9g5IOE539MmpAY67wCS6SA4%3d&risl=&pid=ImgRaw&r=0"
                    }
                    label="Back (ID card)"
                    token={accountStore.authToken}
                  />
                </View>
              </View>
            </View> */}
      {/* </ScrollView> */}
    </View>
  );
  // } else {
  //   return null
  // }
});
