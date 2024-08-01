import { FC, useState } from "react"
import { TabScreenProps } from "../../navigators/BottomTabNavigator"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { observer } from "mobx-react-lite"
import { AppStackParamList, navigate } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { Header } from "../../../components"
import { Svgs } from "../../../../assets/svgs"
import { colors, fontSize, padding, scaleHeight, scaleWidth } from "../../theme"




interface Item {
    id: string;
    name: string;
    code: string;
    phoneNumber: string;
}

export const AddClientToGroup: FC<StackScreenProps<AppStackParamList, "addClientToGroup">> = observer(

    

    function addClentToGroup(props) {

        const data = props.route.params?.dataItem;
        // console.log(data);

        const [isClick, setIsclick] = useState(false);

        const dataListClient = [
            {
                id: '12',
                code: "MTH",
                name: "Công ty TNHH Mặt Trời Hồng",
                phoneNumber: '0899899779'
            },
            {
                id: '1',
                code: "HĐ",
                name: "Công ty TNHH xây dựng kỹ thuật và thương mại Hải Đăng",
                phoneNumber: '0899899779'
            },
            {
                id: '123',
                code: "RP",
                name: "Công ty TNHH tư vân ROPA",
                phoneNumber: '0899899779'
            },
            {
                id: '121',
                code: "TCT",
                name: "Công ty TNHH xây dựng và sản xuất TCT",
                phoneNumber: '0899899779'
            },
            {
                id: '126',
                code: "MTH",
                name: "Công ty TNHH tư vân ROPA",
                phoneNumber: '0899899779'
            }
        ]

        const [itemsChecked, setItemsChecked] = useState<string[]>([]);

        // console.log(itemsChecked)
        
        const handleCheckboxPress = (itemId: string) => {
            // console.log('====================================');
            // console.log(itemId);
            // console.log('====================================');
            if (itemsChecked.includes(itemId)) {
                setItemsChecked(itemsChecked.filter((id) => id !== itemId));
            } else {
                setItemsChecked([...itemsChecked, itemId]);
            }
        };

      
        const RenderItemListClient = ({ item }: { item: Item }) => {
            // console.log(indexClick)

            return (
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: scaleWidth(375), height: scaleHeight(56), paddingHorizontal: 16, backgroundColor: 'white', marginBottom: 1.5, justifyContent: 'space-between' }}
                    onPress={() => handleCheckboxPress(item.id)}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ width: 40, height: 40, backgroundColor: colors.aliceBlue2, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: fontSize.size10, color: colors.navyBlue }}>{item.code}</Text>
                        </View>
                        <View style={{ marginHorizontal: 6 }}>
                            <Text style={{ fontSize: fontSize.size10 }}>{item.name}</Text>
                            <Text style={{ fontSize: fontSize.size10, color: colors.palette.dolphin }}>{item.phoneNumber}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={Styles.radioButton}
                        onPress={() => handleCheckboxPress(item.id)}
                    >
                        <Text style={Styles.checkboxText}>
                            {itemsChecked.includes(item.id) ? <Svgs.icon_check/> : null}
                        </Text>
                    </TouchableOpacity>

                </TouchableOpacity>
            )
        }



        return (
            <View style={{ flex: 1 }}>
                <Header
                    LeftIcon={Svgs.back}
                    style={{ height: 56 }}
                    headerInputCenter={true}
                    onLeftPress={() => props.navigation.goBack()}
                />
                <View style={{ height: scaleHeight(40), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Inter', fontWeight: '400' }}>Chọn khách hàng thêm vào nhóm "{data.nameGroup}" </Text>
                </View>
                <FlatList

                    data={dataListClient}
                    renderItem={({ item }) => <RenderItemListClient item={item} />}
                    keyExtractor={(item) => item.id}
                    numColumns={1}
                />
                <View style={Styles.styleBTN}>
                    <TouchableOpacity
                        style={{height:scaleHeight(48), width:scaleWidth(165), justifyContent:'center',alignItems:'center', borderWidth:1, borderRadius:8, backgroundColor: isClick ? colors.palette.navyBlue: colors.white , borderColor:colors.veryLightGrey}}
                        onPress={() => setIsclick(!isClick)}
                    >
                        <Text style={{color: isClick ? colors.white : colors.nightRider}}>
                            Quay lại
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{height:scaleHeight(48), width:scaleWidth(165), justifyContent:'center',alignItems:'center', borderWidth:1, borderRadius:8, backgroundColor: isClick ? colors.white :colors.palette.navyBlue, borderColor:colors.veryLightGrey}}
                        onPress={() => setIsclick(!isClick)}
                    >
                        <Text style={{color: isClick ? colors.nightRider :  colors.white}}>
                            Cập nhật
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
)

const Styles = StyleSheet.create({
    radioButton: {
        width: scaleWidth(18),
        height: scaleHeight(18),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.veryLightGrey2,
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 10
    },
    checkboxText: {
        fontSize: 18,
    },
    styleBTN:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:scaleHeight(46),
        paddingHorizontal:scaleWidth(16)
    },
   
    
})