import React from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useAppContext } from './AppContext';
import { colors } from '../app-purchase/theme/colors';
import { scaleHeight, spacing } from '../app-purchase/theme';
import { Header } from '../components';
import { Svgs } from '../../assets/svgs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppList: React.FC = () => {
  const { setCurrentApp } = useAppContext();

  const data = [
    { id: 'appPurchase', icon: <Svgs.iconAppPurchase />, text: 'Mua Hàng' },
    { id: 'appSales', icon: <Svgs.iconAppSales />, text: 'Bán Hàng' },
    { id: 'appFinance', icon: <Svgs.iconAppFinance />, text: 'Tài chính' },
    { id: 'appWarehouse', icon: <Svgs.iconAppWarehouse />, text: 'Kho Hàng' },
    { id: 'appAccountant', icon: <Svgs.iconAppAccountant />, text: 'Kế toán' },
  ];


  const renderItem = ({ item }) => (
    <TouchableOpacity
        style={[styles.itemContainer]}
        onPress={async () => {
          setCurrentApp(item.id)
          await AsyncStorage.setItem('selectedApp', item.id);
        }
        }
      >
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        {item.icon}
      </View>
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
    </TouchableOpacity>
  );

  
  return (
    <View>
      <Header
        type={"AntDesign"}
        colorIcon={colors.text}
        headerTx="menuDrawer.textHeaderDrawer"
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={styles.titleHeader}
      />
      <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={3}
      contentContainerStyle={styles.list}
    />
      </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    height: 10, // Khoảng cách trước danh sách
  },
  footer: {
    height: 10, // Khoảng cách sau danh sách
  },
  row: {
    flex: 1,
    justifyContent: 'space-between', // Canh đều các item theo chiều ngang
    marginBottom: 10, // Khoảng cách giữa các hàng
  },
  title: {
    fontSize: 22,
    color: 'white',
    alignContent: 'center'
  },
  titleHeader: {
    justifyContent: 'center',
    paddingLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    padding: 10,
  },
  itemContainer: {
    width: '29%',
    alignItems: 'center',
    margin: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 40,
    height: 40,
  },
  itemText: {
    textAlign: 'center',
  },
});

export default AppList;
