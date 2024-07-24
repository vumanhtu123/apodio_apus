import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Images } from '../../../../assets';
import { colors, scaleHeight, scaleWidth } from '../../../theme';
import { Styles } from '../style';
import { useNavigation } from '@react-navigation/native';
import en from '../../../i18n/en';

interface ItemList {
    id: number;
    code: string;
    name: string;
    state: string;
}


const ItemListWareHouse: React.FC<{ item: ItemList }> = ({ item }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={Styles.itemList}

            onPress={() => {
                // setIdWarehouse(item.id)
                console.log('id select', item.id);
                navigation.navigate({ name: 'detailWarehouse', params: { id: item.id, state: item.state, name: item.name } } as never)
            }}
        >
            <Images.ic_Brick
                style={{
                    width: scaleWidth(40),
                    height: scaleWidth(40),
                    borderRadius: scaleHeight(8),
                    marginRight: scaleWidth(6)
                }}
            />
            <View style={[Styles.flexRow, { flex: 2, alignItems: 'center', }]}>
                <View style={{ flex: 1 }}>
                    <Text style={Styles.txtItemWareHouse}>{item.code}</Text>
                    <Text style={{ fontSize: scaleWidth(10), fontWeight: '500' }}>{item?.name}</Text>

                </View>

                <View>
                    <Text
                        style={{
                            fontSize: scaleWidth(8),
                            fontWeight: "400",
                            color: item?.state === "APPROVED" ? colors.navyBlue : "#9EA6B3",
                        }}>
                        {item?.state === "APPROVED"
                            ? en.wareHouse.isActive
                            : en.wareHouse.save}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ItemListWareHouse

