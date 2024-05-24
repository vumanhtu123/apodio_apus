import { StackScreenProps } from "@react-navigation/stack";
import { AppStackScreenProps } from "../../../navigators";
import { FC } from "react";

import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { scaleHeight, scaleWidth } from "../../../theme";
import { styles } from "../styles";

interface Item {
  id: string;
  date: string;
  money: number;
}

const ItemlistUnpaid: FC<{ item: Item }> = ({ item }) => {
  return (
    <View style={Styles.bodyItem}>

        <View style={Styles.styleTextView}>
            <Text style={Styles.txtTitle}>
                Mã đơn hàng: 
            </Text>
            <Text style={{fontSize:12, fontWeight:'600',  fontFamily:'Inter'}}>
                {
                    item.id
                }
            </Text>
        </View>
        <View style={[Styles.styleTextView,{marginVertical:scaleHeight(8)}]}>
            <Text style={Styles.txtTitle}>
                Ngày đặt hàng: 
            </Text>
            <Text style={{fontSize:12, fontWeight:'600', fontFamily:'Inter'}}>
                {
                    item.date
                }
            </Text>
        </View>
        <View style={Styles.styleTextView}>
            <Text style={Styles.txtTitle} >
                Số tiền: 
            </Text>
            <Text style={{fontSize:12, fontWeight:'600', color:'red', fontFamily:'Inter'}}>
                {
                    item.money
                }
            </Text>
        </View>
    </View>
  );
}

export default ItemlistUnpaid;

const Styles = StyleSheet.create({
    bodyItem: {
        paddingHorizontal:scaleWidth(16),
        paddingVertical:scaleWidth(12), 
        borderRadius:8, 
        backgroundColor:'#FFFFFF',
        marginBottom:scaleHeight(16),
        marginHorizontal: scaleWidth(16)

    },
    styleTextView: {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    txtTitle: {
        fontSize:10,
        fontFamily:'Inter',

    },

    
})