import React, {FC, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../../components/text/text';
import {Header} from '../../components/header/header';
import {useNavigation} from '@react-navigation/native';
import {colors, fontSize, scaleHeight} from '../../theme';
import {styles, stylesItem} from './styles';
import moment from 'moment';
import {Images} from '../../../assets/index';

const notifications = [
  {
    id: '1',
    product: 'PROMOTION',
    title: 'Khuyến mãi 50%',
    content:
      'Lorem ipsum dolor sit amet consectetur. Ut enim tortor duis aliquam.',
    createdAt: '2023-05-12T03:52:55',
    isRead: true,
    image: 'https://example.com/promotion.jpg',
  },
  {
    id: '2',
    product: 'MERCHANT_TRANSACTION',
    title: 'Chuyển khoản vào ngân hàng',
    content:
      'MB Bank, 4492874487443 (NGUYEN NGOC HA), 1,200,000đ, Don hang DH_0984871',
    createdAt: '2023-05-12T03:52:55',
    isRead: true,
  },
  {
    id: '3',
    product: 'MERCHANT_ORDER',
    title: 'Đề nghị thanh toán',
    content:
      'Customer Nguyễn Ngọc Minh has successfully paid for order #95111 with a value of 20.00 USD ...',
    createdAt: '2023-05-12T03:52:55',
    isRead: false,
  },
  {
    id: '4',
    product: 'MERCHANT_ORDER',
    title: 'Đề nghị thanh toán',
    content:
      'Customer Nguyễn Ngọc Minh has successfully paid for order #95111 with a value of 20.00 USD ...',
    createdAt: '2023-05-12T03:52:55',
    isRead: false,
  },
  {
    id: '5',
    product: 'MERCHANT_ORDER',
    title: 'Đề nghị thanh toán',
    content:
      'Customer Nguyễn Ngọc Minh has successfully paid for order #95111 with a value of 20.00 USD ...',
    createdAt: '2023-05-12T03:52:55',
    isRead: false,
  },
  {
    id: '6',
    product: 'MERCHANT_ORDER',
    title: 'Đề nghị thanh toán',
    content:
      'Customer Nguyễn Ngọc Minh has successfully paid for order #95111 with a value of 20.00 USD ...',
    createdAt: '2023-05-12T03:52:55',
    isRead: false,
  },
  {
    id: '7',
    product: 'MERCHANT_ORDER',
    title: 'Đề nghị thanh toán',
    content:
      'Customer Nguyễn Ngọc Minh has successfully paid for order #95111 with a value of 20.00 USD ...',
    createdAt: '2023-05-12T03:52:55',
    isRead: false,
  },
  {
    id: '8',
    product: 'MERCHANT_ORDER',
    title: 'Đề nghị thanh toán',
    content:
      'Customer Nguyễn Ngọc Minh has successfully paid for order #95111 with a value of 20.00 USD ...',
    createdAt: '2023-05-12T03:52:55',
    isRead: false,
  },
  {
    id: '9',
    product: 'MERCHANT_ORDER',
    title: 'Đề nghị thanh toán',
    content:
      'Customer Nguyễn Ngọc Minh has successfully paid for order #95111 with a value of 20.00 USD ...',
    createdAt: '2023-05-12T03:52:55',
    isRead: false,
  },
  {
    id: '10',
    product: 'MERCHANT_ORDER',
    title: 'Đề nghị thanh toán',
    content:
      'Customer Nguyễn Ngọc Minh has successfully paid for order #95111 with a value of 20.00 USD ...',
    createdAt: '2023-05-12T03:52:55',
    isRead: false,
  },
  {
    id: '11',
    product: 'MERCHANT_ORDER',
    title: 'Đề nghị thanh toán',
    content:
      'Customer Nguyễn Ngọc Minh has successfully paid for order #95111 with a value of 20.00 USD ...',
    createdAt: '2023-05-12T03:52:55',
    isRead: false,
  },
  {
    id: '12',
    product: 'MERCHANT_ORDER',
    title: 'Đề nghị thanh toán',
    content:
      'Customer Nguyễn Ngọc Minh has successfully paid for order #95111 with a value of 20.00 USD ...',
    createdAt: '2023-05-12T03:52:55',
    isRead: false,
  },
  {
    id: '13',
    product: 'MERCHANT_ORDER',
    title: 'Đề nghị thanh toán',
    content:
      'Customer Nguyễn Ngọc Minh has successfully paid for order #95111 with a value of 20.00 USD ...',
    createdAt: '2023-05-12T03:52:55',
    isRead: false,
  },
];

export const NotificationScreen: FC = () => {
  const navigation = useNavigation();
  const [typeNoti, setTypeNoti] = useState([
    'All',
    'Promotion',
    'Transaction',
    'Order',
  ]);
  const [indexItem, setIndexItem] = useState(0);
  const [dataNotiCount, setDataNotiCount] = useState<number>(
    notifications.length,
  );
  const [dataNoti, setDataNoti] = useState(notifications);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pageSize = 5;

  const renderName = (product: any, item: any) => {
    if (product === 'MERCHANT_ORDER') {
      return 'Payment Order';
    }
    if (product === 'MERCHANT_REQUEST_CASH') {
      return 'Request cash';
    }
    if (product === 'MERCHANT_TRANSACTION') {
      return 'Transfer To Bank';
    }
    if (product === 'PROMOTION') {
      return item.title;
    }
  };

  const renderImage = (product: any, item: any) => {
    if (product === 'MERCHANT_ORDER') {
      return <Image source={Images.ic_RequestCard} style={{width: 50, height: 50}} />
    } else if (product === 'PROMOTION') {
      return (
        <Image
          source={{uri: item.image}}
          style={{width: 50, height: 50, borderRadius: 16}}
        />
      );
    } else if (product === 'MERCHANT_REQUEST_CASH') {
      return <Image source={Images.ic_RequestCard} style={{width: 50, height: 50}} />
    } else if (product === 'MERCHANT_TRANSACTION') {
      return <Image source={Images.ic_bank} style={{width: 50, height: 50}} />
    }
  };


  const handleEndReached = () => {
    if (!isLoading && page * pageSize < notifications.length) {
      setIsLoading(true);
      setTimeout(() => {
        setPage(page + 1);
        setIsLoading(false);
      }, 2000);
    }
  };

  const refreshNotifications = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPage(1);
      setIsRefreshing(false);
    }, 1000);
  };
  const renderFooter = () => {
    if (!isLoading) {return null}
    return (
      <View>
        <ActivityIndicator size="large" color="#F6961C" />
      </View>
    );
  };
  const displayedNotifications = notifications.slice(0, page * pageSize);
  return (
    <View style={styles.ROOT}>
      <Header
        type={'AntDesign'}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={`Notification(${dataNotiCount})`}
        RightIcon={Images.ic_checkNotification}
        onRightPress={() => console.log('ok')}
        widthRightIcon={28}
        heightRightIcon={28}
        style={{height: scaleHeight(54)}}
        titleMiddleStyle={{
          justifyContent: 'flex-start',
          paddingLeft: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      />
      <View style={styles.rowNotiType}>
        {typeNoti.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setIndexItem(index);
              }}
              key={index}
              style={{
                backgroundColor: index == indexItem ? '#FFF0F0' : '#F4F4F4',
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 8,
                marginRight: 10,
              }}>
              <Text
                style={{
                  color: index == indexItem ? '#0078D4' : '#263238',
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: fontSize.size14,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{flex: 0.92}}>
        <FlatList
          data={displayedNotifications}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshNotifications}
              title="ok"
            />
          }
          keyExtractor={item => item.id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.8}
          ListFooterComponent={renderFooter}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => console.log('okok')}
                style={stylesItem.item}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 11,
                    paddingTop: 14,
                  }}>
                  <View style={stylesItem.icon}>
                    {renderImage(item.product, item)}
                  </View>
                  <View style={stylesItem.titleView}>
                    <Text style={stylesItem.title}>
                      {renderName(item.product, item)}
                    </Text>
                    <Text
                      style={{
                        color: '#848688',
                        fontSize: fontSize.size12,
                        lineHeight: 24,
                      }}>
                      {moment(item.createdAt).format('HH:mm:ss - DD/MM')}
                    </Text>
                  </View>
                  {!item.isRead && <View style={stylesItem.dot} />}
                </View>
                <View style={stylesItem.contentView} />
                <Text style={stylesItem.content} numberOfLines={2}>
                  {item.content}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
