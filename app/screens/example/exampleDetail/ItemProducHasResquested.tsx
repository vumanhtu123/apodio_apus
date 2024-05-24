import React, { FC } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';

interface ItemProducHasResquestedProps {
  item: {
    img: string;
    name: string;
    quantity: number;
  };
}

const ItemProducHasResquested: FC<ItemProducHasResquestedProps> = ({ item }) => {
  return (
    <View>
        <View style={{ flexDirection: 'row',padding:12 ,backgroundColor:'#FFFFFF' }}>
            <Image source={{ uri: item.img }}
            style={{width:48, height:48, borderRadius:16, marginRight:10}}
            />
            <View>
                <Text style={{fontWeight:"600", color:'#242424'}}>{item.name}</Text>
                <Text> SL:{item.quantity}</Text>
            </View>
           
        </View>
        <View style={styles.line}></View>
    </View>
    
  );
}

export default ItemProducHasResquested;